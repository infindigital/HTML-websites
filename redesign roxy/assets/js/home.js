/* Roxy Houseboat — homepage v2 interactions (self-contained) */
(function () {
  "use strict";
  var doc = document, body = doc.body;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- masthead: solid on scroll + hide on scroll-down ---- */
  var mast = doc.getElementById("masthead");
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (mast) {
      mast.classList.toggle("is-stuck", y > 40);
      // hide when scrolling down past the hero, show when scrolling up
      if (y > 600 && y > lastY + 6) mast.classList.add("is-hidden");
      else if (y < lastY - 6 || y < 600) mast.classList.remove("is-hidden");
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = doc.querySelector(".burger");
  function closeMenu() {
    body.classList.remove("is-menu-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = body.classList.toggle("is-menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.overflow = open ? "hidden" : "";
    });
  }
  doc.querySelectorAll(".mobile-menu__links a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---- smooth in-page anchor scrolling ---- */
  doc.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var el = doc.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  });

  /* ---- FAQ accordion ---- */
  doc.querySelectorAll(".acc__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc__item");
      var panel = item.querySelector(".acc__a");
      var open = item.classList.contains("is-open");
      // close siblings
      item.parentElement.querySelectorAll(".acc__item.is-open").forEach(function (o) {
        if (o !== item) {
          o.classList.remove("is-open");
          o.querySelector(".acc__a").style.maxHeight = null;
          o.querySelector(".acc__q").setAttribute("aria-expanded", "false");
        }
      });
      if (open) {
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

  /* ---- reveal on scroll ---- */
  var revealEls = doc.querySelectorAll(".reveal, .reveal-img, .wipe, .zoom");
  function revealInView() {
    var vh = window.innerHeight || doc.documentElement.clientHeight;
    revealEls.forEach(function (el) {
      if (el.classList.contains("is-in")) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 1.05 && r.bottom > 0) el.classList.add("is-in");
    });
  }
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
    /* safety: reveal anything already on screen, and a hard fallback */
    revealInView();
    window.addEventListener("load", revealInView);
    setTimeout(revealInView, 1400);
    /* clip-path reveals (.wipe) start fully clipped, so their IntersectionObserver
       ratio is ~0 and never crosses the threshold — drive those from the
       bounding-box check on scroll, which ignores clip-path. */
    var rvTicking = false;
    window.addEventListener("scroll", function () {
      if (!rvTicking) {
        window.requestAnimationFrame(function () { revealInView(); rvTicking = false; });
        rvTicking = true;
      }
    }, { passive: true });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- 3D pointer tilt on floating image panels ---- */
  var tilts = doc.querySelectorAll(".tilt");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (tilts.length && !reduce && finePointer) {
    var MAX = 5.5; // degrees
    tilts.forEach(function (el) {
      var raf = null, tx = 0, ty = 0;
      function apply() {
        el.style.setProperty("--try", tx.toFixed(2) + "deg");
        el.style.setProperty("--trx", ty.toFixed(2) + "deg");
        raf = null;
      }
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = px * MAX;          // rotateY follows horizontal
        ty = -py * MAX;         // rotateX follows vertical (inverted)
        if (!raf) raf = window.requestAnimationFrame(apply);
      });
      el.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = window.requestAnimationFrame(apply);
      });
    });
  }

  /* ---- subtle parallax on flagged media ---- */
  var parEls = doc.querySelectorAll(".par");
  if (parEls.length && !reduce) {
    var pTicking = false;
    function parallax() {
      var vh = window.innerHeight;
      parEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var prog = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5
        var amt = parseFloat(el.getAttribute("data-par") || "18");
        el.style.transform = "translate3d(0," + (prog * amt).toFixed(2) + "px,0)";
      });
      pTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (!pTicking) { window.requestAnimationFrame(parallax); pTicking = true; }
    }, { passive: true });
    parallax();
  }

  /* ---- cinematic hero: text drift + slow video push-in ---- */
  var hero = doc.querySelector(".hero");
  var heroInner = doc.querySelector(".hero__inner");
  var heroVid = doc.querySelector(".hero__media video, .hero__media img");
  if (hero && !reduce) {
    var hTicking = false;
    function heroPar() {
      var h = hero.offsetHeight || 1;
      var y = window.scrollY;
      if (y <= h) {
        var p = y / h; // 0..1 across the hero
        if (heroInner) {
          heroInner.style.transform = "translate3d(0," + (y * 0.22).toFixed(1) + "px,0)";
          heroInner.style.opacity = (1 - p * 0.85).toFixed(3);
        }
        if (heroVid) heroVid.style.transform = "scale(" + (1 + p * 0.12).toFixed(3) + ")";
      }
      hTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (!hTicking) { window.requestAnimationFrame(heroPar); hTicking = true; }
    }, { passive: true });
    heroPar();
  }

  /* ---- contact form (no backend on static site) ---- */
  var form = doc.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Thank you — we’ve received your enquiry and will be in touch shortly.";
        status.style.color = "var(--forest)";
      }
      form.reset();
    });
  }

  /* ---- year ---- */
  var y = new Date().getFullYear();
  doc.querySelectorAll("#year, .rx-year").forEach(function (s) { s.textContent = y; });
})();
