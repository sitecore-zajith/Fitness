"use client";

import HeroSection from "@/components/organisms/HeroSection";
import GalleryGrid from "@/components/organisms/GalleryGrid";

const galleryItems = [
  {
    id: 1,
    title: "Weight Training",
    category: "Gym",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cardio Session",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Yoga Classes",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Personal Coaching",
    category: "Training",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Healthy Nutrition",
    category: "Diet",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Group Workouts",
    category: "Community",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Crossfit",
    category: "Intense",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Pilates",
    category: "Flexibility",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Stretching",
    category: "Recovery",
    image: "https://images.unsplash.com/photo-1552196563-55259259f635?q=80&w=800&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  return (
    <>
      <HeroSection 
        title="Our Gallery" 
        pageName="Gallery" 
        bgImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
      />

      <GalleryGrid items={galleryItems} />
    </>
  );
}
