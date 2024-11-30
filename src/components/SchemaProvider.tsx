import React from 'react';

interface SchemaProviderProps {
  schemas: object[];
}

export function SchemaProvider({ schemas }: SchemaProviderProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas)
      }}
    />
  );
}
