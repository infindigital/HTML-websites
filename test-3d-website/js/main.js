/*
 * Test 3D Website — live WebGL scene.
 *
 * Layout of the scene:
 *   - a torus knot at the origin, lit by three orbiting coloured lights
 *   - an instanced field of small cubes drifting around it
 *   - a starfield of points far behind everything
 * The camera is driven by scroll progress and eased towards the pointer.
 */

const canvas = document.getElementById('scene');
const loader = document.getElementById('loader');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hideLoader = () => loader.classList.add('hidden');

let THREE;
try {
    THREE = await import('three');
} catch (err) {
    // The page still reads fine without the scene; just get the loader out of the way.
    console.error('Three.js could not be loaded — showing the page without the 3D scene.', err);
    canvas.style.display = 'none';
    document.body.style.background = 'radial-gradient(circle at 50% 0%, #131a2c 0%, #05060a 60%)';
    hideLoader();
    throw err;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060a);
scene.fog = new THREE.FogExp2(0x05060a, 0.035);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 12);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

/* ---------- Lights ---------- */
scene.add(new THREE.AmbientLight(0x2a3350, 1.2));

const lights = [0x5eead4, 0xa78bfa, 0xff7a7a].map((color, i) => {
    const light = new THREE.PointLight(color, 120, 60);
    light.userData.phase = (i / 3) * Math.PI * 2;
    scene.add(light);
    return light;
});

/* ---------- Core geometry ---------- */
const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2.1, 0.55, 220, 32),
    new THREE.MeshStandardMaterial({ color: 0xdfe6ff, metalness: 0.92, roughness: 0.18 })
);
scene.add(knot);

const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.2, 1),
    new THREE.MeshBasicMaterial({ color: 0x5eead4, wireframe: true, transparent: true, opacity: 0.12 })
);
scene.add(shell);

/* ---------- Instanced cube field ---------- */
const CUBES = 420;
const cubes = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x8fa0d0, metalness: 0.6, roughness: 0.35 }),
    CUBES
);
cubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

const seeds = [];
const dummy = new THREE.Object3D();
for (let i = 0; i < CUBES; i++) {
    const radius = 6 + Math.random() * 14;
    const angle = Math.random() * Math.PI * 2;
    seeds.push({
        radius,
        angle,
        y: (Math.random() - 0.5) * 22,
        speed: 0.05 + Math.random() * 0.18,
        spin: (Math.random() - 0.5) * 0.9,
        scale: 0.5 + Math.random() * 1.4
    });
}
scene.add(cubes);

/* ---------- Starfield ---------- */
const starPositions = new Float32Array(1500 * 3);
for (let i = 0; i < starPositions.length; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 160;
    starPositions[i + 1] = (Math.random() - 0.5) * 120;
    starPositions[i + 2] = -20 - Math.random() * 120;
}
const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPositions, 3)),
    new THREE.PointsMaterial({ color: 0x9aa3bb, size: 0.28, sizeAttenuation: true, transparent: true, opacity: 0.7 })
);
scene.add(stars);

/* ---------- Interaction state ---------- */
const pointer = { x: 0, y: 0 };
const eased = { x: 0, y: 0, scroll: 0 };
let scrollTarget = 0;

const readScroll = () => {
    const max = document.body.scrollHeight - window.innerHeight;
    scrollTarget = max > 0 ? window.scrollY / max : 0;
};

window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });

window.addEventListener('scroll', readScroll, { passive: true });

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    readScroll();
});

readScroll();

/* ---------- Render loop ---------- */
const clock = new THREE.Clock();

function frame() {
    const t = clock.getElapsedTime();
    const motion = reduceMotion ? 0 : 1;

    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;
    eased.scroll += (scrollTarget - eased.scroll) * 0.06;

    knot.rotation.x = t * 0.15 * motion + eased.scroll * 1.4;
    knot.rotation.y = t * 0.21 * motion + eased.scroll * 2.2;
    shell.rotation.y = -t * 0.08 * motion;
    shell.rotation.z = t * 0.05 * motion;
    stars.rotation.y = t * 0.01 * motion;

    lights.forEach((light, i) => {
        const a = t * 0.4 * motion + light.userData.phase;
        light.position.set(Math.cos(a) * 7, Math.sin(a * 0.7) * 5, Math.sin(a) * 7 + (i - 1) * 2);
    });

    for (let i = 0; i < CUBES; i++) {
        const s = seeds[i];
        const a = s.angle + t * s.speed * motion;
        dummy.position.set(Math.cos(a) * s.radius, s.y + Math.sin(t * 0.4 * motion + i) * 0.6, Math.sin(a) * s.radius);
        dummy.rotation.set(a * s.spin, a, a * 0.5);
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        cubes.setMatrixAt(i, dummy.matrix);
    }
    cubes.instanceMatrix.needsUpdate = true;

    // Fly the camera in and past the knot as the page scrolls.
    camera.position.x += (eased.x * 2.5 - camera.position.x) * 0.05;
    camera.position.y += (-eased.y * 1.8 + eased.scroll * 3 - camera.position.y) * 0.05;
    camera.position.z += ((12 - eased.scroll * 16) - camera.position.z) * 0.05;
    camera.lookAt(0, eased.scroll * 1.5, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
}

frame();
requestAnimationFrame(hideLoader);
