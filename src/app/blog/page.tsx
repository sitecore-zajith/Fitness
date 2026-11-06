"use client";

import HeroSection from "@/components/organisms/HeroSection";
import BlogGrid from "@/components/organisms/BlogGrid";
import { blogPosts } from "@/data/blogData";

export default function BlogPage() {
  const formattedPosts = blogPosts.map((post) => {
    const parts = post.publishedDate.split(" ");
    const month = parts[0]?.substring(0, 3) || "Jan";
    const date = parts[1]?.replace(",", "") || "01";
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date,
      month,
      author: post.author.name,
      comments: post.initialComments.length,
      image: post.coverImage,
    };
  });

  return (
    <>
      <HeroSection 
        title="Our Blog" 
        pageName="Blog" 
        bgImage="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop" 
      />

      <BlogGrid posts={formattedPosts} />
    </>
  );
}
