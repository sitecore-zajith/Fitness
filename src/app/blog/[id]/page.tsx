import type { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/data/blogData";
import BlogDetailView from "./BlogDetailView";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";
  const post = getBlogPost(id);

  return {
    title: `${post.title} | Fitness & Nutrition Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";
  const post = getBlogPost(id);
  const relatedPosts = getRelatedPosts(post.relatedPostIds);

  return <BlogDetailView post={post} relatedPosts={relatedPosts} />;
}
