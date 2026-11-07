<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Assign FitnessMaster renderings to the Blog Detail page
.DESCRIPTION
    Mirrors src/app/blog/[id]/page.tsx in Sitecore XM Cloud:
      <BlogDetailView />

    Steps:
      1. Ensures the Blog Parent route item exists under:
         master:/sitecore/content/Corporate/fitlifecoach/Home/Blog
         and assigns the Headless layout from Home if missing.
      2. Ensures the Blog Detail page item exists under:
         master:/sitecore/content/Corporate/fitlifecoach/Home/Blog/creatine-monohydrate-the-science-backed-hypertrophy-supplement
         and assigns the Headless layout from Home if missing.
      3. Creates/updates the blog post datasource item under:
         master:/sitecore/content/Corporate/fitlifecoach/Data/Blog/Posts/creatine-monohydrate-the-science-backed-hypertrophy-supplement
         Template: master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems/BlogPostItem
         Populated with all 26 fields specified in the blog detail schema.
      4. Adds or rebinds the BlogDetailView Json Rendering on the Blog Detail page Final Layout in placeholder "headless-main".

    Idempotent: re-running updates field values and rebinds existing renderings instead of duplicating them.
.NOTES
    Prerequisites : Run Create-SitecoreAITemplates.ps1 and Provision-BlogTemplates.ps1 first.
    Target        : Sitecore XM Cloud with SPE (Execute in Sitecore ISE)
    Encoding      : ASCII-safe
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# 1. CONFIGURATION
# ============================================================================
$SitePath           = "master:/sitecore/content/Corporate/fitlifecoach"
$HomePath           = "$SitePath/Home"
$BlogParentPath     = "$HomePath/Blog"
$PageSlug           = "creatine-monohydrate-the-science-backed-hypertrophy-supplement"
$PagePath           = "$BlogParentPath/$PageSlug"
$DataPath           = "$SitePath/Data"
$BlogDataPath       = "$DataPath/Blog"
$BlogPostsDataPath  = "$BlogDataPath/Posts"
$DatasourceTplPath  = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath     = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"
$MainPlaceholder    = "headless-main"
$CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$DatasourcePrefix   = "Blog"

# ============================================================================
# 2. HELPERS
# ============================================================================

function ConvertTo-ItemName {
    param([Parameter(Mandatory = $true)][string]$Text)
    $name = $Text -replace "&", "and" -replace "[^\w\s\-]", ""
    return ($name -replace "\s+", " ").Trim()
}

function Get-TemplateIdByPath {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -Path $Path)) {
        throw "Template not found: $Path. Run Create-SitecoreAITemplates.ps1 and Provision-BlogTemplates.ps1 first."
    }
    return (Get-Item -Path $Path).ID.ToString()
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

