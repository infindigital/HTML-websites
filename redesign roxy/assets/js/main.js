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

  /* ---- Tabbed showcase ---- */
  document.querySelectorAll("[data-showcase]").forEach(function (wrap) {
    wrap.querySelectorAll(".showcase__tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-tab");
        wrap.querySelectorAll(".showcase__tab").forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        wrap.querySelectorAll(".showcase__panel").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === id);
        });
      });
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

  /* ---- Hero slideshow (cross-fades like a slow film) ---- */
  var heroStage = document.querySelector("[data-hero-slides]");
  if (heroStage) {
    var slides = heroStage.querySelectorAll(".hero__slide");
    if (slides.length > 1) {
      var idx = 0;
      window.setInterval(function () {
        slides[idx].classList.remove("is-active");
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add("is-active");
      }, 5000);
    }
  }

  /* ---- Packages: 3D coverflow package carousel ---- */
  var pkgHero = document.querySelector("[data-pkg-hero]");
  if (pkgHero) {
    var cards = Array.prototype.slice.call(pkgHero.querySelectorAll("[data-pkg-card]"));
    if (cards.length) {
      var rail = pkgHero.querySelector("[data-pkg-rail]");
      var dotsWrap = pkgHero.querySelector("[data-pkg-dots]");
      var titleEl = pkgHero.querySelector("[data-pkg-title]");
      var textEl = pkgHero.querySelector("[data-pkg-text]");
      var priceEl = pkgHero.querySelector("[data-pkg-price]");
      var linkEl = pkgHero.querySelector("[data-pkg-link]");
      var idxEl = pkgHero.querySelector("[data-pkg-index]");
      var prevBtn = pkgHero.querySelector("[data-pkg-prev]");
      var nextBtn = pkgHero.querySelector("[data-pkg-next]");
      var stage = pkgHero.querySelector("[data-pkg-stage]");
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var total = cards.length;
      var active = 0;
      var timer = null;
      var spread = 62;
      var depth = 150;
      var dragged = false;
      var drag = 0;        // live drag offset in card units (updated while a finger/mouse pulls the deck)
      var dragging = false;

      // Nudge the hero video into playing — some browsers hold autoplay until asked.
      var vid = pkgHero.querySelector(".pkg-hero__video");
      if (vid && typeof vid.play === "function") {
        var tryPlay = function () { var p = vid.play(); if (p && p.catch) p.catch(function () {}); };
        tryPlay();
        vid.addEventListener("loadeddata", tryPlay);
        document.addEventListener("visibilitychange", function () { if (!document.hidden) tryPlay(); });
      }

      var pad = function (n) { return (n < 10 ? "0" : "") + n; };

      // pagination dots
      var dots = [];
      if (dotsWrap) {
        cards.forEach(function (c, i) {
          var d = document.createElement("button");
          d.type = "button";
          d.className = "pkg-hero__dot";
          d.setAttribute("aria-label", "Show package " + (i + 1));
          d.addEventListener("click", function () { go(i, true); });
          dotsWrap.appendChild(d);
          dots.push(d);
        });
      }

      var measure = function () {
        var w = window.innerWidth;
        spread = w < 560 ? 76 : (w < 980 ? 66 : 62);
        depth = w < 980 ? 90 : 150;
      };

      var layout = function () {
        cards.forEach(function (c, i) {
          var off = i - active - drag;              // include the live drag offset
          var abs = Math.abs(off);
          var rnd = Math.round(off);
          var sign = off < 0 ? -1 : 1;
          if (abs > 2.6) {
            c.style.opacity = "0";
            c.style.visibility = "hidden";
            c.style.pointerEvents = "none";
          } else {
            c.style.visibility = "visible";
            c.style.pointerEvents = dragging ? "none" : "auto";
            c.style.opacity = String(Math.max(0.4, 1 - abs * 0.34));
          }
          c.style.transition = dragging ? "none" : "";   // 1:1 follow while dragging, smooth snap on release
          var clamped = Math.max(-2, Math.min(2, off));
          var tx = off * spread;
          var tz = reduce ? 0 : -Math.abs(clamped) * depth;
          var ry = reduce ? 0 : -sign * Math.abs(clamped) * 26;
          var sc = 1 - Math.min(abs, 2) * 0.12;
          c.style.transform =
            "translate(-50%,-50%) translateX(" + tx + "%) translateZ(" + tz + "px) rotateY(" + ry + "deg) scale(" + sc + ")";
          c.style.zIndex = String(20 - Math.abs(rnd));
          c.classList.toggle("is-active", rnd === 0 && !dragging);
          c.setAttribute("aria-current", i === active ? "true" : "false");
          c.tabIndex = i === active ? 0 : -1;
        });
      };

      var sync = function () {
        var c = cards[active];
        if (titleEl) titleEl.textContent = c.getAttribute("data-name");
        if (textEl) textEl.textContent = c.getAttribute("data-desc");
        if (priceEl) priceEl.textContent = c.getAttribute("data-price");
        if (linkEl) linkEl.setAttribute("href", c.getAttribute("data-href"));
        if (idxEl) idxEl.textContent = pad(active + 1);
        dots.forEach(function (d, i) { d.classList.toggle("is-active", i === active); });
        if (!reduce && titleEl && titleEl.animate) {
          titleEl.animate(
            [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
            { duration: 420, easing: "cubic-bezier(0.22,0.61,0.36,1)" }
          );
          if (textEl) textEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520 });
        }
      };

      function go(i, user) {
        active = (i % total + total) % total;
        layout();
        sync();
        if (user) restart();
      }

      cards.forEach(function (c, i) {
        c.addEventListener("click", function () {
          if (dragged) { dragged = false; return; }
          if (i === active) {
            var href = c.getAttribute("data-href");
            var target = href && document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          } else {
            go(i, true);
          }
        });
      });
      if (prevBtn) prevBtn.addEventListener("click", function () { go(active - 1, true); });
      if (nextBtn) nextBtn.addEventListener("click", function () { go(active + 1, true); });

      pkgHero.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { go(active - 1, true); }
        else if (e.key === "ArrowRight") { go(active + 1, true); }
      });

      /* Manual drag / swipe — grab the deck and pull it left/right (touch + mouse). */
      if (stage && window.PointerEvent) {
        var startX = 0, pxPerUnit = 1, activePointer = null;
        stage.style.touchAction = "pan-y";
        stage.style.cursor = "grab";

        // stop native image/text drag from hijacking the gesture (this was killing the swipe)
        cards.forEach(function (c) {
          c.setAttribute("draggable", "false");
          c.querySelectorAll("img").forEach(function (im) { im.setAttribute("draggable", "false"); });
        });
        stage.addEventListener("dragstart", function (e) { e.preventDefault(); });

        var onMove = function (e) {
          if (!dragging || (activePointer !== null && e.pointerId !== activePointer)) return;
          var dx = e.clientX - startX;
          if (Math.abs(dx) > 4) dragged = true;
          drag = dx / pxPerUnit;                       // convert pixels → card units
          if (drag > 1.3) drag = 1.3; else if (drag < -1.3) drag = -1.3;
          layout();
        };

        var endDrag = function (e) {
          if (!dragging) return;
          if (activePointer !== null && e && e.pointerId !== undefined && e.pointerId !== activePointer) return;
          dragging = false;
          activePointer = null;
          stage.style.cursor = "grab";
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", endDrag);
          window.removeEventListener("pointercancel", endDrag);
          var move = Math.round(-drag);                // pull left (drag>0) advances to the next card
          drag = 0;
          if (move !== 0) { go(active + move, true); }
          else { layout(); start(); }
        };

        stage.addEventListener("pointerdown", function (e) {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          dragging = true; dragged = false; drag = 0;
          activePointer = e.pointerId;
          startX = e.clientX;
          var w = stage.getBoundingClientRect().width || stage.offsetWidth || 1;
          pxPerUnit = Math.max(120, w * spread / 100);  // width of one card step, in px
          stage.style.cursor = "grabbing";
          try { stage.setPointerCapture(e.pointerId); } catch (_) {}
          stop();
          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", endDrag);
          window.addEventListener("pointercancel", endDrag);
          layout();
        });
      }

      var tick = function () { go(active + 1, false); };
      var start = function () { if (!reduce && !timer && total > 1) timer = window.setInterval(tick, 5500); };
      var stop = function () { if (timer) { window.clearInterval(timer); timer = null; } };
      function restart() { stop(); start(); }
      pkgHero.addEventListener("mouseenter", stop);
      pkgHero.addEventListener("mouseleave", start);
      pkgHero.addEventListener("focusin", stop);
      pkgHero.addEventListener("focusout", start);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop(); else start();
      });

      var resizeTimer = null;
      window.addEventListener("resize", function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () { measure(); layout(); }, 120);
      });

      measure();
      layout();
      sync();
      start();
    }
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
