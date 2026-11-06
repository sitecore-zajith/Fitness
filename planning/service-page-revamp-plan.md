# Implementation Plan: Services Ecosystem & Dynamic Service Details

## Overview
Develop a high-performance, enterprise-grade fitness and coaching services ecosystem comprising:
1. A rich, centralized data store (`src/data/serviceData.ts`) covering realistic services across Personal Training, Online Coaching, Sports Nutrition, Rehab & Mobility, and Athletic Performance.
2. A revamped main services directory (`src/app/services/page.tsx`) with category tabs, delivery format filters, an interactive "Find Your Ideal Program" matcher, 4-phase methodology roadmap, and social proof.
3. A dynamic service details experience (`src/app/services/[id]/page.tsx` & `ServiceDetailView.tsx`) featuring a 3-phase curriculum roadmap, package pricing tiers, lead coach credential bio, embedded consultation booking inquiry form, and cross-ecosystem links to products and blog articles.

---

## Action Items

- [x] **Step 1: Centralized Service Data Store (`src/data/serviceData.ts`)**
  - Defined `Service`, `PricingTier`, `ProgramPhase`, `LeadCoach`, and `ServiceFAQ` types.
  - Populated realistic fitness & nutrition coaching services with full syllabus phases and coach bios.
  - Implemented helper functions `getService(id)` and `getRelatedServices(ids)`.

- [x] **Step 2: Update `ServiceCard.tsx`**
  - Supported category badges, format indicators (In-Person / Online / Hybrid), deliverables bullet previews, pricing, and links to `/services/${id}`.

- [x] **Step 3: Revamp Main Services Page (`src/app/services/page.tsx`)**
  - Implemented live category filtering & delivery format filtering.
  - Added interactive "Find Your Ideal Program" mini-quiz widget with dynamic recommendations.
  - Added 4-Step Coaching Methodology section.
  - Added Transformation Statistics bar & Services FAQ accordion.

- [x] **Step 4: Build Dynamic Service Details Page (`/services/[id]`)**
  - `src/app/services/[id]/page.tsx`: Server Component with async `params` resolution and dynamic `generateMetadata()`.
  - `src/app/services/[id]/ServiceDetailView.tsx`: Client Component with interactive phase tabs, pricing tier selector, lead coach profile, consultation booking form with animated toast feedback, and cross-linked products & blog articles.

- [x] **Step 5: Production Verification**
  - Executed `npm run build` with zero TypeScript errors and exit code 0.
  - Tested `/services`, `/services/1`, `/services/3`, `/services/5` with HTTP 200 responses.
