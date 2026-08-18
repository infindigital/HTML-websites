import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import Packet from './Packet.jsx';
import { stage } from './stage.js';
import { products } from '../data/content.js';

const damp = THREE.MathUtils.damp;

function setOpacity(group, o) {
  if (!group) return;
  group.visible = o > 0.012;
  group.traverse((c) => {
    if (c.material) {
      c.material.transparent = true;
      c.material.opacity = o;
    }
  });
}

function ProductRig() {
  const root = useRef();
  const gobiRef = useRef();
  const threeRef = useRef();
  const cur = useRef({ ...stage.target });
  const { camera } = useThree();

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const tg = stage.target;
    const c = cur.current;
    const rm = stage.reduceMotion;
    const lambda = 3.2;

    // Ease every channel toward the section's target pose.
    for (const k of ['px', 'py', 'pz', 'ry', 'rx', 's', 'gobi', 'three', 'spread', 'camY']) {
      c[k] = damp(c[k], tg[k], lambda, dt);
    }

    // Drag inertia (accumulated Y rotation), decays to zero.
    stage.drag.offset += stage.drag.vy;
    stage.drag.vy *= 0.9;

    const px = rm ? 0 : stage.pointer.x;
    const py = rm ? 0 : stage.pointer.y;
    const idle = rm ? 0 : Math.sin(t * 0.4) * 0.04;

    if (root.current) {
      root.current.position.set(c.px, c.py + idle, c.pz);
      root.current.scale.setScalar(c.s);
      root.current.rotation.y = c.ry + stage.drag.offset + px * 0.35 + (rm ? 0 : t * 0.05);
      root.current.rotation.x = c.rx - py * 0.16;
    }

    const off = c.spread * 1.28;
    if (gobiRef.current) {
      gobiRef.current.position.x = -off;
      gobiRef.current.rotation.y = c.spread * 0.18;
      setOpacity(gobiRef.current, c.gobi);
    }
    if (threeRef.current) {
      threeRef.current.position.x = off;
      threeRef.current.rotation.y = -c.spread * 0.18;
      setOpacity(threeRef.current, c.three);
    }

    // Gentle camera dolly / vertical drift for cinematic feel.
    camera.position.y = damp(camera.position.y, c.camY + (rm ? 0 : py * 0.1), 2, dt);
    camera.lookAt(0, 0, 0);
  });

  const gobi = products.find((p) => p.key === 'gobi');
  const three = products.find((p) => p.key === 'threeInOne');

  return (
    <group ref={root}>
      <group ref={gobiRef}>
        <Packet front={gobi.front} back={gobi.back} />
      </group>
      <group ref={threeRef}>
        <Packet front={three.front} back={three.back} />
      </group>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#ffedd7" />
      <directionalLight position={[3, 5, 4]} intensity={2.1} color="#ffe6c9" castShadow
        shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#dc5000" />
      <pointLight position={[0, -2, 3]} intensity={12} color="#6c5f51" distance={12} />
      {/* Local environment generated from lightformers — no network fetch. */}
      <Environment resolution={128} frames={1} background={false}>
        <color attach="background" args={['#100904']} />
        <Lightformer form="rect" intensity={2.2} color="#ffedd7" position={[2, 3, 4]} scale={[6, 6, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#dc5000" position={[-3, 1, -2]} scale={[5, 5, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#ffe6c9" position={[0, 4, -3]} scale={[3, 3, 1]} />
      </Environment>
    </>
  );
}

export default function Scene({ onReady }) {
  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    const mobile = window.matchMedia('(max-width: 820px)').matches;
    return mobile ? [1, 1.5] : [1, 2];
  }, []);

  // Drag-to-rotate: track pointer horizontal movement over the canvas.
  useEffect(() => {
    let down = false;
    let lastX = 0;
    const onDown = (e) => { down = true; lastX = e.clientX; };
    const onMove = (e) => {
      // Parallax (always)
      stage.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (down && !stage.reduceMotion) {
        stage.drag.vy += (e.clientX - lastX) * 0.0016;
        lastX = e.clientX;
      }
    };
    const onUp = () => { down = false; };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.4], fov: 34 }}
      onCreated={() => { stage.ready = true; onReady && onReady(); }}
    >
      <Lighting />
      <ProductRig />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.5} scale={9} blur={2.6} far={4} color="#000000" />
    </Canvas>
  );
}
