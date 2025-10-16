"use client";

import {
  Suspense,
  useRef,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import GalleryCard3D from '@/components/3d/GalleryCard3D';
import ServiceCard3D from '@/components/3d/ServiceCard3D';
import CursorGlow from '@/components/effects/CursorGlow';
import ParallaxLayers from '@/components/effects/ParallaxLayers';
import PersonalizationEngine, {
  useServiceTracking,
} from '@/components/personalization/PersonalizationEngine';
import AnimatedSection from '@/components/ui/AnimatedSection';

// Dynamically import Hero3D with no SSR
const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-4xl neon-text animate-pulse">Loading...</div>
    </div>
  )
});

type Service = {
  icon: string;
  title: string;
  description: string;
  details: string;
};

function ServiceCardWrapper({ service }: { service: Service }) {
  const { trackInteraction } = useServiceTracking(service.title);

  return (
    <ServiceCard3D
      {...service}
      onInteraction={trackInteraction}
    />
  );
}

export default function Home() {
  const services = [
    {
      icon: "🎨",
      title: "Brand Creation",
      description: "Building powerful brands from the ground up",
      details: "We craft complete brand identities that resonate with your audience. From logo design to brand guidelines, we create cohesive visual systems that tell your story and set you apart from the competition."
    },
    {
      icon: "🔄",
      title: "Rebranding",
      description: "Transforming existing brands for modern markets",
      details: "Breathe new life into your brand. We analyze your current position, identify opportunities, and reimagine your brand identity to align with your evolved vision and connect with today's audiences."
    },
    {
      icon: "💻",
      title: "Website Development",
      description: "Revolutionary digital experiences that convert",
      details: "We build stunning, high-performance websites that don't just look amazing—they drive results. From e-commerce to portfolios, we create digital experiences that revolutionize how your customers interact with your brand."
    },
    {
      icon: "🚀",
      title: "Digital Strategy",
      description: "Complete digital transformation solutions",
      details: "We help companies revolutionize their entire digital presence. From strategy to execution, we provide comprehensive solutions that modernize your brand and position you for growth in the digital age."
    },
  ];

  const projects = [
    {
      name: "Püper",
      description: "Brand and website design",
      imageSrc: "/puper.png"
    },
    {
      name: "PageMint",
      description: "Brand and website design",
      imageSrc: "/pagemint.png"
    },
    {
      name: "Sidewayz 8 Solutions",
      description: "Brand and website design",
      imageSrc: "/s8.png"
    },
  ];

  const servicesVideoRef = useRef<HTMLVideoElement>(null);
  const [servicesMuted, setServicesMuted] = useState(true);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);
  const [aboutMuted, setAboutMuted] = useState(true);
  const [aboutPlaying, setAboutPlaying] = useState(false);
  const aboutVideoRef2 = useRef<HTMLVideoElement>(null);
  const aboutVideoRef3 = useRef<HTMLVideoElement>(null);
  const [aboutMuted2, setAboutMuted2] = useState(true);
  const [aboutPlaying2, setAboutPlaying2] = useState(false);
  const [aboutMuted3, setAboutMuted3] = useState(true);
  const [aboutPlaying3, setAboutPlaying3] = useState(false);
  const aboutVideoRef4 = useRef<HTMLVideoElement>(null);
  const [aboutMuted4, setAboutMuted4] = useState(true);
  const [aboutPlaying4, setAboutPlaying4] = useState(false);

  // Video click handlers
  const handleVideoClick = (videoRef: React.RefObject<HTMLVideoElement | null>, playing: boolean, setPlaying: (playing: boolean) => void) => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor Glow */}
      <CursorGlow />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 neo-nav glass-card border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-script text-2xl neon-text-subtle">Button&apos;d</div>
            <div className="hidden md:flex space-x-8">
              <a href="#hero" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#gallery" className="nav-link">Our Work</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D */}
      <section id="hero" className="relative">
        <Suspense fallback={
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="text-4xl neon-text animate-pulse">Loading...</div>
          </div>
        }>
          <Hero3D />
        </Suspense>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-purple-300/50 text-sm"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* Personalization Section */}
      <ParallaxLayers className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PersonalizationEngine />
        </div>
      </ParallaxLayers>n

      {/* Services Section with 3D Cards */}
      <ParallaxLayers>
        <section id="services" className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
          {/* Background video: e.mp4 */}
          <video
            ref={servicesVideoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-50 transform scale-95"
            src="/e.mp4"
            autoPlay
            muted={servicesMuted}
            loop
            playsInline
            preload="metadata"
          />
          {/* Dark gradient overlay for legibility */}
          <div className="absolute inset-0 pointer-events-none services-video-overlay" />

          {/* Audio toggle */}
          <div className="absolute z-20 top-4 right-4">
            <button
              type="button"
              aria-label={servicesMuted ? 'Unmute background video' : 'Mute background video'}
              onClick={() => {
                const next = !servicesMuted;
                setServicesMuted(next);
                if (servicesVideoRef.current) {
                  servicesVideoRef.current.muted = next;
                  if (!next) servicesVideoRef.current.volume = 0.6;
                }
              }}
              className="neo-button text-sm px-3 py-1.5 rounded-full text-purple-100 hover:text-white"
            >
              {servicesMuted ? 'Sound Off 🔇' : 'Sound On 🔊'}
            </button>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 neon-text">
                Our Services
              </h2>
              <p className="text-center text-purple-200/70 text-lg mb-20 max-w-2xl mx-auto">
                We revolutionize companies through strategic branding and cutting-edge web development
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <ServiceCardWrapper service={service} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </ParallaxLayers>

      {/* About Section */}
      <ParallaxLayers>
        <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 neon-text">
                About
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="neo-card glass-card rounded-3xl p-8 md:p-12 border border-purple-400/20">
                <div className="space-y-6 text-lg text-purple-100/80 leading-relaxed">
                  <p>
                    <span className="text-purple-300 font-semibold">Buttond</span> is a creative agency
                    specializing in brand transformation and digital innovation. We partner with companies
                    ready to revolutionize their market presence through strategic rebranding and
                    cutting-edge web development.
                  </p>
                  <p>
                    Whether you are launching a new brand or reimagining an existing one, we create
                    <span className="text-purple-300 font-semibold"> complete brand identities and high-performance websites</span> that
                    do not just look stunning—they drive real business results. From startups to established
                    companies, we help brands evolve and thrive in the digital age.
                  </p>
                  <p>
                    Based in <span className="text-purple-300 font-semibold">New Orleans</span>, we bring
                    creative energy and strategic thinking to every project. Our approach combines data-driven
                    insights with bold, innovative design to create brands that stand out and websites that convert.
                  </p>
                  <div className="pt-6 border-t border-purple-400/20">
                    <p className="text-center text-purple-300/70 italic">
                      Strategic Branding • Revolutionary Design • Measurable Results
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.35}>
              <div className="flex flex-col gap-10 mt-10">
                {/* time.mp4 */}
                <div className="neo-card glass-card rounded-3xl p-0 overflow-hidden border border-purple-400/20">
                  <div className="relative aspect-video">
                    <div className="absolute z-20 top-3 right-3 flex gap-2">
                      <button
                        type="button"
                        aria-label={aboutMuted ? 'Unmute video' : 'Mute video'}
                        onClick={() => {
                          const next = !aboutMuted;
                          setAboutMuted(next);
                          if (aboutVideoRef.current) {
                            aboutVideoRef.current.muted = next;
                            if (!next) aboutVideoRef.current.volume = 0.6;
                          }
                        }}
                        className="neo-button text-xs px-2.5 py-1 rounded-full text-purple-100 hover:text-white"
                      >
                        {aboutMuted ? 'Sound Off 🔇' : 'Sound On 🔊'}
                      </button>
                    </div>
                    <video
                      ref={aboutVideoRef}
                      className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                      src="/time.mp4"
                      muted={aboutMuted}
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => handleVideoClick(aboutVideoRef, aboutPlaying, setAboutPlaying)}
                    />
                    <div className="absolute inset-0 pointer-events-none about-video-vignette" />
                    {!aboutPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 rounded-full p-4">
                          <div className="text-white text-4xl">▶</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* a.mp4 */}
                <div className="neo-card glass-card rounded-3xl p-0 overflow-hidden border border-purple-400/20">
                  <div className="relative aspect-video">
                    <div className="absolute z-20 top-3 right-3 flex gap-2">
                      <button
                        type="button"
                        aria-label={aboutMuted2 ? 'Unmute video' : 'Mute video'}
                        onClick={() => {
                          const next = !aboutMuted2;
                          setAboutMuted2(next);
                          if (aboutVideoRef2.current) {
                            aboutVideoRef2.current.muted = next;
                            if (!next) aboutVideoRef2.current.volume = 0.6;
                          }
                        }}
                        className="neo-button text-xs px-2.5 py-1 rounded-full text-purple-100 hover:text-white"
                      >
                        {aboutMuted2 ? 'Sound Off 🔇' : 'Sound On 🔊'}
                      </button>
                    </div>
                    <video
                      ref={aboutVideoRef2}
                      className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                      src="/a.mp4"
                      muted={aboutMuted2}
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => handleVideoClick(aboutVideoRef2, aboutPlaying2, setAboutPlaying2)}
                    />
                    <div className="absolute inset-0 pointer-events-none about-video-vignette" />
                    {!aboutPlaying2 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 rounded-full p-4">
                          <div className="text-white text-4xl">▶</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* feature.mp4 */}
                <div className="neo-card glass-card rounded-3xl p-0 overflow-hidden border border-purple-400/20">
                  <div className="relative aspect-video">
                    <div className="absolute z-20 top-3 right-3 flex gap-2">
                      <button
                        type="button"
                        aria-label={aboutMuted3 ? 'Unmute video' : 'Mute video'}
                        onClick={() => {
                          const next = !aboutMuted3;
                          setAboutMuted3(next);
                          if (aboutVideoRef3.current) {
                            aboutVideoRef3.current.muted = next;
                            if (!next) aboutVideoRef3.current.volume = 0.6;
                          }
                        }}
                        className="neo-button text-xs px-2.5 py-1 rounded-full text-purple-100 hover:text-white"
                      >
                        {aboutMuted3 ? 'Sound Off 🔇' : 'Sound On 🔊'}
                      </button>
                    </div>
                    <video
                      ref={aboutVideoRef3}
                      className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                      src="/feature.mp4"
                      muted={aboutMuted3}
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => handleVideoClick(aboutVideoRef3, aboutPlaying3, setAboutPlaying3)}
                    />
                    <div className="absolute inset-0 pointer-events-none about-video-vignette" />
                    {!aboutPlaying3 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 rounded-full p-4">
                          <div className="text-white text-4xl">▶</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* crazy1.mp4 */}
                <div className="neo-card glass-card rounded-3xl p-0 overflow-hidden border border-purple-400/20">
                  <div className="relative aspect-video">
                    <div className="absolute z-20 top-3 right-3 flex gap-2">
                      <button
                        type="button"
                        aria-label={aboutMuted4 ? 'Unmute video' : 'Mute video'}
                        onClick={() => {
                          const next = !aboutMuted4;
                          setAboutMuted4(next);
                          if (aboutVideoRef4.current) {
                            aboutVideoRef4.current.muted = next;
                            if (!next) aboutVideoRef4.current.volume = 0.6;
                          }
                        }}
                        className="neo-button text-xs px-2.5 py-1 rounded-full text-purple-100 hover:text-white"
                      >
                        {aboutMuted4 ? 'Sound Off 🔇' : 'Sound On 🔊'}
                      </button>
                    </div>
                    <video
                      ref={aboutVideoRef4}
                      className="absolute inset-0 w-full h-full object-contain cursor-pointer"
                      src="/crazy1.mp4"
                      muted={aboutMuted4}
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => handleVideoClick(aboutVideoRef4, aboutPlaying4, setAboutPlaying4)}
                    />
                    <div className="absolute inset-0 pointer-events-none about-video-vignette" />
                    {!aboutPlaying4 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 rounded-full p-4">
                          <div className="text-white text-4xl">▶</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </section>
      </ParallaxLayers>

      {/* Gallery Section with 3D Cards */}
      <ParallaxLayers>
        <section id="gallery" className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
          {/* Background image: b.jpg */}
          <div className="absolute inset-0 z-0 pointer-events-none gallery-b-bg opacity-20 blur-sm" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 neon-text">
                Our Work
              </h2>
              <p className="text-center text-purple-200/70 text-lg mb-20 max-w-2xl mx-auto">
                Brands we have revolutionized and websites we have brought to life
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <GalleryCard3D
                  key={project.name}
                  title={project.name}
                  description={project.description}
                  imageSrc={project.imageSrc}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </ParallaxLayers>

      {/* Contact Section */}
      <ParallaxLayers>
        <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 neon-text">
                Ready to Revolutionize Your Brand?
              </h2>
              <p className="text-xl text-purple-200/70 mb-16 max-w-2xl mx-auto">
                Let&apos;s transform your vision into reality. Whether you need a complete rebrand or
                a cutting-edge website, we&apos;re here to help your company stand out and succeed.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a
                  href="mailto:benjamin@buttond.com"
                  className="contact-button group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform inline-block">📧</span>
                  <span className="neon-contact">benjamin@buttond.com</span>
                </motion.a>

                <motion.a
                  href="tel:+12253019908"
                  className="contact-button group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform inline-block">📱</span>
                  <span className="neon-contact">+1 225 301 9908</span>
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </ParallaxLayers>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-400/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-purple-200/90 mb-2 font-script text-2xl">Button&apos;d</p>
          <p className="text-purple-200/70 text-sm">
            © 2025 Button&apos;d. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
