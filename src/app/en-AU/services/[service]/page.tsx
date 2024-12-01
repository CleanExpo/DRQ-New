import { Metadata } from 'next';
import { ServicePage } from '@/components/templates/ServicePage';
import { getServiceContent } from '@/lib/services';
import { getServiceImage } from '@/lib/images';

interface ServicePageParams {
  service: string;
}

export async function generateMetadata({ params }: { params: ServicePageParams }): Promise<Metadata> {
  const serviceContent = getServiceContent(params.service);
  const image = getServiceImage(params.service);

  return {
    title: serviceContent.metaTitle || serviceContent.title,
    description: serviceContent.metaDescription || serviceContent.description,
    openGraph: {
      title: serviceContent.metaTitle || serviceContent.title,
      description: serviceContent.metaDescription || serviceContent.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: serviceContent.title,
        },
      ],
    },
  };
}

export default function ServicePageRoute({ params }: { params: ServicePageParams }) {
  const serviceContent = getServiceContent(params.service);
  const image = getServiceImage(params.service);

  return <ServicePage service={{ ...serviceContent, image }} slug={params.service} />;
}
