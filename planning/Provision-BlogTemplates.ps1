<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Provision Blog & Blog Details Templates, Renderings & Available Renderings
.DESCRIPTION
    Provisions the Project-layer templates and renderings for the Blog Listing and Blog Details pages under:
      master:/sitecore/templates/Project/Corporate/FitnessMaster

    Hierarchy created:
      1. Base Templates:
         - Base/_BaseBlogPost (ArticleId, Slug, Category, FitnessLevel, ReadTime, PublishedDate, UpdatedDate, Tags)
      2. Datasource Templates:
         - DatasourceItems/BlogAuthor (Name, Role, Credentials, Avatar, Bio)
         - DatasourceItems/BlogPostItem (Inherits _BaseContentBlock, _BaseMediaCta, _BaseBlogPost)
           Fields: Title, Subtitle, Excerpt, Image, ImageCaption, KeyTakeaways, ContentBody, SectionsJson,
                   Author, AuthorName, AuthorRole, AuthorCredentials, AuthorAvatar, AuthorBio,
                   RelatedPosts, CommentsCount
      3. Organisms Templates:
         - Organisms/BlogCatalog (PageSize, DefaultCategory, DefaultLevel, SearchPlaceholder, BlogDataSource)
         - Organisms/BlogDetailView (DisplayTableOfContents, EnableLikes, EnableSharing, ShowAuthorBio, ShowCtaBanner, ShowRelatedPosts)
         - Organisms/BlogCtaBanner (Eyebrow, Heading, Description, PrimaryCtaText, PrimaryCtaLink, SecondaryCtaText, SecondaryCtaLink)
      4. Headless JSON Renderings:
         - master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster/BlogCatalog
         - master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster/BlogDetailView
         - master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster/BlogCtaBanner
      5. Available Renderings:
         - Registers all new renderings into the SXA Toolbox under Available Renderings/FitnessMaster

    Idempotent: updates existing items and layout instances without duplication.
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

$ProjectRootPath    = "master:/sitecore/templates/Project/Corporate"
$TenantName         = "FitnessMaster"
$TenantRootPath     = "$ProjectRootPath/$TenantName"
$BaseFolderPath     = "$TenantRootPath/Base"
$DatasourcePath     = "$TenantRootPath/DatasourceItems"
$OrganismsPath      = "$TenantRootPath/Organisms"

$RenderingsRootPath = "master:/sitecore/layout/Renderings/Project/Corporate"
$RenderingsPath     = "$RenderingsRootPath/$TenantName"

$SitePath           = "master:/sitecore/content/Corporate/fitlifecoach"
$PresentationPath   = "$SitePath/Presentation"
$AvailableRenderingsPath = "$PresentationPath/Available Renderings"

# ============================================================================
# 2. CORE SPE HELPER FUNCTIONS
# ============================================================================

