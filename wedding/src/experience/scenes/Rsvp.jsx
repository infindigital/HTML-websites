import { useState } from 'react'
import { Reveal } from '../primitives/Reveal.jsx'
import Confetti from '../primitives/Confetti.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  SAVE THE DATE — replaces the RSVP form (not needed for these invites).
//  A themed card with the date and a one-tap "Add to calendar" (.ics) that
//  pops confetti. Fully client-side, works offline.
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
    `SUMMARY:${couple.combined} — Wedding`,
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
        /* download not permitted — still celebrate */
      }
    }
    setSaved(true)
  }

  return (
    <section className="scene scene--savedate" aria-label="Save the date">
      {saved && <Confetti className="savedate__confetti" />}
      <Reveal as="p" className="scene__eyebrow">Save the date</Reveal>

      <div className="savedate__card">
        <span className="savedate__mono" aria-hidden="true">{couple.monogram}</span>
        <p className="savedate__day">{date.dateLabel}</p>
        <p className="savedate__time">{date.timeLabel}</p>
        <InteractiveObject
          className={`savedate__btn${saved ? ' is-saved' : ''}`}
          label="Add to your calendar"
          active={saved}
          onActivate={add}
        >
          <span>{saved ? 'Added — see you there ✓' : 'Add to calendar'}</span>
        </InteractiveObject>
      </div>

      <Reveal as="p" className="savedate__note" delay={0.15}>
        {saved ? 'We can’t wait to celebrate with you.' : 'Keep this day close to your heart.'}
      </Reveal>
    </section>
  )
}
