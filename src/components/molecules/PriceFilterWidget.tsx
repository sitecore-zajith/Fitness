"use client";

import { FaFilter } from "react-icons/fa";

export const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "under-10k", label: "Under LKR 10,000", max: 10000 },
  { id: "10k-50k", label: "LKR 10,000 – 50,000", min: 10000, max: 50000 },
  { id: "50k-150k", label: "LKR 50,000 – 150,000", min: 50000, max: 150000 },
  { id: "above-150k", label: "Above LKR 150,000", min: 150000 },
];

export interface PriceFilterWidgetProps {
  selectedRange?: string;
  onSelectRange?: (rangeId: string) => void;
  className?: string;
}

export default function PriceFilterWidget({
  selectedRange = "all",
  onSelectRange,
  className = "",
}: PriceFilterWidgetProps) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-xs border border-neutral-200/90 ${className}`}>
      <h3 className="text-base font-bold font-heading mb-4 text-neutral-900 flex items-center gap-2">
        <FaFilter className="text-primary text-xs" /> Filter by Price
      </h3>
      
      <div className="space-y-2">
        {priceRanges.map((range) => {
          const isSelected = selectedRange === range.id;
          return (
            <button
              key={range.id}
              type="button"
              onClick={() => onSelectRange && onSelectRange(range.id)}
              className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                isSelected 
                  ? "bg-primary/10 text-primary font-bold border-l-2 border-primary" 
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              <span>{range.label}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
