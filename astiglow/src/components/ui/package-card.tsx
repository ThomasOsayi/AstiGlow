// src/components/ui/package-card.tsx

"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Spinner, Gift } from "./icons";
import type { Package } from "@/types";

// ===========================================
// PackageCard Types
// ===========================================

export interface PackageCardProps {
  /** Package data to display */
  package: Package;
  /** Whether the package is in the cart */
  isInCart?: boolean;
  /** Loading state for async cart operations */
  isLoading?: boolean;
  /** Callback when adding to cart */
  onAddToCart?: (pkg: Package) => void;
  /** Callback when removing from cart */
  onRemoveFromCart?: (pkgId: string) => void;
  /** Additional class names */
  className?: string;
}

// ===========================================
// PackageCard Component
// ===========================================

export const PackageCard = forwardRef<HTMLDivElement, PackageCardProps>(
  (
    {
      package: pkg,
      isInCart = false,
      isLoading = false,
      onAddToCart,
      onRemoveFromCart,
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
      if (isLoading) return;
      if (isInCart) {
        onRemoveFromCart?.(pkg.id);
      } else {
        onAddToCart?.(pkg);
      }
    };

    // Calculate total sessions and value
    const totalSessions = pkg.sessions + pkg.bonus;
    const totalValue = pkg.originalPrice * totalSessions;
    const packageTotal = pkg.packagePrice * pkg.sessions;
    const totalSavings = totalValue - packageTotal;

    return (
      <div
        ref={ref}
        className={cn(
          "group bg-white p-8 lg:p-10 flex flex-col relative",
          "border border-border transition-all duration-400",
          "hover:border-gold hover:-translate-y-1",
          "hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)]",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Best Value Badge */}
        {pkg.popular && (
          <div className="absolute -top-px right-8 badge-popular py-2 px-4">
            Best Value
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display text-[28px] font-medium text-charcoal mb-2">
            {pkg.name}
          </h3>
          <p className="text-sm leading-relaxed text-charcoal-light mb-6">
            {pkg.description}
          </p>

          {/* Session Dots Visualization */}
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-wider text-charcoal-light mb-3">
              {totalSessions} Sessions Included
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Paid sessions */}
              {Array.from({ length: pkg.sessions }).map((_, i) => (
                <div
                  key={`paid-${i}`}
                  className="w-3 h-3 rounded-full bg-charcoal transition-transform duration-200"
                  style={{
                    transitionDelay: `${i * 30}ms`,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                  aria-hidden="true"
                />
              ))}
              {/* Bonus sessions */}
              {Array.from({ length: pkg.bonus }).map((_, i) => (
                <div
                  key={`bonus-${i}`}
                  className="w-3 h-3 rounded-full bg-gold transition-transform duration-200"
                  style={{
                    transitionDelay: `${(pkg.sessions + i) * 30}ms`,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                  aria-hidden="true"
                />
              ))}
              {/* Legend */}
              <span className="ml-2 text-[10px] text-charcoal-light">
                <span className="inline-block w-2 h-2 rounded-full bg-gold mr-1 align-middle" />
                Free
              </span>
            </div>
          </div>

          {/* Savings Badge */}
          <div className="flex items-center gap-2">
            <span className="badge-savings">
              Save ${pkg.savings}/session
            </span>
            <span className="text-xs text-charcoal-light">
              (${totalSavings} total)
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-6 mt-6 border-t border-border">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display text-[32px] font-medium text-charcoal">
              ${pkg.packagePrice}
            </span>
            <span className="text-sm line-through text-charcoal-light">
              ${pkg.originalPrice}
            </span>
            <span className="text-[13px] text-charcoal-light">
              / session
            </span>
          </div>

          <p className="text-[13px] text-gold mb-5 flex items-center gap-1.5">
            <Gift size={14} className="opacity-80" />
            Buy {pkg.sessions}, get {pkg.bonus} free
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={cn(
              "w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium",
              "flex items-center justify-center gap-2",
              "transition-all duration-300",
              "disabled:cursor-not-allowed",
              isInCart
                ? "bg-gold text-white"
                : "bg-charcoal text-white hover:bg-gold"
            )}
          >
            {isLoading ? (
              <Spinner size={16} />
            ) : isInCart ? (
              <>
                <Check size={14} strokeWidth={3} />
                Added
              </>
            ) : (
              "Add to Bag"
            )}
          </button>
        </div>
      </div>
    );
  }
);

PackageCard.displayName = "PackageCard";

// ===========================================
// PackageCardCompact (for cart/summary views)
// ===========================================

interface PackageCardCompactProps {
  package: Package;
  onRemove?: (pkgId: string) => void;
  className?: string;
}

export function PackageCardCompact({
  package: pkg,
  onRemove,
  className,
}: PackageCardCompactProps) {
  const totalSessions = pkg.sessions + pkg.bonus;

  return (
    <div
      className={cn(
        "flex items-start justify-between p-4 bg-cream rounded-sm",
        className
      )}
    >
      <div className="flex-1">
        <h4 className="font-medium text-charcoal mb-1">{pkg.name} Package</h4>
        <p className="text-sm text-charcoal-light">
          {totalSessions} sessions · ${pkg.packagePrice}/session
        </p>
        {/* Mini session dots */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: pkg.sessions }).map((_, i) => (
            <div
              key={`paid-${i}`}
              className="w-1.5 h-1.5 rounded-full bg-charcoal"
              aria-hidden="true"
            />
          ))}
          {Array.from({ length: pkg.bonus }).map((_, i) => (
            <div
              key={`bonus-${i}`}
              className="w-1.5 h-1.5 rounded-full bg-gold"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="text-right">
        <p className="font-display text-lg font-medium text-charcoal">
          ${pkg.packagePrice * pkg.sessions}
        </p>
        {onRemove && (
          <button
            onClick={() => onRemove(pkg.id)}
            className="text-xs text-charcoal-light hover:text-charcoal transition-colors mt-1"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

// ===========================================
// PackageComparison (shows value breakdown)
// ===========================================

interface PackageComparisonProps {
  package: Package;
  className?: string;
}

export function PackageComparison({ package: pkg, className }: PackageComparisonProps) {
  const totalSessions = pkg.sessions + pkg.bonus;
  const regularTotal = pkg.originalPrice * totalSessions;
  const packageTotal = pkg.packagePrice * pkg.sessions;
  const totalSavings = regularTotal - packageTotal;

  return (
    <div className={cn("p-6 bg-cream-dark/50 rounded-sm", className)}>
      <h4 className="text-xs uppercase tracking-wider text-charcoal-light mb-4">
        Package Breakdown
      </h4>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-charcoal-light">
            {pkg.sessions} sessions × ${pkg.packagePrice}
          </span>
          <span className="text-charcoal">${pkg.packagePrice * pkg.sessions}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gold flex items-center gap-1.5">
            <Gift size={12} />
            {pkg.bonus} bonus sessions
          </span>
          <span className="text-gold">FREE</span>
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-charcoal-light">Regular price ({totalSessions} sessions)</span>
          <span className="text-charcoal-light line-through">${regularTotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-charcoal">Your price</span>
          <span className="font-display text-xl font-medium text-charcoal">
            ${packageTotal}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gold">Total savings</span>
          <span className="text-sm font-medium text-gold">${totalSavings}</span>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Cart Summary (for packages page sidebar)
// ===========================================

interface PackageCartSummaryProps {
  packages: Package[];
  onRemove?: (pkgId: string) => void;
  onCheckout?: () => void;
  isCheckoutLoading?: boolean;
  className?: string;
}

export function PackageCartSummary({
  packages,
  onRemove,
  onCheckout,
  isCheckoutLoading = false,
  className,
}: PackageCartSummaryProps) {
  if (packages.length === 0) return null;

  const total = packages.reduce((sum, pkg) => sum + pkg.packagePrice * pkg.sessions, 0);
  const totalSessions = packages.reduce((sum, pkg) => sum + pkg.sessions + pkg.bonus, 0);

  return (
    <div className={cn("bg-white border border-border p-6", className)}>
      <h3 className="text-xs uppercase tracking-wider text-charcoal-light mb-4">
        Your Bag ({packages.length} {packages.length === 1 ? "package" : "packages"})
      </h3>

      <div className="space-y-3 mb-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-charcoal">{pkg.name}</p>
              <p className="text-xs text-charcoal-light">
                {pkg.sessions + pkg.bonus} sessions
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-charcoal">
                ${pkg.packagePrice * pkg.sessions}
              </p>
              {onRemove && (
                <button
                  onClick={() => onRemove(pkg.id)}
                  className="text-[10px] text-charcoal-light hover:text-gold transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-sm text-charcoal-light">Total</span>
          <span className="font-display text-2xl font-medium text-charcoal">
            ${total}
          </span>
        </div>
        <p className="text-xs text-charcoal-light mb-4">
          {totalSessions} total sessions
        </p>

        <button
          onClick={onCheckout}
          disabled={isCheckoutLoading}
          className={cn(
            "w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium",
            "bg-charcoal text-white hover:bg-gold transition-colors",
            "flex items-center justify-center gap-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isCheckoutLoading ? <Spinner size={16} /> : "Checkout"}
        </button>

        {/* BNPL badges */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="badge-klarna text-[10px]">Klarna</span>
          <span className="badge-affirm text-[10px]">Affirm</span>
          <span className="badge-afterpay text-[10px]">Afterpay</span>
        </div>
      </div>
    </div>
  );
}