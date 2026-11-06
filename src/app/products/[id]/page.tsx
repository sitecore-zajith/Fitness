"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { 
  FaChevronRight, 
  FaStar, 
  FaMinus, 
  FaPlus, 
  FaShoppingCart, 
  FaCheck, 
  FaTruck, 
  FaShieldAlt, 
  FaUndo, 
  FaUserTie, 
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaBoxOpen,
  FaLayerGroup
} from "react-icons/fa";
import { getProduct, getRelatedProducts, Product } from "@/data/productData";
import ProductCard from "@/components/molecules/ProductCard";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  // Safe unwrap for Next.js 15/16 dynamic route params
  const resolvedParams = typeof (params as any)?.then === "function" 
    ? use(params as Promise<{ id: string }>) 
    : (params as { id: string });

  const productId = resolvedParams?.id || "1";
  const product: Product = getProduct(productId);
  const relatedProducts = getRelatedProducts(product.relatedProductIds);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "coach">("overview");
  const [mainImage, setMainImage] = useState(product.image);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sync main image when navigating to a new product
  useEffect(() => {
    setMainImage(product.image);
    setQuantity(1);
    setAddedToCart(false);
  }, [product.id, product.image]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="bg-neutral-50/70 pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs sm:text-sm text-neutral-500 mb-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <FaChevronRight className="mx-2 text-[10px] text-neutral-400" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <FaChevronRight className="mx-2 text-[10px] text-neutral-400" />
          <span className="text-primary font-semibold">{product.category}</span>
          <FaChevronRight className="mx-2 text-[10px] text-neutral-400 hidden sm:inline" />
          <span className="text-neutral-900 truncate max-w-xs hidden sm:inline">{product.title}</span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl shadow-xs border border-neutral-200/90 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Product Gallery (Left - 6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200/80 bg-neutral-50/40">
              
              {/* Main Featured Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden aspect-square mb-4 border border-neutral-200 shadow-xs flex items-center justify-center p-4">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
                <img 
                  src={mainImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover rounded-xl mix-blend-multiply transition-all duration-300"
                />
              </div>
              
              {/* Thumbnails Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.gallery.map((img, index) => {
                  const isSelected = mainImage === img;
                  return (
                    <button 
                      key={index} 
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 bg-white transition-all ${
                        isSelected 
                          ? "border-primary shadow-xs ring-2 ring-primary/20" 
                          : "border-neutral-200 hover:border-neutral-300 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.title} view ${index + 1}`} className="w-full h-full object-cover mix-blend-multiply p-1" />
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Product Info & Purchase Actions (Right - 6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    SKU: {product.sku}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-neutral-900 leading-tight mb-3">
                  {product.title}
                </h1>

                {/* Ratings & Stock Status */}
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-neutral-200"} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-neutral-800 ml-1">{product.rating}</span>
                    <span className="text-xs text-neutral-400">({product.reviewsCount} customer reviews)</span>
                  </div>

                  <span className="text-neutral-300">•</span>

                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    product.stock === "In Stock" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : product.stock === "Low Stock"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      product.stock === "In Stock" ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                    {product.stock}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold font-heading text-neutral-950">
                    {product.priceDisplay}
                  </span>
                  {product.oldPriceDisplay && (
                    <span className="text-base text-neutral-400 line-through">
                      {product.oldPriceDisplay}
                    </span>
                  )}
                  {product.oldPriceDisplay && (
                    <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-md border border-rose-200">
                      Save ~15%
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-8 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Key Features:
                  </h4>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                      <FaCheck className="text-primary mt-0.5 flex-shrink-0 text-[10px]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Purchase Controls (Quantity + Add to Cart + Wishlist) */}
              <div className="pt-6 border-t border-neutral-200 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 overflow-hidden">
                    <button 
                      onClick={handleDecrease}
                      className="p-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                      title="Decrease quantity"
                    >
                      <FaMinus size={11} />
                    </button>
                    <span className="px-4 font-bold text-sm text-neutral-900 min-w-10 text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={handleIncrease}
                      className="p-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                      title="Increase quantity"
                    >
                      <FaPlus size={11} />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-1 font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                      addedToCart 
                        ? "bg-emerald-600 text-white shadow-xs" 
                        : "bg-primary hover:bg-neutral-900 text-white shadow-sm"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <FaCheck /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart • {(product.price * quantity).toLocaleString()} LKR
                      </>
                    )}
                  </button>

                  {/* Wishlist toggle */}
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3.5 border rounded-xl text-sm transition-all ${
                      isWishlisted 
                        ? "bg-rose-50 border-rose-200 text-rose-500" 
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                    title={isWishlisted ? "Saved in wishlist" : "Add to wishlist"}
                  >
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                  </button>

                </div>

                {/* Assurance Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-neutral-500">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-neutral-50">
                    <FaTruck className="text-primary text-sm" />
                    <span>Express Island-Wide Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-neutral-50">
                    <FaShieldAlt className="text-primary text-sm" />
                    <span>Official Certified Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-neutral-50">
                    <FaUndo className="text-primary text-sm" />
                    <span>30-Day Easy Returns</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-white rounded-3xl shadow-xs border border-neutral-200/90 overflow-hidden mb-16">
          <div className="flex border-b border-neutral-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaBoxOpen /> Full Overview
            </button>

            <button
              onClick={() => setActiveTab("specs")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 ${
                activeTab === "specs"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaLayerGroup /> Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab("coach")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 ${
                activeTab === "coach"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaUserTie /> Coach's Recommendation
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {activeTab === "overview" && (
              <div className="prose max-w-none text-neutral-700 leading-relaxed text-sm sm:text-base space-y-4">
                <p>{product.fullDescription}</p>
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <h4 className="font-heading font-bold text-neutral-900 text-lg mb-3">
                    Who Is This For?
                  </h4>
                  <p>
                    Whether you are an aspiring athlete outfitting a home gym or a coaching client seeking optimal training and nutrition equipment, this product has been curated to ensure high biomechanical safety, progressive load tolerance, and lasting durability.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? "bg-neutral-50/70" : "bg-white"}>
                        <td className="py-3 px-4 font-bold text-neutral-700 w-1/3 border-b border-neutral-200/60">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-neutral-600 border-b border-neutral-200/60">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "coach" && (
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
                  <FaUserTie />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-neutral-900 text-lg mb-1">
                    Certified Coach's Take
                  </h4>
                  <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                    "{product.coachTip}"
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-neutral-900 transition-colors"
                  >
                    Need custom program integration? Book a consultation →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Complete Your Setup
                </span>
                <h3 className="text-2xl font-heading font-bold text-neutral-900">
                  Related Equipment & Training Gear
                </h3>
              </div>
              <Link 
                href="/products"
                className="text-xs font-bold text-neutral-900 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                Browse all 100 products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel, idx) => (
                <ProductCard
                  key={rel.id}
                  id={rel.id}
                  title={rel.title}
                  price={rel.priceDisplay}
                  oldPrice={rel.oldPriceDisplay}
                  category={rel.category}
                  rating={rel.rating}
                  stock={rel.stock}
                  image={rel.image}
                  badge={rel.badge}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
