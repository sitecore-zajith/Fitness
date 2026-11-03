# Sitecore AI Organism Templates Plan

## Overview
Converts all **19 Organism components** (`src/components/organisms/*`) into **Sitecore AI / XM Cloud** Project-layer templates under `/sitecore/templates/Project/FitnessMaster`, including a shared `_SitecoreAI_Metadata` base template, 11 child datasource item templates, and a reusable `Add-SitecoreAIField` SPE PowerShell function.

## Project Type
**WEB / CMS** (Next.js Headless JSS + Sitecore XM Cloud / Sitecore PowerShell Extensions)

## Success Criteria
- [x] Shared `_SitecoreAI_Metadata` base template created under `/sitecore/templates/Project/FitnessMaster/Base`
- [x] 11 Child Datasource Item templates created under `/sitecore/templates/Project/FitnessMaster/DatasourceItems`
- [x] All 19 Organism component templates created under `/sitecore/templates/Project/FitnessMaster/Organisms` with `__Standard Values` and Insert Options
- [x] Reusable `Add-SitecoreAIField` SPE function demonstrating how to add new fields with Sitecore AI prompt instructions (`__Short description` / `__Long description`)

## File Structure
```text
planning/
├── Create-SitecoreAITemplates.ps1     # Idempotent Sitecore SPE script for all 19 organisms + AI base
└── sitecore-ai-template-guide.md      # Full field mapping table & guide for adding new AI fields
plan/
├── Create-SitecoreAITemplates.ps1     # Mirror copy in existing plan/ directory
└── sitecore-ai-template-guide.md      # Mirror copy in existing plan/ directory
```

## Task Breakdown
- [x] **Task 1**: Author `Add-SitecoreAIField` SPE helper function and `_SitecoreAI_Metadata` base template (`@backend-specialist` + `@powershell-windows`) → Verify: PowerShell syntax check passes.
- [x] **Task 2**: Map all 19 organisms + 11 child datasource templates in [`planning/Create-SitecoreAITemplates.ps1`](file:///c:/Users/MohamedZajith/projects/fitness-master/planning/Create-SitecoreAITemplates.ps1) (`@backend-specialist`) → Verify: All 19 organisms present.
- [x] **Task 3**: Document architecture, field tables, and copy-paste field addition examples in [`planning/sitecore-ai-template-guide.md`](file:///c:/Users/MohamedZajith/projects/fitness-master/planning/sitecore-ai-template-guide.md) (`@project-planner` + `@plan-writing`) → Verify: Markdown guide written.

## ✅ PHASE X COMPLETE
- PowerShell Syntax Parse Check: ✅ Pass
- ASCII Compliance (`@powershell-windows`): ✅ Pass
- Date: 2026-11-03

