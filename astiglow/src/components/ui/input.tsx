"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ===========================================
// Input Component
// ===========================================
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "underline" | "boxed";
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "boxed", label, error, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full font-body text-[15px] text-charcoal placeholder:text-charcoal-light/60 transition-colors duration-300 outline-none",
            
            // Boxed variant
            variant === "boxed" && [
              "px-5 py-[18px] bg-white border border-border",
              "focus:border-gold",
              error && "border-red-400 focus:border-red-400",
            ],
            
            // Underline variant
            variant === "underline" && [
              "py-5 bg-transparent border-b border-border",
              "focus:border-gold",
              error && "border-red-400 focus:border-red-400",
            ],
            
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ===========================================
// Textarea Component
// ===========================================
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "underline" | "boxed";
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "boxed", label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full font-body text-[15px] text-charcoal placeholder:text-charcoal-light/60 transition-colors duration-300 outline-none resize-none",
            
            // Boxed variant
            variant === "boxed" && [
              "px-5 py-[18px] bg-white border border-border",
              "focus:border-gold",
              error && "border-red-400 focus:border-red-400",
            ],
            
            // Underline variant
            variant === "underline" && [
              "py-5 bg-transparent border-b border-border",
              "focus:border-gold",
              error && "border-red-400 focus:border-red-400",
            ],
            
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";