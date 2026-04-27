'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferGeometry, PointsMaterial, BufferAttribute, Vector3 } from 'three';

export function ParticleSystem() {
  const pointsRef = useRef<Points>(null);
  const particlesCount = 300;

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry as BufferGeometry;
    const positions = new Float32Array(particlesCount * 3);

    // Create particles in orbiting patterns
    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 2;
      const radius = 2 + Math.random() * 1.5;
      const height = (Math.random() - 0.5) * 3;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = (pointsRef.current.geometry as BufferGeometry).attributes.position.array as Float32Array;

    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 2 + state.clock.elapsedTime * 0.3;
      const radius = 2 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(state.clock.elapsedTime * 0.2 + i * 0.1) * 1.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    (pointsRef.current.geometry as BufferGeometry).attributes.position.needsUpdate = true;

    pointsRef.current.rotation.x += 0.0001;
    pointsRef.current.rotation.z += 0.0002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.15}
        sizeAttenuation={true}
        color="#22D3EE"
        transparent
        opacity={0.6}
      />
    </points>
  );
}
