"use client";

import { motion } from "framer-motion";
import { Image, Link, Text, type Field, type ImageField, type LinkField } from "@sitecore-content-sdk/nextjs";
import { buttonClassName } from "./shared/button-styles";
import MissingDatasource from "./shared/MissingDatasource";
import type { ComponentProps } from "./shared/types";

/** Organisms/HomeHero (inherits _BaseSectionHeading + _BaseMediaCta) */
export interface HomeHeroFields {
  Subtitle: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  CtaLink: LinkField;
  SecondaryCta: LinkField;
  AIGeneratedPromoBadge?: Field<string>;
}

type HomeHeroProps = ComponentProps & { fields?: HomeHeroFields };

export const Default = ({ fields }: HomeHeroProps) => {
  if (!fields) return <MissingDatasource componentName="HomeHero" />;

  return (
    <section className="relative h-screen flex items-center bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image field={fields.Image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Text field={fields.Subtitle} tag="span" className="text-primary font-bold tracking-wider uppercase mb-4 block" />
            <Text
              field={fields.Title}
              tag="h1"
              className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight"
            />
            <Text field={fields.Description} tag="p" className="text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Link field={fields.CtaLink} className={buttonClassName("primary")} />
              <Link
                field={fields.SecondaryCta}
                className={buttonClassName("outline", "text-white border-white hover:bg-white hover:text-neutral-900")}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

