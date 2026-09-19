// =====================================================================
//  i18n — every visible string (English).
//
//  The invitation is English-only. Strings live here, keyed to `en`, and
//  are read through the `t()` helper in LanguageContext.
// =====================================================================

// Kept for the LanguageContext API (single language, left-to-right).
export const LANGUAGE_META = {
  en: { code: 'en', native: 'English', english: '', dir: 'ltr' },
}

export const translations = {
  // ------------------------------------------------------------------ EN
  en: {
    // persistent UI (aria labels)
    musicPlay: 'Play music',
    musicPause: 'Pause music',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',

    // names
    nameGroomFirst: 'IMRAN PJ',
    nameBrideFirst: 'RASHINA',
    nameCombined: 'Imran P J & Rashina',
    nameGroomFull: 'Imran P J',
    nameBrideFull: 'Rashina',

    // 1 · seal intro
    youAreInvited: 'YOU ARE INVITED',
    tapToOpen: 'Tap the seal to open',

    // 2 · main invitation
    weddingPill: 'WEDDING',
    togetherFamilies:
      'together with our families joyfully invite you to celebrate',
    dateUpper: 'SATURDAY, 03 OCTOBER 2026',
    venueShort: 'Panemangalore, Bantwal',
    scroll: 'SCROLL',

    // 3 · family invitation
    familyInviteLead:
      'We cordially invite you and your family to grace the occasion with your esteemed presence & blessings',
    onOccasionSon: 'On the auspicious occasion of the marriage of',
    loveNote:
      'With hearts full of love and joy, we invite you to share in the celebration of our marriage and the beginning of our forever.',

    // 4 · scratch card
    nikahCeremony: 'NIKAH',
    scratchToReveal: 'SCRATCH TO REVEAL',
    revealTheDate: 'REVEAL THE DATE',
    ceremonyDate: '03 October 2026',
    ceremonyTime: '11 AM',

    // 5 · countdown
    countingDown: 'COUNTING DOWN',
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MINUTES',
    seconds: 'SECONDS',
    celebrationMsg: 'Today we celebrate!',

    // 6 · venue
    findUs: 'FIND US',
    venueName: 'Sagar Auditorium',
    venueAddress: 'Panemangalore, Bantwal',
    getDirections: 'Get Directions →',

    // 7 · verse
    verseText:
      'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    verseRef: 'Surah Ar-Rum · 30:21',

    // 8 · closing
    createdWithLove: 'CREATED WITH LOVE',
  },
}

export default translations
