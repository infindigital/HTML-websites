/* =============================================================
   Roxy Houseboat — interactions
   Nav scroll state · mobile menu · accordion · scroll reveal · year
   ============================================================= */
(function () {
  "use strict";

  /* ---- Sticky nav: transparent -> solid on scroll ---- */
  var nav = document.querySelector(".nav--overlay");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("is-stuck");
      else nav.classList.remove("is-stuck");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var navRoot = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var backdrop = document.querySelector(".nav__backdrop");
  var closeMenu = function () {
    if (!navRoot) return;
    navRoot.classList.remove("is-open");
    document.body.style.overflow = "";
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && navRoot) {
    toggle.addEventListener("click", function () {
      var open = navRoot.classList.toggle("is-open");
      document.body.style.overflow = open ? "hidden" : "";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  document.querySelectorAll(".nav__menu .nav__link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Accordion / FAQ ---- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var panel = item.querySelector(".faq__a");
      var isOpen = item.classList.contains("is-open");

      // close siblings within the same faq group
      var group = item.parentElement;
      group.querySelectorAll(".faq__item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq__a").style.maxHeight = null;
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        panel.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  // keep open panels sized correctly on resize
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq__item.is-open .faq__a").forEach(function (p) {
      p.style.maxHeight = p.scrollHeight + "px";
    });
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Contact form (front-end only) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-status]");
      if (note) {
        note.textContent = "Thank you — your enquiry has been noted. We'll be in touch shortly.";
        note.style.color = "var(--blue-700)";
      }
      form.reset();
    });
  }
})();
