# Revamp Blog Details Page — Implementation Plan

## Goal
Revamp the fitness, coaching, and nutrition blog details page (`/blog/[id]`) into an enterprise-grade, highly readable, editorial publication with structured fitness & nutrition content, interactive coach touchpoints, and sticky reading navigation.

---

## Architectural Breakdown

### 1. Data Store (`src/data/blogData.ts`)
- Complete data registry covering all 7 fitness & nutrition topics matching `/blog`:
  1. **Protein Science:** Daily requirements, calculation formulas, and muscle protein synthesis.
  2. **Fat Loss & Conditioning:** HIIT vs. steady-state cardio protocols.
  3. **Micronutrient Health:** Vegetable phytonutrients, gut microbiome, and athletic recovery.
  4. **Rest & Recovery:** CNS fatigue, deloading strategies, and sleep optimization.
  5. **Muscle Hypertrophy Nutrition:** Caloric surplus, macro ratios, nutrient timing.
  6. **Mobility & Yoga:** Post-workout flexibility, joint decompression routines.
  7. **High-Performance Nutrition:** Quick, macro-balanced dinner recipes.
- Structured schema per article:
  - Meta: `id`, `slug`, `title`, `subtitle`, `excerpt`, `category`, `readTime`, `publishedDate`, `coverImage`, `imageCaption`
  - Author/Coach: `name`, `role`, `credentials` (e.g. CSCS, RD, CPT), `avatar`, `bio`
  - Editorial Structure:
    - `keyTakeaways`: 3–4 executive summary bullet points
    - `tableOfContents`: anchorable sections with `id` and `label`
    - `sections`: subheadings, paragraphs, coach callout tips ("Coach's Pro Tip", "Nutritionist Fact Check"), stat callouts, actionable bullet protocols
    - `tags`: topical tags
    - `relatedPostIds`: IDs of relevant follow-up reads
    - `initialComments`: realistic client & coach discussion threads

### 2. UI Components & Layout (`src/app/blog/[id]/page.tsx`)
- **Next.js 16 Safe Unwrapping:** Use `React.use(params)` for asynchronous params.
- **Enterprise Editorial Header:**
  - Clean breadcrumb navigation (`Home > Blog > [Category] > [Title]`).
  - Category pill badge, estimated read time with book icon, publish date.
  - High-impact editorial title (Prata heading) & subtitle.
  - Coach byline: avatar, name, certified credentials, and "Verified Coach" badge.
- **Sticky Side Rail & Reading Utility:**
  - Table of Contents with active section anchor jumps.
  - Reading progress indicator.
  - Action bar: Like/Clap counter with interactive state, Share button with Copy-Link toast feedback, Bookmark toggle.
- **Main Editorial Reading Column (max-w-3xl prose):**
  - "Key Takeaways" executive summary card at the start.
  - High-resolution cover image with elegant caption.
  - Body typography: comfortable line length (65–75ch), readable font size, leading-relaxed.
  - "Coach's Note" and "Nutritionist Rule" highlight callout cards.
  - Author Bio Card at the end of the post with credentials and coaching consultation link.
- **Interactive Discussion Section:**
  - Community comment list with nested coach replies.
  - Comment submission form with input validation and browser `localStorage` persistence.
- **Bottom Related Articles Grid:**
  - 3 related articles cards pointing to other fitness/nutrition posts.
- **Enterprise Coaching Consultation Banner:**
  - Personalized workout & nutrition coaching consultation CTA.

---

## Tasks

- [x] **Task 1: Create Centralized Blog Data Store (`src/data/blogData.ts`)**
  - Define `BlogPost`, `Author`, `Comment`, and `ArticleSection` interfaces.
  - Populate comprehensive data for all 7 fitness & nutrition topics with takeaways, coach callouts, and comments.
  - Add `getBlogPost(id)` helper with fallback to featured article for unknown IDs.
  - *Verify:* Import and query `getBlogPost("1")` and `getBlogPost("999")` in node/browser without errors.

- [x] **Task 2: Synchronize Blog Listing Page (`src/app/blog/page.tsx`)**
  - Update `src/app/blog/page.tsx` to source its post summaries directly from `src/data/blogData.ts`.
  - Ensure card links (`/blog/1`, `/blog/2`, etc.) correspond perfectly to the new data.
  - *Verify:* Run `npm run build` or navigate to `/blog` and verify all cards render dynamically with accurate categories and metadata.

- [x] **Task 3: Build Revamped Blog Details Page (`src/app/blog/[id]/page.tsx`)**
  - Implement Next.js 16 safe params unwrapping.
  - Implement enterprise header with coach credentials and category badges.
  - Implement the sticky reading rail (Table of Contents, quick actions, reading progress).
  - Implement executive summary box, rich editorial body, coach pro-tips, and author bio card.
  - Implement interactive like button, copy-link share notification, and persistent comment system.
  - Implement related articles recommendations and enterprise coaching CTA banner.
  - *Verify:* Visit `/blog/1`, `/blog/2`, `/blog/6` in browser; check layout, responsiveness, and typography.

- [x] **Task 4: Interactive Verification & Testing**
  - Test clicking different blog articles from `/blog` to `/blog/[id]`.
  - Test submitting a comment and verifying persistence in `localStorage`.
  - Test clicking "Copy Link" to verify toast notification.
  - Test clicking Table of Contents anchor links.
  - Test mobile responsiveness (viewport < 768px).
  - *Verify:* Run `npm run build` to ensure zero TypeScript or bundling errors.

---

## Done When
- [x] Every article from the blog listing (`/blog/1` through `/blog/7`) has its own rich, dedicated fitness/nutrition/coaching content.
- [x] The blog details layout matches enterprise publication standards with clean typography, key takeaways, coach callout cards, and sticky navigation.
- [x] Comments and likes are interactive and persistent via `localStorage`.
- [x] Zero build or lint errors (`npm run build` exits 0).

