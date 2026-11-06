"use client";

import ServiceCard from "@/components/molecules/ServiceCard";
import { Service } from "@/data/serviceData";

export interface ServiceItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
  category?: string;
  deliveryFormat?: string;
  duration?: string;
  startingPriceDisplay?: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  keyBenefits?: string[];
  coachName?: string;
  coachAvatar?: string;
}

export interface ServicesGridProps {
  services: (Service | ServiceItem)[];
  className?: string;
}

export default function ServicesGrid({
  services,
  className = "",
}: ServicesGridProps) {
  return (
    <section className={`py-12 bg-transparent ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isFullService = "leadCoach" in service;
            return (
              <ServiceCard
                key={service.id || index}
                id={service.id}
                title={service.title}
                description={"tagline" in service ? service.tagline : service.description}
                image={service.image}
                index={index}
                category={service.category}
                deliveryFormat={service.deliveryFormat}
                duration={service.duration}
                startingPriceDisplay={service.startingPriceDisplay}
                badge={service.badge}
                rating={service.rating}
                reviewsCount={service.reviewsCount}
                keyBenefits={service.keyBenefits}
                coachName={isFullService ? (service as Service).leadCoach.name : service.coachName}
                coachAvatar={isFullService ? (service as Service).leadCoach.avatar : service.coachAvatar}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
