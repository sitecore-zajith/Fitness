<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Ensure Header (Navbar) & Footer on All Sitecore Pages
.DESCRIPTION
    Applies the global Header (Navbar) and Footer components across the entire FitLife site hierarchy.
    Architecture:
      1. Validates / provisions the shared Navbar and Footer datasources under Data/Navbar and Data/Footer.
      2. Ensures the SXA Partial Designs "Header" and "Footer" exist under Presentation/Partial Designs
         bound to placeholders "headless-header" and "headless-footer".
      3. Ensures the SXA Default Page Design links both Header & Footer Partial Designs so any newly
         created page inherits them automatically.
      4. Automatically creates any missing standard site pages (About, Services, Products, Gallery, Blog, Contact)
         under /sitecore/content/Corporate/FitLife/Home.
      5. Directly binds Navbar to "headless-header" and Footer to "headless-footer" on the Final Layout
         of every page item under Home (Home, About, Services, Products, Gallery, Blog, Contact)
         so they render immediately with or without SXA Page Designs.
    Idempotent: safe to run multiple times. Updates layout instances without duplicating them.
.NOTES
    Prerequisites : Run Create-SitecoreAITemplates.ps1 first.
    Target        : Sitecore XM Cloud / Sitecore XP with SPE (Execute in Sitecore ISE)
    Encoding      : ASCII-safe
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# 1. CONFIGURATION
# ============================================================================
$SitePath               = "master:/sitecore/content/Corporate/fitlifecoach"
$HomePath               = "$SitePath/Home"
$DataPath               = "$SitePath/Data"
$PresentationPath       = "$SitePath/Presentation"
$PartialDesignsPath     = "$PresentationPath/Partial Designs"
$PageDesignsPath        = "$PresentationPath/Page Designs"

$OrganismsPath          = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath         = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"

$CommonFolderId         = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"

# SXA / JSS Template paths
$PartialDesignFolderTpl = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Partial Designs/Partial Designs Folder"
$PartialDesignItemTpl   = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Partial Designs/Partial Design"
$PageDesignFolderTpl    = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Page Designs/Page Designs Folder"
$PageDesignItemTpl      = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Page Designs/Page Design"
$HeadlessPageTpl        = "master:/sitecore/templates/Foundation/JSS Experience Accelerator/Presentation/Page"

# Placeholder keys for XM Cloud Headless Layout
$HeaderPlaceholder      = "headless-header"
$FooterPlaceholder      = "headless-footer"

# Site routes to ensure exist under Home
$SitePages = @(
    @{ Name = "About";    Title = "About Us";       PageName = "About" },
    @{ Name = "Services"; Title = "Our Services";   PageName = "Services" },
    @{ Name = "Products"; Title = "Store Products"; PageName = "Products" },
    @{ Name = "Gallery";  Title = "Photo Gallery";  PageName = "Gallery" },
    @{ Name = "Blog";     Title = "Latest News";    PageName = "Blog" },
    @{ Name = "Contact";  Title = "Contact Us";     PageName = "Contact" }
)

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
    throw "Template not found: $Path. Run Create-SitecoreAITemplates.ps1 first."
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
    Write-Host "[+] Creating: $itemPath" -ForegroundColor Cyan
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
            continue
        }
        $Item[$kvp.Key] = $kvp.Value
    }
    $Item.Editing.EndEdit() | Out-Null
}

