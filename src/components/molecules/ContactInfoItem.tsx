import { ReactNode } from "react";

export interface ContactInfoItemProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  className?: string;
}

export default function ContactInfoItem({
  icon,
  title,
  description,
  className = "",
}: ContactInfoItemProps) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold font-heading text-neutral-900 mb-1">
          {title}
        </h3>
        <div className="text-neutral-600">
          {description}
        </div>
      </div>
    </div>
  );
}

