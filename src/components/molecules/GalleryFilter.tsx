"use client";

export interface GalleryFilterProps {
  categories: string[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  className?: string;
}

export default function GalleryFilter({
  categories,
  activeCategory = "All",
  onSelectCategory,
  className = "",
}: GalleryFilterProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory && onSelectCategory(category)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-neutral-200 text-neutral-600 hover:text-primary hover:border-primary"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

