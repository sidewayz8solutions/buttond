"use client";

import { useEffect, useRef, useState } from 'react';

interface ParallaxLayersProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxLayers({ children, className = '' }: ParallaxLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height + window.innerHeight);
      setScrollY(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background Layer 1 - Slowest */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${scrollY * 50}px)`,
          opacity: 0.3
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-600/20 blur-3xl" />
      </div>

      {/* Background Layer 2 - Medium */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${scrollY * 100}px)`,
          opacity: 0.2
        }}
      >
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-purple-500/30 blur-2xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-blue-500/30 blur-2xl" />
      </div>

      {/* Background Layer 3 - Fastest */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${scrollY * 150}px)`,
          opacity: 0.1
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-pink-500/40 blur-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

