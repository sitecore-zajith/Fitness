"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import BlogCard from "@/components/molecules/BlogCard";
import { blogPosts, getAllCategories, getAllTags, BlogPost } from "@/data/blogData";
import { 
  FaSearch, 
  FaTimes, 
  FaHashtag, 
  FaCheckCircle, 
  FaRedo, 
  FaSpinner, 
  FaFire,
  FaBookOpen
} from "react-icons/fa";

const INITIAL_BATCH_SIZE = 6;
const BATCH_INCREMENT = 3;

export default function BlogPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Infinite scroll states
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => getAllCategories(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Category counts computation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    blogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered posts based on search, category, and hashtag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // 1. Category check
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }

      // 2. Hashtag / Tag check
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }

      // 3. Search query check (title, excerpt, author, tags, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesAuthor = post.author.name.toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Reset visibleCount whenever filters change
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [searchQuery, selectedCategory, selectedTag]);

  // The slice of posts currently rendered
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  // Infinite Scroll Trigger
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    // Smooth natural loading micro-delay
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredPosts.length));
      setIsLoadingMore(false);
    }, 450);
  }, [isLoadingMore, hasMore, filteredPosts.length]);

  // IntersectionObserver for bottom infinite scroll
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: "250px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoadingMore]);

  // Clear all active filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "All" || selectedTag !== null;

  return (
    <div className="bg-neutral-50/70 min-h-screen">
      {/* Hero Header */}
      <HeroSection 
        title="Fitness & Coaching Journal" 
        pageName="Blog" 
        bgImage="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Control & Filter Suite */}
      <section className="border-b border-neutral-200/80 bg-white sticky top-20 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">

          {/* Top Bar: Search Bar & Results Counter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input with Instant Clear */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, workouts, macros, authors..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-2xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                  title="Clear search"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* Status & Active Filter Indicator */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs text-neutral-500 font-medium">
              <span className="flex items-center gap-1.5">
                <FaBookOpen className="text-primary text-[11px]" />
                Showing <strong className="text-neutral-900 font-semibold">{displayedPosts.length}</strong> of {filteredPosts.length} articles
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-primary hover:text-neutral-900 font-semibold text-xs transition-colors ml-2 bg-primary/10 px-3 py-1.5 rounded-lg"
                >
                  <FaRedo className="text-[10px]" /> Reset Filters
                </button>
              )}
            </div>

          </div>

          {/* Category Filter Pills (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    isSelected 
                      ? "bg-primary text-white shadow-xs" 
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-white/25 text-white" : "bg-neutral-200 text-neutral-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hashtag-level Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
              <FaHashtag className="text-[10px]" /> Tags:
            </span>

            {allTags.map((tag) => {
              const isTagSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagSelected ? null : tag)}
                  className={`flex-shrink-0 text-[11px] font-medium px-3 py-1 rounded-lg transition-all ${
                    isTagSelected 
                      ? "bg-neutral-900 text-white font-semibold ring-1 ring-neutral-900 shadow-2xs" 
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Main Articles Grid Section with Infinite Scroll */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400 text-2xl">
              <FaSearch />
            </div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No matching articles found
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              We couldn't find any articles matching your search criteria. Try modifying your search keywords, category, or hashtags.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-primary hover:bg-neutral-900 text-white text-xs font-bold py-3 px-6 rounded-xl transition-colors duration-200 inline-flex items-center gap-2 shadow-xs"
            >
              <FaRedo className="text-xs" /> Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid of Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map((post, index) => {
                const parts = post.publishedDate.split(" ");
                const month = parts[0]?.substring(0, 3) || "Jan";
                const date = parts[1]?.replace(",", "") || "01";

                return (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={date}
                    month={month}
                    author={post.author.name}
                    category={post.category}
                    readTime={post.readTime}
                    tags={post.tags}
                    onTagClick={(tag) => setSelectedTag(tag === selectedTag ? null : tag)}
                    image={post.coverImage}
                    index={index}
                  />
                );
              })}
            </div>

            {/* Infinite Scroll Sentinel & Loading Indicator */}
            <div ref={observerTarget} className="mt-16 flex flex-col items-center justify-center min-h-[90px]">
              {isLoadingMore && (
                <div className="flex items-center gap-3 text-neutral-600 bg-white px-6 py-3 rounded-full border border-neutral-200 shadow-xs animate-pulse">
                  <FaSpinner className="animate-spin text-primary text-base" />
                  <span className="text-xs font-semibold">Loading more fitness & coaching articles...</span>
                </div>
              )}

              {!hasMore && filteredPosts.length > 0 && (
                <div className="text-center py-6 text-neutral-400 text-xs font-medium flex items-center gap-2 border-t border-neutral-200/60 w-full justify-center">
                  <FaCheckCircle className="text-emerald-500" />
                  <span>You've reached the end • All {filteredPosts.length} articles loaded</span>
                </div>
              )}
            </div>
          </>
        )}

      </section>
    </div>
  );
}
