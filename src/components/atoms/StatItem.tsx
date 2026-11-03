"use client";

import { motion } from "framer-motion";

export interface StatItemProps {
  value: string;
  label: string;
  index?: number;
  className?: string;
}

export default function StatItem({
  value,
  label,
  index = 0,
  className = "",
}: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`text-center ${className}`}
    >
      <div className="text-5xl font-bold font-heading text-primary mb-2">
        {value}
      </div>
      <div className="text-white/80 font-medium tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}

