# `src/sitecore` - Sitecore XM Cloud (Content SDK) components

Field-driven versions of the components rendered by [`src/app/page.tsx`](../app/page.tsx). They match the templates and Json Renderings that [`plan/Create-SitecoreAITemplates.ps1`](../../plan/Create-SitecoreAITemplates.ps1) creates. The original `src/components/organisms/*` files have not been changed.

## Structure

```
src/sitecore/
├── components/                  <- copy this folder into the XM Cloud head app
│   ├── HomeHero.tsx             Organisms/HomeHero
│   ├── AboutSnippet.tsx         Organisms/AboutSnippet     + FeatureHighlightItem
│   ├── ServicesPreview.tsx      Organisms/ServicesPreview  + ServiceItem
│   ├── Procedure.tsx            Organisms/Procedure        + ProcedureStepItem
│   ├── Testimonials.tsx         Organisms/Testimonials     + TestimonialItem
│   ├── AppointmentForm.tsx      Organisms/AppointmentForm  + ServiceItem (Data/Services)
│   └── shared/                  SectionHeading, ServiceIcon, button styles, field types
├── component-map.ts             componentName -> module (keys = rendering componentName)
├── PlaceholderPreview.tsx       local stand-in for SDK <Placeholder />
├── mocks/home-route.mock.ts     Layout Service-shaped data for the Home route
└── lib/content-sdk-shim.tsx     local stand-in for @sitecore-content-sdk/nextjs
```

Preview locally: `npm run dev` -> http://localhost:3000/sitecore-preview

## Conventions (Content SDK)

- Each component exports `Default` and receives `{ rendering, params, fields }`.
- Fields render through the SDK helpers `<Text>`, `<RichText>`, `<Image>` and `<Link>`, so they can be edited in XM Cloud Pages.
- Multilist fields arrive as `SitecoreItem<TFields>[]` from the default Datasource resolver.
- If a rendering has no datasource, `MissingDatasource` is shown instead of crashing.
- Imports inside `components/` are relative, so the folder can be copied as is.

## Moving to the XM Cloud project

1. Copy `src/sitecore/components/` to the head app, for example `src/components/fitness-master/`.
2. Make sure `framer-motion` and `react-icons` are installed there.
3. Regenerate the component map (`sitecore-tools project component generate-map`) or add the entries from `component-map.ts`.
4. Leave out `lib/`, `mocks/` and `PlaceholderPreview.tsx`. The real SDK replaces them, and the components need no import changes.

## In this repo

`tsconfig.json` maps `@sitecore-content-sdk/nextjs` to `lib/content-sdk-shim.tsx`. **Remove that path alias if you install the real SDK here**, because otherwise the alias overrides the package.

To swap the live home page to these components, replace the body of `src/app/page.tsx` with:

```tsx
import PlaceholderPreview from "@/sitecore/PlaceholderPreview";
import { homeRouteMock } from "@/sitecore/mocks/home-route.mock";

export default function Home() {
  return <PlaceholderPreview renderings={homeRouteMock.placeholders["headless-main"]} />;
}
```

