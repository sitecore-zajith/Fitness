"use client";

import ServiceCard from "@/components/molecules/ServiceCard";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ServicesGridProps {
  services: ServiceItem[];
  className?: string;
}

export default function ServicesGrid({
  services,
  className = "",
}: ServicesGridProps) {
  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              id={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

