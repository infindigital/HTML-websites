import { motion, useMotionValue, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  CHRISTIAN MOTIFS — "A Walk into Forever"
//  Wedding rings, church, floral arch, candles, butterflies.
//  Golden-hour ivory + champagne + sage. Romantic, editorial, airy.
//  Contract:  SideLamp · Portal · PatternDraw · Ceremony · Spark
// =====================================================================

// ---- Candle — the flanking interactive light. Flame grows when lit.
export function SideLamp({ bright = false, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 90 150" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="candleGlow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#e7c58a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e7c58a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="candleWax" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf3e4" />
          <stop offset="100%" stopColor="#e4d3b2" />
        </linearGradient>
      </defs>
      <motion.ellipse
        cx="45" cy="46" rx="42" ry="46" fill="url(#candleGlow)"
        animate={{ opacity: bright ? [0.85, 1, 0.85] : [0.35, 0.5, 0.35], scale: bright ? 1.14 : 1 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: EASE.soft }}
        style={{ transformOrigin: '45px 46px' }}
      />
      <motion.g
        style={{ transformOrigin: '45px 52px' }}
        animate={{ scaleY: bright ? [1.05, 1.3, 1.05] : [0.92, 1.04, 0.92], rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: EASE.soft }}
      >
        <path d="M45 22 C52 34 53 44 45 54 C37 44 38 34 45 22 Z" fill="#ffd98a" />
        <path d="M45 32 C49 40 49 48 45 53 C41 48 41 40 45 32 Z" fill="#f0a24a" />
      </motion.g>
      <path d="M45 54 V60" stroke="#7a6a4a" strokeWidth="1.5" />
      <rect x="33" y="60" width="24" height="78" rx="5" fill="url(#candleWax)" />
      <ellipse cx="45" cy="60" rx="12" ry="3.4" fill="#fff8ec" />
      <rect x="27" y="136" width="36" height="8" rx="3" fill="#c8a76a" />
    </svg>
  )
}

// ---- Church door — the opening centrepiece. Double leaves swing open.
export function Portal({ open = false, className = '' }) {
  const leaf = (side) => ({
    initial: { rotateY: 0 },
    animate: { rotateY: open ? side * 84 : 0 },
    transition: { duration: 1.3, ease: EASE.enter },
  })
  return (
    <div className={`portal portal--church ${className}`}>
      <div className="portal__light portal__light--warm" data-open={open ? 'true' : 'false'} />
      <svg viewBox="0 0 200 300" fill="none" className="portal__frame" aria-hidden="true">
        <defs>
          <linearGradient id="churchGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b98f52" />
            <stop offset="50%" stopColor="#efdcb0" />
            <stop offset="100%" stopColor="#b98f52" />
          </linearGradient>
        </defs>
        {/* rounded arch frame */}
        <path d="M24 300 V110 Q24 40 100 40 Q176 40 176 110 V300" stroke="url(#churchGold)" strokeWidth="8" fill="none" />
        <path d="M38 300 V114 Q38 54 100 54 Q162 54 162 114 V300" stroke="url(#churchGold)" strokeWidth="2" opacity="0.6" fill="none" />
        {/* cross finial */}
        <path d="M100 8 V34 M90 18 H110" stroke="url(#churchGold)" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="portal__leaves" aria-hidden="true">
        <motion.span className="portal__leaf portal__leaf--l portal__leaf--warm" {...leaf(-1)} />
        <motion.span className="portal__leaf portal__leaf--r portal__leaf--warm" {...leaf(1)} />
      </div>
    </div>
  )
}

// ---- Two wedding rings that draw + move together as `progress` 0..1.
export function PatternDraw({ progress, className = '' }) {
  const fallback = useMotionValue(1)
  const prog = progress ?? fallback
  const xL = useTransform(prog, [0, 1], [104, 138])
  const xR = useTransform(prog, [0, 1], [216, 182])
  const spark = useTransform(prog, [0.72, 1], [0, 1])
  const common = { fill: 'none', stroke: 'url(#ringGold)', strokeWidth: 7 }
  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b98f52" />
          <stop offset="45%" stopColor="#f3e6c4" />
          <stop offset="100%" stopColor="#b98f52" />
        </linearGradient>
      </defs>
      <motion.circle cy="168" r="58" {...common} style={{ cx: xL, pathLength: prog }} />
      <motion.circle cy="168" r="58" {...common} style={{ cx: xR, pathLength: prog }} />
      {/* little diamond glint where they meet */}
      <motion.g style={{ opacity: spark }}>
        <path d="M160 96 l7 12 -7 12 -7 -12 z" fill="#fff6df" />
        <circle cx="160" cy="120" r="3" fill="#f3e6c4" />
      </motion.g>
    </svg>
  )
}

