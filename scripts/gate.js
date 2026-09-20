/**
 * gate.js — ornamental gate doors that swing open to reveal the invitation.
 * Tap/click/Enter → light burst → doors swing outward → sparkles →
 * invitation fades in → auto-scroll.
 */

function initGate() {
  var scene = document.getElementById('gate-scene');
  var frame = document.getElementById('gate-frame');
  var inv   = document.getElementById('invitation');
  var card  = document.getElementById('invitation-card');
  var mbtn  = document.getElementById('music-btn');
  if (!scene || !frame || !inv || !card) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var opened = false;

  document.body.classList.add('gate-locked');

  Array.prototype.forEach.call(card.querySelectorAll('.inner > *'), function (el, i) {
    el.style.setProperty('--i', i);
  });

  var T = reduced
    ? { swing: 0, music: 0 }
    : { swing: 500, music: 400 };

  function startMusic() {
    if (mbtn) mbtn.classList.add('ready');
    if (window._playWeddingMusic) window._playWeddingMusic();
  }

  function createSparkles() {
    var container = document.getElementById('gate-sparkles');
    if (!container) return;
    for (var i = 0; i < 28; i++) {
      var s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = (35 + Math.random() * 30) + '%';
      s.style.top = (15 + Math.random() * 70) + '%';
      var dx = (Math.random() - 0.5) * 80;
      var dy = (Math.random() - 0.5) * 60;
      s.style.setProperty('--dx', dx + 'px');
      s.style.setProperty('--dy', dy + 'px');
      s.style.setProperty('--dur', (0.8 + Math.random() * 0.8) + 's');
      s.style.animationDelay = (Math.random() * 0.6) + 's';
      container.appendChild(s);
    }
  }

  /* Slow guided scroll so guests see every section without touching the page.
     Glides via composited translateY (sub-pixel smooth), then hands the
     offset back to real scroll. Any user input cancels it. */
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
      var eased = p * p * (3 - 2 * p);
      y = dist * eased;
      inv.style.transform = 'translate3d(0,' + (-y) + 'px,0)';
      if (p < 1) raf = requestAnimationFrame(step);
      else settle();
    };
    raf = requestAnimationFrame(step);
  }

  function openGate() {
    scene.classList.add('opening');

    setTimeout(startMusic, T.music);

    setTimeout(function () {
      window.scrollTo(0, 0);
      document.body.classList.remove('gate-locked');
      inv.classList.add('show');
      card.classList.add('unfolded');
      scene.classList.add('opened');

      if (!reduced) setTimeout(autoScrollToEnd, 2000);
    }, T.swing);
  }

  function handleOpen() {
    if (opened) return;
    opened = true;
    openGate();
  }

  frame.addEventListener('click', handleOpen);
  frame.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });
}
