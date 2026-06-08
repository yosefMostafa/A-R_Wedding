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
      cream:      '--cream',
      creamDeep:  '--cream-deep',
      gold:       '--gold',
      goldLight:  '--gold-light',
      goldBright: '--gold-bright',
      ink:        '--ink'
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

  /* ── Court scene — initials + date chip ──────────────────────── */
  var groomEn = (C.groom && C.groom.en) || '';
  var brideEn = (C.bride && C.bride.en) || '';
  set('court-groom-i', groomEn.trim().charAt(0).toUpperCase() || 'A');
  set('court-bride-i', brideEn.trim().charAt(0).toUpperCase() || 'R');
  if (C.date && C.date.en) set('court-date', C.date.en.toUpperCase());

  /* ── Document title ──────────────────────────────────────────── */
  document.title = groomEn + ' & ' + brideEn + ' — Wedding Invitation';

  /* ── Invitation line ─────────────────────────────────────────── */
  if (C.invite) {
    var il = $('invite-line');
    if (il) il.innerHTML = '<span class="ar">' + C.invite.ar + '</span>' + C.invite.en;
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

    /* Rewrite title and description with live config values */
    var title = groomEn + ' & ' + brideEn + ' — Wedding Invitation';
    var dateStr = (C.date && C.date.en) || '';
    var timeStr = (C.time && C.time.en) || '';
    var desc = (C.invite && C.invite.en)
      ? C.invite.en + (dateStr ? ' — ' + dateStr : '') + (timeStr ? ' · ' + timeStr : '')
      : (dateStr ? dateStr : '');

    var allMeta = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
    for (var i = 0; i < allMeta.length; i++) {
      var m = allMeta[i];
      var key = m.getAttribute('property') || m.getAttribute('name');
      if (key === 'og:title' || key === 'twitter:title') m.setAttribute('content', title);
      if (key === 'og:description' || key === 'twitter:description') m.setAttribute('content', desc);
    }

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

  /* ── Init modules ────────────────────────────────────────────── */
  initCountdown(C);
  initPetals(C);
  initMusic(C);
  initEnvelope();
}());
