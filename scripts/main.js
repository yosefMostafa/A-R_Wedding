/**
 * main.js — boots the invitation from window.WEDDING_CONFIG.
 * Reads config.js, hydrates the DOM, wires court scene + music + countdown + petals.
 */

(function () {
  var C = window.WEDDING_CONFIG || {};

  /* ── Apply theme overrides from config ───────────────────────── */
  if (C.theme) {
    var r = document.documentElement.style;
    var map = {
      cream:        '--cream',
      creamDeep:    '--cream-deep',
      creamLight:   '--cream-light',
      creamCard:    '--cream-card',
      gold:         '--gold',
      goldLight:    '--gold-light',
      goldBright:   '--gold-bright',
      clay:         '--clay',
      ink:          '--ink',
      inkSoft:      '--ink-soft',
      inkMuted:     '--ink-muted',
      courtBg:      '--court-bg',
      goldGradient: '--gold-gradient',
      clayGradient: '--clay-gradient'
    };
    Object.keys(C.theme).forEach(function (k) {
      if (map[k]) r.setProperty(map[k], C.theme[k]);
    });
  }

  /* ── Helpers ─────────────────────────────────────────────────── */
  var $ = function (id) { return document.getElementById(id); };
  var set = function (id, v) { var el = $(id); if (el && v != null) el.textContent = v; };

  /* ── Couple names ────────────────────────────────────────────── */
  set('groom-ar', C.groom && C.groom.ar);
  set('groom-en', C.groom && C.groom.en);
  set('bride-ar', C.bride && C.bride.ar);
  set('bride-en', C.bride && C.bride.en);

  /* ── Envelope scene — monogram + couple names + date ─────────── */
  var groomEn = (C.groom && C.groom.en) || '';
  var brideEn = (C.bride && C.bride.en) || '';
  var initials = (groomEn.trim().charAt(0) || 'Y').toUpperCase() + '&' + (brideEn.trim().charAt(0) || 'H').toUpperCase();
  set('env-monogram', C.monogram || initials);
  set('env-names', groomEn + ' & ' + brideEn);
  if (C.date && C.date.en) set('env-date', C.date.en.toUpperCase());

  /* ── Document title ──────────────────────────────────────────── */
  document.title = groomEn + ' & ' + brideEn + ' — Wedding Invitation';

  /* ── Invitation line ─────────────────────────────────────────── */
  if (C.invite) {
    var il = $('invite-line');
    if (il) {
      var arHtml = C.invite.ar.replace(/\n/g, '<br>');
      var enHtml = C.invite.en.replace(/\n/g, '<br>');
      il.innerHTML = '<span class="ar">' + arHtml + '</span>' + enHtml;
    }
  }

  /* ── Date & time ─────────────────────────────────────────────── */
  set('date-ar', C.date && C.date.ar);
  set('date-en', C.date && C.date.en);
  set('time-ar', C.time && C.time.ar);
  set('time-en', C.time && C.time.en);

  /* ── Verse ───────────────────────────────────────────────────── */
  if (C.verse) {
    set('verse-ar', C.verse.ar);
    set('verse-en', '"' + C.verse.en + '"');
    if (C.verse.ref) {
      var vr = $('verse-ref');
      if (vr) vr.innerHTML = C.verse.ref.ar + ' &nbsp;&bull;&nbsp; ' + C.verse.ref.en;
    }
  }

  /* ── Venue ───────────────────────────────────────────────────── */
  if (C.venue) {
    set('venue-name-ar',  C.venue.name    && C.venue.name.ar);
    set('venue-name-en',  C.venue.name    && C.venue.name.en);
    set('venue-addr-ar',  C.venue.address && C.venue.address.ar);
    set('venue-addr-en',  C.venue.address && C.venue.address.en);
    var mb = $('maps-btn');
    if (mb) {
      if (C.venue.mapsUrl) {
        mb.href = C.venue.mapsUrl;
      } else {
        mb.setAttribute('aria-disabled', 'true');
        mb.removeAttribute('href');
        mb.addEventListener('click', function (e) { e.preventDefault(); });
      }
    }
  }

  /* ── Hashtag ─────────────────────────────────────────────────── */
  set('hashtag', C.hashtag || '');

  /* ── Social preview meta tags ───────────────────────────────── */
  (function () {
    var base = (C.siteUrl || '').replace(/\/$/, '');
    var imgPath = base + '/assets/og-image.png';
    var urlPath = base + '/';

    function setMeta(id, val) {
      var el = document.getElementById(id);
      if (el) el.setAttribute('content', val);
    }

    /* Bilingual title: Arabic | English */
    var groomAr  = (C.groom && C.groom.ar) || '';
    var brideAr  = (C.bride && C.bride.ar) || '';
    var titleAr  = groomAr + ' و' + brideAr + ' — دعوة زفاف';
    var titleEn  = groomEn + ' & ' + brideEn + ' — Wedding Invitation';
    var title    = titleAr + ' | ' + titleEn;

    /* Bilingual description: Arabic line then English line */
    var dateAr = (C.date && C.date.ar) || '';
    var timeAr = (C.time && C.time.ar) || '';
    var dateEn = (C.date && C.date.en) || '';
    var timeEn = (C.time && C.time.en) || '';
    var inviteAr = ((C.invite && C.invite.ar) || '').replace(/\n/g, ' ');
    var inviteEn = ((C.invite && C.invite.en) || '').replace(/\n/g, ' ');

    var descAr = inviteAr
      + (dateAr ? ' — ' + dateAr : '')
      + (timeAr ? ' · ' + timeAr : '');
    var descEn = inviteEn
      + (dateEn ? ' — ' + dateEn : '')
      + (timeEn ? ' · ' + timeEn : '');
    var desc = descAr + '\n' + descEn;

    /* Update all title/description meta tags and the page title */
    document.title = title;
    setMeta('og-title', title);
    setMeta('og-desc',  desc);
    setMeta('tw-title', title);
    setMeta('tw-desc',  desc);

    /* Also sync the plain <meta name="description"> */
    var plainDesc = document.querySelector('meta[name="description"]');
    if (plainDesc) plainDesc.setAttribute('content', desc);

    /* Inject absolute URL only when siteUrl is configured */
    if (base) {
      setMeta('og-image',  imgPath);
      setMeta('tw-image',  imgPath);
      setMeta('og-url',    urlPath);
      var canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = urlPath;
    }
  })();

  /* ── Toast ───────────────────────────────────────────────────── */
  var toastTimer = null;
  window._toast = function (msg) {
    var t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  };

  /* ── Share ───────────────────────────────────────────────────── */
  (function () {
    var btn = $('share-btn');
    if (!btn) return;

    var shareTitle = groomEn + ' & ' + brideEn + ' — Wedding Invitation';
    var shareText  = shareTitle
      + ((C.date && C.date.en) ? ' · ' + C.date.en : '');

    btn.addEventListener('click', function () {
      var url = C.siteUrl || window.location.href;

      if (navigator.share) {
        navigator.share({ title: shareTitle, text: shareText, url: url })
          .catch(function () { /* user dismissed the share sheet */ });
        return;
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
          .then(function () { window._toast('Invitation link copied'); })
          .catch(function () { window._toast(url); });
        return;
      }
      window._toast(url);
    });
  })();

  /* ── Init modules ────────────────────────────────────────────── */
  initCountdown(C);
  initPetals(C);
  initMusic(C);
  initCalendar(C);
  initScroll();
  initEnvelope();
}());
