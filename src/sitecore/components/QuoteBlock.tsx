"use client";

import { motion } from "framer-motion";
import { Text, type Field } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import type { ComponentProps } from "./shared/types";

/** Molecules/QuoteBlock */
export interface QuoteBlockFields {
  Quote: Field<string>;
  Author?: Field<string>;
}

type QuoteBlockProps = ComponentProps & { fields?: QuoteBlockFields };

export const Default = ({ fields }: QuoteBlockProps) => {
  if (!fields) return <MissingDatasource componentName="QuoteBlock" />;

  return (
    <section className="py-24 bg-neutral-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-neutral-800 leading-relaxed">
            &ldquo;<Text field={fields.Quote} />&rdquo;
          </h2>
          {fields.Author ? (
            <p className="mt-4 text-primary font-medium tracking-wider uppercase text-sm">
              — <Text field={fields.Author} />
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

