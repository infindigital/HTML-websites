// =====================================================================
//  PER-RELIGION THEME SYSTEM
//  ---------------------------------------------------------------------
//  Each category has its own visual language (colour + accent + label +
//  symbol) so a template feels culturally intentional, not the same card
//  with different wording. Applied in CSS via [data-religion="…"] which
//  reads the CSS variables emitted by cssVars() below.
//
//  Religious symbols are deliberately NOT shared between categories.
// =====================================================================

export const THEMES = {
  muslim: {
    key: 'muslim',
    label: 'Muslim',
    symbol: '☪',
    blurb:
      'Emerald shadows, warm golden light and timeless geometry — invitations of quiet, elegant grandeur.',
    // deep emerald / champagne / ivory
    tokens: {
      ink: '#0b241d', // deep emerald (dark ground)
      inkSoft: '#123a2f',
      ivory: '#f6f1e4',
      surface: '#0f2c24',
      accent: '#ccad6a', // champagne gold
      accentStrong: '#d9be76',
      accentSoft: 'rgba(206,173,106,0.16)',
      glow: 'rgba(206,173,106,0.34)',
    },
  },

  hindu: {
    key: 'hindu',
    label: 'Hindu',
    symbol: 'ॐ',
    blurb:
      'Maroon and gold warmth, mandala geometry and the soft glow of diya light — cinematic, celebratory, luxurious.',
    // deep maroon / warm gold / ivory
    tokens: {
      ink: '#3a0e14', // deep maroon (dark ground)
      inkSoft: '#511318',
      ivory: '#f7efe2',
      surface: '#48111a',
      accent: '#d3a24a', // warm gold
      accentStrong: '#e4b458',
      accentSoft: 'rgba(211,162,74,0.16)',
      glow: 'rgba(211,162,74,0.34)',
    },
  },

  christian: {
    key: 'christian',
    label: 'Christian',
    symbol: '✝',
    blurb:
      'Ivory and champagne, dusty rose and deep navy — soft light and quiet romance with cinematic grace.',
    // ivory / champagne / dusty rose / deep navy
    tokens: {
      ink: '#1c2540', // deep navy (dark ground)
      inkSoft: '#28324f',
      ivory: '#f8f4ee',
      surface: '#222c49',
      accent: '#c3a878', // champagne
      accentStrong: '#d2b98c',
      accentSoft: 'rgba(195,168,120,0.16)',
      glow: 'rgba(206,150,150,0.30)', // faint blush glow
    },
  },
}

export const CATEGORY_ORDER = ['muslim', 'hindu', 'christian']

export function getTheme(key) {
  return THEMES[key] || THEMES.muslim
}

// Turn a theme's tokens into an inline CSS-variables object for React style={}.
export function cssVars(key) {
  const t = getTheme(key).tokens
  return {
    '--t-ink': t.ink,
    '--t-ink-soft': t.inkSoft,
    '--t-ivory': t.ivory,
    '--t-surface': t.surface,
    '--t-accent': t.accent,
    '--t-accent-strong': t.accentStrong,
    '--t-accent-soft': t.accentSoft,
    '--t-glow': t.glow,
  }
}
