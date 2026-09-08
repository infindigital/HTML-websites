/* ============================================================
   Life Care — Homepage Hero controller (<HomeHero />)
   Loaded only on the homepage. Vanilla JS, no dependencies.
   Handles: load-in stagger, doctor<->nurses cinematic swap,
   pointer parallax, scrolled top-bar state. Honours reduced-motion.
   ============================================================ */
(function () {
  'use strict';
  var hero = document.querySelector('.home-hero');
  if (!hero) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || /[?&]motion=off/.test(location.search);

  /* ---- load-in stagger ---- */
  requestAnimationFrame(function () {
    setTimeout(function () { hero.classList.add('hh-in'); }, 80);
  });

  /* ---- doctor <-> nurses cinematic swap ---- */
  (function figureSwap() {
    var figure = hero.querySelector('[data-hero-figure]');
    if (!figure) return;
    var persons = figure.querySelectorAll('.hh-person');
    if (persons.length < 2 || reduce) return;   // reduced motion: keep doctor static

    var idx = 0, timer = null;
    var HOLD = 6200, LEAD = 240, SWEEP = 1350;

    function swap() {
      figure.classList.add('is-switching');
      setTimeout(function () {
        persons[idx].classList.remove('is-show');
        persons[idx].setAttribute('aria-hidden', 'true');
        idx = (idx + 1) % persons.length;
        persons[idx].classList.add('is-show');
        persons[idx].setAttribute('aria-hidden', 'false');
      }, LEAD);
      setTimeout(function () { figure.classList.remove('is-switching'); }, SWEEP);
    }
    function start() { if (!timer) timer = setInterval(swap, HOLD); }
    function stop() { clearInterval(timer); timer = null; }

    start();
    // pause the loop while the tab is hidden (saves battery / cycles)
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
  })();

  /* ---- pointer parallax (fine pointers only, very subtle) ---- */
  (function parallax() {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function onMove(e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1..1
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function apply() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      hero.style.setProperty('--mx', cx.toFixed(3));
      hero.style.setProperty('--my', cy.toFixed(3));
      raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002)
        ? requestAnimationFrame(apply) : null;
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', function () {
      tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply);
    });
  })();

  /* ---- scrolled state: fade the thin top-bar, glass the nav ---- */
  (function scrolled() {
    function onScroll() {
      document.body.classList.toggle('hh-scrolled', (window.scrollY || 0) > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
})();
