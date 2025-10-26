'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function EBLCalculator() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    teusPerMonth: '',
    blsPerTeu: '1.5',
    avgCostPerBL: '70'
  })
  
  const [results, setResults] = useState<{
    monthlySavings: { min: number; max: number }
    annualSavings: { min: number; max: number }
  } | null>(null)

  useEffect(() => {
    // Set playback rate after component mounts
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateSavings = () => {
    const teus = parseFloat(formData.teusPerMonth) || 0
    const blsPerTeu = parseFloat(formData.blsPerTeu) || 1.5
    const avgCost = parseFloat(formData.avgCostPerBL) || 70
    
    if (teus <= 0) return
    
    const totalBLs = teus * blsPerTeu
    const traceholdCost = 12 // €12 per digital B/L
    
    // Calculate with range €60-80 (using user input as center point)
    const minPaperCost = Math.max(60, avgCost - 10)
    const maxPaperCost = Math.min(80, avgCost + 10)
    
    const minMonthlySavings = totalBLs * (minPaperCost - traceholdCost)
    const maxMonthlySavings = totalBLs * (maxPaperCost - traceholdCost)
    
    setResults({
      monthlySavings: { 
        min: Math.round(minMonthlySavings), 
        max: Math.round(maxMonthlySavings) 
      },
      annualSavings: { 
        min: Math.round(minMonthlySavings * 12), 
        max: Math.round(maxMonthlySavings * 12) 
      }
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-20"
          style={{ 
            filter: 'hue-rotate(240deg) saturate(0.6) brightness(0.85) contrast(1.05)'
          }}
        >
          <source src="/assets/blockchain-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/tracehold-lettering.png" alt="Tracehold" width={185} height={32} className="h-8" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/80">
            <Link href="/#product" className="hover:text-white transition-colors">Product</Link>
            <Link href="/#how" className="hover:text-white transition-colors">How it works</Link>
            <Link href="/calculator" className="hover:text-white text-tracehold-purple transition-colors">E/BL Calculator</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/#contact" className="hidden lg:block px-3 py-2 rounded-xl border border-white/15 text-sm hover:bg-white/5 transition-colors">Talk to sales</Link>
            <Link href="/#contact" className="px-3 py-2 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-white/90 transition-colors">Join pilot</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/15 hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 border-t border-white/10 bg-black/80 backdrop-blur">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/#product" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link 
                href="/#how" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link 
                href="/calculator" 
                className="text-tracehold-purple hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                E/BL Calculator
              </Link>
              <Link 
                href="/#contact" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-white/10">
                <Link 
                  href="/#contact" 
                  className="block w-full text-center px-4 py-3 rounded-xl bg-white text-neutral-900 font-semibold hover:bg-white/90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join pilot
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="text-xs uppercase tracking-widest text-tracehold-purple font-bold mb-4 neon-text">E/BL Cost Calculator</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 sm:mb-6 px-2">
              How much could your company save each month?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-2">
              Every paper-based Bill of Lading adds hidden costs — printing, courier fees, manual checks, and 
              compliance delays. Tracehold automates it all, saving time and thousands in operational expenses.
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur border border-white/10">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Input Section */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Calculate Your Savings</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      TEUs per month <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="teusPerMonth"
                      value={formData.teusPerMonth}
                      onChange={handleInputChange}
                      placeholder="Enter number of TEUs"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border border-white/20 focus:border-tracehold-purple focus:outline-none focus:ring-1 focus:ring-tracehold-purple"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Bills of Lading per TEU
                    </label>
                    <input
                      type="number"
                      name="blsPerTeu"
                      value={formData.blsPerTeu}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border border-white/20 focus:border-tracehold-purple focus:outline-none focus:ring-1 focus:ring-tracehold-purple"
                      min="0.1"
                    />
                    <p className="text-xs text-white/60 mt-1">Default: 1.5 B/L per TEU</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Average cost per paper B/L (€)
                    </label>
                    <input
                      type="number"
                      name="avgCostPerBL"
                      value={formData.avgCostPerBL}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border border-white/20 focus:border-tracehold-purple focus:outline-none focus:ring-1 focus:ring-tracehold-purple"
                      min="1"
                    />
                    <p className="text-xs text-white/60 mt-1">Typical range: €60-80 per B/L</p>
                  </div>

                  <button
                    onClick={calculateSavings}
                    disabled={!formData.teusPerMonth}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl bg-tracehold-purple hover:bg-tracehold-purple/90 disabled:bg-white/10 disabled:text-white/50 font-semibold transition-colors"
                  >
                    Calculate Savings
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Your Potential Savings</h2>
                
                {results ? (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Monthly Savings */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-tracehold-purple/20 to-tracehold-purple/10 border border-tracehold-purple/20">
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-tracehold-purple neon-text-blue">Monthly Savings</h3>
                      <p className="text-2xl sm:text-3xl font-bold break-words">
                        {formatCurrency(results.monthlySavings.min)} - {formatCurrency(results.monthlySavings.max)}
                      </p>
                      <p className="text-xs sm:text-sm text-white/70 mt-2">
                        Compared to traditional paper-based B/L processing
                      </p>
                    </div>

                    {/* Annual Savings */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20">
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-green-400">Annual Savings</h3>
                      <p className="text-2xl sm:text-3xl font-bold break-words">
                        {formatCurrency(results.annualSavings.min)} - {formatCurrency(results.annualSavings.max)}
                      </p>
                      <p className="text-xs sm:text-sm text-white/70 mt-2">
                        Total yearly cost reduction with Tracehold
                      </p>
                    </div>

                    {/* Breakdown */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Cost Breakdown</h3>
                      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between gap-2">
                          <span className="text-white/70">Total B/Ls per month:</span>
                          <span className="text-right">{Math.round((parseFloat(formData.teusPerMonth) || 0) * (parseFloat(formData.blsPerTeu) || 1.5))}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-white/70">Paper B/L cost:</span>
                          <span className="text-right">€{formData.avgCostPerBL} each</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-white/70">Tracehold digital B/L:</span>
                          <span className="text-right">€12 each</span>
                        </div>
                        <hr className="border-white/20" />
                        <div className="flex justify-between gap-2 font-semibold">
                          <span>Savings per B/L:</span>
                          <span className="text-right">€{(parseFloat(formData.avgCostPerBL) || 70) - 12}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                      <p className="text-sm sm:text-base text-white/80 mb-4 px-2">
                        Ready to start saving? Let's discuss your specific needs.
                      </p>
                      <Link 
                        href="/#contact" 
                        className="inline-block w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white text-neutral-900 font-semibold hover:bg-white/90 transition-colors"
                      >
                        Schedule a Demo
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-tracehold-purple/20 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-tracehold-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base text-white/60 px-2">
                      Enter your TEUs per month to see potential savings
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
            <p className="text-white/60 text-xs sm:text-sm max-w-2xl mx-auto px-2">
              * Calculations are estimates based on industry averages. Actual savings may vary depending on your specific 
              operational requirements, volume discounts, and current process efficiency. Tracehold's digital B/L cost 
              includes platform access, blockchain registration, and basic support.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
