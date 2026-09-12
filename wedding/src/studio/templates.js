// =====================================================================
//  TEMPLATE CATALOGUE (single source of truth) — 4 premium designs.
//  ---------------------------------------------------------------------
//  Names shown are DEMO couples — the invitation engine is data-driven.
//
//  engine: 'live'  -> live cinematic invitation (with `engineSkin` colours).
//  engine: null    -> preview video pending (see ASSETS-NEEDED.md).
// =====================================================================

import { tier } from './config.js'

function mk(t) {
  const { slug } = t
  return {
    id: slug,
    slug,
    theme: t.theme || slug,
    inviteHref: `/invite/${slug}`,
    title: t.title,
    subtitle: t.subtitle,
    description: t.description,
    demoCouple: t.demoCouple,
    monogram: t.monogram,
    duration: t.duration || '00:48',
    music: { included: true, title: t.musicTitle || 'Original score', audioUrl: t.audioUrl ?? null },
    // Poster defaults to the placeholder SVG; set `poster` to a real image path.
    poster: t.poster || `/assets/${slug}-preview.svg`,
    previewVideo: t.previewVideo ?? null,
    engine: t.engine ?? null,
    engineSkin: t.engineSkin ?? null,
    highlights: t.highlights || [],
  }
}

// Engine colour skins (override the invitation engine's CSS variables).
const EMERALD = {
  '--bg': '#0f1a16', '--bg-soft': '#0b1310', '--panel': '#17241d',
  '--ink': '#e7d8bd', '--ink-strong': '#f4e9d1', '--ink-soft': '#b7a488',
  '--gold-1': '#d3ac45', '--gold-2': '#f0dc95',
  '--gold-grad': 'linear-gradient(135deg,#cda63f 0%,#f4e39b 50%,#cda63f 100%)',
  '--line': 'rgba(224,196,120,0.5)', '--shadow': 'rgba(0,0,0,0.55)', '--btn-ink': '#2a2113',
}
const MIDNIGHT = {
  '--bg': '#0c1526', '--bg-soft': '#0a1120', '--panel': '#141f38',
  '--ink': '#dfe4f2', '--ink-strong': '#f2f5fc', '--ink-soft': '#a9b2cc',
  '--gold-1': '#c9a24a', '--gold-2': '#efd98f',
  '--gold-grad': 'linear-gradient(135deg,#c09a44 0%,#f0dc95 50%,#c09a44 100%)',
  '--line': 'rgba(201,162,74,0.5)', '--shadow': 'rgba(0,0,0,0.6)', '--btn-ink': '#0c1526',
}

export const TEMPLATES = [
  mk({
    slug: 'noor', theme: 'noor',
    title: 'Noor', subtitle: 'Emerald & Gold',
    description:
      'An invitation wrapped in emerald shadows, warm golden light and timeless geometry — a celebration remembered before it even begins.',
    demoCouple: { groom: 'Rayyan', bride: 'Inaya' }, monogram: 'R ✦ I',
    engine: 'live', engineSkin: EMERALD, audioUrl: '/song.mp3', musicTitle: 'Soft Nasheed',
    highlights: ['Elegant geometry & arches', 'Lantern-gold light', 'Emerald & champagne palette'],
  }),
  mk({
    slug: 'layali', theme: 'layali',
    title: 'Layali', subtitle: 'Midnight & Gold',
    description:
      'A starlit night in midnight blue and antique gold — crescent light and quiet grandeur for an unforgettable evening.',
    demoCouple: { groom: 'Zayan', bride: 'Aaliya' }, monogram: 'Z ✦ A',
    engine: 'live', engineSkin: MIDNIGHT, audioUrl: '/song.mp3', musicTitle: 'Oud & Strings',
    highlights: ['Starlit midnight blue', 'Crescent & fine lattice', 'Antique-gold detailing'],
  }),
  mk({
    slug: 'amara', theme: 'amara',
    title: 'Amara', subtitle: 'Blush & Ivory',
    description:
      'Soft candlelight, timeless florals and ivory grace — an invitation that opens your celebration with quiet romance.',
    demoCouple: { groom: 'Nathan', bride: 'Grace' }, monogram: 'N ✦ G',
    engine: null, musicTitle: 'Piano & Strings',
    highlights: ['Soft florals & candlelight', 'Ivory, blush & champagne', 'Romantic, understated'],
  }),
  mk({
    slug: 'saanjh', theme: 'saanjh',
    title: 'Saanjh', subtitle: 'Marigold Dusk',
    description:
      'The warm glow of dusk in marigold and maroon — mandala detail and golden light for a celebration full of colour and joy.',
    demoCouple: { groom: 'Aarav', bride: 'Ananya' }, monogram: 'A ✦ A',
    engine: null, musicTitle: 'Sitar & Flute',
    highlights: ['Mandala & marigold detail', 'Warm diya glow', 'Maroon & gold palette'],
  }),
]

export function templatePrice() {
  return tier()
}

export function getTemplate(slug) {
  return TEMPLATES.find((t) => t.slug === slug) || null
}
