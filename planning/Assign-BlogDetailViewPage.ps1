<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Provision BlogDetailView Template, Rendering, and Assign to Page
.DESCRIPTION
    Fully provisions the Blog Detail View infrastructure and sample content page in Sitecore XM Cloud:
      1. Provisions the Datasource Template:
         master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems/BlogPostItem
         Grouped into 5 clean editorial sections containing all 26 fields:
           - Editorial Header: Title, Subtitle, Excerpt, Description, CoverImage, ImageCaption
           - Article Content: KeyTakeaways, ContentBody, SectionsJson
           - Author Details: Author (Droplink), AuthorName, AuthorRole, AuthorCredentials, AuthorAvatar, AuthorBio
           - Taxonomy & Classification: ArticleId, Slug, Category, FitnessLevel, Tags, ReadTime
           - Publishing Dates & Metrics: PublishDate, PublishedDate, UpdatedDate, DisplayDay, DisplayMonth, CommentCount

      2. Provisions the Headless JSON Rendering:
         master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster/BlogDetailView
         - componentName       : "BlogDetailView"
         - Placeholder         : "headless-main"
         - Datasource Location : query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Posts
         - Datasource Template : .../DatasourceItems/BlogPostItem

      3. Registers BlogDetailView in the SXA Available Renderings toolbox (Presentation/Available Renderings/FitnessMaster).

      4. Provisions the sample Blog Detail page under /Home/Blog:
         Route: master:/sitecore/content/Corporate/fitlifecoach/Home/Blog/creatine-monohydrate-the-science-backed-hypertrophy-supplement
         Datasource: master:/sitecore/content/Corporate/fitlifecoach/Data/Blog/Posts/creatine-monohydrate-the-science-backed-hypertrophy-supplement
         Populated with the exact provided field data.

      5. Binds BlogDetailView to "headless-main" on the page Final Layout, and connects global Header and Footer.

    Idempotent: Safe to re-run. Updates templates, field schemas, and layouts without duplication.
.NOTES
    Target Environment : Sitecore XM Cloud / Sitecore XP with SPE (Execute in Sitecore ISE)
    Encoding           : ASCII-safe
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# 1. CONFIGURATION & CONSTANTS
# ============================================================================
$TemplateFolderId   = "{0437FEE2-44C9-46A6-ABE9-28858D9FEE8C}"
$TemplateItemId     = "{AB86861A-6030-46C5-B394-E8F99E8B87DB}"
$TemplateSectionId  = "{E269FBB5-3750-427A-9149-7AA950B49301}"
$TemplateFieldId    = "{455A3E98-A627-4B40-8035-E683A0331AC7}"
$StandardTemplateId = "{1930BBEB-7805-471A-A3BE-4858AC7CF696}"
$JsonRenderingId    = "{04646A89-996F-4EE7-878A-FFDBF1F0EF0D}"
$CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"

# Paths
$ProjectRootPath    = "master:/sitecore/templates/Project/Corporate"
$TenantName         = "FitnessMaster"
$TenantRootPath     = "$ProjectRootPath/$TenantName"
$DatasourceTplPath  = "$TenantRootPath/DatasourceItems"
$OrganismsPath      = "$TenantRootPath/Organisms"
$HeadlessPageTpl    = "master:/sitecore/templates/Foundation/JSS Experience Accelerator/Presentation/Page"

$RenderingsRootPath = "master:/sitecore/layout/Renderings/Project/Corporate"
$RenderingsPath     = "$RenderingsRootPath/$TenantName"

$SitePath           = "master:/sitecore/content/Corporate/fitlifecoach"
$HomePath           = "$SitePath/Home"
$BlogPath           = "$HomePath/Blog"
$DataPath           = "$SitePath/Data"
$BlogDataPath       = "$DataPath/Blog"
$BlogPostsDataPath  = "$BlogDataPath/Posts"

$PresentationPath       = "$SitePath/Presentation"
$AvailableRenderingsPath = "$PresentationPath/Available Renderings"

$MainPlaceholder    = "headless-main"
$HeaderPlaceholder  = "headless-header"
$FooterPlaceholder  = "headless-footer"

# ============================================================================
# 2. HELPER FUNCTIONS
# ============================================================================

function ConvertTo-ItemName {
    param([Parameter(Mandatory = $true)][string]$Text)
    $name = $Text -replace "&", "and" -replace "[^\w\s\-]", ""
    return ($name -replace "\s+", " ").Trim()
}

