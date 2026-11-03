import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  id: number | string;
  title: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
  index: number;
}

export default function ProductCard({ id, title, price, category, image, badge, index }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 relative"
    >
      {badge && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
          {badge}
        </div>
      )}
      <div className="relative h-60 overflow-hidden bg-neutral-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-neutral-900 font-medium px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2">
            <FaShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow text-center">
        <span className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-medium">{category}</span>
        <h3 className="text-lg font-bold font-heading mb-2 text-neutral-900 leading-snug group-hover:text-primary transition-colors">
          <Link href={`/products/${id}`}>{title}</Link>
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>
      </div>
    </motion.div>
  );
}
