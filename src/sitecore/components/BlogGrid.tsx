"use client";

import { useState } from "react";
import BlogCard from "@/components/molecules/BlogCard";
import Pagination from "@/components/molecules/Pagination";
import { blogPosts as defaultBlogPosts, BlogPost } from "@/data/blogData";
import type { ComponentProps, BlogPostItemFields, SitecoreItem } from "./shared/types";
import type { Field } from "@sitecore-content-sdk/nextjs";

export interface BlogGridFields {
  PageSize?: Field<number>;
  TotalPages?: Field<number>;
  Posts?: SitecoreItem<BlogPostItemFields>[];
}

type BlogGridProps = ComponentProps & { fields?: BlogGridFields };

export const Default = ({ fields }: BlogGridProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = fields?.PageSize?.value || 6;
  const totalPosts = defaultBlogPosts.length;
  const totalPages = fields?.TotalPages?.value || Math.ceil(totalPosts / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = defaultBlogPosts.slice(startIndex, startIndex + pageSize);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post: BlogPost, index: number) => {
            const dayMatch = post.publishedDate.match(/\b\d{1,2}\b/);
            const monthMatch = post.publishedDate.match(/^[A-Za-z]+/);
            const displayDay = dayMatch ? dayMatch[0] : "15";
            const displayMonth = monthMatch ? monthMatch[0].slice(0, 3).toUpperCase() : "OCT";

            return (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={displayDay}
                month={displayMonth}
                author={post.author.name}
                comments={post.initialComments?.length || 4}
                image={post.coverImage}
                category={post.category}
                readTime={post.readTime}
                index={index}
              />
            );
          })}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          className="mt-16"
        />
      </div>
    </section>
  );
};