function New-LinkValue {
    param(
        [Parameter(Mandatory = $true)][string]$Url,
        [Parameter(Mandatory = $true)][string]$Text,
        [string]$Target = ""
    )
    $linkType = $(if ($Url -like "http*") { "external" } else { "internal" })
    return "<link linktype=`"$linkType`" url=`"$Url`" text=`"$Text`" target=`"$Target`" />"
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
        throw "Rendering item not found: $RenderingPath. Run Create-SitecoreAITemplates.ps1 first."
    }
    $renderingItem = Get-Item -Path $RenderingPath

    $existing = @(Get-Rendering -Item $TargetItem -Rendering $renderingItem -Device $Device -FinalLayout -ErrorAction SilentlyContinue)
    if ($existing.Count -gt 0) {
        foreach ($instance in $existing) {
            $instance.Datasource = $DatasourceId
            $instance.Placeholder = $Placeholder
            Set-Rendering -Item $TargetItem -Instance $instance -FinalLayout
        }
        Write-Host "    [i] Rebound $($renderingItem.Name) -> $Placeholder" -ForegroundColor Yellow
    }
    else {
        $instance = $renderingItem | New-Rendering -Placeholder $Placeholder
        Add-Rendering -Item $TargetItem -Instance $instance -Placeholder $Placeholder -DataSource $DatasourceId -Device $Device -FinalLayout
        Write-Host "    [+] Added $($renderingItem.Name) -> $Placeholder" -ForegroundColor Green
    }
}

# ============================================================================
# 3. MAIN EXECUTION
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Ensuring Header & Footer on ALL Pages for FitLife Site" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    if (-not (Test-Path -Path $SitePath)) {
        throw "Site path not found: $SitePath. Create the FitLife headless site first."
    }
    if (-not (Test-Path -Path $HomePath)) {
        throw "Home page not found: $HomePath. Please create the Home item first."
    }

    $device = Get-LayoutDevice -Default

    # 3.1 Ensure Data folder & Global folder
    $dataFolder   = Ensure-Item -ParentPath $SitePath -Name "Data" -TemplateId $CommonFolderId
    $globalFolder = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Global" -TemplateId $CommonFolderId
    $navbarFolder = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Navbar" -TemplateId $CommonFolderId
    $footerFolder = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Footer" -TemplateId $CommonFolderId

    # 3.2 Resolve Template IDs
    $navLinkTplId = Get-TemplateIdByPath "$DatasourceTplPath/NavigationLinkItem"
    $navbarTplId  = Get-TemplateIdByPath "$OrganismsPath/Navbar"
    $footerTplId  = Get-TemplateIdByPath "$OrganismsPath/Footer"

    # 3.3 Ensure Header & Footer Shared Navigation Links
    $headerLinksFolder = Ensure-Item -ParentPath "master:$($globalFolder.Paths.FullPath)" -Name "Header Links" -TemplateId $CommonFolderId
    $headerLinkDefs = @(
        @{ Name = "Home";     Fields = @{ LinkTitle = "Home";     TargetLink = New-LinkValue -Url "/" -Text "Home" } },
        @{ Name = "About";    Fields = @{ LinkTitle = "About";    TargetLink = New-LinkValue -Url "/about" -Text "About" } },
        @{ Name = "Services"; Fields = @{ LinkTitle = "Services"; TargetLink = New-LinkValue -Url "/services" -Text "Services" } },
        @{ Name = "Products"; Fields = @{ LinkTitle = "Products"; TargetLink = New-LinkValue -Url "/products" -Text "Products" } },
        @{ Name = "Gallery";  Fields = @{ LinkTitle = "Gallery";  TargetLink = New-LinkValue -Url "/gallery" -Text "Gallery" } },
        @{ Name = "Blog";     Fields = @{ LinkTitle = "Blog";     TargetLink = New-LinkValue -Url "/blog" -Text "Blog" } },
        @{ Name = "Contact";  Fields = @{ LinkTitle = "Contact";  TargetLink = New-LinkValue -Url "/contact" -Text "Contact" } }
    )
    $headerLinkIds = Ensure-ChildItems -Parent $headerLinksFolder -TemplateId $navLinkTplId -Children $headerLinkDefs

    $footerQuickLinksFolder = Ensure-Item -ParentPath "master:$($globalFolder.Paths.FullPath)" -Name "Footer Quick Links" -TemplateId $CommonFolderId
    $footerQuickLinkDefs = @(
        @{ Name = "Home";     Fields = @{ LinkTitle = "Home";     TargetLink = New-LinkValue -Url "/" -Text "Home" } },
        @{ Name = "About Us"; Fields = @{ LinkTitle = "About Us"; TargetLink = New-LinkValue -Url "/about" -Text "About Us" } },
        @{ Name = "Services"; Fields = @{ LinkTitle = "Services"; TargetLink = New-LinkValue -Url "/services" -Text "Services" } },
        @{ Name = "Gallery";  Fields = @{ LinkTitle = "Gallery";  TargetLink = New-LinkValue -Url "/gallery" -Text "Gallery" } },
        @{ Name = "Blog";     Fields = @{ LinkTitle = "Blog";     TargetLink = New-LinkValue -Url "/blog" -Text "Blog" } }
    )
    $footerQuickLinkIds = Ensure-ChildItems -Parent $footerQuickLinksFolder -TemplateId $navLinkTplId -Children $footerQuickLinkDefs

    $footerServiceLinksFolder = Ensure-Item -ParentPath "master:$($globalFolder.Paths.FullPath)" -Name "Footer Service Links" -TemplateId $CommonFolderId
    $footerServiceLinkDefs = @(
        @{ Name = "Weight Loss Program"; Fields = @{ LinkTitle = "Weight Loss Program"; TargetLink = New-LinkValue -Url "/services" -Text "Weight Loss Program" } },
        @{ Name = "Sports Nutrition";    Fields = @{ LinkTitle = "Sports Nutrition";    TargetLink = New-LinkValue -Url "/services" -Text "Sports Nutrition" } },
        @{ Name = "Individual Coaching"; Fields = @{ LinkTitle = "Individual Coaching"; TargetLink = New-LinkValue -Url "/services" -Text "Individual Coaching" } },
        @{ Name = "Workout Routines";    Fields = @{ LinkTitle = "Workout Routines";    TargetLink = New-LinkValue -Url "/services" -Text "Workout Routines" } }
    )
    $footerServiceLinkIds = Ensure-ChildItems -Parent $footerServiceLinksFolder -TemplateId $navLinkTplId -Children $footerServiceLinkDefs

    # 3.4 Ensure Global Navbar & Footer Datasource Items
    $navbarDsItem = Ensure-Item -ParentPath "master:$($navbarFolder.Paths.FullPath)" -Name "Global Navbar" -TemplateId $navbarTplId
    Set-ItemFields -Item $navbarDsItem -Fields @{
        BrandPrefix     = "FitLife"
        BrandSuffix     = "Coach"
        DesktopCtaLink  = New-LinkValue -Url "/#appointment" -Text "Appointment"
        MobileCtaLink   = New-LinkValue -Url "/#appointment" -Text "Make an Appointment"
        NavigationLinks = $headerLinkIds
    }
    $navbarDsId = $navbarDsItem.ID.ToString()

    $footerDsItem = Ensure-Item -ParentPath "master:$($footerFolder.Paths.FullPath)" -Name "Global Footer" -TemplateId $footerTplId
    Set-ItemFields -Item $footerDsItem -Fields @{
        BrandPrefix       = "FitLife"
        BrandSuffix       = "Coach"
        BrandSummary      = "Better Eat, Better Life. Empowering you to achieve your health and wellness goals through personalized coaching, nutrition, and support."
        FacebookLink      = New-LinkValue -Url "https://facebook.com" -Text "Facebook" -Target "_blank"
        InstagramLink     = New-LinkValue -Url "https://instagram.com" -Text "Instagram" -Target "_blank"
        TwitterLink       = New-LinkValue -Url "https://twitter.com" -Text "Twitter" -Target "_blank"
        YoutubeLink       = New-LinkValue -Url "https://youtube.com" -Text "YouTube" -Target "_blank"
        QuickLinksHeading = "Quick Links"
        QuickLinks        = $footerQuickLinkIds
        ServicesHeading   = "Our Services"
        ServiceLinks      = $footerServiceLinkIds
        ContactHeading    = "Contact Us"
        Address           = "123 Fitness Avenue, Wellness City, NY 10001"
        Email             = "info@fitlifecoach.com"
        Phone             = "+1 (555) 123-4567"
        CopyrightText     = "FitLifeCoach. All rights reserved."
    }
    $footerDsId = $footerDsItem.ID.ToString()

    # ========================================================================
    # 4. CONFIGURE SXA PARTIAL DESIGNS & PAGE DESIGN
    # ========================================================================
    if (Test-Path -Path $PresentationPath) {
        $partialDesignFolderTplId = Get-TemplateIdByPath -Path $PartialDesignFolderTpl -FallbackId $CommonFolderId
        $partialDesignItemTplId   = Get-TemplateIdByPath -Path $PartialDesignItemTpl -FallbackId $CommonFolderId
        $pageDesignFolderTplId    = Get-TemplateIdByPath -Path $PageDesignFolderTpl -FallbackId $CommonFolderId
        $pageDesignItemTplId      = Get-TemplateIdByPath -Path $PageDesignItemTpl -FallbackId $CommonFolderId

        $partialDesignsFolder = Ensure-Item -ParentPath $PresentationPath -Name "Partial Designs" -TemplateId $partialDesignFolderTplId
        $pageDesignsFolder    = Ensure-Item -ParentPath $PresentationPath -Name "Page Designs" -TemplateId $pageDesignFolderTplId

        # 4.1 Header Partial Design
        $headerPD = Ensure-Item -ParentPath "master:$($partialDesignsFolder.Paths.FullPath)" -Name "Header" -TemplateId $partialDesignItemTplId
        Assign-OrUpdateRendering -TargetItem $headerPD `
            -RenderingPath "$RenderingsPath/Navbar" `
            -DatasourceId $navbarDsId `
            -Placeholder $HeaderPlaceholder `
            -Device $device

        # 4.2 Footer Partial Design
        $footerPD = Ensure-Item -ParentPath "master:$($partialDesignsFolder.Paths.FullPath)" -Name "Footer" -TemplateId $partialDesignItemTplId
        Assign-OrUpdateRendering -TargetItem $footerPD `
            -RenderingPath "$RenderingsPath/Footer" `
            -DatasourceId $footerDsId `
            -Placeholder $FooterPlaceholder `
            -Device $device

        # 4.3 Default Page Design (linking Header and Footer)
        $defaultPageDesign = Ensure-Item -ParentPath "master:$($pageDesignsFolder.Paths.FullPath)" -Name "Default" -TemplateId $pageDesignItemTplId
        $partialDesignIds = "$($headerPD.ID)|$($footerPD.ID)"
        Set-ItemFields -Item $defaultPageDesign -Fields @{ "PartialDesigns" = $partialDesignIds }
        Write-Host "[+] Configured SXA Default Page Design with Header & Footer Partial Designs" -ForegroundColor Green
    }

    # ========================================================================
    # 5. ENSURE SITE PAGES EXIST UNDER HOME
    # ========================================================================
    $homeItem = Get-Item -Path $HomePath
    $pageTemplateId = $homeItem.TemplateID.ToString()

    $allPages = @($homeItem)
    foreach ($p in $SitePages) {
        $pageItem = Ensure-Item -ParentPath $HomePath -Name $p.Name -TemplateId $pageTemplateId
        Set-ItemFields -Item $pageItem -Fields @{
            "Title" = $p.Title
        }
        $allPages += $pageItem
    }

    # ========================================================================
    # 6. ASSIGN HEADER & FOOTER TO FINAL LAYOUT OF ALL PAGES
    # ========================================================================
    Write-Host "`n--- Assigning Header & Footer to Final Layout of All Pages ---" -ForegroundColor White

    foreach ($page in $allPages) {
        Write-Host "Updating page: $($page.Paths.FullPath)" -ForegroundColor Cyan

        # 6.1 Assign Navbar to headless-header
        Assign-OrUpdateRendering -TargetItem $page `
            -RenderingPath "$RenderingsPath/Navbar" `
            -DatasourceId $navbarDsId `
            -Placeholder $HeaderPlaceholder `
            -Device $device

        # 6.2 Assign Footer to headless-footer
        Assign-OrUpdateRendering -TargetItem $page `
            -RenderingPath "$RenderingsPath/Footer" `
            -DatasourceId $footerDsId `
            -Placeholder $FooterPlaceholder `
            -Device $device
    }

    Write-Host "`n============================================================" -ForegroundColor Green
    Write-Host "[OK] Header & Footer successfully provisioned on ALL pages!" -ForegroundColor Green
    Write-Host "     Total pages processed : $($allPages.Count)" -ForegroundColor Green
    Write-Host "     Pages list            : $(($allPages | ForEach-Object { $_.Name }) -join ', ')" -ForegroundColor Green
    Write-Host "     Header Placeholder    : $HeaderPlaceholder" -ForegroundColor Green
    Write-Host "     Footer Placeholder    : $FooterPlaceholder" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning Header and Footer on all pages: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

