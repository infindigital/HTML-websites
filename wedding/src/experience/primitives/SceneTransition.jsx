import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  SceneTransition — a theme-specific seam between two scenes.
//  ---------------------------------------------------------------------
//  Dropped at a scene boundary, it softens the cut with a light sweep and
//  a scatter of theme motes that animate as it scrolls into view, so one
//  scene dissolves into the next rather than stacking like cards.
//    variant: 'petals' (Hindu) · 'stars' (Muslim) · 'light' (Christian)
// =====================================================================
const MOTES = Array.from({ length: 9 }, (_, i) => ({
  left: 6 + (i * 88) / 8 + (i % 2 ? 3 : -3),
  delay: (i % 5) * 0.12,
  size: 5 + (i % 3) * 4,
  drift: i % 2 ? 26 : -22,
}))

const GLYPH = { petals: '✿', stars: '✦', light: '❁' }

export default function SceneTransition({ variant = 'petals', flip = false }) {
  const glyph = GLYPH[variant] || '✦'
  return (
    <div
      className={`scenex scenex--${variant}${flip ? ' scenex--flip' : ''}`}
      aria-hidden="true"
    >
      <motion.span
        className="scenex__sweep"
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: [0, 1, 0.35], scaleX: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.4, ease: EASE.soft }}
      />
      {MOTES.map((m, i) => (
        <motion.span
          key={i}
          className="scenex__mote"
          style={{ left: `${m.left}%`, fontSize: m.size + 8 }}
          initial={{ opacity: 0, y: -8, x: 0, rotate: 0 }}
          whileInView={{ opacity: [0, 0.9, 0], y: 34, x: m.drift, rotate: 180 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.8, delay: m.delay, ease: EASE.out }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  )
}
