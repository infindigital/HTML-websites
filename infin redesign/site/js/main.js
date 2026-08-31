/* =====================================================================
   INFIN DIGITAL — Interaction & Animation System
   GSAP + ScrollTrigger + Lenis, with progressive 3D enhancement
   ===================================================================== */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const CAN_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const DESKTOP = window.matchMedia('(min-width: 1024px)').matches;

document.documentElement.classList.add('js');
gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------------------
   Small utilities
-------------------------------------------------------------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Split an element's text into word spans while PRESERVING inline markup
// (e.g. <em>, <span class="muted|hl">) so colored words keep their colour.
function wrapWord(part) {
  const w = document.createElement('span');
  w.className = 'word';
  w.style.display = 'inline-block';
  w.style.overflow = 'hidden';
  w.style.verticalAlign = 'top';
  const inner = document.createElement('span');
  inner.className = 'word-inner';
  inner.style.display = 'inline-block';
  inner.textContent = part;
  w.appendChild(inner);
  return w;
}
function splitNode(node, out) {
  [...node.childNodes].forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach(part => {
        if (part === '') return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const w = wrapWord(part);
        frag.appendChild(w);
        out.push(w.firstChild);
      });
      node.replaceChild(frag, child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      // keep the element (its colour/class), split its inner text
      splitNode(child, out);
    }
  });
}
function splitWords(el) {
  const out = [];
  splitNode(el, out);
  return out;
}

/* --------------------------------------------------------------
   Lenis smooth scroll  <-> ScrollTrigger
-------------------------------------------------------------- */
let lenis = null;
function initLenis() {
  if (REDUCED) return;
  lenis = new Lenis({
    duration: 1.1,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* --------------------------------------------------------------
   LOADER
-------------------------------------------------------------- */
function runLoader(done) {
  const loader = $('#loader');
  document.body.classList.add('loading');
  if (REDUCED) {
    gsap.set(loader, { autoAlpha: 0, display: 'none' });
    document.body.classList.remove('loading');
    done();
    return;
  }
  const bar = $('#loader .loader-bar i');
  const count = $('#loader .loader-count');
  const obj = { v: 0 };
  const tl = gsap.timeline({ onComplete: () => { document.body.classList.remove('loading'); done(); } });
  tl.to(bar, { width: '100%', duration: 1.0, ease: 'power2.inOut' }, 0)
    .to(obj, { v: 100, duration: 1.0, ease: 'power2.inOut',
      onUpdate: () => { count.textContent = String(Math.round(obj.v)).padStart(2, '0'); } }, 0)
    .to('#loader .loader-mark', { yPercent: -4, duration: .6, ease: 'power2.out' }, .2)
    .to('#loader .loader-inner', { yPercent: -120, autoAlpha: 0, duration: .6, ease: 'power3.inOut' }, 1.0)
    .to(count, { yPercent: 120, autoAlpha: 0, duration: .6, ease: 'power3.inOut' }, 1.0)
    .to(loader, { yPercent: -100, duration: .8, ease: 'power4.inOut' }, 1.2)
    .set(loader, { display: 'none' });
}

/* --------------------------------------------------------------
   CUSTOM CURSOR
-------------------------------------------------------------- */
function initCursor() {
  if (!CAN_HOVER || TOUCH || REDUCED) return;
  const cursor = $('#cursor');
  const label = $('.cursor-label', cursor);
  document.body.classList.add('has-cursor');
  gsap.set(cursor, { autoAlpha: 0 });
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my, shown = false;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!shown) { shown = true; document.body.classList.add('show-cursor'); gsap.to(cursor, { autoAlpha: 1, duration: .3 }); }
  });
  gsap.ticker.add(() => {
    cx = lerp(cx, mx, 0.2); cy = lerp(cy, my, 0.2);
    cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
  });
  const labels = { view: 'View\nProject', talk: "Let's\nTalk", explore: 'Explore', read: 'Read' };
  $$('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const t = el.getAttribute('data-cursor');
      cursor.classList.add('big');
      label.textContent = labels[t] || 'Open';
    });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('big'); label.textContent = ''; });
  });
  // links/buttons without explicit label -> ring
  $$('a:not([data-cursor]), button:not([data-cursor])').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('ring'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('ring'));
  });
}

