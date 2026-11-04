import type { ComponentRendering } from "@sitecore-content-sdk/nextjs";
import { componentMap } from "./component-map";
import MissingDatasource from "./components/shared/MissingDatasource";

interface PlaceholderPreviewProps {
  renderings: ComponentRendering[];
}

/**
 * Local stand-in for the SDK <Placeholder />: resolves each rendering's componentName
 * through the component map and passes { rendering, params, fields } like the SDK does.
 */
export default function PlaceholderPreview({ renderings }: PlaceholderPreviewProps) {
  return (
    <>
      {renderings.map((rendering, index) => {
        const component = componentMap.get(rendering.componentName);
        const key = rendering.uid ?? `${rendering.componentName}-${index}`;

        if (!component) {
          return <MissingDatasource key={key} componentName={`Unknown component "${rendering.componentName}"`} />;
        }

        const Component = component.Default;
        return <Component key={key} rendering={rendering} params={rendering.params ?? {}} fields={rendering.fields} />;
      })}
    </>
  );
}

