import { Text } from "@sitecore-content-sdk/nextjs";
import type { SectionHeadingFields } from "./types";

interface SectionHeadingProps {
  fields: SectionHeadingFields;
  centered?: boolean;
}

/** Field-driven version of molecules/SectionHeading (Base/_BaseSectionHeading). */
export default function SectionHeading({ fields, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <Text
        field={fields.Subtitle}
        tag="span"
        className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block"
      />
      <Text
        field={fields.Title}
        tag="h2"
        className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 dark:text-white"
      />
    </div>
  );
}

