import Link from "next/link";
import { motion } from "framer-motion";
import { FaUser, FaComment } from "react-icons/fa";

interface BlogCardProps {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  month: string;
  author: string;
  comments: number;
  image: string;
  index: number;
}

export default function BlogCard({ id, title, excerpt, date, month, author, comments, image, index }: BlogCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer flex flex-col h-full"
    >
      <Link href={`/blog/${id}`} className="block relative h-64 overflow-hidden rounded-t-2xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 bg-primary text-white text-center py-2 px-3 rounded-lg shadow-lg">
          <span className="block text-2xl font-bold leading-none mb-1">{date}</span>
          <small className="block text-xs uppercase tracking-wider font-medium">{month}</small>
        </div>
      </Link>
      <div className="bg-white border border-t-0 border-neutral-100 rounded-b-2xl p-6 flex-grow flex flex-col shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <p className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <FaUser className="text-primary" /> {author}
          </span>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <FaComment className="text-primary" /> {comments} Comments
          </span>
        </p>
        <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">
          <Link href={`/blog/${id}`}>{title}</Link>
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-4 flex-grow">
          {excerpt}
        </p>
      </div>
    </motion.div>
  );
}
