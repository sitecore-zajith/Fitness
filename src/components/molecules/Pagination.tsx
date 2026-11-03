"use client";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className = "",
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`text-center ${className}`}>
      <ul className="inline-flex items-center gap-2">
        {/* Previous page */}
        <li>
          <button
            onClick={() => onPageChange && currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous Page"
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary hover:border-primary hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            &lt;
          </button>
        </li>

        {/* Page numbers */}
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={page}>
              {isActive ? (
                <span
                  aria-current="page"
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md font-medium"
                >
                  {page}
                </span>
              ) : (
                <button
                  onClick={() => onPageChange && onPageChange(page)}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary hover:border-primary hover:text-white transition-colors font-medium"
                >
                  {page}
                </button>
              )}
            </li>
          );
        })}

        {/* Next page */}
        <li>
          <button
            onClick={() => onPageChange && currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next Page"
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary hover:border-primary hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
}

