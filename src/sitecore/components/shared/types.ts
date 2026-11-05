import type { ComponentParams, ComponentRendering, Field, ImageField, LinkField } from "@sitecore-content-sdk/nextjs";

/** Props every Sitecore rendering receives from the Placeholder. */
export interface ComponentProps {
  rendering: ComponentRendering;
  params: ComponentParams;
}

/** A Multilist / Treelist target item as serialized by the default Datasource resolver. */
export interface SitecoreItem<TFields> {
  id: string;
  url?: string;
  name: string;
  displayName?: string;
  fields: TFields;
}

/** Base/_BaseSectionHeading */
export interface SectionHeadingFields {
  Subtitle: Field<string>;
  Title: Field<string>;
}

/** Base/_BaseMediaCta */
export interface MediaCtaFields {
  Image: ImageField;
  CtaLink: LinkField;
}

/** Base/_BaseContactInfo */
export interface ContactInfoFields {
  Address: Field<string>;
  Phone: Field<string>;
  Email: Field<string>;
}

/** Base/_BaseBrandIdentity */
export interface BrandIdentityFields {
  BrandPrefix: Field<string>;
  BrandSuffix: Field<string>;
}

/** Base/_BaseSocialLinks */
export interface SocialLinksFields {
  FacebookLink?: LinkField;
  TwitterLink?: LinkField;
  InstagramLink?: LinkField;
  YoutubeLink?: LinkField;
}

/** DatasourceItems/NavigationLinkItem */
export interface NavigationLinkItemFields {
  LinkTitle: Field<string>;
  TargetLink: LinkField;
}

/** DatasourceItems/ServiceItem (inherits _BaseContentBlock + _BaseMediaCta) */
export interface ServiceItemFields extends Partial<MediaCtaFields> {
  Title: Field<string>;
  Description?: Field<string>;
  IconName?: Field<string>;
}

