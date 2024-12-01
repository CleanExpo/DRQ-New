import { Metadata } from 'next';
import { initMonitoring } from '../lib/monitoring';
import './globals.css';

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
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon-192x192.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize monitoring in production
  if (process.env.NODE_ENV === 'production') {
    initMonitoring();
  }

  return (
    <html lang="en-AU">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
