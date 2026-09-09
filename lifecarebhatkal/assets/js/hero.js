/* ============================================================
   Life Care — Homepage Hero controller (<HomeHero />)
   Intro choreography: doctor fades in -> headline animates in ->
   person cross-dissolves (doctor <-> nurses) on a loop. Cursor tilts
   the 3D scene and parallaxes the layers. Honours reduced-motion.
   ============================================================ */
(function () {
  'use strict';
  var hero = document.querySelector('.home-hero');
  if (!hero) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || /[?&]motion=off/.test(location.search);

  var stage = hero.querySelector('[data-hero-stage]');

  /* ---- intro: doctor first, then the headline loads ---- */
  requestAnimationFrame(function () {
    setTimeout(function () { hero.classList.add('hh-in'); }, reduce ? 0 : 90);      // doctor fades in
    setTimeout(function () { hero.classList.add('hh-loaded'); }, reduce ? 0 : 950); // headline reveals
  });

  /* ---- person cross-dissolve (starts after the headline is in) ---- */
  (function personSwap() {
    if (!stage) return;
    var persons = stage.querySelectorAll('.hh-cut');
    if (persons.length < 2 || reduce) return;

    var idx = 0, timer = null, HOLD = 5600, SWEEP = 1350, INTRO = 4200;
    function swap() {
      stage.classList.add('is-switching');
      persons[idx].classList.remove('is-show');
      persons[idx].setAttribute('aria-hidden', 'true');
      idx = (idx + 1) % persons.length;
      persons[idx].classList.add('is-show');
      persons[idx].setAttribute('aria-hidden', 'false');
      setTimeout(function () { stage.classList.remove('is-switching'); }, SWEEP);
    }
    function start() { if (!timer) timer = setInterval(swap, HOLD); }
    function stop() { clearInterval(timer); timer = null; }

    // hold on the doctor through the headline intro, then swap and loop
    setTimeout(function () { swap(); start(); }, INTRO);
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
  })();

  /* The hero frame stays fixed — no scene tilt or left/right parallax
     (neither cursor-driven nor automatic). The doctor<->nurses swap,
     the headline intro, orbit rings and floating dots provide the life. */

  /* ---- scrolled state: fade the thin top-bar, glass the nav ---- */
  (function scrolled() {
    function onScroll() {
      document.body.classList.toggle('hh-scrolled', (window.scrollY || 0) > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
})();
