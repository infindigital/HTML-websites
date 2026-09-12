// =====================================================================
//  TEMPLATE CATALOGUE (single source of truth) - flagship collection.
//  ---------------------------------------------------------------------
//  Three premium designs, one per celebration style. Each has its own
//  visual language, motion language and cinematic film - not one template
//  recoloured three ways.
//
//  Names shown are DEMO couples - the invitation is data-driven and
//  personalised per order.
//
//  engine: 'live'  -> live cinematic invitation (with `engineSkin` colours).
//  engine: null    -> cinematic film preview (see ASSETS-TO-PROVIDE.md).
//
//  Real media drops into /public/assets with these names, then set the
//  matching path below:
//    film     -> /assets/<slug>.mp4            (previewVideo)
//    vertical -> /assets/<slug>-vertical.mp4   (previewVideoVertical)
//    poster   -> /assets/<slug>-poster.webp    (poster)
//    music    -> /assets/<slug>.mp3            (audioUrl)
//  Until a film is supplied, a tasteful SVG poster placeholder is shown.
// =====================================================================

import { tier, formatPrice } from './config.js'

function mk(t) {
  const { slug } = t
  return {
    id: slug,
    slug,
    religion: t.religion, // 'muslim' | 'hindu' | 'christian'
    religionLabel: t.religionLabel,
    theme: t.theme || slug,
    inviteHref: `/invite/${slug}`,
    title: t.title,
    subtitle: t.subtitle,
    description: t.description,
    couple: t.couple || (t.demoCouple ? `${t.demoCouple.groom} & ${t.demoCouple.bride}` : ''),
    demoCouple: t.demoCouple,
    monogram: t.monogram,
    duration: t.duration || '00:26',
    // Per-template price override; null falls back to the flat price in config.
    price: t.price ?? null,
    music: { included: true, title: t.musicTitle || 'Original score', audioUrl: t.audioUrl ?? null },
    // Poster defaults to the placeholder SVG; real posters land as -poster.webp.
    poster: t.poster || `/assets/${slug}-poster.svg`,
    previewVideo: t.previewVideo ?? null,
    previewVideoVertical: t.previewVideoVertical ?? null,
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

// ---------------------------------------------------------------- flagship 3
export const TEMPLATES = [
  mk({
    slug: 'noor', theme: 'noor',
    religion: 'muslim', religionLabel: 'Muslim',
    title: 'Noor', subtitle: 'The Royal Invitation',
    description:
      'An invitation wrapped in emerald shadows, warm golden light and timeless Islamic geometry. A royal welcome to a celebration remembered before it even begins.',
    demoCouple: { groom: 'Rayyan', bride: 'Inaya' }, monogram: 'R ✦ I',
    engine: 'live', engineSkin: EMERALD, audioUrl: '/song.mp3', musicTitle: 'Soft Oud & Strings',
    highlights: ['Islamic geometry & arches', 'Lantern-gold light', 'Emerald & champagne palette'],
  }),
  mk({
    slug: 'aaranya', theme: 'aaranya',
    religion: 'hindu', religionLabel: 'Hindu',
    title: 'Aaranya', subtitle: 'The Royal Celebration',
    description:
      'The warm glow of a royal Indian celebration in deep maroon and antique gold. Mandala light, marigold and diyas for a wedding full of colour and joy.',
    demoCouple: { groom: 'Aarav', bride: 'Ananya' }, monogram: 'A ✦ A',
    engine: null, musicTitle: 'Sitar & Tabla',
    highlights: ['Mandala & marigold detail', 'Warm diya glow', 'Maroon & antique-gold palette'],
  }),
  mk({
    slug: 'celeste', theme: 'celeste',
    religion: 'christian', religionLabel: 'Christian',
    title: 'Celeste', subtitle: 'The Eternal Promise',
    description:
      'Soft candlelight, white roses and chapel grace in ivory, champagne and blush. A gentle, romantic invitation to the beginning of forever.',
    demoCouple: { groom: 'Nathan', bride: 'Grace' }, monogram: 'N ✦ G',
    engine: null, musicTitle: 'Piano & Strings',
    highlights: ['Chapel light & candles', "White roses & baby's breath", 'Ivory, champagne & blush palette'],
  }),
]

// ---------------------------------------------------------------- archived
// Earlier designs, kept (not deleted) so they can be brought back later.
// Not shown in the collection.
export const ARCHIVED_TEMPLATES = [
  mk({
    slug: 'layali', theme: 'layali',
    religion: 'muslim', religionLabel: 'Muslim',
    title: 'Layali', subtitle: 'Midnight & Gold',
    description:
      'A starlit night in midnight blue and antique gold. Crescent light and quiet grandeur for an unforgettable evening.',
    demoCouple: { groom: 'Zayan', bride: 'Aaliya' }, monogram: 'Z ✦ A',
    engine: 'live', engineSkin: MIDNIGHT, audioUrl: '/song.mp3', musicTitle: 'Oud & Strings',
    highlights: ['Starlit midnight blue', 'Crescent & fine lattice', 'Antique-gold detailing'],
  }),
  mk({
    slug: 'amara', theme: 'amara',
    religion: 'christian', religionLabel: 'Christian',
    title: 'Amara', subtitle: 'Blush & Ivory',
    description:
      'Soft candlelight, timeless florals and ivory grace. An invitation that opens your celebration with quiet romance.',
    demoCouple: { groom: 'Nathan', bride: 'Grace' }, monogram: 'N ✦ G',
    engine: null, musicTitle: 'Piano & Strings',
    highlights: ['Soft florals & candlelight', 'Ivory, blush & champagne', 'Romantic, understated'],
  }),
  mk({
    slug: 'saanjh', theme: 'saanjh',
    religion: 'hindu', religionLabel: 'Hindu',
    title: 'Saanjh', subtitle: 'Marigold Dusk',
    description:
      'The warm glow of dusk in marigold and maroon. Mandala detail and golden light for a celebration full of colour and joy.',
    demoCouple: { groom: 'Aarav', bride: 'Ananya' }, monogram: 'A ✦ A',
    engine: null, musicTitle: 'Sitar & Flute',
    highlights: ['Mandala & marigold detail', 'Warm diya glow', 'Maroon & gold palette'],
  }),
]

// Religion filter tabs for the collection (order matters).
export const RELIGIONS = [
  { id: 'all', label: 'All' },
  { id: 'muslim', label: 'Muslim' },
  { id: 'hindu', label: 'Hindu' },
  { id: 'christian', label: 'Christian' },
]

export function templatePrice(template) {
  if (template && template.price != null) {
    return { label: '', amount: template.price, display: formatPrice(template.price) }
  }
  return tier()
}

export function getTemplate(slug) {
  return (
    TEMPLATES.find((t) => t.slug === slug) ||
    ARCHIVED_TEMPLATES.find((t) => t.slug === slug) ||
    null
  )
}
