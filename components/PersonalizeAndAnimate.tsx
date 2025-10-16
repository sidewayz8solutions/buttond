"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Small, dependency-free client util that:
// - Shows a time-of-day greeting
// - Controls neon intensity via localStorage + CSS var
// - Adds intersection-based reveal animations
// - Tracks service interactions to mark a recommendation
// - Adds subtle cursor-following glow + parallax in hero
// - Respects prefers-reduced-motion

const INTENSITY_STEPS = [0.6, 1.0, 1.4] as const;

type Props = {
  showGreeting?: boolean;
  attachToHero?: boolean;
};

export default function PersonalizeAndAnimate({ showGreeting = true, attachToHero = true }: Props) {
  const [intensity, setIntensity] = useState<number>(() => {
    if (typeof window === "undefined") return 1.0;
    const saved = window.localStorage.getItem("neonIntensity");
    return saved ? parseFloat(saved) : 1.0;
  });

  const greeting = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Apply neon intensity to a CSS var
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--neon-intensity", String(intensity));
    window.localStorage.setItem("neonIntensity", String(intensity));
  }, [intensity]);

  // Intersection-based reveal
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"));
    if (nodes.length === 0) return;

    if (reduceMotion) {
      // Immediately reveal without animation
      nodes.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.1 }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Service interaction tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const svcCards = Array.from(document.querySelectorAll<HTMLElement>("[data-service]"));

    const getCounts = () => {
      try {
        return JSON.parse(window.localStorage.getItem("svcClicks") || "{}") as Record<string, number>;
      } catch {
        return {} as Record<string, number>;
      }
    };
    const setCounts = (obj: Record<string, number>) => window.localStorage.setItem("svcClicks", JSON.stringify(obj));

    // Attach listeners
    const handlers: Array<{ el: HTMLElement; fn: (e: Event) => void }> = [];
    svcCards.forEach((el) => {
      const name = el.dataset.service;
      if (!name) return;
      const fn = () => {
        const counts = getCounts();
        counts[name] = (counts[name] || 0) + 1;
        setCounts(counts);
        markRecommended();
      };
      el.addEventListener("click", fn);
      handlers.push({ el, fn });
    });

    function markRecommended() {
      const counts = getCounts();
      let top: { name: string; count: number } | null = null;
      for (const [k, v] of Object.entries(counts)) {
        if (!top || v > top.count) top = { name: k, count: v };
      }
      svcCards.forEach((el) => {
        if (top && el.dataset.service === top.name) el.dataset.recommended = "true";
        else delete el.dataset.recommended;
      });
    }

    markRecommended();

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, []);

  // Cursor-following glow + parallax in hero
  const glowRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!attachToHero || typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroElement = document.getElementById("hero-orb");
    if (!heroElement) return;

    // Cursor glow positioner
    const glow = glowRef.current;
    function onMove(e: MouseEvent) {
      if (!glow || !heroElement) return;
      const rect = heroElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.setProperty("--gx", `${x}px`);
      glow.style.setProperty("--gy", `${y}px`);
    }

    // Parallax on scroll
    function onScroll() {
      if (!heroElement) return;
      const y = window.scrollY || 0;
      heroElement.style.setProperty("--parallax", String(Math.min(1, Math.max(0, y / 400))));
    }

    if (!reduceMotion) {
      heroElement.addEventListener("mousemove", onMove);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    onScroll();

    return () => {
      if (!reduceMotion) {
        heroElement.removeEventListener("mousemove", onMove);
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [attachToHero]);

  // Cycle through glow intensity presets
  const cycleIntensity = () => {
    const idx = INTENSITY_STEPS.findIndex((v) => v === intensity);
    const next = INTENSITY_STEPS[(idx + 1) % INTENSITY_STEPS.length];
    setIntensity(next);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {showGreeting && (
        <div className="mt-6 text-lg md:text-xl neon-contact" data-animate>
          {greeting}, welcome to button&apos;d.
        </div>
      )}
      {/* Intensity control */}
      <button
        type="button"
        onClick={cycleIntensity}
        className="mt-4 px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        aria-label="Cycle neon glow intensity"
      >
        Glow: {intensity === 0.6 ? "Low" : intensity === 1.0 ? "Med" : "High"}
      </button>

      {/* Cursor glow overlay (positioned by CSS variables) */}
      {attachToHero && (
        <div
          ref={glowRef}
          className="cursor-glow"
          aria-hidden
        />
      )}
    </div>
  );
}