/* --------------------------------------------------------------
   MAGNETIC BUTTONS
-------------------------------------------------------------- */
function initMagnetic() {
  if (!CAN_HOVER || TOUCH || REDUCED) return;
  $$('.magnetic').forEach(el => {
    const strength = 0.35;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      gsap.to(el, { x, y, duration: .4, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
  });
}

/* --------------------------------------------------------------
   HEADER scroll state + hide on scroll down
-------------------------------------------------------------- */
function initHeader() {
  // Header is non-sticky (absolute) — it simply scrolls away with the hero.
  // smooth anchor links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') { e.preventDefault(); return; } // placeholder link — no jump
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      else target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
    });
  });
}

/* --------------------------------------------------------------
   MOBILE MENU
-------------------------------------------------------------- */
let menuOpen = false;
function openMenu() {
  const menu = $('#mobile-menu'), toggle = $('.menu-toggle');
  menuOpen = true;
  menu.classList.add('open'); toggle.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  if (lenis) lenis.stop();
  gsap.to('#mobile-menu nav a span', { yPercent: 0, duration: .7, stagger: .07, ease: 'power3.out', delay: .25 });
}
function closeMenu() {
  const menu = $('#mobile-menu'), toggle = $('.menu-toggle');
  if (!menuOpen) return;
  menuOpen = false;
  menu.classList.remove('open'); toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  if (lenis) lenis.start();
  gsap.to('#mobile-menu nav a span', { yPercent: 110, duration: .4, ease: 'power2.in' });
}
function initMenu() {
  const toggle = $('.menu-toggle');
  toggle.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
}

/* --------------------------------------------------------------
   TEXT REVEALS
-------------------------------------------------------------- */
function initReveals() {
  // Line reveal blocks: [data-reveal] (single line up)
  $$('[data-reveal]').forEach(el => {
    const words = splitWords(el);
    gsap.set(words, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => gsap.to(words, { yPercent: 0, duration: .9, stagger: .05, ease: 'power4.out' })
    });
  });
  // Multi element line reveals: [data-reveal-lines]
  $$('[data-reveal-lines]').forEach(el => {
    const words = splitWords(el);
    gsap.set(words, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter: () => gsap.to(words, { yPercent: 0, duration: .8, stagger: .03, ease: 'power3.out' })
    });
  });
  // Fades
  $$('[data-fade]').forEach(el => {
    gsap.set(el, { y: 26, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: el, start: 'top 92%',
      onEnter: () => gsap.to(el, { y: 0, autoAlpha: 1, duration: .9, ease: 'power3.out' })
    });
  });
  // Staggered word groups
  $$('[data-stagger]').forEach(group => {
    const items = [...group.children];
    gsap.set(items, { y: 40, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: group, start: 'top 85%',
      onEnter: () => gsap.to(items, { y: 0, autoAlpha: 1, duration: .8, stagger: .1, ease: 'power4.out' })
    });
  });
}

/* --------------------------------------------------------------
   MARQUEES (infinite loop, scroll-velocity aware)
-------------------------------------------------------------- */
function initMarquees() {
  $$('[data-marquee]').forEach(m => {
    const track = $('.marquee-track', m);
    // duplicate content for seamless loop
    track.innerHTML = track.innerHTML + track.innerHTML;
    const base = parseFloat(m.dataset.speed || '1');
    let x = 0;
    const w = track.scrollWidth / 2;
    gsap.ticker.add(() => {
      x -= base * 0.6;
      if (-x >= w) x = 0;
      track.style.transform = `translateX(${x}px)`;
    });
  });
}

