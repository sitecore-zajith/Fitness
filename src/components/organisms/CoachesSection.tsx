"use client";

import CoachCard, { Coach } from "@/components/molecules/CoachCard";

export interface CoachesSectionProps {
  title?: string;
  subtitle?: string;
  coaches: Coach[];
  className?: string;
}

export default function CoachesSection({
  title = "Meet Our Fitness Coaches",
  subtitle = "Coaches",
  coaches,
  className = "",
}: CoachesSectionProps) {
  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">
            {subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <CoachCard key={coach.name || index} coach={coach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

