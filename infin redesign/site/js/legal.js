/* =====================================================================
   INFIN DIGITAL — Legal pages (Privacy / Terms)
   Minimal, dependency-free script: just the header scroll state and the
   mobile menu. No GSAP / Lenis / Three.js — these pages stay lightweight.
   ===================================================================== */
(function () {
  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var open = false;
  function set(state) {
    open = state;
    if (menu) {
      menu.classList.toggle('open', state);
      menu.setAttribute('aria-hidden', state ? 'false' : 'true');
    }
    if (toggle) {
      toggle.classList.toggle('open', state);
      toggle.setAttribute('aria-expanded', state ? 'true' : 'false');
    }
    document.body.style.overflow = state ? 'hidden' : '';
  }
  if (toggle) toggle.addEventListener('click', function () { set(!open); });
  if (menu) {
    menu.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) set(false);
  });
})();
