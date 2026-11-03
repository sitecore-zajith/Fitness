<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - FitnessMaster Project Templates with Base Inheritance
.DESCRIPTION
    Provisions the Project-layer template hierarchy under:
      master:/sitecore/templates/Project/Corporate/FitnessMaster
    Architecture Rule:
      - A Base Template MUST contain a minimum of 2 common fields.
      - Single-field overlaps are NOT extracted into a Base Template; they remain on the template.
      1. Base/*             - 8 Multi-Field Base Templates (2 to 4 fields each):
                              _BaseSectionHeading (2 fields: Title, Subtitle)
                              _BaseContentBlock   (2 fields: Title, Description)
                              _BaseMediaItem      (2 fields: Title, Image)
                              _BaseMediaCta       (2 fields: Image, CtaLink)
                              _BaseContactInfo    (3 fields: Address, Phone, Email)
                              _BaseSocialLinks    (4 fields: FacebookLink, TwitterLink, InstagramLink, YoutubeLink)
                              _BaseBrandIdentity  (2 fields: BrandPrefix, BrandSuffix)
                              _BasePagination     (3 fields: PageSize, TotalPages, TotalResults)
      2. DatasourceItems/*  - 11 Child item templates inheriting multi-field Base Templates where applicable
      3. Organisms/*        - 19 Organism component templates inheriting multi-field Base Templates
                              + component-specific __Standard Values and Insert Options
      4. Add-SitecoreAIField - Reusable helper to add new fields with Sitecore AI metadata
      5. Renderings/*       - 19 Json Renderings under
                              master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster
                              mapped 1:1 to Organisms/* (componentName, Datasource Template/Location)
      6. Available Renderings - Site presentation tree under
                              master:/sitecore/content/Corporate/FitLife/Presentation/Available Renderings
                              with a FitnessMaster item listing all 19 renderings
.NOTES
    Target Environment : Sitecore XM Cloud / Sitecore XP with SPE (Execute in Sitecore ISE)
    Encoding           : ASCII-safe
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# 1. SITECORE SYSTEM TEMPLATE CONSTANTS & CONFIGURATION
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

# Headless (XM Cloud / JSS) rendering system templates
$JsonRenderingId    = "{04646A89-996F-4EE7-878A-FFDBF1F0EF0D}"
$RenderingFolderId  = "{7EE0975B-0698-493E-B3A2-0B2EF33D0522}"
$RenderingsRootPath = "master:/sitecore/layout/Renderings/Project/Corporate"
$RenderingsPath     = "$RenderingsRootPath/$TenantName"

# Content tree (SXA headless site): /sitecore/content/Corporate/fitlifecoach/Presentation/Available Renderings
$ContentRootPath             = "master:/sitecore/content"
$SiteCollectionName          = "Corporate"
$SiteName                    = "fitlifecoach"
$AvailableRenderingsItemName = $TenantName   # Group shown in the Pages/Experience Editor toolbox
$SitePath                    = "$ContentRootPath/$SiteCollectionName/$SiteName"
$PresentationPath            = "$SitePath/Presentation"
$AvailableRenderingsPath     = "$PresentationPath/Available Renderings"

# SXA / JSS system templates (resolved by path at runtime; fallback used when SXA is not installed)
$CommonFolderId                   = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$HeadlessTenantTemplatePath       = "master:/sitecore/templates/Foundation/JSS Experience Accelerator/Multisite/Headless Tenant"
$HeadlessSiteTemplatePath         = "master:/sitecore/templates/Foundation/JSS Experience Accelerator/Multisite/Headless Site"
$PresentationTemplatePath         = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Presentation"
$AvailableRenderingsFolderTplPath = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Available Renderings/Available Renderings Folder"
$AvailableRenderingsTplPath       = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Available Renderings/Available Renderings"

# Minimum number of common fields required to qualify as a Base Template
$MinBaseTemplateFields = 2

# ============================================================================
# 2. CORE SPE HELPER FUNCTIONS
# ============================================================================

function Ensure-TemplateFolder {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$FolderName,
        [Parameter(Mandatory = $false)][string]$FolderTemplateId
    )

    if (-not $FolderTemplateId) {
        $FolderTemplateId = $TemplateFolderId
    }

    $fullPath = "$ParentPath/$FolderName"
    if (Test-Path -Path $fullPath) {
        Write-Host "[i] Folder exists: $fullPath" -ForegroundColor Gray
        return Get-Item -Path $fullPath
    }

    Write-Host "[+] Creating Folder: $fullPath" -ForegroundColor Cyan
    $folder = New-Item -Path $ParentPath -Name $FolderName -ItemType $FolderTemplateId
    return $folder
}

<#
.SYNOPSIS
    Creates or updates a headless Json Rendering and writes the supplied field values.
.DESCRIPTION
    Idempotent: re-running updates the existing rendering in place. Unknown field names
    are skipped with a warning instead of failing the whole run.
#>
function Ensure-JsonRendering {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$RenderingName,
        [Parameter(Mandatory = $true)][hashtable]$Fields
    )

    $renderingPath = "$ParentPath/$RenderingName"
    if (Test-Path -Path $renderingPath) {
        $renderingItem = Get-Item -Path $renderingPath
        Write-Host "[i] Updating Rendering: $renderingPath" -ForegroundColor Yellow
    }
    else {
        $renderingItem = New-Item -Path $ParentPath -Name $RenderingName -ItemType $JsonRenderingId
        Write-Host "[+] Created Rendering: $renderingPath" -ForegroundColor Green
    }

    $renderingItem.Editing.BeginEdit() | Out-Null
    foreach ($kvp in $Fields.GetEnumerator()) {
        if ($null -eq $renderingItem.Fields[$kvp.Key]) {
            Write-Warning "[WARN] Field '$($kvp.Key)' not found on rendering '$RenderingName'. Skipped."
            continue
        }
        $renderingItem[$kvp.Key] = $kvp.Value
    }
    $renderingItem.Editing.EndEdit() | Out-Null

    return $renderingItem
}

<#
.SYNOPSIS
    Returns the ID of the template at TemplatePath, or FallbackId when it does not exist.
    Throws when neither is available.
#>
function Resolve-TemplateId {
    param(
        [Parameter(Mandatory = $true)][string]$TemplatePath,
        [string]$FallbackId = ""
    )

    if (Test-Path -Path $TemplatePath) {
        return (Get-Item -Path $TemplatePath).ID.ToString()
    }
    if ($FallbackId) {
        Write-Warning "[WARN] Template not found: $TemplatePath. Falling back to $FallbackId."
        return $FallbackId
    }
    throw "Required template not found: $TemplatePath"
}

<#
.SYNOPSIS
    Returns the content item at ParentPath/ItemName, creating it from TemplateId when missing.
#>
function Ensure-ContentItem {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$ItemName,
        [Parameter(Mandatory = $true)][string]$TemplateId
    )

    $itemPath = "$ParentPath/$ItemName"
    if (Test-Path -Path $itemPath) {
        Write-Host "[i] Content item exists: $itemPath" -ForegroundColor Gray
        return Get-Item -Path $itemPath
    }

    Write-Host "[+] Creating Content Item: $itemPath" -ForegroundColor Cyan
    return New-Item -Path $ParentPath -Name $ItemName -ItemType $TemplateId
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
    $templateItem.Database.Engines.TemplateEngine.Reset()
    if (-not (Test-Path -Path $stdValuesPath)) {
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

function Set-TemplateStandardValues {
    param(
        [Parameter(Mandatory = $true)][string]$TemplatePath,
        [Parameter(Mandatory = $true)][hashtable]$Values
    )

    $stdValuesPath = "$TemplatePath/__Standard Values"
    if (($Values) -and ($Values.Count -gt 0) -and (Test-Path -Path $stdValuesPath)) {
        $stdValuesItem = Get-Item -Path $stdValuesPath
        $stdValuesItem.Database.Engines.TemplateEngine.Reset()
        $stdValuesItem.Editing.BeginEdit() | Out-Null
        foreach ($kvp in $Values.GetEnumerator()) {
            $stdValuesItem[$kvp.Key] = $kvp.Value
        }
        $stdValuesItem.Editing.EndEdit() | Out-Null
    }
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
        # 4. CREATE MULTI-FIELD BASE TEMPLATES (Base/*) - MINIMUM 2 FIELDS
        # ====================================================================
        # Rule: Every Base Template MUST define at least 2 common fields.
        $baseDefinitions = @(
            @{
                Name = "_BaseSectionHeading"; Icon = "Office/32x32/text_align_center.png"; Section = "Common Heading"; SortOrder = 50;
                Fields = @(
                    @{ Name = "Subtitle"; Title = "Subtitle / Eyebrow"; Type = "Single-Line Text"; Hint = "Short uppercase eyebrow label displayed above the main Title."; MaxLen = "35 chars" },
                    @{ Name = "Title"; Title = "Title"; Type = "Single-Line Text"; Hint = "Primary section heading generated or optimized by Sitecore AI."; MaxLen = "70 chars" }
                )
            },
            @{
                Name = "_BaseContentBlock"; Icon = "Office/32x32/text_align_left.png"; Section = "Common Content"; SortOrder = 60;
                Fields = @(
                    @{ Name = "Title"; Title = "Title"; Type = "Single-Line Text"; Hint = "Primary title or name for this content item."; MaxLen = "70 chars" },
                    @{ Name = "Description"; Title = "Description / Summary"; Type = "Multi-Line Text"; Hint = "Supporting body description, excerpt, or quote text."; MaxLen = "180 chars" }
                )
            },
            @{
                Name = "_BaseMediaItem"; Icon = "Office/32x32/photo_landscape.png"; Section = "Common Media Item"; SortOrder = 65;
                Fields = @(
                    @{ Name = "Title"; Title = "Title"; Type = "Single-Line Text"; Hint = "Primary title or caption for this visual item."; MaxLen = "70 chars" },
                    @{ Name = "Image"; Title = "Primary Image"; Type = "Image"; Source = ""; Hint = "Primary visual image asset." }
                )
            },
            @{
                Name = "_BaseMediaCta"; Icon = "Office/32x32/navigate_right.png"; Section = "Common Media & CTA"; SortOrder = 70;
                Fields = @(
                    @{ Name = "Image"; Title = "Primary Image"; Type = "Image"; Source = ""; Hint = "Primary visual asset (hero background, card thumbnail, or feature photo)." },
                    @{ Name = "CtaLink"; Title = "Primary CTA / Target Link"; Type = "General Link"; Hint = "Primary call-to-action button or item destination link." }
                )
            },
            @{
                Name = "_BaseContactInfo"; Icon = "Office/32x32/telephone.png"; Section = "Common Contact Details"; SortOrder = 80;
                Fields = @(
                    @{ Name = "Address"; Title = "Physical Address"; Type = "Single-Line Text"; Default = "123 Fitness Avenue, Wellness City, NY 10001"; Hint = "Physical studio or clinic address." },
                    @{ Name = "Phone"; Title = "Phone Number"; Type = "Single-Line Text"; Default = "+1 (555) 123-4567"; Hint = "Contact phone number." },
                    @{ Name = "Email"; Title = "Email Address"; Type = "Single-Line Text"; Default = "info@fitlifecoach.com"; Hint = "Contact email address." }
                )
            },
            @{
                Name = "_BaseSocialLinks"; Icon = "Office/32x32/earth.png"; Section = "Common Social Links"; SortOrder = 85;
                Fields = @(
                    @{ Name = "FacebookLink"; Title = "Facebook URL"; Type = "General Link"; Hint = "Facebook profile or brand page link." },
                    @{ Name = "TwitterLink"; Title = "Twitter / X URL"; Type = "General Link"; Hint = "Twitter/X profile or brand page link." },
                    @{ Name = "InstagramLink"; Title = "Instagram URL"; Type = "General Link"; Hint = "Instagram profile or brand page link." },
                    @{ Name = "YoutubeLink"; Title = "YouTube URL"; Type = "General Link"; Hint = "YouTube channel link." }
                )
            },
            @{
                Name = "_BaseBrandIdentity"; Icon = "Office/32x32/Smart_card.png"; Section = "Common Branding"; SortOrder = 40;
                Fields = @(
                    @{ Name = "BrandPrefix"; Title = "Brand Wordmark Prefix"; Type = "Single-Line Text"; Default = "FitLife"; Hint = "First part of the brand wordmark." },
                    @{ Name = "BrandSuffix"; Title = "Brand Wordmark Highlight"; Type = "Single-Line Text"; Default = "Coach"; Hint = "Highlighted second part of the brand wordmark." }
                )
            },
            @{
                Name = "_BasePagination"; Icon = "Office/32x32/table_selection_row.png"; Section = "Common Pagination"; SortOrder = 95;
                Fields = @(
                    @{ Name = "PageSize"; Title = "Items Per Page"; Type = "Integer"; Default = "6"; Hint = "Number of cards shown per page." },
                    @{ Name = "TotalPages"; Title = "Total Pages"; Type = "Integer"; Default = "5"; Hint = "Total pages in pagination bar." },
                    @{ Name = "TotalResults"; Title = "Total Results Count"; Type = "Integer"; Default = "24"; Hint = "Total items count summary." }
                )
            }
        )

        $baseTemplateIds = @{}

        foreach ($baseDef in $baseDefinitions) {
            # Enforce minimum 2 fields rule for all Base Templates
            if ((-not $baseDef.Fields) -or ($baseDef.Fields.Count -lt $MinBaseTemplateFields)) {
                Write-Warning "[WARN] Skipping Base Template '$($baseDef.Name)': Must have at least $MinBaseTemplateFields fields."
                continue
            }

            $baseTpl = Ensure-SitecoreTemplate `
                -ParentPath $BaseFolderPath `
                -TemplateName $baseDef.Name `
                -Icon $baseDef.Icon

            $baseTplPath = "master:$($baseTpl.Paths.FullPath)"
            $baseTemplateIds[$baseDef.Name] = $baseTpl.ID.ToString()

            $sortOrder = 100
            foreach ($f in $baseDef.Fields) {
                $maxLen = $(if ($f.ContainsKey("MaxLen")) { $f.MaxLen } else { "" })
                $source = $(if ($f.ContainsKey("Source")) { $f.Source } else { "" })
                $defVal = $(if ($f.ContainsKey("Default")) { $f.Default } else { "" })

                Add-SitecoreAIField `
                    -TemplatePath $baseTplPath `
                    -SectionName $baseDef.Section `
                    -SectionSortOrder $baseDef.SortOrder `
                    -FieldName $f.Name `
                    -FieldTitle $f.Title `
                    -FieldType $f.Type `
                    -Source $source `
                    -SortOrder $sortOrder `
                    -AIPromptHint $f.Hint `
                    -AIMaxLengthHint $maxLen `
                    -DefaultValue $defVal | Out-Null

                $sortOrder += 100
            }
        }

        # ====================================================================
        # 5. CREATE CHILD DATASOURCE ITEM TEMPLATES (DatasourceItems/*)
        #    Inherits Base/* ONLY when >= 2 common fields match
        # ====================================================================
        $childDefinitions = @(
            @{
                # Only 1 field -> No Base Template inheritance
                Name = "FeatureHighlightItem"; Icon = "Office/32x32/check.png"; Section = "Highlight Data";
                Inherits = @();
                StandardValues = @{};
                Fields = @(
                    @{ Name = "Title"; Type = "Single-Line Text"; Default = "Personalized Nutrition Plans"; Hint = "Short bullet highlight for AboutSnippet."; MaxLen = "50 chars" }
                )
            },
            @{
                # Inherits _BaseContentBlock (Title, Description) + _BaseMediaCta (Image, CtaLink)
                Name = "BlogPostItem"; Icon = "Office/32x32/document_text.png"; Section = "Article Data";
                Inherits = @("_BaseContentBlock", "_BaseMediaCta");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "PublishDate"; Type = "Date"; Hint = "Publication date of the blog post." },
                    @{ Name = "DisplayDay"; Type = "Single-Line Text"; Hint = "2-digit day badge shown on card (e.g., 14)." },
                    @{ Name = "DisplayMonth"; Type = "Single-Line Text"; Hint = "3-letter month badge shown on card (e.g., OCT)." },
                    @{ Name = "Author"; Type = "Single-Line Text"; Hint = "Author or coach name." },
                    @{ Name = "CommentCount"; Type = "Integer"; Hint = "Number of reader comments."; Default = "0" }
                )
            },
            @{
                # Inherits _BaseMediaItem (Title, Image) + _BaseSocialLinks (FacebookLink, TwitterLink, InstagramLink, YoutubeLink)
                Name = "CoachItem"; Icon = "Office/32x32/user.png"; Section = "Coach Profile";
                Inherits = @("_BaseMediaItem", "_BaseSocialLinks");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "Role"; Type = "Single-Line Text"; Hint = "Coach specialization title (e.g., Senior Nutritionist, Strength Coach)."; MaxLen = "45 chars" }
                )
            },
            @{
                # Inherits _BaseMediaItem (Title, Image)
                Name = "GalleryItem"; Icon = "Office/32x32/photo_landscape.png"; Section = "Gallery Media";
                Inherits = @("_BaseMediaItem");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "Category"; Type = "Single-Line Text"; Hint = "Filter category tag (Fitness, Coaching, Events)."; Default = "Fitness" }
                )
            },
            @{
                # Specific navigation fields -> Defined directly on NavigationLinkItem
                Name = "NavigationLinkItem"; Icon = "Office/32x32/navigate_right.png"; Section = "Navigation Link";
                Inherits = @();
                StandardValues = @{};
                Fields = @(
                    @{ Name = "LinkTitle"; Type = "Single-Line Text"; Hint = "Navigation label displayed in Navbar or Footer."; MaxLen = "25 chars" },
                    @{ Name = "TargetLink"; Type = "General Link"; Hint = "Destination route or URL." }
                )
            },
            @{
                # Inherits _BaseContentBlock (Title, Description)
                Name = "ProcedureStepItem"; Icon = "Office/32x32/number_1.png"; Section = "Step Details";
                Inherits = @("_BaseContentBlock");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "StepNumber"; Type = "Single-Line Text"; Hint = "Two-digit step number (e.g., 01, 02, 03, 04)."; Default = "01" }
                )
            },
            @{
                # Inherits _BaseMediaItem (Title, Image)
                Name = "ProductItem"; Icon = "Office/32x32/box_closed.png"; Section = "Product Details";
                Inherits = @("_BaseMediaItem");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "Price"; Type = "Single-Line Text"; Hint = "Formatted display price (e.g., 49.99)." },
                    @{ Name = "Category"; Type = "Single-Line Text"; Hint = "Product category name for filtering." },
                    @{ Name = "Badge"; Type = "Single-Line Text"; Hint = "Optional promotional badge (e.g., Sale, New, Best Seller)." },
                    @{ Name = "ProductLink"; Type = "General Link"; Hint = "Link to product detail or checkout." }
                )
            },
            @{
                # Only 1 common field -> No Base Template inheritance
                Name = "ProductCategoryItem"; Icon = "Office/32x32/tag.png"; Section = "Category Data";
                Inherits = @();
                StandardValues = @{};
                Fields = @(
                    @{ Name = "CategoryName"; Type = "Single-Line Text"; Hint = "Category display name in ProductSidebar." },
                    @{ Name = "ItemCount"; Type = "Integer"; Hint = "Optional count of products in this category."; Default = "0" }
                )
            },
            @{
                # Inherits _BaseContentBlock (Title, Description) + _BaseMediaCta (Image, CtaLink)
                Name = "ServiceItem"; Icon = "Office/32x32/heart.png"; Section = "Service Details";
                Inherits = @("_BaseContentBlock", "_BaseMediaCta");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "IconName"; Type = "Single-Line Text"; Hint = "Icon identifier for ServicesPreview (e.g., FaAppleAlt, FaDumbbell, FaHeartbeat)." }
                )
            },
            @{
                # Only 1 common field -> No Base Template inheritance
                Name = "StatItem"; Icon = "Office/32x32/chart_bar.png"; Section = "Statistic Metric";
                Inherits = @();
                StandardValues = @{};
                Fields = @(
                    @{ Name = "Value"; Type = "Single-Line Text"; Hint = "Metric counter value with suffix (e.g., 24+, 1500+, 98%)."; MaxLen = "10 chars" },
                    @{ Name = "Label"; Type = "Single-Line Text"; Hint = "Metric label beneath the counter (e.g., Happy Clients, Years Experience)."; MaxLen = "30 chars" }
                )
            },
            @{
                # Inherits _BaseContentBlock (Title, Description)
                Name = "TestimonialItem"; Icon = "Office/32x32/Users_chat.png"; Section = "Client Story";
                Inherits = @("_BaseContentBlock");
                StandardValues = @{};
                Fields = @(
                    @{ Name = "ClientRole"; Type = "Single-Line Text"; Hint = "Client occupation or persona description (e.g., Marketing Executive)." },
                    @{ Name = "Rating"; Type = "Integer"; Hint = "Star rating from 1 to 5."; Default = "5" },
                    @{ Name = "AvatarImage"; Type = "Image"; Source = ""; Hint = "Circular avatar photo of the client." }
                )
            }
        )

        $childTemplateIds = @{}
        foreach ($childDef in $childDefinitions) {
            $resolvedBaseIds = @()
            foreach ($baseName in $childDef.Inherits) {
                if ($baseTemplateIds.ContainsKey($baseName)) {
                    $resolvedBaseIds += $baseTemplateIds[$baseName]
                }
            }

            $childTpl = Ensure-SitecoreTemplate `
                -ParentPath $DatasourcePath `
                -TemplateName $childDef.Name `
                -Icon $childDef.Icon `
                -BaseTemplateIds $resolvedBaseIds

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

            if (($childDef.StandardValues) -and ($childDef.StandardValues.Count -gt 0)) {
                Set-TemplateStandardValues -TemplatePath $childTplPath -Values $childDef.StandardValues
            }
        }

        # ====================================================================
        # 6. CREATE ALL 19 ORGANISM COMPONENT TEMPLATES (Organisms/*)
        #    Inherits Base/* ONLY when >= 2 common fields match
        # ====================================================================
        $organisms = @(
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title) + _BaseMediaCta (Image, CtaLink)
                Name = "AboutSnippet"; Icon = "Office/32x32/information.png";
                Inherits = @("_BaseSectionHeading", "_BaseMediaCta");
                InsertOptions = @($childTemplateIds["FeatureHighlightItem"]);
                StandardValues = @{ Subtitle = "About Us"; Title = "Better Eat, Better Life" };
                Fields = @(
                    @{ Section = "Content"; Name = "PrimaryParagraph"; Type = "Rich Text"; Default = "We believe that true wellness comes from a balance of nourishing food, regular physical activity, and a positive mindset."; Hint = "Opening philosophy paragraph." },
                    @{ Section = "Content"; Name = "SecondaryParagraph"; Type = "Rich Text"; Default = "With over two decades of experience, we have helped thousands of individuals transform their bodies."; Hint = "Supporting credibility paragraph." },
                    @{ Section = "Content"; Name = "FeatureHighlights"; Type = "Multilist"; Source = "query:./*[@@templatename='FeatureHighlightItem']"; Hint = "Checklist items displayed with checkmarks." },
                    @{ Section = "Experience Badge"; Name = "ExperienceYears"; Type = "Single-Line Text"; Default = "24+"; Hint = "Highlighted counter number in the floating badge."; MaxLen = "10 chars" },
                    @{ Section = "Experience Badge"; Name = "ExperienceLabel"; Type = "Single-Line Text"; Default = "Years of Experience"; Hint = "Caption next to the experience counter."; MaxLen = "30 chars" }
                )
            },
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title) + _BaseContactInfo (Address, Phone, Email)
                Name = "AppointmentForm"; Icon = "Office/32x32/calendar_clock.png";
                Inherits = @("_BaseSectionHeading", "_BaseContactInfo");
                InsertOptions = @($childTemplateIds["ServiceItem"]);
                StandardValues = @{
                    Subtitle = "Get in Touch";
                    Title = "Make an Appointment"
                };
                Fields = @(
                    @{ Section = "Left Panel Info"; Name = "PanelTitle"; Type = "Single-Line Text"; Default = "Start Your Journey Today"; Hint = "Motivational heading on the colored info panel."; MaxLen = "50 chars" },
                    @{ Section = "Left Panel Info"; Name = "PanelDescription"; Type = "Multi-Line Text"; Default = "Take the first step towards a healthier, happier you. Fill out the form, and our coaching team will get back to you within 24 hours."; Hint = "Reassuring lead-capture copy with response SLA."; MaxLen = "180 chars" },
                    @{ Section = "Form Configuration"; Name = "ServiceOptions"; Type = "Multilist"; Source = "$DataRootQuery/Services"; Hint = "Selectable services in the Service of Interest dropdown." },
                    @{ Section = "Form Configuration"; Name = "SubmitButtonText"; Type = "Single-Line Text"; Default = "Book Appointment"; Hint = "Form submit button label."; MaxLen = "25 chars" },
                    @{ Section = "Form Configuration"; Name = "SubmitEndpoint"; Type = "Single-Line Text"; Default = "/api/appointments"; Hint = "API endpoint or webhook URL for appointment submissions." }
                )
            },
            @{
                # Inherits _BasePagination (PageSize, TotalPages, TotalResults)
                Name = "BlogGrid"; Icon = "Office/32x32/newspaper.png";
                Inherits = @("_BasePagination");
                InsertOptions = @($childTemplateIds["BlogPostItem"]);
                StandardValues = @{ PageSize = "6"; TotalPages = "5"; TotalResults = "30" };
                Fields = @(
                    @{ Section = "Grid Configuration"; Name = "Posts"; Type = "Multilist"; Source = "query:./*[@@templatename='BlogPostItem']"; Hint = "Curated blog posts to render in the 3-column grid." }
                )
            },
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title)
                Name = "CoachesSection"; Icon = "Office/32x32/users3.png";
                Inherits = @("_BaseSectionHeading");
                InsertOptions = @($childTemplateIds["CoachItem"]);
                StandardValues = @{ Subtitle = "Coaches"; Title = "Meet Our Fitness Coaches" };
                Fields = @(
                    @{ Section = "Team Data"; Name = "Coaches"; Type = "Multilist"; Source = "query:./*[@@templatename='CoachItem']"; Hint = "Ordered list of CoachItem datasources to render in the 4-column grid." }
                )
            },
            @{
                # Only 1 heading field -> No Base Template inheritance
                Name = "ContactForm"; Icon = "Office/32x32/mail_write.png";
                Inherits = @();
                InsertOptions = @();
                StandardValues = @{};
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
                # Inherits _BaseContentBlock (Title, Description) + _BaseContactInfo (Address, Phone, Email)
                Name = "ContactInfoSection"; Icon = "Office/32x32/telephone.png";
                Inherits = @("_BaseContentBlock", "_BaseContactInfo");
                InsertOptions = @();
                StandardValues = @{
                    Title = "Contact Information";
                    Description = "Have questions about our programs, memberships, or personal training? Reach out to us and we'll get back to you as soon as possible!"
                };
                Fields = @(
                    @{ Section = "Contact Details"; Name = "LocationTitle"; Type = "Single-Line Text"; Default = "Our Location"; Hint = "Heading for the address block." },
                    @{ Section = "Contact Details"; Name = "PhoneTitle"; Type = "Single-Line Text"; Default = "Phone Number"; Hint = "Heading for the phone block." },
                    @{ Section = "Contact Details"; Name = "EmailTitle"; Type = "Single-Line Text"; Default = "Email Address"; Hint = "Heading for the email block." },
                    @{ Section = "Contact Details"; Name = "HoursTitle"; Type = "Single-Line Text"; Default = "Operating Hours"; Hint = "Heading for the operating hours block." },
                    @{ Section = "Contact Details"; Name = "OperatingHours"; Type = "Multi-Line Text"; Default = "Mon - Fri: 5:30 AM - 10:00 PM`nSat - Sun: 7:00 AM - 8:00 PM"; Hint = "Schedule lines separated by newline." }
                )
            },
            @{
                # Only 1 common field -> No Base Template inheritance
                Name = "ContactMap"; Icon = "Office/32x32/earth_location.png";
                Inherits = @();
                InsertOptions = @();
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Map Settings"; Name = "MapTitle"; Type = "Single-Line Text"; Default = "Location Map"; Hint = "Accessible title attribute for the map iframe." },
                    @{ Section = "Map Settings"; Name = "MapEmbedUrl"; Type = "Single-Line Text"; Default = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162590213!2d79.7738032704285!3d6.921833527581561"; Hint = "Google Maps iframe embed URL." }
                )
            },
            @{
                # Inherits _BaseBrandIdentity (BrandPrefix, BrandSuffix) + _BaseSocialLinks (4 fields) + _BaseContactInfo (Address, Phone, Email)
                Name = "Footer"; Icon = "Office/32x32/layout_south.png";
                Inherits = @("_BaseBrandIdentity", "_BaseSocialLinks", "_BaseContactInfo");
                InsertOptions = @($childTemplateIds["NavigationLinkItem"]);
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Brand Column"; Name = "BrandSummary"; Type = "Multi-Line Text"; Default = "Better Eat, Better Life. Empowering you to achieve your health and wellness goals through personalized coaching, nutrition, and support."; Hint = "Footer mission statement."; MaxLen = "180 chars" },
                    @{ Section = "Navigation Columns"; Name = "QuickLinksHeading"; Type = "Single-Line Text"; Default = "Quick Links"; Hint = "Column heading for site links." },
                    @{ Section = "Navigation Columns"; Name = "QuickLinks"; Type = "Multilist"; Source = "query:./*[@@templatename='NavigationLinkItem']"; Hint = "Links displayed under Quick Links." },
                    @{ Section = "Navigation Columns"; Name = "ServicesHeading"; Type = "Single-Line Text"; Default = "Our Services"; Hint = "Column heading for service links." },
                    @{ Section = "Navigation Columns"; Name = "ServiceLinks"; Type = "Multilist"; Source = "query:./*[@@templatename='NavigationLinkItem']"; Hint = "Links displayed under Our Services." },
                    @{ Section = "Contact & Legal"; Name = "ContactHeading"; Type = "Single-Line Text"; Default = "Contact Us"; Hint = "Column heading for footer contact info." },
                    @{ Section = "Contact & Legal"; Name = "CopyrightText"; Type = "Single-Line Text"; Default = "FitLifeCoach. All rights reserved."; Hint = "Legal copyright notice in bottom bar." }
                )
            },
            @{
                Name = "GalleryGrid"; Icon = "Office/32x32/photo_scenery.png";
                Inherits = @();
                InsertOptions = @($childTemplateIds["GalleryItem"]);
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Gallery Settings"; Name = "FilterCategories"; Type = "Single-Line Text"; Default = "All|Fitness|Coaching|Events"; Hint = "Pipe-separated list of filter tabs." },
                    @{ Section = "Gallery Settings"; Name = "DefaultCategory"; Type = "Single-Line Text"; Default = "All"; Hint = "Initially active filter category." },
                    @{ Section = "Gallery Settings"; Name = "GalleryItems"; Type = "Multilist"; Source = "query:./*[@@templatename='GalleryItem']"; Hint = "Gallery items rendered in the filterable grid." },
                    @{ Section = "Gallery Settings"; Name = "LoadMoreButtonText"; Type = "Single-Line Text"; Default = "Load More"; Hint = "Button label to load additional gallery items." }
                )
            },
            @{
                # Inherits _BaseMediaItem (Title, Image)
                Name = "HeroSection"; Icon = "Office/32x32/window_header.png";
                Inherits = @("_BaseMediaItem");
                InsertOptions = @();
                StandardValues = @{ Title = "Our Services" };
                Fields = @(
                    @{ Section = "Banner Content"; Name = "PageName"; Type = "Single-Line Text"; Default = "Services"; Hint = "Current page label displayed in the breadcrumb trail."; MaxLen = "30 chars" }
                )
            },
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title) + _BaseMediaCta (Image, CtaLink)
                Name = "HomeHero"; Icon = "Office/32x32/star.png";
                Inherits = @("_BaseSectionHeading", "_BaseMediaCta");
                InsertOptions = @();
                StandardValues = @{
                    Subtitle = "Transform Your Life";
                    Title = "Eat Mindfully, Sweat Often & Self Love Always"
                };
                Fields = @(
                    @{ Section = "Hero Content"; Name = "Description"; Type = "Multi-Line Text"; Default = "Discover a balanced approach to fitness and nutrition. Our personalized coaching programs are designed to help you achieve sustainable results."; Hint = "Supporting value proposition subheadline."; MaxLen = "180 chars" },
                    @{ Section = "Media & Actions"; Name = "SecondaryCta"; Type = "General Link"; Hint = "Secondary outline CTA button (Explore Services)." }
                )
            },
            @{
                # Inherits _BaseBrandIdentity (BrandPrefix, BrandSuffix)
                Name = "Navbar"; Icon = "Office/32x32/layout_north.png";
                Inherits = @("_BaseBrandIdentity");
                InsertOptions = @($childTemplateIds["NavigationLinkItem"]);
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Navigation & CTA"; Name = "NavigationLinks"; Type = "Multilist"; Source = "query:./*[@@templatename='NavigationLinkItem']"; Hint = "Ordered top-level navigation links." },
                    @{ Section = "Navigation & CTA"; Name = "DesktopCtaLink"; Type = "General Link"; Hint = "Header CTA button (Appointment)." },
                    @{ Section = "Navigation & CTA"; Name = "MobileCtaLink"; Type = "General Link"; Hint = "Mobile drawer CTA button (Make an Appointment)." }
                )
            },
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title)
                Name = "Procedure"; Icon = "Office/32x32/navigate_Open.png";
                Inherits = @("_BaseSectionHeading");
                InsertOptions = @($childTemplateIds["ProcedureStepItem"]);
                StandardValues = @{ Subtitle = "Procedure"; Title = "How It Works" };
                Fields = @(
                    @{ Section = "Procedure Content"; Name = "Steps"; Type = "Multilist"; Source = "query:./*[@@templatename='ProcedureStepItem']"; Hint = "Ordered 4-step process items." }
                )
            },
            @{
                # Inherits _BasePagination (PageSize, TotalPages, TotalResults)
                Name = "ProductCatalog"; Icon = "Office/32x32/shopping_cart.png";
                Inherits = @("_BasePagination");
                InsertOptions = @($childTemplateIds["ProductItem"]);
                StandardValues = @{ PageSize = "9"; TotalPages = "4"; TotalResults = "24" };
                Fields = @(
                    @{ Section = "Catalog Configuration"; Name = "Products"; Type = "Multilist"; Source = "query:./*[@@templatename='ProductItem']"; Hint = "Products displayed in the catalog grid." }
                )
            },
            @{
                # Only 1 heading field -> No Base Template inheritance
                Name = "ProductSidebar"; Icon = "Office/32x32/funnel.png";
                Inherits = @();
                InsertOptions = @($childTemplateIds["ProductCategoryItem"]);
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Sidebar Filters"; Name = "SearchHeading"; Type = "Single-Line Text"; Default = "Search Products"; Hint = "Heading above the product search input." },
                    @{ Section = "Sidebar Filters"; Name = "SearchPlaceholder"; Type = "Single-Line Text"; Default = "Search..."; Hint = "Placeholder text inside search box." },
                    @{ Section = "Sidebar Filters"; Name = "Categories"; Type = "Multilist"; Source = "query:./*[@@templatename='ProductCategoryItem']"; Hint = "Filterable product categories." },
                    @{ Section = "Sidebar Filters"; Name = "EnablePriceFilter"; Type = "Checkbox"; Default = "1"; Hint = "Toggles the PriceFilterWidget visibility." }
                )
            },
            @{
                Name = "ServicesGrid"; Icon = "Office/32x32/hand_shake.png";
                Inherits = @();
                InsertOptions = @($childTemplateIds["ServiceItem"]);
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Services Catalog"; Name = "Services"; Type = "Multilist"; Source = "query:./*[@@templatename='ServiceItem']"; Hint = "Service cards rendered in the 3-column Services page grid." }
                )
            },
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title)
                Name = "ServicesPreview"; Icon = "Office/32x32/Flash_light.png";
                Inherits = @("_BaseSectionHeading");
                InsertOptions = @($childTemplateIds["ServiceItem"]);
                StandardValues = @{ Subtitle = "What We Do"; Title = "Our Core Offerings" };
                Fields = @(
                    @{ Section = "Preview Section"; Name = "FeaturedServices"; Type = "Multilist"; Source = "query:./*[@@templatename='ServiceItem']"; Hint = "Top 3 core service items highlighted on the home page." }
                )
            },
            @{
                # Only 1 image field -> No Base Template inheritance
                Name = "StatsSection"; Icon = "Office/32x32/chart_line.png";
                Inherits = @();
                InsertOptions = @($childTemplateIds["StatItem"]);
                StandardValues = @{};
                Fields = @(
                    @{ Section = "Statistics Content"; Name = "BackgroundImage"; Type = "Image"; Source = ""; Hint = "Dark-overlay background photo behind stat counters." },
                    @{ Section = "Statistics Content"; Name = "Stats"; Type = "Multilist"; Source = "query:./*[@@templatename='StatItem']"; Hint = "Up to 4 StatItem counter datasources." }
                )
            },
            @{
                # Inherits _BaseSectionHeading (Subtitle, Title)
                Name = "Testimonials"; Icon = "Office/32x32/comment_edit.png";
                Inherits = @("_BaseSectionHeading");
                InsertOptions = @($childTemplateIds["TestimonialItem"]);
                StandardValues = @{ Subtitle = "Testimonials"; Title = "Success Stories" };
                Fields = @(
                    @{ Section = "Testimonials Section"; Name = "TestimonialsList"; Type = "Multilist"; Source = "query:./*[@@templatename='TestimonialItem']"; Hint = "Selected client testimonial items." }
                )
            }
        )

        $organismTemplates = @{}
        foreach ($org in $organisms) {
            $resolvedBaseIds = @()
            foreach ($baseName in $org.Inherits) {
                if ($baseTemplateIds.ContainsKey($baseName)) {
                    $resolvedBaseIds += $baseTemplateIds[$baseName]
                }
            }

            $orgTpl = Ensure-SitecoreTemplate `
                -ParentPath $OrganismsPath `
                -TemplateName $org.Name `
                -Icon $org.Icon `
                -BaseTemplateIds $resolvedBaseIds `
                -InsertOptionIds $org.InsertOptions

            $orgTplPath = "master:$($orgTpl.Paths.FullPath)"
            $organismTemplates[$org.Name] = @{ Path = $orgTpl.Paths.FullPath; Icon = $org.Icon }
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

            if (($org.StandardValues) -and ($org.StandardValues.Count -gt 0)) {
                Set-TemplateStandardValues -TemplatePath $orgTplPath -Values $org.StandardValues
            }
        }

        # ====================================================================
        # 7. EXAMPLE: HOW TO ADD ANOTHER FIELD WITH SITECORE AI INFORMATION
        # ====================================================================
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

        # ====================================================================
        # 8. CREATE JSON RENDERINGS (1:1 WITH ORGANISM TEMPLATES)
        #    master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster
        # ====================================================================
        $renderingsProjectPath = Split-Path -Path $RenderingsRootPath -Parent
        if (-not (Test-Path -Path $renderingsProjectPath)) {
            Ensure-TemplateFolder -ParentPath (Split-Path -Path $renderingsProjectPath -Parent) -FolderName "Project" -FolderTemplateId $RenderingFolderId | Out-Null
        }
        Ensure-TemplateFolder -ParentPath $renderingsProjectPath -FolderName "Corporate" -FolderTemplateId $RenderingFolderId | Out-Null
        Ensure-TemplateFolder -ParentPath $RenderingsRootPath -FolderName $TenantName -FolderTemplateId $RenderingFolderId | Out-Null

        # Per-rendering overrides. Any key here replaces the default value below.
        # Edit this table to change a rendering's fields; re-run to apply (idempotent).
        $renderingOverrides = @{
            Navbar = @{ "Datasource Location" = "$DataRootQuery/Global|$DataRootQuery" }
            Footer = @{ "Datasource Location" = "$DataRootQuery/Global|$DataRootQuery" }
        }

        $renderingIds = @()
        foreach ($org in $organisms) {
            $tpl = $organismTemplates[$org.Name]

            $renderingFields = @{
                "componentName"               = $org.Name   # MUST match the Next.js component name (src/components/organisms/*.tsx)
                "Datasource Template"         = $tpl.Path
                "Datasource Location"         = "$DataRootQuery/$($org.Name)|$DataRootQuery"
                "Parameters Template"         = ""
                "Rendering Contents Resolver" = ""          # Empty = default Datasource Resolver (serializes Multilist children)
                "Editable"                    = "1"
                "Open Properties after Add"   = "0"
                "__Icon"                      = $tpl.Icon
            }

            if ($renderingOverrides.ContainsKey($org.Name)) {
                foreach ($kvp in $renderingOverrides[$org.Name].GetEnumerator()) {
                    $renderingFields[$kvp.Key] = $kvp.Value
                }
            }

            $renderingItem = Ensure-JsonRendering -ParentPath $RenderingsPath -RenderingName $org.Name -Fields $renderingFields
            $renderingIds += $renderingItem.ID.ToString()
        }

        # ====================================================================
        # 9. CREATE SITE PRESENTATION + AVAILABLE RENDERINGS
        #    master:/sitecore/content/Corporate/FitLife/Presentation/Available Renderings/FitnessMaster
        #    -> Lists every rendering above so authors can add them in Pages / Experience Editor.
        # ====================================================================
        $tenantTplId     = Resolve-TemplateId -TemplatePath $HeadlessTenantTemplatePath -FallbackId $CommonFolderId
        $siteTplId       = Resolve-TemplateId -TemplatePath $HeadlessSiteTemplatePath -FallbackId $CommonFolderId
        $presentationId  = Resolve-TemplateId -TemplatePath $PresentationTemplatePath -FallbackId $CommonFolderId
        $arFolderTplId   = Resolve-TemplateId -TemplatePath $AvailableRenderingsFolderTplPath -FallbackId $CommonFolderId
        $arItemTplId     = Resolve-TemplateId -TemplatePath $AvailableRenderingsTplPath

        Ensure-ContentItem -ParentPath $ContentRootPath -ItemName $SiteCollectionName -TemplateId $tenantTplId | Out-Null
        Ensure-ContentItem -ParentPath "$ContentRootPath/$SiteCollectionName" -ItemName $SiteName -TemplateId $siteTplId | Out-Null
        Ensure-ContentItem -ParentPath $SitePath -ItemName "Presentation" -TemplateId $presentationId | Out-Null
        Ensure-ContentItem -ParentPath $PresentationPath -ItemName "Available Renderings" -TemplateId $arFolderTplId | Out-Null
        $availableRenderingsItem = Ensure-ContentItem -ParentPath $AvailableRenderingsPath -ItemName $AvailableRenderingsItemName -TemplateId $arItemTplId

        $availableRenderingsItem.Editing.BeginEdit() | Out-Null
        $availableRenderingsItem["Renderings"] = ($renderingIds -join "|")
        $availableRenderingsItem.Editing.EndEdit() | Out-Null
        Write-Host "[+] Assigned $($renderingIds.Count) renderings to: $AvailableRenderingsPath/$AvailableRenderingsItemName" -ForegroundColor Green

    } # End BulkUpdateContext

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Successfully provisioned all FitnessMaster Sitecore Templates!" -ForegroundColor Green
    Write-Host "     Root Path : $TenantRootPath" -ForegroundColor Green
    Write-Host "     Base      : 8 Multi-Field Base Templates (>= 2 fields each)" -ForegroundColor Green
    Write-Host "     Items     : 11 Datasource Item Templates" -ForegroundColor Green
    Write-Host "     Organisms : 19 Organism Component Templates" -ForegroundColor Green
    Write-Host "     Renderings: 19 Json Renderings -> $RenderingsPath" -ForegroundColor Green
    Write-Host "     Available : $AvailableRenderingsPath/$AvailableRenderingsItemName" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning Sitecore AI Templates: $($_.Exception.Message)" -ForegroundColor Red
    throw
}
