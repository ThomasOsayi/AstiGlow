"use client";

import { cn } from "@/lib/utils";
import type { Package } from "@/types";

interface PackageCardProps {
  package: Package;
  isInCart?: boolean;
  onAddToCart?: (pkg: Package) => void;
  onRemoveFromCart?: (pkgId: string) => void;
}

export function PackageCard({
  package: pkg,
  isInCart = false,
  onAddToCart,
  onRemoveFromCart,
}: PackageCardProps) {
  const handleClick = () => {
    if (isInCart) {
      onRemoveFromCart?.(pkg.id);
    } else {
      onAddToCart?.(pkg);
    }
  };

  return (
    <div
      className={cn(
        "bg-white border border-border p-10 flex flex-col relative",
        "transition-all duration-400 ease-smooth",
        "hover:-translate-y-1 hover:shadow-card hover:border-gold"
      )}
    >
      {/* Best Value Badge */}
      {pkg.popular && (
        <div className="absolute -top-px right-8 bg-gold text-white text-[10px] tracking-[0.1em] uppercase px-4 py-2 font-medium">
          Best Value
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-display text-[28px] font-medium text-charcoal mb-2">
          {pkg.name}
        </h3>
        <p className="text-sm text-charcoal-light leading-relaxed mb-6">
          {pkg.description}
        </p>

        {/* Savings Badge */}
        <div className="mb-6">
          <span className="inline-block bg-gold/15 text-gold text-[11px] tracking-[0.05em] uppercase px-3 py-1.5 font-medium">
            Save ${pkg.savings}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="pt-6 border-t border-border">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-display text-[32px] font-medium text-charcoal">
            ${pkg.packagePrice}
          </span>
          <span className="text-sm text-charcoal-light line-through">
            ${pkg.originalPrice}
          </span>
          <span className="text-[13px] text-charcoal-light">/ session</span>
        </div>

        <p className="text-[13px] text-gold mb-5">
          Buy {pkg.sessions}, get {pkg.bonus} free
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleClick}
          className={cn(
            "w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium text-cream transition-all duration-300",
            isInCart ? "bg-gold" : "bg-charcoal hover:bg-gold"
          )}
        >
          {isInCart ? "Added ✓" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}