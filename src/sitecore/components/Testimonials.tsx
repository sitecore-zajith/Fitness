"use client";

import { motion } from "framer-motion";
import { Image, Text, type Field, type ImageField } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import SectionHeading from "./shared/SectionHeading";
import type { ComponentProps, SectionHeadingFields, SitecoreItem } from "./shared/types";

const MAX_RATING = 5;

/** DatasourceItems/TestimonialItem (inherits _BaseContentBlock: Title = client name, Description = quote) */
export interface TestimonialItemFields {
  Title: Field<string>;
  Description: Field<string>;
  ClientRole: Field<string>;
  Rating: Field<number | string>;
  AvatarImage: ImageField;
}

/** Organisms/Testimonials (inherits _BaseSectionHeading) */
export interface TestimonialsFields extends SectionHeadingFields {
  TestimonialsList: SitecoreItem<TestimonialItemFields>[];
}

type TestimonialsProps = ComponentProps & { fields?: TestimonialsFields };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-primary mb-4" aria-label={`${rating} out of ${MAX_RATING} stars`}>
      {Array.from({ length: MAX_RATING }, (_, i) => (
        <svg key={i} className={`w-5 h-5 fill-current ${i < rating ? "" : "opacity-20"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export const Default = ({ fields }: TestimonialsProps) => {
  if (!fields) return <MissingDatasource componentName="Testimonials" />;

  const testimonials = fields.TestimonialsList ?? [];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading fields={fields} centered />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100"
            >
              <StarRating rating={Number(testimonial.fields.Rating?.value) || MAX_RATING} />
              <p className="text-neutral-600 mb-6 italic leading-relaxed">
                &quot;<Text field={testimonial.fields.Description} />&quot;
              </p>
              <div className="flex items-center">
                <Image field={testimonial.fields.AvatarImage} alt="" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <Text field={testimonial.fields.Title} tag="h4" className="font-bold text-neutral-900" />
                  <Text field={testimonial.fields.ClientRole} tag="span" className="text-sm text-neutral-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

