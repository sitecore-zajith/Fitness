# FitLife Home Page - Sitecore XM Cloud Assembly Guide

Maps [`src/app/page.tsx`](../src/app/page.tsx) to Sitecore XM Cloud items: which **rendering** to insert, which **datasource template** it needs, and which **child item templates** must be created beneath it.

Automation: [`Assign-HomePageRenderings.ps1`](./Assign-HomePageRenderings.ps1) (run after [`Create-SitecoreAITemplates.ps1`](./Create-SitecoreAITemplates.ps1)).

---

## 1. Page Composition

| # | `page.tsx` component | Rendering (`/sitecore/layout/Renderings/Project/Corporate/FitnessMaster/...`) | Datasource Template (`Organisms/...`) | Inherited Base Templates | Child Item Template (Multilist field) | Placeholder |
|---|---|---|---|---|---|---|
| 1 | `<HomeHero />` | `HomeHero` | `HomeHero` | `_BaseSectionHeading`, `_BaseMediaCta` | - | `headless-main` |
| 2 | `<AboutSnippet />` | `AboutSnippet` | `AboutSnippet` | `_BaseSectionHeading`, `_BaseMediaCta` | `FeatureHighlightItem` (`FeatureHighlights`) | `headless-main` |
| 3 | `<ServicesPreview />` | `ServicesPreview` | `ServicesPreview` | `_BaseSectionHeading` | `ServiceItem` (`FeaturedServices`) | `headless-main` |
| 4 | `<Procedure />` | `Procedure` | `Procedure` | `_BaseSectionHeading` | `ProcedureStepItem` (`Steps`) | `headless-main` |
| 5 | `<Testimonials />` | `Testimonials` | `Testimonials` | `_BaseSectionHeading` | `TestimonialItem` (`TestimonialsList`) | `headless-main` |
| 6 | `<AppointmentForm />` | `AppointmentForm` | `AppointmentForm` | `_BaseSectionHeading`, `_BaseContactInfo` | `ServiceItem` (`ServiceOptions`, from `Data/Services`) | `headless-main` |

> [!NOTE]
> `Navbar` and `Footer` live in [`src/app/layout.tsx`](../src/app/layout.tsx), not `page.tsx`. In XM Cloud put them in a **Partial Design** (`Presentation/Partial Designs/Header` -> `headless-header`, `Footer` -> `headless-footer`) and attach it to the Page Design, so every page shares them. Their datasources go under `Data/Global` (see rendering `Datasource Location` override).

---

## 2. Content Tree Created by the Script

```
/sitecore/content/Corporate/FitLife
├── Home                                   <- Final Layout: 6 renderings in headless-main
└── Data
    ├── Services                           (Common Folder)
    │   ├── Weight Loss Program            ServiceItem
    │   ├── Sports Nutrition               ServiceItem
    │   ├── Individual Coaching            ServiceItem
    │   └── Workout Routines               ServiceItem
    ├── HomeHero
    │   └── Home HomeHero                  Organisms/HomeHero
    ├── AboutSnippet
    │   └── Home AboutSnippet              Organisms/AboutSnippet
    │       ├── Personalized Nutrition Plans   FeatureHighlightItem
    │       ├── Expert Fitness Coaching        FeatureHighlightItem
    │       └── Ongoing Support and Motivation FeatureHighlightItem
    ├── ServicesPreview
    │   └── Home ServicesPreview           Organisms/ServicesPreview
    │       ├── Nutrition Strategies       ServiceItem
    │       ├── Workout Routines           ServiceItem
    │       └── Support and Motivation     ServiceItem
    ├── Procedure
    │   └── Home Procedure                 Organisms/Procedure
    │       └── Step 01 .. Step 04         ProcedureStepItem
    ├── Testimonials
    │   └── Home Testimonials              Organisms/Testimonials
    │       ├── Sarah Johnson              TestimonialItem
    │       ├── Michael Chen               TestimonialItem
    │       └── Emily Rodriguez            TestimonialItem
    └── AppointmentForm
        └── Home AppointmentForm           Organisms/AppointmentForm
```

Child items sit **under** their datasource because the Multilist sources use `query:./*[@@templatename='...']` (relative to the datasource). `AppointmentForm.ServiceOptions` uses `Data/Services` instead.

---

## 3. Field Mapping (hard-coded copy -> Sitecore field)

| Component | Field | Value seeded |
|---|---|---|
| HomeHero | `Subtitle` / `Title` | Transform Your Life / Eat Mindfully, Sweat Often & Self Love Always |
| | `Description` | Discover a balanced approach to fitness and nutrition... |
| | `CtaLink` / `SecondaryCta` | Make an Appointment `/#appointment` / Explore Services `/services` |
| | `Image` | *(upload hero photo to Media Library)* |
| AboutSnippet | `Subtitle` / `Title` | About Us / Better Eat, Better Life |
| | `PrimaryParagraph` / `SecondaryParagraph` | Wellness philosophy / Two decades of experience |
| | `ExperienceYears` / `ExperienceLabel` | 24+ / Years of Experience |
| | `CtaLink` | Discover Our Story `/about` |
| ServicesPreview | `Subtitle` / `Title` | What We Do / Our Core Offerings |
| | Child `ServiceItem` | `Title`, `Description`, `IconName` (FaAppleAlt / FaDumbbell / FaHeartbeat) |
| Procedure | `Subtitle` / `Title` | Procedure / How It Works |
| | Child `ProcedureStepItem` | `StepNumber`, `Title`, `Description` |
| Testimonials | `Subtitle` / `Title` | Testimonials / Success Stories |
| | Child `TestimonialItem` | `Title` (client name), `Description` (quote), `ClientRole`, `Rating`, `AvatarImage` |
| AppointmentForm | `Subtitle` / `Title` | Get in Touch / Make an Appointment |
| | `PanelTitle` / `PanelDescription` | Start Your Journey Today / ...within 24 hours. |
| | `Address` / `Phone` / `Email` | 123 Fitness Avenue, Wellness City / +1 (555) 123-4567 / info@fitlifecoach.com |
| | `ServiceOptions` / `SubmitButtonText` / `SubmitEndpoint` | Data/Services items / Book Appointment / /api/appointments |

---

## 4. Run Order

1. **`Create-SitecoreAITemplates.ps1`** - templates, Json Renderings, Available Renderings.
2. Create the **FitLife headless site** via the XM Cloud site wizard (so `Home` gets the Headless Layout), if it does not already exist.
3. **`Assign-HomePageRenderings.ps1`** in SPE ISE - datasources + Home Final Layout.
4. Upload images to `/sitecore/media library/Project/FitLife` and set `Image` / `AvatarImage` fields in Pages.
5. Publish (or let Experience Edge pick it up) and verify the layout JSON:
   `sitecore/api/layout/render/jss?item=/&sc_apikey=...` -> `placeholders["headless-main"]` must list 6 components.

> [!IMPORTANT]
> The script is idempotent: re-running updates field values and rebinds existing renderings to their datasource instead of adding duplicates.

---

## 5. Next.js Side (required for the renderings to render)

- The Home route must render `<Placeholder name="headless-main" rendering={route} />` instead of the 6 hard-coded components.
- Each rendering's `componentName` must match the key registered in the component map/builder (`HomeHero`, `AboutSnippet`, ...).
- Each organism must read from `props.fields` (`<Text field={fields.Title} />`, `<Image field={fields.Image} />`, `<Link field={fields.CtaLink} />`) instead of hard-coded strings and arrays.
- Multilist fields arrive as arrays of `{ id, name, fields }` via the default Datasource resolver.

