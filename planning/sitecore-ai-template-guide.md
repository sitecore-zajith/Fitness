# Sitecore AI (XM Cloud / Headless JSS) Template & Base Inheritance Guide

## 1. Why `_SitecoreAI_Metadata` is NOT Mandatory

In **Sitecore XM Cloud / Sitecore AI (Sitecore Stream)**:
- **Native AI Support on Standard Fields:** Sitecore AI Copilot automatically works on any `Single-Line Text`, `Multi-Line Text`, and `Rich Text` field in Pages and Content Editor without needing custom AI fields on the item.
- **Field-Level Metadata (`__Short description` & `__Long description`):** The [`Add-SitecoreAIField`](file:///c:/Users/MohamedZajith/projects/fitness-master/plan/Create-SitecoreAITemplates.ps1#L94-L163) helper stores AI generation instructions directly on the Template Field item's description properties.
- **Optional Toggle:** In [`plan/Create-SitecoreAITemplates.ps1`](file:///c:/Users/MohamedZajith/projects/fitness-master/plan/Create-SitecoreAITemplates.ps1#L40), `$IncludeSitecoreAIBase = $false` is disabled by default so your items are not cluttered with extra metadata fields.

---

## 2. Common Variable Inheritance Architecture (`Base/*`)

Instead of duplicating common variables (`Title`, `Subtitle`, `Description`, `Image`, `CtaLink`, `Address`, `Phone`, `Email`, Social Links, Brand Identity, Pagination) across Organism and Datasource templates, the script extracts **9 modular Base Templates** under `/sitecore/templates/Project/Corporate/FitnessMaster/Base` and assigns them via `__Base template` inheritance only where needed:

| Base Template (`Base/*`) | Common Variables (Fields) | Inherited By (`DatasourceItems/*`) | Inherited By (`Organisms/*`) |
| :--- | :--- | :--- | :--- |
| **`_BaseTitle`** | `Title` (`Single-Line Text`) | `FeatureHighlightItem`, `BlogPostItem`, `CoachItem`, `GalleryItem`, `NavigationLinkItem`, `ProcedureStepItem`, `ProductItem`, `ProductCategoryItem`, `ServiceItem`, `StatItem`, `TestimonialItem` | `ContactForm`, `ContactInfoSection`, `ContactMap`, `HeroSection`, `ProductSidebar`, plus all `_BaseSectionHeading` consumers |
| **`_BaseSectionHeading`** *(inherits `_BaseTitle`)* | `Subtitle` (`Single-Line Text`) + `Title` | *(None)* | `AboutSnippet`, `AppointmentForm`, `CoachesSection`, `HomeHero`, `Procedure`, `ServicesPreview`, `Testimonials` |
| **`_BaseDescription`** | `Description` (`Multi-Line Text`) | `BlogPostItem`, `ProcedureStepItem`, `ServiceItem`, `TestimonialItem` | `AppointmentForm`, `ContactInfoSection`, `Footer`, `HomeHero` |
| **`_BaseMedia`** | `Image` (`Image`) | `BlogPostItem`, `CoachItem`, `GalleryItem`, `ProductItem`, `ServiceItem`, `TestimonialItem` | `AboutSnippet`, `HeroSection`, `HomeHero`, `StatsSection` |
| **`_BaseCta`** | `CtaLink` (`General Link`) | `BlogPostItem`, `NavigationLinkItem`, `ProductItem`, `ServiceItem` | `AboutSnippet`, `HomeHero`, `Navbar` |
| **`_BaseContactInfo`** | `Address`, `Phone`, `Email` (`Single-Line Text`) | *(None)* | `AppointmentForm`, `ContactInfoSection`, `Footer` |
| **`_BaseSocialLinks`** | `FacebookLink`, `TwitterLink`, `InstagramLink`, `YoutubeLink` (`General Link`) | `CoachItem` | `Footer` |
| **`_BaseBrandIdentity`** | `BrandPrefix`, `BrandSuffix` (`Single-Line Text`) | *(None)* | `Navbar`, `Footer` |
| **`_BasePagination`** | `PageSize`, `TotalPages`, `TotalResults` (`Integer`) | *(None)* | `BlogGrid`, `ProductCatalog` |

---

## 3. Complete Inheritance Mapping

### 3.1 Child Datasource Item Templates (`DatasourceItems/*`)

| Datasource Template | Inherited Base Templates (`__Base template`) | Template-Specific Own Fields |
| :--- | :--- | :--- |
| `FeatureHighlightItem` | `_BaseTitle` | *(Uses inherited `Title`)* |
| `BlogPostItem` | `_BaseTitle`, `_BaseDescription`, `_BaseMedia`, `_BaseCta` | `PublishDate` (Date), `DisplayDay`, `DisplayMonth`, `Author`, `CommentCount` (Integer) |
| `CoachItem` | `_BaseTitle`, `_BaseMedia`, `_BaseSocialLinks` | `Role` (Single-Line Text) |
| `GalleryItem` | `_BaseTitle`, `_BaseMedia` | `Category` (Single-Line Text) |
| `NavigationLinkItem` | `_BaseTitle`, `_BaseCta` | *(Uses inherited `Title` & `CtaLink`)* |
| `ProcedureStepItem` | `_BaseTitle`, `_BaseDescription` | `StepNumber` (Single-Line Text) |
| `ProductItem` | `_BaseTitle`, `_BaseMedia`, `_BaseCta` | `Price`, `Category`, `Badge` (Single-Line Text) |
| `ProductCategoryItem` | `_BaseTitle` | `ItemCount` (Integer) |
| `ServiceItem` | `_BaseTitle`, `_BaseDescription`, `_BaseMedia`, `_BaseCta` | `IconName` (Single-Line Text) |
| `StatItem` | `_BaseTitle` | `Value` (Single-Line Text) |
| `TestimonialItem` | `_BaseTitle`, `_BaseDescription`, `_BaseMedia` | `ClientRole` (Single-Line Text), `Rating` (Integer) |

### 3.2 Organism Component Templates (`Organisms/*`)

| # | Organism Template | Inherited Base Templates (`__Base template`) | Organism-Specific Own Fields | Insert Options (`__Masters`) |
| :- | :--- | :--- | :--- | :--- |
| 1 | `AboutSnippet` | `_BaseSectionHeading`, `_BaseMedia`, `_BaseCta` | `PrimaryParagraph` (Rich Text), `SecondaryParagraph` (Rich Text), `FeatureHighlights` (Multilist), `ExperienceYears`, `ExperienceLabel` | `FeatureHighlightItem` |
| 2 | `AppointmentForm` | `_BaseSectionHeading`, `_BaseDescription`, `_BaseContactInfo` | `PanelTitle`, `ServiceOptions` (Multilist), `SubmitButtonText`, `SubmitEndpoint` | `ServiceItem` |
| 3 | `BlogGrid` | `_BasePagination` | `Posts` (Multilist) | `BlogPostItem` |
| 4 | `CoachesSection` | `_BaseSectionHeading` | `Coaches` (Multilist) | `CoachItem` |
| 5 | `ContactForm` | `_BaseTitle` | `NameLabel`, `EmailLabel`, `PhoneLabel`, `SubjectLabel`, `MessageLabel`, `SubmitButtonText`, `SubmissionApiUrl` | *(None)* |
| 6 | `ContactInfoSection` | `_BaseTitle`, `_BaseDescription`, `_BaseContactInfo` | `LocationTitle`, `PhoneTitle`, `EmailTitle`, `HoursTitle`, `OperatingHours` (Multi-Line Text) | *(None)* |
| 7 | `ContactMap` | `_BaseTitle` | `MapEmbedUrl` (Single-Line Text) | *(None)* |
| 8 | `Footer` | `_BaseBrandIdentity`, `_BaseDescription`, `_BaseSocialLinks`, `_BaseContactInfo` | `QuickLinksHeading`, `QuickLinks` (Multilist), `ServicesHeading`, `ServiceLinks` (Multilist), `ContactHeading`, `CopyrightText` | `NavigationLinkItem` |
| 9 | `GalleryGrid` | *(Standard Template)* | `FilterCategories`, `DefaultCategory`, `GalleryItems` (Multilist), `LoadMoreButtonText` | `GalleryItem` |
| 10 | `HeroSection` | `_BaseTitle`, `_BaseMedia` | `PageName` (Single-Line Text) | *(None)* |
| 11 | `HomeHero` | `_BaseSectionHeading`, `_BaseDescription`, `_BaseMedia`, `_BaseCta` | `SecondaryCta` (General Link), `AIGeneratedPromoBadge` | *(None)* |
| 12 | `Navbar` | `_BaseBrandIdentity`, `_BaseCta` | `NavigationLinks` (Multilist), `MobileCtaLink` (General Link) | `NavigationLinkItem` |
| 13 | `Procedure` | `_BaseSectionHeading` | `Steps` (Multilist) | `ProcedureStepItem` |
| 14 | `ProductCatalog` | `_BasePagination` | `Products` (Multilist) | `ProductItem` |
| 15 | `ProductSidebar` | `_BaseTitle` | `SearchPlaceholder`, `Categories` (Multilist), `EnablePriceFilter` (Checkbox) | `ProductCategoryItem` |
| 16 | `ServicesGrid` | *(Standard Template)* | `Services` (Multilist) | `ServiceItem` |
| 17 | `ServicesPreview` | `_BaseSectionHeading` | `FeaturedServices` (Multilist) | `ServiceItem` |
| 18 | `StatsSection` | `_BaseMedia` | `Stats` (Multilist) | `StatItem` |
| 19 | `Testimonials` | `_BaseSectionHeading` | `TestimonialsList` (Multilist) | `TestimonialItem` |

---

## 4. How to Add Another Field Using Sitecore AI Information

Use [`Add-SitecoreAIField`](file:///c:/Users/MohamedZajith/projects/fitness-master/plan/Create-SitecoreAITemplates.ps1#L94-L163) to add a field either to a **shared Base Template** (so all inheriting Organisms/Datasources receive it automatically) or to a **single Organism Template**:

```powershell
# Option 1: Add a shared field to a Base Template (inherited everywhere _BaseSectionHeading is used)
Add-SitecoreAIField `
    -TemplatePath "master:/sitecore/templates/Project/Corporate/FitnessMaster/Base/_BaseSectionHeading" `
    -SectionName "Common Heading" `
    -FieldName "HeadingAlignment" `
    -FieldTitle "Heading Alignment" `
    -FieldType "Single-Line Text" `
    -SortOrder 300 `
    -AIPromptHint "Alignment token for section header (left, center)." `
    -DefaultValue "center"

# Option 2: Add a field to a specific Organism Template
Add-SitecoreAIField `
    -TemplatePath "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms/HomeHero" `
    -SectionName "Hero Content" `
    -FieldName "AIGeneratedPromoBadge" `
    -FieldTitle "AI Promotional Badge Text" `
    -FieldType "Single-Line Text" `
    -SortOrder 700 `
    -AIPromptHint "Generate a high-converting seasonal fitness offer badge tailored to the visitor persona." `
    -AIMaxLengthHint "40 characters" `
    -DefaultValue "Free 7-Day Nutrition Assessment"
```
