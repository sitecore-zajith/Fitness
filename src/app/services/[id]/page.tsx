import type { Metadata } from "next";
import { getService, getRelatedServices } from "@/data/serviceData";
import ServiceDetailView from "./ServiceDetailView";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";
  const service = getService(id);

  return {
    title: `${service.title} | Elite Fitness & Nutrition Coaching`,
    description: service.tagline,
    openGraph: {
      title: service.title,
      description: service.tagline,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";
  const service = getService(id);
  const relatedServices = getRelatedServices(service.id, 3);

  return <ServiceDetailView service={service} relatedServices={relatedServices} />;
}

