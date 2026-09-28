"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * "Living fabric": one sheet of real kit fabric whose motion expresses each
 * claim. Every chapter is a set of cloth parameters; the sheet eases between
 * them and cross-fades to the next kit's fabric.
 */

export const FABRICS = ["breathable", "lightweight", "performance", "print", "fit"] as const;

type Pose = {
  amp: number; // wave height
  freq: number; // wave density
  speed: number; // wave speed
  lift: number; // vertical float
  stretch: number; // horizontal tension
  wrap: number; // 0 flat → 1 wrapped around a torso-sized cylinder
  spin: number; // slow turn around Y (radians/sec)
  tilt: number; // lean toward camera
  zoom: number; // camera distance
};

const POSES: Pose[] = [
  // Breathable: an open, billowing sheet with air moving through it
  { amp: 0.34, freq: 1.5, speed: 1.25, lift: 0, stretch: 1, wrap: 0, spin: 0, tilt: 0.12, zoom: 5.2 },
  // Lightweight: drifts upward, slow and loose
  { amp: 0.22, freq: 1.05, speed: 0.55, lift: 0.35, stretch: 0.96, wrap: 0, spin: 0.1, tilt: 0.3, zoom: 5.4 },
  // Performance ready: pulled taut, fast fine ripples
  { amp: 0.07, freq: 4.2, speed: 3.1, lift: 0, stretch: 1.16, wrap: 0, spin: 0, tilt: 0.05, zoom: 5 },
  // Durable print: nearly still, close up on the print
  { amp: 0.035, freq: 1.2, speed: 0.5, lift: 0, stretch: 1, wrap: 0, spin: 0, tilt: 0, zoom: 4.3 },
  // Athlete-first fit: wraps around the body and turns to show the fit
  { amp: 0.04, freq: 2, speed: 0.8, lift: 0, stretch: 1, wrap: 1, spin: 0.35, tilt: 0.08, zoom: 5.4 },
];

const W = 2.7;
const H = 2.7;
const WRAP_R = W / (Math.PI * 1.25); // full width covers 225° when wrapped

