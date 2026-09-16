import { venue } from './_shared.js'

// =====================================================================
//  HINDU EXPERIENCE CONFIG — "The Journey to the Mandap"
//  ---------------------------------------------------------------------
//  Fully data-driven. Every name / date / message below is a DEMO the
//  couple replaces at order time. Swap these values (or the whole file)
//  to personalise; the components never hardcode content.
// =====================================================================
const hindu = {
  religion: 'hindu',
  concept: 'The Journey to the Mandap',

  couple: {
    groom: 'Aarav',
    bride: 'Ananya',
    combined: 'Aarav & Ananya',
    monogram: 'A ✦ A',
    groomFull: 'Aarav Sharma',
    brideFull: 'Ananya Iyer',
    groomParents: 'Son of Mr. Rajesh & Mrs. Meera Sharma',
    brideParents: 'Daughter of Mr. Suresh & Mrs. Lakshmi Iyer',
  },

  date: {
    iso: '2026-11-15T11:00:00+05:30',
    dateLabel: 'Sunday, 15 November 2026',
    timeLabel: '11:00 AM',
  },

  invocation: '॥ श्री गणेशाय नमः ॥',
  verseMark: 'ॐ',

  hero: {
    eyebrow: 'Together with our families',
    marrying: 'ARE GETTING MARRIED',
    subline: 'and request the honour of your presence',
  },

  // Scene 04 — Our Story (scroll storytelling).
  story: [
    { key: 'met', title: 'We met', caption: 'A monsoon evening in Mumbai, two strangers, one umbrella.' },
    { key: 'journey', title: 'The journey', caption: 'Cities, seasons, and a thousand shared cups of chai.' },
    { key: 'question', title: 'The question', caption: 'On a rooftop at dusk, one knee, one ring.' },
    { key: 'yes', title: 'The yes', caption: 'There was never going to be any other answer.' },
    { key: 'forever', title: 'Forever', caption: 'And now, we begin, together.' },
  ],

  // Scene 05 — Family.
  family: {
    groomSide: {
      label: 'With the blessings of the groom’s family',
      names: ['Mr. Rajesh & Mrs. Meera Sharma', 'Grandparents, the Sharma family', 'Ishaan Sharma · brother'],
    },
    brideSide: {
      label: 'With the blessings of the bride’s family',
      names: ['Mr. Suresh & Mrs. Lakshmi Iyer', 'Grandparents, the Iyer family', 'Diya Iyer · sister'],
    },
  },

  // Scene 10 — Events (interactive; Haldi / Mehendi live here).
  events: [
    { id: 'haldi', name: 'Haldi', glyph: '☀', date: '13 November 2026', time: '10:00 AM', venue: 'The Family Courtyard', description: 'Turmeric, laughter and blessings to light up the days ahead.', dress: 'Marigold yellows' },
    { id: 'mehendi', name: 'Mehendi', glyph: '✿', date: '13 November 2026', time: '5:00 PM', venue: 'Riverside Lawn', description: 'Henna, music and a little mischief before the vows.', dress: 'Greens & mirror-work' },
    { id: 'sangeet', name: 'Sangeet', glyph: '♪', date: '14 November 2026', time: '7:00 PM', venue: 'The Grand Ballroom', description: 'An evening of song, dance and unforgettable performances.', dress: 'Festive glamour' },
    { id: 'wedding', name: 'Vivaah', glyph: '❉', date: '15 November 2026', time: '11:00 AM', venue: 'Grand Riverside Gardens', description: 'The seven sacred steps, under the mandap, before the fire.', dress: 'Traditional finery' },
    { id: 'reception', name: 'Reception', glyph: '✦', date: '15 November 2026', time: '7:30 PM', venue: 'The Palace Terrace', description: 'Dinner, toasts and celebration long into the night.', dress: 'Formal' },
  ],

  ceremony: {
    title: 'The Vivaah Ceremony',
    date: '15 November 2026',
    time: '11:00 AM',
    venue: 'Grand Riverside Gardens, Udaipur',
    note: 'As the sacred fire is kindled and the seven steps are taken, we ask for your blessings.',
  },

  verse: {
    text: 'Bound by love, blessed by family and guided by the sacred vows of the seven steps, may their life together be filled with joy, prosperity and lifelong togetherness.',
    ref: 'A blessing for the couple',
  },

  venue: venue({
    name: 'Grand Riverside Gardens',
    address: 'Lake Palace Road, Udaipur, Rajasthan',
    city: 'Udaipur, Rajasthan',
    mapQuery: 'Udaipur, Rajasthan',
  }),

  closing: {
    message: 'WE CAN’T WAIT TO CELEBRATE WITH YOU',
  },

  discovery: {
    lamp: 'May this light guide your path.',
    spark: 'Marigolds, for joy and new beginnings.',
    bride: 'Ananya, dreamer, dancer, the calm in every storm.',
    groom: 'Aarav, the one who finally slowed down for her.',
    together: 'Our day',
  },

  palette: {
    bg: '#1c0508',
    bg2: '#2a0a0e',
    panel: 'rgba(58,14,20,0.72)',
    ink: '#f4e2c6',
    inkSoft: '#caa885',
    gold: '#f0d183',
    gold2: '#f7e6b0',
    accent: '#e6771f',
    line: 'rgba(224,180,90,0.45)',
    glow: 'rgba(230,119,31,0.28)',
  },

  assets: {
    video: '/assets/hindu.mp4',
    videoMobile: '/assets/hindu-m.mp4',
    poster: '/assets/hindu-poster.jpg',
    couple: '/assets/hindu-couple.png',
  },
  // Din Shagna Da (Phillauri). Pre-trimmed to the mukhda (was 1:39 in) so it
  // starts at the hook and plays instantly — no seek that mobile can't buffer.
  music: { src: '/assets/hindu-song.mp3', start: 0 },

  // Scene order — the Hindu arc. Types map to components in the shell.
  scenes: [
    { type: 'opening' },
    { type: 'coupleReveal' },
    { type: 'pattern' },
    { type: 'story' },
    { type: 'family' },
    { type: 'events' },
    { type: 'ceremony' },
    { type: 'verse' },
    { type: 'coupleInteraction' },
    { type: 'venue' },
    { type: 'countdown' },
    { type: 'rsvp' },
    { type: 'closing' },
  ],
}

export default hindu
