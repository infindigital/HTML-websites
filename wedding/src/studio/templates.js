// =====================================================================
//  TEMPLATE CATALOGUE  (single source of truth)
//  ---------------------------------------------------------------------
//  Add / edit templates here only — no component hard-codes template
//  data. Names below are DEMO names, shown until a customer's real names
//  are entered (the invitation engine is fully data-driven — see
//  src/context/InvitationContext.jsx).
//
//  engine: 'muslim'  -> "Watch invitation" launches the live cinematic
//                       engine with this template's demo couple + theme.
//  engine: null      -> preview video pending upload (see ASSETS-NEEDED.md).
//
//  poster / previewVideo / music.audioUrl are PLACEHOLDER paths; drop the
//  real files at those paths (see ASSETS-NEEDED.md) and they light up.
// =====================================================================

import { tier } from './config.js'

// Build one template with sensible defaults.
function mk(t) {
  const slug = t.slug
  const category = t.category
  return {
    id: `${category}-${slug}`,
    category,
    slug,
    href: `/templates/${category}/${slug}`,
    inviteHref: `/invite/${category}/${slug}`,
    title: t.title,
    subtitle: t.subtitle,
    description: t.description,
    demoCouple: t.demoCouple,
    monogram: t.monogram,
    tierKey: t.tierKey || 'signature',
    duration: t.duration || '00:45',
    music: {
      included: true,
      title: t.musicTitle || 'Original score',
      // Real audio path — placeholder until uploaded.
      audioUrl: t.audioUrl ?? null,
    },
    // Poster shown on cards / detail hero. Defaults to the placeholder SVG;
    // set `poster: '/assets/<cat>/<slug>-preview.webp'` to use real artwork.
    poster: t.poster || `/assets/${category}/${slug}-preview.svg`,
    // Real preview video — null until an MP4/WebM is uploaded.
    previewVideo: t.previewVideo ?? null,
    engine: t.engine ?? null,
    initialTheme: t.initialTheme || 'dark',
    tags: t.tags || ['cinematic'],
    badge: t.badge || null, // 'new' | 'popular' | null
    featured: !!t.featured,
  }
}

// ---- MUSLIM ---------------------------------------------------------
const muslim = [
  mk({
    category: 'muslim', slug: 'noor', title: 'Noor', subtitle: 'Emerald Elegance',
    description:
      'An invitation wrapped in emerald shadows, warm golden light and timeless geometry — a celebration remembered before it even begins.',
    demoCouple: { groom: 'Rayyan', bride: 'Inaya' }, monogram: 'R ✦ I',
    tierKey: 'cinematic', duration: '00:52', tags: ['popular', 'cinematic', 'luxury'],
    engine: 'muslim', initialTheme: 'dark', featured: true, badge: 'popular',
    musicTitle: 'Soft Nasheed', audioUrl: '/song.mp3',
  }),
  mk({
    category: 'muslim', slug: 'qamar', title: 'Qamar', subtitle: 'Crescent Light',
    description:
      'Crescent-soft light and champagne gold drifting over deep green — an intimate, moonlit welcome to your Nikah.',
    demoCouple: { groom: 'Zayan', bride: 'Aaliya' }, monogram: 'Z ✦ A',
    tierKey: 'signature', duration: '00:48', tags: ['cinematic'],
    engine: 'muslim', initialTheme: 'dark',
    musicTitle: 'Soft Nasheed', audioUrl: '/song.mp3',
  }),
  mk({
    category: 'muslim', slug: 'andalus', title: 'Andalus', subtitle: 'Golden Geometry',
    description:
      'Andalusian arches and interlacing gold geometry — architectural, ornate and unmistakably regal.',
    demoCouple: { groom: 'Ayaan', bride: 'Hiba' }, monogram: 'A ✦ H',
    tierKey: 'cinematic', duration: '00:50', tags: ['luxury', 'cinematic'],
    engine: 'muslim', initialTheme: 'dark', badge: 'new',
    musicTitle: 'Oud Instrumental', audioUrl: '/song.mp3',
  }),
  mk({
    category: 'muslim', slug: 'firdaus', title: 'Firdaus', subtitle: 'Garden of Paradise',
    description:
      'Ivory light, gilded foliage and a garden calm — serene, luminous and full of grace.',
    demoCouple: { groom: 'Imran', bride: 'Zoya' }, monogram: 'I ✦ Z',
    tierKey: 'signature', duration: '00:45', tags: ['cinematic'],
    engine: 'muslim', initialTheme: 'light',
    musicTitle: 'Soft Nasheed', audioUrl: '/song.mp3',
  }),
  mk({
    category: 'muslim', slug: 'layl', title: 'Layl', subtitle: 'Evening Vows',
    description:
      'Restrained, minimal and dark — a single line of gold against emerald night for those who love understatement.',
    demoCouple: { groom: 'Bilal', bride: 'Maryam' }, monogram: 'B ✦ M',
    tierKey: 'essential', duration: '00:40', tags: ['minimal'],
    engine: 'muslim', initialTheme: 'dark',
    musicTitle: 'Ambient Strings', audioUrl: '/song.mp3',
  }),
  mk({
    category: 'muslim', slug: 'ward', title: 'Ward', subtitle: 'Ivory & Rose',
    description:
      'Soft ivory, blush and champagne with delicate ornament — gentle, refined and quietly luxurious.',
    demoCouple: { groom: 'Faris', bride: 'Sana' }, monogram: 'F ✦ S',
    tierKey: 'signature', duration: '00:44', tags: ['minimal', 'luxury'],
    engine: 'muslim', initialTheme: 'light', badge: 'new',
    musicTitle: 'Soft Nasheed', audioUrl: '/song.mp3',
  }),
]

