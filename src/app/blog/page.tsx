"use client";

import HeroSection from "@/components/organisms/HeroSection";
import BlogGrid from "@/components/organisms/BlogGrid";

const blogPosts = [
  {
    id: 1,
    title: "How Much Protein Do You Really Need Every Day?",
    excerpt: "Discover the science behind daily protein intake and how to calculate the optimal amount for your muscle-building goals.",
    date: "13",
    month: "Jan",
    author: "Admin",
    comments: 3,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Best Exercises for Weight Loss",
    excerpt: "From HIIT to steady-state cardio, we break down the most effective exercises to help you burn fat and retain muscle mass.",
    date: "12",
    month: "Jan",
    author: "Admin",
    comments: 2,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Why You Should Eat More Vegetables",
    excerpt: "Learn how increasing your daily vegetable intake can boost your energy levels, improve digestion, and accelerate recovery.",
    date: "10",
    month: "Jan",
    author: "Admin",
    comments: 5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Importance of Rest Days",
    excerpt: "Overtraining can hinder your progress. Find out why rest days are crucial for muscle repair and injury prevention.",
    date: "08",
    month: "Jan",
    author: "Admin",
    comments: 2,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Proper Nutrition for Muscle Gain",
    excerpt: "Stop guessing your macros. Here's a comprehensive guide to eating for lean muscle growth without gaining excess fat.",
    date: "06",
    month: "Jan",
    author: "Admin",
    comments: 8,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Yoga Poses for Flexibility",
    excerpt: "Incorporate these 5 essential yoga poses into your post-workout routine to improve flexibility and reduce muscle soreness.",
    date: "04",
    month: "Jan",
    author: "Admin",
    comments: 1,
    image: "https://images.unsplash.com/photo-1552196563-55259259f635?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Healthy Recipes for Dinner",
    excerpt: "Short on time? Try these 3 quick, delicious, and macro-friendly dinner recipes to keep your diet on track.",
    date: "02",
    month: "Jan",
    author: "Admin",
    comments: 0,
    image: "https://images.unsplash.com/photo-149883716733f-a51b1f15728c?q=80&w=800&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <>
      <HeroSection 
        title="Our Blog" 
        pageName="Blog" 
        bgImage="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop" 
      />

      <BlogGrid posts={blogPosts} />
    </>
  );
}
