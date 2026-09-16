import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import { useExperience } from '../ExperienceContext.js'

function parts(target) {
  const done = target - Date.now() <= 0
  let d = Math.max(0, target - Date.now())
  const day = Math.floor(d / 86400000); d -= day * 86400000
  const h = Math.floor(d / 3600000); d -= h * 3600000
  const m = Math.floor(d / 60000); d -= m * 60000
  const s = Math.floor(d / 1000)
  return { day, h, m, s, done }
}
const pad = (n) => String(n).padStart(2, '0')

// Decorative rotating ring, drawn differently per theme (rangoli / moon / ring).
function Ring({ variant }) {
  if (variant === 'moon') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="44" className="cd__stroke" fill="none" strokeDasharray="2 7" />
        <path d="M64 18 a36 36 0 1 0 18 60 a27 27 0 1 1 -18 -60 Z" className="cd__moon" />
      </svg>
    )
  }
  if (variant === 'rings') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="44" className="cd__stroke" fill="none" />
        <circle cx="50" cy="50" r="37" className="cd__stroke2" fill="none" />
      </svg>
    )
  }
  // rangoli
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="44" className="cd__stroke" fill="none" strokeDasharray="1 6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <circle key={i} cx={50 + Math.cos(a) * 44} cy={50 + Math.sin(a) * 44} r="2" className="cd__dot" />
      })}
      <circle cx="50" cy="50" r="30" className="cd__stroke2" fill="none" />
    </svg>
  )
}

function Disc({ value, label, variant, spin }) {
  return (
    <div className={`cd__disc cd__disc--${variant}`}>
      <motion.span
        className="cd__ring"
        aria-hidden="true"
        animate={{ rotate: spin }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <Ring variant={variant} />
      </motion.span>
      <span className="cd__num">{value}</span>
      <span className="cd__label">{label}</span>
    </div>
  )
}

// =====================================================================
//  COUNTDOWN — integrated with the theme, never four plain boxes.
//  Four decorative discs (rangoli / moon phases / wedding rings) that
//  subtly rotate. Updates every second.
// =====================================================================
export default function Countdown() {
  const { config, M } = useExperience()
  const variant = M.meta.countdown
  const target = useMemo(() => new Date(config.date.iso).getTime(), [config.date.iso])
  const [p, setP] = useState(() => parts(target))

  useEffect(() => {
    setP(parts(target))
    const id = setInterval(() => setP(parts(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { value: pad(p.day), label: 'Days', spin: 360 },
    { value: pad(p.h), label: 'Hours', spin: -360 },
    { value: pad(p.m), label: 'Minutes', spin: 360 },
    { value: pad(p.s), label: 'Seconds', spin: -360 },
  ]

  return (
    <section className="scene scene--countdown" aria-label="Countdown to the wedding">
      <Reveal as="p" className="scene__eyebrow">Counting down to</Reveal>
      <Reveal as="h2" className="scene__title">{config.date.dateLabel}</Reveal>

      {p.done ? (
        <Reveal className="cd__today">Today, we celebrate ✦</Reveal>
      ) : (
        <Reveal className="cd__grid" delay={0.05}>
          {units.map((u) => (
            <Disc key={u.label} value={u.value} label={u.label} variant={variant} spin={u.spin} />
          ))}
        </Reveal>
      )}
    </section>
  )
}
