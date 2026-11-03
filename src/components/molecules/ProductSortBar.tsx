"use client";

export interface ProductSortBarProps {
  totalResults?: number;
  shownCount?: number;
  sortValue?: string;
  onSortChange?: (value: string) => void;
  className?: string;
}

export default function ProductSortBar({
  totalResults = 24,
  shownCount = 9,
  sortValue,
  onSortChange,
  className = "",
}: ProductSortBarProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-neutral-100 mb-8 ${className}`}
    >
      <p className="text-sm text-neutral-500 mb-4 sm:mb-0">
        Showing 1–{shownCount} of {totalResults} results
      </p>
      <select
        value={sortValue}
        onChange={(e) => onSortChange && onSortChange(e.target.value)}
        className="bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-4 text-sm text-neutral-700 focus:outline-none focus:border-primary"
      >
        <option value="default">Default sorting</option>
        <option value="popularity">Sort by popularity</option>
        <option value="latest">Sort by latest</option>
        <option value="price-asc">Sort by price: low to high</option>
        <option value="price-desc">Sort by price: high to low</option>
      </select>
    </div>
  );
}

