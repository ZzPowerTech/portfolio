// src/components/heroLight/useHeroLight.ts
// Moving light behind the hero, rendered by a WebGL2 shader in a worker.
//
// Progressive enhancement: the CSS lighting in hero.css is the baseline (no JS, prerender,
// no OffscreenCanvas/WebGL2, context loss, tests). When the worker has drawn its first
// frame, the hero gets data-light="gl", which shows the canvas and hides the CSS layers in
// the same style pass; frame 0 of the shader equals the CSS, so the swap is invisible.
//
// Budget: no per-frame work on the main thread. It only measures layout on resize and
// reports visibility; the render loop lives in the worker and pauses off-screen, in a hidden
// tab, and under prefers-reduced-motion (one static frame).

import { useEffect, type RefObject } from 'react'
import type { FromWorker, LightGeometry, ToWorker, Vec4 } from './light.worker'

// Render resolution in device px per CSS px. The light is low-frequency (the sharpest
// feature, the horizon rim, is ~4.6 CSS px of anti-aliasing), so it is drawn below CSS
// resolution and the compositor's bilinear upscale fills in. 0.75 rather than 0.5: the
// shader's own dither survives the upscale better there (dark-tail flat runs 8/7 px vs
// 10/8 px at the same grain); the page-wide dither film then grains the result at device
// resolution.
const RENDER_SCALE = 0.75

function measure(hero: HTMLElement): LightGeometry | null {
  const stage = hero.querySelector<HTMLElement>('.hero-stage')
  const horizon = hero.querySelector<HTMLElement>('.hero-horizon')
  const cont = hero.querySelector<HTMLElement>('.hero-continue')
  if (!stage || !horizon || !cont) return null
  const h = hero.getBoundingClientRect()
  const rel = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height }
  }
  const W = h.width
  const H = h.height
  const s = rel(stage)
  const z = rel(horizon)
  const c = rel(cont)

  // hero::before box is inset 0 -10%; "rx% ry% at x% y%" are fractions of that box.
  const bx = -0.1 * W
  const bw = 1.2 * W
  const amb = (cx: number, cy: number, rx: number, ry: number): Vec4 => [bx + cx * bw, cy * H, rx * bw, ry * H]

  // Horizon planet: width of the .hero-horizon box, aspect 1.8, top 200px into the box.
  const a = z.w / 2
  const b = z.w / 3.6

  // Console halo (.hero-stage::after): box -45% / -45% / -65% / -25%, closest-side ellipse.
  const halo: Vec4 = [s.x + 0.5 * s.w, s.y + 0.3 * s.h, 0.95 * s.w, 0.95 * s.h]

  // Spill (.hero-continue::before): min(1040px, 100%) wide, full height, "50% 100% at 50% 0".
  const sw = Math.min(1040, c.w)

  return {
    width: W,
    height: H,
    scale: RENDER_SCALE,
    amb1: amb(0.5, 0.58, 0.7, 0.3),
    amb2: amb(0.3, 0.72, 0.4, 0.16),
    amb3: amb(0.72, 0.74, 0.4, 0.14),
    planet: [z.x + a, z.y + 200 + b, a, b],
    wrap: [z.x, z.w],
    halo,
    spill: [c.x + c.w / 2, c.y, sw / 2, c.h],
  }
}

export function useHeroLight(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') return
    const canvas = document.createElement('canvas')
    if (!('transferControlToOffscreen' in canvas)) return
    canvas.className = 'hero-light'
    canvas.setAttribute('aria-hidden', 'true')
    hero.prepend(canvas)

    let worker: Worker
    try {
      worker = new Worker(new URL('./light.worker.ts', import.meta.url), { type: 'module' })
    } catch {
      canvas.remove()
      return
    }
    const send = (msg: ToWorker, transfer: Transferable[] = []) => worker.postMessage(msg, transfer)

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const offscreen = canvas.transferControlToOffscreen()
    send({ type: 'init', canvas: offscreen, reduced: motion.matches }, [offscreen])

    const fallback = () => {
      delete hero.dataset.light
      canvas.remove()
      worker.terminate()
    }
    worker.onmessage = (e: MessageEvent<FromWorker>) => {
      const msg = e.data
      if (msg.type === 'ready') hero.dataset.light = 'gl'
      else if (msg.type === 'fail') fallback()
    }
    worker.onerror = fallback

    const update = () => {
      const geometry = measure(hero)
      if (geometry) send({ type: 'geometry', geometry })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(hero)
    const stage = hero.querySelector('.hero-stage')
    if (stage) ro.observe(stage)

    let onScreen = true
    const visibility = () => send({ type: 'visible', visible: onScreen && !document.hidden })
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      visibility()
    })
    io.observe(hero)
    document.addEventListener('visibilitychange', visibility)
    const onMotion = () => send({ type: 'reduced', reduced: motion.matches })
    motion.addEventListener('change', onMotion)

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      motion.removeEventListener('change', onMotion)
      worker.terminate()
      delete hero.dataset.light
      canvas.remove()
    }
  }, [heroRef])
}
