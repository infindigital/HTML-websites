import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import { AdditiveBlending, Color } from 'three'

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

// Jewel-tone palette for the celebration "world".
const JEWELS = ['#ff6f91', '#ff9a76', '#f0c24b', '#2fbf9b', '#3fb9d4', '#5b8def', '#a679f0', '#ff8fb3']

function Ring({ rotation, scale = 1, color, emissive }) {
  return (
    <mesh rotation={rotation} scale={scale}>
      <torusGeometry args={[1.5, 0.075, 26, 150]} />
      <meshStandardMaterial color={color} metalness={0.75} roughness={0.22} emissive={emissive} emissiveIntensity={0.35} />
    </mesh>
  )
}

// A floating faceted gem - one of several platonic solids.
function Gem({ kind, position, color, scale, speed, phase }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime * speed + phase
    ref.current.position.y = position[1] + Math.sin(t) * 0.35
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.6
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {kind === 'octa' && <octahedronGeometry args={[1, 0]} />}
      {kind === 'ico' && <icosahedronGeometry args={[1, 0]} />}
      {kind === 'dodeca' && <dodecahedronGeometry args={[1, 0]} />}
      {kind === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial color={color} metalness={0.35} roughness={0.2} emissive={color} emissiveIntensity={0.3} flatShading />
    </mesh>
  )
}

// Small glowing orbs drifting around the scene.
function Orb({ position, color, speed, phase }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime * speed + phase
    ref.current.position.y = position[1] + Math.sin(t) * 0.5
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.25
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.075, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.35} />
    </mesh>
  )
}

// A soft, colorful field of drifting sparkles (additive points).
function Sparkles({ count = 140 }) {
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const c = new Color()
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
      c.set(JEWELS[Math.floor(Math.random() * JEWELS.length)])
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} blending={AdditiveBlending} />
    </points>
  )
}

function Scene() {
  const group = useRef()
  useFrame((s, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.18
    const px = s.pointer.x * 0.35
    const py = s.pointer.y * 0.22
    group.current.rotation.x += (py - group.current.rotation.x) * 0.04
    group.current.position.x += (px - group.current.position.x) * 0.04
  })

  const gems = useMemo(() => {
    const kinds = ['octa', 'ico', 'dodeca', 'tetra']
    return [
      { kind: 'octa', position: [-2.6, 0.9, -0.5], color: '#ff6f91', scale: 0.42, speed: 0.5, phase: 0 },
      { kind: 'dodeca', position: [2.7, 0.3, -0.8], color: '#a679f0', scale: 0.46, speed: 0.45, phase: 1.4 },
      { kind: 'ico', position: [2.1, -1.3, 0.4], color: '#2fbf9b', scale: 0.4, speed: 0.55, phase: 2.7 },
      { kind: 'tetra', position: [-2.3, -1.2, 0.2], color: '#3fb9d4', scale: 0.44, speed: 0.5, phase: 4 },
      { kind: 'octa', position: [0.2, 1.7, -1], color: '#f0c24b', scale: 0.34, speed: 0.6, phase: 5.2 },
    ].map((g) => ({ ...g, kind: kinds.includes(g.kind) ? g.kind : 'ico' }))
  }, [])

  const orbs = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        position: [(Math.random() - 0.5) * 6.5, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3 - 0.5],
        color: JEWELS[Math.floor(Math.random() * JEWELS.length)],
        speed: 0.5 + Math.random() * 0.7,
        phase: Math.random() * 6,
      })),
    [],
  )

  return (
    <group ref={group} scale={0.62}>
      {/* interlocking rings - rose-gold + gold */}
      <Ring rotation={[Math.PI / 2.3, 0, 0]} color="#f0a878" emissive="#7a4a2a" />
      <Ring rotation={[Math.PI / 2.3, 0.95, 0.5]} scale={0.9} color="#f2cf6a" emissive="#7a5f1e" />
      {gems.map((g, i) => (
        <Gem key={`g${i}`} {...g} />
      ))}
      {orbs.map((o, i) => (
        <Orb key={`o${i}`} {...o} />
      ))}
      <Sparkles />
    </group>
  )
}

// A vivid, colorful 3D "world": jewel-tone gems, glowing orbs, interlocking
// rings and a drifting sparkle field, lit with rose/teal/violet/gold light.
// Transparent canvas so the colorful hero gradient shows through. Reduced-
// motion visitors get a soft static ornament instead.
export default function Hero3D() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <div className="hero3d hero3d--static" aria-hidden="true" />
  return (
    <div className="hero3d" aria-hidden="true">
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={1.05} color="#fff2d6" />
        <pointLight position={[-4, 2, 2]} intensity={1.1} color="#ff6f91" />
        <pointLight position={[4, -1, 2]} intensity={0.9} color="#2fbf9b" />
        <pointLight position={[0, -3, 3]} intensity={0.8} color="#7c5cff" />
        <Scene />
      </Canvas>
    </div>
  )
}
