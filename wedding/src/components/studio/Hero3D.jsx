import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(m.matches)
    on()
    m.addEventListener?.('change', on)
    return () => m.removeEventListener?.('change', on)
  }, [])
  return reduced
}

function Ring({ rotation, scale = 1 }) {
  return (
    <mesh rotation={rotation} scale={scale}>
      <torusGeometry args={[1.4, 0.085, 24, 140]} />
      <meshStandardMaterial color="#caa24a" metalness={0.55} roughness={0.28} emissive="#6b5320" emissiveIntensity={0.25} />
    </mesh>
  )
}

function Petal({ position, color, speed, phase }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime * speed + phase
    ref.current.position.y = position[1] + Math.sin(t) * 0.28
    ref.current.rotation.z = t * 0.4
    ref.current.rotation.x = t * 0.3
  })
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.07, 0]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  )
}

function Scene() {
  const group = useRef()
  useFrame((s, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.22
    const px = s.pointer.x * 0.3
    const py = s.pointer.y * 0.2
    group.current.rotation.x += (py - group.current.rotation.x) * 0.05
    group.current.position.x += (px - group.current.position.x) * 0.05
  })
  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        position: [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2 - 0.5],
        color: i % 4 === 0 ? '#d8a7a0' : '#e7cf8f',
        speed: 0.6 + Math.random() * 0.6,
        phase: Math.random() * 6,
      })),
    [],
  )
  return (
    <group ref={group} position={[0, 0.15, 0]} scale={0.58}>
      <Ring rotation={[Math.PI / 2.4, 0, 0]} />
      <Ring rotation={[Math.PI / 2.4, 0.9, 0.5]} scale={0.92} />
      {petals.map((p, i) => (
        <Petal key={i} {...p} />
      ))}
    </group>
  )
}

// Interlocking gold rings + floating petals. Transparent canvas so the light
// hero shows through. Reduced-motion users get a soft static ornament instead.
export default function Hero3D() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <div className="hero3d hero3d--static" aria-hidden="true" />
  return (
    <div className="hero3d" aria-hidden="true">
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 5.2], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#f0dca0" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#ffe9b0" />
        <Scene />
      </Canvas>
    </div>
  )
}
