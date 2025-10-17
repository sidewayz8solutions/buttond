export default function TermsPage() {
  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-purple-200/70">Effective date: {new Date().getFullYear()}</p>
        </header>

        <section className="space-y-4 text-purple-100/90 leading-relaxed">
          <p>
            Welcome to Button'd. By accessing or using our website, services, or products, you
            agree to these Terms of Service. If you do not agree, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">1. Use of Services</h2>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these terms.
            You must not attempt to interfere with the operation or security of the site.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">2. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, and designs are the property of Button'd or its licensors.
            You may not copy, reproduce, or distribute content without prior written consent.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">3. Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for their
            content, policies, or practices.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">4. Disclaimer of Warranties</h2>
          <p>
            Services are provided "as is" and "as available" without warranties of any kind, either
            express or implied.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Button'd shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of your use of the site
            or services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">6. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Changes are effective when posted on this page.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8">7. Contact</h2>
          <p>
            For questions about these Terms, contact us at support@buttond.example.
          </p>
        </section>
      </div>
    </main>
  );
}

