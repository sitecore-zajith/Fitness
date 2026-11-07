# Revamp Product Catalog & Product Details — Implementation Plan

## Goal
Transform the `/products` catalog and `/products/[id]` product details experience into a comprehensive, enterprise-grade fitness and coaching e-commerce system featuring ~100 realistic products, multi-criteria filtering, infinite scroll loading (no pagination), and a fully dynamic product details page.

---

## Architectural Breakdown

### 1. Centralized Products Data Store (`src/data/productData.ts`)
- 100 realistic, high-quality products categorized across:
  - **Strength Equipment:** Power cages, Olympic barbells, adjustable dumbbells, kettlebells, weight benches.
  - **Cardio Machines:** Treadmills, rowing ergs, assault air bikes, stair climbers, indoor cycles.
  - **Coaching & Programs:** 1-on-1 Elite Coaching, 12-Week Hypertrophy Plan, Personalized Meal Prep Guide, Competition Peak Week.
  - **Nutrition & Supplements:** 100% Whey Isolate, Micronized Creatine, Pre-Workout Nitric Oxide, Electrolyte Hydration.
  - **Recovery & Mobility:** Percussive massage guns, high-density foam rollers, mobility bands, slant boards, lifting straps.
  - **Apparel & Gear:** Lever lifting belts, knee sleeves, moisture-wicking shirts, training bags.
- Structured Product Interface:
  - `id`: string ("1" to "100")
  - `slug`: string
  - `title`: string
  - `price`: number (numerical for filtering/sorting)
  - `priceDisplay`: formatted string (e.g. "LKR 45,000")
  - `oldPriceDisplay`?: string
  - `category`: string
  - `productType`: "Equipment" | "Coaching" | "Supplements" | "Recovery" | "Gear"
  - `rating`: number (4.0 - 5.0)
  - `reviewsCount`: number
  - `stock`: "In Stock" | "Low Stock" | "Pre-Order"
  - `badge`?: "Sale" | "New" | "Hot" | "Best Seller"
  - `image`: string (primary high-res Unsplash image)
  - `gallery`: string[] (multiple product views/angles)
  - `sku`: string
  - `shortDescription`: string
  - `fullDescription`: string
  - `features`: string[]
  - `specifications`: Record<string, string>
  - `coachTip`: string (advice from certified coaching staff on who should use this product)
  - `relatedProductIds`: string[]

### 2. Product Catalog & Infinite Scroll (`src/app/products/page.tsx`)
- **Filters:**
  - Search by title and description with instant clear button (`×`).
  - Category filter (sidebar list with live product count badges).
  - Price Range filter (interactive slider or min/max price buttons).
  - Product Type filter (Equipment, Coaching, Supplements, Recovery, Gear).
  - Sort selector (Price: Low to High, Price: High to Low, Highest Rated, Newest).
  - Filter summary counter (*"Showing X of Y products"*) and "Reset All Filters" button.
- **Infinite Scroll Loading:**
  - Remove all page pagination controls completely.
  - Implement `IntersectionObserver` observing bottom sentinel element.
  - Smooth batch loading (increments of 9 or 12 products) with animated loading spinner and end-of-catalog notice.

### 3. Dynamic Product Details Page (`src/app/products/[id]/page.tsx`)
- Next.js 16 safe unwrapping: `use(params)`.
- Dynamic product lookup via `getProduct(id)` with graceful fallback to featured product.
- Interactive multi-image gallery with thumbnail switcher.
- Product badges, rating star breakdown, real pricing with discount calculations.
- Quantity selector, Add to Cart button with animated confirmation, and Wishlist toggle.
- Tabbed information system:
  - **Description & Coach's Insight:** Deep dive on how to use it in training.
  - **Specifications:** Dimensions, weight capacity, materials, warranty.
  - **Features Checklist:** Key engineering points.
- Related products recommendations grid (3–4 matching products).

---

## Tasks

- [x] **Task 1: Generate 100 Products Data Store (`src/data/productData.ts`)**
  - Define `Product` schema with numerical prices, categories, galleries, specs, and coach tips.
  - Populate 100 realistic fitness products spanning strength, cardio, coaching, supplements, recovery, and gear.
  - Add helper functions: `getProduct(id)`, `getRelatedProducts(ids)`, `getAllProductCategories()`.
  - *Verify:* Test importing and calling `getProduct("1")` and `getProduct("100")`.

- [x] **Task 2: Overhaul Product Catalog & Filters with Infinite Scroll (`src/app/products/page.tsx`)**
  - Integrate live filtering across Search, Category, Price Range, and Product Type.
  - Remove `<Pagination />` and implement `IntersectionObserver` for seamless infinite scroll.
  - Update `ProductSidebar.tsx` and `ProductCatalog.tsx` to handle multi-filtering and sorting.
  - *Verify:* Test filtering by category, price, and searching keywords; test scrolling to load more products.

- [x] **Task 3: Build Fully Dynamic Product Details Page (`src/app/products/[id]/page.tsx`)**
  - Connect dynamic route to `getProduct(id)`.
  - Implement interactive image gallery with thumbnails.
  - Implement specifications table, coach recommendation callout, and add-to-cart feedback.
  - Implement related products recommendation carousel/grid.
  - *Verify:* Visit `/products/1`, `/products/25`, `/products/80` and verify accurate product details render.

- [x] **Task 4: Build Verification & Testing**
  - Run `npm run build` to ensure zero TypeScript, bundling, or routing errors.

---

## Done When
- [x] 100 unique, meaningful fitness/coaching products exist in `src/data/productData.ts`.
- [x] Product listing page features live search, category, price, and type filters.
- [x] Pagination is removed and replaced with smooth infinite scroll loading.
- [x] Every product links directly to its own rich, dedicated details page (`/products/[id]`).
- [x] `npm run build` exits with code 0.