// ---- HINDU ----------------------------------------------------------
const hindu = [
  mk({
    category: 'hindu', slug: 'rang', title: 'Rang', subtitle: 'Colours of Forever',
    description:
      'A cinematic celebration of colour, warmth and tradition — every frame the first chapter of a new journey.',
    demoCouple: { groom: 'Aarav', bride: 'Ananya' }, monogram: 'A ✦ A',
    tierKey: 'cinematic', duration: '00:50', tags: ['popular', 'cinematic'],
    featured: true, badge: 'popular', musicTitle: 'Sitar & Tabla',
  }),
  mk({
    category: 'hindu', slug: 'saanjh', title: 'Saanjh', subtitle: 'Golden Dusk',
    description:
      'The warm glow of diya light at dusk, gold on deep maroon — luminous, romantic and grand.',
    demoCouple: { groom: 'Vihaan', bride: 'Meera' }, monogram: 'V ✦ M',
    tierKey: 'signature', duration: '00:47', tags: ['cinematic'],
    musicTitle: 'Flute & Strings',
  }),
  mk({
    category: 'hindu', slug: 'bandhan', title: 'Bandhan', subtitle: 'Sacred Union',
    description:
      'Mandala geometry and gilded detail encircling two names — ceremonial, ornate and timeless.',
    demoCouple: { groom: 'Aditya', bride: 'Kavya' }, monogram: 'A ✦ K',
    tierKey: 'cinematic', duration: '00:52', tags: ['luxury', 'cinematic'],
    badge: 'new', musicTitle: 'Shehnai',
  }),
  mk({
    category: 'hindu', slug: 'amrit', title: 'Amrit', subtitle: 'Timeless Vows',
    description:
      'Floral gold and soft petals over ivory — a graceful, heritage-rich invitation to the vows.',
    demoCouple: { groom: 'Arjun', bride: 'Diya' }, monogram: 'A ✦ D',
    tierKey: 'signature', duration: '00:45', tags: ['cinematic'],
    musicTitle: 'Sitar & Tabla',
  }),
  mk({
    category: 'hindu', slug: 'utsav', title: 'Utsav', subtitle: 'A Grand Celebration',
    description:
      'Clean, minimal and warm — marigold gold on ivory for a celebration that speaks softly but shines.',
    demoCouple: { groom: 'Kabir', bride: 'Riya' }, monogram: 'K ✦ R',
    tierKey: 'essential', duration: '00:42', tags: ['minimal'],
    musicTitle: 'Ambient Sitar',
  }),
  mk({
    category: 'hindu', slug: 'kalyanam', title: 'Kalyanam', subtitle: 'Heritage & Gold',
    description:
      'Temple-inspired architecture and deep gold — regal, rooted and cinematic in every frame.',
    demoCouple: { groom: 'Reyansh', bride: 'Saanvi' }, monogram: 'R ✦ S',
    tierKey: 'signature', duration: '00:48', tags: ['luxury'],
    badge: 'new', musicTitle: 'Nadaswaram',
  }),
]

