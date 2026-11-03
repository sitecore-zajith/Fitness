"use client";

import { motion } from "framer-motion";
import SectionHeading from "../molecules/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Trusted Services",
    desc: "Start with a comprehensive consultation to understand your needs.",
  },
  {
    num: "02",
    title: "Natural Ways",
    desc: "We build a plan focusing on whole foods and natural supplements.",
  },
  {
    num: "03",
    title: "Routine Exercise",
    desc: "Implement a sustainable and enjoyable workout regimen.",
  },
  {
    num: "04",
    title: "Success & Goal",
    desc: "Achieve your desired results and maintain them for life.",
  },
];

export default function Procedure() {
  return (
    <section className="py-24 bg-neutral-900 text-white z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="How It Works" subtitle="Procedure" centered />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 relative">
          {/* Connector Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-neutral-800 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto bg-neutral-900 border-4 border-primary rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <span className="text-3xl font-bold font-heading text-primary">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{step.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
