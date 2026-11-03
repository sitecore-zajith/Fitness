"use client";

import { motion } from "framer-motion";
import { FaAppleAlt, FaDumbbell, FaHeartbeat } from "react-icons/fa";
import SectionHeading from "../molecules/SectionHeading";

const services = [
  {
    icon: <FaAppleAlt size={40} className="text-primary" />,
    title: "Nutrition Strategies",
    description: "Customized meal plans and nutritional advice to fuel your body and reach your goals.",
  },
  {
    icon: <FaDumbbell size={40} className="text-primary" />,
    title: "Workout Routines",
    description: "Effective, science-based training programs tailored to your fitness level.",
  },
  {
    icon: <FaHeartbeat size={40} className="text-primary" />,
    title: "Support & Motivation",
    description: "Daily check-ins and unwavering support to keep you on track and motivated.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Core Offerings" subtitle="What We Do" centered />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-neutral-900 mb-4">
                {service.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
