"use client";

import { motion } from "framer-motion";
import { Text, type Field } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import SectionHeading from "./shared/SectionHeading";
import type { ComponentProps, SectionHeadingFields, SitecoreItem } from "./shared/types";

/** DatasourceItems/ProcedureStepItem (inherits _BaseContentBlock) */
export interface ProcedureStepItemFields {
  StepNumber: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
}

/** Organisms/Procedure (inherits _BaseSectionHeading) */
export interface ProcedureFields extends SectionHeadingFields {
  Steps: SitecoreItem<ProcedureStepItemFields>[];
}

type ProcedureProps = ComponentProps & { fields?: ProcedureFields };

export const Default = ({ fields }: ProcedureProps) => {
  if (!fields) return <MissingDatasource componentName="Procedure" />;

  const steps = fields.Steps ?? [];

  return (
    <section className="py-24 bg-neutral-900 text-white z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading fields={fields} centered />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 relative">
          {/* Connector line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-neutral-800 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto bg-neutral-900 border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <Text field={step.fields.StepNumber} tag="span" className="text-3xl font-bold font-heading text-primary" />
              </div>
              <Text field={step.fields.Title} tag="h3" className="text-xl font-bold font-heading mb-3" />
              <Text field={step.fields.Description} tag="p" className="text-neutral-400 text-sm leading-relaxed" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

