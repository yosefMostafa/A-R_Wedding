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
  groom: { en: "Ahmed", ar: "أحمد" },
  bride: { en: "Reham", ar: "ريهام" },

  /* Two-letter monogram shown on the wax seal of the envelope */
  monogram: "A&R",

  /* Hashtag shown near the bottom (set to "" to hide) */
  hashtag: "#AhmedAndReham",

  /* ---- DATE & TIME --------------------------------------------------
     dateISO drives the LIVE COUNTDOWN — use 24-hour: YYYY-MM-DDTHH:MM:SS
     The display strings below are what people actually read. */
  dateISO: "2026-06-26T17:30:00",
  date:    { en: "Friday, 26 June 2026",  ar: "الجمعة ٢٦ يونيو ٢٠٢٦" },
  time:    { en: "5:30 in the evening",   ar: "الخامسة والنصف مساءً" },

  /* ---- INVITATION LINE ---------------------------------------------- */
  invite: {
    en: "Together with their families, request the honour of your presence at the celebration of their marriage",
    ar: "يتشرّفان مع عائلتيهما بدعوتكم لحضور حفل زفافهما"
  },

  /* ---- VENUE --------------------------------------------------------
     Fill the name + address, then paste the Google Maps share link into
     mapsUrl. The "Open in Google Maps" button stays disabled until you
     add that link. Leave mapsUrl as "" until you have it. */
  venue: {
    name:    { en: "Al-Hassan Mosque", ar: "مسجد الحسن" },
    address: { en: "New Cairo 1", ar: "القاهرة الجديدة ١" },
    mapsUrl: "https://www.google.com/maps/place/%D9%85%D8%B3%D8%AC%D8%AF+%D8%A7%D9%84%D8%AD%D8%B3%D9%86%E2%80%AD/@30.0317007,31.4708801,941m/data=!3m2!1e3!4b1!4m6!3m5!1s0x145823000ea9641d:0x6469fd37f3b2c76!8m2!3d30.0317007!4d31.4708801!16s%2Fg%2F11x7gsqqhd?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
  },

  /* ---- BLESSING (Qur'an, Ar-Rum 30:21) ------------------------------
     A traditional marriage verse. Replace if you prefer another. */
  verse: {
    ar:  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    en:  "And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He has placed between you affection and mercy.",
    ref: { en: "Qur'an 30:21", ar: "سورة الروم — ٢١" }
  },

  /* ---- SITE URL (for social media preview) --------------------------
     Set this to your hosted URL (no trailing slash) so the og:image
     in the preview card becomes an absolute URL — required by
     Facebook, WhatsApp, and iMessage.
     Example: "https://ahmed-reham-2026.com"
     Leave as "" during local development. */
  siteUrl: "https://ahmedandreham.live/",

  /* ---- BACKGROUND MUSIC ---------------------------------------------
     Drop an audio file in the project and put its path here, e.g.
     "music/nasheed.mp3". The toggle button works either way; if this
     is empty, the button simply does nothing. */
  musicUrl: "music/nasheed.mp3",

   /* ---- COLOR THEME --------------------------------------------------
     To tweak colors, edit styles/tokens.css instead.
     These overrides are applied on top of tokens.css at runtime.
     Remove any key you don't want to override. */
  theme: {
    cream:      "#f1e7d3",
    creamDeep:  "#e2d4b9",
    gold:       "#6e5232",
    goldLight:  "#9c7748",
    goldBright: "#c6a06a",
    ink:        "#161616"
  }

};