// ---- CHRISTIAN ------------------------------------------------------
const christian = [
  mk({
    category: 'christian', slug: 'eternal', title: 'Eternal', subtitle: 'Forever Begins',
    description:
      'Soft light, timeless florals and quiet romance — an invitation that begins your celebration with grace.',
    demoCouple: { groom: 'Nathan', bride: 'Grace' }, monogram: 'N ✦ G',
    tierKey: 'cinematic', duration: '00:50', tags: ['popular', 'cinematic'],
    featured: true, badge: 'popular', musicTitle: 'Piano & Strings',
  }),
  mk({
    category: 'christian', slug: 'grace', title: 'Grace', subtitle: 'Quiet Romance',
    description:
      'Ivory, champagne and the faintest blush — understated, elegant and deeply romantic.',
    demoCouple: { groom: 'Daniel', bride: 'Sophia' }, monogram: 'D ✦ S',
    tierKey: 'signature', duration: '00:46', tags: ['minimal', 'cinematic'],
    musicTitle: 'Solo Piano',
  }),
  mk({
    category: 'christian', slug: 'aurora', title: 'Aurora', subtitle: 'First Light',
    description:
      'Navy giving way to champagne dawn — cinematic light and soft bokeh for a luminous new beginning.',
    demoCouple: { groom: 'Ethan', bride: 'Olivia' }, monogram: 'E ✦ O',
    tierKey: 'cinematic', duration: '00:49', tags: ['luxury', 'cinematic'],
    badge: 'new', musicTitle: 'Strings & Choir',
  }),
  mk({
    category: 'christian', slug: 'cana', title: 'Cana', subtitle: 'Chapel Vows',
    description:
      'Chapel-inspired arches and candlelight — reverent, warm and beautifully composed.',
    demoCouple: { groom: 'Lucas', bride: 'Emma' }, monogram: 'L ✦ E',
    tierKey: 'signature', duration: '00:45', tags: ['cinematic'],
    musicTitle: 'Piano & Strings',
  }),
  mk({
    category: 'christian', slug: 'bloom', title: 'Bloom', subtitle: 'Florals & Light',
    description:
      'Fresh florals and soft daylight over ivory — minimal, airy and full of tenderness.',
    demoCouple: { groom: 'Adrian', bride: 'Chloe' }, monogram: 'A ✦ C',
    tierKey: 'essential', duration: '00:41', tags: ['minimal'],
    musicTitle: 'Acoustic Guitar',
  }),
  mk({
    category: 'christian', slug: 'vow', title: 'Vow', subtitle: 'Candlelight',
    description:
      'Deep navy, muted gold and a wash of candlelight — intimate, cinematic and timeless.',
    demoCouple: { groom: 'Gabriel', bride: 'Ava' }, monogram: 'G ✦ A',
    tierKey: 'signature', duration: '00:47', tags: ['luxury'],
    badge: 'new', musicTitle: 'Piano & Cello',
  }),
]

export const TEMPLATES = [...muslim, ...hindu, ...christian]

// ---- Helpers --------------------------------------------------------
export function templatePrice(template) {
  return tier(template.tierKey)
}

export function byCategory(category) {
  return TEMPLATES.filter((t) => t.category === category)
}

export function getTemplate(category, slug) {
  return TEMPLATES.find((t) => t.category === category && t.slug === slug) || null
}

export function featuredTemplates() {
  return TEMPLATES.filter((t) => t.featured)
}

export function countByCategory(category) {
  return byCategory(category).length
}

// Filter by category ('all' | 'muslim' | …) and a style tag ('all' | 'minimal' | …).
export function filterTemplates({ category = 'all', tag = 'all' } = {}) {
  return TEMPLATES.filter((t) => {
    const okCat = category === 'all' || t.category === category
    const okTag = tag === 'all' || t.tags.includes(tag)
    return okCat && okTag
  })
}

// Free-text search across title, subtitle, category, tags, couple names.
export function searchTemplates(query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return TEMPLATES
  return TEMPLATES.filter((t) => {
    const hay = [
      t.title, t.subtitle, t.category, t.description,
      ...t.tags, t.demoCouple.groom, t.demoCouple.bride,
    ].join(' ').toLowerCase()
    return hay.includes(q)
  })
}

export const STYLE_TAGS = ['popular', 'new', 'luxury', 'minimal', 'cinematic']
