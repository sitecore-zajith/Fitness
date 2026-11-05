"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Image, Link, Text, type Field, type ImageField, type LinkField } from "@sitecore-content-sdk/nextjs";
import MissingDatasource from "./shared/MissingDatasource";
import SectionHeading from "./shared/SectionHeading";
import type { ComponentProps, SectionHeadingFields, SitecoreItem } from "./shared/types";

/** DatasourceItems/CoachItem (inherits _BaseMediaItem + _BaseSocialLinks + Role) */
export interface CoachItemFields {
  Title: Field<string>;
  Role: Field<string>;
  Image: ImageField;
  FacebookLink?: LinkField;
  TwitterLink?: LinkField;
  InstagramLink?: LinkField;
  YoutubeLink?: LinkField;
}

/** Organisms/CoachesSection (inherits _BaseSectionHeading) */
export interface CoachesSectionFields extends SectionHeadingFields {
  Coaches: SitecoreItem<CoachItemFields>[];
}

type CoachesSectionProps = ComponentProps & { fields?: CoachesSectionFields };

export const Default = ({ fields }: CoachesSectionProps) => {
  if (!fields) return <MissingDatasource componentName="CoachesSection" />;

  const coaches = fields.Coaches ?? [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading fields={fields} centered />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col h-full bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                {coach.fields.Image?.value?.src ? (
                  <Image
                    field={coach.fields.Image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="p-6 text-center flex-grow flex flex-col border border-t-0 border-neutral-100 bg-white relative -mt-4 mx-4 z-10 shadow-md group-hover:-translate-y-4 transition-transform duration-300">
                <Text
                  field={coach.fields.Role}
                  tag="span"
                  className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-medium"
                />
                <Text
                  field={coach.fields.Title}
                  tag="h3"
                  className="text-xl font-bold font-heading mb-4 text-neutral-900"
                />
                <div className="flex items-center justify-center gap-3 mt-auto">
                  {coach.fields.TwitterLink?.value?.href ? (
                    <Link
                      field={coach.fields.TwitterLink}
                      aria-label="Twitter"
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <FaTwitter size={14} />
                    </Link>
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <FaTwitter size={14} />
                    </span>
                  )}
                  {coach.fields.FacebookLink?.value?.href ? (
                    <Link
                      field={coach.fields.FacebookLink}
                      aria-label="Facebook"
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <FaFacebookF size={14} />
                    </Link>
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <FaFacebookF size={14} />
                    </span>
                  )}
                  {coach.fields.InstagramLink?.value?.href ? (
                    <Link
                      field={coach.fields.InstagramLink}
                      aria-label="Instagram"
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <FaInstagram size={14} />
                    </Link>
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      <FaInstagram size={14} />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