function Ensure-TemplateFolder {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$FolderName
    )
    $fullPath = "$ParentPath/$FolderName"
    if (Test-Path -Path $fullPath) {
        return Get-Item -Path $fullPath
    }
    Write-Host "[+] Creating Template Folder: $fullPath" -ForegroundColor Cyan
    return New-Item -Path $ParentPath -Name $FolderName -ItemType $TemplateFolderId
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
    } else {
        $sectionItem = New-Item -Path $TemplatePath -Name $SectionName -ItemType $TemplateSectionId
    }
    $sectionItem.Editing.BeginEdit() | Out-Null
    $sectionItem["__Sortorder"] = $SortOrder.ToString()
    $sectionItem.Editing.EndEdit() | Out-Null
    return $sectionItem
}

function Add-SitecoreField {
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
        [string]$DefaultValue = ""
    )

    $sectionItem = Ensure-TemplateSection -TemplatePath $TemplatePath -SectionName $SectionName -SortOrder $SectionSortOrder
    $sectionPath = $sectionItem.Paths.FullPath
    $fieldPath   = "master:$sectionPath/$FieldName"

    if (Test-Path -Path $fieldPath) {
        $fieldItem = Get-Item -Path $fieldPath
        Write-Host "    [i] Updating field: $FieldName ($FieldType)" -ForegroundColor DarkGray
    } else {
        $fieldItem = New-Item -Path "master:$sectionPath" -Name $FieldName -ItemType $TemplateFieldId
        Write-Host "    [+] Created field: $FieldName ($FieldType)" -ForegroundColor Green
    }

    $effectiveTitle = if ($FieldTitle) { $FieldTitle } else { $FieldName }

    $fieldItem.Editing.BeginEdit() | Out-Null
    $fieldItem["Type"]                = $FieldType
    $fieldItem["Title"]               = $effectiveTitle
    $fieldItem["Source"]              = $Source
    $fieldItem["__Sortorder"]         = $SortOrder.ToString()
    if ($AIPromptHint) {
        $fieldItem["__Short description"] = $AIPromptHint
        $fieldItem["__Long description"]  = "Sitecore AI Prompt: $AIPromptHint"
    }
    $fieldItem.Editing.EndEdit() | Out-Null

    $stdValuesPath = "$TemplatePath/__Standard Values"
    if (($DefaultValue) -and (Test-Path -Path $stdValuesPath)) {
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
        [string]$Icon = "Office/32x32/document_text.png",
        [string[]]$BaseTemplateIds = @()
    )

    $templatePath = "$ParentPath/$TemplateName"
    if (Test-Path -Path $templatePath) {
        $templateItem = Get-Item -Path $templatePath
        Write-Host "[i] Template exists: $templatePath" -ForegroundColor Yellow
    } else {
        $templateItem = New-Item -Path $ParentPath -Name $TemplateName -ItemType $TemplateItemId
        Write-Host "[+] Created Template: $templatePath" -ForegroundColor Green
    }

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

    # Ensure Standard Values item
    $stdValuesPath = "$templatePath/__Standard Values"
    if (-not (Test-Path -Path $stdValuesPath)) {
        $stdValuesItem = New-Item -Path $templatePath -Name "__Standard Values" -ItemType $templateItem.ID.ToString()
    } else {
        $stdValuesItem = Get-Item -Path $stdValuesPath
    }

    $stdValuesItem.Editing.BeginEdit() | Out-Null
    $stdValuesItem["__Icon"] = $Icon
    $stdValuesItem.Editing.EndEdit() | Out-Null

    $templateItem.Editing.BeginEdit() | Out-Null
    $templateItem["__Standard values"] = $stdValuesItem.ID.ToString()
    $templateItem.Editing.EndEdit() | Out-Null

    return $templateItem
}

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
    } else {
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

function Ensure-Item {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$TemplateId
    )
    $itemName = ConvertTo-ItemName -Text $Name
    $itemPath = "$ParentPath/$itemName"
    if (Test-Path -Path $itemPath) {
        return Get-Item -Path $itemPath
    }
    Write-Host "[+] Creating item: $itemPath" -ForegroundColor Cyan
    return New-Item -Path $ParentPath -Name $itemName -ItemType $TemplateId
}

