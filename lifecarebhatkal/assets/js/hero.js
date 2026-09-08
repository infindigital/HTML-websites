/* ============================================================
   Life Care — Homepage Hero controller (<HomeHero />)
   Loaded only on the homepage. Cross-transitions the brand banners
   (doctor <-> nurses), drives the light sweep + indicators, adds a
   very subtle pointer parallax on the drifting objects, and fades the
   thin top-bar on scroll. Honours prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';
  var hero = document.querySelector('.home-hero');
  if (!hero) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || /[?&]motion=off/.test(location.search);

  /* ---- banner cross-transition ---- */
  (function slideshow() {
    var box = hero.querySelector('[data-hero-slides]');
    if (!box) return;
    var slides = box.querySelectorAll('.hh-slide');
    var dots = hero.querySelectorAll('[data-hero-nav] button');
    if (slides.length < 2) return;

    var idx = 0, timer = null, HOLD = 5500, SWEEP = 1350, busy = false;

    function show(next) {
      if (next === idx || busy) return;
      busy = true;
      box.classList.add('is-switching');
      slides[idx].classList.remove('is-show');
      slides[idx].setAttribute('aria-hidden', 'true');
      idx = next;
      slides[idx].classList.add('is-show');
      slides[idx].setAttribute('aria-hidden', 'false');
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      setTimeout(function () { box.classList.remove('is-switching'); busy = false; }, SWEEP);
    }
    function next() { show((idx + 1) % slides.length); }
    function start() { if (!timer && !reduce) timer = setInterval(next, HOLD); }
    function stop() { clearInterval(timer); timer = null; }

    // manual controls
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        stop(); show(parseInt(d.getAttribute('data-go'), 10) || 0); start();
      });
    });

    start();
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
  })();

  /* ---- subtle pointer parallax on the drifting objects ---- */
  (function parallax() {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function onMove(e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function apply() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
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