/* --------------------------------------------------------------
   ABOUT PLATES parallax + tilt
-------------------------------------------------------------- */
function initPlates() {
  const wrap = $('[data-plates]');
  if (!wrap) return;
  const plates = $$('.plate', wrap);
  // entrance
  plates.forEach((p, i) => {
    gsap.set(p, { autoAlpha: 0, y: 60, rotate: gsap.utils.random(-6, 6) });
    ScrollTrigger.create({
      trigger: wrap, start: 'top 78%',
      onEnter: () => gsap.to(p, { autoAlpha: 1, y: 0, duration: 1, delay: i * .12, ease: 'power3.out' })
    });
    // scroll parallax
    gsap.to(p, {
      yPercent: gsap.utils.random(-18, 18),
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
  // cursor tilt
  if (CAN_HOVER && !TOUCH && !REDUCED) {
    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5;
      const ny = (e.clientY - r.top) / r.height - .5;
      plates.forEach((p, i) => {
        const d = (i + 1) * 6;
        gsap.to(p, { rotationY: nx * d, rotationX: -ny * d, x: nx * d * 2, duration: .6, ease: 'power2.out', transformPerspective: 900 });
      });
    });
    wrap.addEventListener('mouseleave', () => plates.forEach(p => gsap.to(p, { rotationY: 0, rotationX: 0, x: 0, duration: .8, ease: 'power2.out' })));
  }
}

/* --------------------------------------------------------------
   LOGO WALL marquee (opposite drift)
-------------------------------------------------------------- */
function initLogoWall() {
  const row = $('[data-logo-row="1"]');
  if (!row) return;
  row.innerHTML = row.innerHTML + row.innerHTML;
  const w = row.scrollWidth / 2;
  let x = 0;
  gsap.ticker.add(() => { x -= 0.5; if (-x >= w) x = 0; row.style.transform = `translateX(${x}px)`; });
}

/* --------------------------------------------------------------
   SERVICES — sticky visual switching + accordion
-------------------------------------------------------------- */
function initServices() {
  const items = $$('.svc-item');
  const shots = $$('.svc-shot');
  const badgeIcon = $('[data-badge-icon]');
  const badgeLabel = $('[data-badge-label]');
  const iconFile = {
    brand: 'svc-meta', web: 'svc-gmb', digital: 'svc-perf', seo: 'svc-seo'
  };
  function activate(key, name) {
    shots.forEach(s => s.classList.toggle('show', s.dataset.shot === key));
    if (badgeIcon) badgeIcon.src = `assets/img/${iconFile[key] || 'svc-seo'}.webp`;
    if (badgeLabel) badgeLabel.textContent = name;
  }
  // desktop: switch on scroll centre
  items.forEach((item, i) => {
    const key = item.dataset.svc;
    const name = $('.svc-name', item).textContent;
    ScrollTrigger.create({
      trigger: item, start: 'top 60%', end: 'bottom 60%',
      onToggle: self => { if (self.isActive) { activate(key, name); items.forEach(x => x.classList.remove('active')); item.classList.add('active'); } }
    });
    // click / hover to expand (mobile + desktop)
    item.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      items.forEach(x => x.classList.remove('active'));
      if (!wasActive) { item.classList.add('active'); activate(key, name); }
    });
  });
  // default
  if (items[0]) { items[0].classList.add('active'); activate(items[0].dataset.svc, $('.svc-name', items[0]).textContent); }
}

/* --------------------------------------------------------------
   GROWTH SYSTEM — pinned horizontal steps
-------------------------------------------------------------- */
function initGrowthDecor() {
  // Inject a floating 3D cube into each step (colour comes from --gs)
  $$('.growth-step').forEach(step => {
    if ($('.gs-cube-wrap', step)) return;
    const wrap = document.createElement('div');
    wrap.className = 'gs-cube-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    const cube = document.createElement('div');
    cube.className = 'gs-cube';
    ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach(f => {
      const face = document.createElement('span');
      face.className = 'gf gf-' + f;
      cube.appendChild(face);
    });
    wrap.appendChild(cube);
    step.appendChild(wrap);
  });
}

function initGrowth() {
  initGrowthDecor();
  const stage = $('[data-growth]');
  const track = $('[data-growth-track]');
  if (!stage || !track) return;
  const steps = $$('.growth-step', track);
  const bars = $$('.growth-progress b');
  const total = steps.length;
  if (REDUCED) { return; }
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage, start: 'top top', end: () => '+=' + (window.innerHeight * (total - 1)),
      pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: self => {
        const p = self.progress * (total - 1);
        bars.forEach((b, i) => {
          const fill = gsap.utils.clamp(0, 1, p - i);
          b.style.width = (fill * 100) + '%';
        });
      }
    }
  });
  tl.to(track, { xPercent: -100 * (total - 1), ease: 'none' });
}

