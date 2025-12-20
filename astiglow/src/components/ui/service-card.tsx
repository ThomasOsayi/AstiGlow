// src/components/ui/service-card.tsx

"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "./icons";
import type { Service } from "@/types";

// ===========================================
// ServiceCard Types
// ===========================================

interface ServiceCardBaseProps {
  /** Service data to display */
  service: Service;
  /** Additional class names */
  className?: string;
}

interface ServiceCardDefaultProps extends ServiceCardBaseProps {
  /** Display mode */
  mode?: "default";
  /** Callback when card is clicked */
  onSelect?: (service: Service) => void;
}

interface ServiceCardSelectableProps extends ServiceCardBaseProps {
  /** Display mode - selectable for booking flow */
  mode: "selectable";
  /** Whether the service is currently selected */
  isSelected?: boolean;
  /** Callback when selection changes */
  onSelect?: (service: Service, selected: boolean) => void;
}

interface ServiceCardCompactProps extends ServiceCardBaseProps {
  /** Display mode - compact for lists */
  mode: "compact";
  /** Callback when card is clicked */
  onSelect?: (service: Service) => void;
}

export type ServiceCardProps =
  | ServiceCardDefaultProps
  | ServiceCardSelectableProps
  | ServiceCardCompactProps;

// ===========================================
// ServiceCard Component
// ===========================================

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  (props, ref) => {
    const { service, className, mode = "default" } = props;
    const [isHovered, setIsHovered] = useState(false);

    // Handle different modes
    if (mode === "selectable") {
      return (
        <SelectableServiceCard
          ref={ref}
          service={service}
          isSelected={(props as ServiceCardSelectableProps).isSelected}
          onSelect={(props as ServiceCardSelectableProps).onSelect}
          className={className}
        />
      );
    }

    if (mode === "compact") {
      return (
        <CompactServiceCard
          ref={ref}
          service={service}
          onSelect={(props as ServiceCardCompactProps).onSelect}
          className={className}
        />
      );
    }

    // Default mode - for services page grid
    const handleClick = () => {
      (props as ServiceCardDefaultProps).onSelect?.(service);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group bg-white p-5 sm:p-6 md:p-8 flex flex-col h-full relative cursor-pointer",
          "border border-border transition-all duration-400",
          "hover:border-gold hover:-translate-y-1",
          "hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)]",
          // Active state for touch devices
          "active:scale-[0.99] active:shadow-md",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Animated bottom border accent */}
        <span
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[3px] bg-gold",
            "transform origin-left transition-transform duration-400",
            isHovered ? "scale-x-100" : "scale-x-0"
          )}
          aria-hidden="true"
        />

        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 badge-popular text-[9px] sm:text-[10px]">
            Popular
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display text-[22px] sm:text-[24px] md:text-[26px] font-medium text-charcoal mb-2 sm:mb-3">
            {service.name}
          </h3>
          <p className="text-xs sm:text-sm leading-[1.6] sm:leading-[1.7] text-charcoal-light mb-4 sm:mb-6">
            {service.description}
          </p>
        </div>

        {/* Price & Duration */}
        <div>
          <div className="flex justify-between items-center pt-4 sm:pt-5 mb-3 sm:mb-4 border-t border-border">
            <span className="font-display text-xl sm:text-2xl font-medium text-charcoal">
              ${service.price}
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.05em] uppercase text-charcoal-light">
              {service.duration} min
            </span>
          </div>

          {/* CTA Button - Always visible on mobile, reveals on hover for desktop */}
          <button
            className={cn(
              "w-full py-3 sm:py-3.5 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium",
              "border border-charcoal transition-all duration-300",
              // Always visible on touch devices, hover reveal on desktop
              "opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0",
              isHovered
                ? "bg-charcoal text-white"
                : "bg-transparent text-charcoal"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Select Service
          </button>
        </div>
      </div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

// ===========================================
// Selectable ServiceCard (for booking flow)
// ===========================================

interface SelectableCardProps {
  service: Service;
  isSelected?: boolean;
  onSelect?: (service: Service, selected: boolean) => void;
  className?: string;
}

const SelectableServiceCard = forwardRef<HTMLDivElement, SelectableCardProps>(
  ({ service, isSelected = false, onSelect, className }, ref) => {
    const handleClick = () => {
      onSelect?.(service, !isSelected);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-white p-4 sm:p-5 md:p-6 cursor-pointer",
          "border transition-all duration-300",
          "flex items-start gap-3 sm:gap-4",
          // Minimum touch target
          "min-h-[72px]",
          isSelected
            ? "border-gold bg-gold/[0.03] border-l-[3px]"
            : "border-border hover:border-gold/50 active:bg-cream/50",
          className
        )}
        onClick={handleClick}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Checkbox */}
        <div
          className={cn(
            "w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5",
            "flex items-center justify-center transition-all duration-200",
            isSelected
              ? "bg-gold border-gold"
              : "border-border group-hover:border-charcoal-light"
          )}
        >
          {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-charcoal text-sm sm:text-base">
                  {service.name}
                </h3>
                {service.popular && (
                  <span className="badge-popular text-[8px] sm:text-[9px] py-0.5 px-1.5 sm:px-2">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-charcoal-light line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Price & Duration */}
            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 sm:text-right flex-shrink-0">
              <p className="font-display text-lg sm:text-xl font-medium text-charcoal">
                ${service.price}
              </p>
              <p className="text-[10px] sm:text-xs text-charcoal-light sm:mt-0.5">
                {service.duration} min
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SelectableServiceCard.displayName = "SelectableServiceCard";

// ===========================================
// Compact ServiceCard (for booking sidebar)
// ===========================================

interface CompactCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  className?: string;
}

const CompactServiceCard = forwardRef<HTMLDivElement, CompactCardProps>(
  ({ service, onSelect, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between py-3 px-3 sm:px-4",
          "border-b border-border last:border-b-0",
          "hover:bg-cream-dark/30 active:bg-cream-dark/50 transition-colors cursor-pointer",
          // Minimum touch target
          "min-h-[48px]",
          className
        )}
        onClick={() => onSelect?.(service)}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-medium text-charcoal text-xs sm:text-sm">
            {service.name}
          </span>
          {service.popular && (
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-label="Popular" />
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs text-charcoal-light">
            {service.duration} min
          </span>
          <span className="font-display font-medium text-charcoal text-sm sm:text-base">
            ${service.price}
          </span>
        </div>
      </div>
    );
  }
);

CompactServiceCard.displayName = "CompactServiceCard";

// ===========================================
// ServiceCard Add-On (for booking flow suggestions)
// ===========================================

interface ServiceAddOnProps {
  service: Service;
  onAdd?: (service: Service) => void;
  className?: string;
}

export function ServiceAddOn({ service, onAdd, className }: ServiceAddOnProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 rounded-sm",
        "bg-gold/[0.06] border border-gold/20",
        "animate-in slide-in-from-bottom-2 duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-gold text-lg">✨</span>
        <div>
          <p className="text-sm text-charcoal">
            Add <span className="font-medium">{service.name}</span>?
          </p>
          <p className="text-xs text-charcoal-light">
            +${service.price} · {service.duration} min
          </p>
        </div>
      </div>
      <button
        onClick={() => onAdd?.(service)}
        className={cn(
          "w-full sm:w-auto px-4 py-2.5 text-xs font-medium uppercase tracking-wider",
          "bg-gold text-white rounded-sm",
          "hover:bg-gold/90 active:bg-gold/80 transition-colors",
          // Touch target
          "min-h-[44px] sm:min-h-0"
        )}
      >
        Add
      </button>
    </div>
  );
}

// ===========================================
// Selected Services Summary (for booking flow)
// ===========================================

interface SelectedServicesSummaryProps {
  services: Service[];
  onRemove?: (service: Service) => void;
  className?: string;
}

export function SelectedServicesSummary({
  services,
  onRemove,
  className,
}: SelectedServicesSummaryProps) {
  const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = services.reduce((sum, s) => sum + s.duration, 0);

  if (services.length === 0) return null;

  return (
    <div className={cn("bg-cream p-4 rounded-sm", className)}>
      {/* Services list */}
      <div className="space-y-2 mb-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-charcoal">{service.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-charcoal-light">${service.price}</span>
              {onRemove && (
                <button
                  onClick={() => onRemove(service)}
                  className="text-charcoal-light hover:text-charcoal active:text-gold transition-colors p-1 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={`Remove ${service.name}`}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-charcoal-light">
            Total ({totalDuration} min)
          </span>
          <span className="font-display text-lg sm:text-xl font-medium text-charcoal">
            ${totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}