import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar } from "react-icons/fa";

export interface ProductCardProps {
  id: number | string;
  title: string;
  price: string;
  oldPrice?: string;
  category: string;
  rating?: number;
  stock?: string;
  image: string;
  badge?: string;
  index: number;
}

export default function ProductCard({ 
  id, 
  title, 
  price, 
  oldPrice,
  category, 
  rating,
  image, 
  badge, 
  index 
}: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-neutral-200/90 relative"
    >
      {badge && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-xs">
          {badge}
        </div>
      )}
      
      <Link href={`/products/${id}`} className="block relative h-60 overflow-hidden bg-neutral-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-neutral-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white text-neutral-900 font-semibold text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 duration-300">
            <FaShoppingCart size={12} /> View Details
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-medium">
          <span className="uppercase tracking-wider text-[10px] font-semibold text-primary">{category}</span>
          {rating && (
            <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <FaStar className="text-[11px]" /> {rating}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold font-heading mb-2 text-neutral-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/products/${id}`}>{title}</Link>
        </h3>

        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900">{price}</span>
            {oldPrice && (
              <span className="text-xs text-neutral-400 line-through">{oldPrice}</span>
            )}
          </div>
          <Link 
            href={`/products/${id}`}
            className="text-xs font-semibold text-primary hover:text-neutral-900 transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
