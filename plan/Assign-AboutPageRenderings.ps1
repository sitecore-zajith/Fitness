<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Assign FitnessMaster renderings to the About page
.DESCRIPTION
    Mirrors src/app/about/page.tsx in Sitecore XM Cloud:
      <HeroSection /> <CoachesSection /> <StatsSection /> <Testimonials />

    Steps:
      1. Ensures the About page item exists under master:/sitecore/content/Corporate/fitlifecoach/Home/About
         and assigns the Headless layout from Home if missing.
      2. Creates/updates datasources and child items under master:/sitecore/content/Corporate/fitlifecoach/Data/:
         - HeroSection: About HeroSection
         - CoachesSection: About CoachesSection (with 4 CoachItem children)
         - StatsSection: About StatsSection (with 4 StatItem children)
         - Testimonials: About Testimonials (with 3 TestimonialItem children)
      3. Adds or rebinds the 4 Json Renderings on the About page Final Layout in placeholder "headless-main".

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
$PagePath           = "$HomePath/About"
$DataPath           = "$SitePath/Data"
$OrganismsPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath  = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath     = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"
$MainPlaceholder    = "headless-main"
$CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$DatasourcePrefix   = "About"

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
# 3. PROVISION ABOUT PAGE + RENDERINGS
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Assigning renderings to About Page ($PagePath)" -ForegroundColor Cyan
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

    # Ensure About page route item
    $aboutItem = Ensure-Item -ParentPath $HomePath -Name "About" -TemplateId $homeItem.TemplateID.ToString()
    if ($homeLayout -and -not (Get-Layout -Item $aboutItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $aboutItem -Device $device -Layout $homeLayout
    }

    $tpl = @{
        CoachItem       = Get-TemplateIdByPath "$DatasourceTplPath/CoachItem"
        StatItem        = Get-TemplateIdByPath "$DatasourceTplPath/StatItem"
        TestimonialItem = Get-TemplateIdByPath "$DatasourceTplPath/TestimonialItem"
    }

    # Components in order of src/app/about/page.tsx
    $components = @(
        @{
            Name   = "HeroSection"
            Fields = @{
                Title    = "About FitLife"
                PageName = "About"
            }
        },
        @{
            Name       = "CoachesSection"
            Fields     = @{
                Subtitle = "Coaches"
                Title    = "Meet Our Fitness Coaches"
            }
            ChildField    = "Coaches"
            ChildTemplate = "CoachItem"
            Children      = @(
                @{ Name = "Mark Brook";      Fields = @{ Title = "Mark Brook";      Role = "Owner / Head Coach" } },
                @{ Name = "Sarah Henderson"; Fields = @{ Title = "Sarah Henderson"; Role = "Owner / Head Coach" } },
                @{ Name = "George Hump";     Fields = @{ Title = "George Hump";     Role = "Owner / Head Coach" } },
                @{ Name = "Victor Hump";     Fields = @{ Title = "Victor Hump";     Role = "Owner / Head Coach" } }
            )
        },
        @{
            Name       = "StatsSection"
            Fields     = @{}
            ChildField    = "Stats"
            ChildTemplate = "StatItem"
            Children      = @(
                @{ Name = "Happy Customers";     Fields = @{ Value = "5,000+"; Label = "Happy Customers" } },
                @{ Name = "Group Classes";       Fields = @{ Value = "4,560";  Label = "Group Classes" } },
                @{ Name = "Years of Experience"; Fields = @{ Value = "15+";    Label = "Years of Experience" } },
                @{ Name = "Lessons Conducted";   Fields = @{ Value = "900+";   Label = "Lessons Conducted" } }
            )
        },
        @{
            Name       = "Testimonials"
            Fields     = @{
                Subtitle = "Testimonials"
                Title    = "Success Stories"
            }
            ChildField    = "TestimonialsList"
            ChildTemplate = "TestimonialItem"
            Children      = @(
                @{ Name = "Sarah Johnson";   Fields = @{ Title = "Sarah Johnson";   ClientRole = "Marketing Executive"; Rating = "5"; Description = "FitLifeCoach completely changed my relationship with food. I've lost 20lbs and gained so much energy!" } },
                @{ Name = "Michael Chen";    Fields = @{ Title = "Michael Chen";    ClientRole = "Software Developer";  Rating = "5"; Description = "The personalized workout routines fit perfectly into my busy schedule. Highly recommend their services." } },
                @{ Name = "Emily Rodriguez"; Fields = @{ Title = "Emily Rodriguez"; ClientRole = "Mother of two";       Rating = "5"; Description = "Finally, a sustainable approach to health. The continuous support kept me motivated throughout my journey." } }
            )
        }
    )

    foreach ($comp in $components) {
        Write-Host "--- $($comp.Name) ---" -ForegroundColor White

        # 3a. Datasource item: Data/<ComponentName>/About <ComponentName>
        $orgTplId  = Get-TemplateIdByPath "$OrganismsPath/$($comp.Name)"
        $folder    = Ensure-Item -ParentPath $DataPath -Name $comp.Name -TemplateId $CommonFolderId
        $dsItem    = Ensure-Item -ParentPath "master:$($folder.Paths.FullPath)" -Name "$DatasourcePrefix $($comp.Name)" -TemplateId $orgTplId
        $dsFields  = $comp.Fields.Clone()

        # 3b. Child items + Multilist binding
        if ($comp.ContainsKey("Children") -and ($null -ne $comp.Children)) {
            $dsFields[$comp.ChildField] = Ensure-ChildItems -Parent $dsItem -TemplateId $tpl[$comp.ChildTemplate] -Children $comp.Children
        }
        Set-ItemFields -Item $dsItem -Fields $dsFields

        # 3c. Rendering assignment on About page Final Layout
        $renderingPath = "$RenderingsPath/$($comp.Name)"
        if (-not (Test-Path -Path $renderingPath)) {
            throw "Rendering not found: $renderingPath. Run Create-SitecoreAITemplates.ps1 first."
        }
        $renderingItem = Get-Item -Path $renderingPath
        $datasourceId  = $dsItem.ID.ToString()

        $existing = @(Get-Rendering -Item $aboutItem -Rendering $renderingItem -Device $device -FinalLayout -ErrorAction SilentlyContinue)
        if ($existing.Count -gt 0) {
            foreach ($instance in $existing) {
                $instance.Datasource = $datasourceId
                $instance.Placeholder = $MainPlaceholder
                Set-Rendering -Item $aboutItem -Instance $instance -FinalLayout
            }
            Write-Host "[i] Rebound rendering: $($comp.Name)" -ForegroundColor Yellow
        }
        else {
            $instance = $renderingItem | New-Rendering -Placeholder $MainPlaceholder
            Add-Rendering -Item $aboutItem -Instance $instance -Placeholder $MainPlaceholder -DataSource $datasourceId -Device $device -FinalLayout
            Write-Host "[+] Added rendering: $($comp.Name) -> $MainPlaceholder" -ForegroundColor Green
        }
    }

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] About page assembled with $($components.Count) renderings." -ForegroundColor Green
    Write-Host "     Page        : $PagePath" -ForegroundColor Green
    Write-Host "     Placeholder : $MainPlaceholder" -ForegroundColor Green
    Write-Host "     Datasources : $DataPath/<ComponentName>/$DatasourcePrefix <ComponentName>" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error assigning About page renderings: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

