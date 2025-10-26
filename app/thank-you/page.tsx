import Link from 'next/link'
import Image from 'next/image'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <Image src="/assets/tracehold-lettering.png" alt="Tracehold" width={180} height={35} style={{ width: '180px', height: '30px', marginBottom: '60px' }} />
          <h1 className="text-3xl font-semibold mb-8">Thank you for your interest!</h1>
          <p className="text-white/80 text-lg mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-gray-phantom/40 rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What's next?</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-tracehold-purple text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
              <p className="text-white/80">Our team will review your requirements</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-tracehold-purple text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
              <p className="text-white/80">We'll schedule a 20-minute demo of our MVP</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-tracehold-purple text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
              <p className="text-white/80">If you're interested, we'll invite you to our pilot program</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white/60">
            In the meantime, feel free to explore our platform and learn more about how we're revolutionizing the Bill of Lading process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/" 
              className="px-6 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:bg-white/90 transition-colors"
            >
              Back to Home
            </Link>
            <Link 
              href="/privacy" 
              className="px-6 py-3 rounded-2xl border border-white/15 hover:bg-white/5 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Tracehold B.V. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
