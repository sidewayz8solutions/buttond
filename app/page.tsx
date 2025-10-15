"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ServiceCard3D from '@/components/3d/ServiceCard3D';
import GalleryCard3D from '@/components/3d/GalleryCard3D';
import ParallaxLayers from '@/components/effects/ParallaxLayers';
import CursorGlow from '@/components/effects/CursorGlow';
import PersonalizationEngine, { useServiceTracking } from '@/components/personalization/PersonalizationEngine';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

// Dynamically import Hero3D with no SSR
const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-4xl neon-text animate-pulse">Loading...</div>
    </div>
  )
});

function ServiceCardWrapper({ service, index }: { service: any; index: number }) {
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
      title: "Graphic Design", 
      description: "Visual storytelling through compelling design",
      details: "From brand identity to print materials, we create stunning visuals that capture your brand's essence and communicate your message with impact. Our designs blend creativity with strategic thinking."
    },
    { 
      icon: "🎯", 
      title: "Brand Strategy", 
      description: "Strategic positioning and brand development",
      details: "We help you define your brand's unique position in the market, develop compelling narratives, and create cohesive brand experiences that resonate with your target audience."
    },
    { 
      icon: "💻", 
      title: "Digital Design", 
      description: "Modern web and digital experiences",
      details: "Cutting-edge digital solutions that combine beautiful aesthetics with seamless functionality. We create responsive websites, apps, and digital products that users love."
    },
    { 
      icon: "✨", 
      title: "UX/UI", 
      description: "User-centered design solutions",
      details: "We design intuitive interfaces that prioritize user needs and business goals. Through research, testing, and iteration, we create experiences that are both beautiful and functional."
    },
  ];

  const projects = [
    { 
      name: "Philly's", 
      description: "Brand identity and packaging design for a modern food brand",
      imageSrc: undefined
    },
    { 
      name: "Awesome Sweater", 
      description: "E-commerce platform design with seamless shopping experience",
      imageSrc: undefined
    },
    { 
      name: "Senseya", 
      description: "Product design and branding for innovative tech startup",
      imageSrc: undefined
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
            <div className="font-script text-2xl neon-text-subtle">button'd</div>
            <div className="hidden md:flex space-x-8">
              <a href="#hero" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#gallery" className="nav-link">Gallery</a>
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
                Services
              </h2>
              <p className="text-center text-purple-200/70 text-lg mb-20 max-w-2xl mx-auto">
                Comprehensive design solutions tailored to your brand's unique needs
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
                    I'm <span className="text-purple-300 font-semibold">Benjamin Shirley</span>, 
                    American born creative from the state of Louisiana. After my travels took me 
                    far and wide I have found myself back. I now reside down in New Orleans or 
                    Nawlins as the locals like to say.
                  </p>
                  <p>
                    I specialize in <span className="text-purple-300 font-semibold">UI/UX and web development</span>. 
                    I also have a passion for creating designs for all digital mediums. Thus button'd was born. 
                    Check out the Gallery to see some of my work.
                  </p>
                  <div className="pt-6 border-t border-purple-400/20">
                    <p className="text-center text-purple-300/70 italic">
                      Heart Centered Approach • Mindful Design • Empowered Results
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
                Gallery
              </h2>
              <p className="text-center text-purple-200/70 text-lg mb-20 max-w-2xl mx-auto">
                A showcase of recent projects and creative work
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
                Let's Create Together
              </h2>
              <p className="text-xl text-purple-200/70 mb-16 max-w-2xl mx-auto">
                I have openings for website creation so contact me. If you have design ideas 
                that you want to bring to life, feel free to reach out.
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
          <p className="text-purple-300/50 mb-2 font-script text-2xl">button'd</p>
          <p className="text-purple-400/40 text-sm">
            © 2025 button'd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
