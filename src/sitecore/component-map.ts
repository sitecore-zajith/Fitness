import type { ComponentType } from "react";
import * as AboutSnippet from "./components/AboutSnippet";
import * as AppointmentForm from "./components/AppointmentForm";
import * as Footer from "./components/Footer";
import * as HomeHero from "./components/HomeHero";
import * as Navbar from "./components/Navbar";
import * as Procedure from "./components/Procedure";
import * as ServicesPreview from "./components/ServicesPreview";
import * as Testimonials from "./components/Testimonials";

// Each module exports its own strongly typed `Default`; the map erases field types like the SDK map does.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SitecoreComponentModule = { Default: ComponentType<any> };

/**
 * Keys MUST equal the `componentName` field on each Json Rendering
 * (/sitecore/layout/Renderings/Project/Corporate/FitnessMaster/*).
 * In a Content SDK project this map is generated (`sitecore-tools project component generate-map`).
 */
export const componentMap = new Map<string, SitecoreComponentModule>([
  ["Navbar", Navbar],
  ["HomeHero", HomeHero],
  ["AboutSnippet", AboutSnippet],
  ["ServicesPreview", ServicesPreview],
  ["Procedure", Procedure],
  ["Testimonials", Testimonials],
  ["AppointmentForm", AppointmentForm],
  ["Footer", Footer],
]);

