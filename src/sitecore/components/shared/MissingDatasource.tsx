interface MissingDatasourceProps {
  componentName: string;
}

/** Shown when a rendering is placed without a datasource item. */
export default function MissingDatasource({ componentName }: MissingDatasourceProps) {
  return (
    <div className="max-w-7xl mx-auto my-6 px-4 py-6 border-2 border-dashed border-neutral-300 rounded-xl text-center text-neutral-500">
      <strong>{componentName}</strong>: select or create a datasource item.
    </div>
  );
}

