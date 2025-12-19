// src/components/ui/button.tsx

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./icons";

// ===========================================
// Button Types
// ===========================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size variant */
  size?: "default" | "lg" | "sm";
  /** Show loading spinner and disable interactions */
  isLoading?: boolean;
  /** Loading text (replaces children when loading) */
  loadingText?: string;
  /** Icon to show on the left side */
  leftIcon?: ReactNode;
  /** Icon to show on the right side */
  rightIcon?: ReactNode;
  /** Button content */
  children: ReactNode;
}

// ===========================================
// Button Component
// ===========================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center gap-2",
          "font-medium uppercase tracking-[0.12em]",
          "transition-all duration-300 overflow-hidden",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
          "group",

          // Size variants
          size === "default" && "px-8 py-3.5 text-xs",
          size === "lg" && "px-12 py-[18px] text-xs",
          size === "sm" && "px-6 py-3 text-[11px]",

          // Primary variant - charcoal bg, gold slide-in on hover
          variant === "primary" && [
            "bg-charcoal text-white",
            "hover:shadow-md",
          ],

          // Secondary variant - charcoal border, fills on hover
          variant === "secondary" && [
            "bg-transparent text-charcoal border border-charcoal",
            "hover:bg-charcoal hover:text-white",
          ],

          // Outline variant - for use on dark backgrounds
          variant === "outline" && [
            "bg-transparent text-white border border-white",
            "hover:bg-white hover:text-charcoal",
          ],

          // Ghost variant - minimal, just text
          variant === "ghost" && [
            "bg-transparent text-charcoal px-0",
            "hover:text-gold",
          ],

          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",

          className
        )}
        style={{
          // Fallback inline styles for color reliability
          ...(variant === "primary" && {
            backgroundColor: "#2D2A26",
            color: "#FFFFFF",
          }),
        }}
        {...props}
      >
        {/* Left icon */}
        {leftIcon && !isLoading && (
          <span className="relative z-10 -ml-1">{leftIcon}</span>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <Spinner size={size === "sm" ? 14 : 16} className="relative z-10" />
        )}

        {/* Text content - needs z-index to stay above the hover fill */}
        <span className="relative z-10">
          {isLoading ? (loadingText || children) : children}
        </span>

        {/* Right icon */}
        {rightIcon && !isLoading && (
          <span className="relative z-10 -mr-1 transition-transform duration-300 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}

        {/* Animated background fill for primary variant */}
        {variant === "primary" && !isDisabled && (
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"
            style={{ backgroundColor: "#C9A27C" }}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ===========================================
// ButtonLink Component (for use inside Next.js Link)
// ===========================================

export interface ButtonLinkProps {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size variant */
  size?: "default" | "lg" | "sm";
  /** Icon to show on the left side */
  leftIcon?: ReactNode;
  /** Icon to show on the right side */
  rightIcon?: ReactNode;
  /** Button content */
  children: ReactNode;
  /** Additional class names */
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "default",
  leftIcon,
  rightIcon,
  children,
  className,
}: ButtonLinkProps) {
  return (
    <span
      className={cn(
        // Base styles
        "relative inline-flex items-center justify-center gap-2",
        "font-medium uppercase tracking-[0.12em]",
        "transition-all duration-300 overflow-hidden cursor-pointer",
        "group",

        // Size variants
        size === "default" && "px-8 py-3.5 text-xs",
        size === "lg" && "px-12 py-[18px] text-xs",
        size === "sm" && "px-6 py-3 text-[11px]",

        // Primary variant
        variant === "primary" && "text-white hover:shadow-md",

        // Secondary variant
        variant === "secondary" && [
          "bg-transparent text-charcoal border border-charcoal",
          "hover:bg-charcoal hover:text-white",
        ],

        // Outline variant
        variant === "outline" && [
          "bg-transparent text-white border border-white",
          "hover:bg-white hover:text-charcoal",
        ],

        // Ghost variant
        variant === "ghost" && [
          "bg-transparent text-charcoal px-0",
          "hover:text-gold",
        ],

        className
      )}
      style={{
        ...(variant === "primary" && {
          backgroundColor: "#2D2A26",
          color: "#FFFFFF",
        }),
      }}
    >
      {/* Left icon */}
      {leftIcon && <span className="relative z-10 -ml-1">{leftIcon}</span>}

      {/* Text content */}
      <span className="relative z-10">{children}</span>

      {/* Right icon */}
      {rightIcon && (
        <span className="relative z-10 -mr-1 transition-transform duration-300 group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}

      {/* Animated background fill for primary variant */}
      {variant === "primary" && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"
          style={{ backgroundColor: "#C9A27C" }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

// ===========================================
// IconButton Component (for icon-only buttons)
// ===========================================

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "ghost";
  /** Size variant */
  size?: "default" | "sm" | "lg";
  /** Show loading spinner */
  isLoading?: boolean;
  /** Icon to display */
  icon: ReactNode;
  /** Accessible label (required for a11y) */
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "default",
      isLoading = false,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center",
          "rounded-full transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",

          // Size variants
          size === "sm" && "w-8 h-8",
          size === "default" && "w-10 h-10",
          size === "lg" && "w-12 h-12",

          // Primary variant
          variant === "primary" && [
            "bg-charcoal text-white",
            "hover:bg-gold",
          ],

          // Secondary variant
          variant === "secondary" && [
            "bg-transparent text-charcoal border border-border",
            "hover:border-gold hover:text-gold",
          ],

          // Ghost variant
          variant === "ghost" && [
            "bg-transparent text-charcoal-light",
            "hover:text-charcoal hover:bg-cream-dark/50",
          ],

          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed",

          className
        )}
        {...props}
      >
        {isLoading ? <Spinner size={size === "sm" ? 14 : 18} /> : icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";