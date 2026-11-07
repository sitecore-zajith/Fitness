/**
 * Local stand-in for `@sitecore-content-sdk/nextjs`.
 *
 * tsconfig maps `@sitecore-content-sdk/nextjs` to this file so the components in
 * `src/sitecore/components` compile and render here with mock layout data, while their
 * imports stay identical to a real XM Cloud (Content SDK) project.
 *
 * Only the subset of the SDK used by those components is implemented, with the same
 * prop names and field shapes. Remove the tsconfig alias once the real SDK is installed.
 */
import NextLink from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import { createElement, Fragment } from "react";

// ---------------------------------------------------------------------------
// Field & rendering types (shape-compatible with the Content SDK)
// ---------------------------------------------------------------------------

export interface Field<T = string> {
  value: T;
  editable?: string;
}

export interface TextField {
  value?: string | number;
  editable?: string;
}

export interface RichTextField {
  value?: string;
  editable?: string;
}

export type MultiLineTextField = TextField;

export interface ImageFieldValue {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  [attribute: string]: unknown;
}

export interface ImageField {
  value?: ImageFieldValue;
  editable?: string;
}

export interface LinkFieldValue {
  href?: string;
  text?: string;
  target?: string;
  title?: string;
  anchor?: string;
  querystring?: string;
  class?: string;
  linktype?: string;
  id?: string;
}

export interface LinkField {
  value: LinkFieldValue;
  editable?: string;
}

export type ComponentParams = Record<string, string>;

export interface ComponentRendering {
  uid?: string;
  componentName: string;
  dataSource?: string;
  params?: ComponentParams;
  fields?: unknown;
}

// ---------------------------------------------------------------------------
// Field helpers
// ---------------------------------------------------------------------------

type TextProps = HTMLAttributes<HTMLElement> & {
  field?: TextField;
  tag?: string;
};

/** Renders a text field. Newlines become <br /> like the SDK `Text` component. */
export function Text({ field, tag, ...rest }: TextProps) {
  const raw = field?.value;
  if (raw === undefined || raw === null || raw === "") return null;

  const lines = String(raw).split("\n");
  const content = lines.map((line, index) =>
    createElement(Fragment, { key: index }, line, index < lines.length - 1 ? createElement("br") : null)
  );

  return tag ? createElement(tag, rest, content) : createElement(Fragment, null, content);
}

type RichTextProps = HTMLAttributes<HTMLElement> & {
  field?: RichTextField;
  tag?: string;
};

/** Renders trusted CMS HTML, matching the SDK `RichText` component. */
export function RichText({ field, tag = "div", ...rest }: RichTextProps) {
  if (!field?.value) return null;
  return createElement(tag, { ...rest, dangerouslySetInnerHTML: { __html: field.value } });
}

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  field?: ImageField;
};

/** Renders an image field as a plain <img>, matching the SDK `Image` component. */
export function Image({ field, alt, ...rest }: ImageProps) {
  const value = field?.value;
  if (!value?.src) return null;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={value.src} alt={alt ?? value.alt ?? ""} width={value.width} height={value.height} {...rest} />;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  field?: LinkField;
  children?: ReactNode;
};

/** Renders a general link field. Internal paths use next/link. */
export function Link({ field, children, ...rest }: LinkProps) {
  const value = field?.value;
  if (!value?.href) return null;

  const query = value.querystring ? `?${value.querystring}` : "";
  const anchor = value.anchor ? `#${value.anchor}` : "";
  const href = `${value.href}${query}${anchor}`;
  const content = children ?? value.text ?? href;
  const attributes = { title: value.title, target: value.target || undefined, ...rest };

  if (href.startsWith("/")) {
    return (
      <NextLink href={href} {...attributes}>
        {content}
      </NextLink>
    );
  }

  return (
    <a href={href} {...attributes}>
      {content}
    </a>
  );
}

