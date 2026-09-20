/* =====================================================================
   WEDDING INVITATION — EDIT EVERYTHING HERE
   ---------------------------------------------------------------------
   This is the ONLY file you need to change. Update names, the date,
   the venue, the Google Maps link, and the music file below.
   Arabic (ar) and English (en) are both shown on the card.
   ===================================================================== */

window.WEDDING_CONFIG = {

  /* ---- THE COUPLE ---------------------------------------------------
     Groom is shown first, bride second. Edit both languages. */
  groom: { en: "Youssef", ar: "يوسف" },
  bride: { en: "Huda", ar: "هدى" },

  /* Two-letter monogram shown on the gate ornament */
  monogram: "Y&H",

  /* Hashtag shown near the bottom (set to "" to hide) */
  hashtag: "#YoussefAndHuda",

  /* ---- DATE & TIME --------------------------------------------------
     dateISO drives the LIVE COUNTDOWN — use 24-hour: YYYY-MM-DDTHH:MM:SS
     The display strings below are what people actually read. */
  dateISO: "2026-10-04T20:00:00",
  /* When the party ends — used by the "Add to Calendar" button.
     Leave as "" and the event defaults to 4 hours long. */
  endISO:  "2026-10-05T00:00:00",
  date:    { en: "Sunday, 4 Oct 2026",  ar: "الأحد ٤ أكتوبر ٢٠٢٦" },
  time:    { en: "8:00 - 12:00 in the evening",   ar: "الثامنة حتى الثانية عشر مساءً" },

  /* ---- INVITATION LINE ---------------------------------------------- */
  invite: {
    en: "We are honored to invite you to the wedding of Youssef Ashraf & Huda Hussein",
    ar: "نتشرف بدعوة سيادتكم لحضور حفل زفاف يوسف أشرف وهدى حسين"
  },

  /* ---- VENUE --------------------------------------------------------
     Fill the name + address, then paste the Google Maps share link into
     mapsUrl. The "Open in Google Maps" button stays disabled until you
     add that link. Leave mapsUrl as "" until you have it. */
  venue: {
    name:    { en: "Omniyati Hall - Aqua House Hotel", ar: " قاعة أُمْنِيَتِي - فندق اكوا هوس" },
    address: { en: "Nasr City", ar: "مدينة نصر" },
    mapsUrl: "https://maps.app.goo.gl/pmPCbbXhnBErwLr37"
  },

  /* ---- BLESSING (Qur'an, Al-Furqan 25:74) ---------------------------
     A traditional marriage du'a. Replace if you prefer another
     (e.g. Ar-Rum 30:21 "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم..."). */
  verse: {
    ar:  "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    en:  "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.",
    ref: { en: "Qur'an 25:74", ar: "سورة الفرقان — ٧٤" }
  },

  /* ---- SITE URL (for social media preview) --------------------------
     Set this to your hosted URL (no trailing slash) so the og:image
     in the preview card becomes an absolute URL — required by
     Facebook, WhatsApp, and iMessage.
     Example: "https://ahmed-reham-2026.com"
     Leave as "" during local development. */
  siteUrl: "https://youssefandhuda.live/",

  /* ---- BACKGROUND MUSIC ---------------------------------------------
     Drop an audio file in the project and put its path here, e.g.
     "music/nasheed.mp3". The toggle button works either way; if this
     is empty, the button simply does nothing. */
  musicUrl: "music/nasheed.mp3",

  /* ---- COLOR THEME --------------------------------------------------
     Every color on the site is controlled here.
     Defaults (tokens.css values) are shown in comments — change the
     active value to retheme. Remove a key or set to "" to fall back
     to the default. */
  theme: {
    /* ── Backgrounds ─────────────────────────────────────────────── */
    cream:        "#E1DED4",
    creamDeep:    "#B6B0A0",
    creamLight:   "#E8DCC7",
    creamCard:    "#E8DCC7",

    /* ── Primary accent (dusty rose) ─────────────────────────────── */
    primary:      "#B77D6C",
    primaryLight: "#D0A99A",
    primaryDeep:  "#8B5C3A",

    /* ── Gold scale → warm wood tones ─────────────────────────────── */
    gold:         "#8B5C3A",
    goldLight:    "#B77D6C",
    goldBright:   "#E8DCC7",
    clay:         "#8B5C3A",

    /* ── Default text — deep forest ──────────────────────────────── */
    ink:          "#1B1F16",
    inkSoft:      "#69614D",
    inkMuted:     "#8C7C65",

    /* ── Gate scene ──────────────────────────────────────────────── */
    gateBg:       "#E1DED4",
    gateDoor:     "#8B5C3A",
    gateDoorDark: "#69614D",
    gateTrim:     "#8B5C3A",

    /* ── Per-element text colors (set to "" to use the CSS default) ─ */
    textEyebrow:     "",   /* default: --ink-soft              */
    textNameAr:      "",   /* default: --primary  (warm rose)  */
    textNameEn:      "",   /* default: --ink-soft              */
    textAmp:         "",   /* default: --gold-light            */
    textInviteLine:  "",   /* default: --ink-soft              */
    textDateMain:    "",   /* default: --ink                   */
    textDateTime:    "",   /* default: --ink-soft              */
    textVenueName:   "",   /* default: --ink                   */
    textVenueAddr:   "",   /* default: --ink-soft              */
    textCountdownNum:"",   /* default: --cream-light           */
    textCountdownLbl:"",   /* default: --gold-light            */
    textVerseAr:     "",   /* default: --ink                   */
    textVerseEn:     "",   /* default: --ink-soft              */
    textVerseRef:    "",   /* default: --gold                  */
    textSectionLabel:"",   /* default: --cream-light           */
    textFooter:      "",   /* default: --ink                   */
    textGateHint:    "",   /* default: --ink-soft              */

    /* ── Gradients (full CSS gradient strings) ───────────────────── */
    goldGradient: "linear-gradient(135deg, #8B5C3A 0%, #E8DCC7 32%, #B77D6C 54%, #E8DCC7 74%, #8B5C3A 100%)",
    clayGradient: "linear-gradient(135deg, #8B5C3A 0%, #E8DCC7 32%, #8B5C3A 54%, #B77D6C 74%, #8B5C3A 100%)"
  }

};
