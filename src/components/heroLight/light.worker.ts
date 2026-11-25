// src/components/heroLight/light.worker.ts
// Render loop for the hero's light, running entirely off the main thread on an
// OffscreenCanvas. The main thread only sends layout (on resize) and visibility.

import { FRAG, VERT } from './shader'

export type Vec4 = [number, number, number, number]
export interface LightGeometry {
  width: number   // CSS px
  height: number
  scale: number   // device px per CSS px (capped)
  amb1: Vec4
  amb2: Vec4
  amb3: Vec4
  planet: Vec4
  wrap: [number, number]
  halo: Vec4
  spill: Vec4
}
export type ToWorker =
  | { type: 'init'; canvas: OffscreenCanvas; reduced: boolean; stats: boolean }
  | { type: 'geometry'; geometry: LightGeometry }
  | { type: 'visible'; visible: boolean }
  | { type: 'reduced'; reduced: boolean }
export type FromWorker =
  | { type: 'ready' }
  | { type: 'fail'; reason: string }
  | { type: 'stats'; fps: number; gpuMs: number | null }

type Ctx = {
  gl: WebGL2RenderingContext
  canvas: OffscreenCanvas
  loc: Record<string, WebGLUniformLocation | null>
}

const post = (msg: FromWorker) => (self as unknown as Worker).postMessage(msg)
const raf: (cb: FrameRequestCallback) => number =
  typeof self.requestAnimationFrame === 'function'
    ? self.requestAnimationFrame.bind(self)
    : (cb) => setTimeout(() => cb(performance.now()), 16) as unknown as number
const caf: (id: number) => void =
  typeof self.cancelAnimationFrame === 'function' ? self.cancelAnimationFrame.bind(self) : clearTimeout

let ctx: Ctx | null = null
let geom: LightGeometry | null = null
let reduced = false
let visible = true
let frameId = 0
let clock = 0          // seconds of motion shown so far (pauses don't jump)
let last = 0
let readySent = false

// Optional GPU timing (?lightstats): EXT_disjoint_timer_query_webgl2.
let timer: { ext: { TIME_ELAPSED_EXT: number; GPU_DISJOINT_EXT: number }; pending: WebGLQuery[] } | null = null
let statsOn = false
let statFrames = 0
let statStart = 0
let gpuSum = 0
let gpuN = 0

function setup(canvas: OffscreenCanvas, stats: boolean): Ctx | null {
  const gl = canvas.getContext('webgl2', {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'low-power',
  }) as WebGL2RenderingContext | null
  if (!gl) return null
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link')
  gl.useProgram(prog)
  gl.bindVertexArray(gl.createVertexArray())
  const loc: Ctx['loc'] = {}
  for (const n of ['uRes', 'uScale', 'uTime', 'uAmb1', 'uAmb2', 'uAmb3', 'uPlanet', 'uWrap', 'uHalo', 'uSpill']) {
    loc[n] = gl.getUniformLocation(prog, n)
  }
  if (stats) {
    const ext = gl.getExtension('EXT_disjoint_timer_query_webgl2')
    if (ext) timer = { ext, pending: [] }
  }
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault()
    stop()
    post({ type: 'fail', reason: 'context lost' })
  })
  return { gl, canvas, loc }
}

function applyGeometry() {
  if (!ctx || !geom) return
  const { gl, canvas, loc } = ctx
  const w = Math.max(1, Math.round(geom.width * geom.scale))
  const h = Math.max(1, Math.round(geom.height * geom.scale))
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
  gl.viewport(0, 0, w, h)
  gl.uniform2f(loc.uRes, w, h)
  gl.uniform1f(loc.uScale, geom.scale)
  gl.uniform4fv(loc.uAmb1, geom.amb1)
  gl.uniform4fv(loc.uAmb2, geom.amb2)
  gl.uniform4fv(loc.uAmb3, geom.amb3)
  gl.uniform4fv(loc.uPlanet, geom.planet)
  gl.uniform2fv(loc.uWrap, geom.wrap)
  gl.uniform4fv(loc.uHalo, geom.halo)
  gl.uniform4fv(loc.uSpill, geom.spill)
}

function draw(t: number) {
  if (!ctx || !geom) return
  const { gl, loc } = ctx
  let q: WebGLQuery | null = null
  if (timer) {
    q = gl.createQuery()
    gl.beginQuery(timer.ext.TIME_ELAPSED_EXT, q!)
  }
  gl.uniform1f(loc.uTime, t)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  if (timer && q) {
    gl.endQuery(timer.ext.TIME_ELAPSED_EXT)
    timer.pending.push(q)
    collectTimers()
  }
  if (!readySent) {
    readySent = true
    post({ type: 'ready' })
  }
}

function collectTimers() {
  if (!ctx || !timer) return
  const { gl } = ctx
  const disjoint = gl.getParameter(timer.ext.GPU_DISJOINT_EXT)
  while (timer.pending.length) {
    const q = timer.pending[0]
    if (!gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE)) break
    if (!disjoint) {
      gpuSum += gl.getQueryParameter(q, gl.QUERY_RESULT) / 1e6
      gpuN++
    }
    gl.deleteQuery(q)
    timer.pending.shift()
  }
}

function frame(now: number) {
  frameId = 0
  if (last) clock += Math.min(0.1, (now - last) / 1000)
  last = now
  draw(clock)
  if (statsOn) {
    statFrames++
    if (!statStart) statStart = now
    if (now - statStart >= 1000) {
      post({ type: 'stats', fps: (statFrames * 1000) / (now - statStart), gpuMs: gpuN ? gpuSum / gpuN : null })
      statFrames = 0; statStart = now; gpuSum = 0; gpuN = 0
    }
  }
  schedule()
}

function schedule() {
  if (frameId || !ctx || !geom || reduced || !visible) return
  frameId = raf(frame)
}

function stop() {
  if (frameId) caf(frameId)
  frameId = 0
  last = 0
}

function refresh() {
  // Reduced motion: one static frame (the CSS-identical pose). Otherwise run the loop.
  stop()
  if (!ctx || !geom) return
  if (reduced) {
    draw(0)
    return
  }
  draw(clock)
  schedule()
}

self.onmessage = (e: MessageEvent<ToWorker>) => {
  const msg = e.data
  try {
    if (msg.type === 'init') {
      reduced = msg.reduced
      ctx = setup(msg.canvas, msg.stats)
      if (!ctx) post({ type: 'fail', reason: 'no webgl2' })
      statsOn = msg.stats
    } else if (msg.type === 'geometry') {
      geom = msg.geometry
      applyGeometry()
      refresh()
    } else if (msg.type === 'visible') {
      visible = msg.visible
      if (visible) schedule()
      else stop()
    } else if (msg.type === 'reduced') {
      reduced = msg.reduced
      refresh()
    }
  } catch (err) {
    stop()
    ctx = null
    post({ type: 'fail', reason: String(err) })
  }
}
