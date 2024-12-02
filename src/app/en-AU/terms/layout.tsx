import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Terms of Service',
    default: 'Terms of Service | Disaster Recovery QLD',
  },
  description: 'Read our terms of service to understand the conditions for using Disaster Recovery QLD services.',
  openGraph: {
    title: 'Terms of Service | Disaster Recovery QLD',
    description: 'Read our terms of service to understand the conditions for using Disaster Recovery QLD services.',
    url: 'https://disasterrecoveryqld.au/en-AU/terms',
  },
};

export default function TermsLayout({
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
