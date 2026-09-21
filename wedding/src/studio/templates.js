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
    // Internal-only key that maps the collection to its invitation engine skin,
    // scenes, music and assets. It is NEVER shown to visitors and is never used
    // as a visible category — the storefront is not categorised by anything but
    // atmosphere. (Kept named `religion` because the engine reads it.)
    religion: t.religion,
    // Short, style-led descriptor shown on the card and in the preview.
    styleLabel: t.styleLabel || '',
    theme: t.theme || slug,
    inviteHref: t.inviteHref || `/invite/${slug}`,
    // A design that ships as its own build is shown full-screen in an embed at
    // its /invite/<slug> route, so its card link matches the others.
    embedUrl: t.embedUrl ?? null,
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
    previewVideoMobile: t.previewVideoMobile ?? null,
    previewVideoVertical: t.previewVideoVertical ?? null,
    // Demo event details (personalised per order) - drives the Date Reveal.
    event: t.event ?? null,
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
// maroon + antique gold (Hindu)
const AARANYA = {
  '--bg': '#25070b', '--bg-soft': '#1c0508', '--panel': '#3a0e14',
  '--ink': '#f0dcc0', '--ink-strong': '#f8ecd4', '--ink-soft': '#caa885',
  '--gold-1': '#c99a3a', '--gold-2': '#f0d183',
  '--gold-grad': 'linear-gradient(135deg,#b8862c 0%,#f4e2a0 50%,#b8862c 100%)',
  '--line': 'rgba(224,180,90,0.5)', '--shadow': 'rgba(0,0,0,0.6)', '--btn-ink': '#2a0a0e',
}
// deep navy + champagne (Christian)
const CELESTE = {
  '--bg': '#10161f', '--bg-soft': '#0b1016', '--panel': '#1b2333',
  '--ink': '#e8ddc9', '--ink-strong': '#f6eeda', '--ink-soft': '#b9ad97',
  '--gold-1': '#c19a5b', '--gold-2': '#ebd3a3',
  '--gold-grad': 'linear-gradient(135deg,#b98f52 0%,#efdcb0 50%,#b98f52 100%)',
  '--line': 'rgba(210,175,120,0.5)', '--shadow': 'rgba(0,0,0,0.55)', '--btn-ink': '#141a24',
}

