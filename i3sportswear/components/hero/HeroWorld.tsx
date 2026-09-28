"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { jerseys } from "@/lib/products";

/**
 * "The Kit Room": the supplied kits hang in a ring around the centre circle
 * of a dark pitch, the iTHREE mark set into the turf. Scroll turns the camera
 * through the ring, then cranes up to reveal the whole room.
 */

// Kits in ring order, starting with the one the camera faces first.
// 11.png is excluded: it ships with its own grey studio backdrop.
const RING = [
  "noir-gold",
  "yellow-circuit",
  "sky-brush",
  "ivory-gold",
  "crimson-wolf",
  "teal-stripe",
  "storm-blue",
  "black-volt",
  "coral-teal",
  "azure-geo",
  "ink-dragon",
];
const RADIUS = 7.2;
const KIT_H = 2.35;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Kits({ lite }: { lite: boolean }) {
  const list = RING.map((slug) => jerseys.find((j) => j.slug === slug)!);
  const maps = useTexture(list.map((j) => `/images/jerseys/${j.slug}-${lite ? 480 : 960}.webp`));
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    for (const t of maps) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    }
  }, [maps, gl]);

  return (
    <group>
      {list.map((j, i) => {
        // Kit 0 sits straight ahead of the starting camera (−z).
        const a = (i / list.length) * Math.PI * 2;
        const x = Math.sin(a) * RADIUS;
        const z = -Math.cos(a) * RADIUS;
        const w = (KIT_H * j.w) / j.h;
        return (
          <group key={j.slug} position={[x, 0, z]} rotation={[0, -a, 0]}>
            <mesh position={[0, KIT_H / 2 + 0.25, 0]}>
              <planeGeometry args={[w, KIT_H]} />
              <meshBasicMaterial map={maps[i]} transparent alphaTest={0.3} toneMapped={false} />
            </mesh>
            {/* light pool on the floor under each kit */}
            <mesh position={[0, 0.005, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[Math.max(w, 1.6) * 0.62, 48]} />
              <meshBasicMaterial map={poolTexture()} transparent depthWrite={false} opacity={0.5} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
      {/* hanging rail */}
      <mesh position={[0, KIT_H + 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.012, 8, 160]} />
        <meshBasicMaterial color="#c9a227" transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </group>
  );
}

let pool: THREE.Texture | null = null;
/** Soft warm radial gradient, generated once. */
function poolTexture() {
  if (pool) return pool;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,236,196,0.55)");
  grd.addColorStop(0.5, "rgba(224,193,90,0.12)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  pool = new THREE.CanvasTexture(c);
  pool.colorSpace = THREE.SRGBColorSpace;
  return pool;
}

/** Pitch markings and the iTHREE mark in the centre circle. */
function Pitch() {
  const logo = useTexture("/images/logo-480.webp");
  logo.colorSpace = THREE.SRGBColorSpace;
  const lines = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ color: "#f5f5f2", transparent: true, opacity: 0.16, toneMapped: false });
    return m;
  }, []);
  return (
    <group position={[0, 0.004, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={lines}>
        <ringGeometry args={[2.9, 2.94, 128]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={lines}>
        <circleGeometry args={[0.07, 24]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={lines}>
        <planeGeometry args={[0.04, RADIUS * 2.6]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[2.35, 2.0]} />
        <meshBasicMaterial map={logo} transparent opacity={0.85} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Floor({ lite }: { lite: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        blur={lite ? [200, 60] : [400, 120]}
        resolution={lite ? 256 : 1024}
        mixBlur={1}
        mixStrength={18}
        roughness={0.92}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        color="#0a0a0a"
        metalness={0.55}
        mirror={0.6}
      />
    </mesh>
  );
}

/** Scroll-driven camera: ahead → turn through the ring → crane up over the circle. */
function CameraRig({ progress, still, portrait }: { progress: RefObject<number>; still: boolean; portrait: boolean }) {
  const look = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef(0);
  useFrame(({ camera, pointer, clock }, dt) => {
    const p = still ? 0 : (progress.current ?? 0);
    smooth.current = THREE.MathUtils.damp(smooth.current, p, 4, dt);
    const s = smooth.current;
    const t = still ? 0 : clock.elapsedTime;

    const turn = ease(clamp01(s / 0.62)); // 0 → 1 over the first part
    const crane = ease(clamp01((s - 0.45) / 0.55)); // 0 → 1 over the second

    // Start angled so the lead kit sits beside the headline, not behind it.
    const yaw = (portrait ? 0 : -0.3) - turn * Math.PI * 0.72 + Math.sin(t * 0.12) * 0.04 * (1 - crane) + pointer.x * -0.06;
    const dist = THREE.MathUtils.lerp(2.6, 0.2, turn); // pull back from the kit toward the centre
    const height = THREE.MathUtils.lerp(1.35, 10.5, crane) + pointer.y * 0.08;
    const back = THREE.MathUtils.lerp(0, 7.5, crane);

    // Camera orbits the centre; it looks outward at the ring, then down at the circle.
    const dir = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
    camera.position.set(-dir.x * (dist + back), height, -dir.z * (dist + back));
    // On portrait screens aim lower so the kits fill the top of the frame above the headline.
    const lookOut = new THREE.Vector3(dir.x * RADIUS, portrait ? 0.35 : 1.35, dir.z * RADIUS);
    const lookDown = new THREE.Vector3(dir.x * 1.2, 0, dir.z * 1.2);
    look.copy(lookOut).lerp(lookDown, crane);
    camera.lookAt(look);
  });
  return null;
}

export default function HeroWorld({
  progress,
  still = false,
  lite = false,
  onReady,
  onLost,
}: {
  progress: RefObject<number>;
  still?: boolean;
  /** Phone mode: smaller textures, cheaper reflections, portrait framing. */
  lite?: boolean;
  onReady?: () => void;
  /** Mobile browsers can drop the GL context; the parent falls back to the still. */
  onLost?: () => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        flat
        dpr={lite ? [1, 1.25] : [1, 1.5]}
        frameloop={inView ? (still ? "demand" : "always") : "never"}
        camera={{ fov: lite ? 58 : 42, near: 0.1, far: 60, position: [0, 1.35, 2.6] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ scene, gl }) => {
          scene.background = new THREE.Color("#050505");
          scene.fog = new THREE.Fog("#050505", 6, 19);
          gl.domElement.addEventListener("webglcontextlost", () => onLost?.());
        }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <Kits lite={lite} />
          <Pitch />
          <Floor lite={lite} />
          <Ready onReady={onReady} />
        </Suspense>
        <CameraRig progress={progress} still={still} portrait={lite} />
      </Canvas>
    </div>
  );
}

/** Fires once everything inside the Suspense boundary has loaded. */
function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}
