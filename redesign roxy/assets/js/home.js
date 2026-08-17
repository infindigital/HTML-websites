/* Roxy Houseboat, homepage v2 interactions (self-contained) */
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
  /* ---- mobile Packages accordion ---- */
  doc.querySelectorAll(".mm-acc__top").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var acc = btn.closest(".mm-acc");
      if (!acc) return;
      var open = acc.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
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
       ratio is ~0 and never crosses the threshold, drive those from the
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

  /* ---- count-up on the stats band ---- */
  var counters = doc.querySelectorAll(".statx-num");
  if (counters.length) {
    var runCount = function (el) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      var target = parseFloat(el.getAttribute("data-count")) || 0;
      var dec = parseInt(el.getAttribute("data-decimals"), 10) || 0;
      if (reduce) { el.textContent = target.toFixed(dec); return; }
      var dur = 1400, t0 = null;
      var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
      var frame = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        el.textContent = (target * ease(p)).toFixed(dec);
        if (p < 1) window.requestAnimationFrame(frame);
        else el.textContent = target.toFixed(dec);
      };
      window.requestAnimationFrame(frame);
    };
    var band = counters[0].closest(".statx") || document.body;
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            counters.forEach(runCount);
            cio.disconnect();
          }
        });
      }, { threshold: 0.35 });
      cio.observe(band);
    } else {
      counters.forEach(runCount);
    }
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
        status.textContent = "Thank you, we’ve received your enquiry and will be in touch shortly.";
        status.style.color = "var(--aqua-deep)";
      }
      form.reset();
    });
  }

  /* ---- services coverflow carousel ---- */
  doc.querySelectorAll("[data-svc]").forEach(function (stage) {
    var track = stage.querySelector("[data-svc-track]");
    var cards = Array.prototype.slice.call(stage.querySelectorAll("[data-svc-card]"));
    var dotsWrap = stage.querySelector("[data-svc-dots]");
    var prev = stage.querySelector("[data-svc-prev]");
    var next = stage.querySelector("[data-svc-next]");
    if (!track || cards.length === 0) return;

    var n = cards.length;
    var active = Math.min(2, n - 1); /* default: Sunset Cruise centered */
    var dots = [];

    if (dotsWrap) {
      cards.forEach(function (c, i) {
        var b = doc.createElement("button");
        b.type = "button";
        b.className = "svc__dot";
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.addEventListener("click", function () { go(i); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    /* shortest signed distance from active (with wrap-around) */
    function offset(i) {
      var o = ((i - active) % n + n) % n;
      if (o > n / 2) o -= n;
      return o;
    }

    var STEP = [0, 66, 121, 176]; /* translate % per |offset| */
    var SCALE = [1, 0.8, 0.64, 0.5];
    var OPAC = [1, 0.92, 0.78, 0];

    function render() {
      cards.forEach(function (card, i) {
        var o = offset(i);
        var a = Math.abs(o);
        var idx = Math.min(a, 3);
        var x = (o < 0 ? -1 : 1) * STEP[idx];
        card.style.transform =
          "translate(calc(-50% + " + x + "%), -50%) scale(" + SCALE[idx] + ")";
        card.style.opacity = OPAC[idx];
        card.style.zIndex = String(10 - a);
        card.style.pointerEvents = a > 2 ? "none" : "auto";
        card.classList.toggle("is-active", o === 0);
      });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === active); });
    }

    function go(i) { active = ((i % n) + n) % n; render(); }
    function step(d) { go(active + d); }

    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
    cards.forEach(function (card, i) {
      card.addEventListener("click", function () { if (offset(i) !== 0) go(i); });
    });

    /* keyboard support when stage focused */
    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { step(-1); }
      else if (e.key === "ArrowRight") { step(1); }
    });

    render();

    /* gentle autoplay, paused on hover / reduced motion */
    if (!reduce) {
      var timer = null;
      function start() { stop(); timer = window.setInterval(function () { step(1); }, 5000); }
      function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
      stage.addEventListener("mouseenter", stop);
      stage.addEventListener("mouseleave", start);
      start();
    }
  });

  /* ---- testimonials paged carousel ---- */
  doc.querySelectorAll("[data-rev]").forEach(function (stage) {
    var track = stage.querySelector("[data-rev-track]");
    var cards = Array.prototype.slice.call(stage.querySelectorAll(".rev-card"));
    var dotsWrap = stage.querySelector("[data-rev-dots]");
    var prev = stage.querySelector("[data-rev-prev]");
    var next = stage.querySelector("[data-rev-next]");
    if (!track || cards.length === 0) return;

    var n = cards.length;
    var page = 0;

    function perView() {
      var w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1040) return 2;
      return 3;
    }

    function gapPx() {
      var g = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap;
      return parseFloat(g) || 0;
    }

    function pageCount() { return Math.max(1, Math.ceil(n / perView())); }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      var pc = pageCount();
      for (var i = 0; i < pc; i++) {
        (function (i) {
          var b = doc.createElement("button");
          b.type = "button";
          b.className = "rev__dot";
          b.setAttribute("aria-label", "Go to review page " + (i + 1));
          b.addEventListener("click", function () { go(i); });
          dotsWrap.appendChild(b);
        })(i);
      }
    }

    function render() {
      var per = perView();
      var pc = pageCount();
      if (page > pc - 1) page = pc - 1;
      var step = cards[0].getBoundingClientRect().width + gapPx();
      var start = Math.min(page * per, Math.max(0, n - per)); /* clamp last page flush-right */
      track.style.transform = "translateX(" + (-start * step) + "px)";

      var dots = dotsWrap ? dotsWrap.querySelectorAll(".rev__dot") : [];
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === page); });
      if (prev) prev.disabled = page === 0;
      if (next) next.disabled = page >= pc - 1;
    }

    function go(p) {
      var pc = pageCount();
      page = Math.max(0, Math.min(p, pc - 1));
      render();
    }

    if (prev) prev.addEventListener("click", function () { go(page - 1); });
    if (next) next.addEventListener("click", function () { go(page + 1); });

    buildDots();
    render();

    var rt;
    window.addEventListener("resize", function () {
      window.clearTimeout(rt);
      rt = window.setTimeout(function () { buildDots(); render(); }, 150);
    });
  });

  /* ---- year ---- */
  var y = new Date().getFullYear();
  doc.querySelectorAll("#year, .rx-year").forEach(function (s) { s.textContent = y; });
})();
