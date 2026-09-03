// =====================================================================
//  i18n — every visible string, keyed by language code.
//  Languages: en (English) · kn (Kannada) · hi (Hindi) · ar (Arabic, RTL)
//
//  HOW TO ADD A LANGUAGE:
//   1. Add its code to `languages` in src/config.js.
//   2. Add an entry to LANGUAGE_META below (native label + dir).
//   3. Add a matching block to `translations` with the same keys as `en`.
//  Any key missing from a language automatically falls back to English.
//
//  NOTE: Names (Azeem, Noora, parents), the venue name & address, the
//  Bismillah, and date numerals (30, 2026, 7:30) stay as-is across
//  languages — only wording is translated. Place-name labels are
//  transliterated into each script for readability.
// =====================================================================

// Order here controls the order shown in the language dropdown.
export const LANGUAGE_META = {
  en: { code: 'en', native: 'English', english: '', dir: 'ltr' },
  kn: { code: 'kn', native: 'ಕನ್ನಡ', english: 'KANNADA', dir: 'ltr' },
  hi: { code: 'hi', native: 'हिंदी', english: 'HINDI', dir: 'ltr' },
  ar: { code: 'ar', native: 'العربية', english: 'ARABIC', dir: 'rtl' },
}

export const translations = {
  // ------------------------------------------------------------------ EN
  en: {
    // persistent UI (aria labels)
    langAria: 'Choose language',
    musicPlay: 'Play music',
    musicPause: 'Pause music',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',

    // names — transliterated into each script so they change with the language
    nameGroomFirst: 'Azeem',
    nameBrideFirst: 'Noora',
    nameCombined: 'Azeem & Noora',
    nameGroomFull: 'Mohammed Azeem',
    nameBrideFull: 'Noora Fathima',
    nameGroomParentage: 'S/O. K. Badruddin & Sabeena',
    nameBrideParentage: 'D/O. Dr. Naseer P.M. & Rahima',

    // 1 · seal intro
    youAreInvited: 'YOU ARE INVITED',
    tapToOpen: 'Tap the seal to open',

    // 2 · main invitation
    weddingPill: 'WEDDING',
    togetherFamilies:
      'together with our families joyfully invite you to celebrate',
    dateUpper: 'SUNDAY, 30 AUGUST 2026',
    venueShort: 'Mangaluru, Karnataka',
    scroll: 'SCROLL',

    // 3 · family invitation
    familyInviteLead:
      'We cordially invite you and your family to grace the occasion with your esteemed presence & blessings',
    onOccasionSon: 'On the auspicious occasion of the marriage of our son',
    loveNote:
      'With hearts full of love and joy, we invite you to share in the celebration of our marriage and the beginning of our forever.',

    // 4 · scratch card
    nikahCeremony: 'NIKAH CEREMONY',
    scratchToReveal: 'SCRATCH TO REVEAL',
    revealTheDate: 'REVEAL THE DATE',
    ceremonyDate: '30 August 2026',
    ceremonyTime: '7:30 PM',

    // 5 · countdown
    countingDown: 'COUNTING DOWN',
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MINUTES',
    seconds: 'SECONDS',
    celebrationMsg: 'Today we celebrate!',

    // 6 · venue
    findUs: 'FIND US',
    getDirections: 'Get Directions →',

    // 7 · verse
    verseText:
      'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    verseRef: 'Surah Ar-Rum · 30:21',

    // 8 · closing
    createdWithLove: 'CREATED WITH LOVE',
  },

  // ------------------------------------------------------------------ KN
  kn: {
    langAria: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    musicPlay: 'ಸಂಗೀತ ನುಡಿಸಿ',
    musicPause: 'ಸಂಗೀತ ನಿಲ್ಲಿಸಿ',
    themeToDark: 'ಡಾರ್ಕ್ ಮೋಡ್‌ಗೆ ಬದಲಿಸಿ',
    themeToLight: 'ಲೈಟ್ ಮೋಡ್‌ಗೆ ಬದಲಿಸಿ',

    nameGroomFirst: 'ಅಜೀಂ',
    nameBrideFirst: 'ನೂರಾ',
    nameCombined: 'ಅಜೀಂ & ನೂರಾ',
    nameGroomFull: 'ಮೊಹಮ್ಮದ್ ಅಜೀಂ',
    nameBrideFull: 'ನೂರಾ ಫಾತಿಮಾ',
    nameGroomParentage: 'ಪುತ್ರ · ಕೆ. ಬದ್ರುದ್ದೀನ್ & ಸಬೀನಾ',
    nameBrideParentage: 'ಪುತ್ರಿ · ಡಾ. ನಸೀರ್ ಪಿ.ಎಂ. & ರಹೀಮಾ',

    youAreInvited: 'ನೀವು ಆಹ್ವಾನಿತರು',
    tapToOpen: 'ತೆರೆಯಲು ಮುದ್ರೆಯನ್ನು ಸ್ಪರ್ಶಿಸಿ',

    weddingPill: 'ವಿವಾಹ',
    togetherFamilies:
      'ನಮ್ಮ ಕುಟುಂಬಗಳೊಂದಿಗೆ ಈ ಸಂಭ್ರಮದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಲು ನಿಮ್ಮನ್ನು ಸಂತೋಷದಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ',
    dateUpper: 'ಭಾನುವಾರ, 30 ಆಗಸ್ಟ್ 2026',
    venueShort: 'ಮಂಗಳೂರು, ಕರ್ನಾಟಕ',
    scroll: 'ಸ್ಕ್ರೋಲ್',

    familyInviteLead:
      'ನಿಮ್ಮ ಗೌರವಾನ್ವಿತ ಉಪಸ್ಥಿತಿ ಮತ್ತು ಆಶೀರ್ವಾದದಿಂದ ಈ ಸಂದರ್ಭವನ್ನು ಶೋಭಾಯಮಾನಗೊಳಿಸಲು ನಿಮ್ಮನ್ನು ಹಾಗೂ ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ಸಾದರವಾಗಿ ಆಹ್ವಾನಿಸುತ್ತೇವೆ',
    onOccasionSon: 'ನಮ್ಮ ಪುತ್ರನ ವಿವಾಹದ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ',
    loveNote:
      'ಪ್ರೀತಿ ಮತ್ತು ಸಂತೋಷದಿಂದ ತುಂಬಿದ ಹೃದಯದಿಂದ, ನಮ್ಮ ವಿವಾಹ ಹಾಗೂ ನಮ್ಮ ಶಾಶ್ವತ ಜೀವನದ ಆರಂಭದ ಈ ಸಂಭ್ರಮದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಲು ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ.',

    nikahCeremony: 'ನಿಕಾಹ್ ಸಮಾರಂಭ',
    scratchToReveal: 'ಬಹಿರಂಗಪಡಿಸಲು ಕೆರೆಯಿರಿ',
    revealTheDate: 'ದಿನಾಂಕವನ್ನು ಬಹಿರಂಗಪಡಿಸಿ',
    ceremonyDate: '30 ಆಗಸ್ಟ್ 2026',
    ceremonyTime: 'ಸಂಜೆ 7:30',

    countingDown: 'ಸಮಯ ಎಣಿಕೆ',
    days: 'ದಿನಗಳು',
    hours: 'ಗಂಟೆಗಳು',
    minutes: 'ನಿಮಿಷಗಳು',
    seconds: 'ಸೆಕೆಂಡುಗಳು',
    celebrationMsg: 'ಇಂದು ನಾವು ಸಂಭ್ರಮಿಸೋಣ!',

    findUs: 'ನಮ್ಮನ್ನು ಹುಡುಕಿ',
    getDirections: 'ದಾರಿ ಪಡೆಯಿರಿ →',

    verseText:
      'ನೀವು ನೆಮ್ಮದಿ ಪಡೆಯುವಂತೆ ನಿಮ್ಮಿಂದಲೇ ನಿಮಗಾಗಿ ಸಂಗಾತಿಗಳನ್ನು ಸೃಷ್ಟಿಸಿದ್ದು ಮತ್ತು ನಿಮ್ಮ ನಡುವೆ ಪ್ರೀತಿ ಹಾಗೂ ಕರುಣೆಯನ್ನು ಮೂಡಿಸಿದ್ದು ಆತನ ನಿದರ್ಶನಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಚಿಂತನೆ ಮಾಡುವ ಜನರಿಗೆ ಖಂಡಿತವಾಗಿಯೂ ಇದರಲ್ಲಿ ನಿದರ್ಶನಗಳಿವೆ.',
    verseRef: 'ಸೂರಃ ಅರ್-ರೂಮ್ · 30:21',

    createdWithLove: 'ಪ್ರೀತಿಯಿಂದ ರಚಿಸಲಾಗಿದೆ',
  },

  // ------------------------------------------------------------------ HI
  hi: {
    langAria: 'भाषा चुनें',
    musicPlay: 'संगीत चलाएँ',
    musicPause: 'संगीत रोकें',
    themeToDark: 'डार्क मोड पर जाएँ',
    themeToLight: 'लाइट मोड पर जाएँ',

    nameGroomFirst: 'अज़ीम',
    nameBrideFirst: 'नूरा',
    nameCombined: 'अज़ीम & नूरा',
    nameGroomFull: 'मोहम्मद अज़ीम',
    nameBrideFull: 'नूरा फ़ातिमा',
    nameGroomParentage: 'पुत्र · के. बदरुद्दीन & सबीना',
    nameBrideParentage: 'पुत्री · डॉ. नसीर पी.एम. & रहीमा',

    youAreInvited: 'आप आमंत्रित हैं',
    tapToOpen: 'खोलने के लिए मुहर को स्पर्श करें',

    weddingPill: 'विवाह',
    togetherFamilies:
      'हमारे परिवारों सहित हम आपको इस उत्सव में सम्मिलित होने के लिए सहर्ष आमंत्रित करते हैं',
    dateUpper: 'रविवार, 30 अगस्त 2026',
    venueShort: 'मंगलुरु, कर्नाटक',
    scroll: 'स्क्रॉल करें',

    familyInviteLead:
      'हम आपको और आपके परिवार को अपनी गरिमामयी उपस्थिति एवं आशीर्वाद से इस अवसर की शोभा बढ़ाने के लिए सादर आमंत्रित करते हैं',
    onOccasionSon: 'हमारे पुत्र के विवाह के शुभ अवसर पर',
    loveNote:
      'प्रेम और आनंद से भरे हृदय के साथ, हम आपको हमारे विवाह और हमारे सदा के जीवन की शुरुआत के इस उत्सव में सम्मिलित होने के लिए आमंत्रित करते हैं।',

    nikahCeremony: 'निकाह समारोह',
    scratchToReveal: 'प्रकट करने के लिए खुरचें',
    revealTheDate: 'तिथि प्रकट करें',
    ceremonyDate: '30 अगस्त 2026',
    ceremonyTime: 'शाम 7:30 बजे',

    countingDown: 'समय की गिनती',
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट',
    seconds: 'सेकंड',
    celebrationMsg: 'आज हम उत्सव मनाते हैं!',

    findUs: 'हमें खोजें',
    getDirections: 'दिशा-निर्देश प्राप्त करें →',

    verseText:
      'और उसकी निशानियों में से यह है कि उसने तुम्हारे लिए तुम्हीं में से जोड़े पैदा किए, ताकि तुम उनसे शांति पाओ, और तुम्हारे बीच प्रेम और दया उत्पन्न कर दी। निःसंदेह इसमें उन लोगों के लिए निशानियाँ हैं जो विचार करते हैं।',
    verseRef: 'सूरह अर-रूम · 30:21',

    createdWithLove: 'प्रेम से बनाया गया',
  },

  // ------------------------------------------------------------------ AR (RTL)
  ar: {
    langAria: 'اختر اللغة',
    musicPlay: 'تشغيل الموسيقى',
    musicPause: 'إيقاف الموسيقى',
    themeToDark: 'التحويل إلى الوضع الداكن',
    themeToLight: 'التحويل إلى الوضع الفاتح',

    nameGroomFirst: 'عزيم',
    nameBrideFirst: 'نورا',
    nameCombined: 'عزيم & نورا',
    nameGroomFull: 'محمد عزيم',
    nameBrideFull: 'نورة فاطمة',
    nameGroomParentage: 'ابن · ك. بدر الدين & سبينة',
    nameBrideParentage: 'ابنة · د. نصير بي.إم. & رحيمة',

    youAreInvited: 'أنتم مدعوّون',
    tapToOpen: 'انقر على الختم لفتح الدعوة',

    weddingPill: 'زفاف',
    togetherFamilies: 'نتشرّف نحن وعائلتانا بدعوتكم للاحتفال معنا',
    dateUpper: 'الأحد، 30 أغسطس 2026',
    venueShort: 'مانغالورو، كارناتاكا',
    scroll: 'مرّر للأسفل',

    familyInviteLead:
      'يسعدنا دعوتكم أنتم وعائلتكم لتشريف هذه المناسبة بحضوركم الكريم ودعواتكم الطيبة',
    onOccasionSon: 'بمناسبة زواج ابننا',
    loveNote:
      'بقلوبٍ مفعمة بالحب والفرح، ندعوكم لمشاركتنا الاحتفال بزواجنا وبداية حياتنا معًا إلى الأبد.',

    nikahCeremony: 'حفل عقد القران',
    scratchToReveal: 'اكشط للكشف',
    revealTheDate: 'اكشف عن التاريخ',
    ceremonyDate: '30 أغسطس 2026',
    ceremonyTime: '7:30 مساءً',

    countingDown: 'العدّ التنازلي',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثوانٍ',
    celebrationMsg: 'اليوم نحتفل!',

    findUs: 'موقعنا',
    getDirections: '← احصل على الاتجاهات',

    verseText:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    verseRef: 'سورة الروم · 30:21',

    createdWithLove: 'صُنع بحب',
  },
}

export default translations
