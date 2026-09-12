import { createContext, useContext } from 'react'
import config from '../config.js'

// =====================================================================
//  InvitationContext
//  ---------------------------------------------------------------------
//  Makes the invitation engine data-driven. A template (or, later, a real
//  customer record) supplies name/label overrides + monogram; the engine
//  reads them through t() (labels) and useInvitation() (monogram/year),
//  falling back to the DEMO defaults in config.js / i18n.js.
//
//  This is what lets one engine become an actual product: swap the data,
//  keep the components.
// =====================================================================

export const InvitationContext = createContext(null)

// Build the override payload from a catalogue template (or null = base demo).
export function buildInvitation(template) {
  if (!template) return null
  const base = config.couple
  const c = template.demoCouple || {}
  const monogram = template.monogram || base.monogram

  // Flagship / base couple: keep the fully-localised i18n names, vary only
  // the monogram.
  const sameAsBase = c.groom === base.groomFirst && c.bride === base.brideFirst
  if (sameAsBase) return { labels: {}, monogram, year: base.year }

  // Other demo couples: override the visible name strings (Latin across all
  // languages is fine for a demo). Parentage is blank - demo has no family.
  const combined = `${c.groom} & ${c.bride}`
  return {
    labels: {
      nameGroomFirst: c.groom,
      nameBrideFirst: c.bride,
      nameCombined: combined,
      nameGroomFull: c.groom,
      nameBrideFull: c.bride,
      nameGroomParentage: '',
      nameBrideParentage: '',
    },
    monogram,
    year: base.year,
  }
}

export function InvitationProvider({ template, children }) {
  return (
    <InvitationContext.Provider value={buildInvitation(template)}>
      {children}
    </InvitationContext.Provider>
  )
}

// Resolved view-data with graceful fallback to config defaults.
export function useInvitation() {
  const ctx = useContext(InvitationContext)
  return {
    labels: ctx?.labels ?? {},
    monogram: ctx?.monogram ?? config.couple.monogram,
    year: ctx?.year ?? config.couple.year,
  }
}
