"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Image, Text, type Field, type ImageField } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import type { ComponentProps } from "./shared/types";

/** Organisms/HeroSection (inherits _BaseMediaItem: Title, Image + PageName) */
export interface HeroSectionFields {
  Title: Field<string>;
  PageName?: Field<string>;
  Image?: ImageField;
}

type HeroSectionProps = ComponentProps & { fields?: HeroSectionFields };

export const Default = ({ fields }: HeroSectionProps) => {
  if (!fields) return <MissingDatasource componentName="HeroSection" />;

  const pageName = fields.PageName?.value || "About";

  return (
    <section className="relative pt-40 pb-32 flex items-center bg-neutral-900 justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {fields.Image?.value?.src ? (
          <Image field={fields.Image} alt="" className="w-full h-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-4 flex items-center justify-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors text-white">
            Home
          </Link>
          <FaChevronRight className="text-[10px] text-white" />
          <span className="text-white">{pageName}</span>
          <FaChevronRight className="text-[10px] text-white" />
        </p>

        <Text
          field={fields.Title}
          tag="h1"
          className="text-5xl md:text-6xl font-heading font-bold text-white mb-0"
        />
      </div>
    </section>
  );
};

