<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - FitnessMaster Project Templates & Sitecore AI Fields
.DESCRIPTION
    Provisions the Project-layer template hierarchy under:
      master:/sitecore/templates/Project/FitnessMaster
    Includes:
      1. Base/_SitecoreAI_Metadata       - Shared Sitecore AI / Stream Copilot base template
      2. DatasourceItems/*               - 10 Child item templates for multi-item organisms
      3. Organisms/*                     - All 19 Organism component templates + __Standard Values
      4. Add-SitecoreAIField             - Reusable helper to add new fields with Sitecore AI metadata
.NOTES
    Target Environment : Sitecore XM Cloud / Sitecore XP with SPE (Execute in Sitecore ISE)
    Encoding           : ASCII-safe
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# 1. SITECORE SYSTEM TEMPLATE CONSTANTS
# ============================================================================
$TemplateFolderId   = "{0437FEE2-44C9-46A6-ABE9-28858D9FEE8C}"
$TemplateItemId     = "{AB86861A-6030-46C5-B394-E8F99E8B87DB}"
$TemplateSectionId  = "{E269FBB5-3750-427A-9149-7AA950B49301}"
$TemplateFieldId    = "{455A3E98-A627-4B40-8035-E683A0331AC7}"
$StandardTemplateId = "{1930BBEB-7805-471A-A3BE-4858AC7CF696}"

$ProjectRootPath    = "master:/sitecore/templates/Project/Corporate"
$TenantName         = "FitnessMaster"
$TenantRootPath     = "$ProjectRootPath/$TenantName"
$BaseFolderPath     = "$TenantRootPath/Base"
$DatasourcePath     = "$TenantRootPath/DatasourceItems"
$OrganismsPath      = "$TenantRootPath/Organisms"

$DataRootQuery      = "query:./ancestor-or-self::*[@@templatename='Site']/Data"

# ============================================================================
# 2. CORE SPE HELPER FUNCTIONS
# ============================================================================

function Ensure-TemplateFolder {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$FolderName
    )

    $fullPath = "$ParentPath/$FolderName"
    if (Test-Path -Path $fullPath) {
        Write-Host "[i] Folder exists: $fullPath" -ForegroundColor Gray
        return Get-Item -Path $fullPath
    }

    Write-Host "[+] Creating Template Folder: $fullPath" -ForegroundColor Cyan
    $folder = New-Item -Path $ParentPath -Name $FolderName -ItemType $TemplateFolderId
    return $folder
}

function Ensure-TemplateSection {
    param(
        [Parameter(Mandatory = $true)][string]$TemplatePath,
        [Parameter(Mandatory = $true)][string]$SectionName,
        [int]$SortOrder = 100
    )

    $sectionPath = "$TemplatePath/$SectionName"
    if (Test-Path -Path $sectionPath) {
        $sectionItem = Get-Item -Path $sectionPath
    }
    else {
        $sectionItem = New-Item -Path $TemplatePath -Name $SectionName -ItemType $TemplateSectionId
    }

    $sectionItem.Editing.BeginEdit() | Out-Null
    $sectionItem["__Sortorder"] = $SortOrder.ToString()
    $sectionItem.Editing.EndEdit() | Out-Null

    return $sectionItem
}

<#
.SYNOPSIS
    Reusable function to create or update a Sitecore Template Field enriched with Sitecore AI metadata.
.DESCRIPTION
    Creates the field under the specified section, assigns Field Type, Data Source, SortOrder,
    and writes Sitecore AI prompt instructions into __Short description (tooltip) and
    __Long description (AI Copilot / Sitecore Stream context). Optionally sets __Standard Values.
#>
function Add-SitecoreAIField {
    param(
        [Parameter(Mandatory = $true)][string]$TemplatePath,
        [Parameter(Mandatory = $true)][string]$SectionName,
        [Parameter(Mandatory = $true)][string]$FieldName,
        [Parameter(Mandatory = $true)][string]$FieldType,
        [string]$FieldTitle = "",
        [string]$Source = "",
        [int]$SortOrder = 100,
        [int]$SectionSortOrder = 100,
        [string]$AIPromptHint = "",
        [string]$AIMaxLengthHint = "",
        [string]$DefaultValue = "",
        [bool]$IsShared = $false,
        [bool]$IsUnversioned = $false
    )

    $sectionItem = Ensure-TemplateSection -TemplatePath $TemplatePath -SectionName $SectionName -SortOrder $SectionSortOrder
    $sectionPath = $sectionItem.Paths.FullPath
    $fieldPath   = "master:$sectionPath/$FieldName"

    if (Test-Path -Path $fieldPath) {
        $fieldItem = Get-Item -Path $fieldPath
        Write-Host "    [i] Updating field: $FieldName ($FieldType)" -ForegroundColor DarkGray
    }
    else {
        $fieldItem = New-Item -Path "master:$sectionPath" -Name $FieldName -ItemType $TemplateFieldId
        Write-Host "    [+] Created field: $FieldName ($FieldType)" -ForegroundColor Green
    }

    # Build Sitecore AI Copilot instruction metadata
    $aiMetadataText = $AIPromptHint
    if (($AIMaxLengthHint) -and ($AIMaxLengthHint.Length -gt 0)) {
        $aiMetadataText = "$AIPromptHint [AI Length Guideline: $AIMaxLengthHint]"
    }

    $effectiveTitle = $FieldTitle
    if (-not $effectiveTitle) {
        $effectiveTitle = $FieldName
    }

    $fieldItem.Editing.BeginEdit() | Out-Null
    $fieldItem["Type"]                = $FieldType
    $fieldItem["Title"]               = $effectiveTitle
    $fieldItem["Source"]              = $Source
    $fieldItem["__Sortorder"]         = $SortOrder.ToString()
    $fieldItem["__Short description"] = $aiMetadataText
    $fieldItem["__Long description"]  = "Sitecore AI Generation Rule: $aiMetadataText"
    $fieldItem["Shared"]              = $(if ($IsShared) { "1" } else { "0" })
    $fieldItem["Unversioned"]         = $(if ($IsUnversioned) { "1" } else { "0" })
    $fieldItem.Editing.EndEdit() | Out-Null

    # Populate __Standard Values if DefaultValue is provided
    $stdValuesPath = "$TemplatePath/__Standard Values"
    if (($DefaultValue) -and (Test-Path -Path $stdValuesPath)) {
        $fieldItem.Database.Engines.TemplateEngine.Reset()
        $stdValuesItem = Get-Item -Path $stdValuesPath
        $stdValuesItem.Editing.BeginEdit() | Out-Null
        $stdValuesItem[$FieldName] = $DefaultValue
        $stdValuesItem.Editing.EndEdit() | Out-Null
    }

    return $fieldItem
}

function Ensure-SitecoreTemplate {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$TemplateName,
        [string]$Icon = "Office/32x32/window_dialog.png",
        [string[]]$BaseTemplateIds = @(),
        [string[]]$InsertOptionIds = @()
    )

    $templatePath = "$ParentPath/$TemplateName"
    if (Test-Path -Path $templatePath) {
        $templateItem = Get-Item -Path $templatePath
        Write-Host "[i] Template exists: $templatePath" -ForegroundColor Yellow
    }
    else {
        $templateItem = New-Item -Path $ParentPath -Name $TemplateName -ItemType $TemplateItemId
        Write-Host "[+] Created Template: $templatePath" -ForegroundColor Green
    }

    # Combine Standard Template + custom Base Templates
    $allBaseIds = @($StandardTemplateId)
    foreach ($id in $BaseTemplateIds) {
        if (($id) -and ($allBaseIds -notcontains $id)) {
            $allBaseIds += $id
        }
    }

    $templateItem.Editing.BeginEdit() | Out-Null
    $templateItem["__Icon"]          = $Icon
    $templateItem["__Base template"] = ($allBaseIds -join "|")
    $templateItem.Editing.EndEdit() | Out-Null

    # Ensure __Standard Values item
    $stdValuesPath = "$templatePath/__Standard Values"
    if (-not (Test-Path -Path $stdValuesPath)) {
        $templateItem.Database.Engines.TemplateEngine.Reset()
        $stdValuesItem = New-Item -Path $templatePath -Name "__Standard Values" -ItemType $templateItem.ID.ToString()
    }
    else {
        $stdValuesItem = Get-Item -Path $stdValuesPath
    }

    $stdValuesItem.Editing.BeginEdit() | Out-Null
    $stdValuesItem["__Icon"] = $Icon
    if (($InsertOptionIds) -and ($InsertOptionIds.Count -gt 0)) {
        $stdValuesItem["__Masters"] = ($InsertOptionIds -join "|")
    }
    $stdValuesItem.Editing.EndEdit() | Out-Null

    $templateItem.Editing.BeginEdit() | Out-Null
    $templateItem["__Standard values"] = $stdValuesItem.ID.ToString()
    $templateItem.Editing.EndEdit() | Out-Null

    return $templateItem
}

# ============================================================================
# 3. INITIALIZE PROJECT FOLDER HIERARCHY
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Starting Sitecore AI Template Provisioning for $TenantName" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    New-UsingBlock (New-Object Sitecore.Data.BulkUpdateContext) {

        if (-not (Test-Path -Path $ProjectRootPath)) {
            $parentOfRoot = Split-Path -Path $ProjectRootPath -Parent
            $rootLeaf     = Split-Path -Path $ProjectRootPath -Leaf
            Ensure-TemplateFolder -ParentPath $parentOfRoot -FolderName $rootLeaf | Out-Null
        }

        Ensure-TemplateFolder -ParentPath $ProjectRootPath -FolderName $TenantName | Out-Null
        Ensure-TemplateFolder -ParentPath $TenantRootPath  -FolderName "Base" | Out-Null
        Ensure-TemplateFolder -ParentPath $TenantRootPath  -FolderName "DatasourceItems" | Out-Null
        Ensure-TemplateFolder -ParentPath $TenantRootPath  -FolderName "Organisms" | Out-Null

        # ====================================================================
        # 4. CREATE SHARED SITECORE AI BASE TEMPLATE (_SitecoreAI_Metadata)
        # ====================================================================
        $aiBaseTemplate = Ensure-SitecoreTemplate `
            -ParentPath $BaseFolderPath `
            -TemplateName "_SitecoreAI_Metadata" `
            -Icon "Office/32x32/brain.png"

        $aiBasePath = "master:$($aiBaseTemplate.Paths.FullPath)"
        $aiBaseId   = $aiBaseTemplate.ID.ToString()

        $aiBaseFields = @(
            @{
                Name = "AIPromptContext"; Title = "AI Prompt Context"; Type = "Multi-Line Text"; Sort = 100;
                Hint = "Provides component-specific business context to Sitecore AI / Stream when generating or rewriting copy.";
                Default = "Health, nutrition, and holistic fitness coaching by FitLifeCoach."
            },
            @{
                Name = "AIToneOfVoice"; Title = "AI Tone of Voice"; Type = "Droplink"; Sort = 200;
                Source = "$DataRootQuery/AI Configuration/Tones";
                Hint = "Selects the brand voice (Motivational, Clinical, Empathetic, High-Energy) for AI content generation.";
                Default = ""
            },
            @{
                Name = "AITargetAudience"; Title = "AI Target Audience Persona"; Type = "Single-Line Text"; Sort = 300;
                Hint = "Defines the primary audience segment (e.g., Busy Professionals, Athletes, Weight-Loss Beginners) for AI personalization.";
                Default = "Health-conscious adults seeking sustainable fitness and nutrition coaching"
            },
            @{
                Name = "AIPersonalizationVariant"; Title = "AI Personalization Variant Key"; Type = "Single-Line Text"; Sort = 400;
                Hint = "Identifier used by Sitecore Personalize / AI to match dynamic component variants.";
                Default = "default"
            },
            @{
                Name = "AIAutoSummary"; Title = "AI Auto-Summary / SEO Snippet"; Type = "Multi-Line Text"; Sort = 500;
                Hint = "Auto-generated summary of the component used for GEO/SEO indexing and accessibility context.";
                MaxLen = "160 characters"; Default = ""
            },
            @{
                Name = "AIEnableAutoTranslation"; Title = "Enable AI Auto-Translation"; Type = "Checkbox"; Sort = 600;
                Hint = "When checked, Sitecore Stream AI is permitted to automatically localize this component across target languages.";
                Default = "1"
            }
        )

        foreach ($f in $aiBaseFields) {
            $maxLen = $(if ($f.ContainsKey("MaxLen")) { $f.MaxLen } else { "" })
            $source = $(if ($f.ContainsKey("Source")) { $f.Source } else { "" })
            Add-SitecoreAIField `
                -TemplatePath $aiBasePath `
                -SectionName "Sitecore AI Configuration" `
                -SectionSortOrder 900 `
                -FieldName $f.Name `
                -FieldTitle $f.Title `
                -FieldType $f.Type `
                -Source $source `
                -SortOrder $f.Sort `
                -AIPromptHint $f.Hint `
                -AIMaxLengthHint $maxLen `
                -DefaultValue $f.Default | Out-Null
        }

        # ====================================================================
        # 5. CREATE CHILD DATASOURCE ITEM TEMPLATES (DatasourceItems/*)
        # ====================================================================
        $childDefinitions = @(
            @{
                Name = "FeatureHighlightItem"; Icon = "Office/32x32/check.png"; Section = "Highlight Data";
                Fields = @(
                    @{ Name = "Title"; Type = "Single-Line Text"; Hint = "Short bullet highlight for AboutSnippet (e.g., Personalized Nutrition Plans)."; MaxLen = "50 chars" }
                )
            },
            @{
                Name = "BlogPostItem"; Icon = "Office/32x32/document_text.png"; Section = "Article Data";
                Fields = @(
                    @{ Name = "Title"; Type = "Single-Line Text"; Hint = "Compelling fitness or nutrition article headline."; MaxLen = "70 chars" },
                    @{ Name = "Excerpt"; Type = "Multi-Line Text"; Hint = "AI-generated 2-sentence teaser summarizing the blog post."; MaxLen = "180 chars" },
                    @{ Name = "PublishDate"; Type = "Date"; Hint = "Publication date of the blog post." },
                    @{ Name = "DisplayDay"; Type = "Single-Line Text"; Hint = "2-digit day badge shown on card (e.g., 14)." },
                    @{ Name = "DisplayMonth"; Type = "Single-Line Text"; Hint = "3-letter month badge shown on card (e.g., OCT)." },
                    @{ Name = "Author"; Type = "Single-Line Text"; Hint = "Author or coach name." },
                    @{ Name = "CommentCount"; Type = "Integer"; Hint = "Number of reader comments."; Default = "0" },
                    @{ Name = "Image"; Type = "Image"; Source = ""; Hint = "Featured article thumbnail image." },
                    @{ Name = "ArticleLink"; Type = "General Link"; Hint = "Link to full blog article page." }
                )
            },
            @{
                Name = "CoachItem"; Icon = "Office/32x32/user.png"; Section = "Coach Profile";
                Fields = @(
                    @{ Name = "CoachName"; Type = "Single-Line Text"; Hint = "Full name of the fitness coach." },
                    @{ Name = "Role"; Type = "Single-Line Text"; Hint = "Coach specialization title (e.g., Senior Nutritionist, Strength Coach)."; MaxLen = "45 chars" },
                    @{ Name = "PortraitImage"; Type = "Image"; Source = ""; Hint = "High-resolution portrait of the coach." },
                    @{ Name = "TwitterLink"; Type = "General Link"; Hint = "Coach Twitter/X profile URL." },
                    @{ Name = "FacebookLink"; Type = "General Link"; Hint = "Coach Facebook profile URL." },
                    @{ Name = "InstagramLink"; Type = "General Link"; Hint = "Coach Instagram profile URL." }
                )
            },
            @{
                Name = "GalleryItem"; Icon = "Office/32x32/photo_landscape.png"; Section = "Gallery Media";
                Fields = @(
                    @{ Name = "Title"; Type = "Single-Line Text"; Hint = "Caption title revealed on hover."; MaxLen = "50 chars" },
                    @{ Name = "Category"; Type = "Single-Line Text"; Hint = "Filter category tag (Fitness, Coaching, Events)."; Default = "Fitness" },
                    @{ Name = "Image"; Type = "Image"; Source = ""; Hint = "Gallery showcase photograph." }
                )
            },
            @{
                Name = "NavigationLinkItem"; Icon = "Office/32x32/navigate_right.png"; Section = "Navigation Link";
                Fields = @(
                    @{ Name = "LinkTitle"; Type = "Single-Line Text"; Hint = "Navigation label displayed in Navbar or Footer."; MaxLen = "25 chars" },
                    @{ Name = "TargetLink"; Type = "General Link"; Hint = "Destination route or URL." }
                )
            },
            @{
                Name = "ProcedureStepItem"; Icon = "Office/32x32/number_1.png"; Section = "Step Details";
                Fields = @(
                    @{ Name = "StepNumber"; Type = "Single-Line Text"; Hint = "Two-digit step number (e.g., 01, 02, 03, 04)."; Default = "01" },
                    @{ Name = "Title"; Type = "Single-Line Text"; Hint = "Short step heading (e.g., Trusted Services, Natural Ways)."; MaxLen = "35 chars" },
                    @{ Name = "Description"; Type = "Multi-Line Text"; Hint = "Concise explanation of this coaching step."; MaxLen = "120 chars" }
                )
            },
            @{
                Name = "ProductItem"; Icon = "Office/32x32/box_closed.png"; Section = "Product Details";
                Fields = @(
                    @{ Name = "Title"; Type = "Single-Line Text"; Hint = "Product name (e.g., Organic Whey Protein, Resistance Bands)."; MaxLen = "60 chars" },
                    @{ Name = "Price"; Type = "Single-Line Text"; Hint = "Formatted display price (e.g., $49.99)." },
                    @{ Name = "Category"; Type = "Single-Line Text"; Hint = "Product category name for filtering." },
                    @{ Name = "Badge"; Type = "Single-Line Text"; Hint = "Optional promotional badge (e.g., Sale, New, Best Seller)." },
                    @{ Name = "Image"; Type = "Image"; Source = ""; Hint = "Product studio image." },
                    @{ Name = "ProductLink"; Type = "General Link"; Hint = "Link to product detail or checkout." }
                )
            },
            @{
                Name = "ProductCategoryItem"; Icon = "Office/32x32/tag.png"; Section = "Category Data";
                Fields = @(
                    @{ Name = "CategoryName"; Type = "Single-Line Text"; Hint = "Category display name in ProductSidebar." },
                    @{ Name = "ItemCount"; Type = "Integer"; Hint = "Optional count of products in this category."; Default = "0" }
                )
            },
            @{
                Name = "ServiceItem"; Icon = "Office/32x32/heart.png"; Section = "Service Details";
                Fields = @(
                    @{ Name = "Title"; Type = "Single-Line Text"; Hint = "Service name (e.g., Weight Loss Program, Sports Nutrition)."; MaxLen = "45 chars" },
                    @{ Name = "Description"; Type = "Multi-Line Text"; Hint = "Benefit-driven summary of the coaching service."; MaxLen = "160 chars" },
                    @{ Name = "IconName"; Type = "Single-Line Text"; Hint = "Icon identifier for ServicesPreview (e.g., FaAppleAlt, FaDumbbell, FaHeartbeat)." },
                    @{ Name = "Image"; Type = "Image"; Source = ""; Hint = "Service card cover image for ServicesGrid." },
                    @{ Name = "ServiceLink"; Type = "General Link"; Hint = "CTA link to service details page." }
                )
            },
            @{
                Name = "StatItem"; Icon = "Office/32x32/chart_bar.png"; Section = "Statistic Metric";
                Fields = @(
                    @{ Name = "Value"; Type = "Single-Line Text"; Hint = "Metric counter value with suffix (e.g., 24+, 1500+, 98%)."; MaxLen = "10 chars" },
                    @{ Name = "Label"; Type = "Single-Line Text"; Hint = "Metric label beneath the counter (e.g., Happy Clients, Years Experience)."; MaxLen = "30 chars" }
                )
            },
            @{
                Name = "TestimonialItem"; Icon = "Office/32x32/Users_chat.png"; Section = "Client Story";
                Fields = @(
                    @{ Name = "ClientName"; Type = "Single-Line Text"; Hint = "Full name of the client giving the testimonial." },
                    @{ Name = "ClientRole"; Type = "Single-Line Text"; Hint = "Client occupation or persona description (e.g., Marketing Executive)." },
                    @{ Name = "QuoteContent"; Type = "Multi-Line Text"; Hint = "Authentic client success story quote."; MaxLen = "220 chars" },
                    @{ Name = "Rating"; Type = "Integer"; Hint = "Star rating from 1 to 5."; Default = "5" },
                    @{ Name = "AvatarImage"; Type = "Image"; Source = ""; Hint = "Circular avatar photo of the client." }
                )
            }
        )

        $childTemplateIds = @{}
        foreach ($childDef in $childDefinitions) {
            $childTpl = Ensure-SitecoreTemplate `
                -ParentPath $DatasourcePath `
                -TemplateName $childDef.Name `
                -Icon $childDef.Icon `
                -BaseTemplateIds @($aiBaseId)

            $childTplPath = "master:$($childTpl.Paths.FullPath)"
            $childTemplateIds[$childDef.Name] = $childTpl.ID.ToString()

            $sortIdx = 100
            foreach ($field in $childDef.Fields) {
                $maxLen = $(if ($field.ContainsKey("MaxLen")) { $field.MaxLen } else { "" })
                $source = $(if ($field.ContainsKey("Source")) { $field.Source } else { "" })
                $defVal = $(if ($field.ContainsKey("Default")) { $field.Default } else { "" })
                Add-SitecoreAIField `
                    -TemplatePath $childTplPath `
                    -SectionName $childDef.Section `
                    -SectionSortOrder 100 `
                    -FieldName $field.Name `
                    -FieldType $field.Type `
                    -Source $source `
                    -SortOrder $sortIdx `
                    -AIPromptHint $field.Hint `
                    -AIMaxLengthHint $maxLen `
                    -DefaultValue $defVal | Out-Null
                $sortIdx += 100
            }
        }

        # ====================================================================
        # 6. CREATE ALL 19 ORGANISM COMPONENT TEMPLATES (Organisms/*)
        # ====================================================================
        $organisms = @(
            @{
                Name = "AboutSnippet"; Icon = "Office/32x32/information.png";
                InsertOptions = @($childTemplateIds["FeatureHighlightItem"]);
                Fields = @(
                    @{ Section = "Content"; Name = "Subtitle"; Type = "Single-Line Text"; Default = "About Us"; Hint = "Eyebrow label above the main section title."; MaxLen = "30 chars" },
                    @{ Section = "Content"; Name = "Title"; Type = "Single-Line Text"; Default = "Better Eat, Better Life"; Hint = "Primary section heading for AboutSnippet."; MaxLen = "60 chars" },
                    @{ Section = "Content"; Name = "PrimaryParagraph"; Type = "Rich Text"; Default = "We believe that true wellness comes from a balance of nourishing food, regular physical activity, and a positive mindset."; Hint = "Opening philosophy paragraph." },
                    @{ Section = "Content"; Name = "SecondaryParagraph"; Type = "Rich Text"; Default = "With over two decades of experience, we have helped thousands of individuals transform their bodies."; Hint = "Supporting credibility paragraph." },
                    @{ Section = "Content"; Name = "FeatureHighlights"; Type = "Multilist"; Source = "query:./*[@@templatename='FeatureHighlightItem']"; Hint = "Checklist items displayed with checkmarks." },
                    @{ Section = "Experience Badge"; Name = "ExperienceYears"; Type = "Single-Line Text"; Default = "24+"; Hint = "Highlighted counter number in the floating badge."; MaxLen = "10 chars" },
                    @{ Section = "Experience Badge"; Name = "ExperienceLabel"; Type = "Single-Line Text"; Default = "Years of Experience"; Hint = "Caption next to the experience counter."; MaxLen = "30 chars" },
                    @{ Section = "Media & CTA"; Name = "MainImage"; Type = "Image"; Source = ""; Hint = "Feature portrait image for AboutSnippet." },
                    @{ Section = "Media & CTA"; Name = "CtaLink"; Type = "General Link"; Hint = "Primary CTA button (Discover Our Story)." }
                )
            },
            @{
                Name = "AppointmentForm"; Icon = "Office/32x32/calendar_clock.png";
                InsertOptions = @($childTemplateIds["ServiceItem"]);
                Fields = @(
                    @{ Section = "Left Panel Info"; Name = "PanelTitle"; Type = "Single-Line Text"; Default = "Start Your Journey Today"; Hint = "Motivational heading on the colored info panel."; MaxLen = "50 chars" },
                    @{ Section = "Left Panel Info"; Name = "PanelDescription"; Type = "Multi-Line Text"; Default = "Take the first step towards a healthier, happier you. Fill out the form, and our coaching team will get back to you within 24 hours."; Hint = "Reassuring lead-capture copy with response SLA."; MaxLen = "180 chars" },
                    @{ Section = "Left Panel Info"; Name = "Address"; Type = "Single-Line Text"; Default = "123 Fitness Avenue, Wellness City"; Hint = "Physical clinic/studio address." },
                    @{ Section = "Left Panel Info"; Name = "Phone"; Type = "Single-Line Text"; Default = "+1 (555) 123-4567"; Hint = "Booking phone number." },
                    @{ Section = "Left Panel Info"; Name = "Email"; Type = "Single-Line Text"; Default = "info@fitlifecoach.com"; Hint = "Booking contact email." },
                    @{ Section = "Form Configuration"; Name = "FormSubtitle"; Type = "Single-Line Text"; Default = "Get in Touch"; Hint = "Eyebrow text above the appointment form." },
                    @{ Section = "Form Configuration"; Name = "FormTitle"; Type = "Single-Line Text"; Default = "Make an Appointment"; Hint = "Main form heading." },
                    @{ Section = "Form Configuration"; Name = "ServiceOptions"; Type = "Multilist"; Source = "$DataRootQuery/Services"; Hint = "Selectable services in the Service of Interest dropdown." },
                    @{ Section = "Form Configuration"; Name = "SubmitButtonText"; Type = "Single-Line Text"; Default = "Book Appointment"; Hint = "Form submit button label."; MaxLen = "25 chars" },
                    @{ Section = "Form Configuration"; Name = "SubmitEndpoint"; Type = "Single-Line Text"; Default = "/api/appointments"; Hint = "API endpoint or webhook URL for appointment submissions." }
                )
            },
            @{
                Name = "BlogGrid"; Icon = "Office/32x32/newspaper.png";
                InsertOptions = @($childTemplateIds["BlogPostItem"]);
                Fields = @(
                    @{ Section = "Grid Configuration"; Name = "Posts"; Type = "Multilist"; Source = "query:./*[@@templatename='BlogPostItem']"; Hint = "Curated blog posts to render in the 3-column grid." },
                    @{ Section = "Grid Configuration"; Name = "PageSize"; Type = "Integer"; Default = "6"; Hint = "Number of blog cards displayed per page." },
                    @{ Section = "Grid Configuration"; Name = "TotalPages"; Type = "Integer"; Default = "5"; Hint = "Default total pages for pagination control." }
                )
            },
            @{
                Name = "CoachesSection"; Icon = "Office/32x32/users3.png";
                InsertOptions = @($childTemplateIds["CoachItem"]);
                Fields = @(
                    @{ Section = "Section Header"; Name = "Subtitle"; Type = "Single-Line Text"; Default = "Coaches"; Hint = "Eyebrow label above the coaches heading."; MaxLen = "25 chars" },
                    @{ Section = "Section Header"; Name = "Title"; Type = "Single-Line Text"; Default = "Meet Our Fitness Coaches"; Hint = "Main section heading introducing the coaching team."; MaxLen = "60 chars" },
                    @{ Section = "Team Data"; Name = "Coaches"; Type = "Multilist"; Source = "query:./*[@@templatename='CoachItem']"; Hint = "Ordered list of CoachItem datasources to render in the 4-column grid." }
                )
            },
            @{
                Name = "ContactForm"; Icon = "Office/32x32/mail_write.png";
                InsertOptions = @();
                Fields = @(
                    @{ Section = "Form Settings"; Name = "FormHeading"; Type = "Single-Line Text"; Default = "Send Us A Message"; Hint = "Heading at the top of the contact inquiry card."; MaxLen = "45 chars" },
                    @{ Section = "Form Settings"; Name = "NameLabel"; Type = "Single-Line Text"; Default = "Your Name"; Hint = "Label for the name input field." },
                    @{ Section = "Form Settings"; Name = "EmailLabel"; Type = "Single-Line Text"; Default = "Email Address"; Hint = "Label for the email input field." },
                    @{ Section = "Form Settings"; Name = "PhoneLabel"; Type = "Single-Line Text"; Default = "Phone Number"; Hint = "Label for the phone input field." },
                    @{ Section = "Form Settings"; Name = "SubjectLabel"; Type = "Single-Line Text"; Default = "Subject"; Hint = "Label for the inquiry subject field." },
                    @{ Section = "Form Settings"; Name = "MessageLabel"; Type = "Single-Line Text"; Default = "Your Message"; Hint = "Label for the message textarea." },
                    @{ Section = "Form Settings"; Name = "SubmitButtonText"; Type = "Single-Line Text"; Default = "Send Message"; Hint = "CTA text on the submit button."; MaxLen = "25 chars" },
                    @{ Section = "Form Settings"; Name = "SubmissionApiUrl"; Type = "Single-Line Text"; Default = "/api/contact"; Hint = "Backend endpoint or Sitecore Forms handler URL." }
                )
            },
            @{
                Name = "ContactInfoSection"; Icon = "Office/32x32/telephone.png";
                InsertOptions = @();
                Fields = @(
                    @{ Section = "Header"; Name = "Title"; Type = "Single-Line Text"; Default = "Contact Information"; Hint = "Section heading for contact details."; MaxLen = "45 chars" },
                    @{ Section = "Header"; Name = "Description"; Type = "Multi-Line Text"; Default = "Have questions about our programs, memberships, or personal training? Reach out to us and we'll get back to you as soon as possible!"; Hint = "Warm invitation copy encouraging visitors to reach out."; MaxLen = "180 chars" },
                    @{ Section = "Contact Details"; Name = "LocationTitle"; Type = "Single-Line Text"; Default = "Our Location"; Hint = "Heading for the address block." },
                    @{ Section = "Contact Details"; Name = "AddressLines"; Type = "Multi-Line Text"; Default = "123 Fitness Avenue,`nWellness City, NY 10001"; Hint = "Street and city lines separated by newline." },
                    @{ Section = "Contact Details"; Name = "PhoneTitle"; Type = "Single-Line Text"; Default = "Phone Number"; Hint = "Heading for the phone block." },
                    @{ Section = "Contact Details"; Name = "PhoneNumber"; Type = "Single-Line Text"; Default = "+1 (555) 123-4567"; Hint = "Primary support phone number." },
                    @{ Section = "Contact Details"; Name = "EmailTitle"; Type = "Single-Line Text"; Default = "Email Address"; Hint = "Heading for the email block." },
                    @{ Section = "Contact Details"; Name = "EmailAddresses"; Type = "Multi-Line Text"; Default = "info@fitlifecoach.com`nsupport@fitlifecoach.com"; Hint = "Contact email addresses separated by newline." },
                    @{ Section = "Contact Details"; Name = "HoursTitle"; Type = "Single-Line Text"; Default = "Operating Hours"; Hint = "Heading for the operating hours block." },
                    @{ Section = "Contact Details"; Name = "OperatingHours"; Type = "Multi-Line Text"; Default = "Mon - Fri: 5:30 AM - 10:00 PM`nSat - Sun: 7:00 AM - 8:00 PM"; Hint = "Schedule lines separated by newline." }
                )
            },
            @{
                Name = "ContactMap"; Icon = "Office/32x32/earth_location.png";
                InsertOptions = @();
                Fields = @(
                    @{ Section = "Map Settings"; Name = "MapEmbedUrl"; Type = "Single-Line Text"; Default = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162590213!2d79.7738032704285!3d6.921833527581561"; Hint = "Google Maps iframe embed URL." },
                    @{ Section = "Map Settings"; Name = "MapTitle"; Type = "Single-Line Text"; Default = "Location Map"; Hint = "Accessible title attribute for the map iframe." }
                )
            },
            @{
                Name = "Footer"; Icon = "Office/32x32/layout_south.png";
                InsertOptions = @($childTemplateIds["NavigationLinkItem"]);
                Fields = @(
                    @{ Section = "Brand Column"; Name = "BrandPrefix"; Type = "Single-Line Text"; Default = "FitLife"; Hint = "First part of brand wordmark." },
                    @{ Section = "Brand Column"; Name = "BrandHighlight"; Type = "Single-Line Text"; Default = "Coach"; Hint = "Highlighted part of brand wordmark." },
                    @{ Section = "Brand Column"; Name = "BrandSummary"; Type = "Multi-Line Text"; Default = "Better Eat, Better Life. Empowering you to achieve your health and wellness goals through personalized coaching, nutrition, and support."; Hint = "Footer mission statement."; MaxLen = "180 chars" },
                    @{ Section = "Social Links"; Name = "FacebookUrl"; Type = "General Link"; Hint = "Brand Facebook page link." },
                    @{ Section = "Social Links"; Name = "InstagramUrl"; Type = "General Link"; Hint = "Brand Instagram page link." },
                    @{ Section = "Social Links"; Name = "TwitterUrl"; Type = "General Link"; Hint = "Brand Twitter/X page link." },
                    @{ Section = "Social Links"; Name = "YoutubeUrl"; Type = "General Link"; Hint = "Brand YouTube channel link." },
                    @{ Section = "Navigation Columns"; Name = "QuickLinksHeading"; Type = "Single-Line Text"; Default = "Quick Links"; Hint = "Column heading for site links." },
                    @{ Section = "Navigation Columns"; Name = "QuickLinks"; Type = "Multilist"; Source = "query:./*[@@templatename='NavigationLinkItem']"; Hint = "Links displayed under Quick Links." },
                    @{ Section = "Navigation Columns"; Name = "ServicesHeading"; Type = "Single-Line Text"; Default = "Our Services"; Hint = "Column heading for service links." },
                    @{ Section = "Navigation Columns"; Name = "ServiceLinks"; Type = "Multilist"; Source = "query:./*[@@templatename='NavigationLinkItem']"; Hint = "Links displayed under Our Services." },
                    @{ Section = "Contact & Legal"; Name = "ContactHeading"; Type = "Single-Line Text"; Default = "Contact Us"; Hint = "Column heading for footer contact info." },
                    @{ Section = "Contact & Legal"; Name = "Address"; Type = "Single-Line Text"; Default = "123 Fitness Avenue, Wellness City, NY 10001"; Hint = "Footer address text." },
                    @{ Section = "Contact & Legal"; Name = "Email"; Type = "Single-Line Text"; Default = "info@fitlifecoach.com"; Hint = "Footer email address." },
                    @{ Section = "Contact & Legal"; Name = "Phone"; Type = "Single-Line Text"; Default = "+1 (555) 123-4567"; Hint = "Footer phone number." },
                    @{ Section = "Contact & Legal"; Name = "CopyrightText"; Type = "Single-Line Text"; Default = "FitLifeCoach. All rights reserved."; Hint = "Legal copyright notice in bottom bar." }
                )
            },
            @{
                Name = "GalleryGrid"; Icon = "Office/32x32/photo_scenery.png";
                InsertOptions = @($childTemplateIds["GalleryItem"]);
                Fields = @(
                    @{ Section = "Gallery Settings"; Name = "FilterCategories"; Type = "Single-Line Text"; Default = "All|Fitness|Coaching|Events"; Hint = "Pipe-separated list of filter tabs." },
                    @{ Section = "Gallery Settings"; Name = "DefaultCategory"; Type = "Single-Line Text"; Default = "All"; Hint = "Initially active filter category." },
                    @{ Section = "Gallery Settings"; Name = "GalleryItems"; Type = "Multilist"; Source = "query:./*[@@templatename='GalleryItem']"; Hint = "Gallery items rendered in the filterable grid." },
                    @{ Section = "Gallery Settings"; Name = "LoadMoreButtonText"; Type = "Single-Line Text"; Default = "Load More"; Hint = "Button label to load additional gallery items." }
                )
            },
            @{
                Name = "HeroSection"; Icon = "Office/32x32/window_header.png";
                InsertOptions = @();
                Fields = @(
                    @{ Section = "Banner Content"; Name = "Title"; Type = "Single-Line Text"; Default = "Our Services"; Hint = "Inner-page hero H1 headline."; MaxLen = "60 chars" },
                    @{ Section = "Banner Content"; Name = "PageName"; Type = "Single-Line Text"; Default = "Services"; Hint = "Current page label displayed in the breadcrumb trail."; MaxLen = "30 chars" },
                    @{ Section = "Banner Content"; Name = "BackgroundImage"; Type = "Image"; Source = ""; Hint = "Full-bleed dark overlay background image." }
                )
            },
            @{
                Name = "HomeHero"; Icon = "Office/32x32/star.png";
                InsertOptions = @();
                Fields = @(
                    @{ Section = "Hero Content"; Name = "EyebrowText"; Type = "Single-Line Text"; Default = "Transform Your Life"; Hint = "Uppercase accent badge above main hero headline."; MaxLen = "35 chars" },
                    @{ Section = "Hero Content"; Name = "Headline"; Type = "Rich Text"; Default = "Eat Mindfully, <br />Sweat Often & <br />Self Love Always"; Hint = "High-impact primary hero headline."; MaxLen = "90 chars" },
                    @{ Section = "Hero Content"; Name = "Description"; Type = "Multi-Line Text"; Default = "Discover a balanced approach to fitness and nutrition. Our personalized coaching programs are designed to help you achieve sustainable results."; Hint = "Supporting value proposition subheadline."; MaxLen = "180 chars" },
                    @{ Section = "Media & Actions"; Name = "BackgroundImage"; Type = "Image"; Source = ""; Hint = "Full-screen hero background image." },
                    @{ Section = "Media & Actions"; Name = "PrimaryCta"; Type = "General Link"; Hint = "Primary CTA button (Make an Appointment)." },
                    @{ Section = "Media & Actions"; Name = "SecondaryCta"; Type = "General Link"; Hint = "Secondary outline CTA button (Explore Services)." }
                )
            },
            @{
                Name = "Navbar"; Icon = "Office/32x32/layout_north.png";
                InsertOptions = @($childTemplateIds["NavigationLinkItem"]);
                Fields = @(
                    @{ Section = "Header Branding"; Name = "BrandPrefix"; Type = "Single-Line Text"; Default = "FitLife"; Hint = "Primary brand text in header logo." },
                    @{ Section = "Header Branding"; Name = "BrandSuffix"; Type = "Single-Line Text"; Default = "Coach"; Hint = "Secondary brand text in header logo." },
                    @{ Section = "Navigation & CTA"; Name = "NavigationLinks"; Type = "Multilist"; Source = "query:./*[@@templatename='NavigationLinkItem']"; Hint = "Ordered top-level navigation links." },
                    @{ Section = "Navigation & CTA"; Name = "DesktopCtaLink"; Type = "General Link"; Hint = "Header CTA button (Appointment)." },
                    @{ Section = "Navigation & CTA"; Name = "MobileCtaLink"; Type = "General Link"; Hint = "Mobile drawer CTA button (Make an Appointment)." }
                )
            },
            @{
                Name = "Procedure"; Icon = "Office/32x32/navigate_Open.png";
                InsertOptions = @($childTemplateIds["ProcedureStepItem"]);
                Fields = @(
                    @{ Section = "Procedure Content"; Name = "Subtitle"; Type = "Single-Line Text"; Default = "Procedure"; Hint = "Centered eyebrow label above heading."; MaxLen = "25 chars" },
                    @{ Section = "Procedure Content"; Name = "Title"; Type = "Single-Line Text"; Default = "How It Works"; Hint = "Main heading for the 4-step process."; MaxLen = "50 chars" },
                    @{ Section = "Procedure Content"; Name = "Steps"; Type = "Multilist"; Source = "query:./*[@@templatename='ProcedureStepItem']"; Hint = "Ordered 4-step process items." }
                )
            },
            @{
                Name = "ProductCatalog"; Icon = "Office/32x32/shopping_cart.png";
                InsertOptions = @($childTemplateIds["ProductItem"]);
                Fields = @(
                    @{ Section = "Catalog Configuration"; Name = "Products"; Type = "Multilist"; Source = "query:./*[@@templatename='ProductItem']"; Hint = "Products displayed in the catalog grid." },
                    @{ Section = "Catalog Configuration"; Name = "TotalResults"; Type = "Integer"; Default = "24"; Hint = "Total product count displayed in sort bar." },
                    @{ Section = "Catalog Configuration"; Name = "ShownCount"; Type = "Integer"; Default = "9"; Hint = "Number of products shown per page." },
                    @{ Section = "Catalog Configuration"; Name = "TotalPages"; Type = "Integer"; Default = "4"; Hint = "Total pagination pages." }
                )
            },
            @{
                Name = "ProductSidebar"; Icon = "Office/32x32/funnel.png";
                InsertOptions = @($childTemplateIds["ProductCategoryItem"]);
                Fields = @(
                    @{ Section = "Sidebar Filters"; Name = "SearchHeading"; Type = "Single-Line Text"; Default = "Search Products"; Hint = "Heading above the product search input." },
                    @{ Section = "Sidebar Filters"; Name = "SearchPlaceholder"; Type = "Single-Line Text"; Default = "Search..."; Hint = "Placeholder text inside search box." },
                    @{ Section = "Sidebar Filters"; Name = "Categories"; Type = "Multilist"; Source = "query:./*[@@templatename='ProductCategoryItem']"; Hint = "Filterable product categories." },
                    @{ Section = "Sidebar Filters"; Name = "EnablePriceFilter"; Type = "Checkbox"; Default = "1"; Hint = "Toggles the PriceFilterWidget visibility." }
                )
            },
            @{
                Name = "ServicesGrid"; Icon = "Office/32x32/hand_shake.png";
                InsertOptions = @($childTemplateIds["ServiceItem"]);
                Fields = @(
                    @{ Section = "Services Catalog"; Name = "Services"; Type = "Multilist"; Source = "query:./*[@@templatename='ServiceItem']"; Hint = "Service cards rendered in the 3-column Services page grid." }
                )
            },
            @{
                Name = "ServicesPreview"; Icon = "Office/32x32/Flash_light.png";
                InsertOptions = @($childTemplateIds["ServiceItem"]);
                Fields = @(
                    @{ Section = "Preview Section"; Name = "Subtitle"; Type = "Single-Line Text"; Default = "What We Do"; Hint = "Eyebrow label for homepage services preview."; MaxLen = "30 chars" },
                    @{ Section = "Preview Section"; Name = "Title"; Type = "Single-Line Text"; Default = "Our Core Offerings"; Hint = "Main heading for homepage services preview."; MaxLen = "50 chars" },
                    @{ Section = "Preview Section"; Name = "FeaturedServices"; Type = "Multilist"; Source = "query:./*[@@templatename='ServiceItem']"; Hint = "Top 3 core service items highlighted on the home page." }
                )
            },
            @{
                Name = "StatsSection"; Icon = "Office/32x32/chart_line.png";
                InsertOptions = @($childTemplateIds["StatItem"]);
                Fields = @(
                    @{ Section = "Statistics Content"; Name = "BackgroundImage"; Type = "Image"; Source = ""; Hint = "Dark-overlay background photo behind stat counters." },
                    @{ Section = "Statistics Content"; Name = "Stats"; Type = "Multilist"; Source = "query:./*[@@templatename='StatItem']"; Hint = "Up to 4 StatItem counter datasources." }
                )
            },
            @{
                Name = "Testimonials"; Icon = "Office/32x32/comment_edit.png";
                InsertOptions = @($childTemplateIds["TestimonialItem"]);
                Fields = @(
                    @{ Section = "Testimonials Section"; Name = "Subtitle"; Type = "Single-Line Text"; Default = "Testimonials"; Hint = "Eyebrow subtitle above testimonials heading."; MaxLen = "30 chars" },
                    @{ Section = "Testimonials Section"; Name = "Title"; Type = "Single-Line Text"; Default = "Success Stories"; Hint = "Main heading for client testimonials."; MaxLen = "50 chars" },
                    @{ Section = "Testimonials Section"; Name = "TestimonialsList"; Type = "Multilist"; Source = "query:./*[@@templatename='TestimonialItem']"; Hint = "Selected client testimonial items." }
                )
            }
        )

        foreach ($org in $organisms) {
            $orgTpl = Ensure-SitecoreTemplate `
                -ParentPath $OrganismsPath `
                -TemplateName $org.Name `
                -Icon $org.Icon `
                -BaseTemplateIds @($aiBaseId) `
                -InsertOptionIds $org.InsertOptions

            $orgTplPath = "master:$($orgTpl.Paths.FullPath)"
            $fieldOrder = 100

            foreach ($f in $org.Fields) {
                $maxLen = $(if ($f.ContainsKey("MaxLen")) { $f.MaxLen } else { "" })
                $source = $(if ($f.ContainsKey("Source")) { $f.Source } else { "" })
                $defVal = $(if ($f.ContainsKey("Default")) { $f.Default } else { "" })

                Add-SitecoreAIField `
                    -TemplatePath $orgTplPath `
                    -SectionName $f.Section `
                    -SectionSortOrder 100 `
                    -FieldName $f.Name `
                    -FieldType $f.Type `
                    -Source $source `
                    -SortOrder $fieldOrder `
                    -AIPromptHint $f.Hint `
                    -AIMaxLengthHint $maxLen `
                    -DefaultValue $defVal | Out-Null

                $fieldOrder += 100
            }
        }

        # ====================================================================
        # 7. EXAMPLE: HOW TO ADD ANOTHER FIELD WITH SITECORE AI INFORMATION
        # ====================================================================
        # Copy-paste this pattern whenever you want to add a new AI-aware field
        # to any existing Organism template under /sitecore/templates/Project/FitnessMaster/Organisms
        Add-SitecoreAIField `
            -TemplatePath "$OrganismsPath/HomeHero" `
            -SectionName "Hero Content" `
            -SectionSortOrder 100 `
            -FieldName "AIGeneratedPromoBadge" `
            -FieldTitle "AI Promotional Badge Text" `
            -FieldType "Single-Line Text" `
            -SortOrder 700 `
            -AIPromptHint "Generate a high-converting seasonal fitness offer badge tailored to the visitor persona." `
            -AIMaxLengthHint "40 characters" `
            -DefaultValue "Free 7-Day Nutrition Assessment" | Out-Null

    } # End BulkUpdateContext

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Successfully provisioned all FitnessMaster Sitecore AI Templates!" -ForegroundColor Green
    Write-Host "     Root Path : $TenantRootPath" -ForegroundColor Green
    Write-Host "     Base      : $BaseFolderPath/_SitecoreAI_Metadata" -ForegroundColor Green
    Write-Host "     Items     : 11 Datasource Item Templates" -ForegroundColor Green
    Write-Host "     Organisms : 19 Organism Component Templates" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning Sitecore AI Templates: $($_.Exception.Message)" -ForegroundColor Red
    throw
}
