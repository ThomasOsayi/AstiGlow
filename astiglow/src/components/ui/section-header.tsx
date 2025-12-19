// src/components/ui/section-header.tsx

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";

// ===========================================
// SectionHeader Types
// ===========================================

export interface SectionHeaderProps {
  /** Small text above the title */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Description text below the title */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Size variant */
  size?: "default" | "large" | "small";
  /** Color theme */
  theme?: "light" | "dark";
  /** Whether to show the accent line */
  showAccent?: boolean;
  /** Whether to show the underscore after title */
  showUnderscore?: boolean;
  /** Action link/button to show on the right (left-aligned only) */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Additional class names for the container */
  className?: string;
  /** Additional class names for the title */
  titleClassName?: string;
  /** Additional class names for the description */
  descriptionClassName?: string;
  /** Custom content to render after description */
  children?: ReactNode;
}

// ===========================================
// SectionHeader Component
// ===========================================

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      description,
      align = "left",
      size = "default",
      theme = "light",
      showAccent = true,
      showUnderscore = true,
      action,
      className,
      titleClassName,
      descriptionClassName,
      children,
    },
    ref
  ) => {
    const isLight = theme === "light";
    const isCenter = align === "center";

    // Size-based classes
    const titleSizeClasses = {
      small: "text-2xl md:text-3xl",
      default: "text-4xl md:text-[42px]",
      large: "text-4xl md:text-5xl lg:text-[56px]",
    };

    const descriptionSizeClasses = {
      small: "text-sm max-w-md",
      default: "text-base max-w-xl",
      large: "text-lg max-w-2xl",
    };

    // Render action as link or button
    const ActionElement = action ? (
      action.href ? (
        <a
          href={action.href}
          className={cn(
            "group inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-medium transition-colors",
            isLight 
              ? "text-charcoal-light hover:text-gold" 
              : "text-white/70 hover:text-gold"
          )}
        >
          {action.label}
          <ArrowRight 
            size={14} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </a>
      ) : (
        <button
          onClick={action.onClick}
          className={cn(
            "group inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-medium transition-colors",
            isLight 
              ? "text-charcoal-light hover:text-gold" 
              : "text-white/70 hover:text-gold"
          )}
        >
          {action.label}
          <ArrowRight 
            size={14} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </button>
      )
    ) : null;

    return (
      <div
        ref={ref}
        className={cn(
          "mb-12",
          isCenter && "text-center",
          className
        )}
      >
        {/* Header row with optional action */}
        {action && !isCenter ? (
          <div className="flex items-end justify-between mb-0">
            <div>
              {/* Accent Line */}
              {showAccent && (
                <div
                  className={cn(
                    "w-10 h-0.5 mb-6 bg-gold",
                    isCenter && "mx-auto"
                  )}
                />
              )}

              {/* Eyebrow */}
              {eyebrow && (
                <p
                  className={cn(
                    "text-xs tracking-[0.2em] uppercase font-medium mb-4",
                    isLight ? "text-gold" : "text-gold"
                  )}
                >
                  {eyebrow}
                </p>
              )}

              {/* Title */}
              <h2
                className={cn(
                  "font-display font-normal leading-tight",
                  titleSizeClasses[size],
                  isLight ? "text-charcoal" : "text-white",
                  titleClassName
                )}
              >
                {title}
                {showUnderscore && <span className="text-gold">_</span>}
              </h2>
            </div>

            {/* Action on the right */}
            {ActionElement}
          </div>
        ) : (
          <>
            {/* Accent Line */}
            {showAccent && (
              <div
                className={cn(
                  "w-10 h-0.5 mb-6 bg-gold",
                  isCenter && "mx-auto"
                )}
              />
            )}

            {/* Eyebrow */}
            {eyebrow && (
              <p
                className={cn(
                  "text-xs tracking-[0.2em] uppercase font-medium mb-4",
                  isLight ? "text-gold" : "text-gold"
                )}
              >
                {eyebrow}
              </p>
            )}

            {/* Title */}
            <h2
              className={cn(
                "font-display font-normal leading-tight",
                titleSizeClasses[size],
                isLight ? "text-charcoal" : "text-white",
                titleClassName
              )}
            >
              {title}
              {showUnderscore && <span className="text-gold">_</span>}
            </h2>
          </>
        )}

        {/* Description */}
        {description && (
          <p
            className={cn(
              "mt-4 leading-relaxed",
              descriptionSizeClasses[size],
              isLight ? "text-charcoal-light" : "text-white/80",
              isCenter && "mx-auto",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}

        {/* Custom children */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

// ===========================================
// PageHeader Component (for page hero sections)
// ===========================================

export interface PageHeaderProps {
  /** Small text above the title */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Description text below the title */
  description?: string;
  /** Additional class names */
  className?: string;
  /** Custom content below description */
  children?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "pt-36 pb-16 text-center bg-cream",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.2em] uppercase font-medium text-gold mb-5">
          {eyebrow}
        </p>
      )}

      <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] font-normal text-charcoal mb-5">
        {title}
        <span className="text-gold">_</span>
      </h1>

      {description && (
        <p className="text-base md:text-lg text-charcoal-light max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

// ===========================================
// Divider Component (visual section break)
// ===========================================

export interface DividerProps {
  /** Additional class names */
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={cn(
        "w-10 h-0.5 bg-gold",
        className
      )}
    />
  );
}