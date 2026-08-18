/**
 * Non-reactive shared state for the 3D stage.
 *
 * Scroll and pointer update this object every frame; the R3F scene reads it
 * inside useFrame and lerps toward `target`. Keeping it outside React means
 * the continuous product animation never triggers a component re-render.
 */
export const stage = {
  pointer: { x: 0, y: 0 },       // normalized -1..1
  drag: { vy: 0, offset: 0 },    // drag-to-rotate velocity + accumulated Y rotation
  reduceMotion: false,
  mobile: false,
  ready: false,
  // Where the product group wants to be for the section in view:
  target: {
    px: 1.15, py: -0.1, pz: 0,   // position
    ry: 0.5, rx: 0.02,           // base rotation
    s: 1,                        // scale
    gobi: 1, three: 0,           // per-packet opacity targets
    spread: 0,                   // 0 = stacked/single, 1 = two packs spread apart
    camY: 0,                     // camera vertical dolly
  },
};

/** Pose presets keyed by section id. Merged into stage.target on scroll. */
export const POSES = {
  intro:   { px: 1.2,  py: -0.1, pz: 0,   ry: 0.5,  rx: 0.02, s: 0.98, gobi: 1, three: 0, spread: 0, camY: 0 },
  products:{ px: 0,    py: -0.05,pz: 0,   ry: 0.0,  rx: 0.0,  s: 0.56, gobi: 1, three: 1, spread: 1, camY: 0 },
  gobi:    { px: 0.92, py: -0.05,pz: 0.2, ry: -0.4, rx: 0.05, s: 0.92, gobi: 1, three: 0, spread: 0, camY: 0 },
  threeInOne:{px: -0.92,py:-0.05,pz: 0.2, ry: 0.55, rx: -0.08,s: 0.92, gobi: 0, three: 1, spread: 0, camY: 0 },
  explore: { px: 0,    py: -0.02,pz: 0.9, ry: 0.0,  rx: 0.0,  s: 1.02, gobi: 1, three: 0, spread: 0, camY: 0 },
  ritual:  { px: 2.6,  py: 0,    pz: -1,  ry: 0.6,  rx: 0,    s: 0.7,  gobi: 0, three: 0, spread: 0, camY: 0 },
  ingredients:{px: 2.6,py: 0,    pz: -1,  ry: 0.6,  rx: 0,    s: 0.7,  gobi: 0, three: 0, spread: 0, camY: 0 },
  story:   { px: 2.6,  py: 0,    pz: -1,  ry: 0.6,  rx: 0,    s: 0.7,  gobi: 0, three: 0, spread: 0, camY: 0 },
  promise: { px: 2.6,  py: 0,    pz: -1,  ry: 0.6,  rx: 0,    s: 0.7,  gobi: 0, three: 0, spread: 0, camY: 0 },
  shop:    { px: 0,    py: -0.05,pz: 0,   ry: 0.0,  rx: 0.0,  s: 0.6,  gobi: 1, three: 1, spread: 1, camY: 0 },
  final:   { px: 0,    py: -0.05,pz: -0.6, ry: 0.0, rx: 0.0,  s: 0.62, gobi: 1, three: 1, spread: 1.9, camY: 0.04 },
};

/* On narrow screens the product is centred and lifted into the upper half
   so it never sits behind the (bottom-aligned) copy or runs off-screen. */
export const MOBILE_OVERRIDES = {
  intro:   { px: 0, py: 0.6,  s: 0.66, spread: 0 },
  products:{ px: 0, py: 0.7,  s: 0.42, spread: 0.62 },
  gobi:    { px: 0, py: 1.05, s: 0.48, pz: 0 },
  threeInOne:{ px: 0, py: 1.05, s: 0.48, pz: 0 },
  explore: { px: 0, py: 0.55, s: 0.72 },
  shop:    { px: 0, py: 0.72, s: 0.44, spread: 0.62 },
  final:   { px: 0, py: 0.5,  s: 0.5,  spread: 0.95, pz: -0.4 },
};

export function setPose(id) {
  const p = POSES[id];
  if (!p) return;
  Object.assign(stage.target, p);
  if (stage.mobile && MOBILE_OVERRIDES[id]) Object.assign(stage.target, MOBILE_OVERRIDES[id]);
}
