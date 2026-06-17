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
  dateISO: "2026-06-26T18:00:00",
  date:    { en: "Friday, 26 June 2026",  ar: "الجمعة ٢٦ يونيو ٢٠٢٦" },
  time:    { en: "6:00 - 7:30 in the evening ",   ar: "السادسة حتى السابعة والنصف مساءً" },

  /* ---- INVITATION LINE ---------------------------------------------- */
  invite: {
    en: "Together request the honour of your presence at the celebration of their marriage",
    ar: "يتشرّفان بدعوتكم لحضور عقد قرانهما"
  },
  
  /* ---- VENUE --------------------------------------------------------
     Fill the name + address, then paste the Google Maps share link into
     mapsUrl. The "Open in Google Maps" button stays disabled until you
     add that link. Leave mapsUrl as "" until you have it. */
  venue: {
    name:    { en: "Al salam Hall - Al-Hafez Mosque", ar: " قاعة السلام - مسجد الحافظ" },
    address: { en: "Al Mokattam", ar: "المقطم" },
    mapsUrl: "https://maps.app.goo.gl/7h26DsRCpKXzdeF76"
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
     Every color on the site is controlled here.
     Defaults (tokens.css values) are shown in comments — change the
     active value to retheme. Remove a key to fall back to the default. */
  theme: {
    /* ── Cream palette ───────────────────────────────────────────── */
    cream:        "#ddbea9",   /* default: #f1e7d3  — page background    */
    creamDeep:    "#cb997e",   /* default: #e2d4b9  — deep cream accent   */
    creamLight:   "#eddcd2",   /* default: #f6efdd  — card top gradient   */
    creamCard:    "#fff1e6",   /* default: #ebdfc5  — card bottom gradient */

    /* ── Gold / clay scale ───────────────────────────────────────── */
    gold:         "#b7b7a4",   /* default: #6e5232  — borders, dividers   */
    goldLight:    "#b7b7a4",   /* default: #9c7748  — lighter accents     */
    goldBright:   "#89a160",   /* default: #c6a06a  — highlights          */
    clay:         "#6e5232",   /* default: #6e5232  — corner diamonds     */

    /* ── Ink (text) ──────────────────────────────────────────────── */
    ink:          "#50503f",   /* default: #161616  — primary text        */
    inkSoft:      "#50503f",   /* default: #3c3a36  — secondary text      */
    inkMuted:     "#50503f",   /* default: #6b635a  — muted text          */

    /* ── Court scene ─────────────────────────────────────────────── */
    courtBg:      "#173a20",   /* default: #173a20  — tennis court bg     */

    /* ── Gradients (full CSS gradient strings) ───────────────────── */
    /* Uncomment and edit to override the foil / decorative gradients */
    goldGradient: "linear-gradient(135deg, #141414 0%, #2c2c2c 32%, #0f0f0f 54%, #2c2c2c 74%, #141414 100%)",
    clayGradient: "linear-gradient(135deg, #50503f 0%, #b7b7a4 32%, #50503f 54%, #b7b7a4 74%, #50503f 100%)"
  }

};
