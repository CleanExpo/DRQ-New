import { ReactNode } from 'react';

export interface SchemaProviderProps {
  schema: Record<string, any>;
  children: ReactNode;
}

export function SchemaProvider({ schema, children }: SchemaProviderProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
