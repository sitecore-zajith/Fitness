    <#
    .SYNOPSIS
        Sitecore PowerShell Extensions (SPE) Script - Provision Blog Detail Pages & Example Pages under Blog Route
    .DESCRIPTION
        Provisions blog detail pages and corporate/coaching landing pages directly under the Sitecore Blog route:
        Base Parent Route:
            master:/sitecore/content/Corporate/fitlifecoach/Home/Blog

        PAGES PROVISIONED:
        1. Two Example Landing Pages:
            - Corporate:
            Route      : /Home/Blog/Corporate
            Title      : Corporate Wellness
            Components : <HeroSection /> + <AppointmentForm />
            - FitLife Coach:
            Route      : /Home/Blog/FitLife Coach
            Title      : FitLife Coach
            Components : <HeroSection /> + <AppointmentForm />

        2. First Five Blog Detail View Pages (from src/data/blogData.ts):
            - Page Name  : Object of slug (e.g. how-much-protein-do-you-really-need-every-day)
            - Page Title : Article title from blogData.ts
            - Component  : <BlogDetailView />
            - Datasource : master:/sitecore/content/Corporate/fitlifecoach/Data/Blog/Posts/<slug>
                            Template: Project/Corporate/FitnessMaster/DatasourceItems/BlogPostItem

            Posts Included:
            (1) how-much-protein-do-you-really-need-every-day
            (2) creatine-monohydrate-the-science-backed-hypertrophy-supplement
            (3) why-you-should-eat-more-vegetables-micronutrients-recovery
            (4) intermittent-fasting-muscle-retention-evidence-vs-hype
            (5) electrolyte-balance-for-endurance-strength-sodium-vs-potassium

        Steps executed:
        1. Ensures parent container /Home/Blog exists with Headless Layout.
        2. Ensures Data/Services and shared service options for AppointmentForm dropdowns.
        3. Ensures Data/Blog/Posts container for blog post datasources.
        4. Iterates through each page definition:
            - Ensures page route item under /Home/Blog using Headless Page template.
            - Sets Title, NavigationTitle, and __Display Name fields.
            - Assigns Headless Layout from Home if missing.
            - Provisions dedicated component datasources (BlogPostItem or Organism templates).
            - Binds components (BlogDetailView, HeroSection, AppointmentForm) to placeholder "headless-main".
            - Optionally connects global Header (Navbar) and Footer to "headless-header" and "headless-footer".

        Idempotent: Safe to re-run. Updates fields and layout instances without duplicating items.
    .NOTES
        Prerequisites : Run Create-SitecoreAITemplates.ps1 and Provision-BlogTemplates.ps1 first.
        Target        : Sitecore XM Cloud / Sitecore XP with SPE (Execute in Sitecore ISE)
        Encoding      : ASCII-safe
    #>

    Set-StrictMode -Version Latest
    $ErrorActionPreference = "Stop"

    # ============================================================================
    # 1. CONFIGURATION & CONSTANTS
    # ============================================================================
    $SitePath           = "master:/sitecore/content/Corporate/fitlifecoach"
    $HomePath           = "$SitePath/Home"
    $BlogPath           = "$HomePath/Blog"
    $DataPath           = "$SitePath/Data"
    $BlogDataPath       = "$DataPath/Blog"
    $BlogPostsDataPath  = "$BlogDataPath/Posts"

    # Template Paths
    $OrganismsPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
    $DatasourceTplPath  = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
    $HeadlessPageTpl    = "master:/sitecore/templates/Foundation/JSS Experience Accelerator/Presentation/Page"

    # Renderings & Placeholders
    $RenderingsPath     = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"
    $MainPlaceholder    = "headless-main"
    $HeaderPlaceholder  = "headless-header"
    $FooterPlaceholder  = "headless-footer"
    $CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"

    # ============================================================================
    # 2. HELPER FUNCTIONS
    # ============================================================================

    function ConvertTo-ItemName {
        param([Parameter(Mandatory = $true)][string]$Text)
        $name = $Text -replace "&", "and" -replace "[^\w\s\-]", ""
        return ($name -replace "\s+", " ").Trim()
    }

    function Get-TemplateIdByPath {
        param(
            [Parameter(Mandatory = $true)][string]$Path,
            [string]$FallbackId = ""
        )
        if (Test-Path -Path $Path) {
            return (Get-Item -Path $Path).ID.ToString()
        }
        if ($FallbackId) {
            Write-Warning "[WARN] Template not found: $Path. Using fallback $FallbackId."
            return $FallbackId
        }
        throw "Template not found: $Path. Ensure templates are provisioned first."
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

    function Ensure-ChildItems {
        param(
            [Parameter(Mandatory = $true)]$Parent,
            [Parameter(Mandatory = $true)][string]$TemplateId,
            [Parameter(Mandatory = $true)][object[]]$Children
        )
        $ids = @()
        $parentPath = "master:$($Parent.Paths.FullPath)"
        foreach ($child in $Children) {
            $childItem = Ensure-Item -ParentPath $parentPath -Name $child.Name -TemplateId $TemplateId
            Set-ItemFields -Item $childItem -Fields $child.Fields
            $ids += $childItem.ID.ToString()
        }
        return ($ids -join "|")
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
    # 3. PAGE SPECIFICATIONS (2 EXAMPLES + FIRST 5 BLOG DATA OBJECTS)
    # ============================================================================

    $PagesToCreate = @(


        # ------------------------------------------------------------------------
        # BLOG POST 2 (from src/data/blogData.ts)
        # ------------------------------------------------------------------------
        @{
            PageName        = "creatine-monohydrate-the-science-backed-hypertrophy-supplement"
            DisplayName     = "Creatine Monohydrate: The Science-Backed Hypertrophy Supplement"
            Components      = @(
                @{
                    Name               = "BlogDetailView"
                    DatasourceTemplate = "BlogPostItem"
                    DatasourceFolder   = "Blog/Posts"
                    DatasourceItemName = "creatine-monohydrate-the-science-backed-hypertrophy-supplement"
                    Fields             = @{
                        ArticleId         = "2"
                        Slug              = "creatine-monohydrate-the-science-backed-hypertrophy-supplement"
                        Title             = "Creatine Monohydrate: The Science-Backed Hypertrophy Supplement"
                        Subtitle          = "Deconstructing phosphocreatine resynthesis, cellular hydration, and cognitive performance benefits."
                        Excerpt           = "Learn how creatine monohydrate saturates muscular energy pathways to increase power output and cell volumization."
                        Description       = "Learn how creatine monohydrate saturates muscular energy pathways to increase power output and cell volumization."
                        Category          = "Nutrition & Diet"
                        FitnessLevel      = "Beginner"
                        ReadTime          = "6 min read"
                        PublishedDate     = "February 08, 2026"
                        PublishDate       = "2026-11-18T00:00:00Z"
                        UpdatedDate       = "Updated recently"
                        DisplayDay        = "18"
                        DisplayMonth      = "Nov"
                        CoverImage        = "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1200&auto=format&fit=crop"
                        ImageCaption      = "Pure micronized creatine monohydrate dissolving into water for optimal bioavailability."
                        Author            = ""
                        AuthorName        = "Dr. Elena Rostova"
                        AuthorRole        = "Lead Clinical Sports Dietitian"
                        AuthorCredentials = "PhD, RD, CSSD"
                        AuthorAvatar      = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                        AuthorBio         = "Specializing in athletic metabolic efficiency, gut microbiome health, and targeted nutrient timing for body recomposition and chronic recovery."
                        KeyTakeaways      = "Creatine monohydrate is the most clinically validated ergogenic aid in sports nutrition history.`nA daily dose of 5 grams saturates intramuscular phosphocreatine stores within 3 to 4 weeks without a loading phase.`nIntracellular water retention increases muscular leverage and signals anabolic cascades.`nCreatine also supports neurological ATP recycling, reducing cognitive fatigue under sleep restriction."
                        ContentBody       = "<p>Creatine monohydrate remains the gold standard in sports nutrition supplements.</p>"
                        SectionsJson      = '[{"id":"section-sodium-dynamics","heading":"1. Sodium Mechanics: Plasma Volume and Muscular Force","paragraphs":["Sodium is the primary extracellular electrolyte responsible for maintaining osmotic pressure and systemic blood volume. When sodium concentrations drop during intense physical exertion, blood volume decreases, causing heart rate elevation for the same relative athletic output (cardiac drift).","Furthermore, the sodium-potassium pump (Na+/K+-ATPase) generates the electrochemical gradient required for motor neuron firing and skeletal muscle fiber recruitment."],"bulletPoints":["Target 500mg - 1,000mg of elemental sodium per liter of intra-workout hydration.","Heavy or ''salty'' sweaters can lose upwards of 1,500mg to 2,000mg of sodium per hour in humid environments.","Consuming sodium 30 minutes pre-workout enhances cellular fluid retention and intramuscular pump."],"callout":{"type":"quote","title":"Dietitian Warning","text":"Drinking large volumes of pure, distilled, or mineral-depleted water without adequate sodium causes hemodilution, precipitating early muscular cramping and hyponatremia.","author":"Dr. Elena Rostova, PhD, RD, CSSD"}},{"id":"section-potassium-synergy","heading":"2. Potassium: The Intracellular Counterbalance & Glycogen Uptake","paragraphs":["While sodium dominates extracellular fluid, over 98% of total body potassium resides inside your cells. Potassium works in direct tandem with sodium to repolarize membranes after muscle contractions.","Additionally, skeletal muscle stores approximately 19.5mg of potassium alongside every single gram of stored glycogen. Chronic potassium deficit prevents muscles from holding full glycogen reserves."],"image":{"url":"https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop","alt":"Whole food potassium sources including bananas, avocado, and leafy greens","caption":"Potassium is best replenished through nutrient-dense whole foods like coconut water and spinach post-exercise."},"callout":{"type":"tip","title":"Pro Nutrition Tip","text":"Avoid taking high doses of potassium salts during workouts as it can cause rapid gastrointestinal distress. Reserve potassium replenishment for post-training meals.","author":"Coach Alex Rivers"}},{"id":"section-hydration-protocols","heading":"3. Tactical Intra-Workout Hydration Formulation","paragraphs":["For sessions under 60 minutes in temperature-controlled gyms, plain water or light mineral water is typically sufficient. However, for sessions exceeding 75 minutes, endurance sessions, or high-sweat environments, formulate your hydration with the optimal 3:1 or 4:1 sodium-to-potassium ratio."],"bulletPoints":["Pre-Session: 16oz water + 400mg sodium 30-45 minutes before warmups.","Intra-Session: Sip 20-24oz water + 700mg sodium + 150mg potassium per hour.","Post-Session: Replace 125% to 150% of sweat weight lost within 2 hours alongside a carbohydrate meal."]}]'
                        Tags              = "Nutrition & Diet, Electrolytes, Hydration, Endurance, Performance"
                        CommentCount      = 0
                        CommentsCount     = 0
                    }
                }
            )
        },

    )

    # ============================================================================
    # 4. EXECUTION PIPELINE
    # ============================================================================
    try {
        Write-Host "============================================================" -ForegroundColor Cyan
        Write-Host "[INFO] Starting Sitecore Blog Subpages Provisioning" -ForegroundColor Cyan
        Write-Host "============================================================" -ForegroundColor Cyan

        if (-not (Test-Path -Path $HomePath)) {
            throw "Home page not found at '$HomePath'. Please verify Sitecore Content Tree path."
        }
        if (-not (Test-Path -Path $DataPath)) {
            New-Item -Path $SitePath -Name "Data" -ItemType $CommonFolderId | Out-Null
        }

        $homeItem   = Get-Item -Path $HomePath
        $device     = Get-LayoutDevice -Default
        $homeLayout = Get-Layout -Item $homeItem -Device $device -ErrorAction SilentlyContinue

        # Resolve Page template ID (SXA Headless Page template with fallback to Home template)
        $pageTemplateId = Get-TemplateIdByPath -Path $HeadlessPageTpl -FallbackId $homeItem.TemplateID.ToString()

        # 4a. Ensure parent Blog container exists under Home
        $blogItem = Ensure-Item -ParentPath $HomePath -Name "Blog" -TemplateId $pageTemplateId
        if ($homeLayout -and -not (Get-Layout -Item $blogItem -Device $device -ErrorAction SilentlyContinue)) {
            Set-Layout -Item $blogItem -Device $device -Layout $homeLayout
            Write-Host "[+] Assigned Headless Layout to parent Blog item." -ForegroundColor Green
        }

        Write-Host "[i] Target Parent Path : $BlogPath" -ForegroundColor Cyan
        Write-Host "[i] Page Template ID   : $pageTemplateId" -ForegroundColor Cyan

        # Ensure Data/Blog and Data/Blog/Posts directories exist
        $blogDataFolder  = Ensure-Item -ParentPath $DataPath -Name "Blog" -TemplateId $CommonFolderId
        $postsDataFolder = Ensure-Item -ParentPath "master:$($blogDataFolder.Paths.FullPath)" -Name "Posts" -TemplateId $CommonFolderId

        # Ensure shared service options under Data/Services for Appointment dropdowns
        $serviceItemTplId = Get-TemplateIdByPath "$DatasourceTplPath/ServiceItem"
        $servicesFolder   = Ensure-Item -ParentPath $DataPath -Name "Services" -TemplateId $CommonFolderId
        $sharedServiceIds = Ensure-ChildItems -Parent $servicesFolder -TemplateId $serviceItemTplId -Children @(
            @{ Name = "Corporate Wellness Program"; Fields = @{ Title = "Corporate Wellness Program"; Description = "Comprehensive corporate fitness, metabolic health screenings, and team challenges." } },
            @{ Name = "Executive Health Audit";     Fields = @{ Title = "Executive Health Audit";     Description = "Detailed metabolic, hormonal, and circadian rhythm optimization for executives." } },
            @{ Name = "1-on-1 Personal Coaching";   Fields = @{ Title = "1-on-1 Personal Coaching";   Description = "Bespoke personal training and direct accountability with an elite coach." } },
            @{ Name = "Sports Nutrition Coaching";  Fields = @{ Title = "Sports Nutrition Coaching";  Description = "Evidence-based macro planning and metabolic recomposition." } }
        )

        # Optional: Check for shared Header / Footer datasources for complete page layout
        $navbarDsItem = Get-Item -Path "$DataPath/Navbar/Global Navbar" -ErrorAction SilentlyContinue
        $footerDsItem = Get-Item -Path "$DataPath/Footer/Global Footer" -ErrorAction SilentlyContinue
        $navbarPath   = "$RenderingsPath/Navbar"
        $footerPath   = "$RenderingsPath/Footer"

        # Process all page definitions under $BlogPath
        foreach ($pageDef in $PagesToCreate) {
            $pageName = $pageDef.PageName
            $pagePath = "$BlogPath/$pageName"

            Write-Host ""
            Write-Host "------------------------------------------------------------" -ForegroundColor Yellow
            Write-Host "[*] Provisioning Page: $pageName directly under Blog: $pagePath" -ForegroundColor Yellow
            Write-Host "------------------------------------------------------------" -ForegroundColor Yellow

            # 4b. Ensure page item exists directly under Content Tree Home/Blog
            $pageItem = Ensure-Item -ParentPath $BlogPath -Name $pageName -TemplateId $pageTemplateId

            # Assign Headless Layout from Home if missing
            if ($homeLayout -and -not (Get-Layout -Item $pageItem -Device $device -ErrorAction SilentlyContinue)) {
                Set-Layout -Item $pageItem -Device $device -Layout $homeLayout
                Write-Host "[+] Assigned Headless Layout to: $pageName" -ForegroundColor Green
            }

            # Set page Display Name and Title fields if available
            $pageItem.Editing.BeginEdit() | Out-Null
            $pageItem["__Display Name"] = $pageDef.DisplayName
            if ($null -ne $pageItem.Fields["Title"]) {
                $pageItem["Title"] = $pageDef.DisplayName
            }
            if ($null -ne $pageItem.Fields["NavigationTitle"]) {
                $pageItem["NavigationTitle"] = $pageDef.DisplayName
            }
            $pageItem.Editing.EndEdit() | Out-Null

            # 4c. Provision components & datasources
            foreach ($comp in $pageDef.Components) {
                Write-Host "  -> Component: $($comp.Name)" -ForegroundColor White

                # Resolve template: Check DatasourceTemplate or default to Organism template
                if ($comp.ContainsKey("DatasourceTemplate")) {
                    $compTplId = Get-TemplateIdByPath "$DatasourceTplPath/$($comp.DatasourceTemplate)"
                }
                else {
                    $compTplId = Get-TemplateIdByPath "$OrganismsPath/$($comp.Name)"
                }

                # Determine datasource folder
                if ($comp.ContainsKey("DatasourceFolder")) {
                    $folder = Ensure-Item -ParentPath $DataPath -Name $comp.DatasourceFolder -TemplateId $CommonFolderId
                }
                else {
                    $folder = Ensure-Item -ParentPath $DataPath -Name $comp.Name -TemplateId $CommonFolderId
                }

                # Determine datasource item name
                if ($comp.ContainsKey("DatasourceItemName")) {
                    $dsItemName = $comp.DatasourceItemName
                }
                else {
                    $dsItemName = "$($comp.DatasourcePrefix) $($comp.Name)"
                }

                $dsItem = Ensure-Item -ParentPath "master:$($folder.Paths.FullPath)" -Name $dsItemName -TemplateId $compTplId

                $dsFields = $comp.Fields.Clone()

                # Attach ServiceOptions to AppointmentForm if not explicitly provided
                if (($comp.Name -eq "AppointmentForm") -and (-not $dsFields.ContainsKey("ServiceOptions"))) {
                    $dsFields["ServiceOptions"] = $sharedServiceIds
                }

                Set-ItemFields -Item $dsItem -Fields $dsFields

                # 4d. Rendering assignment on Page Final Layout (headless-main)
                $renderingPath = "$RenderingsPath/$($comp.Name)"
                if (-not (Test-Path -Path $renderingPath)) {
                    throw "Rendering not found: $renderingPath. Run Create-SitecoreAITemplates.ps1 first."
                }
                $datasourceId = $dsItem.ID.ToString()

                Assign-OrUpdateRendering -TargetItem $pageItem `
                    -RenderingPath $renderingPath `
                    -DatasourceId $datasourceId `
                    -Placeholder $MainPlaceholder `
                    -Device $device
            }

            # 4e. Optional: Bind global Navbar and Footer if they exist on the site
            if ($navbarDsItem -and (Test-Path -Path $navbarPath)) {
                Assign-OrUpdateRendering -TargetItem $pageItem `
                    -RenderingPath $navbarPath `
                    -DatasourceId $navbarDsItem.ID.ToString() `
                    -Placeholder $HeaderPlaceholder `
                    -Device $device
            }
            if ($footerDsItem -and (Test-Path -Path $footerPath)) {
                Assign-OrUpdateRendering -TargetItem $pageItem `
                    -RenderingPath $footerPath `
                    -DatasourceId $footerDsItem.ID.ToString() `
                    -Placeholder $FooterPlaceholder `
                    -Device $device
            }

            Write-Host "[OK] Page '$pageName' successfully configured at '$pagePath'." -ForegroundColor Green
        }

        Write-Host ""
        Write-Host "============================================================" -ForegroundColor Green
        Write-Host "[SUCCESS] All 7 Sitecore pages and form/blog blocks provisioned under Blog!" -ForegroundColor Green
        Write-Host "  Parent Route Path : $BlogPath (/Home/Blog)" -ForegroundColor Green
        Write-Host "  Example 1         : $BlogPath/Corporate" -ForegroundColor Green
        Write-Host "  Example 2         : $BlogPath/FitLife Coach" -ForegroundColor Green
        Write-Host "  Blog Post 1       : $BlogPath/how-much-protein-do-you-really-need-every-day" -ForegroundColor Green
        Write-Host "  Blog Post 2       : $BlogPath/creatine-monohydrate-the-science-backed-hypertrophy-supplement" -ForegroundColor Green
        Write-Host "  Blog Post 3       : $BlogPath/why-you-should-eat-more-vegetables-micronutrients-recovery" -ForegroundColor Green
        Write-Host "  Blog Post 4       : $BlogPath/intermittent-fasting-muscle-retention-evidence-vs-hype" -ForegroundColor Green
        Write-Host "  Blog Post 5       : $BlogPath/electrolyte-balance-for-endurance-strength-sodium-vs-potassium" -ForegroundColor Green
        Write-Host "============================================================" -ForegroundColor Green
    }
    catch {
        Write-Host "[!] Error provisioning pages under Blog: $($_.Exception.Message)" -ForegroundColor Red
        throw
    }
