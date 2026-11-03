"use client";

import HeroSection from "@/components/organisms/HeroSection";
import QuoteBlock from "@/components/molecules/QuoteBlock";
import CoachesSection from "@/components/organisms/CoachesSection";
import StatsSection from "@/components/organisms/StatsSection";
import Testimonials from "@/components/organisms/Testimonials";

const coaches = [
  {
    name: "Mark Brook",
    role: "Owner / Head Coach",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sarah Henderson",
    role: "Owner / Head Coach",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "George Hump",
    role: "Owner / Head Coach",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Victor Hump",
    role: "Owner / Head Coach",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
  },
];

const stats = [
  { label: "Happy Customers", value: "5,000+" },
  { label: "Group Classes", value: "4,560" },
  { label: "Years of Experience", value: "15+" },
  { label: "Lessons Conducted", value: "900+" },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection 
        title="About FitLife" 
        pageName="About" 
        bgImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Quote Section */}
      <QuoteBlock
        quote="We believe that physical, mental, and emotional resilience are virtuous and life-enhancing, and when it comes to living a balanced life, paramount."
      />

      {/* Coaches Section */}
      <CoachesSection coaches={coaches} />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Testimonials */}
      <Testimonials />
    </>
  );
}
