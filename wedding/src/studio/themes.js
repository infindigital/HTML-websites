// =====================================================================
//  PER-TEMPLATE VISUAL PALETTES
//  ---------------------------------------------------------------------
//  Each template has its own colour world, grouped by celebration style
//  (Muslim / Hindu / Christian). Applied via the inline CSS variables from
//  cssVars() on elements carrying data-theme-id.
// =====================================================================

export const THEMES = {
  // emerald + champagne
  noor: {
    id: 'noor',
    tokens: { ink: '#0b241d', ivory: '#f6f1e4', deep: '#1c6a52', glow: 'rgba(28,106,82,0.22)' },
  },
  // midnight blue + antique gold
  layali: {
    id: 'layali',
    tokens: { ink: '#101a30', ivory: '#eef1fa', deep: '#3a568f', glow: 'rgba(58,86,143,0.22)' },
  },
  // plum + dusty rose + ivory
  amara: {
    id: 'amara',
    tokens: { ink: '#2b2440', ivory: '#f8f4ee', deep: '#a2545f', glow: 'rgba(162,84,95,0.22)' },
  },
  // maroon + marigold gold
  saanjh: {
    id: 'saanjh',
    tokens: { ink: '#3a0e14', ivory: '#f7efe2', deep: '#b0552b', glow: 'rgba(176,85,43,0.22)' },
  },
  // deep maroon + antique gold (Hindu - Aaranya)
  aaranya: {
    id: 'aaranya',
    tokens: { ink: '#3a0e14', ivory: '#f7efe0', deep: '#a8842c', glow: 'rgba(168,132,44,0.26)' },
  },
  // deep navy + champagne gold + blush (Christian - Celeste)
  celeste: {
    id: 'celeste',
    tokens: { ink: '#1b2333', ivory: '#f8f2ea', deep: '#c19a5b', glow: 'rgba(193,154,91,0.24)' },
  },
}

export function getTheme(key) {
  return THEMES[key] || THEMES.noor
}

// Inline CSS-variable object for React style={}. --t-deep is the template's
// signature colour (accents/borders); --t-ink is the poster ground.
export function cssVars(key) {
  const t = getTheme(key).tokens
  return {
    '--t-ink': t.ink,
    '--t-ivory': t.ivory,
    '--t-deep': t.deep,
    '--t-glow': t.glow,
  }
}
