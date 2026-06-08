/**
 * envelope.js — tennis serve-to-open sequence:
 *  1. User drags the tennis ball upward (or taps Enter/Space)
 *  2. When dragged past 50% of threshold, ball "serves" off screen
 *  3. Court scene transitions out, invitation fades in
 *  4. Music starts (if configured)
 */

function initEnvelope() {
  var scene    = document.getElementById('scene');
  var inv      = document.getElementById('invitation');
  var card     = document.getElementById('tcard');
  var ballWrap = document.getElementById('ballwrap');
  var mbtn     = document.getElementById('music-btn');
  if (!scene || !inv || !ballWrap) return;

  var opened = false;

  function maxUp() {
    return Math.min((window.innerHeight || 600) * 0.4, 320);
  }

  var dragging = false, sx = 0, sy = 0, dx = 0, dy = 0, moved = 0;

  function applyBall() {
    ballWrap.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
  }

  function progress() {
    return Math.min(1, Math.max(0, -dy / maxUp()));
  }

  function onDown(e) {
    if (opened) return;
    dragging = true;
    moved = 0;
    var pt = e.touches ? e.touches[0] : e;
    sx = pt.clientX; sy = pt.clientY;
    ballWrap.classList.remove('hop');
    ballWrap.classList.add('grab');
    if (ballWrap.setPointerCapture && e.pointerId != null) {
      try { ballWrap.setPointerCapture(e.pointerId); } catch (_) {}
    }
    e.preventDefault();
  }

  function onMove(e) {
    if (!dragging) return;
    var pt = e.touches ? e.touches[0] : e;
    dx = pt.clientX - sx;
    dy = pt.clientY - sy;
    var mUp   = maxUp() + 34;
    var mSide = Math.min((window.innerWidth || 400) * 0.3, 150);
    if (dy < -mUp)   dy = -mUp;
    if (dy > 44)     dy = 44;
    if (dx < -mSide) dx = -mSide;
    if (dx > mSide)  dx = mSide;
    moved = Math.sqrt(dx * dx + dy * dy);
    applyBall();
    e.preventDefault();
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    ballWrap.classList.remove('grab');
    if (opened) return;

    if (progress() > 0.5 || moved < 9) {
      serveAndOpen();
    } else {
      /* Spring back with a bounce */
      dx = 0; dy = 0;
      ballWrap.style.transition = 'transform .55s cubic-bezier(.34,1.56,.64,1)';
      applyBall();
      setTimeout(function () {
        ballWrap.style.transition = '';
        ballWrap.style.transform  = '';
        ballWrap.classList.add('hop');
      }, 560);
    }
  }

  function serveAndOpen() {
    if (opened) return;
    opened = true;
    ballWrap.classList.remove('hop');
    ballWrap.style.transition = 'transform .6s cubic-bezier(.4,0,.5,1), opacity .5s ease .22s';
    ballWrap.style.transform  = 'translate(' + (dx * 1.25) + 'px,' + (-maxUp() * 1.9) + 'px) scale(.68) rotate(240deg)';
    ballWrap.style.opacity    = '0';
    setTimeout(openInvitation, 380);
  }

  function openInvitation() {
    scene.classList.add('opening');
    setTimeout(function () {
      if (mbtn) mbtn.classList.add('ready');
      if (window._playWeddingMusic) window._playWeddingMusic();
    }, 720);
    setTimeout(function () { scene.classList.add('opened'); }, 980);
    setTimeout(function () {
      window.scrollTo(0, 0);
      inv.classList.add('show');
      if (window.initScrollReveal) window.initScrollReveal();
    }, 1180);
  }

  /* Pointer events (covers mouse + touch + pen) */
  if (window.PointerEvent) {
    ballWrap.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove',  onMove,  { passive: false });
    window.addEventListener('pointerup',    onUp);
    window.addEventListener('pointercancel', onUp);
  } else {
    ballWrap.addEventListener('mousedown',  onDown);
    window.addEventListener('mousemove',   onMove);
    window.addEventListener('mouseup',     onUp);
    ballWrap.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove',   onMove,  { passive: false });
    window.addEventListener('touchend',    onUp);
  }

  /* Keyboard fallback: Enter or Space serves */
  if (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        serveAndOpen();
      }
    });
  }
}
