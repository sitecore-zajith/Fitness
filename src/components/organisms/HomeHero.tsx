"use client";

import { motion } from "framer-motion";
import Button from "../atoms/Button";

export default function HomeHero() {
  return (
    <section className="relative h-screen flex items-center bg-neutral-900 overflow-hidden">
      {/* Background overlay/image placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Fitness Training" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-wider uppercase mb-4 block">
              Transform Your Life
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Eat Mindfully, <br />
              Sweat Often & <br />
              Self Love Always
            </h1>
            <p className="text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl">
              Discover a balanced approach to fitness and nutrition. Our personalized coaching programs are designed to help you achieve sustainable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/#appointment" variant="primary">
                Make an Appointment
              </Button>
              <Button href="/services" variant="outline" className="text-white border-white hover:bg-white hover:text-neutral-900">
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
