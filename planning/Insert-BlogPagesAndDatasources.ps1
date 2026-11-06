<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Insert Blog Listing and Blog Details Pages and Datasources
.DESCRIPTION
    Provisions all Blog content, authors, listings, and detail page items from the fitness data store:
      1. Provisions 4 Certified Coaches under:
         master:/sitecore/content/Corporate/fitlifecoach/Data/Blog/Authors
      2. Ensures the Blog Listing route page under:
         master:/sitecore/content/Corporate/fitlifecoach/Home/Blog
         and binds renderings:
           - Navbar       -> headless-header
           - HeroSection  -> headless-main (Data/HeroSection/Blog HeroSection)
           - BlogCatalog  -> headless-main (Data/Blog/Blog BlogCatalog)
           - Footer       -> headless-footer
      3. Provisions Blog Post items under:
         master:/sitecore/content/Corporate/fitlifecoach/Data/Blog/Posts/{slug}
         AND creates matching dynamic route pages under:
         master:/sitecore/content/Corporate/fitlifecoach/Home/Blog/{id}
         with layout and renderings:
           - Navbar         -> headless-header
           - BlogDetailView -> headless-main (pointing to the post datasource)
           - Footer         -> headless-footer
      4. Connects author links and related article multilist references.
      5. Populates rich fields: KeyTakeaways, SectionsJson, ContentBody HTML, tags, cover images.

    Parameters:
      -MaxPosts : Maximum number of blog articles to import (default: 10, or all with -All).
      -All      : Switch to import all 100 articles from blogData.json.
      -JsonPath : Optional explicit path to blogData.json.

    Idempotent: updates existing items and layout instances without duplication.
.NOTES
    Prerequisites : Run Provision-BlogTemplates.ps1 first.
    Target        : Sitecore XM Cloud / Sitecore XP with SPE (Execute in Sitecore ISE)
    Encoding      : ASCII-safe
#>

param(
    [int]$MaxPosts = 10,
    [switch]$All,
    [string]$JsonPath = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# 1. CONFIGURATION AND PATHS
# ============================================================================
$SitePath               = "master:/sitecore/content/Corporate/fitlifecoach"
$HomePath               = "$SitePath/Home"
$BlogRoutePath          = "$HomePath/Blog"
$DataPath               = "$SitePath/Data"
$BlogDataPath           = "$DataPath/Blog"
$AuthorsDataPath        = "$BlogDataPath/Authors"
$PostsDataPath          = "$BlogDataPath/Posts"

$OrganismsPath          = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath         = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"

$CommonFolderId         = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$HeaderPlaceholder      = "headless-header"
$MainPlaceholder        = "headless-main"
$FooterPlaceholder      = "headless-footer"

# ============================================================================
# 2. HELPER FUNCTIONS
# ============================================================================

function ConvertTo-ItemName {
    param([Parameter(Mandatory = $true)][string]$Text)
    $name = $Text -replace "&", "and" -replace "[^\w\s\-]", ""
    return ($name -replace "\s+", " ").Trim()
}

function Get-TemplateIdByPath {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -Path $Path)) {
        throw "Template not found: $Path. Run Provision-BlogTemplates.ps1 first."
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
        $Item[$kvp.Key] = [string]$kvp.Value
    }
    $Item.Editing.EndEdit() | Out-Null
}

function Ensure-PageRendering {
    param(
        [Parameter(Mandatory = $true)]$PageItem,
        [Parameter(Mandatory = $true)][string]$RenderingPath,
        [Parameter(Mandatory = $true)][string]$Placeholder,
        [string]$DatasourceId = "",
        [Parameter(Mandatory = $true)]$Device
    )

    if (-not (Test-Path -Path $RenderingPath)) {
        Write-Warning "[WARN] Rendering not found at '$RenderingPath'. Skipped."
        return
    }

    $renderingItem = Get-Item -Path $RenderingPath
    $existing = @(Get-Rendering -Item $PageItem -Rendering $renderingItem -Device $Device -FinalLayout -ErrorAction SilentlyContinue)

    if ($existing.Count -gt 0) {
        foreach ($instance in $existing) {
            $instance.Placeholder = $Placeholder
            if ($DatasourceId) {
                $instance.Datasource = $DatasourceId
            }
            Set-Rendering -Item $PageItem -Instance $instance -FinalLayout
        }
        Write-Host "    [i] Rebound rendering: $($renderingItem.Name) -> $Placeholder" -ForegroundColor DarkGray
    }
    else {
        $instance = $renderingItem | New-Rendering -Placeholder $Placeholder
        if ($DatasourceId) {
            Add-Rendering -Item $PageItem -Instance $instance -Placeholder $Placeholder -DataSource $DatasourceId -Device $Device -FinalLayout
        } else {
            Add-Rendering -Item $PageItem -Instance $instance -Placeholder $Placeholder -Device $Device -FinalLayout
        }
        Write-Host "    [+] Added rendering: $($renderingItem.Name) -> $Placeholder" -ForegroundColor Green
    }
}

