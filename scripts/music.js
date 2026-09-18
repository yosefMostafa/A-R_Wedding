/**
 * music.js — background music toggle button.
 * musicUrl is set in config.js. Button pulses to indicate no music
 * when the URL is empty.
 */

function initMusic(config) {
  var audio = document.getElementById('audio');
  var mbtn  = document.getElementById('music-btn');
  if (!audio || !mbtn) return;

  if (config.musicUrl) {
    audio.src = config.musicUrl;
  }

  function playMusic() {
    if (!config.musicUrl) return;
    audio.play()
      .then(function () { mbtn.classList.add('playing'); })
      .catch(function () { /* autoplay blocked — user must click */ });
  }

  mbtn.addEventListener('click', function () {
    if (!config.musicUrl) {
      /* Wiggle to signal "no music configured" */
      mbtn.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }],
        { duration: 300 }
      );
      return;
    }
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      mbtn.classList.remove('playing');
    }
  });

  /* Expose playMusic so the envelope can trigger it after opening */
  window._playWeddingMusic = playMusic;
}
