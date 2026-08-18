import { useMemo } from 'react';
import { RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A single RS Chef'z masala pouch, built procedurally so the model can be
 * swapped for a real GLB later (drop it in /public/models and replace this
 * component's body). The real product artwork is texture-mapped onto the
 * front and back faces; the sides read as dark warm foil.
 *
 * Proportions follow the pack artwork (1094 x 1403 ≈ 0.78 : 1).
 */
const H = 2.6;
const W = H * 0.78;
const D = 0.34;

export default function Packet({ front, back, opacity = 1, ...props }) {
  const [frontTex, backTex] = useTexture([front, back], (texs) => {
    texs.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  });

  const foil = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#241811',
        metalness: 0.62,
        roughness: 0.32,
      }),
    []
  );

  const visible = opacity > 0.01;

  const artProps = {
    transparent: true,
    opacity,
    roughness: 0.58,
    metalness: 0.08,
    side: THREE.FrontSide,
  };

  return (
    <group visible={visible} {...props}>
      {/* Foil body with soft rounded edges */}
      <RoundedBox args={[W, H, D]} radius={0.08} smoothness={4} steps={1} material={foil}
        material-transparent material-opacity={opacity} castShadow receiveShadow />

      {/* Crimped top seal */}
      <mesh position={[0, H / 2 + 0.02, 0]} castShadow>
        <boxGeometry args={[W * 0.99, 0.12, D * 0.5]} />
        <meshStandardMaterial color="#3a2a1c" metalness={0.7} roughness={0.28}
          transparent opacity={opacity} />
      </mesh>

      {/* Front artwork */}
      <mesh position={[0, 0, D / 2 + 0.006]}>
        <planeGeometry args={[W * 0.985, H * 0.985]} />
        <meshStandardMaterial map={frontTex} {...artProps} />
      </mesh>

      {/* Back artwork */}
      <mesh position={[0, 0, -D / 2 - 0.006]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W * 0.985, H * 0.985]} />
        <meshStandardMaterial map={backTex} {...artProps} />
      </mesh>
    </group>
  );
}

export const PACKET_DIMS = { H, W, D };
