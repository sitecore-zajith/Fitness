<#
.SYNOPSIS
    Sitecore PowerShell Extensions (SPE) Script - Assign FitnessMaster renderings to the FitLife Home page
.DESCRIPTION
    Mirrors src/app/page.tsx in Sitecore XM Cloud:
        <HomeHero /> <AboutSnippet /> <ServicesPreview /> <Procedure /> <Testimonials /> <AppointmentForm />
    Steps:
      1. Creates datasource items (seeded with the copy currently hard-coded in the React components) under
           master:/sitecore/content/Corporate/FitLife/Data/<ComponentName>/Home <ComponentName>
         plus their child items (FeatureHighlightItem, ServiceItem, ProcedureStepItem, TestimonialItem).
      2. Creates shared service options under Data/Services for the AppointmentForm dropdown.
      3. Adds the 6 Json Renderings to the Home page Final Layout in placeholder "headless-main",
         in page.tsx order, each bound to its datasource.
    Idempotent: re-running updates field values and rebinds existing renderings instead of duplicating them.
.NOTES
    Prerequisites : Run Create-SitecoreAITemplates.ps1 first (templates + renderings + site tree).
                    The Home item must exist and have a layout (Headless Layout) on the Default device.
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
$DataPath           = "$SitePath/Data"
$OrganismsPath      = "master:/sitecore/templates/Project/Corporate/FitnessMaster/Organisms"
$DatasourceTplPath  = "master:/sitecore/templates/Project/Corporate/FitnessMaster/DatasourceItems"
$RenderingsPath     = "master:/sitecore/layout/Renderings/Project/Corporate/FitnessMaster"
$MainPlaceholder    = "headless-main"
$CommonFolderId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$DatasourcePrefix   = "Home"

# ============================================================================
# 2. HELPERS
# ============================================================================

