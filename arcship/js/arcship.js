/* ARCSHIP — shared front-end behaviour. Minimal, dependency-free. */
(function () {
  "use strict";
  var doc = document, body = doc.body;

  /* ---- Sticky header: transparent over hero, solid on scroll ---- */
  var header = doc.querySelector(".site-header");
  var transparentStart = header && header.classList.contains("is-transparent");
  function onScroll() {
    if (!header) return;
    var solid = window.scrollY > 40;
    header.classList.toggle("is-solid", solid);
    if (transparentStart) header.classList.toggle("is-transparent", !solid);
    // scroll progress
    if (progress) {
      var h = doc.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.width = max > 0 ? (h.scrollTop / max) * 100 + "%" : "0%";
    }
  }
  var progress = doc.querySelector(".scroll-progress");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var burger = doc.querySelector(".burger");
  var scrim = doc.querySelector(".nav-scrim");
  function closeNav() { body.classList.remove("nav-open"); if (burger) burger.setAttribute("aria-expanded", "false"); }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  doc.querySelectorAll(".mobile-nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* ---- Scroll reveal ---- */
  var reveal = doc.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveal.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Number counters ---- */
  var counters = doc.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "", t0 = null, dur = 1400;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step); co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- Contact form (front-end only; no backend wired) ---- */
  var form = doc.querySelector("form[data-enquiry]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.hidden = false;
        status.textContent = "Thank you — your enquiry has been prepared. Our team will respond shortly. For an immediate response, reach us on WhatsApp.";
      }
      form.reset();
    });
  }

  /* ---- Footer year ---- */
  var y = doc.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
/* ---- Country switcher (click/tap toggle; hover & focus handled in CSS) ---- */
(function () {
  "use strict";
  var sw = document.querySelector(".country-switch");
  if (!sw) return;
  var toggle = sw.querySelector(".country-toggle");
  function close(){ sw.classList.remove("open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
  if (toggle) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = sw.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.addEventListener("click", function (e) { if (!sw.contains(e.target)) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
