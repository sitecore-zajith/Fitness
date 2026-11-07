<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Assign FitnessMaster renderings to the Services page
.DESCRIPTION
    Mirrors src/app/services/page.tsx in Sitecore XM Cloud:
      <HeroSection /> <ServicesGrid />

    Steps:
      1. Ensures the Services page item exists under master:/sitecore/content/Corporate/fitlifecoach/Home/Services
         and assigns the Headless layout from Home if missing.
      2. Ensures the 6 catalog ServiceItem items exist under master:/sitecore/content/Corporate/fitlifecoach/Data/Services.
      3. Creates/updates datasources under master:/sitecore/content/Corporate/fitlifecoach/Data/:
         - HeroSection: Services HeroSection
         - ServicesGrid: Services ServicesGrid (with Services multilist pointing to the 6 service items)
      4. Adds or rebinds the 2 Json Renderings on the Services page Final Layout in placeholder "headless-main".

    Idempotent: re-running updates field values and rebinds existing renderings instead of duplicating them.
.NOTES
    Prerequisites : Run Create-SitecoreAITemplates.ps1 first.
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
$PagePath           = "$HomePath/Services"
$DataPath           = "$SitePath/Data"
$OrganismsPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath  = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath     = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"
$MainPlaceholder    = "headless-main"
$CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$DatasourcePrefix   = "Services"

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
        throw "Template not found: $Path. Run Create-SitecoreAITemplates.ps1 first."
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

# ============================================================================
# 3. PROVISION SERVICES PAGE + RENDERINGS
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Assigning renderings to Services Page ($PagePath)" -ForegroundColor Cyan
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

    # Ensure Services page route item
    $servicesItem = Ensure-Item -ParentPath $HomePath -Name "Services" -TemplateId $homeItem.TemplateID.ToString()
    if ($homeLayout -and -not (Get-Layout -Item $servicesItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $servicesItem -Device $device -Layout $homeLayout
    }

    $serviceItemTplId = Get-TemplateIdByPath "$DatasourceTplPath/ServiceItem"

    # Ensure shared catalog services under Data/Services
    $servicesFolder = Ensure-Item -ParentPath $DataPath -Name "Services" -TemplateId $CommonFolderId
    $serviceIds = Ensure-ChildItems -Parent $servicesFolder -TemplateId $serviceItemTplId -Children @(
        @{ Name = "Weight Loss Program";    Fields = @{ Title = "Weight Loss Program";    Description = "Comprehensive plans combining nutrition and fitness to help you shed pounds safely and keep them off for good." } },
        @{ Name = "Sports Nutritionists";    Fields = @{ Title = "Sports Nutritionists";    Description = "Expert guidance on macronutrients and meal timing to optimize your athletic performance and recovery." } },
        @{ Name = "Personalized Nutrition"; Fields = @{ Title = "Personalized Nutrition"; Description = "Tailored meal plans designed specifically for your body type, goals, and dietary preferences." } },
        @{ Name = "Individual Coaching";    Fields = @{ Title = "Individual Coaching";    Description = "One-on-one sessions with our certified trainers to ensure proper form and maximize your results." } },
        @{ Name = "Child Nutrition";        Fields = @{ Title = "Child Nutrition";        Description = "Healthy, balanced, and kid-friendly dietary strategies to support your child's growth and development." } },
        @{ Name = "Workout Routines";       Fields = @{ Title = "Workout Routines";       Description = "Customized exercise regimens focused on strength, endurance, and flexibility for all fitness levels." } }
    )

    # Components in order of src/app/services/page.tsx
    $components = @(
        @{
            Name   = "HeroSection"
            Fields = @{
                Title    = "Our Services"
                PageName = "Services"
            }
        },
        @{
            Name   = "ServicesGrid"
            Fields = @{
                Services = $serviceIds
            }
        }
    )

    foreach ($comp in $components) {
        Write-Host "--- $($comp.Name) ---" -ForegroundColor White

        # 3a. Datasource item: Data/<ComponentName>/Services <ComponentName>
        $orgTplId  = Get-TemplateIdByPath "$OrganismsPath/$($comp.Name)"
        $folder    = Ensure-Item -ParentPath $DataPath -Name $comp.Name -TemplateId $CommonFolderId
        $dsItem    = Ensure-Item -ParentPath "master:$($folder.Paths.FullPath)" -Name "$DatasourcePrefix $($comp.Name)" -TemplateId $orgTplId
        $dsFields  = $comp.Fields.Clone()

        Set-ItemFields -Item $dsItem -Fields $dsFields

        # 3b. Rendering assignment on Services page Final Layout
        $renderingPath = "$RenderingsPath/$($comp.Name)"
        if (-not (Test-Path -Path $renderingPath)) {
            throw "Rendering not found: $renderingPath. Run Create-SitecoreAITemplates.ps1 first."
        }
        $renderingItem = Get-Item -Path $renderingPath
        $datasourceId  = $dsItem.ID.ToString()

        $existing = @(Get-Rendering -Item $servicesItem -Rendering $renderingItem -Device $device -FinalLayout -ErrorAction SilentlyContinue)
        if ($existing.Count -gt 0) {
            foreach ($instance in $existing) {
                $instance.Datasource = $datasourceId
                $instance.Placeholder = $MainPlaceholder
                Set-Rendering -Item $servicesItem -Instance $instance -FinalLayout
            }
            Write-Host "[i] Rebound rendering: $($comp.Name)" -ForegroundColor Yellow
        }
        else {
            $instance = $renderingItem | New-Rendering -Placeholder $MainPlaceholder
            Add-Rendering -Item $servicesItem -Instance $instance -Placeholder $MainPlaceholder -DataSource $datasourceId -Device $device -FinalLayout
            Write-Host "[+] Added rendering: $($comp.Name) -> $MainPlaceholder" -ForegroundColor Green
        }
    }

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Services page assembled with $($components.Count) renderings." -ForegroundColor Green
    Write-Host "     Page        : $PagePath" -ForegroundColor Green
    Write-Host "     Placeholder : $MainPlaceholder" -ForegroundColor Green
    Write-Host "     Datasources : $DataPath/<ComponentName>/$DatasourcePrefix <ComponentName>" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error assigning Services page renderings: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

