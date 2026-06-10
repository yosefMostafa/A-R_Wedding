/**
 * petals.js — injects CSS-animated gold petal spans into #petals.
 * CSS @keyframes petal-fall handles the actual animation.
 * Colors come from tokens.css via the gold-gradient CSS var (no hex here).
 */

function initPetals(config) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var container = document.getElementById('petals');
  if (!container) return;

  var N = (config.ui && config.ui.petalCount) || 18;

  for (var i = 0; i < N; i++) {
    var p = document.createElement('span');
    p.className = 'petal';

    p.style.left   = (Math.random() * 100) + '%';
    p.style.width  = '14px';
    p.style.height = '14px';
    p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    p.style.animationDuration = (8 + Math.random() * 9) + 's';
    p.style.animationDelay    = (-Math.random() * 12) + 's';
    p.style.opacity           = (0.55 + Math.random() * 0.35);

    container.appendChild(p);
  }
}
