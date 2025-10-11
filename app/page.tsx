'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { contactFormSchema, ContactFormData } from '@/lib/validations'

// Declare global function for Turnstile callback
declare global {
  interface Window {
    handleCaptchaChange?: (token: string) => void
  }
}

export default function TraceholdPilotLanding() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    gdprConsent: false,
    captchaToken: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isScrolledPastProduct, setIsScrolledPastProduct] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Set playback rate after component mounts (as per Stack Overflow solution)
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }

    // Set up global callback for Turnstile
    window.handleCaptchaChange = handleCaptchaChange

    // Auto-carousel for steps (only when not paused)
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentStep(prev => (prev + 1) % 3)
      }
    }, 4000) // Change every 4 seconds

    return () => {
      // Clean up global callback and interval
      delete window.handleCaptchaChange
      clearInterval(interval)
    }
  }, [isPaused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCaptchaChange = (token: string) => {
    setFormData(prev => ({ ...prev, captchaToken: token }))
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        // Handle validation errors
        const zodError = error as any
        const fieldErrors: Record<string, string> = {}
        zodError.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        setErrors({ general: error instanceof Error ? error.message : 'An error occurred' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isScrolledPastProduct ? 'opacity-0' : 'opacity-20'
          }`}
          style={{ filter: 'blur(1px)' }}
        >
          <source src="/assets/blockchain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            isScrolledPastProduct ? 'bg-black' : 'bg-black/10'
          }`}
        ></div>
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/assets/tracehold-lettering.png" alt="Tracehold" width={185} height={32} className="h-8" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="px-3 py-2 rounded-xl border border-white/15 text-sm hover:bg-white/5">Talk to sales</a>
            <a href="#contact" className="px-3 py-2 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-white/90">Join pilot</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-60 text-center">
          <p className="text-xs uppercase tracking-widest text-tracehold-sky-blue/80 mb-4">eB/L • Critical documents • Blockchain</p>
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">Digitize your Bill of Lading — and unlock new ways of financing.</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">Tracehold makes the eB/L blockchain-verifiable: fewer errors, less fraud, and a foundation for faster liquidity.</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a href="#contact" className="px-6 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:bg-white/90">Request demo</a>
            <a href="#contact" className="px-6 py-3 rounded-2xl border border-white/15 hover:bg-white/5">Join the pilot</a>
          </div>
          <p className="mt-6 text-sm text-white/60">MVP live • Pilot-ready • Immutable trust. Simplified innovation.</p>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="py-20 mb-[300px] relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Product</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Tracehold turns the Bill of Lading into a secure, digital asset — easy to create, register and transfer.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Single source of truth", desc: "One document, roles and e-signatures in a single workflow." },
              { title: "Blockchain fingerprint", desc: "Hash and verifiable timestamp for tamper evidence." },
              { title: "Custody & traceability", desc: "Event log, endorsements and transfers with full audit trail." },
              { title: "Simple onboarding", desc: "Start with templates and manual entry. ERP/TMS integrations are on the roadmap." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-6 bg-gray-phantom/20 backdrop-blur">
                <h3 className="font-semibold mb-3">{f.title}</h3>
                <p className="text-white/70 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Video Carousel */}
      <section id="how" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/assets/tracehold-fade.png" alt="Tracehold Icon" width={32} height={32} className="h-8 w-8" />
              <h2 className="text-3xl font-semibold">How it works</h2>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">A simple three-step process to digitize and secure your Bill of Lading</p>
          </div>
          
          {/* Video Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Video Background */}
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden bg-gray-phantom/20 backdrop-blur border border-white/10"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {[
                { 
                  title: "Create", 
                  desc: "Fill a standardized template and assign roles.",
                  video: "/assets/cargo-1.mp4"
                },
                { 
                  title: "Register", 
                  desc: "Store the cryptographic hash on blockchain; evidence on IPFS.",
                  video: "/assets/cargo-2.mp4"
                },
                { 
                  title: "Transfer / Endorse", 
                  desc: "Endorse and transfer ownership digitally with full traceability.",
                  video: "/assets/plane-1.mp4"
                },
              ].map((s, i) => (
                <div 
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentStep === i ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Background Video */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ filter: 'blur(0.5px)' }}
                  >
                    <source src={s.video} type="video/mp4" />
                  </video>
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
                    <h3 className="font-semibold text-4xl md:text-5xl mb-6 text-white">{s.title}</h3>
                    <p className="text-white/90 text-xl md:text-2xl max-w-3xl leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-8">
              {/* Step Indicators */}
              <div className="flex gap-4">
                {[0, 1, 2].map((step) => (
                  <button
                    key={step}
                    onClick={() => goToStep(step)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentStep === step 
                        ? 'bg-white scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/assets/tracehold-fade.png" alt="Tracehold Icon" width={32} height={32} className="h-8 w-8" />
              <h2 className="text-3xl font-semibold">Get in touch</h2>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Ready to transform your Bill of Lading process? Let's discuss how Tracehold can work for your business.</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-8 bg-gray-phantom/20 backdrop-blur">
            
            {errors.general && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl bg-gray-phantom border p-3 text-sm ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Name *"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-red-400 text-xs">{errors.name}</p>}
              </div>
              
              <div>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl bg-gray-phantom border p-3 text-sm ${
                    errors.company ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Company"
                  disabled={isSubmitting}
                />
                {errors.company && <p className="mt-1 text-red-400 text-xs">{errors.company}</p>}
              </div>
              
              <div className="sm:col-span-2">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl bg-gray-phantom border p-3 text-sm ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Email *"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email}</p>}
              </div>
              
              <div className="sm:col-span-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full rounded-xl bg-gray-phantom border p-3 text-sm ${
                    errors.message ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Tell us about your B/L flow (systems, volume, pain points) *"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-red-400 text-xs">{errors.message}</p>}
              </div>
              
              <div className="sm:col-span-2">
                <div
                  className="cf-turnstile"
                  data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                  data-callback="handleCaptchaChange"
                  data-theme="dark"
                />
                {errors.captchaToken && <p className="mt-1 text-red-400 text-xs">{errors.captchaToken}</p>}
              </div>
              
              <div className="sm:col-span-2 flex items-center justify-between">
                <label className="text-xs text-white/60 flex items-center">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleInputChange}
                    className="mr-2 align-middle"
                    disabled={isSubmitting}
                  />
                  I accept the <a href="/privacy" className="text-tracehold-sky-blue hover:text-tracehold-sky-blue/80">privacy policy</a> *
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
              
              {errors.gdprConsent && <p className="mt-1 text-red-400 text-xs">{errors.gdprConsent}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div>© {new Date().getFullYear()} Tracehold B.V.</div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Security</a>
          </div>
        </div>
      </footer>

      {/* Cloudflare Turnstile Script */}
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    </div>
  )
}