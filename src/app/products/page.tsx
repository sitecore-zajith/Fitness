"use client";

import { useState } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import ProductSidebar from "@/components/organisms/ProductSidebar";
import ProductCatalog from "@/components/organisms/ProductCatalog";

const categories = [
  "All Products",
  "Cardio Equipment",
  "Strength Training",
  "Yoga & Pilates",
  "Accessories",
  "Apparel"
];

const products = [
  {
    id: 1,
    title: "ProRunner X500 Treadmill",
    price: "LKR 145,000",
    category: "Cardio Equipment",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    badge: "Sale"
  },
  {
    id: 2,
    title: "Adjustable Dumbbell Set 24kg",
    price: "LKR 35,000",
    category: "Strength Training",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Premium Eco Yoga Mat",
    price: "LKR 8,500",
    category: "Yoga & Pilates",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop",
    badge: "New"
  },
  {
    id: 4,
    title: "Resistance Band Kit (5 Levels)",
    price: "LKR 4,200",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Indoor Cycling Bike Pro",
    price: "LKR 85,000",
    category: "Cardio Equipment",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Kettlebell 16kg",
    price: "LKR 12,000",
    category: "Strength Training",
    image: "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "High-Density Foam Roller",
    price: "LKR 3,500",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Elliptical Cross Trainer",
    price: "LKR 120,000",
    category: "Cardio Equipment",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    badge: "Hot"
  },
  {
    id: 9,
    title: "Olympic Barbell 20kg",
    price: "LKR 28,000",
    category: "Strength Training",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All Products" || product.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <HeroSection 
        title="Fitness Equipment" 
        pageName="Shop" 
        bgImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Shop Layout Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Organism */}
            <ProductSidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Product Catalog Organism */}
            <ProductCatalog
              products={filteredProducts}
              totalResults={products.length}
              shownCount={filteredProducts.length}
            />
          </div>
        </div>
      </section>
    </>
  );
}
