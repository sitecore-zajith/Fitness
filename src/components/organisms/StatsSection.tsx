"use client";

import StatItem, { StatItemProps } from "@/components/atoms/StatItem";

export interface StatsSectionProps {
  stats: Array<{ label: string; value: string }>;
  bgImage?: string;
  className?: string;
}

export default function StatsSection({
  stats,
  bgImage = "https://images.unsplash.com/photo-1552857448-b39b0391fbab?q=80&w=2070&auto=format&fit=crop",
  className = "",
}: StatsSectionProps) {
  return (
    <section className={`relative py-24 bg-neutral-900 ${className}`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img
          src={bgImage}
          alt="Stats background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label || index}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

