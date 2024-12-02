import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://disasterrecoveryqld.au'),
  title: {
    template: '%s | Disaster Recovery QLD',
    default: 'Disaster Recovery QLD - Emergency Water Damage Restoration Services',
  },
  description: 'Professional water damage restoration services in Queensland. 24/7 emergency response for flood cleanup, mould remediation, and storm damage repair.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://disasterrecoveryqld.au',
    siteName: 'Disaster Recovery QLD',
    images: [
      {
        url: '/images/water-damage-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery QLD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://disasterrecoveryqld.au'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
