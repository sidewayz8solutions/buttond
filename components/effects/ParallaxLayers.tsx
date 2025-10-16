"use client";

import {
  useEffect,
  useRef,
  useState,
} from 'react';

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
        {/* orange sun + pink cloud */}
        <div
          className="absolute top-1/4 left-[15%] w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle at 40% 40%, var(--psy-orange), transparent 60%)' }}
        />
        <div
          className="absolute bottom-1/4 right-[15%] w-[26rem] h-[26rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle at 60% 60%, var(--psy-pink), transparent 60%)' }}
        />
        {/* subtle starfield */}
        <div className="absolute inset-0 psy-starfield" />
      </div>

      {/* Background Layer 2 - Medium */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${scrollY * 100}px)`,
          opacity: 0.2
        }}
      >
        <div
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, var(--psy-teal), transparent 60%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, var(--psy-blue), transparent 60%)' }}
        />
      </div>

      {/* Background Layer 3 - Fastest */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: reducedMotion ? 'none' : `translateY(${scrollY * 150}px)`,
          opacity: 0.1
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full blur-xl"
          style={{ background: 'conic-gradient(from 0deg, var(--psy-pink), var(--psy-orange), var(--psy-yellow), var(--psy-lime), var(--psy-teal), var(--psy-cyan), var(--psy-blue), var(--psy-purple), var(--psy-pink))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

