// =====================================================================
//  Azeem & Noora — Wedding Invitation · CENTRAL CONFIG
//  Edit couple details, date, venue and assets here. All visible wording
//  lives in src/i18n.js (translations), keyed to these values where needed.
// =====================================================================

const mapQuery =
  'Indiana Convention Center, Jeppinamogaru, Mangaluru, Karnataka 575002'

const config = {
  couple: {
    groomFirst: 'Azeem',
    brideFirst: 'Noora',
    combined: 'Azeem & Noora',
    monogram: 'A ✦ N',
    groomFullName: 'Mohammed Azeem',
    groomParentage: 'S/O. K. Badruddin & Sabeena',
    brideFullName: 'Noora Fathima',
    brideParentage: 'D/O. Dr. Naseer P.M. & Rahima',
    year: 2026,
  },

  date: {
    iso: '2026-08-30T19:30:00+05:30',
    timeZone: 'Asia/Kolkata',
    labelUpper: 'SUNDAY, 30 AUGUST 2026',
    timeLabel: '7:30 pm',
  },

  venue: {
    name: 'Indiana Convention Center',
    address: 'Jeppinamogaru, Mangaluru, Karnataka 575002',
    short: 'Mangaluru, Karnataka',
    mapQuery,
    // Keyless Google Maps embed + directions, built from mapQuery.
    googleMapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      mapQuery,
    )}&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      mapQuery,
    )}`,
  },

  // Arabic Bismillah glyph (rendered in Amiri). Stays as-is across languages.
  bismillah: '﷽',

  loveNote:
    'With hearts full of love and joy, we invite you to share in the celebration of our marriage and the beginning of our forever.',

  verse: {
    text:
      'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    ref: 'Surah Ar-Rum · 30:21',
  },

  // Assets — drop your own files into /public (see README).
  audioSrc: '/song.mp3',
  previewImage: '/preview.jpg',

  defaultLanguage: 'en',
  languages: ['en', 'kn', 'hi', 'ar'], // English, Kannada, Hindi, Arabic
}

export default config
