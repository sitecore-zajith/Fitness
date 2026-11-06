"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import ProductSidebar from "@/components/organisms/ProductSidebar";
import ProductCatalog from "@/components/organisms/ProductCatalog";
import { 
  products, 
  productCategories, 
  productTypes, 
  Product 
} from "@/data/productData";
import { priceRanges } from "@/components/molecules/PriceFilterWidget";

const INITIAL_BATCH_SIZE = 9;
const BATCH_INCREMENT = 6;

export default function ProductsPage() {
  // Filter States
  const [activeCategory, setActiveCategory] = useState<string>("All Products");
  const [activeType, setActiveType] = useState<string>("All Types");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>("default");

  // Infinite Scroll States
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Calculate live category counts
  const categoryItems = useMemo(() => {
    const counts: Record<string, number> = { "All Products": products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return productCategories.map((cat) => ({
      name: cat,
      count: counts[cat] || 0,
    }));
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // 1. Category Filter
      if (activeCategory !== "All Products" && product.category !== activeCategory) {
        return false;
      }

      // 2. Product Type Filter
      if (activeType !== "All Types" && product.productType !== activeType) {
        return false;
      }

      // 3. Search Query Filter (Title, Short Description, SKU)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSku) {
          return false;
        }
      }

      // 4. In Stock Filter
      if (inStockOnly && product.stock !== "In Stock") {
        return false;
      }

      // 5. Price Range Filter
      if (selectedPriceRange !== "all") {
        const rangeConfig = priceRanges.find((r) => r.id === selectedPriceRange);
        if (rangeConfig) {
          if (rangeConfig.min !== undefined && product.price < rangeConfig.min) return false;
          if (rangeConfig.max !== undefined && product.price > rangeConfig.max) return false;
        }
      }

      return true;
    });

    // Sort result
    if (sortValue === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortValue === "popularity") {
      result = [...result].sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortValue === "latest") {
      result = [...result].sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [activeCategory, activeType, searchQuery, inStockOnly, selectedPriceRange, sortValue]);

  // Reset pagination batch on filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [activeCategory, activeType, searchQuery, inStockOnly, selectedPriceRange, sortValue]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  // Infinite Scroll Trigger
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredProducts.length));
      setIsLoadingMore(false);
    }, 400);
  }, [isLoadingMore, hasMore, filteredProducts.length]);

  // Observer for automatic infinite scroll
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: "250px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoadingMore]);

  // Reset all filters handler
  const handleResetFilters = () => {
    setActiveCategory("All Products");
    setActiveType("All Types");
    setSelectedPriceRange("all");
    setSearchQuery("");
    setInStockOnly(false);
    setSortValue("default");
  };

  const hasActiveFilters = 
    activeCategory !== "All Products" ||
    activeType !== "All Types" ||
    selectedPriceRange !== "all" ||
    searchQuery.trim() !== "" ||
    inStockOnly ||
    sortValue !== "default";

  return (
    <>
      <HeroSection 
        title="Fitness Gear & Equipment" 
        pageName="Shop" 
        bgImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Shop Layout Section */}
      <section className="py-16 bg-neutral-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Sidebar Organism */}
            <ProductSidebar
              categories={categoryItems}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              productTypes={productTypes}
              activeType={activeType}
              onSelectType={setActiveType}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={setSelectedPriceRange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              inStockOnly={inStockOnly}
              onToggleInStock={() => setInStockOnly(!inStockOnly)}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Product Catalog Organism with Infinite Scroll */}
            <ProductCatalog
              products={displayedProducts}
              totalResults={filteredProducts.length}
              shownCount={displayedProducts.length}
              sortValue={sortValue}
              onSortChange={setSortValue}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              observerTarget={observerTarget}
              onResetFilters={handleResetFilters}
            />

          </div>
        </div>
      </section>
    </>
  );
}