# ============================================================================
# 3. PROVISION BLOG DETAIL PAGE + RENDERINGS
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Assigning renderings to Blog Detail Page ($PagePath)" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    if (-not (Test-Path -Path $HomePath)) {
        throw "Home page not found: $HomePath. Create the FitLife headless site first."
    }
    if (-not (Test-Path -Path $DataPath)) {
        New-Item -Path $SitePath -Name "Data" -ItemType $CommonFolderId | Out-Null
    }

    $homeItem   = Get-Item -Path $HomePath
    $device     = Get-LayoutDevice -Default
    $homeLayout = Get-Layout -Item $homeItem -Device $device -ErrorAction SilentlyContinue

    # 3a. Ensure Blog parent container item under /Home/Blog
    $blogFolderItem = Ensure-Item -ParentPath $HomePath -Name "Blog" -TemplateId $homeItem.TemplateID.ToString()
    if ($homeLayout -and -not (Get-Layout -Item $blogFolderItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $blogFolderItem -Device $device -Layout $homeLayout
    }

    # 3b. Ensure Data/Blog and Data/Blog/Posts containers
    $blogDataFolder = Ensure-Item -ParentPath $DataPath -Name "Blog" -TemplateId $CommonFolderId
    $postsFolder    = Ensure-Item -ParentPath "master:$($blogDataFolder.Paths.FullPath)" -Name "Posts" -TemplateId $CommonFolderId

    # 3c. Ensure Blog Detail page item under /Home/Blog/<slug>
    $blogPageItem = Ensure-Item -ParentPath "master:$($blogFolderItem.Paths.FullPath)" -Name $PageSlug -TemplateId $homeItem.TemplateID.ToString()
    if ($homeLayout -and -not (Get-Layout -Item $blogPageItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $blogPageItem -Device $device -Layout $homeLayout
    }

    # Set page display title
    $blogPageItem.Editing.BeginEdit() | Out-Null
    if ($blogPageItem.Fields["Title"]) {
        $blogPageItem["Title"] = "Creatine Monohydrate: The Science-Backed Hypertrophy Supplement"
    }
    if ($blogPageItem.Fields["NavigationTitle"]) {
        $blogPageItem["NavigationTitle"] = "Creatine Monohydrate"
    }
    if ($blogPageItem.Fields["__Display Name"]) {
        $blogPageItem["__Display Name"] = "Creatine Monohydrate: The Science-Backed Hypertrophy Supplement"
    }
    $blogPageItem.Editing.EndEdit() | Out-Null

    # 3d. Define Structured Sections JSON
    $sectionsJson = @'
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
'@

    $keyTakeawaysText = "Creatine monohydrate is the most clinically validated ergogenic aid in sports nutrition history.`r`n" +
                        "A daily dose of 5 grams saturates intramuscular phosphocreatine stores within 3 to 4 weeks without a loading phase.`r`n" +
                        "Intracellular water retention increases muscular leverage and signals anabolic cascades.`r`n" +
                        "Creatine also supports neurological ATP recycling, reducing cognitive fatigue under sleep restriction."

    # 3e. Components list (BlogDetailView)
    $components = @(
        @{
            Name               = "BlogDetailView"
            DatasourceName     = $PageSlug
            DatasourceParent   = "master:$($postsFolder.Paths.FullPath)"
            DatasourceTemplate = "$DatasourceTplPath/BlogPostItem"
            Fields             = @{
                Title             = "Creatine Monohydrate: The Science-Backed Hypertrophy Supplement"
                Subtitle          = "Deconstructing phosphocreatine resynthesis, cellular hydration, and cognitive performance benefits."
                Excerpt           = "Learn how creatine monohydrate saturates muscular energy pathways to increase power output and cell volumization."
                Description       = "Learn how creatine monohydrate saturates muscular energy pathways to increase power output and cell volumization."
                CoverImage        = "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1200&auto=format&fit=crop"
                ImageCaption      = "Pure micronized creatine monohydrate dissolving into water for optimal bioavailability."
                KeyTakeaways      = $keyTakeawaysText
                ContentBody       = "<p>Creatine monohydrate remains the gold standard in sports nutrition supplements.</p>"
                SectionsJson      = $sectionsJson
                Author            = ""
                AuthorName        = "Dr. Elena Rostova"
                AuthorRole        = "Lead Clinical Sports Dietitian"
                AuthorCredentials = "PhD, RD, CSSD"
                AuthorAvatar      = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                AuthorBio         = "Specializing in athletic metabolic efficiency, gut microbiome health, and targeted nutrient timing for body recomposition and chronic recovery."
                PublishDate       = "2026-11-18T00:00:00Z"
                PublishedDate     = "February 08, 2026"
                UpdatedDate       = "Updated recently"
                DisplayDay        = "18"
                DisplayMonth      = "Nov"
                CommentCount      = 0
                ArticleId         = "2"
                Slug              = "creatine-monohydrate-the-science-backed-hypertrophy-supplement"
                ReadTime          = "6 min read"
                Tags              = "Nutrition & Diet, Electrolytes, Hydration, Endurance, Performance"
                Category          = "Nutrition & Diet"
                FitnessLevel      = "Beginner"
            }
        }
    )

    foreach ($comp in $components) {
        Write-Host "--- $($comp.Name) ---" -ForegroundColor White

        # 3f. Datasource item: Data/Blog/Posts/<slug>
        $tplId    = Get-TemplateIdByPath $comp.DatasourceTemplate
        $dsItem   = Ensure-Item -ParentPath $comp.DatasourceParent -Name $comp.DatasourceName -TemplateId $tplId
        $dsFields = $comp.Fields.Clone()

        Set-ItemFields -Item $dsItem -Fields $dsFields
        Write-Host "[+] Datasource configured: $($dsItem.Paths.FullPath)" -ForegroundColor Green

        # 3g. Rendering assignment on Blog Detail page Final Layout
        $renderingPath = "$RenderingsPath/$($comp.Name)"
        if (-not (Test-Path -Path $renderingPath)) {
            throw "Rendering not found: $renderingPath. Run Create-SitecoreAITemplates.ps1 and Provision-BlogTemplates.ps1 first."
        }
        $renderingItem = Get-Item -Path $renderingPath
        $datasourceId  = $dsItem.ID.ToString()

        $existing = @(Get-Rendering -Item $blogPageItem -Rendering $renderingItem -Device $device -FinalLayout -ErrorAction SilentlyContinue)
        if ($existing.Count -gt 0) {
            foreach ($instance in $existing) {
                $instance.Datasource = $datasourceId
                $instance.Placeholder = $MainPlaceholder
                Set-Rendering -Item $blogPageItem -Instance $instance -FinalLayout
            }
            Write-Host "[i] Rebound rendering: $($comp.Name) -> $MainPlaceholder" -ForegroundColor Yellow
        }
        else {
            $instance = $renderingItem | New-Rendering -Placeholder $MainPlaceholder
            Add-Rendering -Item $blogPageItem -Instance $instance -Placeholder $MainPlaceholder -DataSource $datasourceId -Device $device -FinalLayout
            Write-Host "[+] Added rendering: $($comp.Name) -> $MainPlaceholder" -ForegroundColor Green
        }
    }

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Blog Detail page assembled with $($components.Count) rendering(s)." -ForegroundColor Green
    Write-Host "     Page        : $PagePath" -ForegroundColor Green
    Write-Host "     Placeholder : $MainPlaceholder" -ForegroundColor Green
    Write-Host "     Datasource  : $BlogPostsDataPath/$PageSlug" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error assigning Blog Detail page renderings: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

