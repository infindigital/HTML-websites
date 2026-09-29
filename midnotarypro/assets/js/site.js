/* Midwest Apostille & Notary — interactions.
   Progressive enhancement: every piece of content is in the HTML; this file only
   adds motion and interactivity. GSAP + ScrollTrigger are optional (CDN); when
   they are missing, or prefers-reduced-motion is set, content renders statically. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = () => typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const motion = () => hasGsap() && !reduce;
  const svgNS = "http://www.w3.org/2000/svg";

  /* ------------------------------------------------------------------ header */
  function initHeader() {
    const header = $("[data-header]");
    const bar = $("[data-progress]");
    const action = $("[data-action-bar]");
    const reading = $("[data-reading]");
    if (!header) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-solid", y > 24);
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (action) action.classList.toggle("is-visible", y > innerHeight * 0.6);
      if (reading) {
        const art = $("[data-article]");
        if (art) {
          const r = art.getBoundingClientRect();
          const total = r.height - innerHeight * 0.6;
          reading.style.transform = `scaleX(${Math.max(0, Math.min(1, -r.top / Math.max(1, total)))})`;
        }
      }
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();

    // Dropdowns: click/keyboard disclosure, plus hover on fine pointers.
    const items = $$("[data-dropdown]");
    const close = (except) => items.forEach((it) => {
      if (it === except) return;
      it.classList.remove("is-open");
      const t = $(".nav__toggle", it);
      if (t) t.setAttribute("aria-expanded", "false");
    });
    items.forEach((it) => {
      const toggle = $(".nav__toggle", it);
      const set = (open) => { it.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open)); };
      toggle.addEventListener("click", (e) => { e.preventDefault(); const o = !it.classList.contains("is-open"); close(it); set(o); });
      if (finePointer) {
        let t;
        it.addEventListener("mouseenter", () => { clearTimeout(t); close(it); set(true); });
        it.addEventListener("mouseleave", () => { t = setTimeout(() => set(false), 180); });
      }
      it.addEventListener("focusout", (e) => { if (!it.contains(e.relatedTarget)) set(false); });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const open = items.find((i) => i.classList.contains("is-open"));
      if (open) { close(); $(".nav__toggle", open).focus(); }
    });
    document.addEventListener("click", (e) => { if (!e.target.closest("[data-dropdown]")) close(); });

    // Drawer
    const drawer = $("[data-drawer]");
    const openBtn = $("[data-menu-open]");
    const closeBtn = $("[data-menu-close]");
    if (!drawer || !openBtn) return;
    const focusables = () => $$("a, button, summary", drawer).filter((el) => el.offsetParent !== null);
    const openDrawer = () => {
      drawer.classList.add("is-open");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      setTimeout(() => closeBtn.focus(), 50);
    };
    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      openBtn.focus();
    };
    openBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    drawer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => { document.body.classList.remove("no-scroll"); }));
  }

  /* ------------------------------------------------------------- text split */
  function splitWords(el) {
    if (el.dataset.splitDone) return [];
    el.dataset.splitDone = "1";
    const words = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
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
        } else if (child.nodeType === 1 && !child.matches("svg")) {
          walk(child);
        }
      });
    };
    walk(el);
    return words;
  }

  /* ---------------------------------------------------------------- reveals */
  function initReveals() {
    if (!motion()) return;
    const { gsap } = window;
    const ease = "power3.out";

    // Hero heading: staggered word rise on load.
    $$('[data-split="hero"]').forEach((h) => {
      const words = splitWords(h);
      gsap.from(words, { yPercent: 110, opacity: 0, duration: 0.8, ease, stagger: 0.045, delay: 0.1 });
    });
    $$("[data-hero-copy] > :not(h1)").forEach((el, i) => {
      gsap.from(el, { y: 18, opacity: 0, duration: 0.7, ease, delay: 0.35 + i * 0.08 });
    });

    // Section headings: word reveal on scroll.
    $$("[data-split]:not([data-split='hero'])").forEach((h) => {
      const words = splitWords(h);
      gsap.from(words, {
        yPercent: 100, opacity: 0, duration: 0.7, ease, stagger: 0.03,
        scrollTrigger: { trigger: h, start: "top 88%", once: true },
      });
    });

    $$("[data-reveal]").forEach((el) => {
      gsap.from(el, { y: 28, opacity: 0, duration: 0.8, ease, scrollTrigger: { trigger: el, start: "top 86%", once: true } });
    });

    $$("[data-stagger]").forEach((wrap) => {
      const kids = Array.from(wrap.children);
      gsap.from(kids, {
        y: 34, opacity: 0, duration: 0.7, ease, stagger: 0.08,
        scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
      });
    });

    $$(".eyebrow").forEach((el) => {
      if (el.closest("[data-hero-copy]")) return;
      gsap.from(el, { x: -14, opacity: 0, duration: 0.6, ease, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    // Icon badges in the trust strip "pop" in.
    $$("[data-icon-pop]").forEach((el, i) => {
      gsap.from(el, { scale: 0.6, rotate: -20, opacity: 0, duration: 0.6, ease: "back.out(1.7)", delay: i * 0.06,
        scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
  }

  /* --------------------------------------------------------------- parallax */
  function initParallax() {
    if (!motion()) return;
    const { gsap } = window;
    $$("[data-parallax]").forEach((img) => {
      const wrap = img.closest("[data-parallax-wrap]") || img.parentElement;
      gsap.fromTo(img, { yPercent: -6, scale: 1.08 }, {
        yPercent: 6, scale: 1, ease: "none",
        scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    $$("[data-parallax-bg]").forEach((bg) => {
      gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: bg.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$("[data-parallax-img]").forEach((el) => {
      gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    // Subtle zoom-in of media frames as they enter.
    $$(".media-frame img, .post-card__media img").forEach((el) => {
      gsap.from(el, { scale: 1.12, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    const lines = $("[data-cta-lines]");
    if (lines) {
      $$("path", lines).forEach((p, i) => {
        gsap.fromTo(p, { attr: { transform: "translate(0 0)" } }, {
          attr: { transform: `translate(${i % 2 ? -60 : 60} 0)` }, ease: "none",
          scrollTrigger: { trigger: lines.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }
  }

  /* --------------------------------------------------------------- counters */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target;
        const end = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(end * e));
          if (p < 1) requestAnimationFrame(step);
        };
        el.textContent = "0";
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  /* -------------------------------------------------------------- world map */
  let mapPromise;
  function loadMap() {
    if (!mapPromise) {
      mapPromise = fetch("/assets/img/world-map.svg").then((r) => (r.ok ? r.text() : Promise.reject(r.status)));
    }
    return mapPromise;
  }
  function mountMaps() {
    const hosts = $$("[data-world-map]");
    if (!hosts.length) return;
    const go = () => loadMap().then((text) => {
      hosts.forEach((host) => {
        if (host.dataset.mounted) return;
        host.dataset.mounted = "1";
        const tpl = document.createElement("template");
        tpl.innerHTML = text.trim();
        const svg = tpl.content.firstElementChild;
        host.insertBefore(svg, host.firstChild);
        const kind = host.dataset.worldMap;
        if (kind === "hero") heroArcs(svg);
        if (kind === "legal") initLegal(svg, host);
        if (kind === "explorer") initExplorerMap(svg, host);
      });
    }).catch(() => { /* map is decorative/progressive; lists remain usable */ });
    // Defer until near the viewport (hero is immediate).
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { io.disconnect(); go(); } }, { rootMargin: "600px" });
      hosts.forEach((h) => io.observe(h));
    } else go();
  }
  const center = (svg, slug) => {
    const el = svg.querySelector(`[data-c="${slug}"]`);
    return el ? [parseFloat(el.dataset.cx), parseFloat(el.dataset.cy)] : null;
  };
  const arcPath = ([x1, y1], [x2, y2], lift = 0.28) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const d = Math.hypot(x2 - x1, y2 - y1);
    return `M${x1},${y1} Q${mx},${my - d * lift} ${x2},${y2}`;
  };
  function heroArcs(svg) {
    const origin = svg.dataset.kc.split(",").map(Number);
    const targets = ["spain", "france", "morocco", "india", "philippines", "united-arab-emirates", "mexico", "brazil", "south-korea"];
    const g = document.createElementNS(svgNS, "g");
    targets.forEach((t) => {
      const c = center(svg, t);
      if (!c) return;
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", arcPath(origin, c, 0.3));
      p.setAttribute("class", "route-arc");
      g.appendChild(p);
      const n = document.createElementNS(svgNS, "circle");
      n.setAttribute("cx", c[0]); n.setAttribute("cy", c[1]); n.setAttribute("r", 2.6); n.setAttribute("class", "route-node");
      g.appendChild(n);
    });
    const o = document.createElementNS(svgNS, "circle");
    o.setAttribute("cx", origin[0]); o.setAttribute("cy", origin[1]); o.setAttribute("r", 4); o.setAttribute("class", "route-origin");
    const pulse = document.createElementNS(svgNS, "circle");
    pulse.setAttribute("cx", origin[0]); pulse.setAttribute("cy", origin[1]); pulse.setAttribute("r", 6); pulse.setAttribute("class", "route-pulse");
    g.append(o, pulse);
    svg.appendChild(g);
    if (motion()) {
      $$(".route-arc", g).forEach((p, i) => {
        const len = p.getTotalLength();
        window.gsap.fromTo(p, { strokeDasharray: `${len}`, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.4 + i * 0.12,
            onComplete: () => { p.style.strokeDasharray = "3 5"; p.style.strokeDashoffset = "0"; } });
      });
      window.gsap.to(svg, { yPercent: 6, ease: "none", scrollTrigger: { trigger: svg.closest("section"), start: "top top", end: "bottom top", scrub: true } });
    }
  }

  /* ------------------------------------------------------ hero route preview */
  const HERO_ROUTES = {
    fbi: {
      steps: ["FBI report", "Package review", "U.S. Dept. of State", "Apostille or legalization"],
      note: 'Because an FBI background check is a federal document, it must be apostilled by the U.S. Department of State — not a state Secretary of State. <a class="text-link" href="/fbi-apostille-for-hague-countries/">Hague countries</a> · <a class="text-link" href="/fbi-attestation-legalization/">Non-Hague countries</a>',
    },
    birth: {
      steps: ["Certified copy", "Secretary of State", "Apostille"],
      note: 'Certified vital records (birth, marriage, etc.) do not need to be notarized — they are submitted as originals. <a class="text-link" href="/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/">Apostille guide</a>',
    },
    federal: {
      steps: ["Federal document", "U.S. Dept. of State", "Apostille"],
      note: 'Only the U.S. Department of State Office of Authentications can apostille federal documents. State-level apostilles are not accepted. <a class="text-link" href="/fbi-apostille-for-hague-countries/">Learn more</a>',
    },
    diploma: {
      steps: ["Custodian statement", "Notarization", "Secretary of State", "Apostille"],
      note: 'A custodian of record document is a notarized declaration that verifies a copy is a true and accurate reproduction of the original — often used for diplomas. <a class="text-link" href="/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/">Custodian certification</a>',
    },
    poa: {
      steps: ["Notarization", "Secretary of State", "Apostille"],
      note: 'Do I need a notary for an apostille? Only for documents like POAs or affidavits. <a class="text-link" href="/document-preparation-services/">Power of Attorney preparation</a>',
    },
    notarized: {
      steps: ["Notarized document", "Secretary of State", "Apostille / legalization"],
      note: 'Our team ensures that your document is either notarized and certified by the Secretary of State, or submitted as a certified vital record (no notary needed). <a class="text-link" href="/apostille-services/">Apostille Services</a>',
    },
  };
  function initHeroRoute() {
    const panel = $("[data-hero-route]");
    if (!panel) return;
    const stepsEl = $("[data-hr-steps]", panel);
    const noteEl = $("[data-hr-note]", panel);
    const chips = $$("[data-doc]", panel);
    const show = (key) => {
      const r = HERO_ROUTES[key];
      if (!r) return;
      stepsEl.innerHTML = r.steps.map((s) => `<li>${s}</li>`).join("");
      noteEl.innerHTML = r.note;
      if (motion()) {
        window.gsap.from($$("li", stepsEl), { opacity: 0, x: -8, duration: 0.4, stagger: 0.06, ease: "power2.out" });
        window.gsap.from(noteEl, { opacity: 0, y: 6, duration: 0.45, ease: "power2.out" });
      }
    };
    let current = "fbi";
    chips.forEach((c) => {
      c.addEventListener("click", () => {
        chips.forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
        current = c.dataset.doc;
        show(current);
      });
      if (finePointer) {
        c.addEventListener("mouseenter", () => show(c.dataset.doc));
        c.addEventListener("mouseleave", () => show(current));
      }
    });
  }

  /* ------------------------------------------------------ route finder */
  const DOC_LABEL = {
    fbi: "FBI Background Check", birth: "Birth / Marriage Certificate", federal: "Federal Document",
    diploma: "Diploma / Transcript", poa: "Power of Attorney", notarized: "Notarized Document", unsure: "Your document",
  };
  function routeFor(doc, dest, country) {
    const federal = doc === "fbi" || doc === "federal";
    const r = {};
    r.document = ["required", {
      fbi: "FBI Identity History Summary — use your existing report or we capture your fingerprints and obtain it for you.",
      birth: "Certified copy of the vital record (for example, from MO Vital Records).",
      federal: "A document issued by a U.S. federal agency.",
      diploma: "School transcripts & diplomas — often processed with a custodian of record statement.",
      poa: "Power of Attorney (General, Durable, Medical) — we can help prepare and format it.",
      notarized: "A notarized document, such as an affidavit or declaration.",
      unsure: "Tell us what document you have — we review the route before you send anything.",
    }[doc]];
    if (["poa", "notarized", "diploma"].includes(doc)) {
      r.notarization = ["required", doc === "diploma"
        ? "The custodian (holder of the document) signs a sworn statement that is notarized."
        : "Required for documents like POAs or affidavits. Mobile, in-office, or remote online notarization."];
    } else if (doc === "unsure") {
      r.notarization = ["optional", "Only for documents like POAs or affidavits. Certified vital records do not need to be notarized."];
    } else {
      r.notarization = ["skip", federal ? "Not needed — federal documents go to the U.S. Department of State." : "Not needed — certified vital records are submitted as originals."];
    }
    if (federal) {
      r.authentication = ["required", "U.S. Department of State Office of Authentications — not a state Secretary of State."];
    } else if (dest === "nonhague") {
      r.authentication = ["required", "Secretary of State certification, followed by U.S. Department of State certification."];
    } else {
      r.authentication = ["required", "Certified by the Secretary of State."];
    }
    if (dest === "hague") {
      r.apostille = ["required", "Apostille — a single certificate recognized in Hague Apostille Convention member countries. No embassy legalization required."];
    } else if (dest === "nonhague") {
      r.apostille = ["required", "Embassy (consular) legalization — an apostille alone is not accepted." +
        (doc === "fbi" ? " Then final Ministry of Foreign Affairs (MOFA) attestation in-country." : "") +
        (country && country.embassy ? ` Embassy: ${country.embassy}.` : "")];
    } else {
      r.apostille = ["optional", "Apostille for Hague member countries, or embassy legalization for non-Hague countries."];
    }
    if (country && country.translation) {
      r.translation = ["required", `${country.translation}. We coordinate certified translation in parallel.`];
    } else {
      r.translation = ["optional", "Certified translation assistance — Spanish, Arabic, and French — if your destination requires it."];
    }
    r.delivery = ["required", "Priority shipping and return tracking. FedEx and DHL international return shipping available upon request."];
    return r;
  }
  function countryIndex() {
    const idx = new Map();
    $$("[data-explorer] [data-country]").forEach((b) => {
      idx.set(b.dataset.country.toLowerCase(), {
        name: b.dataset.country, status: b.dataset.status, embassy: b.dataset.embassy, translation: b.dataset.translation,
      });
    });
    $$("[data-legal-country]").forEach((b) => {
      const k = b.dataset.name.toLowerCase();
      const cur = idx.get(k) || { name: b.dataset.name, status: "legalization" };
      cur.embassy = cur.embassy || b.dataset.embassy;
      cur.translation = cur.translation || b.dataset.translation || undefined;
      idx.set(k, cur);
    });
    return idx;
  }
  function radioGroup(group, onChange) {
    const btns = $$("[role=radio]", group);
    const select = (b, focus) => {
      btns.forEach((x) => { const on = x === b; x.setAttribute("aria-checked", String(on)); x.tabIndex = on ? 0 : -1; });
      if (focus) b.focus();
      onChange(b);
    };
    btns.forEach((b, i) => {
      b.addEventListener("click", () => select(b));
      b.addEventListener("keydown", (e) => {
        const k = e.key;
        if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(k)) return;
        e.preventDefault();
        const d = k === "ArrowRight" || k === "ArrowDown" ? 1 : -1;
        select(btns[(i + d + btns.length) % btns.length], true);
      });
    });
    return { set: (b) => select(b), btns };
  }
  function initFinder() {
    const root = $("[data-finder]");
    if (!root) return;
    const state = { doc: "fbi", dest: "hague", purpose: "Residency Visas", country: null };
    const idx = countryIndex();
    const list = $("[data-fcountry-list]", root);
    if (list) list.innerHTML = Array.from(idx.values()).map((c) => `<option value="${c.name.replace(/"/g, "&quot;")}">`).join("");
    const title = $("[data-route-title]", root);
    const summary = $("[data-route-summary]", root);
    const nodes = $$("[data-node]", root);
    const status = $("[data-fcountry-status]", root);
    const render = () => {
      const r = routeFor(state.doc, state.dest, state.country);
      const destLabel = state.country ? state.country.name
        : { hague: "Hague member country", nonhague: "Non-Hague country", unsure: "Destination to confirm" }[state.dest];
      title.textContent = `${DOC_LABEL[state.doc]} → ${destLabel}`;
      summary.textContent = `Purpose: ${state.purpose}`;
      nodes.forEach((n, i) => {
        const [st, detail] = r[n.dataset.node];
        n.dataset.state = st;
        $("[data-badge]", n).textContent = { required: "Required", optional: "If needed", skip: "Not needed" }[st];
        $("[data-detail]", n).textContent = detail;
        n.classList.remove("is-lit");
        if (reduce) n.classList.add("is-lit");
        else setTimeout(() => n.classList.add("is-lit"), 90 * i + 60);
      });
      if (motion()) {
        window.gsap.from($$(".route__dot", root), { scale: 0.7, duration: 0.5, ease: "back.out(2)", stagger: 0.07 });
        window.gsap.from($$(".route__detail", root), { opacity: 0, y: 6, duration: 0.45, stagger: 0.05, ease: "power2.out" });
      }
    };
    const docs = radioGroup($('[aria-label="Document type"]', root), (b) => { state.doc = b.dataset.fdoc; render(); });
    const dests = radioGroup($('[aria-label="Destination type"]', root), (b) => {
      state.dest = b.dataset.fdest;
      if (!state.country || (state.country.status === "hague") !== (state.dest === "hague")) { state.country = null; input.value = ""; status.textContent = ""; }
      render();
    });
    radioGroup($('[aria-label="Purpose"]', root), (b) => { state.purpose = b.textContent.trim(); render(); });
    const input = $("[data-fcountry]", root);
    const onCountry = () => {
      const c = idx.get(input.value.trim().toLowerCase());
      if (!input.value.trim()) { state.country = null; status.textContent = ""; render(); return; }
      if (!c) {
        state.country = null;
        status.innerHTML = "Not on our published lists — we will confirm whether an apostille or embassy legalization applies.";
        dests.set(dests.btns.find((b) => b.dataset.fdest === "unsure"));
        return;
      }
      state.country = c;
      const hague = c.status === "hague";
      status.innerHTML = hague ? `<strong>${c.name}</strong> is on the Hague Apostille Convention list.`
        : `<strong>${c.name}</strong> is a non-Hague country — embassy legalization is required.`;
      dests.set(dests.btns.find((b) => b.dataset.fdest === (hague ? "hague" : "nonhague")));
      state.country = c;
      render();
    };
    input.addEventListener("change", onCountry);
    input.addEventListener("input", () => { if (idx.has(input.value.trim().toLowerCase())) onCountry(); });
    render();
    void docs;
  }

  /* ------------------------------------------------------- apostille story */
  function initStory() {
    const root = $("[data-story]");
    if (!root) return;
    const steps = $$("[data-story-step]", root);
    const names = ["Document", "Authentication", "Apostille", "International Use"];
    const paper = $("[data-paper]", root), stamp = $("[data-stamp]", root), sheet = $("[data-apostille]", root),
      globe = $("[data-globe]", root), label = $("[data-story-label]", root), name = $("[data-story-name]", root);
    const g = motion() ? window.gsap : null;
    const setStage = (i) => {
      steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
      label.textContent = String(i + 1).padStart(2, "0");
      name.textContent = names[i];
      const stampOn = i >= 1, sheetOn = i >= 2, globeOn = i >= 3;
      if (g) {
        g.to(stamp, { opacity: stampOn ? 1 : 0, scale: stampOn ? 1 : 1.4, rotate: -14, duration: stampOn ? 0.45 : 0.3, ease: stampOn ? "back.out(2.2)" : "power2.in" });
        g.to(sheet, { opacity: sheetOn ? 1 : 0, x: sheetOn ? "0%" : "18%", y: sheetOn ? "0%" : "10%", rotate: sheetOn ? 2 : 4, duration: 0.7, ease: "power3.out" });
        g.to(paper, { rotate: i >= 2 ? -3 : 0, x: i >= 2 ? "-4%" : "0%", duration: 0.7, ease: "power3.out" });
        g.to(globe, { opacity: globeOn ? 1 : 0, scale: globeOn ? 1 : 0.6, duration: 0.6, ease: globeOn ? "back.out(1.8)" : "power2.in" });
        g.to(root.querySelector(".story__canvas"), { y: globeOn ? -10 : 0, duration: 0.7, ease: "power3.out" });
      } else {
        stamp.style.opacity = stampOn ? 1 : 0; stamp.style.transform = "rotate(-14deg)";
        sheet.style.opacity = sheetOn ? 1 : 0; sheet.style.transform = sheetOn ? "rotate(2deg)" : "";
        globe.style.opacity = globeOn ? 1 : 0; globe.style.transform = globeOn ? "none" : "";
      }
    };
    if (!("IntersectionObserver" in window)) { setStage(3); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setStage(steps.indexOf(e.target)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
    setStage(0);
  }

  /* ---------------------------------------------------------- FBI timeline */
  function initTimeline() {
    $$("[data-timeline]").forEach((root) => {
      const steps = $$("[data-tl-step]", root);
      const imgs = $$("[data-tl-img]", root);
      const meter = $$(".timeline__meter span", root);
      const caption = $("[data-tl-caption]", root);
      const progress = $("[data-tl-progress]", root);
      const set = (i) => {
        steps.forEach((s, k) => s.classList.toggle("is-active", k <= i));
        imgs.forEach((im, k) => im.classList.toggle("is-active", k === i));
        meter.forEach((m, k) => m.classList.toggle("is-on", k <= i));
        caption.textContent = $("h3", steps[i]).textContent;
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) set(steps.indexOf(e.target)); }),
          { rootMargin: "-40% 0px -50% 0px" });
        steps.forEach((s) => io.observe(s));
      }
      if (motion() && progress) {
        window.gsap.to(progress, { scaleY: 1, ease: "none",
          scrollTrigger: { trigger: $(".timeline__list", root), start: "top 60%", end: "bottom 60%", scrub: true } });
      } else if (progress) progress.style.transform = "scaleY(1)";
    });
  }

  /* ------------------------------------------------ non-Hague legalization */
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
    const glow = document.createElementNS(svgNS, "path"); glow.setAttribute("class", "legal__arc-glow");
    const arc = document.createElementNS(svgNS, "path"); arc.setAttribute("class", "legal__arc");
    const o = document.createElementNS(svgNS, "circle"); o.setAttribute("class", "legal__pin legal__pin--origin");
    o.setAttribute("cx", dc[0]); o.setAttribute("cy", dc[1]); o.setAttribute("r", 4);
    const pin = document.createElementNS(svgNS, "circle"); pin.setAttribute("class", "legal__pin"); pin.setAttribute("r", 4.5);
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
      const slug = chip.dataset.slug;
      if (prev) prev.classList.remove("is-target");
      prev = svg.querySelector(`[data-c="${slug}"]`);
      if (prev) prev.classList.add("is-target");
      const c = center(svg, slug);
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
          window.gsap.fromTo(steps.map((s) => $(".legal__step-n", s)), { scale: 0.85 }, { scale: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" });
        }
        steps.forEach((s, i) => { setTimeout(() => s.classList.add("is-active"), reduce ? 0 : 200 * i); });
      }
      const tr = chip.dataset.translation;
      card.innerHTML = `<h3>${chip.dataset.name}</h3><dl><dt>Embassy</dt><dd>${chip.dataset.embassy}</dd>` +
        (tr ? `<dt>Translation</dt><dd>${tr}</dd>` : "") +
        `<dt>Final In-Country Step</dt><dd>${chip.dataset.final}</dd><dt>Common Uses</dt><dd>${chip.dataset.uses.split("|").join(", ")}</dd></dl>`;
      const emb = $("[data-legal-embassy]", root), fin = $("[data-legal-final]", root);
      if (emb) emb.textContent = `For ${chip.dataset.name}: ${chip.dataset.embassy}.`;
      if (fin) fin.textContent = `Final step: ${chip.dataset.final}.`;
    };
    chips.forEach((c) => c.addEventListener("click", () => select(c)));
    const first = chips.find((c) => c.getAttribute("aria-pressed") === "true") || chips[0];
    if (first) select(first);
  }

  /* -------------------------------------------------- horizontal "why" track */
  function initHScroll() {
    $$("[data-hscroll-section]").forEach((sec) => {
      const wrap = $("[data-hscroll]", sec);
      const track = $("[data-hs-track]", sec);
      const bar = $("[data-hs-bar]", sec);
      const prev = $("[data-hs-prev]", sec), next = $("[data-hs-next]", sec);
      const card = () => track.firstElementChild.getBoundingClientRect().width + 20;
      const pinned = () => wrap.classList.contains("is-pinned");
      const nativeBar = () => {
        const max = track.scrollWidth - track.clientWidth;
        bar.style.transform = `scaleX(${max > 0 ? Math.max(0.1, track.scrollLeft / max) : 1})`;
      };
      track.addEventListener("scroll", nativeBar, { passive: true });
      nativeBar();
      let st;
      const scrollByCard = (dir) => {
        if (pinned() && st) {
          const step = (st.end - st.start) / (track.children.length - 1);
          window.scrollTo({ top: window.scrollY + dir * step, behavior: reduce ? "auto" : "smooth" });
        } else track.scrollBy({ left: dir * card(), behavior: reduce ? "auto" : "smooth" });
      };
      prev.addEventListener("click", () => scrollByCard(-1));
      next.addEventListener("click", () => scrollByCard(1));
      if (!motion()) return;
      const mm = window.gsap.matchMedia();
      mm.add("(min-width: 1100px)", () => {
        wrap.classList.add("is-pinned");
        const dist = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
        const tween = window.gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: sec, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (self) => { bar.style.transform = `scaleX(${Math.max(0.1, self.progress)})`; },
          },
        });
        st = tween.scrollTrigger;
        return () => { wrap.classList.remove("is-pinned"); st = null; };
      });
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
        const pos = (i - front + n) % n; // 0 = front
        const rot = [0, -5, 4, -8, 7, -3, 5][pos] || 0;
        const tx = [0, -14, 16, -24, 26, -8, 10][pos] || 0;
        const ty = pos * -7;
        c.style.zIndex = String(n - pos);
        c.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${1 - pos * 0.025})`;
        c.classList.toggle("is-front", pos === 0);
        c.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
      });
      btns.forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.stackBtn === front)));
    };
    btns.forEach((b) => {
      b.addEventListener("click", () => layout(+b.dataset.stackBtn));
      if (finePointer) b.addEventListener("mouseenter", () => layout(+b.dataset.stackBtn));
    });
    if (finePointer && !reduce) {
      stack.addEventListener("mousemove", (e) => {
        const r = stack.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        stack.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });
      stack.addEventListener("mouseleave", () => { stack.style.transform = ""; });
      stack.style.transition = "transform 600ms cubic-bezier(.2,.7,.2,1)";
    }
    layout(0);
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
          if (!b.hidden && motion()) window.gsap.from($$("li:not([hidden])", b), { opacity: 0, y: 8, duration: 0.35, stagger: 0.012, ease: "power2.out" });
        });
        empty.hidden = shown !== 0;
        count.textContent = `${shown} countries shown`;
        if (root._map) root._map.dim();
      };
      filters.forEach((f) => f.addEventListener("click", () => {
        filters.forEach((x) => { const on = x === f; x.classList.toggle("is-active", on); x.setAttribute("aria-pressed", String(on)); });
        root._state.region = f.dataset.filter;
        apply();
      }));
      let t;
      search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { root._state.q = search.value.trim().toLowerCase(); apply(); }, 120); });
      const showCountry = (btn, name) => {
        buttons.forEach((b) => b.classList.toggle("is-selected", b === btn));
        if (root._map) root._map.select(btn ? btn.dataset.slug : null);
        if (!btn) {
          panel.innerHTML = `<span class="status status--none">Not on our published lists</span><h3>${name}</h3>
            <p>This country is not on the Hague or non-Hague lists published on our site. Contact us to confirm whether an apostille or embassy legalization applies.</p>
            <a class="btn btn--ghost btn--sm" href="/contact-us/">Contact Us</a>`;
        } else if (btn.dataset.status === "hague") {
          const note = btn.querySelector("small");
          let extra = "";
          if (btn.dataset.alsoLegal) {
            extra = `<p style="margin-top:10px">${btn.dataset.country} also appears in our FBI attestation country guide: ${root.dataset.vnEmbassy}; ${root.dataset.vnTranslation}; final step: ${root.dataset.vnFinal}. Confirm the current route with the relevant authority.</p>`;
          }
          panel.innerHTML = `<span class="status">Hague member · ${btn.dataset.region}</span><h3>${btn.dataset.country}</h3>
            ${note ? `<p><strong>${note.textContent.replace(/[()]/g, "")}</strong></p>` : ""}
            <p>A single apostille is sufficient for use in Hague Apostille Convention member countries — no embassy legalization required. Federal documents like an FBI Identity History Summary must be apostilled by the U.S. Department of State.</p>${extra}
            <a class="btn btn--sm" href="/apostille-services/">Apostille Services</a>`;
        } else {
          const uses = btn.dataset.uses ? `<dt>Common Uses</dt><dd><ul>${btn.dataset.uses.split("|").map((u) => `<li>${u}</li>`).join("")}</ul></dd>` : "";
          const rows = btn.dataset.embassy ? `<dl><dt>Embassy</dt><dd>${btn.dataset.embassy}</dd>${btn.dataset.translation ? `<dt>Translation</dt><dd>${btn.dataset.translation}</dd>` : ""}<dt>Final In-Country Step</dt><dd>${btn.dataset.final}</dd>${uses}</dl>` : "";
          panel.innerHTML = `<span class="status status--legal">Non-Hague · Embassy legalization</span><h3>${btn.dataset.country}</h3>
            <p>An apostille is only valid for Hague Convention member countries. This destination requires U.S. Department of State certification and consular legalization.</p>${rows}
            <a class="btn btn--sm" href="/fbi-attestation-legalization/">Embassy legalization</a>`;
        }
        if (motion()) window.gsap.from(panel.children, { opacity: 0, y: 10, duration: 0.45, stagger: 0.05, ease: "power2.out" });
      };
      root._show = showCountry;
      buttons.forEach((b) => b.addEventListener("click", () => showCountry(b)));
      apply();
    });
  }
  function initExplorerMap(svg, host) {
    const root = host.closest("[data-explorer]");
    if (!root) return;
    const tip = $("[data-map-tip]", host);
    const bySlug = new Map();
    $$("[data-country]", root).forEach((b) => {
      if (!bySlug.has(b.dataset.slug) || b.dataset.status === "hague") bySlug.set(b.dataset.slug, b);
    });
    const shapes = $$("[data-c]", svg);
    shapes.forEach((s) => {
      const b = bySlug.get(s.dataset.c);
      if (b) s.dataset.status = b.dataset.status;
    });
    root._map = {
      dim() {
        const { region, q } = root._state;
        shapes.forEach((s) => {
          const b = bySlug.get(s.dataset.c);
          if (!b) return;
          const ok = (region === "all" || b.dataset.region === region) && b.dataset.country.toLowerCase().includes(q);
          s.classList.toggle("is-dim", !ok);
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
      if (!s) return;
      const b = bySlug.get(s.dataset.c);
      root._show(b || null, s.dataset.n);
    });
  }

  /* ------------------------------------------------------------------ reviews */
  function initReviews() {
    const root = $("[data-reviews]");
    if (!root) return;
    const tabs = $$("[role=tab]", root);
    const panels = $$("[data-review]", root);
    const prog = $("[data-review-progress]", root);
    const toggle = $("[data-review-toggle]", root);
    let i = 0, timer = null, paused = reduce, t0 = 0;
    const DUR = 8000;
    const show = (k, focus) => {
      i = (k + tabs.length) % tabs.length;
      tabs.forEach((t, n) => { const on = n === i; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
      panels.forEach((p, n) => p.classList.toggle("is-active", n === i));
      if (focus) tabs[i].focus();
      if (motion()) {
        const p = panels[i];
        window.gsap.fromTo($("blockquote", p), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" });
        window.gsap.fromTo($(".review-main__cap", p), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power2.out" });
      }
      t0 = performance.now();
    };
    const tick = (t) => {
      if (!paused) {
        const p = Math.min(1, (t - t0) / DUR);
        prog.style.transform = `scaleX(${p})`;
        if (p >= 1) show(i + 1);
      }
      timer = requestAnimationFrame(tick);
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
    const setPaused = (p) => {
      paused = p;
      toggle.setAttribute("aria-pressed", String(p));
      toggle.setAttribute("aria-label", p ? "Resume automatic rotation" : "Pause automatic rotation");
      toggle.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${p ? "play" : "pause"}"/></svg>`;
      if (!p) t0 = performance.now() - DUR * (parseFloat((prog.style.transform.match(/[\d.]+/) || [0])[0]) || 0);
    };
    toggle.addEventListener("click", () => setPaused(!paused));
    root.addEventListener("focusin", () => { if (!paused) { paused = true; root.dataset.autoPaused = "1"; } });
    root.addEventListener("focusout", (e) => { if (!root.contains(e.relatedTarget) && root.dataset.autoPaused) { delete root.dataset.autoPaused; setPaused(false); } });
    if (reduce) setPaused(true);
    // Only run while visible.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((en) => {
        en.forEach((e) => {
          if (e.isIntersecting && !timer) { t0 = performance.now(); timer = requestAnimationFrame(tick); }
          else if (!e.isIntersecting && timer) { cancelAnimationFrame(timer); timer = null; }
        });
      }).observe(root);
    }
  }

  /* ---------------------------------------------------------------- accordion */
  function initAccordions() {
    $$("[data-acc]").forEach((d) => {
      const summary = $("summary", d);
      const body = $(".acc__body", d);
      summary.addEventListener("click", (e) => {
        if (reduce) return;
        e.preventDefault();
        if (d.dataset.animating) return;
        d.dataset.animating = "1";
        if (!d.open) {
          d.open = true;
          const h = body.scrollHeight;
          body.animate([{ height: "0px", opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 480, easing: "cubic-bezier(.2,.7,.2,1)" })
            .onfinish = () => { delete d.dataset.animating; };
        } else {
          const h = body.scrollHeight;
          body.animate([{ height: `${h}px`, opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 360, easing: "cubic-bezier(.65,0,.35,1)" })
            .onfinish = () => { d.open = false; delete d.dataset.animating; };
        }
      });
    });
  }

  /* ------------------------------------------------- magnetic + cursor label */
  function initPointer() {
    if (!finePointer || reduce) return;
    $$("[data-magnetic]").forEach((m) => {
      m.addEventListener("mousemove", (e) => {
        const r = m.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        m.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      m.addEventListener("mouseleave", () => { m.style.transform = ""; });
    });
    const tag = $("[data-cursor-tag]");
    if (!tag) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; tag.style.left = `${x}px`; tag.style.top = `${y}px`; raf = requestAnimationFrame(loop); };
    $$("[data-cursor]").forEach((el) => {
      const media = $(".svc__media", el) || el;
      media.addEventListener("mouseenter", (e) => { tx = x = e.clientX; ty = y = e.clientY; tag.textContent = el.dataset.cursor; tag.classList.add("is-on"); if (!raf) loop(); });
      media.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
      media.addEventListener("mouseleave", () => { tag.classList.remove("is-on"); cancelAnimationFrame(raf); raf = null; });
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
        const valid = el.checkValidity();
        if (!valid) { ok = false; field.setAttribute("data-invalid", ""); el.setAttribute("aria-invalid", "true"); err.textContent = el.type === "email" ? "Enter a valid email address." : "This field is required."; }
        else { field.removeAttribute("data-invalid"); el.removeAttribute("aria-invalid"); err.textContent = ""; }
      });
      return ok;
    };
    $$("[required]", form).forEach((el) => el.addEventListener("blur", () => { if (el.value) validate(); }));
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      if (!validate()) { const bad = $("[aria-invalid=true]", form); if (bad) bad.focus(); return; }
      const btnEl = $("button[type=submit]", form);
      btnEl.disabled = true;
      const label = btnEl.innerHTML;
      btnEl.textContent = "Sending…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.message || "error");
        status.className = "form__status is-ok";
        status.textContent = data.message || "Thank you — your message has been sent. We will get back to you shortly.";
        form.reset();
      } catch (err) {
        status.className = "form__status is-err";
        status.innerHTML = `Sorry, your message could not be sent. Please call <a href="tel:8164420295">816-442-0295</a> or email <a href="mailto:moservices.midwest@gmail.com">moservices.midwest@gmail.com</a>.`;
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
    const io = new IntersectionObserver((en) => {
      en.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("is-active"));
        const a = map.get(e.target.id);
        if (a) a.classList.add("is-active");
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    map.forEach((_, id) => { const h = document.getElementById(id); if (h) io.observe(h); });
  }

  /* --------------------------------------------------------- page transitions */
  function initTransitions() {
    // Browsers with cross-document View Transitions handle this in CSS.
    if (reduce || "onpagereveal" in window) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.hash && url.pathname === location.pathname || a.hasAttribute("download")) return;
      const main = $("#main");
      if (!main) return;
      e.preventDefault();
      main.style.transition = "opacity 220ms ease, transform 220ms ease";
      main.style.opacity = "0";
      main.style.transform = "translateY(-6px)";
      setTimeout(() => { location.href = url.href; }, 200);
    });
    addEventListener("pageshow", (e) => { if (e.persisted) { const m = $("#main"); if (m) { m.style.opacity = ""; m.style.transform = ""; } } });
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    initHeader();
    initHeroRoute();
    initExplorer();
    initFinder();
    initStory();
    initTimeline();
    initStack();
    initReviews();
    initAccordions();
    initCounters();
    initForm();
    initToc();
    initPointer();
    initTransitions();
    mountMaps();
    if (hasGsap()) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.defaults({ duration: 0.6, ease: "power3.out" });
    }
    initReveals();
    initParallax();
    initHScroll();
    if (hasGsap()) {
      addEventListener("load", () => window.ScrollTrigger.refresh());
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => window.ScrollTrigger.refresh());
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
