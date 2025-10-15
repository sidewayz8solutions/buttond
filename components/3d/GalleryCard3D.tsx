"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface GalleryCard3DProps {
  title: string;
  description: string;
  imageSrc?: string;
  index: number;
}

export default function GalleryCard3D({
  title,
  description,
  imageSrc,
  index
}: GalleryCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={cardRef}
      className="perspective-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative group cursor-pointer"
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d'
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={reducedMotion ? {} : { scale: 1.05, z: 50 }}
      >
        <div className="relative neo-card glass-card rounded-2xl overflow-hidden">
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(193,120,255,0.3), transparent 50%)`
            }}
          />

          {/* Image placeholder or actual image */}
          <div className="relative h-64 bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-6xl opacity-50">🎨</div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 neon-text-subtle">
              {title}
            </h3>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* 3D depth indicator */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50"
            style={{ transform: 'translateZ(10px)' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

