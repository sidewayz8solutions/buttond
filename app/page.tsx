"use client";

import { Suspense } from 'react';

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

function ServiceCardWrapper({ service, index }: { service: Service; index: number }) {
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
      </ParallaxLayers>

      {/* Services Section with 3D Cards */}
      <ParallaxLayers>
        <section id="services" className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
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
                  <ServiceCardWrapper service={service} index={index} />
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
          </div>
        </section>
      </ParallaxLayers>

      {/* Gallery Section with 3D Cards */}
      <ParallaxLayers>
        <section id="gallery" className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
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
