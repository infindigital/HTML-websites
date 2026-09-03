// =====================================================================
//  Azeem & Noora — Wedding Invitation · CENTRAL CONFIG
//  Edit couple details, date, venue and assets here. All visible wording
//  lives in src/i18n.js (translations), keyed to these values where needed.
//  Deploys on Vercel with the project Root Directory set to `wedding`.
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
    // Exact Google "Embed a map" URL pinned to the venue (no API key needed).
    // To replace: Google Maps → Share → Embed a map → copy the iframe src.
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.3666128432315!2d74.86407927483921!3d12.854107587450569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b9f07ef1f07%3A0x8fe4cfe13b636e12!2sINDIANA%20CONVENTION%20CENTER!5e1!3m2!1sen!2sin!4v1788439456905!5m2!1sen!2sin',
    // "Get Directions" button target, built from mapQuery.
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
  // The track has a short intro; playback (and every loop) begins here, in
  // seconds. Set to 0 to play from the very start.
  audioStartOffset: 13,
  previewImage: '/preview.jpg',

  defaultLanguage: 'en',
  languages: ['en', 'kn', 'hi', 'ar'], // English, Kannada, Hindi, Arabic
}

export default config
