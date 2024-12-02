import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Navigation } from '@/components/shared/Navigation';
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
  return (
    <html lang="en-AU" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
