"use client";

import { FaSearch, FaTimes, FaRedo, FaLayerGroup, FaCheckSquare, FaSquare } from "react-icons/fa";
import CategoryFilterList, { CategoryItem } from "@/components/molecules/CategoryFilterList";
import PriceFilterWidget from "@/components/molecules/PriceFilterWidget";

export interface ProductSidebarProps {
  categories: (string | CategoryItem)[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  productTypes?: string[];
  activeType?: string;
  onSelectType?: (type: string) => void;
  selectedPriceRange?: string;
  onSelectPriceRange?: (rangeId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  inStockOnly?: boolean;
  onToggleInStock?: () => void;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
  className?: string;
}

export default function ProductSidebar({
  categories,
  activeCategory = "All Products",
  onSelectCategory,
  productTypes = [],
  activeType = "All Types",
  onSelectType,
  selectedPriceRange = "all",
  onSelectPriceRange,
  searchQuery = "",
  onSearchChange,
  inStockOnly = false,
  onToggleInStock,
  onResetFilters,
  hasActiveFilters = false,
  className = "",
}: ProductSidebarProps) {
  return (
    <aside className={`w-full lg:w-1/4 flex flex-col gap-6 ${className}`}>
      
      {/* Search Input Widget */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-neutral-200/90">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold font-heading text-neutral-900">
            Search
          </h3>
          {hasActiveFilters && onResetFilters && (
            <button
              onClick={onResetFilters}
              className="text-[11px] font-semibold text-primary hover:text-neutral-900 flex items-center gap-1 transition-colors"
            >
              <FaRedo className="text-[9px]" /> Reset
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search equipment, gear..."
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-4 pl-10 pr-9 focus:outline-none focus:border-primary transition-all text-xs font-medium"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange && onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <FaTimes className="text-[10px]" />
            </button>
          )}
        </div>
      </div>

      {/* Product Categories */}
      <CategoryFilterList
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Product Type Chips */}
      {productTypes.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-neutral-200/90">
          <h3 className="text-base font-bold font-heading mb-4 text-neutral-900 flex items-center gap-2">
            <FaLayerGroup className="text-primary text-xs" /> Product Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {productTypes.map((type) => {
              const isSelected = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onSelectType && onSelectType(type)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${
                    isSelected
                      ? "bg-neutral-900 text-white font-semibold shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Filter Widget */}
      <PriceFilterWidget
        selectedRange={selectedPriceRange}
        onSelectRange={onSelectPriceRange}
      />

      {/* Stock Availability Filter */}
      {onToggleInStock && (
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-neutral-200/90">
          <button
            type="button"
            onClick={onToggleInStock}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <span>In Stock Items Only</span>
            {inStockOnly ? (
              <FaCheckSquare className="text-primary text-base" />
            ) : (
              <FaSquare className="text-neutral-300 text-base" />
            )}
          </button>
        </div>
      )}

    </aside>
  );
}
