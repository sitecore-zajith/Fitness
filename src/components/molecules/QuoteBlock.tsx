"use client";

import { motion } from "framer-motion";

export interface QuoteBlockProps {
  quote: string;
  author?: string;
  className?: string;
}

export default function QuoteBlock({
  quote,
  author,
  className = "",
}: QuoteBlockProps) {
  return (
    <section className={`py-24 bg-neutral-50 flex items-center justify-center ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-neutral-800 leading-relaxed">
            "{quote}"
          </h2>
          {author && (
            <p className="mt-4 text-primary font-medium tracking-wider uppercase text-sm">
              — {author}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

