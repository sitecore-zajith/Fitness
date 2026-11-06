"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import BlogCard from "@/components/molecules/BlogCard";
import { 
  blogPosts, 
  getAllCategories, 
  getAllAuthors, 
  getAllLevels, 
  BlogPost,
  FitnessLevel 
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
  FaBookOpen 
} from "react-icons/fa";

const INITIAL_BATCH_SIZE = 6;
const BATCH_INCREMENT = 3;

export default function BlogPage() {
  // Filter States: Title/Description, Category, Level, Author
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("All Authors");

  // Infinite Scroll States
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Dynamic Options
  const categories = useMemo(() => getAllCategories(), []);
  const authors = useMemo(() => getAllAuthors(), []);
  const levels = useMemo(() => getAllLevels(), []);

  // Multi-Criteria Filtering: Title/Description, Category, Level, Author
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // 1. Category Filter
      if (selectedCategory !== "All Categories" && post.category !== selectedCategory) {
        return false;
      }

      // 2. Training Experience Level Filter
      if (selectedLevel !== "All Levels" && post.level !== selectedLevel) {
        return false;
      }

      // 3. Author / Coach Filter
      if (selectedAuthor !== "All Authors" && post.author.name !== selectedAuthor) {
        return false;
      }

      // 4. Title & Description Filter (Search)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDescription = post.excerpt.toLowerCase().includes(query) || 
                                   post.subtitle.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedAuthor]);

  // Reset pagination batch on filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [searchQuery, selectedCategory, selectedLevel, selectedAuthor]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  // Infinite Scroll Trigger
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredPosts.length));
      setIsLoadingMore(false);
    }, 450);
  }, [isLoadingMore, hasMore, filteredPosts.length]);

  // Observer for automatic infinite scroll
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
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSelectedAuthor("All Authors");
  };

  const hasActiveFilters = 
    searchQuery.trim() !== "" || 
    selectedCategory !== "All Categories" || 
    selectedLevel !== "All Levels" || 
    selectedAuthor !== "All Authors";

  return (
    <div className="bg-neutral-50/70 min-h-screen">
      {/* Hero Header */}
      <HeroSection 
        title="Fitness & Coaching Journal" 
        pageName="Blog" 
        bgImage="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Revamped Enterprise Filter Panel */}
      <section className="border-b border-neutral-200/90 bg-white sticky top-20 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          
          {/* Main Controls Grid: Search by Title/Description + 3 Select Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
            
            {/* 1. Title & Description Search Input (5 Columns) */}
            <div className="lg:col-span-5 relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title or description..." 
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-2xs font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                  title="Clear search"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* 2. Category Filter (3 Columns) */}
            <div className="lg:col-span-3 relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs pointer-events-none flex items-center gap-1">
                <FaThLarge />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none focus:border-primary focus:bg-white transition-all shadow-2xs cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
                ▼
              </span>
            </div>

            {/* 3. Training Level Filter (2 Columns) */}
            <div className="lg:col-span-2 relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs pointer-events-none flex items-center gap-1">
                <FaLayerGroup />
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none focus:border-primary focus:bg-white transition-all shadow-2xs cursor-pointer"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
                ▼
              </span>
            </div>

            {/* 4. Coach / Author Filter (2 Columns) */}
            <div className="lg:col-span-2 relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs pointer-events-none flex items-center gap-1">
                <FaUserTie />
              </div>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-neutral-800 font-medium focus:outline-none focus:border-primary focus:bg-white transition-all shadow-2xs cursor-pointer"
              >
                {authors.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
                ▼
              </span>
            </div>

          </div>

          {/* Active Filter Indicators & Results Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-neutral-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-neutral-500 font-medium flex items-center gap-1.5 mr-1">
                <FaBookOpen className="text-primary text-[11px]" />
                Showing <strong className="text-neutral-900 font-semibold">{displayedPosts.length}</strong> of {filteredPosts.length} articles
              </span>

              {/* Active Badges */}
              {selectedCategory !== "All Categories" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-neutral-200">
                  <span>Category: {selectedCategory}</span>
                  <button 
                    onClick={() => setSelectedCategory("All Categories")}
                    className="text-neutral-400 hover:text-neutral-700"
                    title="Remove filter"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}

              {selectedLevel !== "All Levels" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-neutral-200">
                  <span>Level: {selectedLevel}</span>
                  <button 
                    onClick={() => setSelectedLevel("All Levels")}
                    className="text-neutral-400 hover:text-neutral-700"
                    title="Remove filter"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}

              {selectedAuthor !== "All Authors" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-neutral-200">
                  <span>Coach: {selectedAuthor}</span>
                  <button 
                    onClick={() => setSelectedAuthor("All Authors")}
                    className="text-neutral-400 hover:text-neutral-700"
                    title="Remove filter"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}

              {searchQuery.trim() !== "" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-neutral-200">
                  <span>Search: "{searchQuery}"</span>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-neutral-400 hover:text-neutral-700"
                    title="Remove search"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-primary hover:text-neutral-900 font-semibold text-xs transition-colors bg-primary/10 hover:bg-primary/15 px-3 py-1.5 rounded-lg"
              >
                <FaRedo className="text-[10px]" /> Reset All Filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Main Articles Grid Section with Infinite Scroll */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Zero Results Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400 text-2xl">
              <FaFilter />
            </div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No matching articles found
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              We couldn't find any articles matching your selected title, description, level, author, or category.
            </p>
            <button
              onClick={handleResetFilters}
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
                    level={post.level}
                    readTime={post.readTime}
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
