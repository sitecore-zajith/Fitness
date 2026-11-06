"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaStar, FaClock, FaLaptopCode, FaDumbbell } from "react-icons/fa";

interface ServiceCardProps {
  id: number | string;
  title: string;
  description: string;
  image: string;
  index: number;
  category?: string;
  deliveryFormat?: string;
  duration?: string;
  startingPriceDisplay?: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  keyBenefits?: string[];
  coachName?: string;
  coachAvatar?: string;
}

export default function ServiceCard({
  id,
  title,
  description,
  image,
  index,
  category,
  deliveryFormat,
  duration,
  startingPriceDisplay,
  badge,
  rating = 4.9,
  reviewsCount = 48,
  keyBenefits,
  coachName,
  coachAvatar
}: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.3) }}
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-200/90"
    >
      {/* Top Media Container */}
      <div className="relative h-60 overflow-hidden bg-neutral-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
        
        {/* Badge if available */}
        {badge && (
          <span className="absolute top-4 left-4 z-10 bg-primary text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-xs">
            {badge}
          </span>
        )}

        {/* Delivery format tag */}
        {deliveryFormat && (
          <span className="absolute top-4 right-4 z-10 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg flex items-center gap-1.5 border border-white/10">
            {deliveryFormat.includes("Online") ? (
              <FaLaptopCode className="text-[10px] text-amber-400" />
            ) : (
              <FaDumbbell className="text-[10px] text-primary" />
            )}
            {deliveryFormat}
          </span>
        )}

        {/* Bottom image overlay: category & duration */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
          {category && (
            <span className="font-semibold text-amber-300 tracking-wide uppercase text-[10px]">
              {category}
            </span>
          )}
          {duration && (
            <span className="flex items-center gap-1 text-[11px] text-neutral-300">
              <FaClock className="text-[10px]" /> {duration}
            </span>
          )}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating bar */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(rating) ? "text-amber-400" : "text-neutral-200"} />
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-800">{rating}</span>
            <span className="text-xs text-neutral-400">({reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold font-heading mb-3 text-neutral-950 group-hover:text-primary transition-colors leading-snug">
            <Link href={`/services/${id}`}>
              {title}
            </Link>
          </h3>

          {/* Short description */}
          <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-3 font-normal">
            {description}
          </p>

          {/* Key deliverables bullet points preview */}
          {keyBenefits && keyBenefits.length > 0 && (
            <div className="space-y-2 mb-6 pt-4 border-t border-neutral-100">
              {keyBenefits.slice(0, 2).map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                  <FaCheck className="text-primary mt-0.5 flex-shrink-0 text-[10px]" />
                  <span className="line-clamp-1">{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area: Coach avatar, Pricing & Action CTA */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          {coachName && coachAvatar ? (
            <div className="flex items-center gap-2.5">
              <img 
                src={coachAvatar} 
                alt={coachName} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-200"
              />
              <div className="text-left">
                <span className="text-[10px] text-neutral-400 block leading-none">Lead Coach</span>
                <span className="text-xs font-bold text-neutral-800">{coachName}</span>
              </div>
            </div>
          ) : startingPriceDisplay ? (
            <div>
              <span className="text-[10px] text-neutral-400 block leading-none">Starting From</span>
              <span className="text-sm font-bold text-neutral-900">{startingPriceDisplay}</span>
            </div>
          ) : <div />}

          <Link 
            href={`/services/${id}`} 
            className="inline-flex items-center justify-center gap-1.5 bg-neutral-900 group-hover:bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-xs"
          >
            <span>View Program</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
