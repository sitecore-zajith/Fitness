"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import BlogCard from "@/components/molecules/BlogCard";
import {
  blogPosts as defaultBlogPosts,
  getAllCategories,
  getAllAuthors,
  getAllLevels,
  BlogPost,
} from "@/data/blogData";
import {
  FaSearch,
  FaTimes,
  FaFilter,
  FaLayerGroup,
  FaUserTie,
  FaThLarge,
  FaRedo,
  FaSpinner,
  FaCheckCircle,
  FaBookOpen,
} from "react-icons/fa";
import { Text } from "@sitecore-content-sdk/nextjs";
import type { ComponentProps, BlogCatalogFields } from "./shared/types";

const INITIAL_BATCH_SIZE = 6;
const BATCH_INCREMENT = 3;

type BlogCatalogProps = ComponentProps & { fields?: BlogCatalogFields };

export const Default = ({ fields }: BlogCatalogProps) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    fields?.DefaultCategory?.value || "All Categories"
  );
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("All Authors");

  // Infinite Scroll States
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Available Filter Options
  const categories = useMemo(() => getAllCategories(), []);
  const authors = useMemo(() => getAllAuthors(), []);
  const levels = useMemo(() => getAllLevels(), []);

  // Multi-Criteria Filtering
  const filteredPosts = useMemo(() => {
    return defaultBlogPosts.filter((post: BlogPost) => {
      if (selectedCategory !== "All Categories" && post.category !== selectedCategory) {
        return false;
      }
      if (selectedLevel !== "All Levels" && post.level !== selectedLevel) {
        return false;
      }
      if (selectedAuthor !== "All Authors" && post.author.name !== selectedAuthor) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDescription =
          post.excerpt.toLowerCase().includes(query) ||
          post.subtitle.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedAuthor]);

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [searchQuery, selectedCategory, selectedLevel, selectedAuthor]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredPosts.length));
      setIsLoadingMore(false);
    }, 400);
  }, [isLoadingMore, hasMore, filteredPosts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "150px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadMore]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSelectedAuthor("All Authors");
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const isFiltered =
    searchQuery !== "" ||
    selectedCategory !== "All Categories" ||
    selectedLevel !== "All Levels" ||
    selectedAuthor !== "All Authors";

  return (
    <section className="py-16 md:py-24 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional Section Header from Sitecore Datasource */}
        {fields?.Title && (
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <Text
              field={fields.Title}
              tag="h2"
              className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 tracking-tight mb-3"
            />
            {fields.Subtitle && (
              <Text
                field={fields.Subtitle}
                tag="p"
                className="text-base sm:text-lg text-neutral-600 leading-relaxed"
              />
            )}
          </div>
        )}

        {/* Filter Suite */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 md:p-8 shadow-xs mb-12">
          {/* Top Row: Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <FaSearch />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by article title, topics, physiological benefits, keywords..."
              className="w-full pl-11 pr-10 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-900 placeholder-neutral-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Second Row: Dropdown Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaLayerGroup className="text-primary text-[11px]" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level Dropdown */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaThLarge className="text-primary text-[11px]" />
                Training Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Dropdown */}
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaUserTie className="text-primary text-[11px]" />
                Coach / Author
              </label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {authors.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Status & Reset */}
          <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-neutral-600 font-medium">
              <FaBookOpen className="text-primary" />
              <span>
                Showing <strong className="text-neutral-900">{displayedPosts.length}</strong> of{" "}
                <strong className="text-neutral-900">{filteredPosts.length}</strong> articles
              </span>
            </div>

            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 font-bold transition-colors cursor-pointer"
              >
                <FaRedo className="text-[10px]" /> Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Blog Post Grid */}
        {displayedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map((post: BlogPost, index: number) => {
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

            {/* Infinite Scroll Sentinel */}
            <div ref={observerTarget} className="mt-16 flex flex-col items-center justify-center">
              {isLoadingMore ? (
                <div className="flex items-center gap-3 text-neutral-600 text-sm font-semibold bg-white px-6 py-3 rounded-full shadow-xs border border-neutral-200">
                  <FaSpinner className="animate-spin text-primary" />
                  <span>Loading more insights...</span>
                </div>
              ) : hasMore ? (
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-white border border-neutral-300 hover:border-primary text-neutral-800 hover:text-primary rounded-xl text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  Load More Articles ({filteredPosts.length - displayedPosts.length} remaining)
                </button>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-4 py-2 rounded-full">
                    <FaCheckCircle className="text-emerald-500" />
                    You have caught up with all insights
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-xl">
              <FaFilter />
            </div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              We couldn't find any articles matching your search criteria. Try clearing some filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