function Convert-SectionsToHtml {
    param([object[]]$Sections)
    if (-not $Sections) { return "" }
    $sb = New-Object System.Text.StringBuilder
    foreach ($sec in $Sections) {
        $secId = if ($sec.id) { [string]$sec.id } else { "" }
        $secHeading = if ($sec.heading) { [string]$sec.heading } else { "" }
        [void]$sb.AppendLine(("<section id='{0}'>" -f $secId))
        [void]$sb.AppendLine(("<h2>{0}</h2>" -f $secHeading))
        if ($sec.paragraphs) {
            foreach ($p in $sec.paragraphs) {
                [void]$sb.AppendLine(("<p>{0}</p>" -f [string]$p))
            }
        }
        if ($sec.bulletPoints) {
            [void]$sb.AppendLine("<ul>")
            foreach ($bp in $sec.bulletPoints) {
                [void]$sb.AppendLine(("<li>{0}</li>" -f [string]$bp))
            }
            [void]$sb.AppendLine("</ul>")
        }
        if ($sec.callout) {
            $cType = if ($sec.callout.type) { [string]$sec.callout.type } else { "tip" }
            $cTitle = if ($sec.callout.title) { [string]$sec.callout.title } else { "" }
            $cText = if ($sec.callout.text) { [string]$sec.callout.text } else { "" }
            $cAuthor = if ($sec.callout.author) { [string]$sec.callout.author } else { "" }
            [void]$sb.AppendLine(("<aside class='callout-{0}'>" -f $cType))
            [void]$sb.AppendLine(("<h4>{0}</h4>" -f $cTitle))
            [void]$sb.AppendLine(("<blockquote>{0}</blockquote>" -f $cText))
            if ($cAuthor) {
                [void]$sb.AppendLine(("<cite>- {0}</cite>" -f $cAuthor))
            }
            [void]$sb.AppendLine("</aside>")
        }
        [void]$sb.AppendLine("</section>")
    }
    return $sb.ToString()
}

# ============================================================================
# 3. LOAD BLOG DATA
# ============================================================================

# Certified Coach Bios
$CoachesData = @(
    @{
        Key         = "marcus"
        Name        = "Marcus Vance"
        Role        = "Head Performance Coach"
        Credentials = "CSCS, USAW, EXOS-XPS"
        Avatar      = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
        Bio         = "Former collegiate strength coach with 12+ years of experience training elite athletes, tactical operators, and busy professionals for peak physiological performance."
    },
    @{
        Key         = "elena"
        Name        = "Dr. Elena Rostova"
        Role        = "Lead Clinical Sports Dietitian"
        Credentials = "PhD, RD, CSSD"
        Avatar      = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
        Bio         = "Specializing in athletic metabolic efficiency, gut microbiome health, and targeted nutrient timing for body recomposition and chronic recovery."
    },
    @{
        Key         = "sarah"
        Name        = "Sarah Jenkins"
        Role        = "Senior Conditioning Specialist"
        Credentials = "MS Exercise Science, CPT, CES"
        Avatar      = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
        Bio         = "Passionate endurance coach and biomechanics specialist focused on sustainable cardiovascular conditioning, fat loss, and injury-free movement patterns."
    },
    @{
        Key         = "maya"
        Name        = "Maya Lin"
        Role        = "Mobility and Functional Movement Coach"
        Credentials = "RYT-500, FRC Mobility Specialist"
        Avatar      = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
        Bio         = "Integrates Ashtanga yoga methodologies with Functional Range Conditioning to build resilient joints, expand movement capacity, and downregulate the nervous system."
    }
)

# Resolve blogData.json path
$loadedPosts = @()
$candidates = @($JsonPath, "planning/blogData.json", "plan/blogData.json", "$PSScriptRoot/blogData.json", "$PSScriptRoot/../planning/blogData.json")
$resolvedJsonPath = ""
foreach ($cand in $candidates) {
    if (($cand) -and (Test-Path -Path $cand)) {
        $resolvedJsonPath = $cand
        break
    }
}

