"use client";

import { useMemo } from "react";
import BlogDetailViewPure from "@/app/blog/[id]/BlogDetailView";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
  BlogPost,
  TableOfContentsItem,
  ArticleSection,
} from "@/data/blogData";
import type { ComponentProps, BlogPostItemFields } from "./shared/types";
import MissingDatasource from "./shared/MissingDatasource";

type BlogDetailViewProps = ComponentProps & { fields?: BlogPostItemFields };

export const Default = ({ fields }: BlogDetailViewProps) => {
  // Graceful fallback when rendering has no datasource selected
  if (!fields && typeof window !== "undefined") {
    // If rendered without fields, check if we can preview default article
    const fallbackArticle = getBlogPost("1");
    return (
      <BlogDetailViewPure
        post={fallbackArticle}
        relatedPosts={getRelatedPosts(fallbackArticle.relatedPostIds)}
      />
    );
  }

  // Resolve base article from ArticleId or Slug fallback
  const articleId = fields?.ArticleId?.value || "";
  const slug = fields?.Slug?.value || "";

  const post: BlogPost = useMemo(() => {
    // 1. Find matching static post or default to article 1
    let basePost = articleId ? getBlogPost(articleId) : null;
    if (!basePost && slug) {
      basePost = blogPosts.find((p) => p.slug === slug) || null;
    }
    if (!basePost) {
      basePost = getBlogPost("1");
    }

    if (!fields) return basePost;

    // 2. Parse Structured Sections (from SectionsJson or Rich Text ContentBody)
    let parsedSections: ArticleSection[] = basePost.sections;
    if (fields.SectionsJson?.value) {
      try {
        const parsed = JSON.parse(fields.SectionsJson.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsedSections = parsed;
        }
      } catch {
        // Fall back to base sections on invalid JSON
      }
    } else if (fields.ContentBody?.value) {
      parsedSections = [
        {
          id: "article-content",
          heading: fields.Title?.value || basePost.title,
          paragraphs: [fields.ContentBody.value],
        },
      ];
    }

    // 3. Derive Table of Contents from structured sections
    const derivedToc: TableOfContentsItem[] =
      parsedSections && parsedSections.length > 0
        ? parsedSections.map((s) => ({
            id: s.id,
            title: s.heading,
          }))
        : basePost.tableOfContents || [];

    // 4. Parse Executive Key Takeaways (newline-delimited text)
    let parsedTakeaways = basePost.keyTakeaways;
    if (fields.KeyTakeaways?.value) {
      parsedTakeaways = fields.KeyTakeaways.value
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // 5. Parse Cover Image (supports string URL or Sitecore ImageField object)
    let coverImg = basePost.coverImage;
    if (typeof fields.CoverImage?.value === "string" && fields.CoverImage.value) {
      coverImg = fields.CoverImage.value;
    } else if (
      fields.CoverImage &&
      typeof fields.CoverImage === "object" &&
      "value" in fields.CoverImage &&
      (fields.CoverImage.value as { src?: string })?.src
    ) {
      coverImg = (fields.CoverImage.value as { src: string }).src;
    }

    // 6. Parse Author Details (prioritizes Droplink item fields, then flat fields, then base)
    const authorDroplink = fields.Author?.fields;
    const authorName =
      fields.AuthorName?.value || authorDroplink?.Name?.value || basePost.author.name;
    const authorRole =
      fields.AuthorRole?.value || authorDroplink?.Role?.value || basePost.author.role;
    const authorCredentials =
      fields.AuthorCredentials?.value ||
      authorDroplink?.Credentials?.value ||
      basePost.author.credentials;

    let authorAvatar = basePost.author.avatar;
    const rawAvatar = fields.AuthorAvatar || authorDroplink?.Avatar;
    if (typeof rawAvatar?.value === "string" && rawAvatar.value) {
      authorAvatar = rawAvatar.value;
    } else if (
      rawAvatar &&
      typeof rawAvatar === "object" &&
      "value" in rawAvatar &&
      (rawAvatar.value as { src?: string })?.src
    ) {
      authorAvatar = (rawAvatar.value as { src: string }).src;
    }

    const authorBio =
      fields.AuthorBio?.value || authorDroplink?.Bio?.value || basePost.author.bio;

    // 7. Parse Tags
    const tags = fields.Tags?.value
      ? fields.Tags.value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : basePost.tags;

    return {
      ...basePost,
      id: articleId || basePost.id,
      slug: slug || basePost.slug,
      title: fields.Title?.value || basePost.title,
      subtitle: fields.Subtitle?.value || basePost.subtitle,
      excerpt: fields.Description?.value || fields.Excerpt?.value || basePost.excerpt,
      category: fields.Category?.value || basePost.category,
      level: (fields.FitnessLevel?.value as BlogPost["level"]) || basePost.level,
      readTime: fields.ReadTime?.value || basePost.readTime,
      publishedDate: fields.PublishedDate?.value || fields.PublishDate?.value || basePost.publishedDate,
      updatedDate: fields.UpdatedDate?.value || basePost.updatedDate,
      coverImage: coverImg,
      imageCaption: fields.ImageCaption?.value || basePost.imageCaption,
      keyTakeaways: parsedTakeaways,
      tableOfContents: derivedToc,
      sections: parsedSections,
      tags,
      author: {
        name: authorName,
        role: authorRole,
        credentials: authorCredentials,
        avatar: authorAvatar,
        bio: authorBio,
      },
    };
  }, [fields, articleId, slug]);

  // 8. Resolve Related Posts (Multilist Sitecore items with fallback to relatedPostIds)
  const relatedPosts = useMemo(() => {
    if (fields?.RelatedPosts && fields.RelatedPosts.length > 0) {
      return fields.RelatedPosts.map((relItem) => {
        const rf = relItem.fields;
        const relId = rf?.ArticleId?.value || relItem.id;
        const fallback = getBlogPost(relId);

        let cover = fallback.coverImage;
        if (typeof rf?.CoverImage?.value === "string" && rf.CoverImage.value) {
          cover = rf.CoverImage.value;
        } else if (
          rf?.CoverImage &&
          typeof rf.CoverImage === "object" &&
          "value" in rf.CoverImage &&
          (rf.CoverImage.value as { src?: string })?.src
        ) {
          cover = (rf.CoverImage.value as { src: string }).src;
        }

        return {
          ...fallback,
          id: relId,
          slug: rf?.Slug?.value || fallback.slug,
          title: rf?.Title?.value || fallback.title,
          subtitle: rf?.Subtitle?.value || fallback.subtitle,
          excerpt: rf?.Excerpt?.value || fallback.excerpt,
          category: rf?.Category?.value || fallback.category,
          readTime: rf?.ReadTime?.value || fallback.readTime,
          coverImage: cover,
          author: {
            ...fallback.author,
            name: rf?.AuthorName?.value || fallback.author.name,
          },
        };
      });
    }

    return getRelatedPosts(post.relatedPostIds || []);
  }, [fields?.RelatedPosts, post.relatedPostIds]);

  return <BlogDetailViewPure post={post} relatedPosts={relatedPosts} />;
};
