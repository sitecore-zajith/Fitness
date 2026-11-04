"use client";

import { motion } from "framer-motion";
import { Image, Link, RichText, Text, type Field, type RichTextField } from "@sitecore-content-sdk/nextjs";
import { buttonClassName } from "./shared/button-styles";
import MissingDatasource from "./shared/MissingDatasource";
import SectionHeading from "./shared/SectionHeading";
import type { ComponentProps, MediaCtaFields, SectionHeadingFields, SitecoreItem } from "./shared/types";

/** DatasourceItems/FeatureHighlightItem */
export interface FeatureHighlightItemFields {
  Title: Field<string>;
}

/** Organisms/AboutSnippet (inherits _BaseSectionHeading + _BaseMediaCta) */
export interface AboutSnippetFields extends SectionHeadingFields, MediaCtaFields {
  PrimaryParagraph: RichTextField;
  SecondaryParagraph: RichTextField;
  FeatureHighlights: SitecoreItem<FeatureHighlightItemFields>[];
  ExperienceYears: Field<string>;
  ExperienceLabel: Field<string>;
}

type AboutSnippetProps = ComponentProps & { fields?: AboutSnippetFields };

export const Default = ({ fields }: AboutSnippetProps) => {
  if (!fields) return <MissingDatasource componentName="AboutSnippet" />;

  const highlights = fields.FeatureHighlights ?? [];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image field={fields.Image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <Text field={fields.ExperienceYears} tag="div" className="text-primary font-bold text-5xl" />
                <Text field={fields.ExperienceLabel} tag="div" className="text-neutral-600 font-medium leading-tight max-w-[6rem]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading fields={fields} />
            <RichText field={fields.PrimaryParagraph} className="text-neutral-600 mb-6 leading-relaxed" />
            <RichText field={fields.SecondaryParagraph} className="text-neutral-600 mb-8 leading-relaxed" />
            <ul className="space-y-4 mb-10">
              {highlights.map((item) => (
                <li key={item.id} className="flex items-center text-neutral-800 font-medium">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">
                    ✓
                  </span>
                  <Text field={item.fields.Title} />
                </li>
              ))}
            </ul>
            <Link field={fields.CtaLink} className={buttonClassName("primary")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

