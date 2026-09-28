"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { LabKit } from "@/lib/products";

export type LabState = {
  kit: LabKit;
  view: "front" | "back";
  zoom: boolean;
  name: string;
  number: string;
  crest: boolean;
};

type Props = LabState & {
  /** Scroll progress of the section (0 → 1), written by the parent. */
  entry: RefObject<number>;
  onViewChange: (view: "front" | "back") => void;
  /** Called once the kit textures are uploaded and the first frame can paint. */
  onReady?: () => void;
  small: boolean;
};

const SIZE = 2.7; // plane edge in world units
const BEND = 0.16; // edge depth of the gentle fabric curve

/** A plane bowed toward the viewer so studio light falls off across it. */
function useCurvedPlane() {
  return useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, 64, 1);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) / (SIZE / 2);
      pos.setZ(i, -BEND * x * x);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

/** Texture UV → group-space point just above the surface. The back mesh is
 * rotated π about Y, which negates both x and z. */
const toPlane = ([u, v]: [number, number], back: boolean): [number, number, number] => {
  const x = (u - 0.5) * SIZE;
  const z = -BEND * (x / (SIZE / 2)) ** 2 + 0.02;
  return back ? [-x, (0.5 - v) * SIZE, -z] : [x, (0.5 - v) * SIZE, z];
};

function Callout({ at, label, value, show }: { at: [number, number, number]; label: string; value: string; show: boolean }) {
  return (
    <Html position={at} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div
        className={`flex -translate-y-1/2 items-center transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
      >
        <span className="relative -ml-[5px] block h-2.5 w-2.5 rounded-full bg-gold-soft ring-4 ring-gold-soft/25" />
        <span className="block h-px w-14 bg-gold-soft/70" />
        <span className="eyebrow whitespace-nowrap bg-ink/85 px-3 py-2 text-[0.625rem] text-bone backdrop-blur">
          <span className="text-faint">{label}</span> <span className="ml-1 text-bone">{value}</span>
        </span>
      </div>
    </Html>
  );
}

function Jersey({ kit, view, name, number, crest, entry, onViewChange, onReady, small, drag }: Props & { drag: RefObject<DragState> }) {
  const suffix = small ? "-sm" : "";
  const [front, back] = useTexture([`/images/lab/${kit.slug}-front${suffix}.webp`, `/images/lab/${kit.slug}-back${suffix}.webp`]);
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    for (const t of [front, back]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      t.needsUpdate = true;
    }
    onReady?.();
  }, [front, back, gl, onReady]);

  const geometry = useCurvedPlane();
  const group = useRef<THREE.Group>(null);
  const fade = useRef(0);
  const [facing, setFacing] = useState<"front" | "back">("front");
  const pointer = useThree((s) => s.pointer);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = drag.current!;
    const t = state.clock.elapsedTime;
    const base = view === "back" ? Math.PI : 0;
    const enter = (1 - (entry.current ?? 1)) * -0.9;

    if (d.active) {
      g.rotation.y = d.startRotation + d.dx * 0.012;
    } else {
      const idle = Math.sin(t * 0.45) * 0.1 + pointer.x * 0.16;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, base + idle + enter, 3.2, dt);
    }
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.06, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, Math.sin(t * 0.6) * 0.025, 2, dt);

    // Fade in on kit change (the group is re-keyed per kit).
    fade.current = THREE.MathUtils.damp(fade.current, 1, 4, dt);
    g.scale.setScalar(0.94 + fade.current * 0.06);
    g.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m && "opacity" in m) m.opacity = fade.current;
    });

    const cos = Math.cos(g.rotation.y);
    const now = cos >= 0 ? "front" : "back";
    if (now !== facing) setFacing(now);
    d.rotation = g.rotation.y;
    // On release, snap to whichever face is nearer and unwind whole turns so
    // the damping never spins the jersey back through 360°.
    d.onSettle = (r: number) => {
      const back = Math.abs(Math.round(r / Math.PI)) % 2 === 1;
      const target = back ? Math.PI : 0;
      g.rotation.y = r - 2 * Math.PI * Math.round((r - target) / (2 * Math.PI));
      onViewChange(back ? "back" : "front");
    };
  });

  const materialProps = { transparent: true, alphaTest: 0.35, roughness: 0.82, metalness: 0, side: THREE.FrontSide };

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshStandardMaterial map={front} {...materialProps} />
      </mesh>
      <mesh geometry={geometry} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial map={back} {...materialProps} />
      </mesh>

      <Callout at={toPlane(kit.crest, false)} label="Crest" value="Left chest" show={crest && facing === "front"} />
      <Callout at={toPlane(kit.name, true)} label="Name" value={name} show={!!name && facing === "back"} />
      <Callout at={toPlane(kit.number, true)} label="No." value={number} show={!!number && facing === "back"} />
    </group>
  );
}

function Rig({ zoom }: { zoom: boolean }) {
  useFrame(({ camera }, dt) => {
    camera.position.z = THREE.MathUtils.damp(camera.position.z, zoom ? 2.3 : 4.9, 2.6, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, zoom ? 0.55 : 0, 2.6, dt);
    camera.lookAt(0, zoom ? 0.5 : 0, 0);
  });
  return null;
}

type DragState = {
  active: boolean;
  dx: number;
  startRotation: number;
  rotation: number;
  onSettle?: (r: number) => void;
};

export default function LabCanvas(props: Props) {
  const drag = useRef<DragState>({ active: false, dx: 0, startRotation: 0, rotation: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const startX = useRef(0);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0 touch-pan-y"
      data-cursor="drag"
      // touch-action: pan-y leaves vertical swipes to page scrolling; horizontal
      // swipes arrive here as pointer moves and turn the kit.
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        startX.current = e.clientX;
        Object.assign(drag.current, { active: true, dx: 0, startRotation: drag.current.rotation });
      }}
      onPointerMove={(e) => {
        if (drag.current.active) drag.current.dx = e.clientX - startX.current;
      }}
      onPointerUp={() => {
        if (!drag.current.active) return;
        drag.current.active = false;
        drag.current.onSettle?.(drag.current.rotation);
      }}
      onPointerCancel={() => {
        if (!drag.current.active) return;
        drag.current.active = false;
        drag.current.onSettle?.(drag.current.rotation);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse" && drag.current.active) {
          drag.current.active = false;
          drag.current.onSettle?.(drag.current.rotation);
        }
      }}
    >
      <Canvas
        flat
        frameloop={inView ? "always" : "never"}
        dpr={[1, props.small ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 4.9], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <ambientLight intensity={0.42} />
        <directionalLight position={[-2.4, 2.2, 4]} intensity={2.15} color="#fff6e8" />
        <directionalLight position={[3, -0.5, 2.5]} intensity={0.35} color="#dfe6ff" />
        <Suspense fallback={null}>
          <Jersey key={props.kit.slug} {...props} drag={drag} />
        </Suspense>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.55} scale={5} blur={2.6} far={2} resolution={256} color="#000000" />
        <Rig zoom={props.zoom} />
      </Canvas>
    </div>
  );
}
