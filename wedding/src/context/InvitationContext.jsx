import { createContext, useContext } from 'react'
import config from '../config.js'

// =====================================================================
//  InvitationContext
//  ---------------------------------------------------------------------
//  Makes the invitation engine data-driven. A template (or, later, a real
//  customer record) supplies the couple, the date, the venue and the
//  religion-specific wording; the engine reads them through t() (labels)
//  and useInvitation() (date / venue / invocation), falling back to the
//  DEMO defaults in config.js / i18n.js.
//
//  This is what lets one engine render every template - and become an
//  actual product: swap the data, keep the components.
// =====================================================================

export const InvitationContext = createContext(null)

// Religion-specific content. Muslim intentionally omits ceremony / occasion /
// verse so the fully-localised i18n defaults (Nikah, Ar-Rum 30:21, in every
// language) keep showing. Hindu / Christian have no i18n translations, so they
// supply English wording that overrides across languages (fine for a demo).
// NOTE: the Hindu blessing and Christian verse below are tasteful, editable
// placeholders - swap them for the couple's chosen scripture at order time.
const RELIGION = {
  muslim: {
    invocation: { glyph: '﷽', cls: 'amiri' }, // Bismillah ligature ﷽
    verseMark: '﴾ ﴿', // ﴾ ﴿
  },
  hindu: {
    invocation: { glyph: '॥ श्री गणेशाय नमः ॥', cls: 'invocation-hi' }, // ॥ श्री गणेशाय नमः ॥
    verseMark: 'ॐ', // ॐ
    ceremony: 'VIVAAH CEREMONY',
    occasion: 'On the auspicious occasion of the wedding of',
    verse: {
      text:
        'Bound by love, blessed by family and guided by the sacred vows of the seven steps, may their life together be filled with joy, prosperity and lifelong togetherness.',
      ref: 'A blessing for the couple',
    },
  },
  christian: {
    invocation: { glyph: '✝', cls: 'invocation-cross' }, // ✝
    verseMark: '✠', // ✠
    ceremony: 'HOLY MATRIMONY',
    occasion: 'On the joyful occasion of the wedding of',
    verse: {
      text:
        'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.',
      ref: '1 Corinthians 13:4–7',
    },
  },
}

// Build the override payload from a catalogue template (or null = base demo).
export function buildInvitation(template) {
  if (!template) return null
  const base = config.couple
  const c = template.demoCouple || {}
  const ev = template.event || null
  const rc = RELIGION[template.religion] || RELIGION.muslim
  const labels = {}

  // ---- names. The flagship base couple keeps its fully-localised i18n names;
  // other demo couples override the visible strings (Latin across languages is
  // fine for a demo). Parentage is blank - a demo has no family list.
  const sameAsBase = c.groom === base.groomFirst && c.bride === base.brideFirst
  if (c.groom && !sameAsBase) {
    Object.assign(labels, {
      nameGroomFirst: c.groom,
      nameBrideFirst: c.bride,
      nameCombined: `${c.groom} & ${c.bride}`,
      nameGroomFull: c.groom,
      nameBrideFull: c.bride,
      nameGroomParentage: '',
      nameBrideParentage: '',
    })
  }

  // ---- date + place, from the template's demo event.
  if (ev) {
    labels.dateUpper = `${ev.weekday}, ${ev.day} ${ev.month} ${ev.year}`.toUpperCase()
    labels.venueShort = ev.city || ev.venue
    labels.ceremonyDate = `${ev.day} ${ev.month} ${ev.year}`
    labels.ceremonyTime = ev.time
  }

  // ---- religion wording (Muslim keeps the multilingual i18n defaults).
  if (template.religion && template.religion !== 'muslim') {
    if (rc.ceremony) labels.nikahCeremony = rc.ceremony
    if (rc.occasion) labels.onOccasionSon = rc.occasion
    if (rc.verse) {
      labels.verseText = rc.verse.text
      labels.verseRef = rc.verse.ref
    }
  }

  const venue = ev
    ? {
        name: ev.venue,
        address: ev.address || ev.city || '',
        mapQuery: ev.mapQuery || ev.venue,
        googleMapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
          ev.mapQuery || ev.venue,
        )}&z=14&output=embed`,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          ev.mapQuery || ev.venue,
        )}`,
      }
    : null

  return {
    labels,
    monogram: template.monogram || base.monogram,
    year: ev?.year ? Number(String(ev.year)) : base.year,
    iso: ev?.iso || config.date.iso,
    venue,
    invocation: rc.invocation,
    verseMark: rc.verseMark,
  }
}

export function InvitationProvider({ template, children }) {
  return (
    <InvitationContext.Provider value={buildInvitation(template)}>
      {children}
    </InvitationContext.Provider>
  )
}

// Resolved view-data with graceful fallback to the config demo defaults.
export function useInvitation() {
  const ctx = useContext(InvitationContext)
  return {
    labels: ctx?.labels ?? {},
    monogram: ctx?.monogram ?? config.couple.monogram,
    year: ctx?.year ?? config.couple.year,
    iso: ctx?.iso ?? config.date.iso,
    venue: ctx?.venue ?? config.venue,
    invocation: ctx?.invocation ?? { glyph: config.bismillah, cls: 'amiri' },
    verseMark: ctx?.verseMark ?? '﴾ ﴿',
  }
}
