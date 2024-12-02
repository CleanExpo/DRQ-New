import type { PageProps } from 'next';

// Override the checkFields function type
declare function checkFields<T>(): void;

// Override the Diff utility type
type Diff<T, U, K extends keyof any> = any;

// Override the FirstArg utility type
type FirstArg<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : never;

// Override the TEntry type
type TEntry = {
  default: (props: PageProps) => JSX.Element;
  generateMetadata?: (props: PageProps) => Promise<any>;
};
