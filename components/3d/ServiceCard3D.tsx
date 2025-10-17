"use client";

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';

interface ServiceCard3DProps {
  title: string;
  icon: string;
  description: string;
  details: string;
  isRecommended?: boolean;
  onInteraction?: () => void;
}

export default function ServiceCard3D({
  title,
  icon,
  description,
  details,
  isRecommended = false,
  onInteraction
}: ServiceCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30
  });

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

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onInteraction?.();
  };

  return (
    <div
      ref={cardRef}
      className="perspective-container h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d'
        }}
        onClick={handleClick}
        whileHover={reducedMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden neo-card glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {isRecommended && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/50 text-purple-200 text-xs font-semibold">
              Recommended
            </div>
          )}

          <div className="mb-6 filter drop-shadow-glow">
            {/(png|jpe?g|gif|webp|svg)$/i.test(icon) ? (
              <div className="relative w-[106px] h-[106px] mx-auto">
                <Image
                  src={icon.startsWith('/') ? icon : `/${icon}`}
                  alt={`${title} icon`}
                  fill
                  className="object-contain"
                  sizes="106px"
                />
              </div>
            ) : (
              <div className="text-[79px] leading-none">{icon}</div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 neon-text-subtle">
            {title}
          </h3>

          <p className="text-purple-200/70 leading-relaxed">
            {description}
          </p>

          <div className="mt-6 text-sm text-purple-300/50">
            Click to learn more
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden neo-card-back glass-card rounded-2xl p-8 flex flex-col justify-center"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 neon-text-subtle">
            {title}
          </h3>

          <p className="text-purple-100/80 leading-relaxed mb-6">
            {details}
          </p>

          <div className="mt-auto">
            <button type="button" className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/30 text-purple-100 font-semibold hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300">
              Get Started
            </button>
          </div>

          <div className="mt-4 text-sm text-purple-300/50 text-center">
            Click to flip back
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

