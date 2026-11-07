"use client";

import BlogCard from "@/components/molecules/BlogCard";
import Pagination from "@/components/molecules/Pagination";

export interface BlogPost {
  id?: number | string;
  title?: string;
  excerpt?: string;
  date?: string;
  month?: string;
  author?: string;
  comments?: number;
  image?: string;
}

export interface BlogGridProps {
  posts: BlogPost[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function BlogGrid({
  posts,
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className = "",
}: BlogGridProps) {
  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id || index}
              id={post.id || index}
              title={post.title || ""}
              excerpt={post.excerpt || ""}
              date={post.date || ""}
              month={post.month || ""}
              author={post.author || ""}
              comments={post.comments || 0}
              image={post.image || ""}
              index={index}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-16"
        />
      </div>
    </section>
  );
}

