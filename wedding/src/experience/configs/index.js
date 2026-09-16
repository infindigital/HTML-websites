import hindu from './hindu.js'
import muslim from './muslim.js'
import christian from './christian.js'
import { venue as buildVenue } from './_shared.js'

const CONFIGS = { hindu, muslim, christian }

export function configFor(religion) {
  return CONFIGS[religion] || hindu
}

// Overlay a studio template's demo couple / date / venue onto the base
// config, so the storefront template and the immersive experience always
// agree — and so a real customer record (which rides on the same template
// shape) personalises the experience with no code changes.
export function mergeTemplate(base, template) {
  if (!template) return base
  const next = structuredClone ? structuredClone(base) : JSON.parse(JSON.stringify(base))
  const c = template.demoCouple
  if (c?.groom && c?.bride) {
    next.couple = {
      ...next.couple,
      groom: c.groom,
      bride: c.bride,
      combined: `${c.groom} & ${c.bride}`,
      monogram: template.monogram || next.couple.monogram,
    }
  }
  const ev = template.event
  if (ev) {
    next.date = {
      iso: ev.iso || next.date.iso,
      dateLabel: `${ev.weekday}, ${ev.day} ${ev.month} ${ev.year}`,
      timeLabel: ev.time || next.date.timeLabel,
    }
    if (ev.venue || ev.mapQuery) {
      next.venue = buildVenue({
        name: ev.venue || next.venue.name,
        address: ev.address || ev.city || next.venue.address,
        city: ev.city || next.venue.city,
        mapQuery: ev.mapQuery || ev.venue,
      })
    }
    next.ceremony = {
      ...next.ceremony,
      date: `${ev.day} ${ev.month} ${ev.year}`,
      time: ev.time || next.ceremony.time,
      venue: `${ev.venue}${ev.city ? `, ${ev.city}` : ''}`,
    }
  }
  return next
}

export { hindu, muslim, christian }
