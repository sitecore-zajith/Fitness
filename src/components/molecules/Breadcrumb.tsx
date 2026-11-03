import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export interface BreadcrumbProps {
  pageName: string;
}

export default function Breadcrumb({ pageName }: BreadcrumbProps) {
  return (
    <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-4 flex items-center justify-center gap-2">
      <Link href="/" className="hover:text-primary transition-colors text-white">
        Home
      </Link>
      <FaChevronRight className="text-[10px] text-white" />
      <span className="text-white">{pageName}</span>
      <FaChevronRight className="text-[10px] text-white" />
    </p>
  );
}
