// Helpers shared by the three religion configs.

// Build Google Maps embed + directions URLs from a place query (no API key).
export function venue({ name, address, city, mapQuery }) {
  const q = encodeURIComponent(mapQuery || `${name} ${city || ''}`.trim())
  return {
    name,
    address,
    city,
    mapQuery,
    embedUrl: `https://www.google.com/maps?q=${q}&z=15&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  }
}

// Merge a config's palette into a flat CSS-variable object for the root.
// --x-* drive the experience; --t-* feed the motifs & characters.
export function paletteVars(p) {
  return {
    '--x-bg': p.bg,
    '--x-bg2': p.bg2,
    '--x-panel': p.panel,
    '--x-ink': p.ink,
    '--x-ink-soft': p.inkSoft,
    '--x-gold': p.gold,
    '--x-gold-2': p.gold2,
    '--x-accent': p.accent,
    '--x-line': p.line,
    '--x-glow': p.glow,
    '--t-gold': p.gold,
    '--t-ivory': p.ink,
    '--t-deep': p.accent,
    '--t-glow': p.glow,
  }
}