# Sitecore item names reject "&", "," and similar characters.
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
        [Parameter(Mandatory = $true)][string]$Text
    )
    return "<link linktype=`"external`" url=`"$Url`" text=`"$Text`" target=`"`" />"
}

<#
.SYNOPSIS
    Creates child items under a parent and returns their IDs pipe-joined (Multilist value).
#>
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
# 3. PROVISION DATASOURCES + ASSIGN RENDERINGS
# ============================================================================
try {
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "[INFO] Assigning renderings to $HomePath" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan

    if (-not (Test-Path -Path $HomePath)) {
        throw "Home page not found: $HomePath. Create the FitLife headless site first."
    }
    if (-not (Test-Path -Path $DataPath)) {
        New-Item -Path $SitePath -Name "Data" -ItemType $CommonFolderId | Out-Null
    }

    $tpl = @{
        FeatureHighlightItem = Get-TemplateIdByPath "$DatasourceTplPath/FeatureHighlightItem"
        ServiceItem          = Get-TemplateIdByPath "$DatasourceTplPath/ServiceItem"
        ProcedureStepItem    = Get-TemplateIdByPath "$DatasourceTplPath/ProcedureStepItem"
        TestimonialItem      = Get-TemplateIdByPath "$DatasourceTplPath/TestimonialItem"
    }

    # --- Shared service options (AppointmentForm.ServiceOptions source = Data/Services) ---
    $servicesFolder = Ensure-Item -ParentPath $DataPath -Name "Services" -TemplateId $CommonFolderId
    $serviceOptionIds = Ensure-ChildItems -Parent $servicesFolder -TemplateId $tpl.ServiceItem -Children @(
        @{ Name = "Weight Loss Program"; Fields = @{ Title = "Weight Loss Program" } },
        @{ Name = "Sports Nutrition";    Fields = @{ Title = "Sports Nutrition" } },
        @{ Name = "Individual Coaching"; Fields = @{ Title = "Individual Coaching" } },
        @{ Name = "Workout Routines";    Fields = @{ Title = "Workout Routines" } }
    )

    # --- Component definitions in page.tsx order ---
    # Images are left empty: upload the Unsplash assets to the Media Library and select them in Pages.
    $components = @(
        @{
            Name = "HomeHero"
            Fields = @{
                Subtitle              = "Transform Your Life"
                Title                 = "Eat Mindfully, Sweat Often & Self Love Always"
                Description           = "Discover a balanced approach to fitness and nutrition. Our personalized coaching programs are designed to help you achieve sustainable results."
                CtaLink               = New-LinkValue -Url "/#appointment" -Text "Make an Appointment"
                SecondaryCta          = New-LinkValue -Url "/services" -Text "Explore Services"
                AIGeneratedPromoBadge = "Free 7-Day Nutrition Assessment"
            }
        },
        @{
            Name = "AboutSnippet"
            Fields = @{
                Subtitle           = "About Us"
                Title              = "Better Eat, Better Life"
                PrimaryParagraph   = "We believe that true wellness comes from a balance of nourishing food, regular physical activity, and a positive mindset. Our approach is holistic and tailored to your unique lifestyle and goals."
                SecondaryParagraph = "With over two decades of experience, we have helped thousands of individuals transform their bodies and their relationship with food. Let us guide you on your journey to a healthier, happier you."
                CtaLink            = New-LinkValue -Url "/about" -Text "Discover Our Story"
                ExperienceYears    = "24+"
                ExperienceLabel    = "Years of Experience"
            }
            ChildField = "FeatureHighlights"; ChildTemplate = "FeatureHighlightItem"
            Children = @(
                @{ Name = "Personalized Nutrition Plans";  Fields = @{ Title = "Personalized Nutrition Plans" } },
                @{ Name = "Expert Fitness Coaching";       Fields = @{ Title = "Expert Fitness Coaching" } },
                @{ Name = "Ongoing Support & Motivation";  Fields = @{ Title = "Ongoing Support & Motivation" } }
            )
        },
        @{
            Name = "ServicesPreview"
            Fields = @{ Subtitle = "What We Do"; Title = "Our Core Offerings" }
            ChildField = "FeaturedServices"; ChildTemplate = "ServiceItem"
            Children = @(
                @{ Name = "Nutrition Strategies"; Fields = @{ Title = "Nutrition Strategies"; IconName = "FaAppleAlt"; Description = "Customized meal plans and nutritional advice to fuel your body and reach your goals." } },
                @{ Name = "Workout Routines";     Fields = @{ Title = "Workout Routines"; IconName = "FaDumbbell"; Description = "Effective, science-based training programs tailored to your fitness level." } },
                @{ Name = "Support & Motivation"; Fields = @{ Title = "Support & Motivation"; IconName = "FaHeartbeat"; Description = "Daily check-ins and unwavering support to keep you on track and motivated." } }
            )
        },
        @{
            Name = "Procedure"
            Fields = @{ Subtitle = "Procedure"; Title = "How It Works" }
            ChildField = "Steps"; ChildTemplate = "ProcedureStepItem"
            Children = @(
                @{ Name = "Step 01"; Fields = @{ StepNumber = "01"; Title = "Trusted Services"; Description = "Start with a comprehensive consultation to understand your needs." } },
                @{ Name = "Step 02"; Fields = @{ StepNumber = "02"; Title = "Natural Ways";     Description = "We build a plan focusing on whole foods and natural supplements." } },
                @{ Name = "Step 03"; Fields = @{ StepNumber = "03"; Title = "Routine Exercise"; Description = "Implement a sustainable and enjoyable workout regimen." } },
                @{ Name = "Step 04"; Fields = @{ StepNumber = "04"; Title = "Success & Goal";   Description = "Achieve your desired results and maintain them for life." } }
            )
        },
        @{
            Name = "Testimonials"
            Fields = @{ Subtitle = "Testimonials"; Title = "Success Stories" }
            ChildField = "TestimonialsList"; ChildTemplate = "TestimonialItem"
            Children = @(
                @{ Name = "Sarah Johnson";   Fields = @{ Title = "Sarah Johnson";   ClientRole = "Marketing Executive"; Rating = "5"; Description = "FitLifeCoach completely changed my relationship with food. I've lost 20lbs and gained so much energy!" } },
                @{ Name = "Michael Chen";    Fields = @{ Title = "Michael Chen";    ClientRole = "Software Developer";  Rating = "5"; Description = "The personalized workout routines fit perfectly into my busy schedule. Highly recommend their services." } },
                @{ Name = "Emily Rodriguez"; Fields = @{ Title = "Emily Rodriguez"; ClientRole = "Mother of two";       Rating = "5"; Description = "Finally, a sustainable approach to health. The continuous support kept me motivated throughout my journey." } }
            )
        },
        @{
            Name = "AppointmentForm"
            Fields = @{
                Subtitle         = "Get in Touch"
                Title            = "Make an Appointment"
                PanelTitle       = "Start Your Journey Today"
                PanelDescription = "Take the first step towards a healthier, happier you. Fill out the form, and our coaching team will get back to you within 24 hours."
                Address          = "123 Fitness Avenue, Wellness City"
                Phone            = "+1 (555) 123-4567"
                Email            = "info@fitlifecoach.com"
                ServiceOptions   = $serviceOptionIds
                SubmitButtonText = "Book Appointment"
                SubmitEndpoint   = "/api/appointments"
            }
        }
    )

    $homeItem = Get-Item -Path $HomePath
    $device   = Get-LayoutDevice -Default

    foreach ($comp in $components) {
        Write-Host "--- $($comp.Name) ---" -ForegroundColor White

        # 3a. Datasource item: Data/<Component>/Home <Component>
        $orgTplId  = Get-TemplateIdByPath "$OrganismsPath/$($comp.Name)"
        $folder    = Ensure-Item -ParentPath $DataPath -Name $comp.Name -TemplateId $CommonFolderId
        $dsItem    = Ensure-Item -ParentPath "master:$($folder.Paths.FullPath)" -Name "$DatasourcePrefix $($comp.Name)" -TemplateId $orgTplId
        $dsFields  = $comp.Fields.Clone()

        # 3b. Child items + Multilist binding (field sources use query:./* relative to the datasource)
        if ($comp.ContainsKey("Children")) {
            $dsFields[$comp.ChildField] = Ensure-ChildItems -Parent $dsItem -TemplateId $tpl[$comp.ChildTemplate] -Children $comp.Children
        }
        Set-ItemFields -Item $dsItem -Fields $dsFields

        # 3c. Place rendering on Home Final Layout (update datasource if already present)
        $renderingPath = "$RenderingsPath/$($comp.Name)"
        if (-not (Test-Path -Path $renderingPath)) {
            throw "Rendering not found: $renderingPath. Run Create-SitecoreAITemplates.ps1 first."
        }
        $renderingItem = Get-Item -Path $renderingPath
        $datasourceId  = $dsItem.ID.ToString()

        $existing = @(Get-Rendering -Item $homeItem -Rendering $renderingItem -Device $device -FinalLayout -ErrorAction SilentlyContinue)
        if ($existing.Count -gt 0) {
            foreach ($instance in $existing) {
                $instance.Datasource = $datasourceId
                $instance.Placeholder = $MainPlaceholder
                Set-Rendering -Item $homeItem -Instance $instance -FinalLayout
            }
            Write-Host "[i] Rebound rendering: $($comp.Name)" -ForegroundColor Yellow
        }
        else {
            $instance = $renderingItem | New-Rendering -Placeholder $MainPlaceholder
            Add-Rendering -Item $homeItem -Instance $instance -Placeholder $MainPlaceholder -DataSource $datasourceId -Device $device -FinalLayout
            Write-Host "[+] Added rendering: $($comp.Name) -> $MainPlaceholder" -ForegroundColor Green
        }
    }

    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[OK] Home page assembled with $($components.Count) renderings." -ForegroundColor Green
    Write-Host "     Page        : $HomePath" -ForegroundColor Green
    Write-Host "     Placeholder : $MainPlaceholder" -ForegroundColor Green
    Write-Host "     Datasources : $DataPath/<ComponentName>/$DatasourcePrefix <ComponentName>" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
}
catch {
    Write-Host "[!] Error assigning Home page renderings: $($_.Exception.Message)" -ForegroundColor Red
    throw
}

