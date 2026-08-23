/* =====================================================================
   animations.js — scroll reveal, counters, FAQ accordion
   ===================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Scroll reveal ---- */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
            revealEls.forEach(function (el) { io.observe(el); });
        }
    }

    /* ---- Animated counters ---- */
    var counters = document.querySelectorAll('[data-count]');
    function animateCounter(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = (target % 1 !== 0) ? 1 : 0;
        if (reduceMotion) { el.textContent = target.toLocaleString() + suffix; return; }
        var start = null, duration = 1600;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = target * eased;
            el.textContent = (decimals ? val.toFixed(1) : Math.floor(val).toLocaleString()) + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = (decimals ? target.toFixed(1) : target.toLocaleString()) + suffix;
        }
        requestAnimationFrame(step);
    }
    if (counters.length) {
        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
        } else {
            var co = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        co.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(function (el) { co.observe(el); });
        }
    }

    /* ---- FAQ accordion ---- */
    var items = document.querySelectorAll('.accordion__item');
    items.forEach(function (item) {
        var btn = item.querySelector('.accordion__btn');
        var panel = item.querySelector('.accordion__panel');
        if (!btn || !panel) return;

        function setOpen(open) {
            item.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            panel.style.maxHeight = open ? panel.scrollHeight + 'px' : null;
        }

        // initialise from markup (first item may be pre-opened)
        setOpen(item.classList.contains('is-open'));

        btn.addEventListener('click', function () {
            var willOpen = !item.classList.contains('is-open');
            // close siblings (single-open accordion)
            items.forEach(function (other) {
                if (other !== item) {
                    other.classList.remove('is-open');
                    var ob = other.querySelector('.accordion__btn');
                    var op = other.querySelector('.accordion__panel');
                    if (ob) ob.setAttribute('aria-expanded', 'false');
                    if (op) op.style.maxHeight = null;
                }
            });
            setOpen(willOpen);
        });

        // recalc height on resize when open
        window.addEventListener('resize', function () {
            if (item.classList.contains('is-open')) panel.style.maxHeight = panel.scrollHeight + 'px';
        });
    });
})();
