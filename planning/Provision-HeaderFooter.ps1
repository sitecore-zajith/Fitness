<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Provision Header (Navbar) & Footer Datasources and Presentation
.DESCRIPTION
    Provisions the global Header (Navbar) and Footer components for the FitLife site:
      1. Creates global navigation items under:
           master:/sitecore/content/Corporate/FitLife/Data/Global/Header Links (7 NavigationLinkItems)
           master:/sitecore/content/Corporate/FitLife/Data/Global/Footer Quick Links (5 NavigationLinkItems)
           master:/sitecore/content/Corporate/FitLife/Data/Global/Footer Service Links (4 NavigationLinkItems)
      2. Creates Header and Footer datasource items with full fields matching src/sitecore/components:
           master:/sitecore/content/Corporate/FitLife/Data/Navbar/Global Navbar
           master:/sitecore/content/Corporate/FitLife/Data/Footer/Global Footer
      3. Provisions SXA Partial Designs under:
           master:/sitecore/content/Corporate/FitLife/Presentation/Partial Designs/Header (rendering: Navbar -> headless-header)
           master:/sitecore/content/Corporate/FitLife/Presentation/Partial Designs/Footer (rendering: Footer -> headless-footer)
      4. Optionally assigns Header & Footer directly to the Home page layout (if Partial Designs are not used).
    Idempotent: updates existing items and layout instances without duplication.
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

$OrganismsPath          = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath         = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"

$CommonFolderId         = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$PartialDesignFolderTpl = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Partial Designs/Partial Designs Folder"
$PartialDesignItemTpl   = "master:/sitecore/templates/Foundation/Experience Accelerator/Presentation/Partial Designs/Partial Design"

# Placeholder keys for XM Cloud Headless Layout
$HeaderPlaceholder      = "headless-header"
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
            Write-Warning "[WARN] Field '$($kvp.Key)' not found on '$($Item.Paths.FullPath)'. Skipped."
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
        Write-Host "[i] Rebound rendering: $($renderingItem.Name) -> $Placeholder" -ForegroundColor Yellow
    }
    else {
        $instance = $renderingItem | New-Rendering -Placeholder $Placeholder
        Add-Rendering -Item $TargetItem -Instance $instance -Placeholder $Placeholder -DataSource $DatasourceId -Device $Device -FinalLayout
        Write-Host "[+] Added rendering: $($renderingItem.Name) -> $Placeholder" -ForegroundColor Green
    }
}

