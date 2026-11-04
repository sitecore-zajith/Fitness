import type { Metadata } from "next";
import PlaceholderPreview from "@/sitecore/PlaceholderPreview";
import { homeRouteMock } from "@/sitecore/mocks/home-route.mock";

export const metadata: Metadata = {
  title: "Sitecore Home Preview",
  robots: { index: false, follow: false },
};

/** Renders the Sitecore-ready home components from mock Layout Service data. */
export default function SitecoreHomePreview() {
  return <PlaceholderPreview renderings={homeRouteMock.placeholders["headless-main"]} />;
}