if ($resolvedJsonPath) {
    Write-Host "[i] Loading blog articles from '$resolvedJsonPath'..." -ForegroundColor Cyan
    $rawJson = Get-Content -Path $resolvedJsonPath -Raw -Encoding UTF8
    $loadedPosts = ConvertFrom-Json -InputObject $rawJson
    Write-Host "[i] Loaded $($loadedPosts.Count) articles from JSON." -ForegroundColor Green
} else {
    Write-Host "[!] blogData.json not found on disk. Falling back to embedded core articles." -ForegroundColor Yellow
}

# Determine post count to import
$postsToImport = @()
if ($All) {
    $postsToImport = $loadedPosts
} elseif ($loadedPosts.Count -gt 0) {
    $count = [Math]::Min($MaxPosts, $loadedPosts.Count)
    $postsToImport = $loadedPosts[0..($count - 1)]
} else {
    # Minimal fallback 1st post if neither JSON nor parameters exist
    $postsToImport = @(
        [PSCustomObject]@{
            id = "1"
            slug = "how-much-protein-do-you-really-need-every-day"
            title = "How Much Protein Do You Really Need Every Day?"
            subtitle = "A clinical and physiological guide to dialing in your protein intake for hypertrophy, fat loss, and metabolic longevity."
            excerpt = "Discover the science behind daily protein intake and how to calculate the optimal amount for your muscle-building and recovery goals."
            category = "Nutrition and Diet"
            level = "All Levels"
            readTime = "5 min read"
            publishedDate = "January 01, 2026"
            updatedDate = "Updated recently"
            coverImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
            imageCaption = "Optimal nutrient density: Combining bioavailable lean proteins with colorful micronutrients."
            author = [PSCustomObject]@{
                name = "Marcus Vance"
                role = "Head Performance Coach"
                credentials = "CSCS, USAW, EXOS-XPS"
                avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                bio = "Former collegiate strength coach with 12+ years of experience training elite athletes."
            }
            keyTakeaways = @(
                "Target 1.6 to 2.2 grams of protein per kilogram of body weight to maximize muscle protein synthesis.",
                "Distribute intake across 3 to 5 feedings containing at least 2.5-3g leucine.",
                "In a fat-loss phase, elevate intake toward 2.4 g/kg to protect muscle mass."
            )
            tags = @("Protein", "Hypertrophy", "Nutrition", "Longevity")
            relatedPostIds = @("5", "7", "2")
            commentsCount = 6
        }
    )
}

