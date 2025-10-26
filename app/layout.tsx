import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tracehold - Digitize your Bill of Lading with Blockchain',
  description: 'Tracehold makes the eB/L blockchain-verifiable: fewer errors, less fraud, and a foundation for faster liquidity. Join our pilot program.',
  keywords: ['Bill of Lading', 'eB/L', 'blockchain', 'trade finance', 'digital documents', 'supply chain'],
  authors: [{ name: 'Tracehold B.V.' }],
  creator: 'Tracehold B.V.',
  publisher: 'Tracehold B.V.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tracehold.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tracehold - Digitize your Bill of Lading with Blockchain',
    description: 'Tracehold makes the eB/L blockchain-verifiable: fewer errors, less fraud, and a foundation for faster liquidity.',
    url: 'https://tracehold.com',
    siteName: 'Tracehold',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tracehold - Digital Bill of Lading Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracehold - Digitize your Bill of Lading with Blockchain',
    description: 'Tracehold makes the eB/L blockchain-verifiable: fewer errors, less fraud, and a foundation for faster liquidity.',
    images: ['/og-image.jpg'],
    creator: '@tracehold',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icons/tracehold-favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#020E2D" />
      </head>
      <body className="antialiased font-manrope">
        {children}
      </body>
    </html>
  )
}
