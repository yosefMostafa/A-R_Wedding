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
    var inviteAr = (C.invite && C.invite.ar) || '';
    var inviteEn = (C.invite && C.invite.en) || '';

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

  /* ── Scroll-reveal + auto-scroll ────────────────────────────── */
  window.initScrollReveal = function () {
    /* IntersectionObserver: animate each section as it enters view */
    var io = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.transitionDelay = (batch * 0.45) + 's';
          el.classList.add('in-view');
          io.unobserve(el);
          batch++;
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -16px 0px' });

    document.querySelectorAll('#invitation .reveal').forEach(function (el) {
      io.observe(el);
    });

    /* Auto-scroll: slow cinematic drift down; stops on any interaction */
    var rafId = null;
    var stopped = false;

    function stop() {
      if (stopped) return;
      stopped = true;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      window.removeEventListener('wheel',       stop);
      window.removeEventListener('touchstart',  stop);
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown',     stop);
    }

    var startTs = null;
    var startY  = 0;
    var SPEED   = 30; /* px/sec — tune here */
    function tick(ts) {
      if (stopped) return;
      if (startTs === null) { startTs = ts; startY = window.pageYOffset; }
      var targetY = startY + SPEED * (ts - startTs) / 1000;
      var maxY    = document.documentElement.scrollHeight - window.innerHeight;
      if (targetY >= maxY) { window.scrollTo(0, maxY); stop(); return; }
      window.scrollTo(0, targetY);   /* float position — no accumulator, no stutter */
      rafId = requestAnimationFrame(tick);
    }

    /* Give the first section time to fully animate in before drifting */
    var startTimer = setTimeout(function () {
      if (stopped) return;
      window.addEventListener('wheel',       stop, { passive: true });
      window.addEventListener('touchstart',  stop, { passive: true });
      window.addEventListener('pointerdown', stop, { passive: true });
      window.addEventListener('keydown',     stop);
      rafId = requestAnimationFrame(tick);
    }, 1800);

    /* If user touches before the timer fires, cancel it too */
    function earlyStop() {
      clearTimeout(startTimer);
      stop();
      window.removeEventListener('wheel',       earlyStop);
      window.removeEventListener('touchstart',  earlyStop);
      window.removeEventListener('pointerdown', earlyStop);
      window.removeEventListener('keydown',     earlyStop);
    }
    window.addEventListener('wheel',       earlyStop, { passive: true });
    window.addEventListener('touchstart',  earlyStop, { passive: true });
    window.addEventListener('pointerdown', earlyStop, { passive: true });
    window.addEventListener('keydown',     earlyStop);
  };

  /* ── Init modules ────────────────────────────────────────────── */
  initCountdown(C);
  initPetals(C);
  initMusic(C);
  initEnvelope();
}());
