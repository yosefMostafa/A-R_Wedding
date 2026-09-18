/**
 * envelope.js — 3D envelope open sequence:
 *  tap → envelope flips to its back → wax seal cracks in two → flap opens
 *  → letter rises out of the pocket → letter flies to the card's spot
 *  (FLIP: measured at runtime) while the envelope sinks away → card inks in.
 * Each step is a class; durations mirror the CSS transitions in components.css.
 */

function initEnvelope() {
  var scene = document.getElementById('scene');
  var stage = document.getElementById('envelope-stage');
  var inv   = document.getElementById('invitation');
  var env   = document.getElementById('envelope');
  var card  = document.getElementById('invitation-card');
  var letter = document.getElementById('env-letter');
  var proxy  = document.getElementById('letter-proxy');
  var mbtn   = document.getElementById('music-btn');
  if (!scene || !inv || !env || !card) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Stagger index for the card's ink-in animation (see layout.css) */
  Array.prototype.forEach.call(card.querySelectorAll('.inner > *'), function (el, i) {
    el.style.setProperty('--i', i);
  });

  /* ── Pointer tilt while idle (desktop) ──────────────────────── */
  var opened = false;
  if (stage && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    scene.addEventListener('pointermove', function (e) {
      if (opened) return;
      var nx = e.clientX / window.innerWidth - 0.5;
      var ny = e.clientY / window.innerHeight - 0.5;
      stage.style.setProperty('--ty', (nx * 16) + 'deg');
      stage.style.setProperty('--tx', (-ny * 12) + 'deg');
    });
    scene.addEventListener('pointerleave', function () {
      stage.style.setProperty('--tx', '0deg');
      stage.style.setProperty('--ty', '0deg');
    });
  }

  /* ── Timeline (ms) ──────────────────────────────────────────── */
  var T = reduced
    ? { flip: 0, crack: 0, flap: 0, letter: 0, morph: 0, fly: 0 }
    : { flip: 900, crack: 400, flap: 700, letter: 700, morph: 0, fly: 800 };

  function startMusic() {
    if (mbtn) mbtn.classList.add('ready');
    if (window._playWeddingMusic) window._playWeddingMusic();
  }

  /* Move the proxy sheet from where the letter is on screen to where the card is */
  function morphLetterToCard(done) {
    window.scrollTo(0, 0);
    inv.classList.add('show');

    if (!proxy || !letter || reduced) {
      done();
      return;
    }

    var from = letter.getBoundingClientRect();
    var to   = card.getBoundingClientRect();

    proxy.style.transition = 'none';
    proxy.style.width  = from.width + 'px';
    proxy.style.height = from.height + 'px';
    proxy.style.transform = 'translate(' + from.left + 'px,' + from.top + 'px)';
    proxy.classList.add('on');
    letter.classList.add('hidden');

    /* next frame: let the transition run to the card's rect */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        proxy.style.transition = '';
        proxy.style.width  = to.width + 'px';
        proxy.style.height = to.height + 'px';
        proxy.style.transform = 'translate(' + to.left + 'px,' + to.top + 'px)';
        env.classList.add('away');
        setTimeout(done, T.fly);
      });
    });
  }

  /* Slow guided scroll to the bottom so guests see every section without
     touching the page. Glides via a composited translateY (sub-pixel smooth —
     scrollTo can only move whole pixels, which stutters at slow speeds), then
     hands the offset back to real scroll. Any user input cancels it. */
  var SCROLL_PX_PER_SEC = 55;
  var CANCEL_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  function autoScrollToEnd() {
    var start = window.scrollY;
    var dist = document.documentElement.scrollHeight - window.innerHeight - start;
    if (dist < 40) return;

    var duration = Math.min(30000, (dist / SCROLL_PX_PER_SEC) * 1000);
    var t0 = performance.now();
    var raf = 0;
    var y = 0;

    var settle = function () {
      cancelAnimationFrame(raf);
      CANCEL_EVENTS.forEach(function (ev) { window.removeEventListener(ev, settle); });
      inv.style.transform = '';
      inv.style.willChange = '';
      window.scrollTo(0, start + y);
    };
    CANCEL_EVENTS.forEach(function (ev) { window.addEventListener(ev, settle, { passive: true }); });

    inv.style.willChange = 'transform';
    var step = function (now) {
      var p = Math.min(1, (now - t0) / duration);
      var eased = p * p * (3 - 2 * p); /* smoothstep */
      y = dist * eased;
      inv.style.transform = 'translate3d(0,' + (-y) + 'px,0)';
      if (p < 1) raf = requestAnimationFrame(step);
      else settle();
    };
    raf = requestAnimationFrame(step);
  }

  function openInvitation() {
    scene.classList.add('opening');
    env.classList.add('flipped');

    var t = T.flip;
    setTimeout(function () { scene.classList.add('cracked'); }, t);
    t += T.crack;
    setTimeout(function () {
      scene.classList.add('flap-open');
      startMusic();
    }, t);
    t += T.flap;
    setTimeout(function () { scene.classList.add('letter-out'); }, t);
    t += T.letter;
    setTimeout(function () {
      morphLetterToCard(function () {
        card.classList.add('unfolded');
        scene.classList.add('opened');
        if (proxy) setTimeout(function () { proxy.classList.remove('on'); }, 500);
        /* start once the card's ink-in stagger (250ms + n×130ms + 700ms) has settled */
        if (!reduced) setTimeout(autoScrollToEnd, 2400);
      });
    }, t);
  }

  function handleOpen() {
    if (opened) return;
    opened = true;
    openInvitation();
  }

  env.addEventListener('click', handleOpen);
  env.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });
}
