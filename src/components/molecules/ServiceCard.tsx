import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  id: number | string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function ServiceCard({ id, title, description, image, index }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Optional overlay effect on hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow text-center items-center">
        <h2 className="text-2xl font-bold font-heading mb-4 text-neutral-900 group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <Link 
          href={`/services/${id}`} 
          className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}