/* --------------------------------------------------------------
   WORK — pinned horizontal scroll
-------------------------------------------------------------- */
function initWork() {
  const grid = $('[data-work-grid]');
  if (!grid) return;
  const cards = $$('.work-card', grid);
  cards.forEach(card => {
    const media = $('.wc-media', card);
    const body = $('.wc-body', card);
    gsap.set(media, { autoAlpha: 0, y: 60, scale: .96 });
    gsap.set(body, { autoAlpha: 0, y: 24 });
    ScrollTrigger.create({
      trigger: card, start: 'top 85%',
      onEnter: () => {
        gsap.to(media, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' });
        gsap.to(body, { autoAlpha: 1, y: 0, duration: .8, delay: .15, ease: 'power3.out' });
      }
    });
    // subtle parallax on the image while scrolling
    if (!REDUCED) {
      const img = $('img', media);
      gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }
  });
}

/* --------------------------------------------------------------
   CREATIVE LAB — parallax + cursor layers
-------------------------------------------------------------- */
function initLab() {
  const lab = $('[data-lab]');
  if (!lab) return;
  const imgs = $$('.lab-img', lab);
  // entrance
  imgs.forEach((im, i) => {
    gsap.set(im, { autoAlpha: 0, scale: .8, rotate: gsap.utils.random(-4, 4) });
    ScrollTrigger.create({ trigger: lab, start: 'top 70%', onEnter: () => gsap.to(im, { autoAlpha: 1, scale: 1, duration: 1, delay: i * .08, ease: 'power3.out' }) });
  });
  // scroll parallax by depth
  imgs.forEach(im => {
    const depth = parseFloat(im.dataset.depth || '.3');
    gsap.to(im, { yPercent: -depth * 120, ease: 'none', scrollTrigger: { trigger: lab, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
  // cursor movement (skip whatever poster is being hovered/zoomed)
  if (CAN_HOVER && !TOUCH && !REDUCED) {
    lab.addEventListener('mousemove', e => {
      const nx = e.clientX / window.innerWidth - .5;
      const ny = e.clientY / window.innerHeight - .5;
      imgs.forEach(im => {
        if (im._zoom) return;
        const depth = parseFloat(im.dataset.depth || '.3');
        gsap.to(im, { x: nx * depth * 120, y: ny * depth * 80, duration: .8, ease: 'power2.out' });
      });
    });
  }
  // hover a poster -> enlarge to full view so the design reads clearly
  const scaleFor = im => {
    // scale so the poster's width reaches ~32% of the viewport, capped
    const w = im.getBoundingClientRect().width || 1;
    const target = Math.min(window.innerWidth, window.innerHeight * 1.05) * 0.32;
    return gsap.utils.clamp(1.3, 2.3, target / w);
  };
  // grow into view: top posters expand downward, bottom posters upward
  const originFor = im => {
    const top = im.style.top ? parseFloat(im.style.top) : NaN;
    if (im.style.bottom && isNaN(top)) return 'center bottom';
    if (!isNaN(top) && top < 40) return 'center top';
    return 'center center';
  };
  const title = $('.lab-title', lab);
  imgs.forEach(im => {
    const layer = im.closest('.lab-layer');
    im.addEventListener('mouseenter', () => {
      if (TOUCH) return;
      im._zoom = true;
      im.classList.add('zoomed');
      // lift the poster's whole layer above the title, and the poster above its siblings
      if (layer) layer.style.zIndex = 40;
      im.style.zIndex = 60;
      gsap.to(im, { scale: scaleFor(im), x: 0, y: 0, rotate: 0, transformOrigin: originFor(im), duration: .55, ease: 'power3.out', overwrite: 'auto' });
      imgs.forEach(o => { if (o !== im) gsap.to(o, { opacity: .28, duration: .4 }); });
      if (title) gsap.to(title, { opacity: .12, duration: .4 }); // let the design read clearly
    });
    im.addEventListener('mouseleave', () => {
      im._zoom = false;
      im.classList.remove('zoomed');
      gsap.to(im, { scale: 1, duration: .5, ease: 'power3.out', overwrite: 'auto',
        onComplete: () => { im.style.zIndex = ''; if (layer) layer.style.zIndex = ''; } });
      imgs.forEach(o => gsap.to(o, { opacity: 1, duration: .4 }));
      if (title) gsap.to(title, { opacity: 1, duration: .4 });
    });
  });
}

/* --------------------------------------------------------------
   3D TILT (cert cards)
-------------------------------------------------------------- */
function initTilt() {
  const cards = $$('[data-tilt]');
  cards.forEach((card, i) => {
    gsap.set(card, { autoAlpha: 0, y: 44 });
    ScrollTrigger.create({
      trigger: card, start: 'top 90%',
      onEnter: () => gsap.to(card, { autoAlpha: 1, y: 0, duration: .8, delay: (i % 4) * .08, ease: 'power3.out' })
    });
    if (!CAN_HOVER || TOUCH || REDUCED) return;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5;
      const ny = (e.clientY - r.top) / r.height - .5;
      gsap.to(card, { rotationY: nx * 15, rotationX: -ny * 15, y: -8, duration: .4, ease: 'power2.out', transformPerspective: 900, transformOrigin: 'center' });
    });
    card.addEventListener('mouseleave', () => gsap.to(card, { rotationY: 0, rotationX: 0, y: 0, duration: .7, ease: 'power2.out' }));
  });
}

/* --------------------------------------------------------------
   COUNTERS
-------------------------------------------------------------- */
function initCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.fromTo(el, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .6, ease: 'power3.out' });
        gsap.to(obj, { v: target, duration: 1.8, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-IN'); } });
      }
    });
  });
}

