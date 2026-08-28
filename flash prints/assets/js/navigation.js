/* Header behaviour: sticky on scroll + accessible mobile drawer */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var isLightHeader = header && header.classList.contains("site-header--light");

  /* Sticky header (only for pages with a transparent-over-hero header) */
  function onScroll() {
    if (!header || isLightHeader) return;
    if (window.scrollY > 40) header.classList.add("is-sticky");
    else header.classList.remove("is-sticky");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile drawer */
  var toggle = document.querySelector(".nav__toggle");
  var drawer = document.getElementById("mobileNav");
  if (!toggle || !drawer) return;

  var panel = drawer.querySelector(".mobile-nav__panel");
  var closeBtn = drawer.querySelector(".mobile-nav__close");
  var overlay = drawer.querySelector(".mobile-nav__overlay");
  var lastFocused = null;

  function focusables() {
    return drawer.querySelectorAll('a[href], button:not([disabled])');
  }

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.classList.add("is-open");
    document.body.classList.add("no-scroll");
    toggle.setAttribute("aria-expanded", "true");
    var f = focusables();
    if (f.length) f[0].focus();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    toggle.setAttribute("aria-expanded", "false");
    if (lastFocused) lastFocused.focus();
  }

  toggle.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  /* Close after navigating */
  drawer.querySelectorAll("a[href]").forEach(function (a) {
    a.addEventListener("click", closeDrawer);
  });

  /* Keyboard: Esc to close, Tab trap while open */
  document.addEventListener("keydown", function (e) {
    if (!drawer.classList.contains("is-open")) return;
    if (e.key === "Escape") { closeDrawer(); return; }
    if (e.key === "Tab") {
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Mobile sub-menu accordions */
  drawer.querySelectorAll(".m-accordion__toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".m-accordion");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();
