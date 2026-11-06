import Link from "next/link";
import { motion } from "framer-motion";
import { FaUser, FaClock, FaArrowRight } from "react-icons/fa";

export interface BlogCardProps {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  month: string;
  author: string;
  comments?: number;
  image: string;
  index: number;
  category?: string;
  readTime?: string;
  tags?: string[];
  onTagClick?: (tag: string) => void;
}

export default function BlogCard({ 
  id, 
  title, 
  excerpt, 
  date, 
  month, 
  author, 
  comments, 
  image, 
  index,
  category,
  readTime,
  tags,
  onTagClick
}: BlogCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/blog/${id}`} className="block relative h-60 overflow-hidden bg-neutral-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        
        {/* Category Pill */}
        {category && (
          <span className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
            {category}
          </span>
        )}

        {/* Date Badge */}
        <div className="absolute bottom-4 right-4 bg-primary text-white text-center py-1.5 px-3 rounded-xl shadow-md">
          <span className="block text-xl font-bold leading-none">{date}</span>
          <small className="block text-[10px] uppercase tracking-wider font-semibold">{month}</small>
        </div>
      </Link>

      <div className="p-6 flex-grow flex flex-col">
        {/* Author and Read Time */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3 font-medium">
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <FaUser className="text-primary text-[11px]" /> {author}
          </span>
          {readTime && (
            <span className="flex items-center gap-1.5 text-neutral-400">
              <FaClock className="text-[10px]" /> {readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-heading mb-3 text-neutral-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          <Link href={`/blog/${id}`}>{title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {excerpt}
        </p>

        {/* Hashtags and Read Link */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-7">
              {tags.slice(0, 2).map((tag, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onTagClick) onTagClick(tag);
                  }}
                  className="text-[10px] font-medium text-neutral-500 bg-neutral-100 hover:bg-primary/10 hover:text-primary px-2 py-0.5 rounded-md transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          ) : <div />}

          <Link 
            href={`/blog/${id}`} 
            className="text-xs font-bold text-primary flex items-center gap-1 flex-shrink-0 group-hover:translate-x-1 transition-transform"
          >
            Read Article <FaArrowRight className="text-[9px]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
