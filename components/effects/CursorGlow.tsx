"use client";

import {
  useEffect,
  useRef,
  useState,
} from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      // Smooth lerp animation
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15;

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, isVisible]);

  if (reducedMotion || !isVisible) return null;

  return (
    <>
      {/* Main glow */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,79,163,0.25) 0%, rgba(79,216,255,0.18) 25%, rgba(91,127,255,0.14) 45%, transparent 70%)',
          filter: 'blur(40px)',
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Inner glow */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255,157,46,0.45) 0%, rgba(39,255,136,0.35) 40%, transparent 70%)',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Cursor dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          background: 'white',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(193,120,255,0.8)'
        }}
      />
    </>
  );
}

