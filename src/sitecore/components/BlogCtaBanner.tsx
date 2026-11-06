"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Text, Link as SitecoreLink, type Field, type LinkField } from "@sitecore-content-sdk/nextjs";
import type { ComponentProps } from "./shared/types";

export interface BlogCtaBannerFields {
  Eyebrow?: Field<string>;
  Heading?: Field<string>;
  Description?: Field<string>;
  PrimaryCtaText?: Field<string>;
  PrimaryCtaLink?: LinkField;
  SecondaryCtaText?: Field<string>;
  SecondaryCtaLink?: LinkField;
}

type BlogCtaBannerProps = ComponentProps & { fields?: BlogCtaBannerFields };

export const Default = ({ fields }: BlogCtaBannerProps) => {
  const eyebrow = fields?.Eyebrow?.value || "Coaching & Nutrition Program";
  const heading =
    fields?.Heading?.value || "Ready to put this science into a personalized plan?";
  const description =
    fields?.Description?.value ||
    "Get custom macro calculations, structured progressive overload training cycles, and weekly coaching reviews tailored directly to your lifestyle.";
  const primaryText = fields?.PrimaryCtaText?.value || "Start Your Custom Plan";
  const secondaryText = fields?.SecondaryCtaText?.value || "Explore Coaching Tiers";

  return (
    <section className="py-12 bg-neutral-50/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-neutral-900 text-white p-8 sm:p-10 relative overflow-hidden shadow-lg">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              {eyebrow}
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 text-white leading-tight">
              {heading}
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {fields?.PrimaryCtaLink?.value?.href ? (
                <SitecoreLink
                  field={fields.PrimaryCtaLink}
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2"
                />
              ) : (
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2"
                >
                  {primaryText} <FaArrowRight className="text-xs" />
                </Link>
              )}

              {fields?.SecondaryCtaLink?.value?.href ? (
                <SitecoreLink
                  field={fields.SecondaryCtaLink}
                  className="text-neutral-300 hover:text-white font-medium text-sm px-4 py-3 underline underline-offset-4 transition-colors"
                />
              ) : (
                <Link
                  href="/services"
                  className="text-neutral-300 hover:text-white font-medium text-sm px-4 py-3 underline underline-offset-4 transition-colors"
                >
                  {secondaryText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

