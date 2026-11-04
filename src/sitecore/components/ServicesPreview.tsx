"use client";

import { motion } from "framer-motion";
import { Text } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import SectionHeading from "./shared/SectionHeading";
import ServiceIcon from "./shared/ServiceIcon";
import type { ComponentProps, SectionHeadingFields, ServiceItemFields, SitecoreItem } from "./shared/types";

/** Organisms/ServicesPreview (inherits _BaseSectionHeading) */
export interface ServicesPreviewFields extends SectionHeadingFields {
  FeaturedServices: SitecoreItem<ServiceItemFields>[];
}

type ServicesPreviewProps = ComponentProps & { fields?: ServicesPreviewFields };

export const Default = ({ fields }: ServicesPreviewProps) => {
  if (!fields) return <MissingDatasource componentName="ServicesPreview" />;

  const services = fields.FeaturedServices ?? [];

  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading fields={fields} centered />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ServiceIcon name={service.fields.IconName?.value} />
              </div>
              <Text field={service.fields.Title} tag="h3" className="text-2xl font-bold font-heading text-neutral-900 mb-4" />
              <Text field={service.fields.Description} tag="p" className="text-neutral-600 leading-relaxed" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

