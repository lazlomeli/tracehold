import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-400/90 to-cyan-300/80 grid place-content-center font-bold text-neutral-950">T</div>
            <span className="text-lg font-semibold tracking-tight">Tracehold</span>
          </div>
          <Link href="/" className="text-sky-400 hover:text-sky-300 text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-white/80 mb-4">
              When you contact us through our website, we collect the following information:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Company name (optional)</li>
              <li>Message content</li>
              <li>IP address and browser information</li>
              <li>Timestamp of your submission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-white/80 mb-4">
              We use the information you provide to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Schedule product demonstrations</li>
              <li>Invite you to our pilot program if applicable</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Data Storage and Security</h2>
            <p className="text-white/80 mb-4">
              Your data is stored securely using industry-standard practices:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Data is encrypted in transit and at rest</li>
              <li>Access is restricted to authorized personnel only</li>
              <li>We use Google Sheets for data storage with appropriate access controls</li>
              <li>Regular security audits and updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Data Sharing</h2>
            <p className="text-white/80 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, except:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>When required by law or legal process</li>
              <li>To protect our rights and property</li>
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-white/80 mb-4">
              Under GDPR and other applicable privacy laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Cookies and Tracking</h2>
            <p className="text-white/80 mb-4">
              We use Cloudflare Turnstile for bot protection. This service may set cookies to verify that you are human. 
              We do not use tracking cookies for advertising or analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-white/80 mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, 
              unless a longer retention period is required or permitted by law. Typically, this means:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Active leads: Until the inquiry is resolved or you opt out</li>
              <li>Pilot participants: For the duration of the pilot program plus 2 years</li>
              <li>Legal compliance: As required by applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. International Transfers</h2>
            <p className="text-white/80 mb-4">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards 
              are in place to protect your data in accordance with this privacy policy and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-white/80 mb-4">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the 
              new privacy policy on this page and updating the "Last Updated" date below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-white/80 mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-neutral-900/40 rounded-xl border border-white/10 p-4">
              <p className="text-white/80">
                <strong>Email:</strong> marcor@tracehold.com<br />
                <strong>Company:</strong> Tracehold B.V.<br />
                <strong>Address:</strong> [Your business address]
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10 mt-12">
            <p className="text-white/60 text-sm">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Tracehold B.V. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
