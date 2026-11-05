<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Assign FitnessMaster renderings to the Contact page
.DESCRIPTION
    Mirrors src/app/contact/page.tsx in Sitecore XM Cloud:
      <HeroSection /> <ContactInfoSection /> <ContactForm /> <ContactMap />

    Steps:
      1. Ensures the Contact page item exists under master:/sitecore/content/Corporate/fitlifecoach/Home/Contact
         and assigns the Headless layout from Home if missing.
      2. Creates/updates datasources under master:/sitecore/content/Corporate/fitlifecoach/Data/:
         - HeroSection: Contact HeroSection
         - ContactInfoSection: Contact ContactInfoSection
         - ContactForm: Contact ContactForm
         - ContactMap: Contact ContactMap
      3. Adds or rebinds the 4 Json Renderings on the Contact page Final Layout in placeholder "headless-main".

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
$PagePath           = "$HomePath/Contact"
$DataPath           = "$SitePath/Data"
$OrganismsPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath  = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath     = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"
$MainPlaceholder    = "headless-main"
$CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$DatasourcePrefix   = "Contact"

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

# ============================================================================
# 3. PROVISION CONTACT PAGE + RENDERINGS
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Assigning renderings to Contact Page ($PagePath)" -ForegroundColor Cyan
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

    # Ensure Contact page route item
    $contactItem = Ensure-Item -ParentPath $HomePath -Name "Contact" -TemplateId $homeItem.TemplateID.ToString()
    if ($homeLayout -and -not (Get-Layout -Item $contactItem -Device $device -ErrorAction SilentlyContinue)) {
        Set-Layout -Item $contactItem -Device $device -Layout $homeLayout
    }

    # Components in order of src/app/contact/page.tsx
    $components = @(
        @{
            Name   = "HeroSection"
            Fields = @{
                Title    = "Get in Touch"
                PageName = "Contact Us"
            }
        },
        @{
            Name   = "ContactInfoSection"
            Fields = @{
                Title          = "Contact Information"
                Description    = "Have questions about our programs, memberships, or personal training? Reach out to us and we'll get back to you as soon as possible!"
                LocationTitle  = "Our Location"
                Address        = "123 Fitness Avenue, Wellness City, NY 10001"
                PhoneTitle     = "Phone Number"
                Phone          = "+1 (555) 123-4567"
                EmailTitle     = "Email Address"
                Email          = "info@fitlifecoach.com"
                HoursTitle     = "Operating Hours"
                OperatingHours = "Mon - Fri: 5:30 AM - 10:00 PM`nSat - Sun: 7:00 AM - 8:00 PM"
            }
        },
        @{
            Name   = "ContactForm"
            Fields = @{
                FormHeading      = "Send Us A Message"
                NameLabel        = "Your Name"
                EmailLabel       = "Email Address"
                PhoneLabel       = "Phone Number"
                SubjectLabel     = "Subject"
                MessageLabel     = "Your Message"
                SubmitButtonText = "Send Message"
                SubmissionApiUrl = "/api/contact"
            }
        },
        @{
            Name   = "ContactMap"
            Fields = @{
                MapTitle    = "Location Map"
                MapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162590213!2d79.7738032704285!3d6.921833527581561"
            }
        }
    )

    foreach ($comp in $components) {
        Write-Host "--- $($comp.Name) ---" -ForegroundColor White

        # 3a. Datasource item: Data/<ComponentName>/Contact <ComponentName>
        $orgTplId  = Get-TemplateIdByPath "$OrganismsPath/$($comp.Name)"
        $folder    = Ensure-Item -ParentPath $DataPath -Name $comp.Name -TemplateId $CommonFolderId
        $dsItem    = Ensure-Item -ParentPath "master:$($folder.Paths.FullPath)" -Name "$DatasourcePrefix $($comp.Name)" -TemplateId $orgTplId
        $dsFields  = $comp.Fields.Clone()

        Set-ItemFields -Item $dsItem -Fields $dsFields

        # 3b. Rendering assignment on Contact page Final Layout
        $renderingPath = "$RenderingsPath/$($comp.Name)"
        if (-not (Test-Path -Path $renderingPath)) {
            throw "Rendering not found: $renderingPath. Run Create-SitecoreAITemplates.ps1 first."
        }
        $renderingItem = Get-Item -Path $renderingPath
        $datasourceId  = $dsItem.ID.ToString()

        $existing = @(Get-Rendering -Item $contactItem -Rendering $renderingItem -Device $device -FinalLayout -ErrorAction SilentlyContinue)
        if ($existing.Count -gt 0) {
            foreach ($instance in $existing) {
                $instance.Datasource = $datasourceId
                $instance.Placeholder = $MainPlaceholder
                Set-Rendering -Item $contactItem -Instance $instance -FinalLayout
            }
            Write-Host "[i] Rebound rendering: $($comp.Name)" -ForegroundColor Yellow
        }
        else {
            $instance = $renderingItem | New-Rendering -Placeholder $MainPlaceholder
            Add-Rendering -Item $contactItem -Instance $instance -Placeholder $MainPlaceholder -DataSource $datasourceId -Device $device -FinalLayout
            Write-Host "[+] Added rendering: $($comp.Name) -> $MainPlaceholder" -ForegroundColor Green
        }
    }

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Contact page assembled with $($components.Count) renderings." -ForegroundColor Green
    Write-Host "     Page        : $PagePath" -ForegroundColor Green
    Write-Host "     Placeholder : $MainPlaceholder" -ForegroundColor Green
    Write-Host "     Datasources : $DataPath/<ComponentName>/$DatasourcePrefix <ComponentName>" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error assigning Contact page renderings: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

