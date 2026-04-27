'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { WorkspaceModel } from './3d-bug-model';
import { Vector3 } from 'three';

interface SceneContentProps {
  isDark: boolean;
}

function SceneContent({ isDark }: SceneContentProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[3, 2, 4]} fov={50} />
      
      {/* Theme-aware lighting setup */}
      {isDark ? (
        <>
          <ambientLight intensity={0.5} color="#4B5563" />
          <directionalLight position={[10, 8, 5]} intensity={1.2} color="#E5E7EB" castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#6366F1" />
          <pointLight position={[3, 2, 2]} intensity={0.6} color="#22D3EE" />
        </>
      ) : (
        <>
          <ambientLight intensity={0.7} color="#FFFFFF" />
          <directionalLight position={[10, 8, 5]} intensity={0.9} color="#F3F4F6" castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#3B82F6" />
          <pointLight position={[3, 2, 2]} intensity={0.5} color="#0891B2" />
        </>
      )}

      {/* 3D Workspace Model */}
      <WorkspaceModel isDark={isDark} />

      {/* Camera controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.65}
      />
    </>
  );
}

function SceneLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

interface BugIntel3DSceneProps {
  isDark?: boolean;
}

export function BugIntel3DScene({ isDark = true }: BugIntel3DSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SceneLoading />;
  }

  const bgGradient = isDark
    ? 'from-background via-background to-primary/5'
    : 'from-slate-50 via-white to-blue-50';

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${bgGradient} overflow-hidden`}>
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
          dpr={[1, 2]}
        >
          <SceneContent isDark={isDark} />
        </Canvas>
      </Suspense>

      {/* Glow effect background */}
      <div className={`absolute inset-0 bg-gradient-radial ${isDark ? 'from-primary/10' : 'from-blue-200/20'} via-transparent to-transparent pointer-events-none`} />
      
      {/* Animated gradient orbs */}
      <div className={`absolute top-10 right-10 w-32 h-32 ${isDark ? 'bg-primary/20' : 'bg-blue-200/30'} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-20 left-10 w-40 h-40 ${isDark ? 'bg-secondary/20' : 'bg-cyan-200/30'} rounded-full blur-3xl animate-pulse animation-delay-300`} />
    </div>
  );
}