function Cloth({ chapter, lite }: { chapter: number; lite: boolean }) {
  const maps = useTexture(FABRICS.map((f) => `/images/fabric/${f}.webp`));
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    for (const t of maps) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    }
  }, [maps, gl]);

  const seg = lite ? 64 : 110;
  const geometry = useMemo(() => new THREE.PlaneGeometry(W, H, seg, seg), [seg]);
  const base = useMemo(() => Float32Array.from(geometry.attributes.position.array), [geometry]);
  const pose = useRef<Pose>({ ...POSES[0] });
  const group = useRef<THREE.Group>(null);
  const matA = useRef<THREE.MeshStandardMaterial>(null);
  const matB = useRef<THREE.MeshStandardMaterial>(null);
  const shown = useRef({ current: 0, next: 0, mix: 1 });
  const phase = useRef(0);
  const yaw = useRef(0);

  useFrame(({ clock, pointer }, dt) => {
    const target = POSES[chapter];
    const p = pose.current;
    for (const k of Object.keys(p) as (keyof Pose)[]) p[k] = THREE.MathUtils.damp(p[k], target[k], 2.2, dt);
    phase.current += dt * p.speed;
    const t = phase.current;

    // Displace the sheet. The top edge hangs; motion grows toward the free edge.
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const free = 0.25 + 0.75 * ((H / 2 - by) / H); // 0.25 at top → 1 at bottom
      const wave =
        Math.sin(bx * p.freq + t * 1.7) * 0.55 +
        Math.sin(by * p.freq * 0.8 - t * 1.3 + bx * 0.6) * 0.35 +
        Math.sin((bx + by) * p.freq * 1.9 + t * 2.3) * 0.1;
      let x = bx * p.stretch;
      let z = wave * p.amp * free;
      if (p.wrap > 0.001) {
        const a = x / WRAP_R;
        const wx = Math.sin(a) * (WRAP_R + z);
        const wz = Math.cos(a) * (WRAP_R + z) - WRAP_R;
        x = THREE.MathUtils.lerp(x, wx, p.wrap);
        z = THREE.MathUtils.lerp(z, wz, p.wrap);
      }
      const y = by + p.lift * Math.sin(t * 0.6 + bx * 0.4) * 0.35 * free;
      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    const g = group.current;
    if (g) {
      yaw.current += dt * p.spin;
      if (p.spin < 0.02) yaw.current = THREE.MathUtils.damp(yaw.current, 0, 2, dt);
      g.rotation.y = yaw.current + pointer.x * 0.18;
      g.rotation.x = -p.tilt + pointer.y * -0.08;
      g.position.y = p.lift * 0.5 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }

    // Cross-fade to the next chapter's fabric.
    const s = shown.current;
    if (s.next !== chapter && s.mix >= 1) {
      s.next = chapter;
      s.mix = 0;
    }
    if (s.mix < 1) {
      s.mix = Math.min(1, s.mix + dt * 1.4);
      if (s.mix >= 1) s.current = s.next;
    }
    if (matA.current && matB.current) {
      matA.current.map = maps[s.current];
      matB.current.map = maps[s.next];
      matA.current.opacity = 1;
      matB.current.opacity = s.mix < 1 ? s.mix : 0;
      matB.current.visible = s.mix < 1;
    }
  });

  // Matte and non-metallic: light shades the fabric but never tints it, so
  // the supplied kit colours stay true.
  const common = { side: THREE.DoubleSide, roughness: 1, metalness: 0 };

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshStandardMaterial ref={matA} map={maps[0]} {...common} />
      </mesh>
      <mesh geometry={geometry} renderOrder={1}>
        <meshStandardMaterial
          ref={matB}
          map={maps[0]}
          {...common}
          transparent
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
    </group>
  );
}

/**
 * Keeps the sheet a fixed share of the screen whatever its shape: ~60% of the
 * height on wide screens (placed right of centre, clear of the claim) and ~80%
 * of the width on phones (placed above the claim). Each pose scales that.
 */
function Rig({ chapter, lite }: { chapter: number; lite: boolean }) {
  const size = useThree((s) => s.size);
  useFrame(({ camera }, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const tan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const aspect = size.width / size.height;
    const fitHeight = H / (0.6 * 2 * tan);
    const fitWidth = (W * 1.2) / (0.8 * 2 * tan * aspect);
    const base = lite ? Math.max(fitHeight, fitWidth) : fitHeight;
    const z = base * (POSES[chapter].zoom / POSES[0].zoom);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, z, 1.8, dt);
    // Shift the view, not the sheet, so the cloth sits clear of the text.
    const halfW = cam.position.z * tan * aspect;
    cam.position.x = lite ? 0 : -halfW * 0.36;
    cam.position.y = lite ? -cam.position.z * tan * 0.28 : 0;
    cam.lookAt(cam.position.x, cam.position.y, 0);
  });
  return null;
}

export default function FabricCanvas({ chapter, lite = false, onReady }: { chapter: number; lite?: boolean; onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px" });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        flat
        dpr={lite ? [1, 1.3] : [1, 1.6]}
        frameloop={inView ? "always" : "never"}
        camera={{ fov: 38, position: [0, 0, 5.2] }}
        gl={{ antialias: true, alpha: true }}
        aria-hidden
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[-3, 3, 5]} intensity={2.3} color="#fff6e8" />
        <directionalLight position={[4, -1, -3]} intensity={0.6} color="#ffffff" />
        <Suspense fallback={null}>
          <Cloth chapter={chapter} lite={lite} />
          <Ready onReady={onReady} />
        </Suspense>
        <Rig chapter={chapter} lite={lite} />
      </Canvas>
    </div>
  );
}

function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}
