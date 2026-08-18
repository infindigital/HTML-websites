/* Falcon Rotating — editorial redesign interactions
   Minimal, dependency-free: scroll reveals, hero count-up,
   mobile menu toggle, current year. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* current year */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var mobile = document.getElementById('mobile-nav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* reveal on scroll */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* hero count-up */
  var nums = [].slice.call(document.querySelectorAll('.hero__num[data-count]'));
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
    if (reduce) { el.textContent = String(target).padStart(pad, '0'); return; }
    var start = null, dur = 900;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = Math.round(p * target);
      el.textContent = String(val).padStart(pad, '0');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); io2.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io2.observe(el); });
  } else {
    nums.forEach(runCount);
  }
})();
