"use client";

import { motion } from "framer-motion";
import Button from "../atoms/Button";
import SectionHeading from "../molecules/SectionHeading";

export default function AboutSnippet() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
                alt="Health Coach"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Counter floating card */}
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-primary font-bold text-5xl">24+</div>
                <div className="text-neutral-600 font-medium leading-tight">
                  Years of <br /> Experience
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading 
              title="Better Eat, Better Life" 
              subtitle="About Us"
            />
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We believe that true wellness comes from a balance of nourishing food, regular physical activity, and a positive mindset. Our approach is holistic and tailored to your unique lifestyle and goals.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              With over two decades of experience, we have helped thousands of individuals transform their bodies and their relationship with food. Let us guide you on your journey to a healthier, happier you.
            </p>
            <ul className="space-y-4 mb-10">
              {['Personalized Nutrition Plans', 'Expert Fitness Coaching', 'Ongoing Support & Motivation'].map((item, idx) => (
                <li key={idx} className="flex items-center text-neutral-800 font-medium">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/about">Discover Our Story</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
