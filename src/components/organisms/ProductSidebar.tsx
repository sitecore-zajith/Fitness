"use client";

import { FaSearch } from "react-icons/fa";
import CategoryFilterList, { CategoryItem } from "@/components/molecules/CategoryFilterList";
import PriceFilterWidget from "@/components/molecules/PriceFilterWidget";

export interface ProductSidebarProps {
  categories: (string | CategoryItem)[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

export default function ProductSidebar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  className = "",
}: ProductSidebarProps) {
  return (
    <aside className={`w-full lg:w-1/4 flex flex-col gap-8 ${className}`}>
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
        <h3 className="text-lg font-bold font-heading mb-4 text-neutral-900">
          Search Products
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:border-primary transition-colors text-sm"
          />
          <FaSearch className="absolute left-3.5 top-3.5 text-neutral-400" />
        </div>
      </div>

      {/* Categories */}
      <CategoryFilterList
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Price Filter */}
      <PriceFilterWidget />
    </aside>
  );
}

