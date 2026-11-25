// scripts/icons/render.mjs — favicon and app icons from one definition.
//
//   node scripts/icons/render.mjs
//
// Writes public/favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180),
// icon-192.png, icon-512.png, icon-maskable-512.png. Needs Playwright with Chromium.
//
// The mark: a geometric "M" over the site's lit horizon, its right leg cut away and
// rendered as a separate violet piece (the cut-out motif of the hero's avatar frame); at
// 16 px it reads as a white-and-violet M.

import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const pub = resolve(dirname(fileURLToPath(import.meta.url)), '../../public')

// The M is split by a vertical cut: the left leg and both diagonals in white (clipped at
// x = 39.4), and the whole right leg as a separate violet piece (x 41-50.5), the "cut-out"
// motif of the hero's avatar frame.
const M_WHITE = 'M13.5 44V15H23l9 14.5L39.4 17.58V32.55L34.4 40.5h-4.8L23 30v14z'
const M_RIGHT = '<rect x="41" y="15" width="9.5" height="29" rx="1.2" fill="#a78bfa"/>'

/** rounded: the 14px-radius tile (tabs, Android "any"); full bleed for iOS and maskable. */
function svg({ rounded }) {
  const tile = rounded ? '<rect width="64" height="64" rx="14"/>' : '<rect width="64" height="64"/>'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="g" cx="50%" cy="100%" r="75%"><stop offset="0" stop-color="#6366f1" stop-opacity=".75"/><stop offset=".6" stop-color="#6366f1" stop-opacity=".12"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></radialGradient>
    <clipPath id="c">${tile}</clipPath>
  </defs>
  <g clip-path="url(#c)">
    <rect width="64" height="64" fill="#04050d"/>
    <rect width="64" height="64" fill="url(#g)"/>
    <ellipse cx="32" cy="92" rx="56" ry="42" fill="#04050d" stroke="#ddd6fe" stroke-width="2.2"/>
  </g>
  <path d="${M_WHITE}" fill="#f8fafc"/>
  ${M_RIGHT}
</svg>
`
}

/** ICO container holding PNG images (supported by every browser that still asks for .ico). */
function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt8(0, 2)
    e.writeUInt8(0, 3)
    e.writeUInt16LE(1, 4)
    e.writeUInt16LE(32, 6)
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

const rounded = svg({ rounded: true })
const bleed = svg({ rounded: false })
writeFileSync(resolve(pub, 'favicon.svg'), rounded)

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  const png = async (markup, size) => {
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(
      `<html><body style="margin:0;background:transparent">${markup.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
    )
    return page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } })
  }
  const icoPngs = []
  for (const size of [16, 32, 48]) icoPngs.push({ size, data: await png(rounded, size) }) // one page: render in sequence
  writeFileSync(resolve(pub, 'favicon.ico'), ico(icoPngs))
  writeFileSync(resolve(pub, 'apple-touch-icon.png'), await png(bleed, 180))
  writeFileSync(resolve(pub, 'icon-192.png'), await png(rounded, 192))
  writeFileSync(resolve(pub, 'icon-512.png'), await png(rounded, 512))
  writeFileSync(resolve(pub, 'icon-maskable-512.png'), await png(bleed, 512))
  console.log('icons written to', pub)
} finally {
  await browser.close()
}
