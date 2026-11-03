"use client";

import { motion } from "framer-motion";
import { FaSearchPlus } from "react-icons/fa";

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface GalleryCardProps {
  item: GalleryItem;
  index?: number;
  onClick?: () => void;
}

export default function GalleryCard({
  item,
  index = 0,
  onClick,
}: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onClick={onClick}
      className="group relative flex flex-col h-72 bg-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <FaSearchPlus size={20} />
        </div>
        <h3 className="text-xl font-bold font-heading text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {item.title}
        </h3>
        <p className="text-white/80 text-sm font-medium uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          {item.category}
        </p>
      </div>
    </motion.div>
  );
}

