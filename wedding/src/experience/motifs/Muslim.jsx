import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  MUSLIM MOTIFS — "Under the Same Moon"
//  Lanterns, crescent, stars, Islamic geometry, the arch.
//  Deep midnight blue + emerald + champagne gold. Calm, peaceful, refined.
//  Contract:  SideLamp · Portal · PatternDraw · Ceremony · Spark
// =====================================================================

// ---- Lantern (fanoos) — the flanking interactive light. Glows when lit.
export function SideLamp({ bright = false, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 150" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="52%" r="55%">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#e9b64a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e9b64a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lanternGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d183" />
          <stop offset="100%" stopColor="#a9812f" />
        </linearGradient>
      </defs>

      <motion.ellipse
        cx="60" cy="78" rx="50" ry="54" fill="url(#lanternGlow)"
        animate={{ opacity: bright ? [0.8, 1, 0.8] : [0.35, 0.5, 0.35], scale: bright ? 1.12 : 1 }}
        transition={{ duration: 2.6, repeat: Infinity, ease: EASE.soft }}
        style={{ transformOrigin: '60px 78px' }}
      />

      {/* hanger */}
      <path d="M60 6 V18" stroke="url(#lanternGold)" strokeWidth="2.5" />
      <circle cx="60" cy="6" r="4" stroke="url(#lanternGold)" strokeWidth="2.5" fill="none" />
      {/* top cap */}
      <path d="M40 30 L80 30 L72 44 L48 44 Z" fill="url(#lanternGold)" />
      {/* body */}
      <path d="M46 44 L74 44 L82 108 Q60 122 38 108 Z" fill="#123a30" opacity="0.92" />
      <path d="M46 44 L74 44 L82 108 Q60 122 38 108 Z" stroke="url(#lanternGold)" strokeWidth="2.5" fill="none" />
      {/* glass glow */}
      <motion.path
        d="M52 50 L68 50 L74 104 Q60 114 46 104 Z" fill="#ffe9a8"
        animate={{ opacity: bright ? [0.55, 0.85, 0.55] : [0.2, 0.32, 0.2] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: EASE.soft }}
      />
      {/* lattice */}
      <path d="M60 46 V112 M48 60 H72 M46 88 H74" stroke="url(#lanternGold)" strokeWidth="1.2" opacity="0.7" />
      {/* finial */}
      <path d="M54 116 L66 116 L60 130 Z" fill="url(#lanternGold)" />
    </svg>
  )
}

// ---- Pointed arch (mihrab) — the opening centrepiece. Leaves swing open.
export function Portal({ open = false, className = '' }) {
  const leaf = (side) => ({
    initial: { rotateY: 0 },
    animate: { rotateY: open ? side * 80 : 0 },
    transition: { duration: 1.25, ease: EASE.enter },
  })
  return (
    <div className={`portal portal--arch ${className}`}>
      <div className="portal__light portal__light--cool" data-open={open ? 'true' : 'false'} />
      <svg viewBox="0 0 200 300" fill="none" className="portal__frame" aria-hidden="true">
        <defs>
          <linearGradient id="archGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a9812f" />
            <stop offset="50%" stopColor="#f0d183" />
            <stop offset="100%" stopColor="#a9812f" />
          </linearGradient>
        </defs>
        {/* ogee / pointed arch */}
        <path d="M20 300 V120 Q20 60 60 42 Q100 20 140 42 Q180 60 180 120 V300"
          stroke="url(#archGold)" strokeWidth="8" fill="none" />
        <path d="M34 300 V124 Q34 74 66 58 Q100 40 134 58 Q166 74 166 124 V300"
          stroke="url(#archGold)" strokeWidth="2" opacity="0.6" fill="none" />
        <path d="M100 18 L104 30 L116 30 L106 38 L110 50 L100 42 L90 50 L94 38 L84 30 L96 30 Z" fill="#f0d183" />
      </svg>

      <div className="portal__leaves" aria-hidden="true">
        <motion.span className="portal__leaf portal__leaf--l portal__leaf--cool" {...leaf(-1)} />
        <motion.span className="portal__leaf portal__leaf--r portal__leaf--cool" {...leaf(1)} />
      </div>
    </div>
  )
}

