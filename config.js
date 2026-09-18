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

  /* Two-letter monogram shown on the wax seal of the envelope */
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
  time:    { en: "8:00 - 12:00 in the evening",   ar: "الثامن حتى الثاني عشر مساءً" },

  /* ---- INVITATION LINE ---------------------------------------------- */
  invite: {
    en: "Youssef Ashraf & Huda Hussain request the pleasure of your company at their wedding celebration",
    ar: "بتشرف يوسف أشرف وهدى حسين دعوتكم لحضور حفل زفافهما"
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
     active value to retheme. Remove a key to fall back to the default. */
  theme: {
    /* ── Cream palette ───────────────────────────────────────────── */
    cream:        "#F8F3EA",
    creamDeep:    "#EFE2D6",
    creamLight:   "#FDFAF3",
    creamCard:    "#F4ECE0",

    /* ── Burgundy & gold scale ──────────────────────────────────── */
    gold:         "#B8863C",   /* borders, dividers   */
    goldLight:    "#D9AE6C",   /* lighter accents     */
    goldBright:   "#F0D9A8",   /* highlights          */
    clay:         "#7D5411",   /* corner diamonds, button hover fill */

    /* ── Ink (text) — deep burgundy heading ink ───────────────────── */
    ink:          "#5E1327",
    inkSoft:      "#4A3F39",
    inkMuted:     "#8A6A46",

    /* ── Envelope scene ──────────────────────────────────────────── */
    courtBg:      "#17070C",

    /* ── Gradients (full CSS gradient strings) ───────────────────── */
    goldGradient: "linear-gradient(135deg, #7D5411 0%, #F0D9A8 32%, #B8863C 54%, #F0D9A8 74%, #7D5411 100%)",
    clayGradient: "linear-gradient(135deg, #7D5411 0%, #F0D9A8 32%, #7D5411 54%, #B8863C 74%, #7D5411 100%)"
  }

};
