/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import {
  Environment,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

function StaticLogo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/buttond11.png');
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating animation only
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.2, 5.2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GlowingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  // Procedural "moon" texture using canvas
  const moonTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null as unknown as THREE.CanvasTexture;

    // Base light gray
    ctx.fillStyle = '#dcdcdc';
    ctx.fillRect(0, 0, size, size);

    // Draw soft crater-like spots
    for (let i = 0; i < 700; i++) {
      const cx = Math.random() * size;
      const cy = Math.random() * size;
      const r = Math.random() * 18 + 4; // 4-22px
      const g = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      const depth = 0.15 + Math.random() * 0.25; // darkness
      g.addColorStop(0, `rgba(0,0,0,${0.6 * depth})`);
      g.addColorStop(0.6, `rgba(0,0,0,${0.15 * depth})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = g as unknown as string;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    if (!sphereRef.current) return;
    sphereRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, -2]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        color="#efefef"
        map={moonTexture || undefined}
        bumpMap={moonTexture || undefined}
        bumpScale={0.08}
        roughness={0.9}
        metalness={0.0}
        emissive="#dcdcdc"
        emissiveIntensity={0.16}
        wireframe={false}
      />
    </mesh>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const { size, camera } = useThree();

  // Adapt particle count to device DPR; memoize buffers
  const particleCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      return dpr > 1.5 ? 600 : 900; // slightly more to keep density across full screen
    }
    return 800;
  }, []);

  // Compute screen-space width/height in world units at a reference depth behind the logo
  const screenBounds = useMemo(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const zRef = -8; // mid-background between moon (-2) and far field
    const distance = cam.position.z - zRef;
    const height = 2 * Math.tan((cam.fov * Math.PI / 180) / 2) * distance;
    const width = height * (size.width / size.height);
    return { width: width * 1.3, height: height * 1.3 }; // margin so edges stay filled
  }, [camera, size]);

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spread across the whole hero viewport
      arr[i * 3] = (Math.random() - 0.5) * screenBounds.width;
      arr[i * 3 + 1] = (Math.random() - 0.5) * screenBounds.height;
      // Keep particles behind logo and text
      arr[i * 3 + 2] = -2 - Math.random() * 10; // [-12, -2]
    }
    return arr;
  }, [particleCount, screenBounds]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches !== reducedMotion) {
      setReducedMotion(mediaQuery.matches);
    }
  }

  return (
    <div className="relative w-full h-screen">
      <Canvas
        className="absolute inset-0"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => { gl.toneMappingExposure = 1.15; }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Lighting - psychedelic multi-color */}
        <ambientLight intensity={0.45} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color="#ff4fa3" />
        <pointLight position={[-10, 5, 5]} intensity={0.6} color="#ff9d2e" />
        <pointLight position={[5, -8, -2]} intensity={0.6} color="#2ee6a6" />
        <spotLight
          position={[0, 6, 6]}
          angle={0.35}
          penumbra={1}
          intensity={0.9}
          color="#4fd8ff"
        />
        <pointLight position={[0, 0, -8]} intensity={0.4} color="#c178ff" />
        {/* Neutral white fill to brighten logo and moon without tint */}
        <pointLight position={[0, 0, 6]} intensity={1.0} color="#ffffff" />
        
        {/* 3D Elements */}
        {!reducedMotion && <ParticleField />}
        <GlowingSphere />
        <StaticLogo />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="text-center space-y-6 px-4">
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl hero-purple-glow-text animate-fade-in">
            Button'd
          </h1>
          <p className="text-xl md:text-2xl text-white/80 animate-fade-in-delay">
            Design Your Path, Define Your Future
          </p>
        </div>
      </div>
    </div>
  );
}

