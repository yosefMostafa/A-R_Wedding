/**
 * envelope.js — envelope tap-to-open sequence:
 *  1. User taps the envelope (or presses Enter/Space)
 *  2. Flap rotates open, seal fades, letter slides up
 *  3. Scene transitions out, invitation fades in
 *  4. The letter card unfolds open (3D paper-unfold)
 *  5. Music starts (if configured)
 */

function initEnvelope() {
  var scene = document.getElementById('scene');
  var inv   = document.getElementById('invitation');
  var env   = document.getElementById('envelope');
  var card  = document.getElementById('invitation-card');
  var mbtn  = document.getElementById('music-btn');
  if (!scene || !inv || !env) return;

  /* Stagger index for the card's ink-in animation (see layout.css) */
  if (card) {
    Array.prototype.forEach.call(card.querySelectorAll('.inner > *'), function (el, i) {
      el.style.setProperty('--i', i);
    });
  }

  var opened = false;

  /* Timeline (ms), matched to the CSS transitions:
     0    flap starts opening (850ms), seal cracks, letter lifts
     900  envelope itself begins drifting away
     1000 music fades in
     1500 scene starts fading out
     1750 invitation revealed, letter card starts unfolding */
  function openInvitation() {
    scene.classList.add('opening');
    setTimeout(function () {
      if (mbtn) mbtn.classList.add('ready');
      if (window._playWeddingMusic) window._playWeddingMusic();
    }, 1000);
    setTimeout(function () { scene.classList.add('opened'); }, 1500);
    setTimeout(function () {
      window.scrollTo(0, 0);
      inv.classList.add('show');
      if (card) card.classList.add('unfolded');
    }, 1750);
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
