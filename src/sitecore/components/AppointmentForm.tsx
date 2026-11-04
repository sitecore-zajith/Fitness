"use client";

import type { ReactNode } from "react";
import { Text, type Field } from "@sitecore-content-sdk/nextjs";
import { buttonClassName } from "./shared/button-styles";
import MissingDatasource from "./shared/MissingDatasource";
import SectionHeading from "./shared/SectionHeading";
import type {
  ComponentProps,
  ContactInfoFields,
  SectionHeadingFields,
  ServiceItemFields,
  SitecoreItem,
} from "./shared/types";

/** Organisms/AppointmentForm (inherits _BaseSectionHeading + _BaseContactInfo) */
export interface AppointmentFormFields extends SectionHeadingFields, ContactInfoFields {
  PanelTitle: Field<string>;
  PanelDescription: Field<string>;
  ServiceOptions: SitecoreItem<ServiceItemFields>[];
  SubmitButtonText: Field<string>;
  SubmitEndpoint: Field<string>;
}

type AppointmentFormProps = ComponentProps & { fields?: AppointmentFormFields };

const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors bg-neutral-50 focus:bg-white";
const LABEL_CLASS = "block text-sm font-medium text-neutral-700 mb-2";

function ContactLine({ icon, field }: { icon: ReactNode; field: Field<string> }) {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">{icon}</div>
      <Text field={field} tag="span" />
    </div>
  );
}

export const Default = ({ fields }: AppointmentFormProps) => {
  if (!fields) return <MissingDatasource componentName="AppointmentForm" />;

  const serviceOptions = fields.ServiceOptions ?? [];

  return (
    <section id="appointment" className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Decorative shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left side: Content */}
          <div className="bg-primary p-12 lg:w-2/5 text-white flex flex-col justify-center">
            <Text field={fields.PanelTitle} tag="h3" className="text-3xl font-heading font-bold mb-4" />
            <Text field={fields.PanelDescription} tag="p" className="text-primary-foreground/80 mb-8 leading-relaxed" />
            <div className="space-y-4">
              <ContactLine icon="📍" field={fields.Address} />
              <ContactLine icon="📞" field={fields.Phone} />
              <ContactLine icon="✉️" field={fields.Email} />
            </div>
          </div>

          {/* Right side: Form */}
          <div className="p-12 lg:w-3/5">
            <SectionHeading fields={fields} />

            <form className="space-y-6" data-endpoint={fields.SubmitEndpoint?.value} onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={LABEL_CLASS}>Full Name</label>
                  <input type="text" id="name" className={INPUT_CLASS} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>Email Address</label>
                  <input type="email" id="email" className={INPUT_CLASS} placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className={LABEL_CLASS}>Service of Interest</label>
                  <select id="service" className={`${INPUT_CLASS} text-neutral-700`}>
                    {serviceOptions.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.fields.Title?.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className={LABEL_CLASS}>Preferred Date</label>
                  <input type="date" id="date" className={`${INPUT_CLASS} text-neutral-700`} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={LABEL_CLASS}>Message (Optional)</label>
                <textarea id="message" rows={4} className={INPUT_CLASS} placeholder="Tell us about your goals..."></textarea>
              </div>

              <button type="submit" className={buttonClassName("primary", "w-full md:w-auto")}>
                <Text field={fields.SubmitButtonText} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