function Set-ItemFields {
    param(
        [Parameter(Mandatory = $true)]$Item,
        [Parameter(Mandatory = $true)][hashtable]$Fields
    )
    $Item.Editing.BeginEdit() | Out-Null
    foreach ($kvp in $Fields.GetEnumerator()) {
        if ($null -eq $Item.Fields[$kvp.Key]) {
            Write-Warning "[WARN] Field '$($kvp.Key)' not found on '$($Item.Paths.FullPath)'. Skipped."
            continue
        }
        $Item[$kvp.Key] = $kvp.Value
    }
    $Item.Editing.EndEdit() | Out-Null
}

function Assign-OrUpdateRendering {
    param(
        [Parameter(Mandatory = $true)]$TargetItem,
        [Parameter(Mandatory = $true)][string]$RenderingPath,
        [Parameter(Mandatory = $true)][string]$DatasourceId,
        [Parameter(Mandatory = $true)][string]$Placeholder,
        [Parameter(Mandatory = $true)]$Device
    )

    if (-not (Test-Path -Path $RenderingPath)) {
        Write-Warning "[WARN] Rendering item not found: $RenderingPath. Skipped."
        return
    }
    $renderingItem = Get-Item -Path $RenderingPath

    $existing = @(Get-Rendering -Item $TargetItem -Rendering $renderingItem -Device $Device -FinalLayout -ErrorAction SilentlyContinue)
    if ($existing.Count -gt 0) {
        foreach ($instance in $existing) {
            $instance.Datasource  = $DatasourceId
            $instance.Placeholder = $Placeholder
            Set-Rendering -Item $TargetItem -Instance $instance -FinalLayout
        }
        Write-Host "     [i] Rebound rendering: $($renderingItem.Name) -> $Placeholder" -ForegroundColor Yellow
    }
    else {
        $instance = $renderingItem | New-Rendering -Placeholder $Placeholder
        Add-Rendering -Item $TargetItem -Instance $instance -Placeholder $Placeholder -DataSource $DatasourceId -Device $Device -FinalLayout
        Write-Host "     [+] Bound rendering: $($renderingItem.Name) -> $Placeholder" -ForegroundColor Green
    }
}

# ============================================================================
# 3. SAMPLE BLOG ARTICLE DATA SPECIFICATION (26 FIELDS)
# ============================================================================

$SampleSectionsJson = @"
[
  {
    "id": "section-sodium-dynamics",
    "heading": "1. Sodium Mechanics: Plasma Volume and Muscular Force",
    "paragraphs": [
      "Sodium is the primary extracellular electrolyte responsible for maintaining osmotic pressure and systemic blood volume. When sodium concentrations drop during intense physical exertion, blood volume decreases, causing heart rate elevation for the same relative athletic output (cardiac drift).",
      "Furthermore, the sodium-potassium pump (Na+/K+-ATPase) generates the electrochemical gradient required for motor neuron firing and skeletal muscle fiber recruitment."
    ],
    "bulletPoints": [
      "Target 500mg - 1,000mg of elemental sodium per liter of intra-workout hydration.",
      "Heavy or 'salty' sweaters can lose upwards of 1,500mg to 2,000mg of sodium per hour in humid environments.",
      "Consuming sodium 30 minutes pre-workout enhances cellular fluid retention and intramuscular pump."
    ],
    "callout": {
      "type": "quote",
      "title": "Dietitian Warning",
      "text": "Drinking large volumes of pure, distilled, or mineral-depleted water without adequate sodium causes hemodilution, precipitating early muscular cramping and hyponatremia.",
      "author": "Dr. Elena Rostova, PhD, RD, CSSD"
    }
  },
  {
    "id": "section-potassium-synergy",
    "heading": "2. Potassium: The Intracellular Counterbalance & Glycogen Uptake",
    "paragraphs": [
      "While sodium dominates extracellular fluid, over 98% of total body potassium resides inside your cells. Potassium works in direct tandem with sodium to repolarize membranes after muscle contractions.",
      "Additionally, skeletal muscle stores approximately 19.5mg of potassium alongside every single gram of stored glycogen. Chronic potassium deficit prevents muscles from holding full glycogen reserves."
    ],
    "image": {
      "url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
      "alt": "Whole food potassium sources including bananas, avocado, and leafy greens",
      "caption": "Potassium is best replenished through nutrient-dense whole foods like coconut water and spinach post-exercise."
    },
    "callout": {
      "type": "tip",
      "title": "Pro Nutrition Tip",
      "text": "Avoid taking high doses of potassium salts during workouts as it can cause rapid gastrointestinal distress. Reserve potassium replenishment for post-training meals.",
      "author": "Coach Alex Rivers"
    }
  },
  {
    "id": "section-hydration-protocols",
    "heading": "3. Tactical Intra-Workout Hydration Formulation",
    "paragraphs": [
      "For sessions under 60 minutes in temperature-controlled gyms, plain water or light mineral water is typically sufficient. However, for sessions exceeding 75 minutes, endurance sessions, or high-sweat environments, formulate your hydration with the optimal 3:1 or 4:1 sodium-to-potassium ratio."
    ],
    "bulletPoints": [
      "Pre-Session: 16oz water + 400mg sodium 30-45 minutes before warmups.",
      "Intra-Session: Sip 20-24oz water + 700mg sodium + 150mg potassium per hour.",
      "Post-Session: Replace 125% to 150% of sweat weight lost within 2 hours alongside a carbohydrate meal."
    ]
  }
]
"@

