import { Metadata } from 'next';
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>
        {children}
      </body>
    </html>
  );
}
