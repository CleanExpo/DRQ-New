import { PropsWithChildren } from 'react';

interface Schema {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

interface SchemaProviderProps extends PropsWithChildren {
  schema: Schema;
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
