import type { ComponentRendering, Field, ImageField, LinkField } from "@sitecore-content-sdk/nextjs";
import type { SitecoreItem } from "../components/shared/types";

export const text = <T extends string | number = string>(value: T): Field<T> => ({ value });

export const image = (src: string, alt: string): ImageField => ({ value: { src, alt } });

export const link = (href: string, linkText: string): LinkField => ({
  value: { href, text: linkText, linktype: href.startsWith("/") ? "internal" : "external" },
});

export const item = <TFields>(name: string, fields: TFields): SitecoreItem<TFields> => ({
  id: `mock-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name,
  fields,
});

export const rendering = (componentName: string, fields: unknown): ComponentRendering => ({
  uid: `mock-${componentName.toLowerCase()}`,
  componentName,
  dataSource: `/sitecore/content/Corporate/FitLife/Data/${componentName}/Home ${componentName}`,
  params: {},
  fields,
});