$SampleArticleData = @{
    Title            = "Creatine Monohydrate: The Science-Backed Hypertrophy Supplement"
    Subtitle         = "Deconstructing phosphocreatine resynthesis, cellular hydration, and cognitive performance benefits."
    Excerpt          = "Learn how creatine monohydrate saturates muscular energy pathways to increase power output and cell volumization."
    Description      = "Comprehensive clinical analysis of phosphocreatine resynthesis, strength progression, and intra-workout fluid balance."
    CoverImage       = "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1200&auto=format&fit=crop"
    ImageCaption     = "Pure micronized creatine monohydrate dissolving into water for optimal bioavailability."
    KeyTakeaways     = "Creatine monohydrate is the most clinically validated ergogenic aid in sports nutrition history.`nA daily dose of 5 grams saturates intramuscular phosphocreatine stores within 3 to 4 weeks without a loading phase.`nIntracellular water retention increases muscular leverage and signals anabolic cascades.`nCreatine also supports neurological ATP recycling, reducing cognitive fatigue under sleep restriction."
    ContentBody      = ""
    SectionsJson     = $SampleSectionsJson
    Author           = ""
    AuthorName       = "Dr. Elena Rostova"
    AuthorRole       = "Lead Clinical Sports Dietitian"
    AuthorCredentials= "PhD, RD, CSSD"
    AuthorAvatar     = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    AuthorBio        = "Specializing in athletic metabolic efficiency, gut microbiome health, and targeted nutrient timing for body recomposition and chronic recovery."
    PublishDate      = "2026-11-18T00:00:00Z"
    PublishedDate    = "February 08, 2026"
    UpdatedDate      = "Updated recently"
    DisplayDay       = "08"
    DisplayMonth     = "Feb"
    CommentCount     = 0
    ArticleId        = "2"
    Slug             = "creatine-monohydrate-the-science-backed-hypertrophy-supplement"
    ReadTime         = "6 min read"
    Tags             = "Nutrition & Diet, Electrolytes, Hydration, Endurance, Performance"
    Category         = "Nutrition & Diet"
    FitnessLevel     = "Beginner"
}

