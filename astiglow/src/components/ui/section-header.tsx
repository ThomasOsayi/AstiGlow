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
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Accent Line - using inline style for reliable color */}
      <div
        className={cn(
          "w-10 h-0.5 mb-6",
          align === "center" && "mx-auto"
        )}
        style={{ backgroundColor: "#C4A484" }}
      />

      {/* Eyebrow */}
      {eyebrow && (
        <p 
          className="text-xs tracking-[0.2em] uppercase font-medium mb-4"
          style={{ color: "#C4A484" }}
        >
          {eyebrow}
        </p>
      )}

      {/* Title with underscore accent */}
      <h2
        className={cn(
          "font-display text-4xl md:text-[42px] font-normal text-charcoal",
          titleClassName
        )}
      >
        {title}
        <span style={{ color: "#C4A484" }}>_</span>
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-4 text-base text-charcoal-light max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}