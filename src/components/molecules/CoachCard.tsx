"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export interface Coach {
  name: string;
  role: string;
  image: string;
  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface CoachCardProps {
  coach: Coach;
  index?: number;
}

export default function CoachCard({ coach, index = 0 }: CoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6 text-center flex-grow flex flex-col border border-t-0 border-neutral-100 bg-white relative -mt-4 mx-4 z-10 shadow-md group-hover:-translate-y-4 transition-transform duration-300">
        <span className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-medium">
          {coach.role}
        </span>
        <h3 className="text-xl font-bold font-heading mb-4 text-neutral-900">
          {coach.name}
        </h3>
        <div className="flex items-center justify-center gap-3 mt-auto">
          <a
            href={coach.socials?.twitter || "#"}
            aria-label={`${coach.name} Twitter`}
            className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
          >
            <FaTwitter size={14} />
          </a>
          <a
            href={coach.socials?.facebook || "#"}
            aria-label={`${coach.name} Facebook`}
            className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
          >
            <FaFacebookF size={14} />
          </a>
          <a
            href={coach.socials?.instagram || "#"}
            aria-label={`${coach.name} Instagram`}
            className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
          >
            <FaInstagram size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

