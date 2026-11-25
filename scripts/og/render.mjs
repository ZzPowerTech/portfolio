// scripts/og/render.mjs — renders the link-preview cover (public/og-image.jpg).
//
//   node scripts/og/render.mjs
//
// Needs Playwright with Chromium (npx playwright install chromium). The template is drawn
// at 2x, averaged down to 1200x630 in float (2x2 box filter), dithered (triangular noise)
// and only then quantized, so the large dark gradients don't band. JPEG keeps it small
// enough for chat apps that skip heavy previews.

import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const here = dirname(fileURLToPath(import.meta.url))
const template = pathToFileURL(resolve(here, 'template.html')).href
const out = resolve(here, process.env.OG_OUT || '../../public/og-image.jpg')
const W = 1200
const H = 630
// JPEG at 0.95 with +-3-level dither: JPEG smooths weak noise away (at +-1 / q0.9 the dark
// gradients banded again, 71 px flat runs); this keeps runs <= ~13 px at ~190 KB. A PNG
// would be ~1 MB, too heavy for chat-app previews. Override with OG_QUALITY / OG_DITHER.
const QUALITY = Number(process.env.OG_QUALITY || 0.95)
const DITHER = Number(process.env.OG_DITHER || 3)

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
  await page.goto(template, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const png2x = await page.screenshot({ type: 'png' })

  const dataUrl = await page.evaluate(async ({ src, W, H, QUALITY, DITHER }) => {
    const img = new Image()
    img.src = src
    await img.decode()
    const big = new OffscreenCanvas(W * 2, H * 2)
    const bctx = big.getContext('2d')
    bctx.drawImage(img, 0, 0)
    const s = bctx.getImageData(0, 0, W * 2, H * 2).data
    const outCanvas = document.createElement('canvas')
    outCanvas.width = W
    outCanvas.height = H
    const octx = outCanvas.getContext('2d')
    const o = octx.createImageData(W, H)
    // Deterministic triangular noise in [-1, 1] levels.
    let seed = 0x9e3779b9
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i0 = ((2 * y) * W * 2 + 2 * x) * 4
        const i1 = i0 + 4
        const i2 = i0 + W * 2 * 4
        const i3 = i2 + 4
        const n = (rnd() + rnd() - 1) * DITHER
        const j = (y * W + x) * 4
        for (let c = 0; c < 3; c++) {
          const v = (s[i0 + c] + s[i1 + c] + s[i2 + c] + s[i3 + c]) / 4 + n
          o.data[j + c] = Math.max(0, Math.min(255, Math.round(v)))
        }
        o.data[j + 3] = 255
      }
    }
    octx.putImageData(o, 0, 0)
    return QUALITY >= 1 ? outCanvas.toDataURL('image/png') : outCanvas.toDataURL('image/jpeg', QUALITY)
  }, { src: 'data:image/png;base64,' + png2x.toString('base64'), W, H, QUALITY, DITHER })

  writeFileSync(out, Buffer.from(dataUrl.split(',')[1], 'base64'))
  console.log('wrote', out)
} finally {
  await browser.close()
}
