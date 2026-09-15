// =====================================================================
//  MOTION SYSTEM — single source of truth for the storefront's motion.
//  ---------------------------------------------------------------------
//  Centralised easing curves, durations, distances, spring presets and
//  reusable Framer Motion variants. Nothing in the UI should hard-code a
//  random duration or cubic-bezier; it imports from here so the whole
//  site shares one coherent, editorial motion language.
//
//  The same tokens are mirrored as CSS custom properties in studio.css
//  (--ease-*, --dur-*, --motion-*) for CSS-driven transitions.
// =====================================================================

// -- easing curves (Framer bezier arrays) ------------------------------
// EDITORIAL: a strong expo-style deceleration — the signature "settle".
// ENTER:     quint-out, a touch softer, for most reveals.
// SMOOTH:    in-out, for reversible scroll-linked movement.
// EXIT:      accelerate away.
// BACK:      a restrained overshoot, used sparingly (deck settle, chips).
export const EASE = {
  editorial: [0.16, 1, 0.3, 1],
  enter: [0.22, 1, 0.36, 1],
  smooth: [0.65, 0, 0.35, 1],
  exit: [0.6, 0, 0.86, 0],
  back: [0.34, 1.32, 0.64, 1],
}

// -- durations (seconds) ----------------------------------------------
export const DUR = {
  fast: 0.45,
  base: 0.7,
  slow: 1.05,
  xslow: 1.5,
}

// -- movement distances (px) ------------------------------------------
export const MOVE = {
  sm: 14,
  md: 30,
  lg: 64,
}

// -- spring presets ----------------------------------------------------
// silk:   heavy, weighted smoothing for scroll-linked parallax.
// soft:   general settle for entrances driven by springs.
// snappy: magnetic pointer pull / quick UI reactions.
export const SPRING = {
  silk: { stiffness: 60, damping: 20, mass: 0.6 },
  soft: { stiffness: 90, damping: 22, mass: 0.5 },
  snappy: { stiffness: 220, damping: 24, mass: 0.4 },
}

// =====================================================================
//  VARIANTS
// =====================================================================

// A staggered parent — its children reveal in sequence.
export const stagger = (each = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
})

// Text line-mask child: the inner line rides up from beneath its mask.
export const lineChild = {
  hidden: { y: '118%' },
  show: {
    y: '0%',
    transition: { duration: DUR.slow, ease: EASE.editorial },
  },
}

// Generic "rise into place" — the workhorse reveal.
export const fadeUp = {
  hidden: { opacity: 0, y: MOVE.md },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.enter } },
}

// Softer fade with a longer travel, for larger blocks.
export const riseLg = {
  hidden: { opacity: 0, y: MOVE.lg },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.editorial } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.smooth } },
}

// Scale up subtly from a resting depth.
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: MOVE.sm },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: DUR.base, ease: EASE.enter } },
}

// Media reveal — the frame unmasks from the bottom while the image settles.
export const clipUp = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: MOVE.md },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.editorial },
  },
}

// Card entrance with a whisper of 3D — used in the collection grid.
export const cardIn = {
  hidden: { opacity: 0, y: 46, rotateX: 7, scale: 0.965 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE.editorial },
  },
}

// Directional slide (for alternating film blocks). dir = -1 (from left) / 1 (from right).
export const slideIn = (dir = 1) => ({
  hidden: { opacity: 0, x: 46 * dir },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.editorial } },
})

// Shared viewport config so every scroll reveal triggers consistently.
export const VIEW = { once: true, amount: 0.3 }
export const VIEW_SOON = { once: true, amount: 0.18 }

// Detect a reduced-motion preference at call time (SSR-safe).
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
