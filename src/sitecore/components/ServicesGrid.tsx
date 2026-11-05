"use client";

import NextLink from "next/link";
import { motion } from "framer-motion";
import { Image, Link, Text } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import type { ComponentProps, ServiceItemFields, SitecoreItem } from "./shared/types";

/** Organisms/ServicesGrid (inherits Services Multilist of ServiceItem) */
export interface ServicesGridFields {
  Services: SitecoreItem<ServiceItemFields>[];
}

type ServicesGridProps = ComponentProps & { fields?: ServicesGridFields };

export const Default = ({ fields }: ServicesGridProps) => {
  if (!fields) return <MissingDatasource componentName="ServicesGrid" />;

  const services = fields.Services ?? [];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const hasCta = Boolean(service.fields.CtaLink?.value?.href);

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100"
              >
                <div className="relative h-64 overflow-hidden">
                  {service.fields.Image?.value?.src ? (
                    <Image
                      field={service.fields.Image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop"
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="p-8 flex flex-col flex-grow text-center items-center">
                  <Text
                    field={service.fields.Title}
                    tag="h2"
                    className="text-2xl font-bold font-heading mb-4 text-neutral-900 group-hover:text-primary transition-colors"
                  />
                  {service.fields.Description && (
                    <Text
                      field={service.fields.Description}
                      tag="p"
                      className="text-neutral-600 leading-relaxed mb-6 flex-grow"
                    />
                  )}

                  {hasCta ? (
                    <Link
                      field={service.fields.CtaLink}
                      className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300"
                    />
                  ) : (
                    <NextLink
                      href={`/services/${service.id || index + 1}`}
                      className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Learn More
                    </NextLink>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

