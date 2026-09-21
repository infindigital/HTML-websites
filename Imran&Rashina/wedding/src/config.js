// =====================================================================
//  Imran PJ & Rashina — Wedding Invitation · CENTRAL CONFIG
//  Edit couple details, date, venue and assets here. All visible wording
//  lives in src/i18n.js (translations), keyed to these values where needed.
//  Deploys on Vercel with the project Root Directory set to `wedding`.
// =====================================================================

const mapQuery = 'Sagar Auditorium, Panemangalore, Bantwal'

const config = {
  couple: {
    groomFirst: 'Imran PJ',
    brideFirst: 'Rashina',
    combined: 'Imran P J & Rashina',
    monogram: 'I ✦ R',
    groomFullName: 'Imran P J',
    brideFullName: 'Rashina',
    year: 2026,
  },

  date: {
    iso: '2026-10-03T11:00:00+05:30',
    timeZone: 'Asia/Kolkata',
    labelUpper: 'SATURDAY, 03 OCTOBER 2026',
    timeLabel: '11:00 am',
  },

  venue: {
    name: 'Sagar Auditorium',
    address: 'Panemangalore, Bantwal',
    short: 'Panemangalore, Bantwal',
    mapQuery,
    // Exact Google "Embed a map" URL pinned to the venue (no API key needed).
    // To replace: Google Maps → Share → Embed a map → copy the iframe src.
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.986070258532!2d75.04448607483977!3d12.879924987427037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a7e7852ecfd7%3A0xa06a0837f667650c!2sSagar%20Auditorium%2C%20Panemangalore!5e1!3m2!1sen!2sin!4v1789736896263!5m2!1sen!2sin',
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

  // Assets — drop your own files into /public (see README). Paths are prefixed
  // with the Vite base URL so they resolve under the /imran-rashina subpath.
  audioSrc: `${import.meta.env.BASE_URL}song.mp3`,
  // The track has a short intro; playback (and every loop) begins here, in
  // seconds. Set to 0 to play from the very start.
  audioStartOffset: 13,
  previewImage: `${import.meta.env.BASE_URL}preview.jpg`,

  defaultLanguage: 'en',
  languages: ['en'], // English only
}

export default config
