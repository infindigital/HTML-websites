import { createContext, useContext } from 'react'

// Shared state for every scene: the resolved config, the religion's motif
// set (M), and helpers (replay, begin). Kept in its own module so scenes and
// the shell can both import it without a circular dependency.
export const ExperienceContext = createContext(null)

export function useExperience() {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience must be used within the experience shell')
  return ctx
}
