"use client";

import { motion } from "framer-motion";
import { Image, Text, type Field, type ImageField } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import type { ComponentProps, SitecoreItem } from "./shared/types";

/** DatasourceItems/StatItem (Value, Label) */
export interface StatItemFields {
  Value: Field<string>;
  Label: Field<string>;
}

/** Organisms/StatsSection (BackgroundImage, Stats) */
export interface StatsSectionFields {
  BackgroundImage?: ImageField;
  Stats: SitecoreItem<StatItemFields>[];
}

type StatsSectionProps = ComponentProps & { fields?: StatsSectionFields };

export const Default = ({ fields }: StatsSectionProps) => {
  if (!fields) return <MissingDatasource componentName="StatsSection" />;

  const stats = fields.Stats ?? [];

  return (
    <section className="relative py-24 bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        {fields.BackgroundImage?.value?.src ? (
          <Image
            field={fields.BackgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://images.unsplash.com/photo-1552857448-b39b0391fbab?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Text
                field={stat.fields.Value}
                tag="div"
                className="text-5xl font-bold font-heading text-primary mb-2"
              />
              <Text
                field={stat.fields.Label}
                tag="div"
                className="text-white/80 font-medium tracking-wide"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

