/* Falcon Rotating — lightweight vanilla JS (no libraries) */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Dropdowns: hover on desktop (CSS), click/keyboard on touch+mobile ---- */
  var dropdowns = document.querySelectorAll(".has-dropdown");
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector(".nav-link");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      // On mobile the button toggles; on desktop links are hover, but click still works
      if (window.matchMedia("(max-width:820px)").matches) {
        e.preventDefault();
      }
      var isOpen = dd.getAttribute("data-open") === "true";
      dropdowns.forEach(function (o) { if (o !== dd) o.setAttribute("data-open", "false"); });
      dd.setAttribute("data-open", isOpen ? "false" : "true");
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });
  // Close dropdowns when clicking outside (desktop)
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      dropdowns.forEach(function (o) {
        o.setAttribute("data-open", "false");
        var b = o.querySelector(".nav-link");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });
  // Escape closes mobile nav + dropdowns
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      dropdowns.forEach(function (o) { o.setAttribute("data-open", "false"); });
    }
  });

  /* ---- Scroll reveal via IntersectionObserver ---- */
  var reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveal.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contact / quote form (front-end demo handling) ---- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.classList.add("show", "ok");
        status.textContent =
          "Thank you — your enquiry has been prepared. Connect this form to your email/CRM endpoint to receive submissions.";
      }
      form.reset();
      if (status) status.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  /* ---- Hero stat count-up (Concept C) ---- */
  var heroNums = document.querySelectorAll(".hero__num[data-count]");
  if (heroNums.length) {
    var pad = function (v, n) { var s = String(v); while (s.length < n) s = "0" + s; return s; };
    var countUp = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var digits = parseInt(el.getAttribute("data-pad"), 10) || 0;
      var dur = 1100, start = null;
      var frame = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pad(Math.round(eased * target), digits);
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = pad(target, digits);
      };
      requestAnimationFrame(frame);
    };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && "IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      heroNums.forEach(function (el) { cio.observe(el); });
    }
    // reduced motion / no IO: leave the static 05 / 04 already in the HTML
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
