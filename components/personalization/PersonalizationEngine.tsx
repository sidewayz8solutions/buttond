"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserBehavior {
  serviceClicks: Record<string, number>;
  scrollDepth: number;
  timeOnSections: Record<string, number>;
  lastVisit: string;
  neonIntensity: number;
}

export default function PersonalizationEngine() {
  const [behavior, setBehavior] = useState<UserBehavior>({
    serviceClicks: {},
    scrollDepth: 0,
    timeOnSections: {},
    lastVisit: new Date().toISOString(),
    neonIntensity: 1
  });
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Personalized welcome message
  const welcomeMessage = useMemo(() => {
    const lastVisit = new Date(behavior.lastVisit);
    const daysSinceVisit = Math.floor((Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceVisit === 0) return "Welcome back!";
    if (daysSinceVisit === 1) return "Nice to see you again!";
    if (daysSinceVisit > 7) return "It's been a while! Welcome back!";
    return "Welcome back!";
  }, [behavior.lastVisit]);

  // Load behavior from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userBehavior');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBehavior(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse user behavior:', e);
      }
    }
  }, []);

  // Save behavior to localStorage
  useEffect(() => {
    localStorage.setItem('userBehavior', JSON.stringify(behavior));
  }, [behavior]);

  // Apply neon intensity
  useEffect(() => {
    document.documentElement.style.setProperty('--neon-intensity', String(behavior.neonIntensity));
  }, [behavior.neonIntensity]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const adjustIntensity = (delta: number) => {
    setBehavior(prev => {
      const newIntensity = Math.max(0.5, Math.min(1.5, prev.neonIntensity + delta));
      return { ...prev, neonIntensity: newIntensity };
    });
    
    const level = behavior.neonIntensity + delta > 1.2 ? 'High' : 
                  behavior.neonIntensity + delta < 0.8 ? 'Low' : 'Medium';
    showToastMessage(`Glow intensity: ${level}`);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      {/* Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-2xl md:text-3xl neon-text-subtle mb-2">
          {greeting}
        </p>
        <p className="text-lg text-purple-300/70">
          {welcomeMessage}
        </p>
      </motion.div>

      {/* Intensity Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex items-center justify-center gap-4 mb-6"
      >
        <span className="text-sm text-purple-300/70">Glow Intensity:</span>
        <div className="flex gap-2">
          <button
            onClick={() => adjustIntensity(-0.2)}
            className="px-4 py-2 rounded-lg neo-button text-sm font-semibold text-purple-200 hover:text-white transition-colors"
            aria-label="Decrease glow intensity"
          >
            Low
          </button>
          <button
            onClick={() => setBehavior(prev => ({ ...prev, neonIntensity: 1 }))}
            className="px-4 py-2 rounded-lg neo-button text-sm font-semibold text-purple-200 hover:text-white transition-colors"
            aria-label="Medium glow intensity"
          >
            Med
          </button>
          <button
            onClick={() => adjustIntensity(0.2)}
            className="px-4 py-2 rounded-lg neo-button text-sm font-semibold text-purple-200 hover:text-white transition-colors"
            aria-label="Increase glow intensity"
          >
            High
          </button>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full neo-card glass-card border border-purple-400/30"
          >
            <p className="text-sm font-semibold text-purple-100">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export hook for tracking service interactions
export function useServiceTracking(serviceName: string) {
  const trackInteraction = () => {
    const stored = localStorage.getItem('userBehavior');
    if (stored) {
      try {
        const behavior = JSON.parse(stored);
        behavior.serviceClicks = behavior.serviceClicks || {};
        behavior.serviceClicks[serviceName] = (behavior.serviceClicks[serviceName] || 0) + 1;
        localStorage.setItem('userBehavior', JSON.stringify(behavior));
      } catch (e) {
        console.error('Failed to track service interaction:', e);
      }
    }
  };

  return { trackInteraction };
}

