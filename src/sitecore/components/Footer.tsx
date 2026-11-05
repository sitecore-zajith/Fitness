import NextLink from "next/link";
import { Link, Text, type Field, type MultiLineTextField } from "@sitecore-content-sdk/nextjs";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import MissingDatasource from "./shared/MissingDatasource";
import type {
  BrandIdentityFields,
  ComponentProps,
  ContactInfoFields,
  NavigationLinkItemFields,
  SitecoreItem,
  SocialLinksFields,
} from "./shared/types";

/** Organisms/Footer (inherits _BaseBrandIdentity + _BaseSocialLinks + _BaseContactInfo) */
export interface FooterFields extends BrandIdentityFields, SocialLinksFields, ContactInfoFields {
  BrandSummary?: MultiLineTextField;
  QuickLinksHeading?: Field<string>;
  QuickLinks?: SitecoreItem<NavigationLinkItemFields>[];
  ServicesHeading?: Field<string>;
  ServiceLinks?: SitecoreItem<NavigationLinkItemFields>[];
  ContactHeading?: Field<string>;
  CopyrightText?: Field<string>;
}

type FooterProps = ComponentProps & { fields?: FooterFields };

export const Default = ({ fields }: FooterProps) => {
  if (!fields) return <MissingDatasource componentName="Footer" />;

  const quickLinks = fields.QuickLinks ?? [];
  const serviceLinks = fields.ServiceLinks ?? [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <NextLink href="/" className="font-heading text-2xl font-bold text-white mb-4 block">
              <Text field={fields.BrandPrefix} tag="span" />
              <Text field={fields.BrandSuffix} tag="span" className="text-primary" />
            </NextLink>
            <Text field={fields.BrandSummary} tag="p" className="text-sm mt-4 leading-relaxed" />
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {fields.FacebookLink?.value?.href && (
                <Link field={fields.FacebookLink} className="text-neutral-400 hover:text-primary transition-colors" aria-label="Facebook">
                  <FaFacebook size={20} />
                </Link>
              )}
              {fields.InstagramLink?.value?.href && (
                <Link field={fields.InstagramLink} className="text-neutral-400 hover:text-primary transition-colors" aria-label="Instagram">
                  <FaInstagram size={20} />
                </Link>
              )}
              {fields.TwitterLink?.value?.href && (
                <Link field={fields.TwitterLink} className="text-neutral-400 hover:text-primary transition-colors" aria-label="Twitter">
                  <FaTwitter size={20} />
                </Link>
              )}
              {fields.YoutubeLink?.value?.href && (
                <Link field={fields.YoutubeLink} className="text-neutral-400 hover:text-primary transition-colors" aria-label="YouTube">
                  <FaYoutube size={20} />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <Text field={fields.QuickLinksHeading} tag="h3" className="text-white font-semibold mb-4 text-lg" />
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <Link field={item.fields.TargetLink} className="hover:text-primary transition-colors">
                    <Text field={item.fields.LinkTitle} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <Text field={fields.ServicesHeading} tag="h3" className="text-white font-semibold mb-4 text-lg" />
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.id}>
                  <Link field={item.fields.TargetLink} className="hover:text-primary transition-colors">
                    <Text field={item.fields.LinkTitle} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <Text field={fields.ContactHeading} tag="h3" className="text-white font-semibold mb-4 text-lg" />
            <ul className="space-y-3 text-sm">
              <li><Text field={fields.Address} /></li>
              <li><Text field={fields.Email} /></li>
              <li><Text field={fields.Phone} /></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-500">
          <p>
            &copy; {currentYear} <Text field={fields.CopyrightText} />
          </p>
        </div>
      </div>
    </footer>
  );
};