# ============================================================================
# 4. EXECUTION PIPELINE
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Provisioning BlogDetailView Template, Rendering & Page" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    # 4.1 Validate root trees
    if (-not (Test-Path -Path $SitePath)) {
        throw "Site path not found: $SitePath. Verify Sitecore content hierarchy."
    }
    if (-not (Test-Path -Path $HomePath)) {
        throw "Home page not found: $HomePath. Please create the Home item first."
    }

    # Ensure parent template folders
    Ensure-TemplateFolder -ParentPath $ProjectRootPath -FolderName $TenantName | Out-Null
    Ensure-TemplateFolder -ParentPath $TenantRootPath -FolderName "DatasourceItems" | Out-Null
    Ensure-TemplateFolder -ParentPath $TenantRootPath -FolderName "Organisms" | Out-Null
    Ensure-TemplateFolder -ParentPath $RenderingsRootPath -FolderName $TenantName | Out-Null

    # ------------------------------------------------------------------------
    # 4.2 PROVISION BLOGPOSTITEM DATASOURCE TEMPLATE (ALL 26 FIELDS IN 5 GROUPS)
    # ------------------------------------------------------------------------
    Write-Host "`n--- 1. Provisioning BlogPostItem Template (26 Fields) ---" -ForegroundColor White
    $blogPostTpl = Ensure-SitecoreTemplate -ParentPath $DatasourceTplPath -TemplateName "BlogPostItem" `
        -Icon "Office/32x32/document_text.png"
    $blogPostTplPath = $blogPostTpl.Paths.FullPath

    # Group 1: Editorial Header
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -SectionSortOrder 100 `
        -FieldName "Title" -FieldType "Single-Line Text" -SortOrder 10 -AIPromptHint "High impact editorial article title."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -SectionSortOrder 100 `
        -FieldName "Subtitle" -FieldType "Single-Line Text" -SortOrder 20 -AIPromptHint "Subheadline expanding on the core benefit."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -SectionSortOrder 100 `
        -FieldName "Excerpt" -FieldType "Multi-Line Text" -SortOrder 30 -AIPromptHint "Concise summary for previews and social sharing."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -SectionSortOrder 100 `
        -FieldName "Description" -FieldType "Multi-Line Text" -SortOrder 40 -AIPromptHint "Long form editorial overview or meta description."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -SectionSortOrder 100 `
        -FieldName "CoverImage" -FieldType "Single-Line Text" -SortOrder 50 -AIPromptHint "Cover image CDN URL or media library path."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -SectionSortOrder 100 `
        -FieldName "ImageCaption" -FieldType "Single-Line Text" -SortOrder 60 -AIPromptHint "Photographer accreditation and image caption."

    # Group 2: Article Content
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Article Content" -SectionSortOrder 200 `
        -FieldName "KeyTakeaways" -FieldType "Multi-Line Text" -SortOrder 10 -AIPromptHint "Bullet points of key findings (one per line)."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Article Content" -SectionSortOrder 200 `
        -FieldName "ContentBody" -FieldType "Rich Text" -SortOrder 20 -AIPromptHint "Full rich HTML body with paragraphs and callouts."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Article Content" -SectionSortOrder 200 `
        -FieldName "SectionsJson" -FieldType "Multi-Line Text" -SortOrder 30 -AIPromptHint "JSON structured array of sections, bullet points, and callouts."

    # Group 3: Author Details
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -SectionSortOrder 300 `
        -FieldName "Author" -FieldType "Droplink" -Source "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Authors/*" -SortOrder 10 `
        -AIPromptHint "Linked author item reference from the site data repository."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -SectionSortOrder 300 `
        -FieldName "AuthorName" -FieldType "Single-Line Text" -SortOrder 20 -AIPromptHint "Author full display name."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -SectionSortOrder 300 `
        -FieldName "AuthorRole" -FieldType "Single-Line Text" -SortOrder 30 -AIPromptHint "Author professional title or coaching discipline."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -SectionSortOrder 300 `
        -FieldName "AuthorCredentials" -FieldType "Single-Line Text" -SortOrder 40 -AIPromptHint "Professional certifications (CSCS, RD, CSSD)."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -SectionSortOrder 300 `
        -FieldName "AuthorAvatar" -FieldType "Single-Line Text" -SortOrder 50 -AIPromptHint "Author portrait image URL."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -SectionSortOrder 300 `
        -FieldName "AuthorBio" -FieldType "Multi-Line Text" -SortOrder 60 -AIPromptHint "Author biographical summary."

    # Group 4: Taxonomy & Classification
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Taxonomy & Classification" -SectionSortOrder 400 `
        -FieldName "ArticleId" -FieldType "Single-Line Text" -SortOrder 10 -AIPromptHint "Unique numerical or alphanumeric identifier."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Taxonomy & Classification" -SectionSortOrder 400 `
        -FieldName "Slug" -FieldType "Single-Line Text" -SortOrder 20 -AIPromptHint "URL friendly route slug."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Taxonomy & Classification" -SectionSortOrder 400 `
        -FieldName "Category" -FieldType "Single-Line Text" -SortOrder 30 -AIPromptHint "Primary category classification."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Taxonomy & Classification" -SectionSortOrder 400 `
        -FieldName "FitnessLevel" -FieldType "Single-Line Text" -SortOrder 40 -AIPromptHint "Target training level (Beginner, Intermediate, Advanced, All Levels)."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Taxonomy & Classification" -SectionSortOrder 400 `
        -FieldName "Tags" -FieldType "Single-Line Text" -SortOrder 50 -AIPromptHint "Comma separated tags for search and discovery."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Taxonomy & Classification" -SectionSortOrder 400 `
        -FieldName "ReadTime" -FieldType "Single-Line Text" -SortOrder 60 -AIPromptHint "Estimated reading duration (e.g. 6 min read)."

    # Group 5: Publishing Dates & Metrics
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Publishing Dates & Metrics" -SectionSortOrder 500 `
        -FieldName "PublishDate" -FieldType "Datetime" -SortOrder 10 -AIPromptHint "ISO 8601 publication timestamp."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Publishing Dates & Metrics" -SectionSortOrder 500 `
        -FieldName "PublishedDate" -FieldType "Single-Line Text" -SortOrder 20 -AIPromptHint "Formatted display date (e.g. February 08, 2026)."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Publishing Dates & Metrics" -SectionSortOrder 500 `
        -FieldName "UpdatedDate" -FieldType "Single-Line Text" -SortOrder 30 -AIPromptHint "Revision status note."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Publishing Dates & Metrics" -SectionSortOrder 500 `
        -FieldName "DisplayDay" -FieldType "Single-Line Text" -SortOrder 40 -AIPromptHint "Two-digit calendar day badge (e.g. 08)."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Publishing Dates & Metrics" -SectionSortOrder 500 `
        -FieldName "DisplayMonth" -FieldType "Single-Line Text" -SortOrder 50 -AIPromptHint "Three-letter calendar month badge (e.g. Feb)."
    Add-SitecoreField -TemplatePath "master:$blogPostTplPath" -SectionName "Publishing Dates & Metrics" -SectionSortOrder 500 `
        -FieldName "CommentCount" -FieldType "Integer" -SortOrder 60 -AIPromptHint "Active comment count." -DefaultValue "0"

    Write-Host "[+] Configured BlogPostItem template with 26 fields across 5 groups." -ForegroundColor Green

    # ------------------------------------------------------------------------
    # 4.3 PROVISION BLOGDETAILVIEW JSON RENDERING
    # ------------------------------------------------------------------------
    Write-Host "`n--- 2. Provisioning BlogDetailView JSON Rendering ---" -ForegroundColor White
    $blogDetailRendering = Ensure-JsonRendering -ParentPath $RenderingsPath -RenderingName "BlogDetailView" -Fields @{
        "componentName"       = "BlogDetailView"
        "Datasource Location" = "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Posts"
        "Datasource Template" = $blogPostTplPath
        "Parameters Template" = ""
        "Placeholder"         = $MainPlaceholder
    }
    Write-Host "[+] Configured BlogDetailView JSON Rendering: $($blogDetailRendering.Paths.FullPath)" -ForegroundColor Green

    # ------------------------------------------------------------------------
    # 4.4 REGISTER IN AVAILABLE RENDERINGS (SXA TOOLBOX)
    # ------------------------------------------------------------------------
    if (Test-Path -Path $AvailableRenderingsPath) {
        $availGroup = Get-Item -Path "$AvailableRenderingsPath/FitnessMaster" -ErrorAction SilentlyContinue
        if ($availGroup) {
            $existingRenderings = @($availGroup["Renderings"] -split "\|" | Where-Object { $_ -ne "" })
            $renderingId = $blogDetailRendering.ID.ToString()
            if ($existingRenderings -notcontains $renderingId) {
                $existingRenderings += $renderingId
                $availGroup.Editing.BeginEdit() | Out-Null
                $availGroup["Renderings"] = ($existingRenderings -join "|")
                $availGroup.Editing.EndEdit() | Out-Null
                Write-Host "[+] Registered BlogDetailView in SXA Available Renderings toolbox." -ForegroundColor Green
            }
        }
    }

    # ------------------------------------------------------------------------
    # 4.5 PROVISION DATA CONTAINER & SAMPLE BLOG DETAIL PAGE
    # ------------------------------------------------------------------------
    Write-Host "`n--- 3. Provisioning Blog Detail Route Page & Datasource ---" -ForegroundColor White

    # Ensure Data/Blog and Data/Blog/Posts exist
    $dataFolder      = Ensure-Item -ParentPath $SitePath -Name "Data" -TemplateId $CommonFolderId
    $blogDataFolder  = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Blog" -TemplateId $CommonFolderId
    $postsDataFolder = Ensure-Item -ParentPath "master:$($blogDataFolder.Paths.FullPath)" -Name "Posts" -TemplateId $CommonFolderId

    $homeItem   = Get-Item -Path $HomePath
    $device     = Get-LayoutDevice -Default
    $homeLayout = Get-Layout -Item $homeItem -Device $device -ErrorAction SilentlyContinue

    # Resolve Page template
    $pageTemplateId = if (Test-Path -Path $HeadlessPageTpl) {
        (Get-Item -Path $HeadlessPageTpl).ID.ToString()
    } else {
        $homeItem.TemplateID.ToString()
    }

    # Ensure parent /Home/Blog exists
    $blogParentItem = Ensure-Item -ParentPath $HomePath -Name "Blog" -TemplateId $pageTemplateId
    if ($homeLayout -and -not (Get-Layout -Item $blogParentItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $blogParentItem -Device $device -Layout $homeLayout
    }

    # Provision sample article route: /Home/Blog/creatine-monohydrate-the-science-backed-hypertrophy-supplement
    $sampleSlug = $SampleArticleData.Slug
    $samplePageItem = Ensure-Item -ParentPath $BlogPath -Name $sampleSlug -TemplateId $pageTemplateId

    # Assign layout to page
    if ($homeLayout -and -not (Get-Layout -Item $samplePageItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $samplePageItem -Device $device -Layout $homeLayout
        Write-Host "[+] Assigned Headless Layout to article page: $sampleSlug" -ForegroundColor Green
    }

    # Set page display name & title
    $samplePageItem.Editing.BeginEdit() | Out-Null
    $samplePageItem["__Display Name"] = $SampleArticleData.Title
    if ($null -ne $samplePageItem.Fields["Title"]) {
        $samplePageItem["Title"] = $SampleArticleData.Title
    }
    if ($null -ne $samplePageItem.Fields["NavigationTitle"]) {
        $samplePageItem["NavigationTitle"] = $SampleArticleData.Title
    }
    $samplePageItem.Editing.EndEdit() | Out-Null

    # Provision datasource item under Data/Blog/Posts/<slug>
    $dsItem = Ensure-Item -ParentPath "master:$($postsDataFolder.Paths.FullPath)" -Name $sampleSlug -TemplateId $blogPostTpl.ID.ToString()
    Set-ItemFields -Item $dsItem -Fields $SampleArticleData
    Write-Host "[+] Populated 26 fields on datasource: $($dsItem.Paths.FullPath)" -ForegroundColor Green

    # Bind BlogDetailView rendering to headless-main
    Assign-OrUpdateRendering -TargetItem $samplePageItem `
        -RenderingPath $blogDetailRendering.Paths.FullPath `
        -DatasourceId $dsItem.ID.ToString() `
        -Placeholder $MainPlaceholder `
        -Device $device

    # Optional: Connect global Navbar & Footer if present
    $navbarDsItem = Get-Item -Path "$DataPath/Navbar/Global Navbar" -ErrorAction SilentlyContinue
    $footerDsItem = Get-Item -Path "$DataPath/Footer/Global Footer" -ErrorAction SilentlyContinue
    if ($navbarDsItem -and (Test-Path -Path "$RenderingsPath/Navbar")) {
        Assign-OrUpdateRendering -TargetItem $samplePageItem `
            -RenderingPath "$RenderingsPath/Navbar" `
            -DatasourceId $navbarDsItem.ID.ToString() `
            -Placeholder $HeaderPlaceholder `
            -Device $device
    }
    if ($footerDsItem -and (Test-Path -Path "$RenderingsPath/Footer")) {
        Assign-OrUpdateRendering -TargetItem $samplePageItem `
            -RenderingPath "$RenderingsPath/Footer" `
            -DatasourceId $footerDsItem.ID.ToString() `
            -Placeholder $FooterPlaceholder `
            -Device $device
    }

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[SUCCESS] BlogDetailView Template, Rendering & Page Ready!" -ForegroundColor Green
    Write-Host "  Template Path      : $blogPostTplPath" -ForegroundColor Green
    Write-Host "  Fields Defined     : 26 fields grouped in 5 sections" -ForegroundColor Green
    Write-Host "  JSON Rendering     : $($blogDetailRendering.Paths.FullPath)" -ForegroundColor Green
    Write-Host "  Article Route Page : $BlogPath/$sampleSlug" -ForegroundColor Green
    Write-Host "  Datasource Item    : $($dsItem.Paths.FullPath)" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning BlogDetailView: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

