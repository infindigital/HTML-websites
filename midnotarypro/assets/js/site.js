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

    // Inner page hero: words rise, then the supporting copy.
    $$('.phero [data-split="hero"]').forEach((h) => {
      gsap.from(splitWords(h), { yPercent: 105, duration: 1, ease: "power4.out", stagger: 0.05, delay: 0.1 });
    });
    $$(".phero [data-hero-copy] > :not(h1)").forEach((el, i) => {
      gsap.from(el, { y: 16, opacity: 0, duration: 0.8, ease: EASE, delay: 0.3 + i * 0.07 });
    });
    if ($(".phero__card")) gsap.from(".phero__card", { y: 22, opacity: 0, duration: 0.8, ease: EASE, delay: 0.85 });
    if ($(".phero__frame")) gsap.from(".phero__frame", { x: -18, y: 18, opacity: 0, duration: 1, ease: EASE, delay: 0.45 });
    if ($(".phero__facts li")) gsap.from(".phero__facts li", { y: 14, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.08, delay: 0.7 });

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
    // CTA headline.
    $$(".cta .label, .cta__row").forEach((el) => {
      gsap.from(el, { y: 20, opacity: 0, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
  }

  /* --------------------------------------------------------------- home hero */
  function initHero() {
    const art = $("[data-hero-art]");
    if (!art || !motion()) return;
    const { gsap } = window;
    const inset = $("[data-hero-inset]", art);
    const cert = $("[data-hero-cert]", art), seal = $("[data-hero-seal]", art), sig = $(".acert__sig path", art);
    const display = $(".hero__display");
    const words = display ? splitWords(display) : [];
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    tl.from(".hero__label", { opacity: 0, y: 12, duration: 0.7 }, 0.05)
      .from(".hero__kicker", { opacity: 0, y: 12, duration: 0.7 }, 0.12)
      .from(words, { yPercent: 105, duration: 1.15, ease: "power4.out", stagger: 0.07 }, 0.2)
      .from([".hero__lead", ".hero__copy .btn-row"], { opacity: 0, y: 16, duration: 0.8, stagger: 0.09 }, 0.6)
      .fromTo(inset, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut" }, 0.75)
      .from(cert, { opacity: 0, y: 40, rotate: -7, duration: 1.2, ease: "power3.out" }, 0.95)
      .from($$(".acert__fields i", art), { scaleX: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }, 1.35)
      .fromTo(sig, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" }, 1.7)
      .from(seal, { opacity: 0, scale: 1.7, rotate: -40, duration: 0.55, ease: "back.out(2.4)" }, 2.25)
      .from(".hcheck", { opacity: 0, y: 16, duration: 0.8 }, 0.85)
      .from("[data-hero-status]", { opacity: 0, y: 30, duration: 0.9 }, 1.5)
      .from(".hero__facts li", { opacity: 0, y: 14, duration: 0.6, stagger: 0.07 }, 1.0)
      .from(".hsvc li", { opacity: 0, y: 18, duration: 0.6, stagger: 0.06 }, 1.2);
    const steps = $$(".hstatus__list li", art);
    steps.forEach((li) => li.classList.add("is-pending"));
    steps.forEach((li, i) => tl.call(() => { li.classList.remove("is-pending"); gsap.fromTo($(".icon", li), { scale: 0.4 }, { scale: 1, duration: 0.45, ease: "back.out(2.5)" }); }, null, 2.1 + i * 0.45));
    // Scroll-linked depth: three layers at different speeds.
    const st = { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 };
    gsap.to("[data-hero-status]", { y: -40, ease: "none", scrollTrigger: st });
    gsap.to(cert, { y: -70, rotate: -4, ease: "none", scrollTrigger: st });
    gsap.to(inset, { y: 36, ease: "none", scrollTrigger: st });
    gsap.to(seal, { rotate: 20, ease: "none", scrollTrigger: st });
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

  /* ------------------------------------------------------- document journey */
  function initJourney() {
    const root = $("[data-journey]");
    if (!root) return;
    const stage = $("[data-stage]", root);
    const chapters = $$("[data-chapter]", root);
    const rail = $$("[data-rail]", root);
    const num = $("[data-stage-num]", root), name = $("[data-stage-name]", root);
    const n = chapters.length;
    const set = (k) => {
      for (let i = 1; i <= n; i++) stage.classList.toggle(`is-${i}`, i <= k);
      chapters.forEach((c, i) => c.classList.toggle("is-on", i === k - 1));
      rail.forEach((r, i) => r.classList.toggle("is-on", i === k - 1));
      num.textContent = String(k).padStart(2, "0");
      name.textContent = $(".chapter__k", chapters[k - 1]).textContent;
    };
    if (!("IntersectionObserver" in window)) return; // stays in the complete (final) state
    set(1);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) set(+e.target.dataset.chapter); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    chapters.forEach((c) => io.observe(c));
    if (motion()) {
      window.gsap.from(stage, { opacity: 0, y: 30, duration: 1, ease: EASE, scrollTrigger: { trigger: root, start: "top 70%", once: true } });
    }
  }

  /* ---------------------------------------------------------- service index */
  function initServiceIndex() {
    $$("[data-sindex-root]").forEach((root) => {
      const rows = $$(".sindex__row", root);
      const imgs = $$("[data-sindex-img]", root);
      const cap = $("[data-sindex-cap]", root);
      const set = (i) => {
        rows.forEach((r, k) => r.classList.toggle("is-on", k === i));
        imgs.forEach((im, k) => im.classList.toggle("is-on", k === i));
        if (cap) cap.textContent = $(".sindex__name", rows[i]).textContent;
      };
      rows.forEach((r, i) => {
        const a = $("a", r);
        a.addEventListener("mouseenter", () => set(i));
        a.addEventListener("focus", () => set(i));
      });
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
      if (host.dataset.worldMap === "hero") heroArcs(svg);
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

  function heroArcs(svg) {
    const origin = svg.dataset.kc.split(",").map(Number);
    const targets = ["spain", "france", "morocco", "india", "philippines", "united-arab-emirates", "mexico", "brazil", "south-korea", "colombia"];
    const g = document.createElementNS(svgNS, "g");
    const mk = (tag, attrs) => { const el = document.createElementNS(svgNS, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); return el; };
    targets.forEach((t) => {
      const c = center(svg, t);
      if (!c) return;
      g.appendChild(mk("path", { d: arcPath(origin, c, 0.3), class: "route-arc" }));
      g.appendChild(mk("circle", { cx: c[0], cy: c[1], r: 2.6, class: "route-node" }));
    });
    g.append(mk("circle", { cx: origin[0], cy: origin[1], r: 4, class: "route-origin" }), mk("circle", { cx: origin[0], cy: origin[1], r: 6, class: "route-pulse" }));
    svg.appendChild(g);
    if (!motion()) return;
    $$(".route-arc", g).forEach((p, i) => {
      const len = p.getTotalLength();
      window.gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", delay: 0.3 + i * 0.12,
        onComplete: () => { p.style.strokeDasharray = "3 5"; p.style.strokeDashoffset = "0"; },
      });
    });
    window.gsap.to(svg, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ------------------------------------------------------ hero destination check */
  function initHeroCheck() {
    const form = $("[data-hcheck]");
    if (!form) return;
    const input = $("[data-hcheck-in]", form), out = $("[data-hcheck-out]", form);
    const opts = new Map($$("option", form).map((o) => [o.value.toLowerCase(), o]));
    const initial = out.innerHTML;
    const run = (final) => {
      const v = input.value.trim();
      out.className = "hcheck__out";
      if (!v) { out.innerHTML = initial; return; }
      const o = opts.get(v.toLowerCase()) || (final ? Array.from(opts.values()).find((x) => x.value.toLowerCase().startsWith(v.toLowerCase())) : null);
      if (!o) {
        if (final) out.innerHTML = `${v.replace(/[<>&]/g, "")} is not on our published lists. <a href="/contact-us/">Ask us</a> and we will confirm the route.`;
        return;
      }
      if (o.dataset.status === "hague") {
        out.classList.add("is-hague");
        out.innerHTML = `<strong>${o.value}</strong> is a Hague Convention member: you need an <a href="/apostille-services/">apostille</a>.`;
      } else {
        out.classList.add("is-legal");
        out.innerHTML = `<strong>${o.value}</strong> is not a Hague member: you need <a href="/apostille-services/#embassy-legalization">embassy legalization</a>.`;
      }
    };
    input.addEventListener("input", () => run(false));
    input.addEventListener("change", () => run(true));
    form.addEventListener("submit", (e) => { e.preventDefault(); run(true); });
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
      if (motion()) {
        const p = panels[i];
        window.gsap.fromTo($(".review__quote", p), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE });
        window.gsap.fromTo($(".review__by", p), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.2 });
      }
    };
    tabs.forEach((t, n) => {
      t.addEventListener("click", () => show(n));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); show(i + 1, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); show(i - 1, true); }
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
    initHeroCheck();
    initExplorer();
    initRoutes();
    initJourney();
    initServiceIndex();
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
