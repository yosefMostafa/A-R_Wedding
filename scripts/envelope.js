/**
 * envelope.js — open sequence:
 *  1. User clicks/taps the envelope
 *  2. Flap folds back, letter rises, seal shrinks
 *  3. Scene fades out, invitation fades in
 *  4. Music starts (if configured)
 */

function initEnvelope() {
  var scene  = document.getElementById('scene');
  var env    = document.getElementById('envelope');
  var inv    = document.getElementById('invitation');
  var mbtn   = document.getElementById('music-btn');
  if (!scene || !env || !inv) return;

  var opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    scene.classList.add('opening');

    /* Show music button + attempt autoplay after flap begins moving */
    setTimeout(function () {
      if (mbtn) mbtn.classList.add('ready');
      if (window._playWeddingMusic) window._playWeddingMusic();
    }, 700);

    /* Scene hidden after envelope sinks away */
    setTimeout(function () {
      scene.classList.add('opened');
    }, 900);

    /* Invitation fades in */
    setTimeout(function () {
      inv.classList.add('show');
    }, 1100);
  }

  env.addEventListener('click', openEnvelope);
  env.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });
}
