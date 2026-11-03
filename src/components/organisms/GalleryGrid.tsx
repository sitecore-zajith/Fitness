"use client";

import { useState } from "react";
import GalleryCard, { GalleryItem } from "@/components/molecules/GalleryCard";
import GalleryFilter from "@/components/molecules/GalleryFilter";
import Button from "@/components/atoms/Button";

export interface GalleryGridProps {
  items: GalleryItem[];
  categories?: string[];
  initialCategory?: string;
  onItemClick?: (item: GalleryItem) => void;
  onLoadMore?: () => void;
  className?: string;
}

export default function GalleryGrid({
  items,
  categories = ["All", "Fitness", "Coaching", "Events"],
  initialCategory = "All",
  onItemClick,
  onLoadMore,
  className = "",
}: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <GalleryFilter
          categories={categories}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          className="mb-12"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => onItemClick && onItemClick(item)}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="uppercase tracking-wider text-sm px-10 py-3"
          >
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
}

