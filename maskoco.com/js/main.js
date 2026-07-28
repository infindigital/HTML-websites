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

  // Reflect the active language on load (active flag + RTL direction for Arabic).
  const reflect = () => {
    const cur = currentLang();
    $$(".lang button").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === cur));
    if (cur === "ar") {
      document.documentElement.setAttribute("lang", "ar");
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("lang", "en");
      document.documentElement.removeAttribute("dir");
    }
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
  const form = $("#contact-form");
  if (form) {
    const status = $(".form-status", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email;
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        status.textContent = "Please enter a valid email address.";
        status.style.color = "#e23";
        email.focus();
        return;
      }
      status.style.color = "";
      status.textContent = "Thank you — your message has been prepared. We'll be in touch shortly.";
      form.reset();
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
