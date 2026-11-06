"use client";

import { RefObject } from "react";
import ProductCard from "@/components/molecules/ProductCard";
import ProductSortBar from "@/components/molecules/ProductSortBar";
import { FaSpinner, FaCheckCircle, FaSearch, FaRedo } from "react-icons/fa";

export interface ProductCatalogProps {
  products: {
    id: string | number;
    title: string;
    price: string | number;
    priceDisplay?: string;
    oldPriceDisplay?: string;
    category: string;
    rating?: number;
    stock?: string;
    image: string;
    badge?: string;
  }[];
  totalResults: number;
  shownCount: number;
  sortValue: string;
  onSortChange: (sort: string) => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  observerTarget?: RefObject<HTMLDivElement | null>;
  onResetFilters?: () => void;
  className?: string;
}

export default function ProductCatalog({
  products,
  totalResults,
  shownCount,
  sortValue,
  onSortChange,
  isLoadingMore = false,
  hasMore = false,
  observerTarget,
  onResetFilters,
  className = "",
}: ProductCatalogProps) {
  return (
    <div className={`w-full lg:w-3/4 ${className}`}>
      {/* Header / Sorting */}
      <ProductSortBar
        totalResults={totalResults}
        shownCount={shownCount}
        sortValue={sortValue}
        onSortChange={onSortChange}
      />

      {/* Zero results empty state */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center my-6 shadow-xs">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400 text-2xl">
            <FaSearch />
          </div>
          <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
            No matching products found
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            We couldn't find any products matching your current filters. Try loosening your price range or search terms.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="bg-primary hover:bg-neutral-900 text-white text-xs font-bold py-3 px-6 rounded-xl transition-colors duration-200 inline-flex items-center gap-2 shadow-xs"
            >
              <FaRedo className="text-xs" /> Reset All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.priceDisplay || (typeof product.price === "number" ? `LKR ${product.price.toLocaleString()}` : product.price)}
                oldPrice={product.oldPriceDisplay}
                category={product.category}
                rating={product.rating}
                stock={product.stock}
                image={product.image}
                badge={product.badge}
                index={index}
              />
            ))}
          </div>

          {/* Infinite Scroll Sentinel & Loading Indicator (No Pagination) */}
          <div ref={observerTarget} className="mt-14 flex flex-col items-center justify-center min-h-[90px]">
            {isLoadingMore && (
              <div className="flex items-center gap-3 text-neutral-600 bg-white px-6 py-3 rounded-full border border-neutral-200 shadow-xs animate-pulse">
                <FaSpinner className="animate-spin text-primary text-base" />
                <span className="text-xs font-semibold">Loading more fitness products...</span>
              </div>
            )}

            {!hasMore && products.length > 0 && (
              <div className="text-center py-6 text-neutral-400 text-xs font-medium flex items-center gap-2 border-t border-neutral-200/60 w-full justify-center">
                <FaCheckCircle className="text-emerald-500" />
                <span>You've viewed all {totalResults} matching products</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
