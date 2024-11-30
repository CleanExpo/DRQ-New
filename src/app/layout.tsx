import { Inter, Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { initializeOptimizations } from '@/lib/performance';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecoveryqld.au'),
  title: {
    default: 'Disaster Recovery Queensland | Professional Restoration Services',
    template: '%s | DRQ'
  },
  description: 'Professional disaster recovery and restoration services in Brisbane and South East Queensland. 24/7 emergency response for water damage, fire damage, and mould remediation.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Disaster Recovery Queensland',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery Queensland'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery Queensland',
    description: 'Professional disaster recovery and restoration services',
    images: ['/images/og-image.jpg']
  },
  verification: {
    google: 'your-google-verification-code'
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en-AU"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/fonts/inter-var.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Initialize performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(${initializeOptimizations.toString()})();`,
          }}
        />
        
        {/* Google Analytics */}
        <GoogleAnalytics />
        
        {/* Main content */}
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
