/* ============================================================
   Life Care — Homepage Hero controller (<HomeHero />)
   Loaded only on the homepage. Cross-dissolves the person cutout
   (doctor <-> nurses) over the static plate, drives the light sweep,
   and tilts the 3D scene with the pointer. Honours reduced-motion.
   ============================================================ */
(function () {
  'use strict';
  var hero = document.querySelector('.home-hero');
  if (!hero) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || /[?&]motion=off/.test(location.search);

  var stage = hero.querySelector('[data-hero-stage]');

  /* ---- person cross-dissolve (doctor <-> nurses) ---- */
  (function personSwap() {
    if (!stage) return;
    var persons = stage.querySelectorAll('.hh-cut');
    if (persons.length < 2 || reduce) return;   // reduced motion: keep doctor static

    var idx = 0, timer = null, HOLD = 5600, SWEEP = 1350;
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
    start();
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
  })();

  /* ---- 3D perspective tilt + parallax on pointer move ---- */
  (function tilt3d() {
    if (reduce || !stage || !window.matchMedia('(pointer:fine)').matches) return;
    var MAX = 3.4;                       // degrees — kept subtle
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function onMove(e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1..1
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function apply() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      stage.style.setProperty('--rx', (cx * MAX).toFixed(2) + 'deg');   // rotateY
      stage.style.setProperty('--ry', (-cy * MAX).toFixed(2) + 'deg');  // rotateX
      hero.style.setProperty('--mx', cx.toFixed(3));
      hero.style.setProperty('--my', cy.toFixed(3));
      raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002)
        ? requestAnimationFrame(apply) : null;
    }
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', function () {
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
