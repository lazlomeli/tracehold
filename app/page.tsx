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

// Translations
type Language = 'EN' | 'ES'

const translations = {
  EN: {
    // Navigation
    nav: {
      product: 'Product',
      howItWorks: 'How it works',
      calculator: 'EB/L Calculator',
      contact: 'Contact',
      talkToSales: 'Talk to sales',
      joinPilot: 'Join pilot',
    },
    // Hero Section
    hero: {
      tagline: 'eB/L • Critical documents • Blockchain',
      title: 'Digitize your trade documents and unlock new ways of financing.',
      subtitle: 'Tracehold converts eB/L into an asset, easy to create & endorse. Manage trade documents in an all-in-one blockchain based platform.',
      requestDemo: 'Request demo',
      joinPilot: 'Join the pilot',
      footer: 'MVP live • Pilot-ready • Immutable trust. Simplified innovation.',
    },
    // Product Section
    product: {
      title: 'Product',
      subtitle: 'Tracehold turns the Bill of Lading into a secure, digital asset. Easy to create, register and transfer.',
      features: [
        { title: 'Single source of truth', desc: 'One document, roles and e-signatures in a single workflow.' },
        { title: 'Blockchain fingerprint', desc: 'Hash and verifiable timestamp for tamper evidence.' },
        { title: 'Custody & traceability', desc: 'Event log, endorsements and transfers with full audit trail.' },
        { title: 'Simple onboarding', desc: 'Start with templates and manual entry. ERP/TMS integrations are on the roadmap.' },
      ],
    },
    // Problem Section
    problem: {
      tagline: 'The Problem',
      title: 'Paper slows down trade and costs billions.',
      subtitle: 'Every year, global trade wastes billions managing paper-based Bills of Lading that depend on printed, couriered documents.',
      statsData: [
        { title: 'McKinsey Research', desc: 'Digitalizing B/L could save <strong>$6.5B</strong> in direct costs and unlock <strong>$30-40B</strong> in trade growth.' },
        { title: 'DCSA Analysis', desc: 'eB/Ls could eliminate <strong>10-30%</strong> of total trade documentation costs.' },
        { title: 'Current Reality', desc: '<strong>99%</strong> of Bills of Lading are still issued on paper despite massive costs.' },
        { title: 'Daily Impact', desc: 'Every delay, lost document, and manual verification means lost efficiency.' },
      ],
      paperChaos: {
        title: 'Paper Chaos',
        items: [
          'Days of courier delays',
          'Hundreds in processing costs',
          'Manual verification errors',
          'Lost or damaged documents',
          'Multiple parties, multiple delays',
        ],
      },
      digitalFlow: {
        title: 'Digital Flow',
        items: [
          'Instant digital transfers',
          'Minimal processing costs',
          'Automated verification',
          'Tamper-proof records',
          'Seamless party integration',
        ],
      },
    },
    // How It Works Section
    howItWorks: {
      title: 'How it works',
      subtitle: 'A simple three-step process to digitize and secure your Bill of Lading',
      steps: [
        {
          title: 'Create',
          desc: 'Fill a standardized template and assign roles.',
          detailedDesc: 'Every shipment begins with a document - and with Tracehold, that document is born digital. Instead of drafting or scanning endless paper forms, users fill a standardized Bill of Lading template that automatically includes every required field and regulation-ready format. Each participant - shipper, carrier, consignee, or agent - is assigned a defined role and digital identity, ensuring accountability from the very first entry. Once the document is created, it\'s digitally signed and verified, ready to move through the trade network without the friction of manual checks or courier delays. What used to take days to prepare now takes minutes - standardized, compliant, and immediately verifiable.',
        },
        {
          title: 'Register',
          desc: 'Store the cryptographic hash on blockchain; evidence on IPFS.',
          detailedDesc: 'After creation, Tracehold takes care of the most critical part: registration and proof. Each digital Bill of Lading is hashed cryptographically and anchored to the blockchain, generating a tamper-proof record that cannot be altered or lost. This registration creates an immutable timestamp - verifiable proof of origin and authenticity. At the same time, a copy of the evidence is stored on IPFS, a decentralized network ensuring that the document remains accessible and verifiable anywhere, at any time. This step transforms a simple document into a trusted digital asset - transparent, auditable, and legally robust.',
        },
        {
          title: 'Transfer / Endorse',
          desc: 'Endorse and transfer ownership digitally with full traceability.',
          detailedDesc: 'Once registered, the Bill of Lading is ready to travel - digitally, securely, and with complete traceability. Using Tracehold\'s platform, the document can be endorsed and transferred from one party to another, with every action recorded on-chain. Ownership passes seamlessly from shipper to carrier to consignee, and each endorsement carries its own cryptographic signature, forming an unbroken chain of custody. Stakeholders can verify ownership and document integrity instantly - without relying on couriers, emails, or manual tracking. Every transfer is visible, every signature verifiable, and every step trusted by code, not paperwork.',
        },
      ],
    },
    // Contact Section
    contact: {
      title: 'Get in touch',
      subtitle: 'Ready to transform your Bill of Lading process? Let\'s discuss how Tracehold can work for your business.',
      form: {
        name: 'Name *',
        company: 'Company',
        email: 'Email *',
        message: 'Tell us about your B/L flow (systems, volume, pain points) *',
        gdprConsent: 'I accept the',
        privacyPolicy: 'privacy policy',
        send: 'Send',
        sending: 'Sending...',
      },
    },
    // Footer
    footer: {
      copyright: '© {year} Tracehold B.V.',
      privacy: 'Privacy',
      terms: 'Terms',
      security: 'Security',
    },
  },
  ES: {
    // Navigation
    nav: {
      product: 'Producto',
      howItWorks: 'Cómo funciona',
      calculator: 'Calculadora EB/L',
      contact: 'Contacto',
      talkToSales: 'Hablar con ventas',
      joinPilot: 'Unirse al piloto',
    },
    // Hero Section
    hero: {
      tagline: 'eB/L • Documentos críticos • Blockchain',
      title: 'Digitaliza tus documentos de comercio y desbloquea nuevas formas de financiación.',
      subtitle: 'Tracehold convierte el Conocimiento de Embarque en un activo, fácil de crear y endosar. Gestiona documentos comerciales en una única plataforma basada en blockchain.',
      requestDemo: 'Solicitar demo',
      joinPilot: 'Unirse al piloto',
      footer: 'MVP en vivo • Listo para piloto • Confianza inmutable. Innovación simplificada.',
    },
    // Product Section
    product: {
      title: 'Producto',
      subtitle: 'Tracehold convierte el Bill of Lading en un activo digital seguro, fácil de crear, registrar y transferir.',
      features: [
        { title: 'Fuente única de verdad', desc: 'Un documento, roles y firmas electrónicas en un solo flujo de trabajo.' },
        { title: 'Huella blockchain', desc: 'Hash y marca de tiempo verificable para evidencia de manipulación.' },
        { title: 'Custodia y trazabilidad', desc: 'Registro de eventos, endosos y transferencias con auditoría completa.' },
        { title: 'Incorporación simple', desc: 'Comience con plantillas y entrada manual. Las integraciones ERP/TMS están en el plan.' },
      ],
    },
    // Problem Section
    problem: {
      tagline: 'El Problema',
      title: 'El papel ralentiza el comercio y cuesta miles de millones.',
      subtitle: 'Cada año, el comercio global desperdicia miles de millones gestionando Bill of Lading\'s en papel que dependen de documentos impresos y enviados por mensajería.',
      statsData: [
        { title: 'Investigación McKinsey', desc: 'Digitalizar B/L podría ahorrar <strong>$6.5B</strong> en costos directos y desbloquear <strong>$30-40B</strong> en crecimiento comercial.' },
        { title: 'Análisis DCSA', desc: 'Los eB/Ls podrían eliminar <strong>10-30%</strong> de los costos totales de documentación comercial.' },
        { title: 'Realidad Actual', desc: '<strong>99%</strong> de los Bill of Lading\'s aún se emiten en papel a pesar de los costos masivos.' },
        { title: 'Impacto Diario', desc: 'Cada retraso, documento perdido y verificación manual significa pérdida de eficiencia.' },
      ],
      paperChaos: {
        title: 'Caos del Papel',
        items: [
          'Días de retrasos de mensajería',
          'Cientos en costos de procesamiento',
          'Errores de verificación manual',
          'Documentos perdidos o dañados',
          'Múltiples partes, múltiples retrasos',
        ],
      },
      digitalFlow: {
        title: 'Flujo Digital',
        items: [
          'Transferencias digitales instantáneas',
          'Costos de procesamiento mínimos',
          'Verificación automatizada',
          'Registros a prueba de manipulación',
          'Integración fluida de partes',
        ],
      },
    },
    // How It Works Section
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'Un proceso simple de tres pasos para digitalizar y asegurar su Bill of Lading',
      steps: [
        {
          title: 'Crear',
          desc: 'Complete una plantilla estandarizada y asigne roles.',
          detailedDesc: 'Cada envio comienza con un documento, y con Tracehold, ese documento nace digital. En lugar de redactar o escanear interminables formularios en papel, los usuarios completan una plantilla estandarizada de Bill of Lading que incluye automaticamente todos los campos requeridos y el formato listo para regulacion. A cada participante (expedidor, transportista, consignatario o agente) se le asigna un rol definido e identidad digital, asegurando responsabilidad desde la primera entrada. Una vez creado el documento, se firma y verifica digitalmente, listo para moverse a traves de la red comercial sin la friccion de verificaciones manuales o retrasos de mensajeria. Lo que solia llevar dias preparar ahora toma minutos: estandarizado, conforme e inmediatamente verificable.',
        },
        {
          title: 'Registrar',
          desc: 'Almacene el hash criptografico en blockchain; evidencia en IPFS.',
          detailedDesc: 'Despues de la creacion, Tracehold se encarga de la parte mas critica: registro y prueba. Cada Bill of Lading digital se hashea criptograficamente y se ancla a la blockchain, generando un registro a prueba de manipulacion que no puede ser alterado o perdido. Este registro crea una marca de tiempo inmutable: prueba verificable de origen y autenticidad. Al mismo tiempo, una copia de la evidencia se almacena en IPFS, una red descentralizada que garantiza que el documento permanezca accesible y verificable en cualquier lugar, en cualquier momento. Este paso transforma un documento simple en un activo digital confiable: transparente, auditable y legalmente robusto.',
        },
        {
          title: 'Transferir / Endosar',
          desc: 'Endose y transfiera la propiedad digitalmente con trazabilidad completa.',
          detailedDesc: 'Una vez registrado, el Bill of Lading esta listo para viajar, digitalmente, de forma segura y con trazabilidad completa. Usando la plataforma de Tracehold, el documento puede ser endosado y transferido de una parte a otra, con cada accion registrada en cadena. La propiedad pasa sin problemas de expedidor a transportista a consignatario, y cada endoso lleva su propia firma criptografica, formando una cadena ininterrumpida de custodia. Las partes interesadas pueden verificar la propiedad y la integridad del documento al instante, sin depender de mensajeria, correos electronicos o seguimiento manual. Cada transferencia es visible, cada firma verificable y cada paso confiable por codigo, no por papeleo.',
        },
      ],
    },
    // Contact Section
    contact: {
      title: 'Contáctenos',
      subtitle: '¿Listo para transformar tu gestión de documentos comerciales? Hablemos sobre cómo Tracehold puede funcionar para tu negocio.',
      form: {
        name: 'Nombre *',
        company: 'Empresa',
        email: 'Correo electrónico *',
        message: 'Cuéntenos sobre su flujo de B/L (sistemas, volumen, puntos críticos) *',
        gdprConsent: 'Acepto la',
        privacyPolicy: 'política de privacidad',
        send: 'Enviar',
        sending: 'Enviando...',
      },
    },
    // Footer
    footer: {
      copyright: '© {year} Tracehold B.V.',
      privacy: 'Privacidad',
      terms: 'Términos',
      security: 'Seguridad',
    },
  },
}

