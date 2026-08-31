/* =====================================================================
   INFIN DIGITAL — 3D Scenes (Three.js)
   Custom "digital growth machine": floating glass panels, browser
   windows, a rising bar chart, spheres and the in/fin slash — objects
   specific to a digital marketing studio, not a generic template.
   ===================================================================== */

import * as THREE from 'three';

const ACCENTS = {
  blue: 0x2B4DFF, cyan: 0x16E0E0, violet: 0x7A3CFF,
  magenta: 0xFF2E7E, lime: 0xC6FF3A, orange: 0xFF6A2C, yellow: 0xFFD23F,
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function makeRenderer(canvas, lowPower) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.2 : 2));
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

/* Rounded panel geometry (a card / browser window / dashboard) */
function roundedPanel(w, h, r = 0.12) {
  const shape = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
  geo.center();
  return geo;
}

function glassMat(color, opacity = 0.85) {
  return new THREE.MeshStandardMaterial({
    color, metalness: 0.1, roughness: 0.15, transparent: true, opacity,
    emissive: color, emissiveIntensity: 0.08,
  });
}

/* ---------- HERO SCENE ---------- */
export function initHeroScene({ canvas, interactive, lowPower }) {
  if (!canvas) return;
  const scene = new THREE.Scene();
  const renderer = makeRenderer(canvas, lowPower);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(4, 6, 6); scene.add(key);
  const rim1 = new THREE.PointLight(ACCENTS.blue, 30, 30); rim1.position.set(-6, -2, 4); scene.add(rim1);
  const rim2 = new THREE.PointLight(ACCENTS.violet, 24, 30); rim2.position.set(6, 4, 2); scene.add(rim2);
  const rim3 = new THREE.PointLight(ACCENTS.orange, 16, 24); rim3.position.set(0, -5, 3); scene.add(rim3);

  const root = new THREE.Group();
  scene.add(root);

  // The composition floats to the RIGHT of the headline. A base x-offset is
  // applied to `root` in resize() so it lives in the hero's negative space.

  // Objects are laid out as a wide HORIZONTAL band on the right of the hero.

  // The in/fin slash — signature object (centre of the band)
  const slashGeo = new THREE.BoxGeometry(0.38, 2.6, 0.38);
  const slash = new THREE.Mesh(slashGeo, glassMat(ACCENTS.lime, 0.95));
  slash.rotation.z = 0.5; slash.position.set(0.55, -0.1, 0.35);
  root.add(slash);

  // Floating browser window (upper-left of the cluster)
  const win = new THREE.Group();
  const winBody = new THREE.Mesh(roundedPanel(2.2, 1.5, 0.1), glassMat(0xffffff, 0.9));
  const winBar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.26, 0.02), new THREE.MeshStandardMaterial({ color: 0x0B0B0C, roughness: .4 }));
  winBar.position.set(0, 0.62, 0.06);
  [-0.92, -0.82, -0.72].forEach((x, i) => {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.035, 12), new THREE.MeshBasicMaterial({ color: [ACCENTS.magenta, ACCENTS.yellow, ACCENTS.lime][i] }));
    dot.position.set(x, 0.62, 0.08); win.add(dot);
  });
  win.add(winBody, winBar);
  win.position.set(-0.5, 0.15, 0.0); win.rotation.set(-0.12, 0.42, 0.05);
  root.add(win);

  // Analytics card with rising bars (lower-right)
  const card = new THREE.Group();
  const cardBg = new THREE.Mesh(roundedPanel(1.7, 1.25, 0.1), glassMat(ACCENTS.blue, 0.9));
  card.add(cardBg);
  [0.32, 0.55, 0.46, 0.78, 1.0].forEach((h, i) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.16, h, 0.08), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .3, emissive: 0xffffff, emissiveIntensity: .05 }));
    bar.position.set(-0.55 + i * 0.28, -0.35 + h / 2, 0.1); card.add(bar);
  });
  card.position.set(1.7, -0.2, -0.2); card.rotation.set(0.1, -0.5, -0.05);
  root.add(card);

  // Floating spheres (colored glass "signals") — restrained: two orbs only
  const sphereData = [
    { c: ACCENTS.violet, r: 0.48, p: [0.55, 0.95, 0.5] },
    { c: ACCENTS.orange, r: 0.34, p: [2.25, 0.55, 0.35] },
  ];
  const spheres = sphereData.map(s => {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(s.r, lowPower ? 1 : 2), glassMat(s.c, 0.9));
    m.position.set(...s.p); root.add(m); return m;
  });

  // Torus (SEO orbit signal, left of the band)
  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 12, 40), glassMat(ACCENTS.lime, 0.9));
  torus.position.set(-1.35, 0.5, 0.1); torus.rotation.set(1, 0.4, 0);
  root.add(torus);

  // Particles (few, cinematic)
  let points = null;
  if (!lowPower) {
    const count = 55;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random()-.5)*16; pos[i*3+1] = (Math.random()-.5)*10; pos[i*3+2] = (Math.random()-.5)*8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    points = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xEFECE6, size: 0.035, transparent: true, opacity: 0.5 }));
    scene.add(points);
  }

  const floaters = [win, card, torus, ...spheres];

  // Interaction + scroll
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  if (interactive) window.addEventListener('mousemove', e => { tmx = (e.clientX / window.innerWidth - .5); tmy = (e.clientY / window.innerHeight - .5); });
  let scrollN = 0;
  window.addEventListener('scroll', () => {
    const h = window.innerHeight; scrollN = clamp(window.scrollY / h, 0, 1.2);
  }, { passive: true });

  let offsetX = 2.0; // pushes composition into the right-hand negative space
  function resize() {
    const parent = canvas.parentElement || document.body;
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    renderer.setSize(w, h, true); // true → also sets canvas CSS size
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const ar = w / h;
    offsetX = ar > 1.4 ? 2.75 : ar > 1.05 ? 1.9 : 0.5;
  }
  resize(); window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mx = lerp(mx, tmx, 0.05); my = lerp(my, tmy, 0.05);

    root.rotation.y = mx * 0.4 + t * 0.05 + scrollN * 0.5;
    root.rotation.x = my * 0.3 - scrollN * 0.25;
    root.position.x = offsetX + mx * 0.6;
    root.position.y = -0.55 + scrollN * 1.6;
    root.position.z = -scrollN * 3;

    slash.rotation.z = 0.42 + Math.sin(t * 0.4) * 0.05;
    floaters.forEach((f, i) => {
      f.position.y += Math.sin(t * 0.6 + i) * 0.0016;
      f.rotation.y += 0.002 + i * 0.0004;
      f.rotation.x += 0.001;
    });
    if (points) points.rotation.y = t * 0.02;

    camera.position.x = lerp(camera.position.x, mx * 1.2, 0.05);
    camera.position.y = lerp(camera.position.y, -my * 0.8, 0.05);
    camera.lookAt(0, scrollN * 0.6, 0);

    renderer.render(scene, camera);
  }
  animate();

  // Pause when off-screen
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) animate(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0 });
  io.observe(canvas);

  function lerp(a, b, n) { return (1 - n) * a + n * b; }
}

