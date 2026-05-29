/**
 * countdown.js — live countdown to dateISO from config.
 * Updates every second. Replaces with Congratulations when past.
 */

function initCountdown(config) {
  var target = config.dateISO ? new Date(config.dateISO).getTime() : 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function tick() {
    if (!target) return;
    var diff = target - Date.now();

    if (diff <= 0) {
      ['cd-d','cd-h','cd-m','cd-s'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      var cd = document.getElementById('countdown');
      if (cd && !cd.dataset.done) {
        cd.dataset.done = '1';
        cd.innerHTML = '<div style="font-family:var(--ar-display);font-size:clamp(22px,6vw,34px)" class="gold-foil">مبارك &middot; Congratulations</div>';
      }
      return;
    }

    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff % 86400000 / 3600000);
    var m = Math.floor(diff % 3600000  / 60000);
    var s = Math.floor(diff % 60000    / 1000);

    var el;
    el = document.getElementById('cd-d'); if (el) el.textContent = pad(d);
    el = document.getElementById('cd-h'); if (el) el.textContent = pad(h);
    el = document.getElementById('cd-m'); if (el) el.textContent = pad(m);
    el = document.getElementById('cd-s'); if (el) el.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
}
