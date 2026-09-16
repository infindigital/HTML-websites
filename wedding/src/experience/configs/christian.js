import { venue } from './_shared.js'

// =====================================================================
//  CHRISTIAN EXPERIENCE CONFIG — "A Walk into Forever"
//  All names / dates / messages are editable DEMO placeholders.
// =====================================================================
const christian = {
  religion: 'christian',
  concept: 'A Walk into Forever',

  couple: {
    groom: 'Nathan',
    bride: 'Grace',
    combined: 'Nathan & Grace',
    monogram: 'N ✦ G',
    groomFull: 'Nathan D’Souza',
    brideFull: 'Grace Fernandes',
    groomParents: 'Son of Mr. Peter & Mrs. Anita D’Souza',
    brideParents: 'Daughter of Mr. Joseph & Mrs. Maria Fernandes',
  },

  date: {
    iso: '2027-06-05T16:00:00+05:30',
    dateLabel: 'Saturday, 5 June 2027',
    timeLabel: '4:00 PM',
  },

  invocation: '✝',
  verseMark: '✠',

  hero: {
    eyebrow: 'Together with our families',
    marrying: 'ARE GETTING MARRIED',
    subline: 'and invite you to walk with us into forever',
  },

  story: [
    { key: 'hello', title: 'The first hello', caption: 'A crowded café, a spilled coffee, an apology that lasted hours.' },
    { key: 'date', title: 'The first date', caption: 'Golden hour by the sea, and no wish to leave.' },
    { key: 'journey', title: 'The journey', caption: 'Years of small ordinary days that meant everything.' },
    { key: 'proposal', title: 'The proposal', caption: 'A garden, a ring, and a question with one answer.' },
    { key: 'wedding', title: 'The wedding day', caption: 'And now — we walk into forever.' },
  ],

  // A gentle interactive garden scene (Christian-only in the arc).
  discoveryScene: {
    variant: 'garden',
    title: 'The garden of us',
    caption: 'A quiet moment before the walk. Tap to explore.',
    messages: [
      'Where he first said “I love you.”',
      'Our song, playing somewhere.',
      'The bench we always come back to.',
    ],
  },

  family: {
    groomSide: {
      label: 'With the blessings of the groom’s family',
      names: ['Mr. Peter & Mrs. Anita D’Souza', 'The D’Souza family', 'Ryan D’Souza · brother'],
    },
    brideSide: {
      label: 'With the blessings of the bride’s family',
      names: ['Mr. Joseph & Mrs. Maria Fernandes', 'The Fernandes family', 'Elena Fernandes · sister'],
    },
  },

  events: [
    { id: 'ceremony', name: 'Ceremony', glyph: '✞', date: '5 June 2027', time: '4:00 PM', venue: 'St. Mary’s Chapel', description: 'The exchange of vows and rings before family and friends.', dress: 'Garden formal' },
    { id: 'cocktails', name: 'Cocktails', glyph: '✿', date: '5 June 2027', time: '6:00 PM', venue: 'The Chapel Gardens', description: 'Golden-hour drinks and canapés among the flowers.', dress: 'Garden formal' },
    { id: 'reception', name: 'Reception', glyph: '✦', date: '5 June 2027', time: '7:30 PM', venue: 'The Grand Ballroom', description: 'Dinner, dancing and a first dance to remember.', dress: 'Black tie' },
  ],

  ceremony: {
    title: 'The Ceremony',
    date: '5 June 2027',
    time: '4:00 PM',
    venue: 'St. Mary’s Chapel, Bandra',
    note: 'As candles are lit and vows are exchanged, we ask for your presence and your blessing.',
  },

  verse: {
    text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.',
    ref: '1 Corinthians 13:4–7',
  },

  venue: venue({
    name: 'St. Mary’s Chapel',
    address: 'Hill Road, Bandra West, Mumbai',
    city: 'Bandra, Mumbai',
    mapQuery: 'Bandra West, Mumbai, Maharashtra',
  }),

  closing: {
    message: 'WE CAN’T WAIT TO CELEBRATE WITH YOU',
  },

  discovery: {
    lamp: 'A candle, for the light you bring.',
    spark: 'Flowers, freshly picked for you.',
    bride: 'Grace — sunlight in a room, kindness in a person.',
    groom: 'Nathan — the calm, the constant, the home.',
    together: 'Our day',
  },

  palette: {
    bg: '#1b140c',
    bg2: '#2a1e12',
    panel: 'rgba(40,30,18,0.68)',
    ink: '#f6ecd8',
    inkSoft: '#cdb890',
    gold: '#efdcb0',
    gold2: '#f7ecd2',
    accent: '#c98a5e',
    line: 'rgba(210,175,120,0.42)',
    glow: 'rgba(201,138,94,0.24)',
  },

  assets: {
    video: '/assets/christian.mp4',
    poster: '/assets/christian-poster.jpg',
    couple: '/assets/christian-couple.png',
  },
  music: '/song.mp3',

  scenes: [
    { type: 'opening' },
    { type: 'coupleReveal' },
    { type: 'pattern' },
    { type: 'story' },
    { type: 'discovery' },
    { type: 'ceremony' },
    { type: 'verse' },
    { type: 'family' },
    { type: 'events' },
    { type: 'venue' },
    { type: 'countdown' },
    { type: 'rsvp' },
    { type: 'closing' },
  ],
}

export default christian
