import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { initMonitoring } from '@/lib/monitoring';
import { initPerformanceMonitoring } from '@/lib/performance';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Disaster Recovery Queensland',
  description: 'Professional emergency restoration services in Queensland',
  metadataBase: new URL('https://disasterrecoveryqld.au'),
  openGraph: {
    title: 'Disaster Recovery Queensland',
    description: 'Professional emergency restoration services in Queensland',
    url: 'https://disasterrecoveryqld.au',
    siteName: 'Disaster Recovery Queensland',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize monitoring and performance tracking in production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    initMonitoring();
    initPerformanceMonitoring();
  }

  return (
    <html lang="en-AU" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background font-sans">
        {children}
      </body>
    </html>
  );
}
