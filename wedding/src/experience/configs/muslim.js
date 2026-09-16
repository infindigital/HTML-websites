import { venue } from './_shared.js'

// =====================================================================
//  MUSLIM EXPERIENCE CONFIG — "Under the Same Moon"
//  All names / dates / messages are editable DEMO placeholders.
// =====================================================================
const muslim = {
  religion: 'muslim',
  concept: 'Mawaddah wa Rahmah',

  couple: {
    groom: 'Rayyan',
    bride: 'Inaya',
    combined: 'Rayyan & Inaya',
    monogram: 'R ✦ I',
    groomFull: 'Rayyan Ahmed',
    brideFull: 'Inaya Fathima',
    groomParents: 'Son of Mr. Imran & Mrs. Ayesha Ahmed',
    brideParents: 'Daughter of Mr. Yusuf & Mrs. Zara Fathima',
  },

  date: {
    iso: '2027-01-23T19:00:00+05:30',
    dateLabel: 'Saturday, 23 January 2027',
    timeLabel: '7:00 PM',
  },

  invocation: '﷽',
  verseMark: '﷽',

  hero: {
    eyebrow: 'With the grace of Allah',
    marrying: 'JOIN US AS WE BEGIN A NEW CHAPTER',
    subline: 'we invite you to share in our joy',
  },

  story: [
    { key: 'met', title: 'First meeting', caption: 'Two families, one evening — and a quiet certainty.' },
    { key: 'journey', title: 'The journey', caption: 'Letters, laughter, and patience rewarded.' },
    { key: 'promise', title: 'The promise', caption: 'Beneath the same moon, a promise made.' },
    { key: 'nikah', title: 'The Nikah', caption: 'A sacred bond, witnessed and blessed.' },
    { key: 'celebration', title: 'The celebration', caption: 'And now, we celebrate — with you.' },
  ],

  // A subtle interactive starfield scene (Muslim-only in the arc).
  discoveryScene: {
    variant: 'moonlight',
    title: 'مَوَدَّةً وَرَحْمَةً',
    caption: 'Love and mercy between your hearts — tap to uncover a memory.',
    messages: [
      'The night we first spoke until sunrise.',
      'A promise made under an open sky.',
      'The city where it all began.',
      'The first “forever”.',
    ],
  },

  family: {
    groomSide: {
      label: 'With the blessings of the groom’s family',
      names: ['Mr. Imran & Mrs. Ayesha Ahmed', 'The Ahmed family', 'Zaid Ahmed · brother'],
    },
    brideSide: {
      label: 'With the blessings of the bride’s family',
      names: ['Mr. Yusuf & Mrs. Zara Fathima', 'The Fathima family', 'Maryam Fathima · sister'],
    },
  },

  events: [
    { id: 'mehndi', name: 'Mehndi', glyph: '✿', date: '21 January 2027', time: '6:00 PM', venue: 'The Garden Courtyard', description: 'An intimate evening of henna, sweets and song.', dress: 'Emerald & gold' },
    { id: 'nikah', name: 'Nikah', glyph: '☾', date: '23 January 2027', time: '7:00 PM', venue: 'The Royal Palace', description: 'The sacred marriage ceremony, followed by dinner.', dress: 'Elegant traditional' },
    { id: 'walima', name: 'Walima', glyph: '✦', date: '24 January 2027', time: '7:30 PM', venue: 'The Palace Ballroom', description: 'A grand reception to celebrate the union.', dress: 'Formal' },
  ],

  ceremony: {
    title: 'The Nikah',
    date: '23 January 2027',
    time: '7:00 PM',
    venue: 'The Royal Palace, Hyderabad',
    note: 'Beneath lantern light and an open sky, we ask for your presence and your prayers.',
  },

  verse: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    text: 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has placed love and mercy between your hearts.',
    ref: 'Surah Ar-Rum · 30:21',
  },

  venue: venue({
    name: 'The Royal Palace',
    address: 'Jubilee Hills, Hyderabad, Telangana',
    city: 'Hyderabad, Telangana',
    mapQuery: 'Jubilee Hills, Hyderabad, Telangana',
  }),

  closing: {
    message: 'WE WOULD BE HONOURED TO HAVE YOU WITH US',
  },

  discovery: {
    lamp: 'Light the lantern — and light the way.',
    spark: 'A moon, watching over us.',
    bride: 'Inaya — gentle, luminous, endlessly kind.',
    groom: 'Rayyan — steady as the north star.',
    together: 'Our day',
  },

  palette: {
    bg: '#0a1327',
    bg2: '#0c1d33',
    panel: 'rgba(15,32,52,0.72)',
    ink: '#e8edfb',
    inkSoft: '#a9b6d4',
    gold: '#f0d183',
    gold2: '#f7e6b0',
    accent: '#1f9d78',
    line: 'rgba(224,196,120,0.4)',
    glow: 'rgba(31,157,120,0.26)',
  },

  assets: {
    video: '/assets/muslim.mp4',
    poster: '/assets/muslim-poster.jpg',
    couple: '/assets/muslim-couple.png',
  },
  music: { src: '/song.mp3', start: 13 },

  scenes: [
    { type: 'opening' },
    { type: 'coupleReveal' },
    { type: 'discovery' },
    { type: 'story' },
    { type: 'pattern' },
    { type: 'ceremony' },
    { type: 'verse' },
    { type: 'events' },
    { type: 'venue' },
    { type: 'countdown' },
    { type: 'rsvp' },
    { type: 'closing' },
  ],
}

export default muslim