function Ensure-TemplateFolder {
    param(
        [Parameter(Mandatory = $true)][string]$ParentPath,
        [Parameter(Mandatory = $true)][string]$FolderName,
        [string]$FolderTemplateId = $TemplateFolderId
    )
    $fullPath = "$ParentPath/$FolderName"
    if (Test-Path -Path $fullPath) {
        Write-Host "[i] Folder exists: $fullPath" -ForegroundColor Gray
        return Get-Item -Path $fullPath
    }
    Write-Host "[+] Creating Folder: $fullPath" -ForegroundColor Cyan
    return New-Item -Path $ParentPath -Name $FolderName -ItemType $FolderTemplateId
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
    } else {
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

    # Set Default Value on Standard Values if available
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
        [string[]]$BaseTemplateIds = @(),
        [string[]]$InsertOptionIds = @()
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

    # Standard Values
    $stdValuesPath = "$templatePath/__Standard Values"
    if (-not (Test-Path -Path $stdValuesPath)) {
        $stdValuesItem = New-Item -Path $templatePath -Name "__Standard Values" -ItemType $templateItem.ID.ToString()
    } else {
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

# ============================================================================
# 3. PROVISION TEMPLATES
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Starting Sitecore Blog Templates Provisioning" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    Ensure-TemplateFolder -ParentPath $ProjectRootPath -FolderName $TenantName | Out-Null
    Ensure-TemplateFolder -ParentPath $TenantRootPath -FolderName "Base" | Out-Null
    Ensure-TemplateFolder -ParentPath $TenantRootPath -FolderName "DatasourceItems" | Out-Null
    Ensure-TemplateFolder -ParentPath $TenantRootPath -FolderName "Organisms" | Out-Null

    # 3a. Base Template: _BaseBlogPost
    Write-Host "`n--- Base Template: _BaseBlogPost ---" -ForegroundColor White
    $baseBlogPost = Ensure-SitecoreTemplate -ParentPath $BaseFolderPath -TemplateName "_BaseBlogPost" -Icon "Office/32x32/tag.png"
    $baseBlogPostPath = $baseBlogPost.Paths.FullPath

    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "ArticleId" `
        -FieldType "Single-Line Text" -AIPromptHint "Unique numerical or alphanumeric identifier for this article."
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "Slug" `
        -FieldType "Single-Line Text" -AIPromptHint "SEO URL-friendly slug formatted in lowercase with hyphens."
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "Category" `
        -FieldType "Single-Line Text" -AIPromptHint "Article primary category (e.g. Nutrition & Diet, Strength & Conditioning)."
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "FitnessLevel" `
        -FieldType "Single-Line Text" -AIPromptHint "Target training level: Beginner, Intermediate, Advanced, or All Levels." -DefaultValue "All Levels"
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "ReadTime" `
        -FieldType "Single-Line Text" -AIPromptHint "Estimated reading duration, e.g. 5 min read."
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "PublishedDate" `
        -FieldType "Single-Line Text" -AIPromptHint "Formatted display date, e.g. January 01, 2026."
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "UpdatedDate" `
        -FieldType "Single-Line Text" -AIPromptHint "Optional update timestamp badge, e.g. Updated recently."
    Add-SitecoreAIField -TemplatePath "master:$baseBlogPostPath" -SectionName "Blog Classification" -FieldName "Tags" `
        -FieldType "Single-Line Text" -AIPromptHint "Pipe-separated list of topical tags for search and related indexing."

    # Look up existing Base templates if present
    $baseContentBlockId = ""
    $baseMediaCtaId     = ""
    if (Test-Path -Path "$BaseFolderPath/_BaseContentBlock") {
        $baseContentBlockId = (Get-Item -Path "$BaseFolderPath/_BaseContentBlock").ID.ToString()
    }
    if (Test-Path -Path "$BaseFolderPath/_BaseMediaCta") {
        $baseMediaCtaId = (Get-Item -Path "$BaseFolderPath/_BaseMediaCta").ID.ToString()
    }

    # 3b. Datasource Template: BlogAuthor
    Write-Host "`n--- Datasource Template: BlogAuthor ---" -ForegroundColor White
    $authorTpl = Ensure-SitecoreTemplate -ParentPath $DatasourcePath -TemplateName "BlogAuthor" -Icon "Office/32x32/user_athlete.png"
    $authorTplPath = $authorTpl.Paths.FullPath

    Add-SitecoreAIField -TemplatePath "master:$authorTplPath" -SectionName "Author Profile" -FieldName "Name" `
        -FieldType "Single-Line Text" -AIPromptHint "Full professional name of the coach or dietitian."
    Add-SitecoreAIField -TemplatePath "master:$authorTplPath" -SectionName "Author Profile" -FieldName "Role" `
        -FieldType "Single-Line Text" -AIPromptHint "Professional title/specialty, e.g. Head Performance Coach."
    Add-SitecoreAIField -TemplatePath "master:$authorTplPath" -SectionName "Author Profile" -FieldName "Credentials" `
        -FieldType "Single-Line Text" -AIPromptHint "Certifications e.g. CSCS, USAW, PhD, RD."
    Add-SitecoreAIField -TemplatePath "master:$authorTplPath" -SectionName "Author Profile" -FieldName "Avatar" `
        -FieldType "Single-Line Text" -AIPromptHint "URL or Sitecore media path for the author's portrait."
    Add-SitecoreAIField -TemplatePath "master:$authorTplPath" -SectionName "Author Profile" -FieldName "Bio" `
        -FieldType "Multi-Line Text" -AIPromptHint "Comprehensive 2-4 sentence biography detailing athletic and clinical background."

    # 3c. Datasource & Page Template: BlogPostItem
    Write-Host "`n--- Datasource Template: BlogPostItem ---" -ForegroundColor White
    $blogPostBaseIds = @($baseBlogPost.ID.ToString())
    if ($baseContentBlockId) { $blogPostBaseIds += $baseContentBlockId }
    if ($baseMediaCtaId)     { $blogPostBaseIds += $baseMediaCtaId }

    $blogPostTpl = Ensure-SitecoreTemplate -ParentPath $DatasourcePath -TemplateName "BlogPostItem" `
        -Icon "Office/32x32/document_text.png" -BaseTemplateIds $blogPostBaseIds
    $blogPostTplPath = $blogPostTpl.Paths.FullPath

    # Core Editorial Fields
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -FieldName "Title" `
        -FieldType "Single-Line Text" -AIPromptHint "Engaging, authoritative title for the article."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -FieldName "Subtitle" `
        -FieldType "Single-Line Text" -AIPromptHint "Editorial subheadline expanding on the core benefit of the article."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -FieldName "Excerpt" `
        -FieldType "Multi-Line Text" -AIPromptHint "Brief summary for search indexing, cards, and social meta description."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -FieldName "CoverImage" `
        -FieldType "Single-Line Text" -AIPromptHint "High resolution cover image URL or Sitecore media reference."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Editorial Header" -FieldName "ImageCaption" `
        -FieldType "Single-Line Text" -AIPromptHint "Descriptive caption and photographer accreditation for the cover image."

    # Executive Summary & Content
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Executive Summary" -FieldName "KeyTakeaways" `
        -FieldType "Multi-Line Text" -AIPromptHint "Bullet points of key findings (one per line) for the executive summary card."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Article Body" -FieldName "ContentBody" `
        -FieldType "Rich Text" -AIPromptHint "Rich HTML body with sections, callout quotes, and guidelines."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Article Body" -FieldName "SectionsJson" `
        -FieldType "Multi-Line Text" -AIPromptHint "Structured JSON representation of sections, callouts, and bullet points for headless rendering."

    # Author Information & Relationships
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -FieldName "Author" `
        -FieldType "Droplink" -Source "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Authors/*" `
        -AIPromptHint "Reference to the author item in the Data/Blog/Authors repository."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -FieldName "AuthorName" `
        -FieldType "Single-Line Text" -AIPromptHint "Author display name fallback."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -FieldName "AuthorRole" `
        -FieldType "Single-Line Text" -AIPromptHint "Author role / title fallback."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -FieldName "AuthorCredentials" `
        -FieldType "Single-Line Text" -AIPromptHint "Author credentials e.g. CSCS, RD."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -FieldName "AuthorAvatar" `
        -FieldType "Single-Line Text" -AIPromptHint "Author portrait avatar URL."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Author Details" -FieldName "AuthorBio" `
        -FieldType "Multi-Line Text" -AIPromptHint "Author short bio."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Relationships" -FieldName "RelatedPosts" `
        -FieldType "Multilist" -Source "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Posts/*" `
        -AIPromptHint "Selection of 3 related blog post items to render at the bottom of the article."
    Add-SitecoreAIField -TemplatePath "master:$blogPostTplPath" -SectionName "Relationships" -FieldName "CommentsCount" `
        -FieldType "Integer" -AIPromptHint "Number of reader and coach comments." -DefaultValue "0"

    # 3d. Organism Template: BlogCatalog (Listing Component)
    Write-Host "`n--- Organism Template: BlogCatalog ---" -ForegroundColor White
    $blogCatalogTpl = Ensure-SitecoreTemplate -ParentPath $OrganismsPath -TemplateName "BlogCatalog" `
        -Icon "Office/32x32/newspaper.png"
    $blogCatalogTplPath = $blogCatalogTpl.Paths.FullPath

    Add-SitecoreAIField -TemplatePath "master:$blogCatalogTplPath" -SectionName "Catalog Settings" -FieldName "Title" `
        -FieldType "Single-Line Text" -AIPromptHint "Catalog section title e.g. Latest Insights." -DefaultValue "Latest Performance Insights"
    Add-SitecoreAIField -TemplatePath "master:$blogCatalogTplPath" -SectionName "Catalog Settings" -FieldName "Subtitle" `
        -FieldType "Single-Line Text" -AIPromptHint "Catalog subtitle description." -DefaultValue "Explore research-backed protocols from certified performance coaches."
    Add-SitecoreAIField -TemplatePath "master:$blogCatalogTplPath" -SectionName "Catalog Settings" -FieldName "PageSize" `
        -FieldType "Integer" -AIPromptHint "Initial number of articles loaded per batch." -DefaultValue "6"
    Add-SitecoreAIField -TemplatePath "master:$blogCatalogTplPath" -SectionName "Catalog Settings" -FieldName "DefaultCategory" `
        -FieldType "Single-Line Text" -AIPromptHint "Default category filter on initial page load." -DefaultValue "All Categories"
    Add-SitecoreAIField -TemplatePath "master:$blogCatalogTplPath" -SectionName "Catalog Settings" -FieldName "BlogDataSource" `
        -FieldType "Droptree" -Source "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Posts" `
        -AIPromptHint "Root folder containing blog post items to query."

    # 3e. Organism Template: BlogDetailView (Full Article Component)
    Write-Host "`n--- Organism Template: BlogDetailView ---" -ForegroundColor White
    $blogDetailTpl = Ensure-SitecoreTemplate -ParentPath $OrganismsPath -TemplateName "BlogDetailView" `
        -Icon "Office/32x32/window_split_ver.png"
    $blogDetailTplPath = $blogDetailTpl.Paths.FullPath

    Add-SitecoreAIField -TemplatePath "master:$blogDetailTplPath" -SectionName "Display Options" -FieldName "DisplayTableOfContents" `
        -FieldType "Checkbox" -AIPromptHint "Check to display the sticky Table of Contents rail." -DefaultValue "1"
    Add-SitecoreAIField -TemplatePath "master:$blogDetailTplPath" -SectionName "Display Options" -FieldName "EnableLikes" `
        -FieldType "Checkbox" -AIPromptHint "Check to enable reader like/clap counter." -DefaultValue "1"
    Add-SitecoreAIField -TemplatePath "master:$blogDetailTplPath" -SectionName "Display Options" -FieldName "EnableSharing" `
        -FieldType "Checkbox" -AIPromptHint "Check to enable copy-link and social sharing buttons." -DefaultValue "1"
    Add-SitecoreAIField -TemplatePath "master:$blogDetailTplPath" -SectionName "Display Options" -FieldName "ShowAuthorBio" `
        -FieldType "Checkbox" -AIPromptHint "Check to show the full coach bio card below the article." -DefaultValue "1"
    Add-SitecoreAIField -TemplatePath "master:$blogDetailTplPath" -SectionName "Display Options" -FieldName "ShowCtaBanner" `
        -FieldType "Checkbox" -AIPromptHint "Check to show the bottom coaching consultation CTA banner." -DefaultValue "1"
    Add-SitecoreAIField -TemplatePath "master:$blogDetailTplPath" -SectionName "Display Options" -FieldName "ShowRelatedPosts" `
        -FieldType "Checkbox" -AIPromptHint "Check to display the 3 related articles grid." -DefaultValue "1"

    # 3f. Organism Template: BlogCtaBanner
    Write-Host "`n--- Organism Template: BlogCtaBanner ---" -ForegroundColor White
    $blogCtaTpl = Ensure-SitecoreTemplate -ParentPath $OrganismsPath -TemplateName "BlogCtaBanner" `
        -Icon "Office/32x32/bullhorn.png"
    $blogCtaTplPath = $blogCtaTpl.Paths.FullPath

    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Content" -FieldName "Eyebrow" `
        -FieldType "Single-Line Text" -AIPromptHint "Small uppercase teaser badge." -DefaultValue "Coaching & Nutrition Program"
    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Content" -FieldName "Heading" `
        -FieldType "Single-Line Text" -AIPromptHint "Main conversion headline." -DefaultValue "Ready to put this science into a personalized plan?"
    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Content" -FieldName "Description" `
        -FieldType "Multi-Line Text" -AIPromptHint "Persuasive summary of coaching benefits." -DefaultValue "Get custom macro calculations, progressive overload training cycles, and weekly coaching reviews tailored to your lifestyle."
    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Actions" -FieldName "PrimaryCtaText" `
        -FieldType "Single-Line Text" -AIPromptHint "Label for the primary CTA button." -DefaultValue "Start Your Custom Plan"
    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Actions" -FieldName "PrimaryCtaLink" `
        -FieldType "General Link" -AIPromptHint "Link target for primary CTA button (e.g. /contact)."
    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Actions" -FieldName "SecondaryCtaText" `
        -FieldType "Single-Line Text" -AIPromptHint "Label for the secondary link." -DefaultValue "Explore Coaching Tiers"
    Add-SitecoreAIField -TemplatePath "master:$blogCtaTplPath" -SectionName "Actions" -FieldName "SecondaryCtaLink" `
        -FieldType "General Link" -AIPromptHint "Link target for secondary CTA (e.g. /services)."

    # 3g. Organism Template: BlogGrid (Classic 3-Column Grid)
    Write-Host "`n--- Organism Template: BlogGrid ---" -ForegroundColor White
    $basePaginationId = ""
    if (Test-Path -Path "$BaseFolderPath/_BasePagination") {
        $basePaginationId = (Get-Item -Path "$BaseFolderPath/_BasePagination").ID.ToString()
    }
    $blogGridBaseIds = @()
    if ($basePaginationId) { $blogGridBaseIds += $basePaginationId }

    $blogGridTpl = Ensure-SitecoreTemplate -ParentPath $OrganismsPath -TemplateName "BlogGrid" `
        -Icon "Office/32x32/newspaper.png" -BaseTemplateIds $blogGridBaseIds
    $blogGridTplPath = $blogGridTpl.Paths.FullPath

    if (-not $basePaginationId) {
        Add-SitecoreAIField -TemplatePath "master:$blogGridTplPath" -SectionName "Pagination" -FieldName "PageSize" `
            -FieldType "Integer" -AIPromptHint "Number of blog cards displayed per page." -DefaultValue "6"
        Add-SitecoreAIField -TemplatePath "master:$blogGridTplPath" -SectionName "Pagination" -FieldName "TotalPages" `
            -FieldType "Integer" -AIPromptHint "Total pagination page count." -DefaultValue "5"
        Add-SitecoreAIField -TemplatePath "master:$blogGridTplPath" -SectionName "Pagination" -FieldName "TotalResults" `
            -FieldType "Integer" -AIPromptHint "Total articles count." -DefaultValue "30"
    }

    Add-SitecoreAIField -TemplatePath "master:$blogGridTplPath" -SectionName "Grid Configuration" -FieldName "Posts" `
        -FieldType "Multilist" -Source "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Posts/*" `
        -AIPromptHint "Curated blog posts to render in the 3-column grid."

    # ========================================================================
    # 4. PROVISION HEADLESS JSON RENDERINGS
    # ========================================================================
    Write-Host "`n============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Provisioning Headless JSON Renderings for Blog" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    Ensure-TemplateFolder -ParentPath $RenderingsRootPath -FolderName $TenantName | Out-Null

    # 4a. BlogCatalog Rendering
    Ensure-JsonRendering -ParentPath $RenderingsPath -RenderingName "BlogCatalog" -Fields @{
        "componentName"       = "BlogCatalog"
        "Datasource Location" = "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog"
        "Datasource Template" = $blogCatalogTplPath
        "Parameters Template" = ""
        "Placeholder"         = "headless-main"
    } | Out-Null

    # 4b. BlogDetailView Rendering
    Ensure-JsonRendering -ParentPath $RenderingsPath -RenderingName "BlogDetailView" -Fields @{
        "componentName"       = "BlogDetailView"
        "Datasource Location" = "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog/Posts"
        "Datasource Template" = $blogPostTplPath
        "Parameters Template" = ""
        "Placeholder"         = "headless-main"
    } | Out-Null

    # 4c. BlogCtaBanner Rendering
    Ensure-JsonRendering -ParentPath $RenderingsPath -RenderingName "BlogCtaBanner" -Fields @{
        "componentName"       = "BlogCtaBanner"
        "Datasource Location" = "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog"
        "Datasource Template" = $blogCtaTplPath
        "Parameters Template" = ""
        "Placeholder"         = "headless-main"
    } | Out-Null

    # 4d. BlogGrid Rendering
    Ensure-JsonRendering -ParentPath $RenderingsPath -RenderingName "BlogGrid" -Fields @{
        "componentName"       = "BlogGrid"
        "Datasource Location" = "query:./ancestor-or-self::*[@@templatename='Site']/Data/Blog"
        "Datasource Template" = $blogGridTplPath
        "Parameters Template" = ""
        "Placeholder"         = "headless-main"
    } | Out-Null

    # ========================================================================
    # 5. REGISTER IN AVAILABLE RENDERINGS (SXA TOOLBOX)
    # ========================================================================
    Write-Host "`n============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Registering Renderings in SXA Available Renderings" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    if (Test-Path -Path $AvailableRenderingsPath) {
        $availGroup = Get-Item -Path "$AvailableRenderingsPath/FitnessMaster" -ErrorAction SilentlyContinue
        if ($availGroup) {
            $existingRenderings = @($availGroup["Renderings"] -split "\|" | Where-Object { $_ -ne "" })
            $newRenderings = @(
                (Get-Item -Path "$RenderingsPath/BlogCatalog").ID.ToString(),
                (Get-Item -Path "$RenderingsPath/BlogDetailView").ID.ToString(),
                (Get-Item -Path "$RenderingsPath/BlogCtaBanner").ID.ToString(),
                (Get-Item -Path "$RenderingsPath/BlogGrid").ID.ToString()
            )

            foreach ($rId in $newRenderings) {
                if ($existingRenderings -notcontains $rId) {
                    $existingRenderings += $rId
                }
            }

            $availGroup.Editing.BeginEdit() | Out-Null
            $availGroup["Renderings"] = ($existingRenderings -join "|")
            $availGroup.Editing.EndEdit() | Out-Null
            Write-Host "[+] Updated Available Renderings with Blog components." -ForegroundColor Green
        }
    }

    Write-Host "`n============================================================" -ForegroundColor Green
    Write-Host "[OK] Blog Templates & Renderings Provisioning Complete!" -ForegroundColor Green
    Write-Host "     Base Template      : $BaseFolderPath/_BaseBlogPost" -ForegroundColor Green
    Write-Host "     Datasource Template: $DatasourcePath/BlogPostItem" -ForegroundColor Green
    Write-Host "     Author Template    : $DatasourcePath/BlogAuthor" -ForegroundColor Green
    Write-Host "     Organism Templates : BlogCatalog, BlogDetailView, BlogCtaBanner" -ForegroundColor Green
    Write-Host "     Json Renderings    : $RenderingsPath/(BlogCatalog|BlogDetailView|BlogCtaBanner)" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning blog templates: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

