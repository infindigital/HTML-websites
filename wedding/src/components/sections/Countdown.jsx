import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Flourish } from '../ui/Ornaments.jsx'

const TARGET = new Date(config.date.iso).getTime()

function computeParts() {
  const diffRaw = TARGET - Date.now()
  const done = diffRaw <= 0
  let diff = Math.max(0, diffRaw)
  const d = Math.floor(diff / 86400000)
  diff -= d * 86400000
  const h = Math.floor(diff / 3600000)
  diff -= h * 3600000
  const m = Math.floor(diff / 60000)
  diff -= m * 60000
  const s = Math.floor(diff / 1000)
  return { d, h, m, s, done }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const { t } = useLanguage()
  const [parts, setParts] = useState(computeParts)

  useEffect(() => {
    const id = setInterval(() => setParts(computeParts()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: parts.d, label: t('days') },
    { value: parts.h, label: t('hours') },
    { value: parts.m, label: t('minutes') },
    { value: parts.s, label: t('seconds') },
  ]

  return (
    <section className="section countdown" aria-label="Countdown to the wedding">
      <Reveal as="h2" className="cinzel section-title">
        {t('countingDown')}
      </Reveal>
      <Reveal>
        <Flourish />
      </Reveal>

      {parts.done ? (
        <Reveal className="countdown__done">
          <p className="cormorant countdown__done-msg">{t('celebrationMsg')}</p>
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="confetti__bit"
                style={{ left: `${(i / 24) * 100}%` }}
                initial={{ y: -20, opacity: 0, rotate: 0 }}
                animate={{ y: 220, opacity: [0, 1, 1, 0], rotate: 360 }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: (i % 6) * 0.25,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.05} className="countdown__grid">
          {units.map((u) => (
            <div className="countdown__box" key={u.label}>
              <span className="cinzel countdown__num">{pad(u.value)}</span>
              <span className="countdown__label">{u.label}</span>
            </div>
          ))}
        </Reveal>
      )}
    </section>
  )
}
