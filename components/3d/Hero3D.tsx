/* eslint-disable react/no-unescaped-entities */
"use client";

import {
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
} from '@react-three/fiber';

function RotatingLogo({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/button.png');
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation based on mouse position
    const targetRotationY = mouseX * 0.5;
    const targetRotationX = -mouseY * 0.3;
    
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
    
    // Gentle continuous rotation
    meshRef.current.rotation.z += 0.001;
    
    // Floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.2, 5.2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        emissive="#c178ff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function GlowingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;
    sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, -2]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        color="#1a0a2e"
        emissive="#b478ff"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 800;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
  }
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePosition({ x, y });
  };

  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches !== reducedMotion) {
      setReducedMotion(mediaQuery.matches);
    }
  }

  return (
    <div 
      className="relative w-full h-screen"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        className="absolute inset-0"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Lighting - psychedelic multi-color */}
        <ambientLight intensity={0.25} />
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
        
        {/* 3D Elements */}
        {!reducedMotion && <ParticleField />}
        <GlowingSphere />
        <RotatingLogo mouseX={mousePosition.x} mouseY={mousePosition.y} />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="text-center space-y-6 px-4">
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl psy-rainbow-text animate-fade-in">
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

