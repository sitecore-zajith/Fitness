"use client";

import HeroSection from "@/components/organisms/HeroSection";
import ServicesGrid from "@/components/organisms/ServicesGrid";

const services = [
  {
    id: 1,
    title: "Weight Loss Program",
    description: "Comprehensive plans combining nutrition and fitness to help you shed pounds safely and keep them off for good.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Sports Nutritionists",
    description: "Expert guidance on macronutrients and meal timing to optimize your athletic performance and recovery.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Personalized Nutrition",
    description: "Tailored meal plans designed specifically for your body type, goals, and dietary preferences.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Individual Coaching",
    description: "One-on-one sessions with our certified trainers to ensure proper form and maximize your results.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Child Nutrition",
    description: "Healthy, balanced, and kid-friendly dietary strategies to support your child's growth and development.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Workout Routines",
    description: "Customized exercise regimens focused on strength, endurance, and flexibility for all fitness levels.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection 
        title="Services" 
        pageName="Services" 
        bgImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Services Grid Section */}
      <ServicesGrid services={services} />
    </>
  );
}
