/* Midwest Apostille & Notary: interactions.
   Progressive enhancement. All content is in the HTML; this file adds motion and
   interactivity. GSAP + ScrollTrigger are optional (CDN). Without them, or with
   prefers-reduced-motion, everything renders in its final, readable state.
   Motion hierarchy: hero high, section transitions medium, cards subtle,
   buttons micro, navigation very subtle, footer none. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = () => typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const motion = () => hasGsap() && !reduce;
  const svgNS = "http://www.w3.org/2000/svg";
  const EASE = "power3.out";
  // One motion system (mirrors the CSS tokens): micro 0.2s, UI 0.4s, reveal 0.8s, story 1.1s.
  const T = { micro: 0.2, ui: 0.4, reveal: 0.8, story: 1.1 };
  const mobile = () => window.matchMedia("(max-width: 1023px)").matches;
  // Runs fn on animation frames only while el is on screen; no scroll work elsewhere.
  function whileVisible(el, fn) {
    let on = false, ticking = false;
    const tick = () => { ticking = false; if (on) fn(); };
    addEventListener("scroll", () => { if (on && !ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
    addEventListener("resize", () => { if (on) fn(); }, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((en) => { on = en[0].isIntersecting; if (on) fn(); }, { rootMargin: "100px 0px" }).observe(el);
    } else { on = true; fn(); }
  }

  /* ------------------------------------------------------------------ header */
  function initHeader() {
    const header = $("[data-header]");
    const bar = $("[data-progress]");
    const action = $("[data-action-bar]");
    const reading = $("[data-reading]");
    const art = $("[data-article]");
    if (!header) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-solid", y > 16);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (action) action.classList.toggle("is-visible", y > innerHeight * 0.5);
      if (reading && art) {
        const r = art.getBoundingClientRect();
        const total = r.height - innerHeight * 0.6;
        reading.style.transform = `scaleX(${Math.max(0, Math.min(1, -r.top / Math.max(1, total)))})`;
      }
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();

    // Dropdowns: a real link plus a disclosure button; hover opens on fine pointers.
    const items = $$("[data-dropdown]");
    const setOpen = (it, open) => {
      it.classList.toggle("is-open", open);
      $(".nav__toggle", it).setAttribute("aria-expanded", String(open));
    };
    const closeAll = (except) => items.forEach((it) => { if (it !== except) setOpen(it, false); });
    items.forEach((it) => {
      const toggle = $(".nav__toggle", it);
      toggle.addEventListener("click", () => { const o = !it.classList.contains("is-open"); closeAll(it); setOpen(it, o); if (o) { const f = $(".dropdown a", it); if (f && toggle.matches(":focus-visible")) f.focus(); } });
      if (finePointer) {
        let t;
        it.addEventListener("mouseenter", () => { clearTimeout(t); closeAll(it); setOpen(it, true); });
        it.addEventListener("mouseleave", () => { t = setTimeout(() => setOpen(it, false), 160); });
      }
      it.addEventListener("focusout", (e) => { if (!it.contains(e.relatedTarget)) setOpen(it, false); });
      it.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && it.classList.contains("is-open")) { setOpen(it, false); toggle.focus(); }
        if (e.key === "ArrowDown" && document.activeElement === toggle) { e.preventDefault(); setOpen(it, true); const f = $(".dropdown a", it); if (f) f.focus(); }
      });
    });
    document.addEventListener("click", (e) => { if (!e.target.closest("[data-dropdown]")) closeAll(); });

    // Drawer (mobile menu): dialog with focus trap.
    const drawer = $("[data-drawer]");
    const openBtn = $("[data-menu-open]");
    const closeBtn = $("[data-menu-close]");
    if (!drawer || !openBtn) return;
    const focusables = () => $$("a, button, summary", drawer).filter((el) => el.offsetParent !== null);
    const open = () => {
      drawer.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add("is-open")));
      openBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      setTimeout(() => closeBtn.focus(), 60);
    };
    const close = (restore = true) => {
      drawer.classList.remove("is-open");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      setTimeout(() => { drawer.hidden = true; }, reduce ? 0 : 600);
      if (restore) openBtn.focus();
    };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", () => close());
    drawer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => close(false)));
  }

  /* ------------------------------------------------------------- text split */
  function splitWords(el) {
    if (el.dataset.splitDone) return [];
    el.dataset.splitDone = "1";
    const words = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement("span");
            w.className = "w";
            const inner = document.createElement("span");
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
            words.push(inner);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.matches("svg, br, .sr-only")) walk(child);
      });
    };
    walk(el);
    return words;
  }

  /* ---------------------------------------------------------------- reveals */
  function initReveals() {
    if (!motion()) return;
    const { gsap } = window;

    // Inner page hero: words rise, supporting copy follows, the photo opens from the bottom edge.
    $$('.phero [data-split="hero"]').forEach((h) => {
      gsap.from(splitWords(h), { yPercent: 105, duration: T.story, ease: "power4.out", stagger: 0.05, delay: 0.1 });
    });
    $$(".phero [data-hero-copy] > :not(h1)").forEach((el, i) => {
      gsap.from(el, { y: 14, opacity: 0, duration: T.reveal, ease: EASE, delay: 0.3 + i * 0.07 });
    });
    $$(".phero__mask").forEach((m) => {
      gsap.fromTo(m, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: T.story + 0.2, ease: "power4.inOut", delay: 0.2, clearProps: "clipPath" });
      gsap.from($("img", m), { scale: 1.15, duration: 1.6, ease: EASE, delay: 0.2 });
    });
    if ($(".phero__facts li")) gsap.from(".phero__facts li", { y: 12, opacity: 0, duration: T.reveal, ease: EASE, stagger: 0.08, delay: 0.6 });

    // Section headings: word rise on scroll (medium impact).
    $$("[data-split]:not([data-split='hero'])").forEach((h) => {
      gsap.from(splitWords(h), {
        yPercent: 100, duration: 0.9, ease: "power4.out", stagger: 0.035,
        scrollTrigger: { trigger: h, start: "top 88%", once: true },
      });
    });
    $$(".shead").forEach((s) => {
      const meta = $(".shead__meta", s), lead = $(".shead__lead", s);
      [meta, lead].filter(Boolean).forEach((el, i) => gsap.from(el, {
        y: 14, opacity: 0, duration: 0.8, ease: EASE, delay: i * 0.12,
        scrollTrigger: { trigger: s, start: "top 88%", once: true },
      }));
    });
    $$("[data-reveal]").forEach((el) => {
      gsap.from(el, { y: 24, opacity: 0, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: "top 86%", once: true } });
    });
    // Lists and rows: subtle.
    $$("[data-stagger]").forEach((wrap) => {
      gsap.from(Array.from(wrap.children).slice(0, 10), {
        y: 18, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.06,
        scrollTrigger: { trigger: wrap, start: "top 86%", once: true },
      });
    });
    // Image masks: the frame opens from the bottom edge, the photo settles.
    $$("[data-mask]").forEach((fig) => {
      const im = $("img", fig);
      const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 85%", once: true } });
      tl.fromTo(fig, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut", clearProps: "clipPath" });
      if (im && !im.hasAttribute("data-parallax")) tl.from(im, { scale: 1.2, duration: 1.6, ease: "power3.out" }, 0);
    });
    // Section entrances for the home compositions (one system: fade + 16px rise).
    $$(".stats__item, .sdir__row, .rb__step, .rb__out, .fbi__col, .nt__media, .nt__copy, .dp__copy, .dp__stack, .guide, .glist, .reviews__stage, .reviews__tabs").forEach((el) => {
      gsap.from(el, { y: 16, opacity: 0, duration: T.reveal, ease: EASE, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    // Chapter transition: the navy route chapter opens from the container edges to full bleed as it arrives.
    $$(".rb.section--navy").forEach((sec) => {
      gsap.fromTo(sec, { clipPath: "inset(0% 3% 0% 3%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "top 25%", scrub: 0.6 } });
    });
    // CTA headline.
    $$(".cta .label, .cta__row").forEach((el) => {
      gsap.from(el, { y: 20, opacity: 0, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
  }

  /* ------------------------------------------------------------ home hero
     Signature sequence: eyebrow, headline lines, copy, then the document is placed,
     filled, signed, sealed and stamped READY FOR INTERNATIONAL USE. */
  function initHero() {
    const led = $("[data-hero-art]");
    if (!led || !$(".hero")) return;
    const cells = $$("[data-ledger]", led), bar = $("[data-ledger-bar]", led);
    const light = (k) => cells.forEach((c, i) => c.classList.toggle("is-on", i <= k));
    if (!motion()) { light(cells.length - 1); return; }
    const { gsap } = window;
    const lines = $$(".ledger__sheet .pline", led), sig = $(".ledger__sig path", led);
    const seal = $(".ledger__seal", led), stamp = $(".ledger__stamp", led);
    const intro = gsap.timeline({ defaults: { ease: EASE } });
    intro.from(".hero__eyebrow", { opacity: 0, y: 10, duration: T.reveal }, 0.05)
      .from(".hero__display .hl > span", { yPercent: 110, duration: T.story, ease: "power4.out", stagger: 0.12 }, 0.15)
      .fromTo(".hero__base", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" }, 0.55)
      .from(".hero__intro > *", { opacity: 0, y: 16, duration: T.reveal, stagger: 0.1 }, 0.9);
    // The ledger plays the four stages in order: lines are written, the signature is drawn, the seal turns in, the stamp presses.
    const tl = gsap.timeline({ defaults: { ease: EASE }, onStart: () => led.classList.add("is-playing"), onComplete: () => led.classList.remove("is-playing") });
    tl.call(() => light(0), null, 0)
      .fromTo(bar, { "--lp": 0 }, { "--lp": 0.25, duration: 0.5, ease: "none" }, 0)
      .fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: T.ui, stagger: 0.08, ease: "power2.out" }, 0.05)
      .call(() => light(1), null, 0.6)
      .to(bar, { "--lp": 0.5, duration: 0.9, ease: "none" }, 0.6)
      .fromTo(sig, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" }, 0.6)
      .call(() => light(2), null, 1.55)
      .to(bar, { "--lp": 0.75, duration: 0.6, ease: "none" }, 1.55)
      .fromTo(seal, { opacity: 0, scale: 0.6, rotate: -90 }, { opacity: 1, scale: 1, rotate: 0, duration: T.reveal }, 1.55)
      .call(() => light(3), null, 2.25)
      .to(bar, { "--lp": 1, duration: 0.45, ease: "none" }, 2.25)
      .fromTo(stamp, { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.42, ease: "power4.in" }, 2.3);
    tl.pause();
    intro.add(tl.play(0), 1.4);
    led.addEventListener("click", () => { if (!tl.isActive()) tl.restart(); });
    // Scroll: the headline's two lines part slightly and the ledger lifts, so the page reads as layered paper.
    const st = { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 };
    gsap.to(".hero__display .hl:first-child > span", { xPercent: -4, ease: "none", scrollTrigger: st });
    gsap.to(".hero__display .hl:last-child > span", { xPercent: 5, ease: "none", scrollTrigger: st });
    gsap.to(seal, { rotate: 40, ease: "none", scrollTrigger: st });
  }

  /* ------------------------------------------------------------ stats count */
  function initStats() {
    const nums = $$("[data-count]");
    if (!nums.length || !motion() || !("IntersectionObserver" in window)) return;
    nums.forEach((el) => {
      const raw = el.dataset.count, n = parseInt(raw, 10), suffix = raw.replace(/^\d+/, "");
      const io = new IntersectionObserver((en) => {
        if (!en[0].isIntersecting) return;
        io.disconnect();
        const o = { v: 0 };
        window.gsap.to(o, { v: n, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
      }, { threshold: 0.6 });
      el.textContent = "0" + suffix;
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------ route builder */
  const RB_DOCS = {
    fbi: { name: "FBI report", fed: true, first: ["Your FBI report", "Existing Identity History Summary, or fingerprints taken by us"], mid: [["Package review", "DS-4194 checked against your report"]] },
    birth: { name: "Birth certificate", first: ["Certified copy", "Issued by the vital records office of the state of birth"], mid: [] },
    marriage: { name: "Marriage certificate", first: ["Certified copy", "Issued by the office that recorded the marriage"], mid: [] },
    diploma: { name: "Diploma or transcript", first: ["Notarized copy", "Usually certified by the school registrar before a notary"], mid: [] },
    poa: { name: "Power of attorney", first: ["Drafted for you", "Prepared in the format the receiving office expects"], mid: [["Notarization", "Signed before our notary: office, mobile or online"]] },
    business: { name: "Business document", first: ["Certified or notarized copy", "From the issuing office, or signed before a notary"], mid: [] },
  };
  const RB_PURPOSE = { visa: ["a visa", "consulate"], work: ["work", "employer or ministry"], study: ["study", "school"], marriage: ["a marriage", "civil registry"], immigration: ["immigration", "immigration office"], business: ["business", "receiving company or registry"] };
  const RB_DEST = { hague: "a Hague country", legal: "a non-Hague country", unsure: "a country you are not sure about" };

  function rbRoute(doc, dest) {
    const d = RB_DOCS[doc];
    const r = [d.first, ...d.mid];
    const sos = ["Secretary of State", "Certification in the state that issued or notarized the document"];
    const dos = ["U.S. Department of State", "Authentication by the Office of Authentications"];
    if (dest === "hague") r.push(d.fed ? ["U.S. Department of State apostille", "Issued by the Office of Authentications"] : ["Secretary of State apostille", "One certificate, accepted by every Hague member"]);
    else if (dest === "legal") {
      if (!d.fed) r.push(sos);
      r.push(dos, ["Embassy legalization", "By the destination embassy in Washington, DC"], ["Ministry of Foreign Affairs", "Final step in the destination country, where required"]);
    } else r.push(d.fed ? dos : sos, ["Apostille or embassy legalization", "We confirm the country's status before submitting"]);
    r.push(["Certified translation", "Spanish, Arabic or French, when the destination requires it"]);
    r.push(["Ready for international use", "Shipped back with tracking, or couriered abroad"]);
    return r;
  }

  function initRouteBuilder() {
    const root = $("[data-rb]");
    if (!root) return;
    const form = $("[data-rb-form]", root), list = $("[data-rb-route]", root), summary = $("[data-rb-summary]", root);
    const note = $("[data-rb-note]", root), stamp = $(".rb__stamp", root), country = $("[data-rb-country]", root), hint = $("[data-rb-hint]", root);
    const opts = new Map($$("#rb-countries option", root).map((o) => [o.value.toLowerCase(), o]));
    let countryName = "";
    const val = (n) => { const c = $(`input[name="${n}"]:checked`, form); return c ? c.value : ""; };
    const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const render = (animate) => {
      const doc = val("doc"), dest = val("dest"), purpose = val("purpose");
      const steps = rbRoute(doc, dest);
      list.innerHTML = steps.map(([t, d], i) => `<li class="rb__st${animate && !reduce ? " is-new" : ""}" style="--i:${i}"><span class="rb__dot"></span><strong>${t}</strong><span>${d}</span></li>`).join("");
      const where = countryName || RB_DEST[dest];
      summary.textContent = `${RB_DOCS[doc].name}, going to ${where}, for ${RB_PURPOSE[purpose][0]}.`;
      note.textContent = `Purpose: ${purpose}. We check what the receiving ${RB_PURPOSE[purpose][1]} asks for, and confirm every step with you before anything is submitted.`;
      if (animate && !reduce) {
        list.style.setProperty("--draw", "0");
        requestAnimationFrame(() => requestAnimationFrame(() => list.style.setProperty("--draw", "1")));
        stamp.classList.remove("is-press"); void stamp.offsetWidth; stamp.classList.add("is-press");
      }
    };
    form.addEventListener("change", (e) => { if (e.target.name === "dest") { countryName = ""; country.value = ""; hint.textContent = ""; } if (e.target.name) render(true); });
    form.addEventListener("submit", (e) => e.preventDefault());
    const match = (final) => {
      const v = country.value.trim();
      if (!v) { countryName = ""; hint.textContent = ""; render(true); return; }
      const o = opts.get(v.toLowerCase()) || (final ? Array.from(opts.values()).find((x) => x.value.toLowerCase().startsWith(v.toLowerCase())) : null);
      if (!o) { if (final) { hint.textContent = `${v.replace(/[<>&]/g, "")} is not on our lists. Choose "Not sure" and we will confirm.`; } return; }
      const hague = o.dataset.status === "hague";
      const radio = $(`input[name="dest"][value="${hague ? "hague" : "legal"}"]`, form);
      radio.checked = true;
      countryName = esc(o.value);
      hint.textContent = hague ? `${o.value} is a Hague Convention member: apostille.` : `${o.value} is not a Hague member: embassy legalization.`;
      render(true);
    };
    country.addEventListener("input", () => match(false));
    country.addEventListener("change", () => match(true));
    country.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); match(true); } });
    render(false);
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); render(true); } }, { threshold: 0.35 });
      io.observe(list);
    }
  }

  /* ------------------------------------------------------------ apostille process
     Desktop: one pinned stage, scroll moves through four states (the only pin on the page).
     Mobile: a vertical timeline, the small document above it follows the active step. */
  function initProcess() {
    const root = $("[data-proc]");
    if (!root) return;
    const pin = $("[data-proc-pin]", root), docEl = $("[data-proc-doc]", root), bar = $("[data-proc-bar]", root);
    const steps = $$("[data-proc-step]", root), track = $$("[data-proc-track] li", root), n = steps.length;
    let cur = -1;
    const set = (k) => {
      if (k === cur) return;
      cur = k;
      for (let i = 0; i < n; i++) docEl.classList.toggle(`is-${i}`, i <= k);
      steps.forEach((s, i) => s.classList.toggle("is-on", i === k));
      track.forEach((t, i) => t.classList.toggle("is-on", i <= k));
    };
    set(0);
    const desktop = () => !mobile();
    whileVisible(pin, () => {
      if (!desktop()) return;
      const r = pin.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, total)));
      if (bar) bar.style.setProperty("--p", p.toFixed(3));
      set(Math.min(n - 1, Math.floor(p * n * 0.999)));
    });
    // Phones: the document plays its four states once when it comes into view; then every step stays readable.
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => {
        if (!en[0].isIntersecting || desktop()) return;
        io.disconnect();
        const delay = reduce ? 0 : 900;
        for (let k = 1; k < n; k++) setTimeout(() => { if (!desktop()) set(k); }, delay * k);
        setTimeout(() => { if (!desktop()) steps.forEach((s) => s.classList.add("is-on")); }, delay * n);
      }, { threshold: 0.6 });
      io.observe(docEl);
    }
    // Track buttons jump to a stage.
    $$("[data-proc-go]", root).forEach((b) => b.addEventListener("click", () => {
      const k = +b.dataset.procGo;
      const r = pin.getBoundingClientRect();
      const total = r.height - innerHeight;
      scrollTo({ top: scrollY + r.top + total * ((k + 0.5) / n), behavior: reduce ? "auto" : "smooth" });
    }));
  }

  /* ------------------------------------------------------------ FBI paths */
  function initFbi() {
    const root = $("[data-fbi]");
    if (!root) return;
    const rows = $$("[data-fbi-row]", root), line = $("[data-fbi-line]", root);
    const cols = $$("[data-fbi-col]", root), picks = $$("[data-fbi-pick]", root);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-lit"); }), { rootMargin: "0px 0px -30% 0px" });
      rows.forEach((r) => io.observe(r));
    } else rows.forEach((r) => r.classList.add("is-lit"));
    if (line) whileVisible(root, () => {
      const r = $(".fbi__paths", root).getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.7 - r.top) / r.height));
      line.style.setProperty("--p", p.toFixed(3));
    });
    picks.forEach((b) => b.addEventListener("click", () => {
      const on = b.getAttribute("aria-pressed") !== "true";
      picks.forEach((x) => x.setAttribute("aria-pressed", String(x === b && on)));
      cols.forEach((c) => {
        c.classList.toggle("is-dim", on && c.dataset.fbiCol !== b.dataset.fbiPick);
        if (on && c.dataset.fbiCol === b.dataset.fbiPick) $$("[data-fbi-row]", c).forEach((r, i) => { r.classList.remove("is-lit"); setTimeout(() => r.classList.add("is-lit"), reduce ? 0 : 120 * i); });
      });
    }));
  }

  /* ------------------------------------------------------------ notary tabs + signing slip */
  function initNotary() {
    const root = $("[data-nt-root]");
    if (!root) return;
    const tabs = $$("[data-nt]", root), panels = $$("[data-np]", root), photos = $$("[data-nphoto]", root), slip = $("[data-nslip]", root);
    const sign = () => { if (!slip) return; slip.classList.remove("is-done"); void slip.offsetWidth; requestAnimationFrame(() => slip.classList.add("is-done")); };
    const select = (i, focus) => {
      tabs.forEach((t, k) => { const on = k === i; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
      panels.forEach((p, k) => { p.hidden = k !== i; });
      photos.forEach((p, k) => p.classList.toggle("is-on", k === i));
      if (focus) tabs[i].focus();
      sign();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        select((i + keys[e.key] + tabs.length) % tabs.length, true);
      });
    });
    if (slip && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); sign(); } }, { threshold: 0.5 });
      io.observe(slip);
    } else if (slip) slip.classList.add("is-done");
  }

  /* ------------------------------------------------------------ document preparation stack */
  function initDocPrep() {
    const root = $("[data-dp-root]");
    if (!root) return;
    const btns = $$("[data-dp]", root), sheets = $$("[data-dp-sheet]", root), n = sheets.length;
    const set = (a) => {
      sheets.forEach((s, i) => s.style.setProperty("--k", String(Math.min(4, (i - a + n) % n))));
      btns.forEach((b, i) => b.setAttribute("aria-pressed", String(i === a)));
    };
    btns.forEach((b, i) => {
      b.addEventListener("click", () => set(i));
      if (finePointer) b.addEventListener("mouseenter", () => set(i));
      b.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const k = (i + d + n) % n; set(k); btns[k].focus();
      });
    });
    set(0);
  }

  /* --------------------------------------------------------------- parallax */
  function initParallax() {
    if (!motion()) return;
    const { gsap } = window;
    $$("[data-parallax]").forEach((img) => {
      const wrap = img.parentElement;
      gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ---------------------------------------------------- service directory */
  function initServiceIndex() {
    $$("[data-sindex-root]").forEach((root) => {
      const rows = $$("[data-sindex-row]", root);
      const imgs = $$("[data-sindex-img]", root);
      const cap = $("[data-sindex-cap]", root), num = $("[data-sindex-num]", root), desc = $("[data-sindex-desc]", root);
      const frame = $("[data-sindex-frame]", root);
      let cur = -1;
      const set = (i) => {
        if (i === cur) return;
        cur = i;
        rows.forEach((r, k) => r.classList.toggle("is-on", k === i));
        imgs.forEach((im, k) => im.classList.toggle("is-on", k === i));
        if (cap) cap.textContent = $(".sdir__name", rows[i]).textContent;
        if (num) num.textContent = String(i + 1).padStart(2, "0");
        if (desc) { desc.textContent = $(".sdir__desc", rows[i]).textContent; desc.classList.remove("is-swap"); void desc.offsetWidth; desc.classList.add("is-swap"); }
      };
      rows.forEach((r, i) => {
        const a = $("a", r);
        a.addEventListener("mouseenter", () => set(i));
        a.addEventListener("focus", () => set(i));
      });
      // Subtle cursor depth on the preview (fine pointers only).
      if (frame && finePointer && !reduce) {
        frame.style.transition = "transform 600ms cubic-bezier(.2,.7,.2,1)";
        root.addEventListener("mousemove", (e) => {
          const r = root.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          frame.style.transform = `translate(${x * -10}px, ${y * -14}px)`;
        });
        root.addEventListener("mouseleave", () => { frame.style.transform = ""; });
      }
      set(0);
    });
  }

  /* ------------------------------------------------- Hague vs non-Hague tabs */
  function initRoutes() {
    $$("[data-routes]").forEach((root) => {
      const tabs = $$("[role=tab]", root);
      const panels = $$("[role=tabpanel]", root);
      const light = (panel) => {
        const items = $$(".stations__item", panel);
        items.forEach((it) => it.classList.remove("is-lit"));
        items.forEach((it, i) => setTimeout(() => it.classList.add("is-lit"), reduce ? 0 : 140 * i + 80));
      };
      const select = (tab, focus) => {
        tabs.forEach((t) => { const on = t === tab; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
        panels.forEach((p) => { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
        if (focus) tab.focus();
        const panel = $(`#${tab.getAttribute("aria-controls")}`);
        light(panel);
        if (motion()) window.gsap.from($$(".stations__item, .routes__foot", panel), { opacity: 0, y: 12, duration: 0.5, stagger: 0.06, ease: EASE });
      };
      tabs.forEach((t, i) => {
        t.addEventListener("click", () => select(t));
        t.addEventListener("keydown", (e) => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
          e.preventDefault();
          const k = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          select(tabs[k], true);
        });
      });
      // Light the first route when the section comes into view.
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); light(panels.find((p) => !p.hidden)); } }, { threshold: 0.3 });
        io.observe(root);
      } else panels.forEach(light);

      const input = $("[data-route-country]", root);
      const status = $("[data-route-status]", root);
      const opts = new Map($$("[data-route-list] option", root).map((o) => [o.value.toLowerCase(), o]));
      const initial = status.innerHTML;
      const check = (final) => {
        const v = input.value.trim();
        if (!v) { status.innerHTML = initial; return; }
        const o = opts.get(v.toLowerCase());
        if (!o) {
          if (final) status.innerHTML = `${v.replace(/[<>&]/g, "")} is not on our published lists. <a href="/contact-us/">Ask us</a> and we will confirm the route.`;
          return;
        }
        const hague = o.dataset.status === "hague";
        status.innerHTML = hague
          ? `<strong>${o.value}</strong> is a Hague Convention member. One apostille is enough.`
          : `<strong>${o.value}</strong> is not a Hague member. It needs embassy legalization.`;
        select(tabs.find((t) => t.dataset.tab === (hague ? "hague" : "legal")));
      };
      input.addEventListener("input", () => check(false));
      input.addEventListener("change", () => check(true));
    });
  }

  /* -------------------------------------------------------------- world map */
  let mapPromise;
  const loadMap = () => (mapPromise = mapPromise || fetch("/assets/img/world-map.svg").then((r) => (r.ok ? r.text() : Promise.reject(r.status))));
  function mountMaps() {
    const hosts = $$("[data-world-map]");
    if (!hosts.length) return;
    const mount = (host) => loadMap().then((text) => {
      if (host.dataset.mounted) return;
      host.dataset.mounted = "1";
      const tpl = document.createElement("template");
      tpl.innerHTML = text.trim();
      const svg = tpl.content.firstElementChild;
      host.insertBefore(svg, host.firstChild);
      if (host.dataset.worldMap === "hero") heroArcs(svg, host);
      if (host.dataset.worldMap === "legal") initLegal(svg, host);
      if (host.dataset.worldMap === "explorer") initExplorerMap(svg, host);
      if (motion()) window.gsap.from(svg, { opacity: 0, duration: 0.9, ease: "power2.out" });
    }).catch(() => { /* the map is progressive; the lists stay usable */ });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); mount(e.target); } }), { rootMargin: "500px" });
      hosts.forEach((h) => io.observe(h));
    } else hosts.forEach(mount);
  }
  const center = (svg, slug) => {
    const el = svg.querySelector(`[data-c="${slug}"]`);
    return el ? [parseFloat(el.dataset.cx), parseFloat(el.dataset.cy)] : null;
  };
  const arcPath = ([x1, y1], [x2, y2], lift = 0.3) => {
    const d = Math.hypot(x2 - x1, y2 - y1);
    return `M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 - d * lift} ${x2},${y2}`;
  };

  /* ------------------------------------------------ hero map: routes from Kansas City */
  const HERO_ROUTES = [
    ["spain", "Spain", "hague"], ["france", "France", "hague"], ["morocco", "Morocco", "hague"], ["india", "India", "hague"],
    ["philippines", "Philippines", "hague"], ["united-arab-emirates", "United Arab Emirates (UAE)", "legal"], ["mexico", "Mexico", "hague"],
    ["brazil", "Brazil", "hague"], ["south-korea", "Republic of Korea", "hague"], ["colombia", "Colombia", "hague"],
  ];
  function heroArcs(svg, host) {
    const origin = svg.dataset.kc.split(",").map(Number);
    const vb = svg.viewBox.baseVal;
    const g = document.createElementNS(svgNS, "g");
    const mk = (tag, attrs) => { const el = document.createElementNS(svgNS, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); return el; };
    const routes = [];
    HERO_ROUTES.forEach(([slug, name, status]) => {
      const c = center(svg, slug);
      if (!c) return;
      const arc = mk("path", { d: arcPath(origin, c, 0.3), class: "route-arc" });
      const node = mk("circle", { cx: c[0], cy: c[1], r: 2.6, class: "route-node" });
      const hit = mk("circle", { cx: c[0], cy: c[1], r: 12, class: "route-hit" });
      g.append(arc, node, hit);
      const land = svg.querySelector(`[data-c="${slug}"]`);
      if (land) land.classList.add("is-target");
      routes.push({ slug, name, status, c, arc, node, hit, land });
    });
    g.append(mk("circle", { cx: origin[0], cy: origin[1], r: 4, class: "route-origin" }), mk("circle", { cx: origin[0], cy: origin[1], r: 6, class: "route-pulse" }));
    svg.appendChild(g);

    // Tooltip: any country shows its name; destinations also show the route.
    const tip = document.createElement("div");
    tip.className = "map-tip";
    tip.setAttribute("aria-hidden", "true");
    host.appendChild(tip);
    const place = ([x, y]) => { tip.style.left = `${(x / vb.width) * 100}%`; tip.style.top = `${(y / vb.height) * 100}%`; };
    const label = (r) => `${r.name}<small>${r.status === "hague" ? "Hague member: apostille" : "Embassy legalization"}</small>`;
    let hot = null;
    const clear = () => { routes.forEach((r) => [r.arc, r.node, r.land].forEach((el) => el && el.classList.remove("is-hot"))); svg.querySelectorAll("[data-c].is-hot").forEach((el) => el.classList.remove("is-hot")); hot = null; };
    const light = (r, withTip = true) => {
      clear(); hot = r;
      [r.arc, r.node, r.land].forEach((el) => el && el.classList.add("is-hot"));
      if (withTip) { tip.innerHTML = label(r); place(r.c); tip.classList.add("is-on"); }
    };
    const bySlug = new Map(routes.map((r) => [r.slug, r]));
    let hovering = false;
    svg.addEventListener("pointerover", (e) => {
      const land = e.target.closest("[data-c]"), hit = e.target.closest(".route-hit");
      const r = hit ? routes.find((x) => x.hit === hit) : land ? bySlug.get(land.dataset.c) : null;
      hovering = true;
      if (r) { light(r); return; }
      if (land) {
        clear(); land.classList.add("is-hot");
        tip.textContent = land.dataset.n || ""; place([+land.dataset.cx, +land.dataset.cy]);
        tip.classList.toggle("is-on", !!tip.textContent);
      }
    });
    svg.addEventListener("pointerleave", () => { hovering = false; clear(); tip.classList.remove("is-on"); });
    // Click a destination: fill the route builder on the home page, or open the right service.
    svg.addEventListener("click", (e) => {
      const land = e.target.closest("[data-c]"), hit = e.target.closest(".route-hit");
      const r = hit ? routes.find((x) => x.hit === hit) : land ? bySlug.get(land.dataset.c) : null;
      if (!r) return;
      const input = $("[data-rb-country]");
      if (input) {
        input.value = r.name;
        input.dispatchEvent(new Event("change", { bubbles: true }));
        $("#route-builder").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      } else location.href = r.status === "hague" ? "/apostille-services/" : "/apostille-services/#embassy-legalization";
    });
    if (!motion()) return;
    routes.forEach((r, i) => {
      const len = r.arc.getTotalLength();
      window.gsap.fromTo(r.arc, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", delay: 0.3 + i * 0.12,
        onComplete: () => { r.arc.style.strokeDasharray = "3 5"; r.arc.style.strokeDashoffset = "0"; },
      });
    });
    const sec = host.closest("section");
    window.gsap.to(host, { yPercent: 8, ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: true } });
    // Idle cycle: one route at a time lights up, paused while the pointer is on the map or it is off screen.
    let k = 0, visible = true;
    if ("IntersectionObserver" in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(host);
    setTimeout(() => setInterval(() => {
      if (hovering || !visible || document.hidden) return;
      const r = routes[k++ % routes.length];
      light(r, !mobile());
    }, 2600), 3200);
    // Pointer depth on desktop.
    if (finePointer && !mobile() && sec) {
      sec.addEventListener("mousemove", (e) => {
        const b = sec.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
        svg.style.transform = `translate(${x * -18}px, ${y * -12}px)`;
      });
      sec.addEventListener("mouseleave", () => { svg.style.transform = ""; });
    }
  }

  /* --------------------------------------------------------- country explorer */
  function initExplorer() {
    $$("[data-explorer]").forEach((root) => {
      const search = $("[data-country-search]", root);
      const filters = $$("[data-filter]", root);
      const blocks = $$("[data-region-block]", root);
      const buttons = $$("[data-country]", root);
      const empty = $("[data-country-empty]", root);
      const count = $("[data-country-count]", root);
      const panel = $("[data-country-panel]", root);
      root._state = { region: "all", q: "" };
      const apply = () => {
        const { region, q } = root._state;
        let shown = 0;
        blocks.forEach((b) => {
          let visible = 0;
          $$("li", b).forEach((li) => {
            const btn = $("button", li);
            const ok = (region === "all" || btn.dataset.region === region) && btn.dataset.country.toLowerCase().includes(q);
            li.hidden = !ok;
            if (ok) visible++;
          });
          b.hidden = visible === 0;
          shown += visible;
        });
        empty.hidden = shown !== 0;
        count.textContent = `${shown} countries shown`;
        if (root._map) root._map.dim();
      };
      filters.forEach((f) => f.addEventListener("click", () => {
        filters.forEach((x) => { const on = x === f; x.classList.toggle("is-active", on); x.setAttribute("aria-pressed", String(on)); });
        root._state.region = f.dataset.filter;
        apply();
        if (motion()) window.gsap.from($$(".region:not([hidden])", root), { opacity: 0, y: 10, duration: 0.45, stagger: 0.05, ease: EASE });
      }));
      let t;
      search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { root._state.q = search.value.trim().toLowerCase(); apply(); }, 120); });
      const show = (btn, name) => {
        buttons.forEach((b) => b.classList.toggle("is-selected", b === btn));
        if (root._map) root._map.select(btn ? btn.dataset.slug : null);
        if (!btn) {
          panel.innerHTML = `<p class="record__status">Not on our lists</p><h3>${name}</h3>
            <p>This country is not on the published Hague or non-Hague lists on our site. Contact us and we will confirm whether an apostille or embassy legalization applies.</p>
            <a class="btn btn--secondary btn--sm" href="/contact-us/"><span class="btn__label">Contact us</span></a>`;
        } else if (btn.dataset.status === "hague") {
          const note = btn.querySelector("small");
          panel.innerHTML = `<p class="record__status is-hague">Hague member &middot; ${btn.dataset.region}</p><h3>${btn.dataset.country}</h3>
            ${note ? `<p><strong>${note.textContent.replace(/[()]/g, "")}</strong></p>` : ""}
            <p>One apostille is enough. No embassy legalization is required. Federal documents, like an FBI Identity History Summary, must be apostilled by the U.S. Department of State.</p>
            <dl><dt>Route</dt><dd>Apostille</dd><dt>Next step</dt><dd>Send us the document for review</dd></dl>
            <a class="btn btn--primary btn--sm" href="/apostille-services/"><span class="btn__label">Apostille services</span></a>`;
        } else {
          const uses = btn.dataset.uses ? `<dt>Common uses</dt><dd>${btn.dataset.uses.split("|").join(", ")}</dd>` : "";
          const rows = btn.dataset.embassy ? `<dt>Embassy</dt><dd>${btn.dataset.embassy}</dd>${btn.dataset.translation ? `<dt>Translation</dt><dd>${btn.dataset.translation}</dd>` : ""}<dt>Final step</dt><dd>${btn.dataset.final}</dd>${uses}` : "<dt>Route</dt><dd>Embassy legalization</dd>";
          panel.innerHTML = `<p class="record__status is-legal">Non-Hague &middot; Embassy legalization</p><h3>${btn.dataset.country}</h3>
            <p>An apostille is not accepted here. The document needs U.S. Department of State certification and consular legalization.</p><dl>${rows}</dl>
            <a class="btn btn--primary btn--sm" href="/fbi-attestation-legalization/"><span class="btn__label">Embassy legalization</span></a>`;
        }
        if (motion()) window.gsap.from(panel.children, { opacity: 0, y: 8, duration: 0.45, stagger: 0.04, ease: EASE });
      };
      root._show = show;
      buttons.forEach((b) => b.addEventListener("click", () => show(b)));
      apply();
    });
  }
  function initExplorerMap(svg, host) {
    const root = host.closest("[data-explorer]");
    if (!root) return;
    const tip = $("[data-map-tip]", host);
    const bySlug = new Map();
    $$("[data-country]", root).forEach((b) => { if (!bySlug.has(b.dataset.slug) || b.dataset.status === "hague") bySlug.set(b.dataset.slug, b); });
    const shapes = $$("[data-c]", svg);
    shapes.forEach((s) => { const b = bySlug.get(s.dataset.c); if (b) s.dataset.status = b.dataset.status; });
    root._map = {
      dim() {
        const { region, q } = root._state;
        shapes.forEach((s) => {
          const b = bySlug.get(s.dataset.c);
          if (!b) { s.classList.toggle("is-dim", region !== "all" || !!q); return; }
          s.classList.toggle("is-dim", !((region === "all" || b.dataset.region === region) && b.dataset.country.toLowerCase().includes(q)));
        });
      },
      select(slug) { shapes.forEach((s) => s.classList.toggle("is-selected", s.dataset.c === slug)); },
    };
    root._map.dim();
    const nameOf = (s) => { const b = bySlug.get(s.dataset.c); return b ? b.dataset.country : s.dataset.n || ""; };
    svg.addEventListener("mousemove", (e) => {
      const s = e.target.closest("[data-c]");
      if (!s) { tip.classList.remove("is-on"); return; }
      const r = host.getBoundingClientRect();
      tip.textContent = nameOf(s);
      tip.style.left = `${e.clientX - r.left}px`;
      tip.style.top = `${e.clientY - r.top}px`;
      tip.classList.toggle("is-on", !!tip.textContent);
    });
    svg.addEventListener("mouseleave", () => tip.classList.remove("is-on"));
    svg.addEventListener("click", (e) => {
      const s = e.target.closest("[data-c]");
      if (s) root._show(bySlug.get(s.dataset.c) || null, s.dataset.n);
    });
  }

  /* ------------------------------------------------ non-Hague legalization map */
  function initLegal(svg, host) {
    const root = host.closest("[data-legal]");
    const chips = $$("[data-legal-country]", root);
    const card = $("[data-legal-card]", root);
    const labels = $("[data-legal-labels]", host);
    const steps = $$("[data-legal-step]", root);
    const dc = svg.dataset.dc.split(",").map(Number);
    const vb = svg.viewBox.baseVal;
    const us = svg.querySelector('[data-c="united-states-of-america"]');
    if (us) us.classList.add("is-origin");
    const g = document.createElementNS(svgNS, "g");
    const mk = (tag, cls) => { const el = document.createElementNS(svgNS, tag); el.setAttribute("class", cls); return el; };
    const glow = mk("path", "legal__arc-glow"), arc = mk("path", "legal__arc");
    const o = mk("circle", "legal__pin legal__pin--origin"); o.setAttribute("cx", dc[0]); o.setAttribute("cy", dc[1]); o.setAttribute("r", 4);
    const pin = mk("circle", "legal__pin"); pin.setAttribute("r", 4.5);
    g.append(glow, arc, o, pin);
    svg.appendChild(g);
    const tagO = document.createElement("span"); tagO.className = "legal__tag"; tagO.textContent = "Washington, DC";
    const tagD = document.createElement("span"); tagD.className = "legal__tag";
    labels.append(tagO, tagD);
    const place = (tag, [x, y]) => { tag.style.left = `${(x / vb.width) * 100}%`; tag.style.top = `${(y / vb.height) * 100}%`; };
    place(tagO, dc);
    let prev;
    const select = (chip) => {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      if (prev) prev.classList.remove("is-target");
      prev = svg.querySelector(`[data-c="${chip.dataset.slug}"]`);
      if (prev) prev.classList.add("is-target");
      const c = center(svg, chip.dataset.slug);
      if (c) {
        const d = arcPath(dc, c, 0.35);
        arc.setAttribute("d", d); glow.setAttribute("d", d);
        pin.setAttribute("cx", c[0]); pin.setAttribute("cy", c[1]);
        tagD.textContent = chip.dataset.name;
        place(tagD, c);
        if (motion()) {
          const len = arc.getTotalLength();
          window.gsap.fromTo(arc, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" });
          window.gsap.fromTo(pin, { attr: { r: 0 } }, { attr: { r: 4.5 }, duration: 0.5, delay: 0.9, ease: "back.out(3)" });
        }
      }
      steps.forEach((s, i) => { s.classList.remove("is-active"); setTimeout(() => s.classList.add("is-active"), reduce ? 0 : 180 * i); });
      const tr = chip.dataset.translation;
      card.innerHTML = `<p class="record__status">Destination record</p><h3>${chip.dataset.name}</h3><dl><dt>Embassy</dt><dd>${chip.dataset.embassy}</dd>` +
        (tr ? `<dt>Translation</dt><dd>${tr}</dd>` : "") +
        `<dt>Final step</dt><dd>${chip.dataset.final}</dd><dt>Common uses</dt><dd>${chip.dataset.uses.split("|").join(", ")}</dd></dl>`;
      const emb = $("[data-legal-embassy]", root), fin = $("[data-legal-final]", root);
      if (emb) emb.textContent = `For ${chip.dataset.name}: ${chip.dataset.embassy}.`;
      if (fin) fin.textContent = `Final step: ${chip.dataset.final}.`;
    };
    chips.forEach((c) => c.addEventListener("click", () => select(c)));
    select(chips.find((c) => c.getAttribute("aria-pressed") === "true") || chips[0]);
  }

  /* ---------------------------------------------------------- FBI timeline */
  function initTimeline() {
    $$("[data-timeline]").forEach((root) => {
      const steps = $$("[data-tl-step]", root);
      const imgs = $$("[data-tl-img]", root);
      const bar = $("[data-tl-bar]", root);
      const list = $(".tl__list", root);
      const set = (i) => {
        steps.forEach((s, k) => s.classList.toggle("is-on", k <= i));
        imgs.forEach((im, k) => im.classList.toggle("is-on", k === i));
      };
      if (!("IntersectionObserver" in window)) { set(steps.length - 1); return; }
      const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) set(steps.indexOf(e.target)); }), { rootMargin: "-40% 0px -50% 0px" });
      steps.forEach((s) => io.observe(s));
      if (motion()) {
        window.ScrollTrigger.create({ trigger: list, start: "top 60%", end: "bottom 60%", onUpdate: (self) => bar.style.setProperty("--p", self.progress.toFixed(3)) });
      } else bar.style.setProperty("--p", "1");
    });
  }

  /* ---------------------------------------------------------- document stack */
  function initStack() {
    const stack = $("[data-stack]");
    if (!stack) return;
    const cards = $$("[data-stack-card]", stack);
    const btns = $$("[data-stack-btn]");
    const n = cards.length;
    const layout = (front) => {
      cards.forEach((c, i) => {
        const pos = (i - front + n) % n;
        const rot = [0, -3, 2.5, -5, 4][pos] ?? 0;
        const tx = [0, -10, 12, -18, 18][pos] ?? 0;
        c.style.zIndex = String(n - pos);
        c.style.opacity = pos > 4 ? "0" : "1";
        c.style.transform = `translate(${tx}px, ${pos * -6}px) rotate(${rot}deg) scale(${1 - Math.min(pos, 4) * 0.02})`;
        c.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
      });
      btns.forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.stackBtn === front)));
    };
    btns.forEach((b) => {
      b.addEventListener("click", () => layout(+b.dataset.stackBtn));
      if (finePointer) b.addEventListener("mouseenter", () => layout(+b.dataset.stackBtn));
    });
    layout(0);
  }

  /* ------------------------------------------------------------------ reviews */
  function initReviews() {
    const root = $("[data-reviews]");
    if (!root) return;
    const tabs = $$("[role=tab]", root);
    const panels = $$("[data-review]", root);
    const num = $("[data-review-num]", root);
    let i = 0;
    const show = (k, focus) => {
      i = (k + tabs.length) % tabs.length;
      tabs.forEach((t, n) => { const on = n === i; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
      panels.forEach((p, n) => { p.hidden = n !== i; p.classList.toggle("is-on", n === i); });
      num.textContent = String(i + 1).padStart(2, "0");
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, n) => {
      t.addEventListener("click", () => show(n));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); show(i + 1, true); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); show(i - 1, true); }
      });
    });
    $("[data-review-prev]", root).addEventListener("click", () => show(i - 1));
    $("[data-review-next]", root).addEventListener("click", () => show(i + 1));
  }

  /* ---------------------------------------------------------------- accordion */
  function initAccordions() {
    $$("[data-acc]").forEach((d) => {
      const summary = $("summary", d);
      const body = $(".acc__body", d);
      summary.addEventListener("click", (e) => {
        if (reduce || !body.animate) return;
        e.preventDefault();
        if (d.dataset.animating) return;
        d.dataset.animating = "1";
        if (!d.open) {
          d.open = true;
          const h = body.scrollHeight;
          body.animate([{ height: "0px", opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 450, easing: "cubic-bezier(.16,1,.3,1)" }).onfinish = () => { delete d.dataset.animating; };
        } else {
          const h = body.scrollHeight;
          body.animate([{ height: `${h}px`, opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 320, easing: "cubic-bezier(.65,0,.35,1)" }).onfinish = () => { d.open = false; delete d.dataset.animating; };
        }
      });
    });
  }

  /* ------------------------------------------------------- magnetic buttons */
  function initPointer() {
    if (!finePointer || reduce) return;
    $$("[data-magnetic]").forEach((m) => {
      m.addEventListener("mousemove", (e) => {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.14}px, ${(e.clientY - r.top - r.height / 2) * 0.24}px)`;
      });
      m.addEventListener("mouseleave", () => { m.style.transform = ""; });
    });
  }

  /* ------------------------------------------------------------ contact form */
  function initForm() {
    const form = $("[data-contact-form]");
    if (!form) return;
    const status = $("[data-form-status]", form);
    const validate = () => {
      let ok = true;
      $$("[required]", form).forEach((el) => {
        const field = el.closest(".field");
        const err = $(".field__error", field);
        if (!el.checkValidity()) {
          ok = false; field.setAttribute("data-invalid", ""); el.setAttribute("aria-invalid", "true");
          err.textContent = el.type === "email" && el.value ? "Enter a valid email address, for example name@example.com." : "This field is required.";
        } else { field.removeAttribute("data-invalid"); el.removeAttribute("aria-invalid"); err.textContent = ""; }
      });
      return ok;
    };
    $$("[required]", form).forEach((el) => el.addEventListener("blur", () => { if (el.value) validate(); }));
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      if (!validate()) { const bad = $("[aria-invalid=true]", form); if (bad) bad.focus(); return; }
      const btnEl = $("button[type=submit]", form);
      const label = btnEl.innerHTML;
      btnEl.disabled = true;
      btnEl.innerHTML = '<span class="btn__label">Sending…</span>';
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.message || "error");
        status.className = "form__status is-ok";
        status.textContent = data.message || "Thank you. Your message has been sent and we will get back to you shortly.";
        form.reset();
      } catch (err) {
        status.className = "form__status is-err";
        status.innerHTML = 'Sorry, your message could not be sent. Please call <a href="tel:+18164420295">816-442-0295</a> or email <a href="mailto:moservices.midwest@gmail.com">moservices.midwest@gmail.com</a>.';
      } finally {
        btnEl.disabled = false;
        btnEl.innerHTML = label;
        status.focus();
      }
    });
  }

  /* ---------------------------------------------------------------- article toc */
  function initToc() {
    const links = $$("[data-toc] a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((en) => en.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove("is-active"));
      const a = map.get(e.target.id);
      if (a) a.classList.add("is-active");
    }), { rootMargin: "-20% 0px -70% 0px" });
    map.forEach((_, id) => { const h = document.getElementById(id); if (h) io.observe(h); });
  }

  /* --------------------------------------------------------- page transitions */
  function initTransitions() {
    // Browsers with cross-document View Transitions use the CSS in site.css.
    if (reduce || "onpagereveal" in window) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      const main = $("#main");
      if (!main) return;
      e.preventDefault();
      main.style.transition = "opacity 180ms ease";
      main.style.opacity = "0";
      setTimeout(() => { location.href = url.href; }, 160);
    });
    addEventListener("pageshow", (e) => { if (e.persisted) { const m = $("#main"); if (m) m.style.opacity = ""; } });
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    initHeader();
    initExplorer();
    initRoutes();
    initServiceIndex();
    initRouteBuilder();
    initProcess();
    initFbi();
    initNotary();
    initDocPrep();
    initTimeline();
    initStack();
    initReviews();
    initAccordions();
    initForm();
    initToc();
    initPointer();
    initTransitions();
    mountMaps();
    if (hasGsap()) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.defaults({ duration: 0.7, ease: EASE });
    }
    initHero();
    initStats();
    initReveals();
    initParallax();
    // Hero content was held back by CSS only to avoid a flash before GSAP sets its start state.
    document.documentElement.classList.remove("motion-pending");
    if (hasGsap()) {
      addEventListener("load", () => window.ScrollTrigger.refresh());
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => window.ScrollTrigger.refresh());
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