//
export default function TraceholdPilotLanding() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [language, setLanguage] = useState<Language>('EN')
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    gdprConsent: false,
    captchaToken: '', // Will be filled by CAPTCHA
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isScrolledPastProduct, setIsScrolledPastProduct] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const t = translations[language]

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tracehold-language') as Language | null
    if (savedLanguage && (savedLanguage === 'EN' || savedLanguage === 'ES')) {
      setLanguage(savedLanguage)
    }
    setIsLanguageLoaded(true)
  }, [])

  // Save language preference to localStorage when it changes (but only after initial load)
  useEffect(() => {
    if (isLanguageLoaded) {
      localStorage.setItem('tracehold-language', language)
    }
  }, [language, isLanguageLoaded])

  useEffect(() => {
    // Set playback rate after component mounts (as per Stack Overflow solution)
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }

    // Auto-carousel for steps (only when not paused)
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentStep(prev => (prev + 1) % 3)
      }
    }, 4000) // Change every 4 seconds

    return () => {
      // Clean up interval
      clearInterval(interval)
    }
  }, [isPaused])

  // Reading progress animation
  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null
    
    if (isHovered) {
      // Start reading progress animation
      setReadingProgress(0)
      progressInterval = setInterval(() => {
        setReadingProgress(prev => {
          if (prev >= 100) {
            return 100
          }
          return prev + 0.22 // Slower speed (was 0.8, then 0.3)
        })
      }, 50) // Update every 50ms
    } else {
      // Reset when not hovering
      setReadingProgress(0)
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [isHovered])

  // Turnstile CAPTCHA setup
  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    document.head.appendChild(script)

    // Set up global callback
    window.handleCaptchaChange = (token: string) => {
      setFormData(prev => ({ ...prev, captchaToken: token }))
    }

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      delete window.handleCaptchaChange
    }
  }, [])

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
          style={{ 
            filter: 'hue-rotate(240deg) saturate(0.6) brightness(0.85) contrast(1.05)'
          }}
        >
          <source src="/assets/blockchain-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            isScrolledPastProduct ? 'bg-black' : 'bg-black/5'
          }`}
        ></div>
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/assets/tracehold-lettering.png" alt="Tracehold" width={185} height={32} style={{ width: '185px', height: '32px' }} />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/80">
            <a href="#product" className="hover:text-white transition-colors">{t.nav.product}</a> 
            <a href="#how" className="hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="/calculator" className="hover:text-white transition-colors">{t.nav.calculator}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center rounded-xl border border-white/15 overflow-hidden">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 sm:px-3 py-2 text-xs font-semibold transition-colors ${
                  language === 'EN' 
                    ? 'bg-white text-neutral-900' 
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ES')}
                className={`px-2 sm:px-3 py-2 text-xs font-semibold transition-colors ${
                  language === 'ES' 
                    ? 'bg-white text-neutral-900' 
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                ES
              </button>
            </div>
            <a href="#contact" className="hidden lg:block px-3 py-2 rounded-xl border border-white/15 text-sm hover:bg-white/5 transition-colors">{t.nav.talkToSales}</a>
            <a href="#contact" className="px-3 py-2 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-white/90 transition-colors">{t.nav.joinPilot}</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Toggle */}
            <div className="flex items-center rounded-xl border border-white/15 overflow-hidden">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1.5 text-xs font-semibold transition-colors ${
                  language === 'EN' 
                    ? 'bg-white text-neutral-900' 
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ES')}
                className={`px-2 py-1.5 text-xs font-semibold transition-colors ${
                  language === 'ES' 
                    ? 'bg-white text-neutral-900' 
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                ES
              </button>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-white/15 hover:bg-white/5 transition-colors"
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
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 border-t border-white/10 bg-black/80 backdrop-blur">
            <nav className="flex flex-col gap-4">
              <a 
                href="#product" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.product}
              </a>
              <a 
                href="#how" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.howItWorks}
              </a>
              <a 
                href="/calculator" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.calculator}
              </a>
              <a 
                href="#contact" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.contact}
              </a>
              <div className="pt-2 border-t border-white/10">
                <a 
                  href="#contact" 
                  className="block w-full text-center px-4 py-3 rounded-xl bg-white text-neutral-900 font-semibold hover:bg-white/90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.joinPilot}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-32 sm:py-48 lg:py-60 text-center" style={{ paddingBottom: "3rem"}}>
          <p className="text-xs uppercase tracking-widest text-tracehold-purple font-bold mb-4 neon-text">{t.hero.tagline}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 px-2">{t.hero.title}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8 px-4">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
            <a href="#contact" className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:bg-white/90 transition-colors text-center">{t.hero.requestDemo}</a>
            <a href="#contact" className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-white/15 hover:bg-white/5 transition-colors text-center">{t.hero.joinPilot}</a>
          </div>
          <p className="mt-6 text-sm text-white/60 px-4">{t.hero.footer}</p>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="py-12 sm:py-16 lg:py-20 relative z-10 scroll-mt-20" style={{ paddingBottom: "4rem"}}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Image src="/assets/tracehold-fade.png" alt="Tracehold Icon" width={30} height={30} style={{ width: '30px', height: '34px' }}/>
              <h2 className="text-2xl sm:text-3xl font-semibold">{t.product.title}</h2>
            </div>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">{t.product.subtitle}</p>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {t.product.features.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-4 sm:p-6 bg-gray-phantom/20 backdrop-blur hover:bg-gray-phantom/30 transition-colors">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">{f.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="py-12 sm:py-16 lg:py-20 relative z-10 scroll-mt-20" style={{ paddingBottom: "4rem"}}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-widest text-tracehold-purple font-bold mb-4 neon-text">{t.problem.tagline}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 px-2">{t.problem.title}</h2>
            <p className="text-white/70 text-base sm:text-lg max-w-3xl mx-auto px-4">{t.problem.subtitle}</p>
          </div>
          
          {/* Problem Cards with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {t.problem.statsData.map((problem, i) => {
              const icons = [
                <svg key={i} className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>,
                <svg key={i} className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>,
                <svg key={i} className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>,
                <svg key={i} className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>,
              ]
              return (
                <div key={i} className="group relative h-full">
                  {/* Card Background */}
                  <div className="rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-red-500/5 to-red-600/3 backdrop-blur hover:from-red-500/8 hover:to-red-600/5 transition-all duration-300 h-full flex flex-col">
                    {/* Icon Circle */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      {icons[i]}
                    </div>
                    
                    {/* Content */}
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className="font-semibold mb-3 sm:mb-4 text-red-400 text-base sm:text-lg neon-text-red flex-shrink-0">{problem.title}</h3>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: problem.desc }}></p>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )
            })}
          </div>
            
          {/* Visual Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Paper Chaos */}
            <div className="group relative">
              <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-red-500/5 to-red-600/3 backdrop-blur hover:from-red-500/8 hover:to-red-600/5 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-red-400 neon-text-red">{t.problem.paperChaos.title}</h3>
                  <ul className="text-white/70 text-xs sm:text-sm space-y-2 sm:space-y-3 text-center max-w-xs mx-auto">
                    {t.problem.paperChaos.items.map((item, idx) => (
                      <li key={idx}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
            
            {/* Digital Flow */}
            <div className="group relative">
              <div className="rounded-2xl p-6 sm:p-8 backdrop-blur hover:from-tracehold-purple/30 hover:to-purple-600/25 transition-all duration-300" style={{ background: 'linear-gradient(to bottom right, rgb(12 14 16 / 20%) var(--tw-gradient-from-position), rgb(123 54 255 / 15%))' }}>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-tracehold-purple/20 flex items-center justify-center group-hover:bg-tracehold-purple/30 group-hover:scale-110 transition-all duration-300">
                    <Image src="/assets/tracehold-fade.png" alt="Tracehold" width={32} height={32} style={{ filter: 'brightness(0) saturate(100%) invert(21%) sepia(100%) saturate(2000%) hue-rotate(260deg) brightness(101%) contrast(101%)', width: '30px', height: '32px' }} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-tracehold-purple neon-text-blue">{t.problem.digitalFlow.title}</h3>
                  <ul className="text-white/70 text-xs sm:text-sm space-y-2 sm:space-y-3 text-center max-w-xs mx-auto">
                    {t.problem.digitalFlow.items.map((item, idx) => (
                      <li key={idx}>        
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tracehold-sky-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
          </div>
          </div>
        </div>
      </section>

      {/* How it works - Video Carousel */}
      <section id="how" className="py-12 sm:py-16 lg:py-20 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Image src="/assets/tracehold-fade.png" alt="Tracehold Icon" width={32} height={30} style={{ width: '30px', height: '34px' }} />
              <h2 className="text-2xl sm:text-3xl font-semibold">{t.howItWorks.title}</h2>
            </div>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">{t.howItWorks.subtitle}</p>
          </div>
          
          {/* Video Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Video Background */}
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden bg-gray-phantom/20 backdrop-blur border border-white/10"
              onMouseEnter={() => {
                setIsPaused(true)
                setIsHovered(true)
              }}
              onMouseLeave={() => {
                setIsPaused(false)
                setIsHovered(false)
              }}
            >
              {t.howItWorks.steps.map((s, i) => {
                const videos = ["/assets/cargo-1.mp4", "/assets/cargo-2.mp4", "/assets/plane-1.mp4"]
                return (
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
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isHovered ? 'blur-md' : 'blur-[0.5px]'
                    }`}
                    style={{
                      filter: 'grayscale(0.5) hue-rotate(240deg) saturate(1.2) brightness(0.8) contrast(1.1) sepia(0.4)'
                    }}
                  >
                    <source src={videos[i]} type="video/mp4" />
                  </video>
                  
                  {/* Dark Overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isHovered ? 'bg-black/80' : 'bg-black/60'
                  }`}></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                    {/* Default view */}
                    <div className={`transition-all duration-500 ${
                      !isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'
                    }`}>
                      <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-white">{s.title}</h3>
                      <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed">{s.desc}</p>
                    </div>
                    
                    {/* Detailed view on hover - Hidden on mobile */}
                    <div className={`hidden md:flex absolute inset-0 flex-col justify-center items-center px-6 lg:px-12 py-8 transition-all duration-500 ${
                      isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'
                    }`}>
                      <div className="max-w-5xl mx-auto w-full">
                        <div className="max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-4">
                          <div 
                            className="text-lg lg:text-xl xl:text-2xl text-left"
                            style={{ lineHeight: '1.8em' }}
                          >
                            {s.detailedDesc.split(' ').map((word, wordIndex) => {
                              const totalWords = s.detailedDesc.split(' ').length
                              const progressPerWord = 100 / totalWords
                              const wordProgress = wordIndex * progressPerWord
                              const isHighlighted = readingProgress >= wordProgress
                              
                              return (
                                <span
                                  key={wordIndex}
                                  className={`transition-colors duration-500 ${
                                    isHighlighted 
                                      ? 'text-white/95' 
                                      : 'text-white/50'
                                  }`}
                                >
                                  {word}{wordIndex < totalWords - 1 ? ' ' : ''}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-6 sm:mt-8">
              {/* Step Indicators */}
              <div className="flex gap-3 sm:gap-4">
                {[0, 1, 2].map((step) => (
                  <button
                    key={step}
                    onClick={() => goToStep(step)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                      currentStep === step 
                        ? 'bg-white scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Mobile Step Details - Only visible on mobile */}
            <div className="md:hidden mt-6 px-4">
              <div className="rounded-2xl border border-white/10 p-6 bg-gray-phantom/20 backdrop-blur">
                <h3 className="font-semibold text-xl mb-4 text-center">{t.howItWorks.steps[currentStep].title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{t.howItWorks.steps[currentStep].detailedDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Image src="/assets/tracehold-fade.png" alt="Tracehold Icon" width={30} height={32} style={{ width: '30px', height: '34px' }} />
              <h2 className="text-2xl sm:text-3xl font-semibold">{t.contact.title}</h2>
            </div>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">{t.contact.subtitle}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 bg-gray-phantom/20 backdrop-blur">
            
            {errors.general && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl bg-gray-phantom border p-3 text-sm ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder={t.contact.form.name}
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
                  placeholder={t.contact.form.company}
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
                  placeholder={t.contact.form.email}
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
                  className={`w-full rounded-xl bg-gray-phantom border p-3 text-sm resize-none ${
                    errors.message ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder={t.contact.form.message}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-red-400 text-xs">{errors.message}</p>}
              </div>
              
              {/* CAPTCHA */}
              <div className="sm:col-span-2 flex justify-center">
                <div 
                  className="cf-turnstile" 
                  data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} 
                  data-callback="handleCaptchaChange"
                ></div>
              </div>
              
              {/* Mobile Layout */}
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <label className="text-xs text-white/60 flex items-start sm:items-center flex-1">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleInputChange}
                    className="mr-2 mt-0.5 sm:mt-0 align-middle flex-shrink-0"
                    disabled={isSubmitting}
                  />
                  <span className="leading-relaxed">
                    {t.contact.form.gdprConsent} <a href="/privacy" className="text-tracehold-sky-blue hover:text-tracehold-sky-blue/80"> {t.contact.form.privacyPolicy}</a> *
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                </button>
              </div>
              
              {errors.gdprConsent && <p className="sm:col-span-2 mt-1 text-red-400 text-xs">{errors.gdprConsent}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 sm:py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div className="text-center md:text-left">{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.security}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}