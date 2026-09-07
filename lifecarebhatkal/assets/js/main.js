/* ============================================================
   Life Care — front-end interactions & motion system
   Vanilla JS + optional GSAP/ScrollTrigger + Swiper (graceful fallback)
   ============================================================ */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || /[?&]motion=off/.test(location.search);

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    header();
    mobileNav();
    heroReveal();
    reveals();
    counters();
    faq();
    lightbox();
    sliders();
    year();
  }

  /* ---------- Header scroll states ---------- */
  function header() {
    var h = document.querySelector('.site-header');
    if (!h) return;
    var solid = h.classList.contains('solid'); // inner pages start solid
    var last = 0;
    function onScroll() {
      var y = window.scrollY || 0;
      if (!solid) h.classList.toggle('scrolled', y > 40);
      // hide on scroll down, show on scroll up (after 300px)
      if (y > 300 && y > last + 4) h.classList.add('hide');
      else if (y < last - 4 || y < 300) h.classList.remove('hide');
      last = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile navigation ---------- */
  function mobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;
    var closeEls = nav.querySelectorAll('[data-close], .backdrop, .mnav-list a');
    function open() { nav.classList.add('open'); document.body.style.overflow = 'hidden'; toggle.setAttribute('aria-expanded', 'true'); }
    function close() { nav.classList.remove('open'); document.body.style.overflow = ''; toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', function () { nav.classList.contains('open') ? close() : open(); });
    closeEls.forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Hero reveal ---------- */
  function heroReveal() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    requestAnimationFrame(function () { setTimeout(function () { hero.classList.add('loaded'); }, 60); });
    if (reduce) return;
    if (window.gsap) {
      var tl = window.gsap.timeline({ delay: 0.15 });
      tl.from('.hero .kicker', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.hero h1 .line', { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.35')
        .from('.hero-lead', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.hero-actions > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
        .from('.hero-float', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }
  }

  /* ---------- Scroll reveals (IntersectionObserver — always reliable) ---------- */
  function reveals() {
    var items = document.querySelectorAll('[data-reveal],[data-stagger]');
    if (items.length) {
      if (reduce || !('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-in'); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { stagIn(en.target); io.unobserve(en.target); }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        items.forEach(function (el) { io.observe(el); });
      }
    }
    // gentle parallax via GSAP when available (progressive enhancement only)
    if (!reduce && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      document.querySelectorAll('[data-parallax]').forEach(function (el) {
        window.gsap.to(el, { yPercent: -10, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }
    function stagIn(el) {
      el.classList.add('is-in');
      if (el.hasAttribute('data-stagger')) {
        Array.prototype.forEach.call(el.children, function (c, i) {
          c.style.transitionDelay = (i * 0.08) + 's';
        });
      }
    }
  }

  /* ---------- Count-up statistics ---------- */
  function counters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        run(en.target); io.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
    function run(el) {
      var raw = el.getAttribute('data-count');
      var target = parseFloat(raw.replace(/[^0-9.]/g, ''));
      var suffix = raw.replace(/[0-9.,]/g, '');
      var hasComma = raw.indexOf(',') > -1;
      if (reduce || isNaN(target)) { el.textContent = raw; return; }
      var start = performance.now(), dur = 1600;
      function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
        el.textContent = (hasComma ? val.toLocaleString('en-IN') : val) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  /* ---------- FAQ accordion ---------- */
  function faq() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var open = item.classList.contains('open');
        // close siblings within same list
        var parent = item.parentElement;
        parent.querySelectorAll('.faq-item.open').forEach(function (o) {
          if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); }
        });
        item.classList.toggle('open', !open);
        q.setAttribute('aria-expanded', String(!open));
        a.style.maxHeight = open ? null : a.scrollHeight + 'px';
      });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function lightbox() {
    var triggers = document.querySelectorAll('[data-lightbox]');
    if (!triggers.length) return;
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button class="lb-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button><img alt="">';
    document.body.appendChild(box);
    var img = box.querySelector('img');
    function open(src, alt) { img.src = src; img.alt = alt || ''; box.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        open(t.getAttribute('data-lightbox') || t.querySelector('img').src, t.getAttribute('data-alt'));
      });
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.lb-close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Swiper sliders ---------- */
  function sliders() {
    if (!window.Swiper) return;
    var opt = { slidesPerView: 1.1, spaceBetween: 20, grabCursor: true,
      breakpoints: { 640: { slidesPerView: 2.2 }, 1000: { slidesPerView: 3 }, 1280: { slidesPerView: 3 } } };
    document.querySelectorAll('.swiper.doctors-swiper').forEach(function (el) {
      new window.Swiper(el, Object.assign({}, opt, {
        navigation: { nextEl: el.parentElement.querySelector('.sw-next'), prevEl: el.parentElement.querySelector('.sw-prev') }
      }));
    });
    document.querySelectorAll('.swiper.testi-swiper').forEach(function (el) {
      new window.Swiper(el, {
        slidesPerView: 1.05, spaceBetween: 22, grabCursor: true, autoHeight: false,
        pagination: { el: el.parentElement.querySelector('.sw-dots'), clickable: true },
        breakpoints: { 720: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
      });
    });
  }

  function year() {
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }
})();
