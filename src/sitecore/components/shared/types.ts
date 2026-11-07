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

/** DatasourceItems/BlogAuthor */
export interface BlogAuthorFields {
  Name: Field<string>;
  Role?: Field<string>;
  Credentials?: Field<string>;
  Avatar?: Field<string> | ImageField;
  Bio?: Field<string>;
}

/** DatasourceItems/BlogPostItem */
export interface BlogPostItemFields {
  ArticleId?: Field<string>;
  Slug?: Field<string>;
  Category?: Field<string>;
  FitnessLevel?: Field<string>;
  ReadTime?: Field<string>;
  PublishDate?: Field<string>;
  PublishedDate?: Field<string>;
  UpdatedDate?: Field<string>;
  DisplayDay?: Field<string>;
  DisplayMonth?: Field<string>;
  Title: Field<string>;
  Subtitle?: Field<string>;
  Excerpt?: Field<string>;
  Description?: Field<string>;
  CoverImage?: Field<string> | ImageField;
  ImageCaption?: Field<string>;
  KeyTakeaways?: Field<string>;
  ContentBody?: Field<string>;
  SectionsJson?: Field<string>;
  Tags?: Field<string>;
  AuthorName?: Field<string>;
  AuthorRole?: Field<string>;
  AuthorCredentials?: Field<string>;
  AuthorAvatar?: Field<string> | ImageField;
  AuthorBio?: Field<string>;
  Author?: SitecoreItem<BlogAuthorFields>;
  RelatedPosts?: SitecoreItem<BlogPostItemFields>[];
  CommentCount?: Field<number>;
  CommentsCount?: Field<number>;
}

/** Organisms/BlogCatalog */
export interface BlogCatalogFields {
  Title?: Field<string>;
  Subtitle?: Field<string>;
  PageSize?: Field<number>;
  DefaultCategory?: Field<string>;
  Posts?: SitecoreItem<BlogPostItemFields>[];
}


