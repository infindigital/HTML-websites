/* ==========================================================================
   MASKO Contracting Company — Site interactions (Vanilla JS)
   - Mobile navigation toggle + collapsible dropdowns
   - Scroll reveal animations
   - Animated stat counters
   - Back-to-top button
   - Material carousel controls
   - Language switch (visual state)
   - Contact form (client-side validation + friendly status)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- Helpers */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* --------------------------------------------------- 1. Mobile navigation */
  const header = $(".site-header");
  const toggle = $(".nav__toggle");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // On mobile, tapping a parent item with a dropdown expands it in place.
    $$(".nav__item").forEach((item) => {
      const link = $(".nav__link", item);
      const hasMenu = $(".dropdown", item);
      if (!link || !hasMenu) return;
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          item.classList.toggle("open");
        }
      });
    });

    // Close the menu when a real link is followed.
    $$(".dropdown a, .nav__menu a").forEach((a) => {
      a.addEventListener("click", () => {
        if (!$(".dropdown", a.closest(".nav__item") || document.body) || window.innerWidth > 900) {
          header.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ------------------------------------------------------ 2. Scroll reveal  */
  // Progressive enhancement: elements animate in as they enter the viewport,
  // but content must never stay permanently hidden. A generous trigger plus a
  // safety sweep guarantee every section becomes visible.
  const revealEls = $$(".reveal");
  const show = (el) => el.classList.add("is-in");

  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      // Any sliver of the element in view (or just below) triggers the reveal.
      { threshold: 0, rootMargin: "0px 0px 12% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // Safety net: reveal anything still hidden once the page has settled, so a
    // missed observation can never leave a section invisible.
    const sweep = () =>
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.15) show(el);
      });
    window.addEventListener("load", () => setTimeout(sweep, 200));
    window.addEventListener("scroll", sweep, { passive: true });
  } else {
    revealEls.forEach(show);
  }

  /* ----------------------------------------------------- 3. Stat counters   */
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = (el.dataset.count.split(".")[1] || "").length;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(step);
    };
    const io2 = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io2.observe(el));
  }

  /* ------------------------------------------------------- 4. Back to top   */
  const toTop = $(".to-top");
  if (toTop) {
    const onScroll = () => toTop.classList.toggle("is-visible", window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
    onScroll();
  }

  /* ------------------------------------------------- 5. Material carousel   */
  // A free-scrolling horizontal track: the arrows nudge it, and it can also be
  // dragged with the mouse or swiped on touch — no snap points, no hard stops.
  $$("[data-carousel]").forEach((carousel) => {
    const track = $(".materials__grid", carousel) || $("[data-track]", carousel);
    const prev = $("[data-prev]", carousel);
    const next = $("[data-next]", carousel);
    if (!track) return;
    const amount = () => Math.max(track.clientWidth * 0.5, 260);
    prev && prev.addEventListener("click", () =>
      track.scrollBy({ left: -amount(), behavior: "smooth" })
    );
    next && next.addEventListener("click", () =>
      track.scrollBy({ left: amount(), behavior: "smooth" })
    );

    // Click-and-drag to scroll (desktop). Touch devices scroll natively.
    let down = false, startX = 0, startLeft = 0, moved = 0;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return; // let native touch scroll handle it
      down = true; moved = 0;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add("is-dragging");
    });
    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      track.scrollLeft = startLeft - dx;
    });
    const endDrag = () => {
      if (!down) return;
      down = false;
      track.classList.remove("is-dragging");
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointerleave", endDrag);
    // Suppress the click on cards after a real drag so it doesn't navigate.
    track.addEventListener("click", (e) => {
      if (moved > 6) { e.preventDefault(); }
    }, true);
  });

  /* ------------------------------------------- 5b. Testimonials carousel    */
  $$("[data-testi]").forEach((box) => {
    const slides = $$(".testi__slide", box);
    const prev = $("[data-testi-prev]", box);
    const next = $("[data-testi-next]", box);
    if (slides.length < 2) return;
    let idx = 0;
    const go = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
    };
    prev && prev.addEventListener("click", () => go(idx - 1));
    next && next.addEventListener("click", () => go(idx + 1));
  });

  /* -------------------------------------------- 6. Language (Google Translate) */
  // The Arabic flag translates the whole site to Arabic via the Google Website
  // Translate widget; the English flag restores the original. The choice is
  // stored in the `googtrans` cookie so it persists across every page.
  const readTrans = () => {
    const m = document.cookie.match(/googtrans=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "";
  };
  const currentLang = () => (readTrans().split("/").pop() === "ar" ? "ar" : "en");

  const applyLang = (lang) => {
    const val = "/en/" + lang;
    // Set on the current path and (when hosted) the domain so it carries across pages.
    document.cookie = "googtrans=" + val + ";path=/";
    if (location.hostname) {
      document.cookie = "googtrans=" + val + ";path=/;domain=" + location.hostname;
    }
    location.reload();
  };

  // Reflect the active language on load (active flag + lang attribute). We keep
  // the original left-to-right layout so the custom interior banners, carousel,
  // footer and grids stay exactly as designed; Google still translates the text
  // into Arabic, which shapes and reads correctly within the existing layout.
  const reflect = () => {
    const cur = currentLang();
    $$(".lang button").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === cur));
    document.documentElement.setAttribute("lang", cur === "ar" ? "ar" : "en");
  };
  reflect();

  $$(".lang button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!lang || lang === currentLang()) return;
      applyLang(lang);
    });
  });

  /* --------------------------------------------------- 7. Contact form      */
  /* Validates every field, POSTs the enquiry as JSON to contact-handler.php  */
  /* (PHPMailer / SMTP), and only reports success on a real 2xx response.     */
  const ENDPOINT = "contact-handler.php";
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFieldError = (field, msg) => {
    field.classList.add("has-error");
    const err = $(".field-error", field);
    if (err && msg) err.textContent = msg;
  };
  const clearFieldError = (field) => field.classList.remove("has-error");

  const validateField = (field) => {
    const input = $("input, textarea", field);
    if (!input) return true;
    const value = input.value.trim();
    const type = input.getAttribute("data-validate");
    if (input.hasAttribute("required") && !value) {
      setFieldError(field, "This field is required.");
      return false;
    }
    if (type === "email" && value && !EMAIL_RE.test(value)) {
      setFieldError(field, "Please enter a valid email address.");
      return false;
    }
    if (type === "phone" && value && value.replace(/\D/g, "").length < 7) {
      setFieldError(field, "Please enter a valid phone number.");
      return false;
    }
    clearFieldError(field);
    return true;
  };

  const collect = (form) => {
    const payload = {};
    $$("input, textarea", form).forEach((el) => {
      if (el.name) payload[el.name] = el.value.trim();
    });
    payload.form_source = form.getAttribute("data-source") || "Website";
    return payload;
  };

  const setStatus = (status, kind, text) => {
    if (!status) return;
    status.className = "form-status" + (kind ? " is-" + kind : "");
    status.textContent = text || "";
  };

  const form = $("#contact-form");
  if (form) {
    const fields = $$(".field", form);
    const status = $(".form-status", form);
    const button = $('button[type="submit"]', form);

    fields.forEach((field) => {
      const input = $("input, textarea", field);
      if (!input) return;
      input.addEventListener("input", () => {
        if (field.classList.contains("has-error")) validateField(field);
      });
      input.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      fields.forEach((field) => { if (!validateField(field)) valid = false; });
      setStatus(status, "", "");

      if (!valid) {
        setStatus(status, "error", "Please correct the highlighted fields and try again.");
        const firstError = $(".field.has-error input, .field.has-error textarea", form);
        if (firstError) firstError.focus();
        return;
      }

      const originalLabel = button ? button.textContent : "";
      if (button) { button.disabled = true; button.textContent = "Sending…"; }
      setStatus(status, "pending", "Sending your message…");

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(collect(form)),
      })
        .then((res) =>
          res.json().catch(() => ({})).then((body) => ({ ok: res.ok, body }))
        )
        .then((result) => {
          if (result.ok && result.body && result.body.ok) {
            setStatus(status, "success",
              (result.body && result.body.message) ||
              form.getAttribute("data-success") ||
              "Thank you! Your message has been sent.");
            form.reset();
          } else {
            setStatus(status, "error",
              (result.body && result.body.message) ||
              "Sorry, your message could not be sent. Please email info@maskoco.com or call +966 51 152 2501.");
          }
        })
        .catch(() => {
          setStatus(status, "error",
            "Network error — please email info@maskoco.com or call +966 51 152 2501.");
        })
        .finally(() => {
          if (button) { button.disabled = false; button.textContent = originalLabel; }
        });
    });
  }

  /* --------------------------------------- 8. Header shadow on scroll (a11y) */
  if (header) {
    const shadow = () =>
      header.style.setProperty(
        "box-shadow",
        window.scrollY > 8 ? "0 8px 24px rgba(20,45,80,.08)" : "none"
      );
    window.addEventListener("scroll", shadow, { passive: true });
    shadow();
  }
})();
