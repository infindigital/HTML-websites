// =====================================================================
//  Imran & Rashina — Wedding Invitation · CENTRAL CONFIG
//  Edit couple details, date, venue and assets here. All visible wording
//  lives in src/i18n.js (translations), keyed to these values where needed.
//  Deploys on Vercel with the project Root Directory set to `imran-rashina`
//  (served at https://invite.infindigital.net/imran-rashina).
//
//  ⚠ PLACEHOLDER DATA — the names are set to Imran & Rashina, but the full
//  names, parents, DATE and VENUE are still copied placeholders. Replace every
//  line marked "TODO" with the couple's real details before sharing the link.
// =====================================================================

const mapQuery = 'Jubilee Hills, Hyderabad, Telangana 500033' // TODO: real venue location

const config = {
  couple: {
    groomFirst: 'Imran',
    brideFirst: 'Rashina',
    combined: 'Imran & Rashina',
    monogram: 'I ✦ R',
    groomFullName: 'Imran', // TODO: groom's full name
    groomParentage: 'S/O. —', // TODO: groom's parents
    brideFullName: 'Rashina', // TODO: bride's full name
    brideParentage: 'D/O. —', // TODO: bride's parents
    year: 2026, // TODO: wedding year
  },

  date: {
    // TODO: replace with the real wedding date/time. Keep this ISO format —
    // `iso` drives the live countdown; the two labels are what guests read.
    iso: '2026-08-30T19:30:00+05:30',
    timeZone: 'Asia/Kolkata',
    labelUpper: 'SUNDAY, 30 AUGUST 2026',
    timeLabel: '7:30 pm',
  },

  venue: {
    // TODO: replace with the real venue.
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

  // Assets live in /public and are served under the subpath base, so build the
  // URL from Vite's BASE_URL (= "/imran-rashina/") rather than a bare "/…".
  audioSrc: import.meta.env.BASE_URL + 'song.mp3',
  // The track has a short intro; playback (and every loop) begins here, in
  // seconds. Set to 0 to play from the very start.
  audioStartOffset: 13,
  previewImage: import.meta.env.BASE_URL + 'preview.jpg',

  defaultLanguage: 'en',
  languages: ['en', 'kn', 'hi', 'ar'], // English, Kannada, Hindi, Arabic
}

export default config
