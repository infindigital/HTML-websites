/* =====================================================================
   navigation.js — mobile menu, sticky header, back-to-top
   Vanilla JS, no dependencies.
   ===================================================================== */
(function () {
    'use strict';

    /* ---- Sticky header shadow ---- */
    var header = document.querySelector('.header');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-stuck', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---- Mobile navigation ---- */
    var toggle   = document.querySelector('.nav-toggle');
    var nav      = document.querySelector('.nav');
    var backdrop = document.querySelector('.nav-backdrop');

    function openMenu() {
        nav.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // focus first link for keyboard users
        var first = nav.querySelector('a');
        if (first) first.focus();
    }
    function closeMenu(returnFocus) {
        nav.classList.remove('is-open');
        if (backdrop) backdrop.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (returnFocus) toggle.focus();
    }
    function isOpen() { return nav && nav.classList.contains('is-open'); }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            isOpen() ? closeMenu(false) : openMenu();
        });

        // Close when a menu link is chosen
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { closeMenu(false); });
        });

        // Close on backdrop click
        if (backdrop) backdrop.addEventListener('click', function () { closeMenu(true); });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) closeMenu(true);
        });

        // Reset when resizing back to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 992 && isOpen()) closeMenu(false);
        });
    }

    /* ---- Back to top ---- */
    var toTop = document.querySelector('.to-top');
    if (toTop) {
        window.addEventListener('scroll', function () {
            toTop.classList.toggle('is-visible', window.scrollY > 480);
        }, { passive: true });
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
