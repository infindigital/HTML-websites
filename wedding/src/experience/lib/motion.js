// =====================================================================
//  Motion tokens for the immersive invitation experience.
//  Centralised durations + custom cubic-beziers so every scene shares one
//  motion language (see the master brief: "centralized motion tokens").
// =====================================================================

// Custom eases — each movement gets an intentional curve, never a default.
export const EASE = {
  // Calm, cinematic settle (decelerate). Good for reveals.
  out: [0.22, 1, 0.36, 1],
  // Gentle in-out for continuous, breathing motion.
  soft: [0.45, 0, 0.55, 1],
  // A slight overshoot for objects that "arrive".
  pop: [0.34, 1.56, 0.64, 1],
  // Weighted enter (anticipation) for doors / curtains opening.
  enter: [0.16, 0.84, 0.44, 1],
}

export const DUR = {
  xs: 0.35,
  sm: 0.55,
  md: 0.8,
  lg: 1.2,
  xl: 1.6,
}

// Non-hook reduced-motion check (for canvas / imperative code).
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

// Shared reveal variants (line/word/element rise out of a soft mask).
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.md, ease: EASE.out } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.lg, ease: EASE.soft } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.md, ease: EASE.out } },
}

// Stagger container: children animate one after another.
export const stagger = (each = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})
