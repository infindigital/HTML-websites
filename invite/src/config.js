// =====================================================================
//  Rayyan & Inaya — Wedding Invitation · CENTRAL CONFIG
//  Edit couple details, date, venue and assets here. All visible wording
//  lives in src/i18n.js (translations), keyed to these values where needed.
//  Demo names & venue — swap these for the real couple/place when ordering.
//  Deploys on Vercel with the project Root Directory set to `invite`.
// =====================================================================

const mapQuery = 'Jubilee Hills, Hyderabad, Telangana 500033'

const config = {
  couple: {
    groomFirst: 'Rayyan',
    brideFirst: 'Inaya',
    combined: 'Rayyan & Inaya',
    monogram: 'R ✦ I',
    groomFullName: 'Rayyan Ahmed',
    groomParentage: 'S/O. Imran Ahmed & Zoya',
    brideFullName: 'Inaya Sheikh',
    brideParentage: 'D/O. Faisal Sheikh & Ayesha',
    year: 2026,
  },

  date: {
    iso: '2026-08-30T19:30:00+05:30',
    timeZone: 'Asia/Kolkata',
    labelUpper: 'SUNDAY, 30 AUGUST 2026',
    timeLabel: '7:30 pm',
  },

  venue: {
    name: 'The Royal Palace',
    address: 'Jubilee Hills, Hyderabad, Telangana 500033',
    short: 'Hyderabad, Telangana',
    mapQuery,
    // Keyless Google Maps embed built from mapQuery (no API key needed).
    // To pin an exact venue: Google Maps → Share → Embed a map → paste the src.
    googleMapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      mapQuery,
    )}&z=14&output=embed`,
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
