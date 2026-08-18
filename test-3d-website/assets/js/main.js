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

  /* hero moving band: continuous auto-pan + manual drag / wheel scroll */
  var rail = document.querySelector('.hero__rail');
  var track = document.querySelector('.hero__track');
  if (rail && track) {
    var offset = 0;           /* px the track is shifted left */
    var half = 0;             /* width of one duplicated group */
    var speed = 0.55;         /* auto-pan px per frame */
    var dragging = false, startX = 0, startOffset = 0;

    function measure() { half = track.scrollWidth / 2; }
    measure();
    window.addEventListener('resize', measure);

    function wrap(v) { return half > 0 ? ((v % half) + half) % half : v; }
    function apply() { track.style.transform = 'translateX(' + (-offset) + 'px)'; }

    function frame() {
      if (!reduce && !dragging) offset = wrap(offset + speed);
      apply();
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    /* pointer drag (mouse + touch) */
    rail.addEventListener('pointerdown', function (e) {
      dragging = true; startX = e.clientX; startOffset = offset;
      rail.classList.add('is-grabbing');
      try { rail.setPointerCapture(e.pointerId); } catch (err) {}
    });
    rail.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      offset = wrap(startOffset + (startX - e.clientX));
      apply();
    });
    function endDrag() { dragging = false; rail.classList.remove('is-grabbing'); }
    rail.addEventListener('pointerup', endDrag);
    rail.addEventListener('pointercancel', endDrag);
    rail.addEventListener('pointerleave', function () { if (dragging) endDrag(); });

    /* horizontal trackpad / shift-wheel scroll (leaves vertical page scroll alone) */
    rail.addEventListener('wheel', function (e) {
      var dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (!dx) return;
      e.preventDefault();
      offset = wrap(offset + dx);
      apply();
    }, { passive: false });
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
