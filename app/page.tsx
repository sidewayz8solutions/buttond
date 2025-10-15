import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-3xl font-script gradient-text tracking-wide">
                button'd
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                Services
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                Gallery
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - styled like the provided image */}
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative mx-auto w-[min(90vw,520px)] aspect-square rounded-full glossy-orb flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="button'd logo"
              width={520}
              height={520}
              className="object-contain drop-shadow-[0_0_24px_rgba(193,120,255,0.6)]"
              priority
            />
          </div>

          <div className="mt-10 space-y-2">
            <a href="https://buttond.com" className="block text-xl sm:text-2xl md:text-3xl font-semibold neon-contact">
              https://buttond.com
            </a>
            <a href="mailto:benjamin@buttond.com" className="block text-xl sm:text-2xl md:text-3xl font-semibold neon-contact">
              benjamin@buttond.com
            </a>
          </div>
        </div>
      </section>

      {/* Mascot Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Button mascot */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <Image
                src="/mascot.png"
                alt="button'd mascot"
                width={256}
                height={256}
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Heart Centered Approach
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mindful Design, Empowered Results
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Graphic Design", icon: "🎨" },
              { title: "Brand Strategy", icon: "🎯" },
              { title: "Digital Design", icon: "💻" },
              { title: "UX/UI Design", icon: "✨" },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About
            </span>
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm Benjamin Shirley, American born creative from the state of Louisiana.
              After my travels took me far and wide I have found myself back. I now reside
              down in New Orleans or Nawlins as the locals like to say.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in UI/UX and web development. I also have a passion for creating
              designs for all digital mediums. Thus button'd was born. Check out the Gallery
              to see some of my work.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Philly's", desc: "Restaurant Branding" },
              { name: "Awesome Sweater", desc: "E-commerce Design" },
              { name: "Senseya", desc: "Brand Identity" },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="aspect-video flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-400">{project.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Create Together
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            I have openings for website creation so contact me. If you have design ideas
            that you want to bring to life, feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:benjamin@buttond.com"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-purple-500/50 transition-all text-white"
            >
              <span className="text-2xl">📧</span>
              <span>benjamin@buttond.com</span>
            </a>
            <a
              href="tel:+12253019908"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-purple-500/50 transition-all text-white"
            >
              <span className="text-2xl">📱</span>
              <span>+1 225 301 9908</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2025 button'd. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Heart Centered Approach, Mindful Design, Empowered Results
          </p>
        </div>
      </footer>
    </div>
  );
}
