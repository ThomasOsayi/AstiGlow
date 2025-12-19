"use client";

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
      className="bg-white p-10 flex flex-col relative transition-all duration-300 hover:-translate-y-1"
      style={{
        border: "1px solid #E5DED6",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#C4A484";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(45, 42, 38, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5DED6";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Best Value Badge */}
      {pkg.popular && (
        <div
          className="absolute -top-px right-8 text-[10px] tracking-[0.1em] uppercase px-4 py-2 font-medium"
          style={{ backgroundColor: "#C4A484", color: "#FFFFFF" }}
        >
          Best Value
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3
          className="font-display text-[28px] font-medium mb-2"
          style={{ color: "#2D2A26" }}
        >
          {pkg.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#6B6560" }}
        >
          {pkg.description}
        </p>

        {/* Savings Badge */}
        <div className="mb-6">
          <span
            className="inline-block text-[11px] tracking-[0.05em] uppercase px-3 py-1.5 font-medium"
            style={{
              backgroundColor: "rgba(196, 164, 132, 0.15)",
              color: "#C4A484",
            }}
          >
            Save ${pkg.savings}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div
        className="pt-6"
        style={{ borderTop: "1px solid #E5DED6" }}
      >
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="font-display text-[32px] font-medium"
            style={{ color: "#2D2A26" }}
          >
            ${pkg.packagePrice}
          </span>
          <span
            className="text-sm line-through"
            style={{ color: "#6B6560" }}
          >
            ${pkg.originalPrice}
          </span>
          <span className="text-[13px]" style={{ color: "#6B6560" }}>
            / session
          </span>
        </div>

        <p className="text-[13px] mb-5" style={{ color: "#C4A484" }}>
          Buy {pkg.sessions}, get {pkg.bonus} free
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleClick}
          className="w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
          style={{
            backgroundColor: isInCart ? "#C4A484" : "#2D2A26",
            color: "#FFFFFF",
            border: "none",
          }}
          onMouseEnter={(e) => {
            if (!isInCart) {
              e.currentTarget.style.backgroundColor = "#C4A484";
            }
          }}
          onMouseLeave={(e) => {
            if (!isInCart) {
              e.currentTarget.style.backgroundColor = "#2D2A26";
            }
          }}
        >
          {isInCart ? "Added ✓" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}