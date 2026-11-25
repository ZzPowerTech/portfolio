// src/components/heroLight/shader.ts
// The hero's lighting as one WebGL2 fragment shader.
//
// It reproduces the CSS layers in hero.css (ambient glows, console halo, horizon
// atmosphere, spill under the console) with the same curves and the same paint order,
// computed in float and dithered before the 8-bit write. At t = 0 every motion term is
// zero, so the first frame matches the CSS fallback and the swap is invisible; motion
// then fades in over a few seconds.
//
// All geometry arrives in CSS pixels relative to the hero (y down), measured from the
// live layout by useHeroLight; the shader converts fragment coordinates with uScale.

export const VERT = /* glsl */ `#version 300 es
void main() {
  // One triangle that covers the viewport; no vertex buffer needed.
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

export const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uRes;      // canvas size, device px
uniform float uScale;   // device px per CSS px
uniform float uTime;    // seconds since start (motion clock)
uniform vec4 uAmb1;     // ambient glows: centre.xy, radii.xy (CSS px)
uniform vec4 uAmb2;
uniform vec4 uAmb3;
uniform vec4 uPlanet;   // horizon: centre.xy, semi-axes a, b of the planet
uniform vec2 uWrap;     // horizon side fade: left x, width
uniform vec4 uHalo;     // console halo: centre.xy, radii.xy
uniform vec4 uSpill;    // light under the console: centre.xy, radii.xy

out vec4 outColor;

const float DITHER = 1.0;   // triangular dither amplitude, in 8-bit levels
const vec3 BG         = vec3(4.0, 5.0, 13.0) / 255.0;
const vec3 INDIGO     = vec3(99.0, 102.0, 241.0) / 255.0;
const vec3 VIOLET     = vec3(167.0, 139.0, 250.0) / 255.0;
const vec3 PERI       = vec3(129.0, 140.0, 248.0) / 255.0;
const vec3 PERIWINKLE = vec3(118.0, 128.0, 246.0) / 255.0;
const vec3 LAVENDER   = vec3(221.0, 214.0, 254.0) / 255.0;

// Same falloffs as the CSS stop generators: zero value and zero slope at the end.
float fall(float t, float p) {            // (1 - smoothstep)^p over t in [0, 1]
  t = clamp(t, 0.0, 1.0);
  return pow(1.0 - t * t * (3.0 - 2.0 * t), p);
}
float easeOut(float t, float p) {         // (1 - t)^p: falls from the first pixel
  return pow(1.0 - clamp(t, 0.0, 1.0), p);
}
float plateau(float r, float r0, float p) { return fall((r - r0) / (1.0 - r0), p); }
float ell(vec2 p, vec4 e) { return length((p - e.xy) / e.zw); }
vec3 over(vec3 dst, vec3 c, float a) { return mix(dst, c, clamp(a, 0.0, 1.0)); }

// Triangular-PDF dither in [-1, 1] LSB: breaks 8-bit steps without a visible pattern.
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uScale;
  float t = uTime;
  // Motion fades in from zero, so frame 0 equals the CSS fallback.
  float env = 1.0 - exp(-t / 3.0);

  vec3 col = BG;

  // 1. Ambient glows (hero::before). CSS lists them top-first, so paint 3, 2, 1.
  // Each glow drifts on its own Lissajous path (periods ~12-30s) and swells +-45-55%.
  vec2 d1 = env * vec2(sin(t * 0.34) * 260.0, sin(t * 0.27) * 90.0);
  vec2 d2 = env * vec2(sin(t * 0.21) * 300.0, sin(t * 0.37) * 100.0);
  vec2 d3 = env * vec2(sin(t * 0.30) * -280.0, sin(t * 0.18) * 95.0);
  col = over(col, PERIWINKLE, 0.14 * (1.0 + env * 0.55 * sin(t * 0.46)) * fall(ell(p, uAmb3 + vec4(d3, 0.0, 0.0)), 2.2));
  col = over(col, VIOLET,     0.24 * (1.0 + env * 0.50 * sin(t * 0.37 + 1.0)) * fall(ell(p, uAmb2 + vec4(d2, 0.0, 0.0)), 2.2));
  col = over(col, INDIGO,     0.34 * (1.0 + env * 0.45 * sin(t * 0.59)) * fall(ell(p, uAmb1 + vec4(d1, 0.0, 0.0)), 2.2));

  // 2. Horizon atmosphere: light outside the planet's edge, on an ellipse 1.3x its size.
  float r = ell(p, uPlanet);
  float u = r / 1.3;
  const float RIM = 1.0 / 1.3;
  if (r > 0.995) {
    float aa = smoothstep(RIM - 0.004, RIM, u);       // the 0.4% edge ramp the CSS has
    float tx = (p.x - uWrap.x) / uWrap.y;
    float side = smoothstep(0.0, 0.4, tx) * (1.0 - smoothstep(0.6, 1.0, tx));
    // A broad swell of light rolls along the rim (~13s), and a narrow glint runs across it
    // left to right every 9s (it wraps while off the masked ends, so the jump is unseen).
    float sweep = 1.0 + env * 0.45 * sin(tx * 6.2832 - t * 0.48);
    float pos = -0.25 + 1.5 * fract(t / 9.0);
    float glint = env * exp(-pow((tx - pos) / 0.08, 2.0));
    float w = (u - RIM) / (1.0 - RIM);
    // As in CSS, the layers form one group (premultiplied) and the side mask applies to it.
    vec4 g = vec4(0.0);
    float a;
    a = aa * 0.16 * fall(w, 1.6);                         g = g * (1.0 - a) + vec4(PERIWINKLE * a, a);
    a = aa * 0.36 * (sweep + 2.2 * glint) * fall(w, 2.0);                 g = g * (1.0 - a) + vec4(INDIGO * a, a);
    a = aa * 0.50 * (sweep + 2.0 * glint) * easeOut((u - RIM) / 0.15, 2.4); g = g * (1.0 - a) + vec4(PERI * a, a);
    a = min(1.0, aa * 0.75 * (1.0 + 1.4 * glint) * easeOut((u - RIM) / 0.06, 2.6)); g = g * (1.0 - a) + vec4(VIOLET * a, a);
    a = min(1.0, aa * 0.95 * (1.0 + 0.6 * glint) * easeOut((u - RIM) / 0.016, 2.2)); g = g * (1.0 - a) + vec4(LAVENDER * a, a);
    col = col * (1.0 - g.a * side) + g.rgb * side;
  }

  // 3. Console halo (.hero-stage::after): it breathes, ~6s period.
  float rh = ell(p, uHalo);
  float breathe = 1.0 + env * 0.45 * sin(t * 1.05);
  col = over(col, VIOLET, 0.09 * breathe * plateau(rh, 0.24, 2.8));
  col = over(col, INDIGO, 0.32 * breathe * plateau(rh, 0.28, 2.2));

  // 4. Light under the console (.hero-continue::before).
  col = over(col, INDIGO, 0.26 * (1.0 + env * 0.40 * sin(t * 1.05 + 0.6)) * fall(ell(p, uSpill), 2.0));

  // Dither in float, before the 8-bit write.
  vec2 q = gl_FragCoord.xy;
  // Interleaved gradient noise (Jimenez 2014): low-discrepancy, so it breaks 8-bit steps at a
  // lower amplitude than white noise, i.e. with less visible grain.
  float ign = fract(52.9829189 * fract(dot(q, vec2(0.06711056, 0.00583715))));
  col += (ign - 0.5) * 2.0 * DITHER / 255.0;

  outColor = vec4(col, 1.0);
}`
