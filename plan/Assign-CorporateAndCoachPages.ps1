<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Provision Corporate & FitLife Coach Pages under Blog Route
.DESCRIPTION
    Provisions the two new content pages directly under the Blog route in the Sitecore Content Tree:
      1. Corporate Page:
         master:/sitecore/content/Corporate/fitlifecoach/Home/Blog/Corporate
         - Subtitle: "Empower your workforce with tailored enterprise fitness, metabolic health audits, and executive wellness programs."
         - Components: <HeroSection /> + <AppointmentForm /> (Corporate Form Block)

      2. FitLife Coach Page:
         master:/sitecore/content/Corporate/fitlifecoach/Home/Blog/FitLife Coach
         - Subtitle: "Connect with a dedicated elite coach for personalized strength, functional nutrition, and habit architecture."
         - Components: <HeroSection /> + <AppointmentForm /> (FitLife Coach Form Block)

    TARGET HIERARCHY:
      - Parent Container : master:/sitecore/content/Corporate/fitlifecoach/Home/Blog
      - Page Routes      : /Home/Blog/Corporate and /Home/Blog/FitLife Coach
      - Datasources      : master:/sitecore/content/Corporate/fitlifecoach/Data/<ComponentName>/

    Steps executed:
      1. Validates the Home route and ensures the parent Blog container exists under Home.
      2. Ensures shared service options under Data/Services for the AppointmentForm dropdowns.
      3. For each of the two pages:
         - Ensures the page item is created directly under Home/Blog using Headless Page template.
         - Checks for any legacy item at Home/<PageName> and flags/cleans it if present.
         - Sets Title, NavigationTitle, and __Display Name fields.
         - Assigns the Headless Layout to the page item.
         - Provisions dedicated datasource items under Data/HeroSection/ and Data/AppointmentForm/.
         - Adds or rebinds the Json Renderings (HeroSection, AppointmentForm) to Final Layout in placeholder "headless-main".
         - Optionally binds global Header (Navbar) and Footer to "headless-header" and "headless-footer" if available.

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
# 3. PAGE SPECIFICATIONS & CONTENT DATA (UNDER BLOG ROUTE)
# ============================================================================

$PagesToCreate = @(
    @{
        PageName        = "Corporate"
        DisplayName     = "Corporate Wellness"
        DatasourcePrefix= "Corporate"
        Components      = @(
            @{
                Name   = "HeroSection"
                Fields = @{
                    Title    = "Corporate Wellness & Executive Health"
                    PageName = "Corporate"
                }
            },
            @{
                Name   = "AppointmentForm"
                Fields = @{
                    Title            = "Request Corporate Consultation"
                    Subtitle         = "Empower your workforce with tailored enterprise fitness, metabolic health audits, and executive wellness programs."
                    PanelTitle       = "Invest in Team Vitality & Peak Productivity"
                    PanelDescription = "Take the first step towards building a resilient, high-performing organization. Complete the inquiry form and our corporate wellness director will deliver a custom proposal within 24 hours."
                    Address          = "123 Fitness Avenue, Executive Suite 500, Wellness City"
                    Phone            = "+1 (555) 019-CORP"
                    Email            = "corporate@fitlifecoach.com"
                    SubmitButtonText = "Request Corporate Proposal"
                    SubmitEndpoint   = "/api/corporate"
                }
            }
        )
    },
    @{
        PageName        = "FitLife Coach"
        DisplayName     = "FitLife Coach"
        DatasourcePrefix= "FitLife Coach"
        Components      = @(
            @{
                Name   = "HeroSection"
                Fields = @{
                    Title    = "FitLife Coach 1-on-1 Consultation"
                    PageName = "FitLife Coach"
                }
            },
            @{
                Name   = "AppointmentForm"
                Fields = @{
                    Title            = "Book Your 1-on-1 Coaching Session"
                    Subtitle         = "Connect with a dedicated elite coach for personalized strength, functional nutrition, and habit architecture."
                    PanelTitle       = "Transform Your Health With an Elite Coach"
                    PanelDescription = "Start your transformation journey today. Fill out your details, and your matched FitLife coach will review your assessment and reach out within 24 hours to schedule your strategy session."
                    Address          = "123 Fitness Avenue, Performance Studio, Wellness City"
                    Phone            = "+1 (555) 123-COACH"
                    Email            = "coach@fitlifecoach.com"
                    SubmitButtonText = "Schedule Consultation"
                    SubmitEndpoint   = "/api/coach-appointment"
                }
            }
        )
    }
)

# ============================================================================
# 4. EXECUTION PIPELINE
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Starting Corporate & Coach Pages Provisioning Under Blog" -ForegroundColor Cyan
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

    # 4a. Ensure the parent Blog page item exists under Home
    $blogItem = Ensure-Item -ParentPath $HomePath -Name "Blog" -TemplateId $pageTemplateId
    if ($homeLayout -and -not (Get-Layout -Item $blogItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $blogItem -Device $device -Layout $homeLayout
        Write-Host "[+] Assigned Headless Layout to parent Blog item." -ForegroundColor Green
    }

    Write-Host "[i] Target Parent Path : $BlogPath" -ForegroundColor Cyan
    Write-Host "[i] Page Template ID   : $pageTemplateId" -ForegroundColor Cyan

    # Ensure shared service options under Data/Services for the Appointment dropdowns
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

    # Process each page definition under $BlogPath
    foreach ($pageDef in $PagesToCreate) {
        $pageName = $pageDef.PageName
        $pagePath = "$BlogPath/$pageName"

        Write-Host ""
        Write-Host "------------------------------------------------------------" -ForegroundColor Yellow
        Write-Host "[*] Provisioning Page: $pageName directly under Blog: $pagePath" -ForegroundColor Yellow
        Write-Host "------------------------------------------------------------" -ForegroundColor Yellow

        # Clean up legacy item at root Home if it exists there previously
        $oldRootItemPath = "$HomePath/$pageName"
        if (Test-Path -Path $oldRootItemPath) {
            Write-Warning "[WARN] Found existing item at '$oldRootItemPath'. Ensuring new canonical item under Blog: '$pagePath'."
        }

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

            $orgTplId   = Get-TemplateIdByPath "$OrganismsPath/$($comp.Name)"
            $folder     = Ensure-Item -ParentPath $DataPath -Name $comp.Name -TemplateId $CommonFolderId
            $dsItemName = "$($pageDef.DatasourcePrefix) $($comp.Name)"
            $dsItem     = Ensure-Item -ParentPath "master:$($folder.Paths.FullPath)" -Name $dsItemName -TemplateId $orgTplId

            $dsFields   = $comp.Fields.Clone()

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
            $datasourceId  = $dsItem.ID.ToString()

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
    Write-Host "[SUCCESS] All Sitecore pages and form blocks provisioned under Blog!" -ForegroundColor Green
    Write-Host "  Parent Route Path    : $BlogPath (/Home/Blog)" -ForegroundColor Green
    Write-Host "  1. Corporate Page    : $BlogPath/Corporate" -ForegroundColor Green
    Write-Host "  2. FitLife Coach Page: $BlogPath/FitLife Coach" -ForegroundColor Green
    Write-Host "  Datasources Location : $DataPath/<ComponentName>/" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning Corporate & Coach pages under Blog: $($_.Exception.Message)" -ForegroundColor Red
    throw
}
