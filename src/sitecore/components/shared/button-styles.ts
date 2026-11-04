type ButtonVariant = "primary" | "secondary" | "outline";

const BASE = "px-8 py-3 rounded-full font-medium transition-all duration-300 inline-block text-center";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
  secondary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-md hover:shadow-lg",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
};

/** Same styles as atoms/Button, applied to the SDK <Link> / native <button>. */
export function buttonClassName(variant: ButtonVariant = "primary", className = ""): string {
  return `${BASE} ${VARIANTS[variant]} ${className}`.trim();
}