// ---------------------------------------------------------------- flagship 3
export const TEMPLATES = [
  mk({
    slug: 'noor', theme: 'noor',
    religion: 'muslim', styleLabel: 'Elegant, intimate and atmospheric',
    title: 'Noor', subtitle: 'A Celebration of Love',
    description:
      'An invitation wrapped in emerald shadows, warm golden light and timeless geometry. A refined, atmospheric welcome to a celebration remembered before it even begins.',
    demoCouple: { groom: 'Rayyan', bride: 'Inaya' }, monogram: 'R ✦ I',
    engine: 'live', engineSkin: EMERALD, audioUrl: '/song.mp3', musicTitle: 'Soft Oud & Strings',
    previewVideo: '/assets/Bride_and_groom_in_wedding_20260918185535.mp4', previewVideoMobile: '/assets/Bride_and_groom_in_wedding_20260918185535.mp4', poster: '/assets/noor-film-poster.jpg',
    event: { weekday: 'Saturday', day: '23', month: 'January', year: '2027', venue: 'The Royal Palace', time: '7:00 PM', iso: '2027-01-23T19:00:00+05:30', city: 'Hyderabad, Telangana', mapQuery: 'Jubilee Hills, Hyderabad, Telangana' },
    highlights: ['Islamic geometry & arches', 'Lantern-gold light', 'Emerald & champagne palette'],
  }),
  mk({
    slug: 'aaranya', theme: 'aaranya',
    religion: 'hindu', styleLabel: 'Warm, opulent and radiant',
    title: 'Amour', subtitle: 'Colour, Warmth and Joy',
    description:
      'The warm glow of a grand celebration in deep maroon and antique gold, with intricate detail and candlelight. Colour, richness and joy from the very first moment.',
    demoCouple: { groom: 'Aarav', bride: 'Ananya' }, monogram: 'A ✦ A',
    engine: 'live', engineSkin: AARANYA, audioUrl: '/song.mp3', musicTitle: 'Sitar & Tabla',
    previewVideo: '/assets/aaranya.mp4', previewVideoMobile: '/assets/aaranya-m.mp4', poster: '/assets/aaranya-poster.jpg',
    event: { weekday: 'Sunday', day: '15', month: 'November', year: '2026', venue: 'Grand Riverside Gardens', time: '11:00 AM', iso: '2026-11-15T11:00:00+05:30', city: 'Udaipur, Rajasthan', mapQuery: 'Udaipur, Rajasthan' },
    highlights: ['Mandala & marigold detail', 'Warm diya glow', 'Maroon & antique-gold palette'],
  }),
  mk({
    slug: 'celeste', theme: 'celeste',
    religion: 'christian', styleLabel: 'Soft, romantic and timeless',
    title: 'Reverie', subtitle: 'A Timeless Promise',
    description:
      'Soft candlelight, delicate florals and quiet grace in ivory, champagne and blush. A gentle, romantic invitation to the beginning of forever.',
    demoCouple: { groom: 'Nathan', bride: 'Grace' }, monogram: 'N ✦ G',
    engine: 'live', engineSkin: CELESTE, audioUrl: '/song.mp3', musicTitle: 'Piano & Strings',
    previewVideo: '/assets/celeste.mp4', previewVideoMobile: '/assets/celeste-m.mp4', poster: '/assets/celeste-poster.jpg',
    event: { weekday: 'Saturday', day: '05', month: 'June', year: '2027', venue: "St. Mary's Chapel", time: '4:00 PM', iso: '2027-06-05T16:00:00+05:30', city: 'Bandra, Mumbai', mapQuery: 'Bandra West, Mumbai, Maharashtra' },
    highlights: ['Chapel light & candles', "White roses & baby's breath", 'Ivory, champagne & blush palette'],
  }),
  mk({
    slug: 'meher', theme: 'meher',
    religion: 'muslim', styleLabel: 'Gold-foil on cream · sealed with wax',
    title: 'Meher', subtitle: 'A Gilded Keepsake',
    price: 299, // this design is priced at ₹299, not the flat studio price
    description:
      'A gold-foil-on-cream Islamic invitation, sealed with wax and opened with a touch — falling leaves, a scratch-to-reveal card and a live countdown, in four languages.',
    demoCouple: { groom: 'Rayyan', bride: 'Inaya' }, monogram: 'R ✦ I',
    // Opens the wax-seal invitation in-studio at /invite/meher (same clean link
    // style as the other cards); embeds the /seal/ build served by this same
    // studio deployment — no separate project or proxy.
    embedUrl: '/seal/',
    poster: '/assets/rayyan-inaya-poster.jpg',
    event: { weekday: 'Sunday', day: '30', month: 'August', year: '2026', venue: 'The Royal Palace', time: '7:30 PM', city: 'Hyderabad, Telangana', mapQuery: 'Jubilee Hills, Hyderabad, Telangana' },
    highlights: ['Wax-seal opening', 'Gold-foil on cream', 'Four languages (EN · KN · HI · AR)'],
  }),
]

// ---------------------------------------------------------------- archived
// Earlier designs, kept (not deleted) so they can be brought back later.
// Not shown in the collection.
export const ARCHIVED_TEMPLATES = [
  mk({
    slug: 'layali', theme: 'layali',
    religion: 'muslim', styleLabel: 'Starlit, opulent and grand',
    title: 'Layali', subtitle: 'Midnight & Gold',
    description:
      'A starlit night in midnight blue and antique gold. Crescent light and quiet grandeur for an unforgettable evening.',
    demoCouple: { groom: 'Zayan', bride: 'Aaliya' }, monogram: 'Z ✦ A',
    engine: 'live', engineSkin: MIDNIGHT, audioUrl: '/song.mp3', musicTitle: 'Oud & Strings',
    highlights: ['Starlit midnight blue', 'Crescent & fine lattice', 'Antique-gold detailing'],
  }),
  mk({
    slug: 'amara', theme: 'amara',
    religion: 'christian', styleLabel: 'Soft, romantic and understated',
    title: 'Amara', subtitle: 'Blush & Ivory',
    description:
      'Soft candlelight, timeless florals and ivory grace. An invitation that opens your celebration with quiet romance.',
    demoCouple: { groom: 'Nathan', bride: 'Grace' }, monogram: 'N ✦ G',
    engine: null, musicTitle: 'Piano & Strings',
    highlights: ['Soft florals & candlelight', 'Ivory, blush & champagne', 'Romantic, understated'],
  }),
  mk({
    slug: 'saanjh', theme: 'saanjh',
    religion: 'hindu', styleLabel: 'Warm, golden and joyful',
    title: 'Saanjh', subtitle: 'Marigold Dusk',
    description:
      'The warm glow of dusk in marigold and maroon. Mandala detail and golden light for a celebration full of colour and joy.',
    demoCouple: { groom: 'Aarav', bride: 'Ananya' }, monogram: 'A ✦ A',
    engine: null, musicTitle: 'Sitar & Flute',
    highlights: ['Mandala & marigold detail', 'Warm diya glow', 'Maroon & gold palette'],
  }),
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
