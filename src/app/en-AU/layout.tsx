import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | DRQ',
    default: 'Disaster Recovery Queensland | Professional Restoration Services'
  },
  description: 'Professional disaster recovery and restoration services in South East Queensland. 24/7 emergency response for water damage, fire damage, and mould remediation.',
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation will be added here */}
      <main>
        {children}
      </main>
      {/* Footer will be added here */}
    </div>
  );
}