/* --------------------------------------------------------------
   CASE STUDY parallax cards
-------------------------------------------------------------- */
function initCase() {
  const stage = $('[data-case]');
  if (!stage) return;
  const cards = $$('.case-card', stage);
  cards.forEach((c, i) => {
    gsap.set(c, { autoAlpha: 0, y: 80 });
    ScrollTrigger.create({ trigger: stage, start: 'top 75%', onEnter: () => gsap.to(c, { autoAlpha: 1, y: 0, duration: 1, delay: i * .15, ease: 'power3.out' }) });
    gsap.to(c, { yPercent: (i - 1) * -14, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
}

/* --------------------------------------------------------------
   WHY INFIN — background color transitions
-------------------------------------------------------------- */
function initWhy() {
  const section = $('#why');
  if (!section) return;
  const items = $$('[data-why]');
  const colors = { blue: '#2B4DFF', magenta: '#FF2E7E', orange: '#FF6A2C', lime: '#C6FF3A' };
  const fgFor = a => (a === 'lime' ? '#0B0B0C' : '#FFFFFF');
  items.forEach(item => {
    const a = item.dataset.accent;
    ScrollTrigger.create({
      trigger: item, start: 'top 50%', end: 'bottom 50%',
      onToggle: self => {
        if (self.isActive) {
          gsap.to(section, { backgroundColor: colors[a], color: fgFor(a), duration: .8, ease: 'power2.out' });
          const hl = $('.hl', item);
          if (hl) gsap.fromTo(hl, { color: fgFor(a) }, { color: (a === 'lime' ? '#0B0B0C' : '#0B0B0C'), duration: .1 });
        }
      }
    });
  });
  // reset to dark when leaving section entirely
  ScrollTrigger.create({ trigger: section, start: 'top 80%', end: 'bottom 20%',
    onLeave: () => gsap.to(section, { backgroundColor: '#0B0B0C', color: '#EFECE6', duration: .6 }),
    onLeaveBack: () => gsap.to(section, { backgroundColor: '#0B0B0C', color: '#EFECE6', duration: .6 }) });
}

/* --------------------------------------------------------------
   TESTIMONIALS carousel
-------------------------------------------------------------- */
function initTestimonials() {
  const cards = $$('[data-tst]');
  const dotsWrap = $('[data-tst-dots]');
  if (!cards.length) return;
  let idx = 0;
  cards.forEach((_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('on');
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  });
  const dots = $$('button', dotsWrap);
  function go(n) {
    idx = (n + cards.length) % cards.length;
    cards.forEach((c, i) => c.classList.toggle('show', i === idx));
    dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    const q = $('.tst-quote', cards[idx]);
    const av = $('.tst-avatar', cards[idx]);
    gsap.fromTo(q, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6, ease: 'power3.out' });
    gsap.fromTo(av, { scale: .8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .6, ease: 'back.out(1.6)' });
  }
  $('[data-tst-next]').addEventListener('click', () => go(idx + 1));
  $('[data-tst-prev]').addEventListener('click', () => go(idx - 1));
  let timer = setInterval(() => go(idx + 1), 6000);
  const stage = $('[data-tst-stage]');
  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', () => { timer = setInterval(() => go(idx + 1), 6000); });
}

/* --------------------------------------------------------------
   HERO — floating pills (entrance, float, parallax, hover)
-------------------------------------------------------------- */
let heroPillsIn = () => {};
function initHeroPills() {
  const wraps = $$('.pill-wrap');
  if (!wraps.length) return;
  wraps.forEach(w => {
    const pill = $('.pill', w);
    const rot = parseFloat(pill.dataset.rot || '0');
    gsap.set(pill, { rotation: rot });
    gsap.set(w, { autoAlpha: 0, scale: .5 });
  });
  heroPillsIn = () => {
    wraps.forEach((w, i) => {
      gsap.to(w, { autoAlpha: 1, scale: 1, duration: .8, ease: 'back.out(1.6)', delay: i * .06 });
    });
    if (REDUCED) return;
    // continuous float on the inner pill (separate transform channel from wrap parallax)
    wraps.forEach((w, i) => {
      const pill = $('.pill', w);
      const rot = parseFloat(pill.dataset.rot || '0');
      gsap.to(pill, {
        y: gsap.utils.random(-16, -6), rotation: rot + gsap.utils.random(-2.5, 2.5),
        duration: gsap.utils.random(3.6, 6.2), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: .8 + i * .05
      });
    });
  };
  // hover
  if (CAN_HOVER && !TOUCH && !REDUCED) {
    wraps.forEach(w => {
      const pill = $('.pill', w);
      w.addEventListener('mouseenter', () => gsap.to(pill, { scale: 1.08, duration: .35, ease: 'power3.out' }));
      w.addEventListener('mouseleave', () => gsap.to(pill, { scale: 1, duration: .5, ease: 'power3.out' }));
    });
    // mouse parallax on wraps + wordmark + atmosphere (lerped)
    const wm = $('[data-wordmark]');
    const glows = $$('.hglow');
    let mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', e => { tx = e.clientX / window.innerWidth - .5; ty = e.clientY / window.innerHeight - .5; });
    gsap.ticker.add(() => {
      mx = lerp(mx, tx, .06); my = lerp(my, ty, .06);
      wraps.forEach(w => {
        const d = parseFloat(w.dataset.depth || '.3');
        gsap.set(w, { x: -mx * d * 90, y: -my * d * 70 });
      });
      if (wm) gsap.set(wm, { x: -mx * 22 });
      glows.forEach((g, i) => gsap.set(g, { x: mx * (10 + i * 6), y: my * (10 + i * 6) }));
    });
  }
}

/* --------------------------------------------------------------
   HERO scroll transition
-------------------------------------------------------------- */
function initHeroScroll() {
  if (REDUCED) return;
  const st = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 };
  gsap.to('.hero-ui', { yPercent: -14, autoAlpha: 0, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-pills', { yPercent: -22, autoAlpha: 0, ease: 'none', scrollTrigger: st });
  gsap.to('[data-wordmark]', { yPercent: -42, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-atmos', { yPercent: 24, ease: 'none', scrollTrigger: st });
}

/* --------------------------------------------------------------
   HERO reveal after loader
-------------------------------------------------------------- */
function revealHero() {
  const words = $$('.hero-h1 .ln > span');
  gsap.set(words, { yPercent: 115 });
  gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 18 });
  gsap.set('[data-wordmark]', { yPercent: 55, autoAlpha: 0 });
  const tl = gsap.timeline();
  tl.to(words, { yPercent: 0, duration: 1, stagger: .09, ease: 'power4.out' }, 0)
    .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out' }, .2)
    .add(() => heroPillsIn(), .25)
    .to('[data-wordmark]', { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: 'back.out(1.1)' }, .45);
}

/* --------------------------------------------------------------
   3D (progressive enhancement)
-------------------------------------------------------------- */
async function init3D() {
  if (REDUCED) return;
  // On phones we keep the CSS gradient fallback (no heavy WebGL). 3D is a
  // desktop/tablet enhancement only.
  const smallScreen = window.innerWidth < 900;
  if (smallScreen) return;
  const lowPower = window.innerWidth < 1200;
  try {
    const mod = await import('./scene.js');
    mod.initCtaScene({ canvas: $('#cta-canvas'), interactive: !TOUCH, lowPower });
  } catch (e) {
    console.warn('3D disabled:', e);
  }
}

/* --------------------------------------------------------------
   BOOT
-------------------------------------------------------------- */
function boot() {
  initLenis();
  initCursor();
  initHeader();
  initMenu();
  initMagnetic();
  initReveals();
  initMarquees();
  initPlates();
  initLogoWall();
  initServices();
  initGrowth();
  initWork();
  initLab();
  initTilt();
  initCounters();
  initCase();
  initWhy();
  initTestimonials();
  initHeroPills();
  initHeroScroll();
  revealHero();
  init3D();
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

runLoader(boot);