/* ---------- CTA SCENE ---------- */
export function initCtaScene({ canvas, interactive, lowPower }) {
  if (!canvas) return;
  const scene = new THREE.Scene();
  const renderer = makeRenderer(canvas, lowPower);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-4, 5, 6); scene.add(key);
  const p1 = new THREE.PointLight(ACCENTS.lime, 26, 30); p1.position.set(5, -2, 4); scene.add(p1);
  const p2 = new THREE.PointLight(ACCENTS.cyan, 20, 30); p2.position.set(-5, 3, 3); scene.add(p2);

  const root = new THREE.Group();
  scene.add(root);

  // Abstract geometry cluster over the violet CTA
  const objs = [];
  const geos = [
    new THREE.IcosahedronGeometry(0.9, lowPower ? 1 : 2),
    new THREE.TorusGeometry(0.8, 0.28, 14, 44),
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.TorusKnotGeometry(0.5, 0.18, 80, 12),
  ];
  const cols = [ACCENTS.lime, ACCENTS.cyan, 0xffffff, ACCENTS.yellow, ACCENTS.magenta];
  const positions = [[-3.5, 1.2, 0], [3.4, 1.6, -1], [-2.8, -1.8, 0.5], [3, -1.4, 0], [0, 2.4, -2]];
  geos.forEach((g, i) => {
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: cols[i], roughness: 0.25, metalness: 0.15, transparent: true, opacity: 0.95, emissive: cols[i], emissiveIntensity: 0.06 }));
    m.position.set(...positions[i]); m.userData.spin = 0.003 + i * 0.001; root.add(m); objs.push(m);
  });

  // INFIN mark slash
  const slash = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.2, 0.3), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .2 }));
  slash.rotation.z = 0.42; slash.position.set(0, -0.2, -0.5); root.add(slash); objs.push(slash);

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  if (interactive) window.addEventListener('mousemove', e => { tmx = (e.clientX / window.innerWidth - .5); tmy = (e.clientY / window.innerHeight - .5); });

  function resize() {
    const parent = canvas.parentElement || document.body;
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    renderer.setSize(w, h, true);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize(); window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    root.rotation.y = mx * 0.5 + t * 0.04;
    root.rotation.x = my * 0.3;
    objs.forEach((o, i) => {
      o.rotation.x += o.userData.spin || 0.004;
      o.rotation.y += (o.userData.spin || 0.004) * 1.3;
      o.position.y += Math.sin(t * 0.5 + i) * 0.0018;
    });
    renderer.render(scene, camera);
  }
  animate();

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) animate(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0 });
  io.observe(canvas);
}