# ============================================================================
# 4. EXECUTE PROVISIONING AND DATA INSERTION
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ("[INFO] Starting Blog Insertion Process ({0} articles)" -f $postsToImport.Count) -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    if (-not (Test-Path -Path $HomePath)) {
        throw "Home page not found: $HomePath. Please create the FitLife site first."
    }

    $homeItem   = Get-Item -Path $HomePath
    $device     = Get-LayoutDevice -Default
    $homeLayout = Get-Layout -Item $homeItem -Device $device -ErrorAction SilentlyContinue

    # Ensure Core Folders
    if (-not (Test-Path -Path $DataPath)) {
        New-Item -Path $SitePath -Name "Data" -ItemType $CommonFolderId | Out-Null
    }
    $blogFolder    = Ensure-Item -ParentPath $DataPath -Name "Blog" -TemplateId $CommonFolderId
    $authorsFolder = Ensure-Item -ParentPath "master:$($blogFolder.Paths.FullPath)" -Name "Authors" -TemplateId $CommonFolderId
    $postsFolder   = Ensure-Item -ParentPath "master:$($blogFolder.Paths.FullPath)" -Name "Posts" -TemplateId $CommonFolderId

    $authorTplId   = Get-TemplateIdByPath "$DatasourceTplPath/BlogAuthor"
    $blogPostTplId = Get-TemplateIdByPath "$DatasourceTplPath/BlogPostItem"
    $blogCatTplId  = Get-TemplateIdByPath "$OrganismsPath/BlogCatalog"
    $heroSecTplId  = Get-TemplateIdByPath "$OrganismsPath/HeroSection"

    # 4a. Provision Coaches
    Write-Host "`n--- Provisioning Certified Coaches ---" -ForegroundColor White
    $authorItemMap = @{}
    foreach ($coach in $CoachesData) {
        $cItem = Ensure-Item -ParentPath "master:$($authorsFolder.Paths.FullPath)" -Name $coach.Name -TemplateId $authorTplId
        Set-ItemFields -Item $cItem -Fields @{
            Name        = $coach.Name
            Role        = $coach.Role
            Credentials = $coach.Credentials
            Avatar      = $coach.Avatar
            Bio         = $coach.Bio
        }
        $authorItemMap[$coach.Name.ToLower()] = $cItem
        $authorItemMap[$coach.Key.ToLower()]  = $cItem
        Write-Host "    [+] Coach: $($coach.Name) ($($coach.Credentials))" -ForegroundColor Green
    }

    # 4b. Provision Blog Listing Page (/Home/Blog)
    Write-Host "`n--- Provisioning Blog Listing Page ($BlogRoutePath) ---" -ForegroundColor White
    $blogPageItem = Ensure-Item -ParentPath $HomePath -Name "Blog" -TemplateId $homeItem.TemplateID.ToString()
    if ($homeLayout -and -not (Get-Layout -Item $blogPageItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $blogPageItem -Device $device -Layout $homeLayout
    }

    # Blog Listing Datasources
    $heroFolder = Ensure-Item -ParentPath $DataPath -Name "HeroSection" -TemplateId $CommonFolderId
    $heroDsItem = Ensure-Item -ParentPath "master:$($heroFolder.Paths.FullPath)" -Name "Blog HeroSection" -TemplateId $heroSecTplId
    Set-ItemFields -Item $heroDsItem -Fields @{
        Title    = "Our Blog"
        PageName = "Blog"
    }

    $blogCatDsItem = Ensure-Item -ParentPath "master:$($blogFolder.Paths.FullPath)" -Name "Blog BlogCatalog" -TemplateId $blogCatTplId
    Set-ItemFields -Item $blogCatDsItem -Fields @{
        Title           = "Latest Performance Insights"
        Subtitle        = "Explore research-backed protocols, training programs, and sports nutrition guidance."
        PageSize        = "6"
        DefaultCategory = "All Categories"
        BlogDataSource  = $postsFolder.ID.ToString()
    }

    # Assign Presentation to /Home/Blog
    Ensure-PageRendering -PageItem $blogPageItem -RenderingPath "$RenderingsPath/Navbar" -Placeholder $HeaderPlaceholder -Device $device
    Ensure-PageRendering -PageItem $blogPageItem -RenderingPath "$RenderingsPath/HeroSection" -Placeholder $MainPlaceholder -DatasourceId $heroDsItem.ID.ToString() -Device $device
    Ensure-PageRendering -PageItem $blogPageItem -RenderingPath "$RenderingsPath/BlogCatalog" -Placeholder $MainPlaceholder -DatasourceId $blogCatDsItem.ID.ToString() -Device $device
    Ensure-PageRendering -PageItem $blogPageItem -RenderingPath "$RenderingsPath/Footer" -Placeholder $FooterPlaceholder -Device $device

    # 4c. Provision Blog Post Items and Details Pages
    Write-Host "`n--- Provisioning $($postsToImport.Count) Blog Articles ---" -ForegroundColor White
    $createdPostItems = @{}

    foreach ($post in $postsToImport) {
        $pId    = [string]$post.id
        $pSlug  = [string]$post.slug
        $pTitle = [string]$post.title

        Write-Host ("[>] Article #{0}: {1}" -f $pId, $pTitle) -ForegroundColor Cyan

        # 1. Create Datasource Item under Data/Blog/Posts/{slug}
        $postDsItem = Ensure-Item -ParentPath "master:$($postsFolder.Paths.FullPath)" -Name $pSlug -TemplateId $blogPostTplId

        # Match Author Item
        $authorItemId = ""
        $authorName = if ($post.author -and $post.author.name) { $post.author.name } else { "" }
        if ($authorName -and $authorItemMap.ContainsKey($authorName.ToLower())) {
            $authorItemId = $authorItemMap[$authorName.ToLower()].ID.ToString()
        }

        # Format Takeaways
        $takeawaysText = ""
        if ($post.keyTakeaways) {
            $takeawaysText = ($post.keyTakeaways -join "`n")
        }

        # Format Tags
        $tagsText = ""
        if ($post.tags) {
            $tagsText = ($post.tags -join "|")
        }

        # Sections JSON string and HTML Body
        $sectionsJsonStr = ""
        $sectionsHtml    = ""
        if ($post.sections) {
            $sectionsJsonStr = ConvertTo-Json -InputObject $post.sections -Depth 10 -Compress
            $sectionsHtml    = Convert-SectionsToHtml -Sections $post.sections
        }

        # Populate Datasource Fields
        $fieldsToSet = @{
            ArticleId         = $pId
            Slug              = $pSlug
            Category          = [string]$post.category
            FitnessLevel      = if ($post.level) { [string]$post.level } else { "All Levels" }
            ReadTime          = [string]$post.readTime
            PublishedDate     = [string]$post.publishedDate
            UpdatedDate       = if ($post.updatedDate) { [string]$post.updatedDate } else { "" }
            Title             = $pTitle
            Subtitle          = [string]$post.subtitle
            Excerpt           = [string]$post.excerpt
            CoverImage        = [string]$post.coverImage
            ImageCaption      = if ($post.imageCaption) { [string]$post.imageCaption } else { "" }
            KeyTakeaways      = $takeawaysText
            ContentBody       = $sectionsHtml
            SectionsJson      = $sectionsJsonStr
            Tags              = $tagsText
            AuthorName        = $authorName
            AuthorRole        = if ($post.author) { [string]$post.author.role } else { "" }
            AuthorCredentials = if ($post.author) { [string]$post.author.credentials } else { "" }
            AuthorAvatar      = if ($post.author) { [string]$post.author.avatar } else { "" }
            AuthorBio         = if ($post.author) { [string]$post.author.bio } else { "" }
            CommentsCount     = if ($post.commentsCount) { [string]$post.commentsCount } else { "4" }
        }
        if ($authorItemId) {
            $fieldsToSet["Author"] = $authorItemId
        }

        Set-ItemFields -Item $postDsItem -Fields $fieldsToSet
        $createdPostItems[$pId] = $postDsItem

        # 2. Create Dynamic Route Page under /Home/Blog/{id} (or {slug})
        $detailRouteItem = Ensure-Item -ParentPath "master:$($blogPageItem.Paths.FullPath)" -Name $pId -TemplateId $homeItem.TemplateID.ToString()
        if ($homeLayout -and -not (Get-Layout -Item $detailRouteItem -Device $device -ErrorAction SilentlyContinue)) {
            Set-Layout -Item $detailRouteItem -Device $device -Layout $homeLayout
        }

        # Assign Renderings to Blog Details Route Page
        Ensure-PageRendering -PageItem $detailRouteItem -RenderingPath "$RenderingsPath/Navbar" -Placeholder $HeaderPlaceholder -Device $device
        Ensure-PageRendering -PageItem $detailRouteItem -RenderingPath "$RenderingsPath/BlogDetailView" -Placeholder $MainPlaceholder -DatasourceId $postDsItem.ID.ToString() -Device $device
        Ensure-PageRendering -PageItem $detailRouteItem -RenderingPath "$RenderingsPath/Footer" -Placeholder $FooterPlaceholder -Device $device
    }

    # 4d. Rebind Related Posts Multilist
    Write-Host "`n--- Rebinding Related Posts Multilist ---" -ForegroundColor White
    foreach ($post in $postsToImport) {
        $pId = [string]$post.id
        if ($createdPostItems.ContainsKey($pId) -and $post.relatedPostIds) {
            $dsItem = $createdPostItems[$pId]
            $relatedGuids = @()
            foreach ($relId in $post.relatedPostIds) {
                $rIdStr = [string]$relId
                if ($createdPostItems.ContainsKey($rIdStr)) {
                    $relatedGuids += $createdPostItems[$rIdStr].ID.ToString()
                }
            }
            if ($relatedGuids.Count -gt 0) {
                $dsItem.Editing.BeginEdit() | Out-Null
                $dsItem["RelatedPosts"] = ($relatedGuids -join "|")
                $dsItem.Editing.EndEdit() | Out-Null
                Write-Host "    [i] Article #$pId linked to related posts: $($relatedGuids.Count)" -ForegroundColor DarkGray
            }
        }
    }

    Write-Host "`n============================================================" -ForegroundColor Green
    Write-Host "[OK] Blog Content and Detail Pages Inserted Successfully!" -ForegroundColor Green
    Write-Host "     Listing Page : $BlogRoutePath" -ForegroundColor Green
    Write-Host "     Total Posts  : $($postsToImport.Count) articles inserted" -ForegroundColor Green
    Write-Host "     Detail Pages : $BlogRoutePath/<id> (e.g. $BlogRoutePath/1)" -ForegroundColor Green
    Write-Host "     Datasources  : $PostsDataPath/<slug>" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error inserting blog pages and datasources: $($_.Exception.Message)" -ForegroundColor Red
    throw
}
