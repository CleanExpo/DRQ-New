'use client';

interface SchemaData {
  '@type': string;
  [key: string]: unknown;
}

interface SchemaProviderProps {
  data: SchemaData;
}

export function SchemaProvider({ data }: SchemaProviderProps) {
  const schema = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
