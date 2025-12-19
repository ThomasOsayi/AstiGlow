// src/components/ui/input.tsx

"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, ChevronDown } from "./icons";

// ===========================================
// Shared Types
// ===========================================

type InputVariant = "underline" | "boxed";
type InputState = "default" | "error" | "success";

interface BaseInputProps {
  /** Visual variant */
  variant?: InputVariant;
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Whether the field is required */
  required?: boolean;
}

// ===========================================
// Label Component
// ===========================================

interface LabelProps {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

export function Label({ children, required, htmlFor, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-2",
        className
      )}
    >
      {children}
      {required && <span className="text-gold ml-0.5">*</span>}
    </label>
  );
}

// ===========================================
// Input Component
// ===========================================

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, BaseInputProps {
  /** Icon to display on the left */
  leftIcon?: ReactNode;
  /** Icon to display on the right */
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "boxed",
      label,
      helperText,
      error,
      success,
      required,
      leftIcon,
      rightIcon,
      type = "text",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    
    const state: InputState = error ? "error" : success ? "success" : "default";

    const stateStyles = {
      default: "border-border focus:border-gold",
      error: "border-red-400 focus:border-red-400",
      success: "border-green-500 focus:border-green-500",
    };

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full font-body text-[15px] text-charcoal",
              "placeholder:text-charcoal-light/60",
              "transition-all duration-300 outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream",

              // Boxed variant
              variant === "boxed" && [
                "px-5 py-[18px] bg-white border",
                stateStyles[state],
              ],

              // Underline variant
              variant === "underline" && [
                "py-5 bg-transparent border-b",
                stateStyles[state],
              ],

              // Icon padding
              leftIcon && "pl-12",
              (rightIcon || state !== "default") && "pr-12",

              className
            )}
            {...props}
          />

          {/* Right icon or state indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {state === "error" && (
              <AlertCircle size={18} className="text-red-400" />
            )}
            {state === "success" && (
              <Check size={18} className="text-green-500" />
            )}
            {state === "default" && rightIcon}
          </div>
        </div>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <p
            className={cn(
              "mt-2 text-xs",
              error ? "text-red-500" : "text-charcoal-light"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ===========================================
// Textarea Component
// ===========================================

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    BaseInputProps {
  /** Maximum character count (shows counter when set) */
  maxLength?: number;
  /** Show character count even without maxLength */
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = "boxed",
      label,
      helperText,
      error,
      success,
      required,
      rows = 4,
      maxLength,
      showCount,
      id,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      String(value || defaultValue || "").length
    );
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    const state: InputState = error ? "error" : success ? "success" : "default";

    const stateStyles = {
      default: "border-border focus:border-gold",
      error: "border-red-400 focus:border-red-400",
      success: "border-green-500 focus:border-green-500",
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={cn(
              "w-full font-body text-[15px] text-charcoal",
              "placeholder:text-charcoal-light/60",
              "transition-all duration-300 outline-none resize-none",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream",

              // Boxed variant
              variant === "boxed" && [
                "px-5 py-[18px] bg-white border",
                stateStyles[state],
              ],

              // Underline variant
              variant === "underline" && [
                "py-5 bg-transparent border-b",
                stateStyles[state],
              ],

              className
            )}
            {...props}
          />

          {/* State indicator */}
          {state !== "default" && (
            <div className="absolute right-4 top-4">
              {state === "error" && (
                <AlertCircle size={18} className="text-red-400" />
              )}
              {state === "success" && (
                <Check size={18} className="text-green-500" />
              )}
            </div>
          )}
        </div>

        {/* Footer: helper/error + character count */}
        <div className="flex justify-between items-start mt-2">
          <p
            className={cn(
              "text-xs flex-1",
              error ? "text-red-500" : "text-charcoal-light"
            )}
          >
            {error || helperText}
          </p>

          {(maxLength || showCount) && (
            <span
              className={cn(
                "text-xs ml-4",
                maxLength && charCount >= maxLength
                  ? "text-red-500"
                  : "text-charcoal-light"
              )}
            >
              {charCount}
              {maxLength && `/${maxLength}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// ===========================================
// Select Component
// ===========================================

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    BaseInputProps {
  /** Options to display */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant = "boxed",
      label,
      helperText,
      error,
      success,
      required,
      options,
      placeholder,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    const state: InputState = error ? "error" : success ? "success" : "default";

    const stateStyles = {
      default: "border-border focus:border-gold",
      error: "border-red-400 focus:border-red-400",
      success: "border-green-500 focus:border-green-500",
    };

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full font-body text-[15px] text-charcoal",
              "appearance-none cursor-pointer",
              "transition-all duration-300 outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream",

              // Boxed variant
              variant === "boxed" && [
                "px-5 py-[18px] bg-white border",
                stateStyles[state],
              ],

              // Underline variant
              variant === "underline" && [
                "py-5 bg-transparent border-b",
                stateStyles[state],
              ],

              // Right padding for arrow
              "pr-12",

              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-light">
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <p
            className={cn(
              "mt-2 text-xs",
              error ? "text-red-500" : "text-charcoal-light"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// ===========================================
// Checkbox Component
// ===========================================

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Label text */
  label: ReactNode;
  /** Description text below the label */
  description?: string;
  /** Error message */
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, disabled, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("relative", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "flex items-start gap-3 cursor-pointer group",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Custom checkbox */}
          <div className="relative mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                "w-5 h-5 border-2 rounded-sm transition-all duration-200",
                "flex items-center justify-center",
                "border-border",
                "peer-checked:bg-gold peer-checked:border-gold",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2",
                "group-hover:border-charcoal-light",
                error && "border-red-400"
              )}
            >
              <Check
                size={12}
                className="text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
          </div>

          {/* Label & description */}
          <div className="flex-1">
            <span className="text-sm text-charcoal">{label}</span>
            {description && (
              <p className="text-xs text-charcoal-light mt-1">{description}</p>
            )}
          </div>
        </label>

        {error && <p className="mt-2 text-xs text-red-500 ml-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// ===========================================
// Radio Group Component
// ===========================================

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  /** Group name (for form submission) */
  name: string;
  /** Label for the group */
  label?: string;
  /** Options to display */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Error message */
  error?: string;
  /** Required field */
  required?: boolean;
  /** Additional class names */
  className?: string;
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
  className,
}: RadioGroupProps) {
  return (
    <div className={className} role="radiogroup" aria-labelledby={`${name}-label`}>
      {label && (
        <Label required={required} className="mb-4" htmlFor={`${name}-label`}>
          {label}
        </Label>
      )}

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-start gap-3 cursor-pointer group",
              option.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {/* Custom radio */}
            <div className="relative mt-0.5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={option.disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className="peer sr-only"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-200",
                  "flex items-center justify-center",
                  "border-border",
                  "peer-checked:border-gold",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2",
                  "group-hover:border-charcoal-light",
                  error && "border-red-400"
                )}
              >
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full bg-gold",
                    "scale-0 peer-checked:scale-100 transition-transform duration-200"
                  )}
                />
              </div>
            </div>

            {/* Label & description */}
            <div className="flex-1">
              <span className="text-sm text-charcoal">{option.label}</span>
              {option.description && (
                <p className="text-xs text-charcoal-light mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ===========================================
// Form Field Wrapper (for custom layouts)
// ===========================================

interface FormFieldProps {
  /** Label text */
  label?: string;
  /** Required indicator */
  required?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Field content */
  children: ReactNode;
  /** Additional class names */
  className?: string;
}

export function FormField({
  label,
  required,
  helperText,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && <Label required={required}>{label}</Label>}
      {children}
      {(helperText || error) && (
        <p
          className={cn(
            "mt-2 text-xs",
            error ? "text-red-500" : "text-charcoal-light"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}