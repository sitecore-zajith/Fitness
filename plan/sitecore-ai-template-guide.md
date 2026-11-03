# Sitecore AI (XM Cloud / Headless JSS) Template & Field Guide

## 1. Overview & Architecture

This specification documents the conversion of all **19 Organism components** in `src/components/organisms/` into **Sitecore XM Cloud / Sitecore AI Project-layer templates** under `/sitecore/templates/Project/FitnessMaster`.

The accompanying Sitecore PowerShell Extensions (SPE) script ([`Create-SitecoreAITemplates.ps1`](file:///c:/Users/MohamedZajith/projects/fitness-master/planning/Create-SitecoreAITemplates.ps1)) automates:
1. **Shared Sitecore AI Base Template** (`/sitecore/templates/Project/FitnessMaster/Base/_SitecoreAI_Metadata`) inherited by all component and child item templates.
2. **11 Child Datasource Item Templates** (`/sitecore/templates/Project/FitnessMaster/DatasourceItems/*`) for list, grid, and card organisms.
3. **19 Organism Templates** (`/sitecore/templates/Project/FitnessMaster/Organisms/*`) with `__Standard Values`, Insert Options (`__Masters`), and Sitecore AI prompt metadata (`__Short description` & `__Long description`).
4. **Reusable `Add-SitecoreAIField` Function** showing how to add any new field with Sitecore AI / Stream generation instructions.

---

## 2. Sitecore Template Tree Structure

```text
/sitecore/templates/Project/FitnessMaster
├── Base
│   └── _SitecoreAI_Metadata
├── DatasourceItems
│   ├── BlogPostItem
│   ├── CoachItem
│   ├── FeatureHighlightItem
│   ├── GalleryItem
│   ├── NavigationLinkItem
│   ├── ProcedureStepItem
│   ├── ProductCategoryItem
│   ├── ProductItem
│   ├── ServiceItem
│   ├── StatItem
│   └── TestimonialItem
└── Organisms
    ├── AboutSnippet
    ├── AppointmentForm
    ├── BlogGrid
    ├── CoachesSection
    ├── ContactForm
    ├── ContactInfoSection
    ├── ContactMap
    ├── Footer
    ├── GalleryGrid
    ├── HeroSection
    ├── HomeHero
    ├── Navbar
    ├── Procedure
    ├── ProductCatalog
    ├── ProductSidebar
    ├── ServicesGrid
    ├── ServicesPreview
    ├── StatsSection
    └── Testimonials
```

---

## 3. Shared Sitecore AI Base Template (`_SitecoreAI_Metadata`)

Every Organism and Datasource Item inherits `_SitecoreAI_Metadata` (`Section: Sitecore AI Configuration`, SortOrder `900`), giving content authors and Sitecore Stream / AI Copilot structured context for content generation, tone enforcement, and personalization:

| Field Name | Field Title | Sitecore Field Type | Default Value / Source | Sitecore AI Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `AIPromptContext` | AI Prompt Context | `Multi-Line Text` | `Health, nutrition, and holistic fitness coaching by FitLifeCoach.` | Component-level system prompt context passed to Sitecore AI when generating copy. |
| `AIToneOfVoice` | AI Tone of Voice | `Droplink` | `query:./ancestor-or-self::*[@@templatename='Site']/Data/AI Configuration/Tones` | Selects brand tone (`Motivational`, `Clinical`, `Empathetic`, `High-Energy`). |
| `AITargetAudience` | AI Target Audience Persona | `Single-Line Text` | `Health-conscious adults seeking sustainable fitness and nutrition coaching` | Guides AI copywriting and personalization toward a specific visitor segment. |
| `AIPersonalizationVariant` | AI Personalization Variant Key | `Single-Line Text` | `default` | Maps the datasource item to a Sitecore Personalize / AI audience variant. |
| `AIAutoSummary` | AI Auto-Summary / SEO Snippet | `Multi-Line Text` | *(Empty)* | AI-generated summary (max 160 chars) for GEO/SEO and screen-reader context. |
| `AIEnableAutoTranslation` | Enable AI Auto-Translation | `Checkbox` | `1` (Checked) | Allows Sitecore Stream AI to automatically localize this datasource across languages. |

---

## 4. How to Create Another Field Using Sitecore AI Information

When you want to add a new field to **any** organism template and enrich it with Sitecore AI generation metadata, use the `Add-SitecoreAIField` helper function in **Sitecore ISE (PowerShell Console)**.

### 4.1 Reusable SPE Pattern (`Add-SitecoreAIField`)

```powershell
# ============================================================================
# TEMPLATE: Add a new AI-enabled field to an existing Organism Template
# ============================================================================
$OrganismsRoot = "master:/sitecore/templates/Project/FitnessMaster/Organisms"

Add-SitecoreAIField `
    -TemplatePath "$OrganismsRoot/<OrganismTemplateName>" `
    -SectionName "<SectionName>" `
    -SectionSortOrder 100 `
    -FieldName "<FieldName>" `
    -FieldTitle "<HumanReadableTitle>" `
    -FieldType "<SitecoreFieldType>" `
    -Source "<OptionalDatasourceOrMediaPath>" `
    -SortOrder 800 `
    -AIPromptHint "<Prompt instructions telling Sitecore AI how to generate this field>" `
    -AIMaxLengthHint "<Character/word limit for AI output>" `
    -DefaultValue "<StandardValuesDefault>"
```

### 4.2 Concrete Examples

#### Example A: Adding an `AIGeneratedPromoBadge` field to `HomeHero`
```powershell
Add-SitecoreAIField `
    -TemplatePath "master:/sitecore/templates/Project/FitnessMaster/Organisms/HomeHero" `
    -SectionName "Hero Content" `
    -FieldName "AIGeneratedPromoBadge" `
    -FieldTitle "AI Promotional Badge Text" `
    -FieldType "Single-Line Text" `
    -SortOrder 700 `
    -AIPromptHint "Generate a high-converting seasonal fitness offer badge tailored to the visitor persona." `
    -AIMaxLengthHint "40 characters" `
    -DefaultValue "Free 7-Day Nutrition Assessment"
```

#### Example B: Adding an `AIKeyTakeaways` Rich Text field to `BlogPostItem`
```powershell
Add-SitecoreAIField `
    -TemplatePath "master:/sitecore/templates/Project/FitnessMaster/DatasourceItems/BlogPostItem" `
    -SectionName "Article Data" `
    -FieldName "AIKeyTakeaways" `
    -FieldTitle "AI Article Key Takeaways" `
    -FieldType "Rich Text" `
    -SortOrder 950 `
    -AIPromptHint "Summarize the article into 3 actionable nutrition or workout bullet points." `
    -AIMaxLengthHint "3 bullets, max 45 words total" `
    -DefaultValue "<ul><li>Stay hydrated daily</li><li>Prioritize whole foods</li><li>Train consistently</li></ul>"
```

#### Example C: Adding an `AINutritionGoalTag` Droplink field to `ServicesGrid`
```powershell
Add-SitecoreAIField `
    -TemplatePath "master:/sitecore/templates/Project/FitnessMaster/Organisms/ServicesGrid" `
    -SectionName "Services Catalog" `
    -FieldName "AINutritionGoalTag" `
    -FieldTitle "AI Recommended Fitness Goal Filter" `
    -FieldType "Droplink" `
    -Source "query:./ancestor-or-self::*[@@templatename='Site']/Data/Goals" `
    -SortOrder 200 `
    -AIPromptHint "Select the primary fitness goal category used by Sitecore AI to recommend services."
```

---

## 5. Complete Organism-to-Sitecore Template Mapping (All 19 Organisms)

| # | Next.js Organism Component | Sitecore Template Path | Insert Options (`__Masters`) | Component Fields (`Name : Type`) |
| :- | :--- | :--- | :--- | :--- |
| 1 | [`AboutSnippet.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/AboutSnippet.tsx) | `Organisms/AboutSnippet` | `FeatureHighlightItem` | `Subtitle` (Single-Line Text), `Title` (Single-Line Text), `PrimaryParagraph` (Rich Text), `SecondaryParagraph` (Rich Text), `FeatureHighlights` (Multilist), `ExperienceYears` (Single-Line Text), `ExperienceLabel` (Single-Line Text), `MainImage` (Image), `CtaLink` (General Link) |
| 2 | [`AppointmentForm.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/AppointmentForm.tsx) | `Organisms/AppointmentForm` | `ServiceItem` | `PanelTitle` (Single-Line Text), `PanelDescription` (Multi-Line Text), `Address` (Single-Line Text), `Phone` (Single-Line Text), `Email` (Single-Line Text), `FormSubtitle` (Single-Line Text), `FormTitle` (Single-Line Text), `ServiceOptions` (Multilist), `SubmitButtonText` (Single-Line Text), `SubmitEndpoint` (Single-Line Text) |
| 3 | [`BlogGrid.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/BlogGrid.tsx) | `Organisms/BlogGrid` | `BlogPostItem` | `Posts` (Multilist), `PageSize` (Integer), `TotalPages` (Integer) |
| 4 | [`CoachesSection.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/CoachesSection.tsx) | `Organisms/CoachesSection` | `CoachItem` | `Subtitle` (Single-Line Text), `Title` (Single-Line Text), `Coaches` (Multilist) |
| 5 | [`ContactForm.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ContactForm.tsx) | `Organisms/ContactForm` | *(None)* | `FormHeading` (Single-Line Text), `NameLabel` (Single-Line Text), `EmailLabel` (Single-Line Text), `PhoneLabel` (Single-Line Text), `SubjectLabel` (Single-Line Text), `MessageLabel` (Single-Line Text), `SubmitButtonText` (Single-Line Text), `SubmissionApiUrl` (Single-Line Text) |
| 6 | [`ContactInfoSection.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ContactInfoSection.tsx) | `Organisms/ContactInfoSection` | *(None)* | `Title` (Single-Line Text), `Description` (Multi-Line Text), `LocationTitle` (Single-Line Text), `AddressLines` (Multi-Line Text), `PhoneTitle` (Single-Line Text), `PhoneNumber` (Single-Line Text), `EmailTitle` (Single-Line Text), `EmailAddresses` (Multi-Line Text), `HoursTitle` (Single-Line Text), `OperatingHours` (Multi-Line Text) |
| 7 | [`ContactMap.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ContactMap.tsx) | `Organisms/ContactMap` | *(None)* | `MapEmbedUrl` (Single-Line Text), `MapTitle` (Single-Line Text) |
| 8 | [`Footer.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/Footer.tsx) | `Organisms/Footer` | `NavigationLinkItem` | `BrandPrefix`, `BrandHighlight`, `BrandSummary` (Multi-Line Text), `FacebookUrl`, `InstagramUrl`, `TwitterUrl`, `YoutubeUrl` (General Links), `QuickLinksHeading`, `QuickLinks` (Multilist), `ServicesHeading`, `ServiceLinks` (Multilist), `ContactHeading`, `Address`, `Email`, `Phone`, `CopyrightText` |
| 9 | [`GalleryGrid.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/GalleryGrid.tsx) | `Organisms/GalleryGrid` | `GalleryItem` | `FilterCategories` (Single-Line Text), `DefaultCategory` (Single-Line Text), `GalleryItems` (Multilist), `LoadMoreButtonText` (Single-Line Text) |
| 10 | [`HeroSection.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/HeroSection.tsx) | `Organisms/HeroSection` | *(None)* | `Title` (Single-Line Text), `PageName` (Single-Line Text), `BackgroundImage` (Image) |
| 11 | [`HomeHero.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/HomeHero.tsx) | `Organisms/HomeHero` | *(None)* | `EyebrowText` (Single-Line Text), `Headline` (Rich Text), `Description` (Multi-Line Text), `BackgroundImage` (Image), `PrimaryCta` (General Link), `SecondaryCta` (General Link), `AIGeneratedPromoBadge` (Single-Line Text) |
| 12 | [`Navbar.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/Navbar.tsx) | `Organisms/Navbar` | `NavigationLinkItem` | `BrandPrefix` (Single-Line Text), `BrandSuffix` (Single-Line Text), `NavigationLinks` (Multilist), `DesktopCtaLink` (General Link), `MobileCtaLink` (General Link) |
| 13 | [`Procedure.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/Procedure.tsx) | `Organisms/Procedure` | `ProcedureStepItem` | `Subtitle` (Single-Line Text), `Title` (Single-Line Text), `Steps` (Multilist) |
| 14 | [`ProductCatalog.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ProductCatalog.tsx) | `Organisms/ProductCatalog` | `ProductItem` | `Products` (Multilist), `TotalResults` (Integer), `ShownCount` (Integer), `TotalPages` (Integer) |
| 15 | [`ProductSidebar.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ProductSidebar.tsx) | `Organisms/ProductSidebar` | `ProductCategoryItem` | `SearchHeading` (Single-Line Text), `SearchPlaceholder` (Single-Line Text), `Categories` (Multilist), `EnablePriceFilter` (Checkbox) |
| 16 | [`ServicesGrid.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ServicesGrid.tsx) | `Organisms/ServicesGrid` | `ServiceItem` | `Services` (Multilist) |
| 17 | [`ServicesPreview.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/ServicesPreview.tsx) | `Organisms/ServicesPreview` | `ServiceItem` | `Subtitle` (Single-Line Text), `Title` (Single-Line Text), `FeaturedServices` (Multilist) |
| 18 | [`StatsSection.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/StatsSection.tsx) | `Organisms/StatsSection` | `StatItem` | `BackgroundImage` (Image), `Stats` (Multilist) |
| 19 | [`Testimonials.tsx`](file:///c:/Users/MohamedZajith/projects/fitness-master/src/components/organisms/Testimonials.tsx) | `Organisms/Testimonials` | `TestimonialItem` | `Subtitle` (Single-Line Text), `Title` (Single-Line Text), `TestimonialsList` (Multilist) |

---

## 6. How to Execute in Sitecore

1. Log in to **Sitecore Desktop** → **Development Tools** → **PowerShell ISE**.
2. Open or paste [`planning/Create-SitecoreAITemplates.ps1`](file:///c:/Users/MohamedZajith/projects/fitness-master/planning/Create-SitecoreAITemplates.ps1).
3. Ensure the context database is set to `master`.
4. Click **Execute**. The script runs inside a `Sitecore.Data.BulkUpdateContext` for fast execution and is **idempotent** (safe to re-run whenever you add new fields).