// ---- Islamic geometry (8-point star) — scroll-drawn. `progress` 0..1.
export function PatternDraw({ progress, className = '' }) {
  const common = { fill: 'none', stroke: 'url(#geoGold)', strokeLinecap: 'round', strokeLinejoin: 'round' }
  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="geoGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a9812f" />
          <stop offset="50%" stopColor="#f0d183" />
          <stop offset="100%" stopColor="#a9812f" />
        </linearGradient>
      </defs>
      <motion.circle cx="160" cy="160" r="150" strokeWidth="1.5" {...common} style={{ pathLength: progress }} />
      <motion.rect x="60" y="60" width="200" height="200" strokeWidth="2" {...common} style={{ pathLength: progress }} />
      <motion.rect x="60" y="60" width="200" height="200" strokeWidth="2" transform="rotate(45 160 160)" {...common} style={{ pathLength: progress }} />
      <motion.circle cx="160" cy="160" r="96" strokeWidth="1.5" {...common} style={{ pathLength: progress }} />
      <motion.circle cx="160" cy="160" r="52" strokeWidth="2" {...common} style={{ pathLength: progress }} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <circle key={i} cx={160 + Math.cos(a) * 150} cy={160 + Math.sin(a) * 150} r="2.6" fill="#f0d183" />
      })}
    </svg>
  )
}

// ---- Nikah arch with hanging lanterns — the ceremony centrepiece.
export function Ceremony({ lit = 0, className = '' }) {
  const litCount = Math.round(lit * 5)
  return (
    <svg className={className} viewBox="0 0 360 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="nikahGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d183" />
          <stop offset="100%" stopColor="#a9812f" />
        </linearGradient>
      </defs>
      {/* grand arch */}
      <path d="M40 290 V120 Q40 50 110 34 Q180 16 250 34 Q320 50 320 120 V290"
        stroke="url(#nikahGold)" strokeWidth="7" fill="none" />
      <path d="M64 290 V126 Q64 68 122 54 Q180 40 238 54 Q296 68 296 126 V290"
        stroke="url(#nikahGold)" strokeWidth="1.5" opacity="0.55" fill="none" />
      {/* hanging lanterns */}
      {[90, 140, 180, 220, 270].map((x, i) => {
        const on = i < litCount
        const y = 70 + (i % 2) * 16
        return (
          <g key={x} opacity={on ? 1 : 0.32}>
            <path d={`M${x} 40 V${y}`} stroke="url(#nikahGold)" strokeWidth="1" />
            <rect x={x - 6} y={y} width="12" height="18" rx="2" fill={on ? '#ffe9a8' : '#12352c'} stroke="url(#nikahGold)" strokeWidth="1" />
            {on && <circle cx={x} cy={y + 9} r="14" fill="#e9b64a" opacity="0.35" />}
          </g>
        )
      })}
      {/* crescent finial */}
      <path d="M180 20 a12 12 0 1 0 6 22 a9 9 0 1 1 -6 -22 Z" fill="#f0d183" />
    </svg>
  )
}

// ---- Star — a small tappable discovery point.
export function Spark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M30 4 L35 24 L56 30 L35 36 L30 56 L25 36 L4 30 L25 24 Z" fill="#f0d183" />
      <circle cx="30" cy="30" r="4" fill="#fff6d8" />
    </svg>
  )
}

// ---- Crescent — used by the crescent-transition scene & closing.
export function Crescent({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4e39b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f4e39b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#moonGlow)" />
      <path d="M132 32 a72 72 0 1 0 34 118 a54 54 0 1 1 -34 -118 Z" fill="#f0d183" />
    </svg>
  )
}

export const meta = {
  particle: 'stars',
  progress: 'crescent',
  transition: 'stars',
  countdown: 'moon',
  openLabel: 'Tap the light',
  lampLabel: 'Light the lantern',
  sparkLabel: 'A star',
}

export default { SideLamp, Portal, PatternDraw, Ceremony, Spark, Crescent, meta }
