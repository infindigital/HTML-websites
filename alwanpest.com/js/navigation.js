/* ==========================================================================
   Alwan Pest Control — Navigation
   Mobile menu, dropdown accordion, sticky header shadow, search overlay.
   ========================================================================== */
(function () {
  "use strict";

  var body = document.body;
  var nav = document.getElementById("mainNav");
  var toggle = document.querySelector(".nav-toggle");
  var backdrop = document.querySelector(".nav-backdrop");

  /* ---- Mobile menu open/close ---- */
  function openMenu() {
    nav.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
  }
  function closeMenu() {
    nav.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Dropdown: hover on desktop (CSS), click/accordion on mobile ---- */
  var dropParents = document.querySelectorAll(".has-dropdown");
  dropParents.forEach(function (parent) {
    var t = parent.querySelector(".dropdown-toggle");
    if (!t) return;
    t.addEventListener("click", function (e) {
      // Only intercept as accordion when the mobile menu layout is active
      if (window.matchMedia("(max-width: 1024px)").matches) {
        e.preventDefault();
        parent.classList.toggle("open");
      }
    });
  });

  /* Close mobile menu after tapping a real link */
  nav && nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (!a.classList.contains("dropdown-toggle") &&
          window.matchMedia("(max-width: 1024px)").matches) {
        closeMenu();
      }
    });
  });

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Search overlay ---- */
  var searchBtn = document.querySelector(".search-btn");
  var overlay = document.getElementById("searchOverlay");
  if (searchBtn && overlay) {
    var input = overlay.querySelector("input");
    var closeBtn = overlay.querySelector(".search-close");
    function openSearch() {
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      setTimeout(function () { input && input.focus(); }, 60);
    }
    function closeSearch() {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
    }
    searchBtn.addEventListener("click", openSearch);
    closeBtn && closeBtn.addEventListener("click", closeSearch);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSearch(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSearch(); });
    overlay.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault(); /* static site — no search backend */
      closeSearch();
    });
  }
})();
