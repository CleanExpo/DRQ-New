import type { Metadata } from 'next';
import type { GetStaticProps } from 'next';

type SearchParams = Record<string, string | string[] | undefined>;

interface LocationParams {
  location: string;
}

interface ServiceLocationParams {
  service: string;
  location: string;
}

export interface LocationPageProps {
  params: LocationParams;
  searchParams?: SearchParams;
}

export interface ServiceLocationPageProps {
  params: ServiceLocationParams;
  searchParams?: SearchParams;
}

export interface GenerateMetadataProps<T> {
  params: T;
  searchParams: SearchParams;
}

declare module 'next' {
  interface GetStaticProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
  > {
    (context: GetStaticPropsContext<Q>): Promise<GetStaticPropsResult<P>>;
  }
}
