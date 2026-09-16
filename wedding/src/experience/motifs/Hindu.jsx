import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  HINDU MOTIFS — "The Journey to the Mandap"
//  Marigold, diyas, rangoli, the mandap. Warm maroon + antique gold.
//  Each religion implements the same motif contract so the scene
//  components stay generic:  Portal · SideLamp · PatternDraw · Ceremony · Spark
// =====================================================================

// ---- Diya (oil lamp) — the flanking interactive light. Flame grows when lit.
export function SideLamp({ bright = false, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 110" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="diyaGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffdf8a" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f0a13a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0a13a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diyaBowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9c15a" />
          <stop offset="100%" stopColor="#8a5a1c" />
        </linearGradient>
      </defs>

      <motion.ellipse
        cx="60" cy="46" rx="52" ry="42" fill="url(#diyaGlow)"
        animate={{ opacity: bright ? [0.85, 1, 0.85] : [0.4, 0.55, 0.4], scale: bright ? 1.12 : 1 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: EASE.soft }}
        style={{ transformOrigin: '60px 46px' }}
      />

      {/* flame */}
      <motion.g
        style={{ transformOrigin: '60px 52px' }}
        animate={{
          scaleY: bright ? [1.05, 1.25, 1.05] : [0.9, 1, 0.9],
          scaleX: bright ? [1, 1.06, 0.98] : [0.96, 1, 0.96],
          rotate: [-2, 2, -2],
        }}
        transition={{ duration: 1.1, repeat: Infinity, ease: EASE.soft }}
      >
        <path d="M60 20 C 70 36 72 46 60 58 C 48 46 50 36 60 20 Z" fill="#ffd873" />
        <path d="M60 30 C 66 40 66 48 60 56 C 54 48 54 40 60 30 Z" fill="#f0762a" />
      </motion.g>

      {/* bowl */}
      <path d="M22 58 Q60 92 98 58 Q60 74 22 58 Z" fill="url(#diyaBowl)" />
      <path d="M22 58 Q60 70 98 58" stroke="#f6d98a" strokeWidth="1.5" opacity="0.7" />
      <ellipse cx="60" cy="58" rx="40" ry="7" fill="#3a0e14" opacity="0.35" />
    </svg>
  )
}

// ---- Ornate doorway — the opening centrepiece. Two leaves swing open.
export function Portal({ open = false, className = '' }) {
  const leaf = (side) => ({
    initial: { rotateY: 0 },
    animate: { rotateY: open ? side * 82 : 0 },
    transition: { duration: 1.25, ease: EASE.enter },
  })
  return (
    <div className={`portal portal--door ${className}`}>
      <div className="portal__light" data-open={open ? 'true' : 'false'} />
      <svg viewBox="0 0 200 300" fill="none" className="portal__frame" aria-hidden="true">
        <defs>
          <linearGradient id="doorGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b8862c" />
            <stop offset="50%" stopColor="#f4e2a0" />
            <stop offset="100%" stopColor="#b8862c" />
          </linearGradient>
        </defs>
        {/* arch frame + toran garland */}
        <path d="M18 300 V96 Q100 8 182 96 V300" stroke="url(#doorGold)" strokeWidth="8" fill="none" />
        <path d="M30 96 Q100 26 170 96" stroke="url(#doorGold)" strokeWidth="3" opacity="0.7" fill="none" />
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10
          const x = 30 + t * 140
          const y = 96 - Math.sin(t * Math.PI) * 62
          return <circle key={i} cx={x} cy={y + 10} r="4.5" fill="#e6771f" />
        })}
      </svg>

      <div className="portal__leaves" aria-hidden="true">
        <motion.span className="portal__leaf portal__leaf--l" {...leaf(-1)} />
        <motion.span className="portal__leaf portal__leaf--r" {...leaf(1)} />
      </div>
    </div>
  )
}

