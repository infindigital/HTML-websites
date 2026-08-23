/* =====================================================================
   main.js — small enhancements shared across pages
   Loaded after navigation.js / animations.js / forms.js (all deferred).
   ===================================================================== */
(function () {
    'use strict';

    // Set current year in any [data-year] element (footer copyright)
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = year;
    });
})();
