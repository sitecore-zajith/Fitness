"use client";

import { useMemo } from "react";
import BlogDetailViewPure from "@/app/blog/[id]/BlogDetailView";
import { getBlogPost, getRelatedPosts, BlogPost } from "@/data/blogData";
import type { ComponentProps, BlogPostItemFields } from "./shared/types";

type BlogDetailViewProps = ComponentProps & { fields?: BlogPostItemFields };

export const Default = ({ fields }: BlogDetailViewProps) => {
  // If fields are passed from Sitecore datasource, construct a BlogPost model
  const articleId = fields?.ArticleId?.value || "1";

  const post: BlogPost = useMemo(() => {
    const basePost = getBlogPost(articleId);
    if (!fields) return basePost;

    // Parse SectionsJson if available
    let parsedSections = basePost.sections;
    if (fields.SectionsJson?.value) {
      try {
        parsedSections = JSON.parse(fields.SectionsJson.value);
      } catch {
        // Fall back to base sections
      }
    }

    // Parse KeyTakeaways if available
    let parsedTakeaways = basePost.keyTakeaways;
    if (fields.KeyTakeaways?.value) {
      parsedTakeaways = fields.KeyTakeaways.value
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // Cover Image URL string
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

    return {
      ...basePost,
      id: articleId,
      slug: fields.Slug?.value || basePost.slug,
      title: fields.Title?.value || basePost.title,
      subtitle: fields.Subtitle?.value || basePost.subtitle,
      excerpt: fields.Excerpt?.value || basePost.excerpt,
      category: fields.Category?.value || basePost.category,
      level: (fields.FitnessLevel?.value as BlogPost["level"]) || basePost.level,
      readTime: fields.ReadTime?.value || basePost.readTime,
      publishedDate: fields.PublishedDate?.value || basePost.publishedDate,
      updatedDate: fields.UpdatedDate?.value || basePost.updatedDate,
      coverImage: coverImg,
      imageCaption: fields.ImageCaption?.value || basePost.imageCaption,
      keyTakeaways: parsedTakeaways,
      sections: parsedSections,
      author: {
        name: fields.AuthorName?.value || basePost.author.name,
        role: fields.AuthorRole?.value || basePost.author.role,
        credentials: fields.AuthorCredentials?.value || basePost.author.credentials,
        avatar:
          (typeof fields.AuthorAvatar?.value === "string" && fields.AuthorAvatar.value) ||
          basePost.author.avatar,
        bio: fields.AuthorBio?.value || basePost.author.bio,
      },
    };
  }, [fields, articleId]);

  const relatedPosts = useMemo(() => {
    return getRelatedPosts(post.relatedPostIds);
  }, [post.relatedPostIds]);

  return <BlogDetailViewPure post={post} relatedPosts={relatedPosts} />;
};

