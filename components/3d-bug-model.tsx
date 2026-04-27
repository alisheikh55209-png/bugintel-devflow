'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface WorkspaceModelProps {
  isDark: boolean;
}

export function WorkspaceModel({ isDark }: WorkspaceModelProps) {
  const personRef = useRef<Group>(null);
  const laptopScreenRef = useRef<any>(null);

  useFrame((state) => {
    if (!personRef.current) return;

    // Subtle head movement while typing
    personRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    personRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.08;

    // Pulsing laptop screen glow
    if (laptopScreenRef.current) {
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      laptopScreenRef.current.emissiveIntensity = intensity;
    }
  });

  const chairColor = isDark ? '#1F2937' : '#E5E7EB';
  const deskColor = isDark ? '#2D3748' : '#F3F4F6';
  const personColor = isDark ? '#D1D5DB' : '#9CA3AF';
  const screenGlowColor = isDark ? '#06B6D4' : '#3B82F6';

  return (
    <group position={[0, -1.5, 0]}>
      {/* Desk */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.3, 2.5]} />
        <meshPhongMaterial color={deskColor} shininess={40} />
      </mesh>

      {/* Desk front panel */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.4, 0.2]} />
        <meshPhongMaterial color={deskColor} shininess={30} />
      </mesh>

      {/* Chair backrest */}
      <mesh position={[-0.5, 1.2, 0.8]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.6, 0.3]} />
        <meshPhongMaterial color={chairColor} shininess={20} />
      </mesh>

      {/* Chair seat */}
      <mesh position={[-0.5, 0.5, 0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshPhongMaterial color={chairColor} shininess={20} />
      </mesh>

      {/* Chair base/wheels */}
      <mesh position={[-0.5, 0.35, 0.8]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshPhongMaterial color={chairColor} shininess={15} />
      </mesh>

      {/* Person group */}
      <group ref={personRef} position={[-0.5, 1.8, 0.2]}>
        {/* Body/Torso */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.6, 0.3]} />
          <meshPhongMaterial color={personColor} shininess={30} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshPhongMaterial color={personColor} shininess={40} />
        </mesh>

        {/* Left arm */}
        <mesh position={[-0.25, 0.2, -0.2]} rotation={[0, 0, -0.5]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.5, 16]} />
          <meshPhongMaterial color={personColor} shininess={25} />
        </mesh>

        {/* Right arm - typing motion */}
        <mesh position={[0.25, 0.2, -0.2]} rotation={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.5, 16]} />
          <meshPhongMaterial color={personColor} shininess={25} />
        </mesh>

        {/* Left hand */}
        <mesh position={[-0.4, -0.1, -0.15]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhongMaterial color={personColor} shininess={35} />
        </mesh>

        {/* Right hand */}
        <mesh position={[0.4, -0.1, -0.15]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhongMaterial color={personColor} shininess={35} />
        </mesh>
      </group>

      {/* Laptop base */}
      <mesh position={[1.2, 1.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshPhongMaterial color="#1F2937" shininess={50} />
      </mesh>

      {/* Laptop screen back */}
      <mesh position={[1.2, 2.1, -0.15]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.6, 0.05]} />
        <meshPhongMaterial color="#1F2937" shininess={40} />
      </mesh>

      {/* Laptop screen (glowing) */}
      <mesh
        ref={laptopScreenRef}
        position={[1.2, 2.1, -0.08]}
        rotation={[-0.3, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.15, 0.55, 0.02]} />
        <meshPhongMaterial
          color={screenGlowColor}
          emissive={screenGlowColor}
          emissiveIntensity={0.5}
          shininess={100}
        />
      </mesh>

      {/* Monitor glow effect */}
      <mesh
        position={[1.2, 2.1, 0.2]}
        scale={[1.3, 0.8, 1]}
      >
        <boxGeometry args={[1.5, 0.8, 0.1]} />
        <meshBasicMaterial
          color={screenGlowColor}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0.5, 1.53, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.05, 0.25]} />
        <meshPhongMaterial color="#111827" shininess={60} />
      </mesh>

      {/* Mouse pad area */}
      <mesh position={[1.5, 1.52, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.02, 0.3]} />
        <meshPhongMaterial color={isDark ? '#1F2937' : '#E5E7EB'} shininess={20} />
      </mesh>
    </group>
  );
}
