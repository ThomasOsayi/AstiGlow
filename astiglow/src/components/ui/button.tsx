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
          "relative inline-flex items-center justify-center font-medium uppercase tracking-[0.12em] transition-all duration-300 ease-smooth overflow-hidden group",
          
          // Size variants
          size === "default" && "px-8 py-3.5 text-xs",
          size === "lg" && "px-12 py-[18px] text-xs",
          size === "sm" && "px-6 py-3 text-[11px]",
          
          // Style variants
          variant === "primary" && [
            "bg-charcoal text-cream",
            // Hover state handled by pseudo-element
          ],
          
          variant === "secondary" && [
            "bg-transparent text-charcoal border border-charcoal",
            "hover:bg-charcoal hover:text-cream",
          ],
          
          variant === "ghost" && [
            "bg-transparent text-charcoal",
            "hover:text-gold",
          ],
          
          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-charcoal",
          
          className
        )}
        {...props}
      >
        {/* Text content - needs z-index to stay above the hover fill */}
        <span className="relative z-10">{children}</span>
        
        {/* Animated background fill for primary variant */}
        {variant === "primary" && (
          <span 
            className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-smooth group-disabled:translate-x-full" 
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Link-styled button for use with Next.js Link
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
        "relative inline-flex items-center justify-center font-medium uppercase tracking-[0.12em] transition-all duration-300 ease-smooth overflow-hidden group cursor-pointer",
        
        // Size variants
        size === "default" && "px-8 py-3.5 text-xs",
        size === "lg" && "px-12 py-[18px] text-xs",
        size === "sm" && "px-6 py-3 text-[11px]",
        
        // Style variants
        variant === "primary" && "bg-charcoal text-cream",
        variant === "secondary" && "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream",
        variant === "ghost" && "bg-transparent text-charcoal hover:text-gold",
        
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span 
          className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-smooth" 
          aria-hidden="true"
        />
      )}
    </span>
  );
}