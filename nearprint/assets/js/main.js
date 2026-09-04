/* Nearprint site interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sticky header scrolled state -------------------------------------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (header) header.classList.toggle("site-header--scrolled", window.scrollY > 40);
    var top = document.getElementById("backToTop");
    if (top) top.classList.toggle("is-visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile navigation ------------------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var panel = document.getElementById("mobileNav");
  var backdrop = document.getElementById("navBackdrop");
  var closeBtn = document.getElementById("navClose");

  function openNav() {
    if (!panel) return;
    panel.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-open");
    document.body.classList.add("nav-open");
    panel.setAttribute("aria-hidden", "false");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    if (!panel) return;
    panel.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    panel.setAttribute("aria-hidden", "true");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle) toggle.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (backdrop) backdrop.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeNav(); closeLightbox(); }
  });
  if (panel) {
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }

  /* ---- Back to top ------------------------------------------------------- */
  var backTop = document.getElementById("backToTop");
  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---- Reveal on scroll + counters --------------------------------------- */
  function reveal(el) { el.classList.add("is-visible"); }

  var revealEls = document.querySelectorAll(".reveal, .stagger");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(reveal);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated counters ------------------------------------------------- */
  var nums = document.querySelectorAll(".stat__num, .hero__stat b");
  function animateCount(el) {
    var raw = el.textContent;
    var match = raw.match(/\d+/);
    if (!match) return;
    var target = parseInt(match[0], 10);
    var suffixSpan = el.querySelector(".stat__suffix");
    var suffix = suffixSpan ? suffixSpan.outerHTML : (raw.replace(/\d+/, "").trim());
    if (reduce) return;
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(eased * target);
      if (suffixSpan) {
        el.firstChild.nodeValue = val;
      } else {
        el.textContent = val + suffix;
      }
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduce && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Hero background carousel (crossfade) ------------------------------ */
  var heroSlides = [].slice.call(document.querySelectorAll(".hero__slide"));
  if (heroSlides.length > 1 && !reduce) {
    var hIdx = 0;
    window.setInterval(function () {
      heroSlides[hIdx].classList.remove("is-active");
      hIdx = (hIdx + 1) % heroSlides.length;
      heroSlides[hIdx].classList.add("is-active");
    }, 7000);
  }

  /* ---- Parallax (scroll) + pointer tilt ---------------------------------- */
  if (!reduce) {
    var parEls = [].slice.call(document.querySelectorAll("[data-parallax]"));
    var ticking = false;

    function applyParallax() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = 0; i < parEls.length; i++) {
        var el = parEls[i];
        var host = el.closest(".hero, .parallax, .sub-hero, .stats-parallax, .section") || el.parentElement;
        var rect = host.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue; /* off-screen: skip */
        var center = rect.top + rect.height / 2;
        var prog = (center - vh / 2) / (vh + rect.height); /* ~ -0.5 .. 0.5 */
        var speed = parseFloat(el.getAttribute("data-parallax-speed")) || 0.2;
        var offset = -prog * speed * rect.height;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      }
      ticking = false;
    }
    function requestParallax() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(applyParallax); }
    }
    if (parEls.length) {
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax);
      window.addEventListener("load", requestParallax);
      applyParallax();
    }

    /* Pointer parallax for decorative layers (desktop, fine pointer only) */
    if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
      var tiltHosts = [].slice.call(document.querySelectorAll("[data-tilt]"));
      tiltHosts.forEach(function (host) {
        var layers = [].slice.call(host.querySelectorAll("[data-depth]"));
        if (!layers.length) return;
        var raf = null, lx = 0, ly = 0;
        function render() {
          raf = null;
          for (var j = 0; j < layers.length; j++) {
            var d = parseFloat(layers[j].getAttribute("data-depth")) || 0.04;
            layers[j].style.transform =
              "translate3d(" + (lx * d).toFixed(1) + "px," + (ly * d).toFixed(1) + "px,0)";
          }
        }
        host.addEventListener("mousemove", function (e) {
          var r = host.getBoundingClientRect();
          lx = -((e.clientX - r.left) / r.width - 0.5) * r.width;
          ly = -((e.clientY - r.top) / r.height - 0.5) * r.height;
          if (!raf) raf = window.requestAnimationFrame(render);
        });
        host.addEventListener("mouseleave", function () {
          for (var j = 0; j < layers.length; j++) layers[j].style.transform = "";
        });
      });
    }
  }

  /* ---- Product lightbox -------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCap = document.getElementById("lightboxCap");
  var lbClose = document.getElementById("lightboxClose");
  var lastFocus = null;

  function openLightbox(full, name) {
    if (!lightbox) return;
    lastFocus = document.activeElement;
    lbImg.src = full;
    lbImg.alt = name || "";
    lbCap.textContent = name || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("nav-open");
    if (lbClose) lbClose.focus();
  }
  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    lbImg.src = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll(".product__media").forEach(function (m) {
    function fire() { openLightbox(m.getAttribute("data-full"), m.getAttribute("data-name")); }
    m.addEventListener("click", fire);
    m.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(); }
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---- Contact form validation (frontend only) --------------------------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
      phone: function (v) { return v.replace(/[^0-9]/g, "").length >= 7 ? "" : "Please enter a valid phone number."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Please add a few details about your requirement."; }
    };
    function setError(fieldName, msg) {
      var span = form.querySelector('.field__error[data-for="' + fieldName + '"]');
      if (span) span.textContent = msg;
      var input = form.elements[fieldName];
      if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
    Object.keys(rules).forEach(function (k) {
      var input = form.elements[k];
      if (input) input.addEventListener("blur", function () { setError(k, rules[k](input.value)); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      Object.keys(rules).forEach(function (k) {
        var input = form.elements[k];
        var msg = rules[k](input.value);
        setError(k, msg);
        if (msg) { ok = false; if (!firstBad) firstBad = input; }
      });
      if (!ok) {
        status.className = "form__status is-err";
        status.textContent = "Please correct the highlighted fields and try again.";
        if (firstBad) firstBad.focus();
        return;
      }
      status.className = "form__status is-ok";
      status.textContent = "Thank you. This form is not connected to a live inbox, so please email sales@nearprint.ae or message us on WhatsApp and we will respond quickly.";
      form.reset();
    });
  }

  /* ---- Current year (footer, if placeholder used) ------------------------ */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
