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

    var size = 6 + Math.random() * 12;
    p.style.left             = (Math.random() * 100) + '%';
    p.style.width            = size + 'px';
    p.style.height           = size + 'px';
    p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    p.style.animationDuration = (8 + Math.random() * 9) + 's';
    p.style.animationDelay    = (-Math.random() * 12) + 's';
    p.style.opacity           = (0.45 + Math.random() * 0.4);

    if (Math.random() > 0.5) {
      p.style.borderRadius = '100% 0 100% 0';
    }

    container.appendChild(p);
  }
}
