import Link from "next/link";
import { motion } from "framer-motion";
import { FaUser, FaClock, FaArrowRight, FaLayerGroup } from "react-icons/fa";

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
  level?: string;
  readTime?: string;
}

export default function BlogCard({ 
  id, 
  title, 
  excerpt, 
  date, 
  month, 
  author, 
  image, 
  index,
  category,
  level,
  readTime
}: BlogCardProps) {
  // Level badge styling (strictly complying with color guidelines)
  const getLevelBadge = (lvl?: string) => {
    switch (lvl) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

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
          <span className="absolute top-4 left-4 bg-neutral-900/85 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
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

        {/* Excerpt / Description */}
        <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {excerpt}
        </p>

        {/* Level Tag & Read More Link */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
          {level ? (
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border uppercase tracking-wider flex items-center gap-1 ${getLevelBadge(level)}`}>
              <FaLayerGroup className="text-[9px]" /> {level}
            </span>
          ) : (
            <div />
          )}

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
