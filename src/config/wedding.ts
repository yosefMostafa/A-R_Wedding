/* All invitation content lives here. Arabic (ar) and English (en) are both shown. */

export type Bilingual = { en: string; ar: string };

export const wedding = {
  groom: { en: 'Youssef', ar: 'يوسف' },
  bride: { en: 'Huda', ar: 'هدى' },
  monogram: 'Y&H',
  hashtag: '#YoussefAndHuda',

  /* Drives the live countdown — local wall-clock time at the venue */
  dateISO: '2026-10-04T20:00:00',
  date: { en: 'Sunday, 4 October 2026', ar: 'الأحد ٤ أكتوبر ٢٠٢٦' },
  time: { en: '8:00 PM in the evening', ar: 'الثامنة مساءً' },

  invite: {
    en: 'Youssef Ashraf & Huda Hussain request the pleasure of your company at their wedding celebration',
    ar: 'يسر يوسف أشرف وهدى حسين دعوتكم لحضور حفل زفافهما',
  },

  venue: {
    name: { en: 'Omniyati Hall - Aqua House Hotel', ar: 'قاعة أُمْنِيَتِي - فندق اكوا هوس' },
    address: { en: 'Nasr City', ar: 'مدينة نصر' },
    mapsUrl: 'https://maps.app.goo.gl/pmPCbbXhnBErwLr37',
  },

  /* Qur'an, Al-Furqan 25:74 */
  verse: {
    ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    en: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.',
    ref: { en: "Qur'an 25:74", ar: 'سورة الفرقان — ٧٤' },
  },

  siteUrl: 'https://youssefandhuda.live',
  musicUrl: '/music/nasheed.mp3',
} as const;

export type Wedding = typeof wedding;

export const titleAr = `${wedding.groom.ar} و${wedding.bride.ar} — دعوة زفاف`;
export const titleEn = `${wedding.groom.en} & ${wedding.bride.en} — Wedding Invitation`;
export const siteTitle = `${titleAr} | ${titleEn}`;
export const siteDescription =
  `${wedding.invite.ar} — ${wedding.date.ar} · ${wedding.time.ar}\n` +
  `${wedding.invite.en} — ${wedding.date.en} · ${wedding.time.en}`;
