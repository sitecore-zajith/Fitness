"use client";

import { FaFilter } from "react-icons/fa";

export interface PriceFilterWidgetProps {
  minPrice?: string;
  maxPrice?: string;
  className?: string;
}

export default function PriceFilterWidget({
  minPrice = "LKR 0",
  maxPrice = "LKR 200,000+",
  className = "",
}: PriceFilterWidgetProps) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 ${className}`}
    >
      <h3 className="text-lg font-bold font-heading mb-4 text-neutral-900 flex items-center gap-2">
        <FaFilter className="text-primary text-sm" /> Filter by Price
      </h3>
      <div className="mt-4">
        <div className="h-2 w-full bg-neutral-200 rounded-full relative">
          <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer"></div>
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer"></div>
        </div>
        <div className="flex justify-between mt-4 text-sm font-medium text-neutral-600">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
        </div>
      </div>
    </div>
  );
}