# ============================================================================
# 3. PROVISION HEADER & FOOTER ITEMS
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Provisioning Header and Footer for Sitecore XM Cloud" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    if (-not (Test-Path -Path $SitePath)) {
        throw "Site path not found: $SitePath. Run Create-SitecoreAITemplates.ps1 first."
    }

    # 3.1 Ensure folder structure under Data
    $dataFolder   = Ensure-Item -ParentPath $SitePath -Name "Data" -TemplateId $CommonFolderId
    $globalFolder = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Global" -TemplateId $CommonFolderId
    $navbarFolder = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Navbar" -TemplateId $CommonFolderId
    $footerFolder = Ensure-Item -ParentPath "master:$($dataFolder.Paths.FullPath)" -Name "Footer" -TemplateId $CommonFolderId

    # 3.2 Resolve Template IDs
    $navLinkTplId  = Get-TemplateIdByPath "$DatasourceTplPath/NavigationLinkItem"
    $navbarTplId   = Get-TemplateIdByPath "$OrganismsPath/Navbar"
    $footerTplId   = Get-TemplateIdByPath "$OrganismsPath/Footer"

    # ------------------------------------------------------------------------
    # 3.3 Provision Shared Navigation Links
    # ------------------------------------------------------------------------
    $headerLinksFolder = Ensure-Item -ParentPath "master:$($globalFolder.Paths.FullPath)" -Name "Header Links" -TemplateId $CommonFolderId
    $headerLinkDefinitions = @(
        @{ Name = "Home";     Fields = @{ LinkTitle = "Home";     TargetLink = New-LinkValue -Url "/" -Text "Home" } },
        @{ Name = "About";    Fields = @{ LinkTitle = "About";    TargetLink = New-LinkValue -Url "/about" -Text "About" } },
        @{ Name = "Services"; Fields = @{ LinkTitle = "Services"; TargetLink = New-LinkValue -Url "/services" -Text "Services" } },
        @{ Name = "Products"; Fields = @{ LinkTitle = "Products"; TargetLink = New-LinkValue -Url "/products" -Text "Products" } },
        @{ Name = "Gallery";  Fields = @{ LinkTitle = "Gallery";  TargetLink = New-LinkValue -Url "/gallery" -Text "Gallery" } },
        @{ Name = "Blog";     Fields = @{ LinkTitle = "Blog";     TargetLink = New-LinkValue -Url "/blog" -Text "Blog" } },
        @{ Name = "Contact";  Fields = @{ LinkTitle = "Contact";  TargetLink = New-LinkValue -Url "/contact" -Text "Contact" } }
    )
    $headerLinkIds = Ensure-ChildItems -Parent $headerLinksFolder -TemplateId $navLinkTplId -Children $headerLinkDefinitions

    $footerQuickLinksFolder = Ensure-Item -ParentPath "master:$($globalFolder.Paths.FullPath)" -Name "Footer Quick Links" -TemplateId $CommonFolderId
    $footerQuickLinkDefinitions = @(
        @{ Name = "Home";     Fields = @{ LinkTitle = "Home";     TargetLink = New-LinkValue -Url "/" -Text "Home" } },
        @{ Name = "About Us"; Fields = @{ LinkTitle = "About Us"; TargetLink = New-LinkValue -Url "/about" -Text "About Us" } },
        @{ Name = "Services"; Fields = @{ LinkTitle = "Services"; TargetLink = New-LinkValue -Url "/services" -Text "Services" } },
        @{ Name = "Gallery";  Fields = @{ LinkTitle = "Gallery";  TargetLink = New-LinkValue -Url "/gallery" -Text "Gallery" } },
        @{ Name = "Blog";     Fields = @{ LinkTitle = "Blog";     TargetLink = New-LinkValue -Url "/blog" -Text "Blog" } }
    )
    $footerQuickLinkIds = Ensure-ChildItems -Parent $footerQuickLinksFolder -TemplateId $navLinkTplId -Children $footerQuickLinkDefinitions

    $footerServiceLinksFolder = Ensure-Item -ParentPath "master:$($globalFolder.Paths.FullPath)" -Name "Footer Service Links" -TemplateId $CommonFolderId
    $footerServiceLinkDefinitions = @(
        @{ Name = "Weight Loss Program"; Fields = @{ LinkTitle = "Weight Loss Program"; TargetLink = New-LinkValue -Url "/services" -Text "Weight Loss Program" } },
        @{ Name = "Sports Nutrition";    Fields = @{ LinkTitle = "Sports Nutrition";    TargetLink = New-LinkValue -Url "/services" -Text "Sports Nutrition" } },
        @{ Name = "Individual Coaching"; Fields = @{ LinkTitle = "Individual Coaching"; TargetLink = New-LinkValue -Url "/services" -Text "Individual Coaching" } },
        @{ Name = "Workout Routines";    Fields = @{ LinkTitle = "Workout Routines";    TargetLink = New-LinkValue -Url "/services" -Text "Workout Routines" } }
    )
    $footerServiceLinkIds = Ensure-ChildItems -Parent $footerServiceLinksFolder -TemplateId $navLinkTplId -Children $footerServiceLinkDefinitions

    # ------------------------------------------------------------------------
    # 3.4 Provision Navbar Datasource Item
    # ------------------------------------------------------------------------
    $navbarDsItem = Ensure-Item -ParentPath "master:$($navbarFolder.Paths.FullPath)" -Name "Global Navbar" -TemplateId $navbarTplId
    $navbarFields = @{
        BrandPrefix     = "FitLife"
        BrandSuffix     = "Coach"
        DesktopCtaLink  = New-LinkValue -Url "/#appointment" -Text "Appointment"
        MobileCtaLink   = New-LinkValue -Url "/#appointment" -Text "Make an Appointment"
        NavigationLinks = $headerLinkIds
    }
    Set-ItemFields -Item $navbarDsItem -Fields $navbarFields
    Write-Host "[+] Updated Navbar Datasource: $($navbarDsItem.Paths.FullPath)" -ForegroundColor Green

    # ------------------------------------------------------------------------
    # 3.5 Provision Footer Datasource Item
    # ------------------------------------------------------------------------
    $footerDsItem = Ensure-Item -ParentPath "master:$($footerFolder.Paths.FullPath)" -Name "Global Footer" -TemplateId $footerTplId
    $footerFields = @{
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
    Set-ItemFields -Item $footerDsItem -Fields $footerFields
    Write-Host "[+] Updated Footer Datasource: $($footerDsItem.Paths.FullPath)" -ForegroundColor Green

    # ========================================================================
    # 4. PROVISION SXA PARTIAL DESIGNS (Headless Architecture standard)
    # ========================================================================
    $device = Get-LayoutDevice -Default

    $partialDesignFolderTplId = Get-TemplateIdByPath -Path $PartialDesignFolderTpl -FallbackId $CommonFolderId
    $partialDesignItemTplId   = Get-TemplateIdByPath -Path $PartialDesignItemTpl -FallbackId $CommonFolderId

    if (Test-Path -Path $PresentationPath) {
        $partialDesignsFolder = Ensure-Item -ParentPath $PresentationPath -Name "Partial Designs" -TemplateId $partialDesignFolderTplId

        # 4.1 Header Partial Design
        $headerPartialDesign = Ensure-Item -ParentPath "master:$($partialDesignsFolder.Paths.FullPath)" -Name "Header" -TemplateId $partialDesignItemTplId
        Assign-OrUpdateRendering -TargetItem $headerPartialDesign `
            -RenderingPath "$RenderingsPath/Navbar" `
            -DatasourceId $navbarDsItem.ID.ToString() `
            -Placeholder $HeaderPlaceholder `
            -Device $device

        # 4.2 Footer Partial Design
        $footerPartialDesign = Ensure-Item -ParentPath "master:$($partialDesignsFolder.Paths.FullPath)" -Name "Footer" -TemplateId $partialDesignItemTplId
        Assign-OrUpdateRendering -TargetItem $footerPartialDesign `
            -RenderingPath "$RenderingsPath/Footer" `
            -DatasourceId $footerDsItem.ID.ToString() `
            -Placeholder $FooterPlaceholder `
            -Device $device

        Write-Host "[+] Configured SXA Partial Designs: Header & Footer" -ForegroundColor Green
    }

    # ========================================================================
    # 5. ASSIGN DIRECTLY TO HOME PAGE (for instant standalone testing)
    # ========================================================================
    if (Test-Path -Path $HomePath) {
        $homeItem = Get-Item -Path $HomePath
        Assign-OrUpdateRendering -TargetItem $homeItem `
            -RenderingPath "$RenderingsPath/Navbar" `
            -DatasourceId $navbarDsItem.ID.ToString() `
            -Placeholder $HeaderPlaceholder `
            -Device $device

        Assign-OrUpdateRendering -TargetItem $homeItem `
            -RenderingPath "$RenderingsPath/Footer" `
            -DatasourceId $footerDsItem.ID.ToString() `
            -Placeholder $FooterPlaceholder `
            -Device $device

        Write-Host "[+] Assigned Header & Footer to Home Page Final Layout" -ForegroundColor Green
    }

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Header and Footer provisioning completed successfully!" -ForegroundColor Green
    Write-Host "     Navbar Datasource : $($navbarDsItem.Paths.FullPath)" -ForegroundColor Green
    Write-Host "     Footer Datasource : $($footerDsItem.Paths.FullPath)" -ForegroundColor Green
    Write-Host "     Placeholders      : $HeaderPlaceholder / $FooterPlaceholder" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error provisioning Header and Footer: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

