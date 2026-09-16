import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'
import InteractiveObject from '../primitives/InteractiveObject.jsx'

// =====================================================================
//  Character system — stylised, premium wedding figures (not cartoons).
//  ---------------------------------------------------------------------
//  Elegant gold-line silhouettes with translucent attire, tinted by the
//  active theme (--t-gold / --t-ivory). Subtle idle life: breathing, and a
//  swaying veil/dupatta. Attire adapts per religion. Reduced motion stills
//  them automatically (whileInView + MotionConfig reducedMotion="user").
// =====================================================================

const breathe = {
  animate: { scaleY: [1, 1.012, 1], y: [0, -1.5, 0] },
  transition: { duration: 4.4, repeat: Infinity, ease: EASE.soft },
}
const sway = {
  animate: { rotate: [-1.4, 1.4, -1.4], x: [-1, 1, -1] },
  transition: { duration: 5.2, repeat: Infinity, ease: EASE.soft },
}

// ---- Groom -----------------------------------------------------------
function Groom({ religion }) {
  const turban = religion === 'hindu'
  const cap = religion === 'muslim'
  return (
    <svg viewBox="0 0 120 260" className="figure figure--groom" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="attireGroom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--t-ivory, #f4ead3)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--t-gold, #e6c879)" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <motion.g {...breathe} style={{ transformOrigin: '60px 250px' }}>
        {/* coat / sherwani / suit */}
        <path d="M60 78 C 40 82 34 96 34 120 L28 240 L92 240 L86 120 C86 96 80 82 60 78 Z"
          fill="url(#attireGroom)" stroke="var(--t-gold,#e6c879)" strokeWidth="1.6" />
        {/* placket */}
        <path d="M60 84 V236" stroke="var(--t-gold,#e6c879)" strokeWidth="1" opacity="0.6" />
        {[110, 140, 170, 200].map((y) => <circle key={y} cx="60" cy={y} r="1.8" fill="var(--t-gold,#e6c879)" />)}
        {/* collar */}
        <path d="M52 82 L60 96 L68 82" stroke="var(--t-gold,#e6c879)" strokeWidth="1.4" fill="none" />
        {/* shoulders/arms */}
        <path d="M34 118 L24 186 M86 118 L96 186" stroke="var(--t-gold,#e6c879)" strokeWidth="1.4" opacity="0.7" />
      </motion.g>
      {/* head */}
      <circle cx="60" cy="52" r="18" fill="var(--t-ivory,#f4ead3)" fillOpacity="0.2" stroke="var(--t-gold,#e6c879)" strokeWidth="1.6" />
      {turban && <path d="M42 46 Q60 22 78 46 Q60 40 42 46 Z" fill="var(--t-gold,#e6c879)" fillOpacity="0.55" stroke="var(--t-gold,#e6c879)" strokeWidth="1.4" />}
      {turban && <path d="M74 30 q10 6 4 18" stroke="var(--t-gold,#e6c879)" strokeWidth="2" fill="none" />}
      {cap && <path d="M45 42 Q60 30 75 42 Z" fill="var(--t-gold,#e6c879)" fillOpacity="0.5" stroke="var(--t-gold,#e6c879)" strokeWidth="1.4" />}
    </svg>
  )
}

// ---- Bride -----------------------------------------------------------
function Bride({ religion }) {
  return (
    <svg viewBox="0 0 120 260" className="figure figure--bride" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="attireBride" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--t-ivory, #f4ead3)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--t-gold, #e6c879)" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <motion.g {...breathe} style={{ transformOrigin: '60px 250px' }}>
        {/* gown / lehenga — wider A-line */}
        <path d="M60 80 C 44 84 40 98 40 116 L20 242 L100 242 L80 116 C80 98 76 84 60 80 Z"
          fill="url(#attireBride)" stroke="var(--t-gold,#e6c879)" strokeWidth="1.6" />
        {/* hem detail */}
        <path d="M24 232 Q60 246 96 232" stroke="var(--t-gold,#e6c879)" strokeWidth="1.2" opacity="0.7" fill="none" />
        <path d="M30 206 Q60 220 90 206" stroke="var(--t-gold,#e6c879)" strokeWidth="1" opacity="0.5" fill="none" />
        {/* waist */}
        <path d="M46 116 Q60 124 74 116" stroke="var(--t-gold,#e6c879)" strokeWidth="1.2" opacity="0.7" fill="none" />
      </motion.g>
      {/* veil / dupatta — sways */}
      <motion.path {...sway} style={{ transformOrigin: '60px 40px' }}
        d="M40 44 C 26 70 22 140 30 210 C 40 150 44 92 60 66 C 76 92 80 150 90 210 C 98 140 94 70 80 44 Z"
        fill="var(--t-ivory,#f4ead3)" fillOpacity="0.12" stroke="var(--t-gold,#e6c879)" strokeWidth="1.1" />
      {/* head */}
      <circle cx="60" cy="52" r="17" fill="var(--t-ivory,#f4ead3)" fillOpacity="0.2" stroke="var(--t-gold,#e6c879)" strokeWidth="1.6" />
      {/* maang tikka / bindi for hindu, simple crown otherwise */}
      {religion === 'hindu' && <circle cx="60" cy="40" r="2" fill="var(--t-gold,#e6c879)" />}
      <path d="M46 40 Q60 30 74 40" stroke="var(--t-gold,#e6c879)" strokeWidth="1.4" fill="none" />
    </svg>
  )
}

export function AnimatedGroom({ religion = 'hindu', className = '' }) {
  return <span className={`figwrap ${className}`}><Groom religion={religion} /></span>
}
export function AnimatedBride({ religion = 'hindu', className = '' }) {
  return <span className={`figwrap ${className}`}><Bride religion={religion} /></span>
}

// ---- The couple, side by side. Optionally tappable (couple-interaction).
export default function AnimatedCouple({ religion = 'hindu', onBride, onGroom, interactive = false, className = '' }) {
  if (!interactive) {
    return (
      <div className={`couple ${className}`}>
        <span className="couple__fig couple__fig--groom"><Groom religion={religion} /></span>
        <span className="couple__fig couple__fig--bride"><Bride religion={religion} /></span>
      </div>
    )
  }
  return (
    <div className={`couple couple--interactive ${className}`}>
      <InteractiveObject className="couple__fig couple__fig--groom" label="The groom" onActivate={onGroom}>
        <Groom religion={religion} />
      </InteractiveObject>
      <InteractiveObject className="couple__fig couple__fig--bride" label="The bride" onActivate={onBride}>
        <Bride religion={religion} />
      </InteractiveObject>
    </div>
  )
}
