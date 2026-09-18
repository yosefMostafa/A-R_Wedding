/**
 * scroll.js — scroll-to-top button only.
 * Reveal animations are handled by .invitation.show + CSS transitions.
 * Parallax removed (envelope design doesn't scroll parallax).
 */

function initScroll() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}
