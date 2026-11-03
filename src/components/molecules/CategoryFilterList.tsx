"use client";

export interface CategoryItem {
  name: string;
  count?: number;
}

export interface CategoryFilterListProps {
  categories: (string | CategoryItem)[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  className?: string;
}

export default function CategoryFilterList({
  categories,
  activeCategory = "All Products",
  onSelectCategory,
  className = "",
}: CategoryFilterListProps) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 ${className}`}
    >
      <h3 className="text-lg font-bold font-heading mb-4 text-neutral-900">
        Categories
      </h3>
      <ul className="space-y-3">
        {categories.map((cat, index) => {
          const name = typeof cat === "string" ? cat : cat.name;
          const count = typeof cat === "string" ? 12 - index : cat.count;
          const isActive = name === activeCategory;

          return (
            <li key={name}>
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(name)}
                className={`w-full flex items-center justify-between text-sm hover:text-primary transition-colors text-left ${
                  isActive ? "text-primary font-semibold" : "text-neutral-600"
                }`}
              >
                <span>{name}</span>
                {count !== undefined && (
                  <span className="text-xs bg-neutral-100 px-2 py-1 rounded-full text-neutral-500">
                    {count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

