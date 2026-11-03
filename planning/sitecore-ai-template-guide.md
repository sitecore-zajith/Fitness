# Sitecore AI (XM Cloud / Headless JSS) Template & Multi-Field Base Inheritance Guide

## 1. Base Template Design Rule (Minimum 2 Fields)

- **Strict Rule (`$MinBaseTemplateFields = 2`):** A Base Template under `/sitecore/templates/Project/Corporate/FitnessMaster/Base` is created **only when 2 or more common fields** are shared across templates.
- **No Single-Field Base Templates:** If a template only shares a single field (for example, `FeatureHighlightItem` only having `Title`, or `StatsSection` only having `BackgroundImage`), no 1-field base template is created—the field is defined directly on that template.
- **Runtime Enforcement:** [`plan/Create-SitecoreAITemplates.ps1`](file:///c:/Users/MohamedZajith/projects/fitness-master/plan/Create-SitecoreAITemplates.ps1#L334-L337) checks `$baseDef.Fields.Count -lt $MinBaseTemplateFields` before creating any base template.

---

## 2. Multi-Field Base Templates (`Base/*`)

| Base Template (`Base/*`) | Field Count | Common Variables (Fields) | Inherited By (`DatasourceItems/*`) | Inherited By (`Organisms/*`) |
| :--- | :---: | :--- | :--- | :--- |
| **`_BaseSectionHeading`** | **2** | `Subtitle` (`Single-Line Text`)<br>`Title` (`Single-Line Text`) | *(None)* | `AboutSnippet`, `AppointmentForm`, `CoachesSection`, `HomeHero`, `Procedure`, `ServicesPreview`, `Testimonials` |
| **`_BaseContentBlock`** | **2** | `Title` (`Single-Line Text`)<br>`Description` (`Multi-Line Text`) | `BlogPostItem`, `ProcedureStepItem`, `ServiceItem`, `TestimonialItem` | `ContactInfoSection` |
| **`_BaseMediaItem`** | **2** | `Title` (`Single-Line Text`)<br>`Image` (`Image`) | `CoachItem`, `GalleryItem`, `ProductItem` | `HeroSection` |
| **`_BaseMediaCta`** | **2** | `Image` (`Image`)<br>`CtaLink` (`General Link`) | `BlogPostItem`, `ServiceItem` | `AboutSnippet`, `HomeHero` |
| **`_BaseContactInfo`** | **3** | `Address` (`Single-Line Text`)<br>`Phone` (`Single-Line Text`)<br>`Email` (`Single-Line Text`) | *(None)* | `AppointmentForm`, `ContactInfoSection`, `Footer` |
| **`_BaseSocialLinks`** | **4** | `FacebookLink`, `TwitterLink`, `InstagramLink`, `YoutubeLink` (`General Link`) | `CoachItem` | `Footer` |
| **`_BaseBrandIdentity`** | **2** | `BrandPrefix` (`Single-Line Text`)<br>`BrandSuffix` (`Single-Line Text`) | *(None)* | `Navbar`, `Footer` |
| **`_BasePagination`** | **3** | `PageSize` (`Integer`)<br>`TotalPages` (`Integer`)<br>`TotalResults` (`Integer`) | *(None)* | `BlogGrid`, `ProductCatalog` |

---

## 3. Complete Inheritance Mapping

### 3.1 Child Datasource Item Templates (`DatasourceItems/*`)

| Datasource Template | Inherited Base Templates (`>= 2` Fields Each) | Template-Specific Own Fields |
| :--- | :--- | :--- |
| `FeatureHighlightItem` | *(None — only 1 field)* | `Title` (Single-Line Text) |
| `BlogPostItem` | `_BaseContentBlock` (2), `_BaseMediaCta` (2) | `PublishDate` (Date), `DisplayDay`, `DisplayMonth`, `Author`, `CommentCount` (Integer) |
| `CoachItem` | `_BaseMediaItem` (2), `_BaseSocialLinks` (4) | `Role` (Single-Line Text) |
| `GalleryItem` | `_BaseMediaItem` (2) | `Category` (Single-Line Text) |
| `NavigationLinkItem` | *(None — specific nav fields)* | `LinkTitle` (Single-Line Text), `TargetLink` (General Link) |
| `ProcedureStepItem` | `_BaseContentBlock` (2) | `StepNumber` (Single-Line Text) |
| `ProductItem` | `_BaseMediaItem` (2) | `Price`, `Category`, `Badge` (Single-Line Text), `ProductLink` (General Link) |
| `ProductCategoryItem` | *(None — only 1 text field)* | `CategoryName` (Single-Line Text), `ItemCount` (Integer) |
| `ServiceItem` | `_BaseContentBlock` (2), `_BaseMediaCta` (2) | `IconName` (Single-Line Text) |
| `StatItem` | *(None — specific metric fields)* | `Value` (Single-Line Text), `Label` (Single-Line Text) |
| `TestimonialItem` | `_BaseContentBlock` (2) | `ClientRole` (Single-Line Text), `Rating` (Integer), `AvatarImage` (Image) |

### 3.2 Organism Component Templates (`Organisms/*`)

| # | Organism Template | Inherited Base Templates (`>= 2` Fields Each) | Organism-Specific Own Fields | Insert Options (`__Masters`) |
| :- | :--- | :--- | :--- | :--- |
| 1 | `AboutSnippet` | `_BaseSectionHeading` (2), `_BaseMediaCta` (2) | `PrimaryParagraph` (Rich Text), `SecondaryParagraph` (Rich Text), `FeatureHighlights` (Multilist), `ExperienceYears`, `ExperienceLabel` | `FeatureHighlightItem` |
| 2 | `AppointmentForm` | `_BaseSectionHeading` (2), `_BaseContactInfo` (3) | `PanelTitle`, `PanelDescription`, `ServiceOptions` (Multilist), `SubmitButtonText`, `SubmitEndpoint` | `ServiceItem` |
| 3 | `BlogGrid` | `_BasePagination` (3) | `Posts` (Multilist) | `BlogPostItem` |
| 4 | `CoachesSection` | `_BaseSectionHeading` (2) | `Coaches` (Multilist) | `CoachItem` |
| 5 | `ContactForm` | *(None — only 1 heading field)* | `FormHeading`, `NameLabel`, `EmailLabel`, `PhoneLabel`, `SubjectLabel`, `MessageLabel`, `SubmitButtonText`, `SubmissionApiUrl` | *(None)* |
| 6 | `ContactInfoSection` | `_BaseContentBlock` (2), `_BaseContactInfo` (3) | `LocationTitle`, `PhoneTitle`, `EmailTitle`, `HoursTitle`, `OperatingHours` (Multi-Line Text) | *(None)* |
| 7 | `ContactMap` | *(None — map-specific fields)* | `MapTitle`, `MapEmbedUrl` (Single-Line Text) | *(None)* |
| 8 | `Footer` | `_BaseBrandIdentity` (2), `_BaseSocialLinks` (4), `_BaseContactInfo` (3) | `BrandSummary`, `QuickLinksHeading`, `QuickLinks` (Multilist), `ServicesHeading`, `ServiceLinks` (Multilist), `ContactHeading`, `CopyrightText` | `NavigationLinkItem` |
| 9 | `GalleryGrid` | *(None — gallery-specific fields)* | `FilterCategories`, `DefaultCategory`, `GalleryItems` (Multilist), `LoadMoreButtonText` | `GalleryItem` |
| 10 | `HeroSection` | `_BaseMediaItem` (2) | `PageName` (Single-Line Text) | *(None)* |
| 11 | `HomeHero` | `_BaseSectionHeading` (2), `_BaseMediaCta` (2) | `Description` (Multi-Line Text), `SecondaryCta` (General Link), `AIGeneratedPromoBadge` | *(None)* |
| 12 | `Navbar` | `_BaseBrandIdentity` (2) | `NavigationLinks` (Multilist), `DesktopCtaLink` (General Link), `MobileCtaLink` (General Link) | `NavigationLinkItem` |
| 13 | `Procedure` | `_BaseSectionHeading` (2) | `Steps` (Multilist) | `ProcedureStepItem` |
| 14 | `ProductCatalog` | `_BasePagination` (3) | `Products` (Multilist) | `ProductItem` |
| 15 | `ProductSidebar` | *(None — sidebar-specific fields)* | `SearchHeading`, `SearchPlaceholder`, `Categories` (Multilist), `EnablePriceFilter` (Checkbox) | `ProductCategoryItem` |
| 16 | `ServicesGrid` | *(None — single Multilist field)* | `Services` (Multilist) | `ServiceItem` |
| 17 | `ServicesPreview` | `_BaseSectionHeading` (2) | `FeaturedServices` (Multilist) | `ServiceItem` |
| 18 | `StatsSection` | *(None — only 1 image field)* | `BackgroundImage` (Image), `Stats` (Multilist) | `StatItem` |
| 19 | `Testimonials` | `_BaseSectionHeading` (2) | `TestimonialsList` (Multilist) | `TestimonialItem` |