// ---- Rangoli — the scroll-drawn mandala. `progress` is a MotionValue 0..1.
export function PatternDraw({ progress, className = '' }) {
  const common = { fill: 'none', stroke: 'url(#rangoliGold)', strokeLinecap: 'round' }
  const petals = Array.from({ length: 12 })
  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rangoliGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c99a3a" />
          <stop offset="50%" stopColor="#f0d183" />
          <stop offset="100%" stopColor="#c99a3a" />
        </linearGradient>
      </defs>
      <motion.circle cx="160" cy="160" r="150" strokeWidth="1.5" {...common} style={{ pathLength: progress }} />
      <motion.circle cx="160" cy="160" r="120" strokeWidth="2" {...common} style={{ pathLength: progress }} />
      <motion.circle cx="160" cy="160" r="60" strokeWidth="2" {...common} style={{ pathLength: progress }} />
      {petals.map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const x1 = 160 + Math.cos(a) * 60
        const y1 = 160 + Math.sin(a) * 60
        const x2 = 160 + Math.cos(a) * 120
        const y2 = 160 + Math.sin(a) * 120
        const nx = 160 + Math.cos(a + 0.26) * 92
        const ny = 160 + Math.sin(a + 0.26) * 92
        const px = 160 + Math.cos(a - 0.26) * 92
        const py = 160 + Math.sin(a - 0.26) * 92
        return (
          <motion.path
            key={i}
            d={`M${x1} ${y1} Q${nx} ${ny} ${x2} ${y2} Q${px} ${py} ${x1} ${y1} Z`}
            strokeWidth="1.5"
            {...common}
            style={{ pathLength: progress }}
          />
        )
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        return <circle key={i} cx={160 + Math.cos(a) * 150} cy={160 + Math.sin(a) * 150} r="2.5" fill="#f0d183" />
      })}
    </svg>
  )
}

// ---- Mandap — the ceremony centrepiece. Diyas light up with `lit`.
export function Ceremony({ lit = 0, className = '' }) {
  const diya = (x, on) => (
    <g key={x} opacity={on ? 1 : 0.28}>
      <circle cx={x} cy="250" r={on ? 9 : 4} fill={on ? '#ffd873' : '#7a5a2a'} />
      {on && <circle cx={x} cy="250" r="16" fill="#f0a13a" opacity="0.4" />}
    </g>
  )
  const litCount = Math.round(lit * 5)
  return (
    <svg className={className} viewBox="0 0 360 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mandapGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e2a0" />
          <stop offset="100%" stopColor="#b8862c" />
        </linearGradient>
      </defs>
      {/* canopy */}
      <path d="M40 90 Q180 20 320 90 L300 110 Q180 55 60 110 Z" fill="url(#mandapGold)" />
      <path d="M60 110 Q180 150 300 110 L300 128 Q180 168 60 128 Z" fill="#e6771f" opacity="0.85" />
      {/* drapes */}
      {[70, 180, 290].map((x) => (
        <path key={x} d={`M${x} 120 q10 40 0 80 q-10 -40 0 -80`} fill="#d94f2a" opacity="0.7" />
      ))}
      {/* pillars */}
      <rect x="52" y="110" width="12" height="150" fill="url(#mandapGold)" />
      <rect x="296" y="110" width="12" height="150" fill="url(#mandapGold)" />
      {/* garland swag */}
      <path d="M58 118 Q180 178 302 118" stroke="#e6771f" strokeWidth="4" fill="none" />
      {/* row of diyas along the base */}
      {[70, 125, 180, 235, 290].map((x, i) => diya(x, i < litCount))}
    </svg>
  )
}

// ---- Marigold — a small tappable discovery bloom.
export function Spark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <ellipse key={i} cx={40 + Math.cos(a) * 20} cy={40 + Math.sin(a) * 20}
            rx="9" ry="14" fill="#f0a13a" opacity="0.92"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${40 + Math.cos(a) * 20} ${40 + Math.sin(a) * 20})`} />
        )
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2 + 0.3
        return (
          <ellipse key={`i${i}`} cx={40 + Math.cos(a) * 11} cy={40 + Math.sin(a) * 11}
            rx="6" ry="9" fill="#e6771f"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${40 + Math.cos(a) * 11} ${40 + Math.sin(a) * 11})`} />
        )
      })}
      <circle cx="40" cy="40" r="7" fill="#f4c65a" />
    </svg>
  )
}

export const meta = {
  particle: 'petals',
  progress: 'rangoli',
  transition: 'petals',
  countdown: 'rangoli',
  openLabel: 'Tap to begin',
  lampLabel: 'Light the diya',
  sparkLabel: 'Marigold',
}

export default { SideLamp, Portal, PatternDraw, Ceremony, Spark, meta }
