import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import Confetti from '../primitives/Confetti.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  SAVE THE DATE, replaces the RSVP form (not needed for these invites).
//  A 3D, tilting card with the date and a one-tap "Add to calendar" (.ics)
//  that pops confetti. Fully client-side, works offline.
// =====================================================================
function buildIcs(config) {
  const { date, couple, venue } = config
  const dt = new Date(date.iso)
  if (Number.isNaN(dt.getTime())) return null
  const pad = (n) => String(n).padStart(2, '0')
  const fmt = (d) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  const end = new Date(dt.getTime() + 4 * 3600 * 1000)
  const loc = `${venue?.name ? `${venue.name}, ` : ''}${venue?.address || venue?.city || ''}`
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(dt)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${couple.combined}, Wedding`,
    `LOCATION:${loc}`,
    `DESCRIPTION:With love, ${couple.combined}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export default function Rsvp() {
  const { config } = useExperience()
  const [saved, setSaved] = useState(false)
  const { date, couple } = config
  const cardRef = useRef(null)

  // 3D pointer tilt (spring-smoothed).
  const rxRaw = useMotionValue(0)
  const ryRaw = useMotionValue(0)
  const rotateX = useSpring(rxRaw, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(ryRaw, { stiffness: 200, damping: 20 })
  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ryRaw.set(px * 12)
    rxRaw.set(-py * 12)
  }
  const onLeave = () => {
    rxRaw.set(0)
    ryRaw.set(0)
  }

  const add = () => {
    const ics = buildIcs(config)
    if (ics) {
      try {
        const blob = new Blob([ics], { type: 'text/calendar' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${couple.combined.replace(/\s+/g, '-')}.ics`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.setTimeout(() => URL.revokeObjectURL(url), 1500)
      } catch {
        /* download not permitted, still celebrate */
      }
    }
    setSaved(true)
  }

  return (
    <section className="scene scene--savedate" aria-label="Save the date">
      {saved && <Confetti className="savedate__confetti" />}
      <Reveal as="p" className="scene__eyebrow">Save the date</Reveal>

      <motion.div
        className="savedate__stage"
        initial={{ opacity: 0, y: 34, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 170, damping: 15 }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          ref={cardRef}
          className="savedate__card"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <span className="savedate__ring savedate__ring--a" aria-hidden="true" style={{ transform: 'translateZ(6px)' }} />
          <span className="savedate__ring savedate__ring--b" aria-hidden="true" style={{ transform: 'translateZ(6px)' }} />
          <span className="savedate__mono" style={{ transform: 'translateZ(48px)' }}>{couple.monogram}</span>
          <p className="savedate__day" style={{ transform: 'translateZ(34px)' }}>{date.dateLabel}</p>
          <p className="savedate__time" style={{ transform: 'translateZ(24px)' }}>{date.timeLabel}</p>
          <div style={{ transform: 'translateZ(56px)' }}>
            <InteractiveObject
              className={`savedate__btn${saved ? ' is-saved' : ''}`}
              label="Add to your calendar"
              active={saved}
              onActivate={add}
            >
              <span>{saved ? 'Added, see you there ✓' : 'Add to calendar'}</span>
            </InteractiveObject>
          </div>
        </motion.div>
      </motion.div>

      <Reveal as="p" className="savedate__note" delay={0.15}>
        {saved ? 'We can’t wait to celebrate with you.' : 'Keep this day close to your heart.'}
      </Reveal>
    </section>
  )
}
