// src/components/ui/section-header.tsx

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      {/* Accent Line */}
      <div
        className={cn(
          "accent-line w-10 h-0.5 bg-gold mb-6",
          align === "center" && "mx-auto"
        )}
      />

      {/* Eyebrow Text (optional) */}
      {eyebrow && (
        <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-5">
          {eyebrow}
        </p>
      )}

      {/* Title - Parse underscore for gold color */}
      <h2
        className={cn(
          "font-display text-display-md text-charcoal",
          titleClassName
        )}
      >
        {title.includes("_") ? (
          <>
            {title.replace("_", "")}
            <span className="text-gold">_</span>
          </>
        ) : (
          <>
            {title}
            <span className="text-gold">_</span>
          </>
        )}
      </h2>

      {/* Description (optional) */}
      {description && (
        <p
          className={cn(
            "text-body-lg text-charcoal-light mt-6 max-w-[500px]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// Simpler variant for smaller sections
interface SmallHeaderProps {
  title: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function SmallHeader({ title, action, className }: SmallHeaderProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-end mb-12 lg:mb-16",
        className
      )}
    >
      <div>
        <div className="accent-line w-10 h-0.5 bg-gold mb-6" />
        <h2 className="font-display text-display-md text-charcoal">
          {title}
          <span className="text-gold">_</span>
        </h2>
      </div>
      
      {action && (
        <a
          href={action.href}
          className="text-xs tracking-caps uppercase text-charcoal hover:text-gold transition-colors relative group"
        >
          {action.label} →
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
        </a>
      )}
    </div>
  );
}