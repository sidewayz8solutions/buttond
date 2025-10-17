export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-purple-200/70">Effective date: {new Date().getFullYear()}</p>
        </header>

        <section className="space-y-4 text-purple-100/90 leading-relaxed">
          <p>
            This Privacy Policy explains how Button'd collects, uses, and protects your information
            when you use our website and services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">1. Information We Collect</h2>
          <p>
            We may collect information you provide directly (such as name, email) and information
            collected automatically (such as IP address, device information, and usage data).
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">2. How We Use Information</h2>
          <p>
            We use information to provide and improve our services, communicate with you, personalize
            experiences, and ensure security and integrity.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">3. Cookies</h2>
          <p>
            We may use cookies and similar technologies to remember preferences and analyze traffic.
            You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">4. Sharing of Information</h2>
          <p>
            We do not sell personal information. We may share information with service providers who
            help us operate our services, and as required by law.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">5. Data Security</h2>
          <p>
            We implement reasonable safeguards to protect your information. No method of transmission
            over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, or delete your
            personal information. Contact us to exercise these rights.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">7. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes are effective when posted on
            this page.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">8. Contact</h2>
          <p>
            For questions about this Privacy Policy, contact us at privacy@buttond.example.
          </p>
        </section>
      </div>
    </main>
  );
}

