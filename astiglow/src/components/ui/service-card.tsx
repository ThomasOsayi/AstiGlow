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
          "group bg-white p-8 flex flex-col h-full relative cursor-pointer",
          "border border-border transition-all duration-400",
          "hover:border-gold hover:-translate-y-1",
          "hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)]",
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
          <div className="absolute top-4 right-4 badge-popular">
            Popular
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display text-[26px] font-medium text-charcoal mb-3">
            {service.name}
          </h3>
          <p className="text-sm leading-[1.7] text-charcoal-light mb-6">
            {service.description}
          </p>
        </div>

        {/* Price & Duration */}
        <div>
          <div className="flex justify-between items-center pt-5 mb-4 border-t border-border">
            <span className="font-display text-2xl font-medium text-charcoal">
              ${service.price}
            </span>
            <span className="text-xs tracking-[0.05em] uppercase text-charcoal-light">
              {service.duration} min
            </span>
          </div>

          {/* CTA Button - Reveals on hover */}
          <button
            className={cn(
              "w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium",
              "border border-charcoal transition-all duration-300",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
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
          "relative bg-white p-5 sm:p-6 cursor-pointer",
          "border transition-all duration-300",
          "flex items-start gap-4",
          isSelected
            ? "border-gold bg-gold/[0.03] border-l-[3px]"
            : "border-border hover:border-gold/50",
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
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-charcoal">
                  {service.name}
                </h3>
                {service.popular && (
                  <span className="badge-popular text-[9px] py-0.5 px-2">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-charcoal-light line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Price & Duration */}
            <div className="text-right flex-shrink-0">
              <p className="font-display text-xl font-medium text-charcoal">
                ${service.price}
              </p>
              <p className="text-xs text-charcoal-light mt-0.5">
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
          "flex items-center justify-between py-3 px-4",
          "border-b border-border last:border-b-0",
          "hover:bg-cream-dark/30 transition-colors cursor-pointer",
          className
        )}
        onClick={() => onSelect?.(service)}
      >
        <div className="flex items-center gap-3">
          <span className="font-medium text-charcoal text-sm">
            {service.name}
          </span>
          {service.popular && (
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-label="Popular" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-charcoal-light">
            {service.duration} min
          </span>
          <span className="font-display font-medium text-charcoal">
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
        "flex items-center justify-between p-4 rounded-sm",
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
          "px-4 py-2 text-xs font-medium uppercase tracking-wider",
          "bg-gold text-white rounded-sm",
          "hover:bg-gold/90 transition-colors"
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
                  className="text-charcoal-light hover:text-charcoal transition-colors"
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
          <span className="text-xs uppercase tracking-wider text-charcoal-light">
            Total ({totalDuration} min)
          </span>
          <span className="font-display text-xl font-medium text-charcoal">
            ${totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}