// ---- Church interior (aisle + windows + candles) — the ceremony centrepiece.
export function Ceremony({ lit = 0, className = '' }) {
  const litCount = Math.round(lit * 6)
  return (
    <svg className={className} viewBox="0 0 360 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="aisleGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efdcb0" />
          <stop offset="100%" stopColor="#b98f52" />
        </linearGradient>
        <radialGradient id="altarGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffe9c2" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* altar window glow */}
      <ellipse cx="180" cy="70" rx="70" ry="80" fill="url(#altarGlow)" opacity={0.4 + lit * 0.6} />
      {/* arched altar window */}
      <path d="M150 120 V70 Q150 34 180 34 Q210 34 210 70 V120 Z" stroke="url(#aisleGold)" strokeWidth="3" fill="#f6e7c8" opacity="0.6" />
      <path d="M180 36 V120 M152 78 H208" stroke="url(#aisleGold)" strokeWidth="1" opacity="0.7" />
      {/* side windows */}
      {[70, 110, 250, 290].map((x) => (
        <path key={x} d={`M${x} 150 V96 Q${x} 74 ${x + 16} 74 Q${x + 32} 74 ${x + 32} 96 V150 Z`}
          stroke="url(#aisleGold)" strokeWidth="1.5" fill="#f6e7c8" opacity="0.4" transform={x < 180 ? '' : ''} />
      ))}
      {/* perspective aisle */}
      <path d="M150 120 L120 290 L240 290 L210 120 Z" fill="url(#aisleGold)" opacity="0.28" />
      <path d="M150 120 L120 290 M210 120 L240 290" stroke="url(#aisleGold)" strokeWidth="1.5" opacity="0.6" />
      {/* candles down the aisle, lighting in sequence */}
      {[[135, 250], [225, 250], [146, 200], [214, 200], [154, 160], [206, 160]].map(([x, y], i) => {
        const on = i < litCount
        return (
          <g key={i} opacity={on ? 1 : 0.3}>
            {on && <circle cx={x} cy={y - 8} r="10" fill="#ffe0a0" opacity="0.5" />}
            <rect x={x - 2} y={y} width="4" height="14" fill="#f3e6c4" />
            <circle cx={x} cy={y - 3} r={on ? 3 : 1.4} fill={on ? '#ffd98a' : '#8a7a58'} />
          </g>
        )
      })}
    </svg>
  )
}

// ---- Flower — a small tappable discovery bloom.
export function Spark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 70 70" fill="none" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        return (
          <ellipse key={i} cx={35 + Math.cos(a) * 15} cy={35 + Math.sin(a) * 15}
            rx="10" ry="15" fill="#f4d9c0"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${35 + Math.cos(a) * 15} ${35 + Math.sin(a) * 15})`} />
        )
      })}
      <circle cx="35" cy="35" r="8" fill="#e7c58a" />
    </svg>
  )
}

// ---- Butterfly — a Christian garden discovery (flies on tap).
export function Butterfly({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 50" fill="none" aria-hidden="true">
      <path d="M30 25 C10 4 2 20 12 30 C2 40 16 46 30 28 Z" fill="#e7c58a" opacity="0.9" />
      <path d="M30 25 C50 4 58 20 48 30 C58 40 44 46 30 28 Z" fill="#f4d9c0" opacity="0.9" />
      <ellipse cx="30" cy="26" rx="2.2" ry="10" fill="#8a6a3a" />
    </svg>
  )
}

export const meta = {
  particle: 'blossom',
  progress: 'ring',
  transition: 'light',
  countdown: 'rings',
  openLabel: 'Begin our story',
  lampLabel: 'Light the candle',
  sparkLabel: 'A flower',
}

export default { SideLamp, Portal, PatternDraw, Ceremony, Spark, Butterfly, meta }
