"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FaChevronRight, 
  FaClock, 
  FaBookmark, 
  FaRegBookmark, 
  FaHeart, 
  FaRegHeart, 
  FaShareAlt, 
  FaCheck, 
  FaQuoteLeft, 
  FaLightbulb, 
  FaArrowRight, 
  FaCheckCircle, 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaUserGraduate 
} from "react-icons/fa";
import type { BlogPost } from "@/data/blogData";

interface BlogDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  // Client states
  const [likesCount, setLikesCount] = useState<number>(48);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Load persisted likes and bookmarks from localStorage
  useEffect(() => {
    const likeKey = `fitness_blog_liked_${post.id}`;
    if (localStorage.getItem(likeKey) === "true") {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }

    const bookmarkKey = `fitness_blog_bookmarked_${post.id}`;
    if (localStorage.getItem(bookmarkKey) === "true") {
      setIsBookmarked(true);
    }
  }, [post.id]);

  // Track reading progress and active section in Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }

      // Check which section heading is currently active
      const toc = post.tableOfContents || [];
      const sectionElements = toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 200;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post.tableOfContents]);

  // Handle Like/Clap
  const handleToggleLike = () => {
    const likeKey = `fitness_blog_liked_${post.id}`;
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
      localStorage.removeItem(likeKey);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      localStorage.setItem(likeKey, "true");
    }
  };

  // Handle Bookmark
  const handleToggleBookmark = () => {
    const bookmarkKey = `fitness_blog_bookmarked_${post.id}`;
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (nextState) {
      localStorage.setItem(bookmarkKey, "true");
    } else {
      localStorage.removeItem(bookmarkKey);
    }
  };

  // Handle Share / Copy Link
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  return (
    <div className="bg-neutral-50/60 min-h-screen text-neutral-800">
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-20 left-0 h-1 bg-primary z-50 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Copy Link Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
          <FaCheck className="text-emerald-400" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* Enterprise Editorial Header */}
      <header className="bg-white border-b border-neutral-200/80 pt-10 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6 font-medium">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
              Home
            </Link>
            <FaChevronRight className="text-[10px] text-neutral-400" />
            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1.5">
              Blog
            </Link>
            <FaChevronRight className="text-[10px] text-neutral-400" />
            <span className="text-primary font-semibold">{post.category}</span>
          </nav>

          {/* Category Pill & Reading Time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-primary/20">
              {post.category}
            </span>
            <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
              <FaClock className="text-neutral-400" />
              {post.readTime}
            </span>
            <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
              <FaCalendarAlt className="text-neutral-400" />
              {post.publishedDate}
            </span>
            {post.updatedDate && (
              <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-md font-medium">
                {post.updatedDate}
              </span>
            )}
          </div>

          {/* Article Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-neutral-950 tracking-tight leading-[1.18] mb-4">
            {post.title}
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-3xl mb-8 font-normal">
            {post.subtitle}
          </p>

          {/* Author Coach Byline & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-neutral-100">
            {/* Author details */}
            <div className="flex items-center gap-4">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-13 h-13 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-900">{post.author.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    <FaCheckCircle className="text-[10px]" /> Verified Coach
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium">
                  {post.author.role} • <span className="text-primary font-semibold">{post.author.credentials}</span>
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={handleToggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  isLiked 
                    ? "bg-rose-50 border-rose-200 text-rose-600" 
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
                title="Like this article"
              >
                {isLiked ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
                <span>{likesCount}</span>
              </button>

              <button 
                type="button"
                onClick={handleToggleBookmark}
                className={`p-2.5 rounded-xl text-sm border transition-all cursor-pointer ${
                  isBookmarked 
                    ? "bg-amber-50 border-amber-200 text-amber-600" 
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
                title={isBookmarked ? "Saved to reading list" : "Save for later"}
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>

              <button 
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer"
                title="Share or copy article link"
              >
                <FaShareAlt className="text-neutral-500" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Reading Container: 2-Column Editorial Grid */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left / Main Editorial Column (8 Columns) */}
          <article className="lg:col-span-8">
            {/* Featured Hero Image */}
            <figure className="mb-10">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200/80 aspect-[16/9] bg-neutral-100">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              {post.imageCaption && (
                <figcaption className="text-xs text-neutral-500 mt-3 text-center italic">
                  {post.imageCaption}
                </figcaption>
              )}
            </figure>

            {/* Executive Summary / Key Takeaways Box */}
            {(post.keyTakeaways || []).length > 0 && (
              <section className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border border-amber-200/70 rounded-2xl p-6 sm:p-7 mb-10 shadow-xs">
                <div className="flex items-center gap-2.5 text-xs font-bold text-amber-900 uppercase tracking-widest mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  Executive Summary & Key Takeaways
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-base leading-relaxed">
                      <FaCheckCircle className="text-primary mt-1 flex-shrink-0 text-sm" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Structured Article Sections */}
            <div className="space-y-12 text-neutral-800">
              {(post.sections || []).map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 mb-5 leading-snug">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                    {section.paragraphs?.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Bullet Points if provided */}
                  {section.bulletPoints && (
                    <div className="my-6 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                        Protocol Guidelines
                      </h4>
                      <ul className="space-y-2.5">
                        {section.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Coach / Nutritionist Callout Box */}
                  {section.callout && (
                    <aside className="my-8 rounded-2xl bg-white border-l-4 border-primary border-y border-r border-neutral-200 p-6 shadow-xs relative">
                      <div className="flex items-center gap-2.5 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                        {section.callout.type === "quote" ? (
                          <FaQuoteLeft className="text-sm" />
                        ) : (
                          <FaLightbulb className="text-sm" />
                        )}
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-neutral-800 text-base leading-relaxed italic">
                        "{section.callout.text}"
                      </p>
                      {section.callout.author && (
                        <p className="text-xs text-neutral-500 font-semibold mt-3 text-right">
                          — {section.callout.author}
                        </p>
                      )}
                    </aside>
                  )}

                  {/* Inline Section Image if present */}
                  {section.image && (
                    <figure className="my-8">
                      <img 
                        src={section.image.url} 
                        alt={section.image.alt} 
                        className="rounded-xl w-full h-72 object-cover border border-neutral-200"
                      />
                      <figcaption className="text-xs text-neutral-500 mt-2 text-center italic">
                        {section.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </section>
              ))}
            </div>

            {/* Article Tags */}
            {(post.tags || []).length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Related Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-medium bg-neutral-100 text-neutral-700 px-3.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Coach Full Bio Card */}
            <div className="mt-10 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-xs">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-20 h-20 rounded-full object-cover ring-4 ring-neutral-100 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{post.author.name}</h3>
                    <p className="text-xs text-primary font-semibold">{post.author.role} • {post.author.credentials}</p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="text-xs font-semibold bg-neutral-900 text-white px-3.5 py-2 rounded-lg hover:bg-primary transition-colors"
                  >
                    Book 1-on-1 Consultation
                  </Link>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mt-2">
                  {post.author.bio}
                </p>
              </div>
            </div>

            {/* Enterprise Coaching Callout Banner */}
            <div className="mt-10 rounded-2xl bg-neutral-900 text-white p-8 sm:p-10 relative overflow-hidden shadow-lg">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                  Coaching & Nutrition Program
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 text-white leading-tight">
                  Ready to put this science into a personalized plan?
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  Get custom macro calculations, structured progressive overload training cycles, and weekly coaching reviews tailored directly to your lifestyle.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2"
                  >
                    Start Your Custom Plan <FaArrowRight className="text-xs" />
                  </Link>
                  <Link 
                    href="/services" 
                    className="text-neutral-300 hover:text-white font-medium text-sm px-4 py-3 underline underline-offset-4 transition-colors"
                  >
                    Explore Coaching Tiers
                  </Link>
                </div>
              </div>
            </div>

          </article>

          {/* Right Sticky Side Rail (4 Columns) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">

              {/* Table of Contents Widget */}
              {(post.tableOfContents || []).length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4 pb-3 border-b border-neutral-100 flex items-center justify-between">
                    <span>Table of Contents</span>
                    <span className="text-[11px] font-normal text-neutral-400">
                      {Math.round(readingProgress)}% read
                    </span>
                  </h3>

                  <nav className="space-y-1">
                    {(post.tableOfContents || []).map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <a 
                          key={item.id} 
                          href={`#${item.id}`}
                          className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                            isActive 
                              ? "bg-primary/10 text-primary font-bold border-l-2 border-primary" 
                              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                          }`}
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Quick Coach Stats / Quick Guide Widget */}
              {post.author && (
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <FaUserGraduate className="text-sm" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">Coached by {post.author.name}</h4>
                      <p className="text-[11px] text-neutral-500">{post.author.credentials}</p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    Have questions about adjusting this protocol for your individual training split or injury history?
                  </p>
                  <Link 
                    href="/contact" 
                    className="block text-center text-xs font-bold text-neutral-900 hover:text-white bg-neutral-100 hover:bg-primary py-2.5 px-4 rounded-xl transition-all"
                  >
                    Ask Coach a Question
                  </Link>
                </div>
              )}

              {/* Back to Blog Listing */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Browse All Articles</h4>
                  <p className="text-[11px] text-neutral-500">100 articles available</p>
                </div>
                <Link 
                  href="/blog" 
                  className="text-xs font-semibold text-primary hover:text-neutral-900 flex items-center gap-1.5"
                >
                  <FaArrowLeft className="text-[10px]" /> Back to List
                </Link>
              </div>

            </div>
          </aside>

        </div>

        {/* Bottom Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Continue Reading
                </span>
                <h3 className="text-2xl font-heading font-bold text-neutral-900">
                  Related Performance & Nutrition Reads
                </h3>
              </div>
              <Link 
                href="/blog" 
                className="text-xs font-bold text-neutral-900 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                View all articles <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/blog/${related.id}`}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                    <img 
                      src={related.coverImage} 
                      alt={related.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {related.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-2">
                        <span>{related.readTime}</span>
                        <span>•</span>
                        <span>{related.author.name}</span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-neutral-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                      Read Article <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

