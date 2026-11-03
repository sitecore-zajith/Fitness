"use client";

import ProductCard from "@/components/molecules/ProductCard";
import ProductSortBar from "@/components/molecules/ProductSortBar";
import Pagination from "@/components/molecules/Pagination";

export interface ProductItem {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
}

export interface ProductCatalogProps {
  products: ProductItem[];
  totalResults?: number;
  shownCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sort: string) => void;
  className?: string;
}

export default function ProductCatalog({
  products,
  totalResults = 24,
  shownCount = 9,
  currentPage = 1,
  totalPages = 4,
  onPageChange,
  onSortChange,
  className = "",
}: ProductCatalogProps) {
  return (
    <div className={`w-full lg:w-3/4 ${className}`}>
      {/* Header / Sorting */}
      <ProductSortBar
        totalResults={totalResults}
        shownCount={shownCount}
        onSortChange={onSortChange}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
            badge={product.badge}
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mt-12"
      />
    </div>
  );
}

