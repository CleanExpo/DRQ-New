import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Privacy Policy',
    default: 'Privacy Policy | Disaster Recovery QLD',
  },
  description: 'Learn about how Disaster Recovery QLD protects your privacy and handles your personal information.',
  openGraph: {
    title: 'Privacy Policy | Disaster Recovery QLD',
    description: 'Learn about how Disaster Recovery QLD protects your privacy and handles your personal information.',
    url: 'https://disasterrecoveryqld.au/en-AU/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
