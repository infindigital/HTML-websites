import { motion, useScroll, useSpring } from 'framer-motion'

// =====================================================================
//  ScrollProgress — a subtle, themed reading indicator.
//  ---------------------------------------------------------------------
//  Not a scrollbar. A small motif that quietly fills as the visitor moves
//  through the story:
//    hindu     → a rangoli ring drawing itself
//    muslim    → a crescent + star waxing
//    christian → a wedding ring closing
// =====================================================================
const R = 15
const C = 2 * Math.PI * R

export default function ScrollProgress({ variant = 'ring', label = 'Reading progress' }) {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <div className={`scrollprog scrollprog--${variant}`} role="img" aria-label={label}>
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        {/* faint track */}
        <circle cx="20" cy="20" r={R} className="scrollprog__track" fill="none" />

        {/* the filling motif */}
        <motion.circle
          cx="20"
          cy="20"
          r={R}
          className="scrollprog__fill"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          transform="rotate(-90 20 20)"
          style={{ pathLength: p }}
        />

        {/* per-theme decoration */}
        {variant === 'rangoli' &&
          Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <circle
                key={i}
                cx={20 + Math.cos(a) * (R + 3)}
                cy={20 + Math.sin(a) * (R + 3)}
                r="1.1"
                className="scrollprog__dot"
              />
            )
          })}

        {variant === 'crescent' && (
          <g className="scrollprog__star">
            <circle cx="20" cy="20" r="4.4" className="scrollprog__moon" />
            <circle cx="22" cy="18.4" r="3.6" className="scrollprog__moon-cut" />
          </g>
        )}

        {variant === 'ring' && <circle cx="20" cy="20" r="6.2" className="scrollprog__inner" fill="none" />}
      </svg>
    </div>
  )
}
