// src/components/ui/button.tsx

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg" | "sm";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center font-medium uppercase tracking-[0.12em] transition-all duration-300 overflow-hidden group",
          
          // Size variants
          size === "default" && "px-8 py-3.5 text-xs",
          size === "lg" && "px-12 py-[18px] text-xs",
          size === "sm" && "px-6 py-3 text-[11px]",
          
          // Style variants with explicit colors for reliability
          variant === "primary" && "bg-charcoal text-white",
          
          variant === "secondary" && [
            "bg-transparent text-charcoal border border-charcoal",
            "hover:bg-charcoal hover:text-white",
          ],
          
          variant === "ghost" && [
            "bg-transparent text-charcoal",
            "hover:text-gold",
          ],
          
          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed",
          
          className
        )}
        style={{
          // Fallback inline styles to guarantee visibility
          ...(variant === "primary" && {
            backgroundColor: "#2D2A26",
            color: "#FFFFFF",
          }),
        }}
        {...props}
      >
        {/* Text content - needs z-index to stay above the hover fill */}
        <span className="relative z-10">{children}</span>
        
        {/* Animated background fill for primary variant */}
        {variant === "primary" && (
          <span 
            className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400"
            style={{ backgroundColor: "#C4A484" }}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Export ButtonLink for use inside Next.js Link components
interface ButtonLinkProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg" | "sm";
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "default",
  children,
  className,
}: ButtonLinkProps) {
  return (
    <span
      className={cn(
        // Base styles
        "relative inline-flex items-center justify-center font-medium uppercase tracking-[0.12em] transition-all duration-300 overflow-hidden group cursor-pointer",
        
        // Size variants
        size === "default" && "px-8 py-3.5 text-xs",
        size === "lg" && "px-12 py-[18px] text-xs",
        size === "sm" && "px-6 py-3 text-[11px]",
        
        // Style variants
        variant === "primary" && "text-white",
        variant === "secondary" && "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-white",
        variant === "ghost" && "bg-transparent text-charcoal hover:text-gold",
        
        className
      )}
      style={{
        ...(variant === "primary" && {
          backgroundColor: "#2D2A26",
          color: "#FFFFFF",
        }),
      }}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400"
          style={{ backgroundColor: "#C4A484" }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}