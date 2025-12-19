// src/components/sections/services-preview.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader, Button } from "@/components/ui";
import { ArrowRight, Gift } from "@/components/ui";

// ===========================================
// Category Icons (inline SVGs for custom designs)
// ===========================================

function FaceIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <ellipse cx="16" cy="14" rx="10" ry="12" />
      <path d="M10 11c1-1 2-1.5 3-1.5s2 .5 3 1.5" />
      <path d="M16 11c1-1 2-1.5 3-1.5s2 .5 3 1.5" />
      <circle cx="11.5" cy="14" r="1.5" fill="currentColor" />
      <circle cx="20.5" cy="14" r="1.5" fill="currentColor" />
      <path d="M13 20c1.5 1 4.5 1 6 0" />
    </svg>
  );
}

function BodyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M16 4v6" />
      <path d="M16 10c-3 0-5 2-5 5v10c0 1.5 1 2 2 2h6c1 0 2-.5 2-2V15c0-3-2-5-5-5z" />
      <path d="M11 12l-4 6" />
      <path d="M21 12l4 6" />
    </svg>
  );
}

function BrazilianIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M16 6l2 4 4.5.5-3.25 3.5.75 4.5L16 16.5l-4 2 .75-4.5L9.5 10.5 14 10l2-4z" />
      <circle cx="16" cy="22" r="4" />
    </svg>
  );
}

// ===========================================
// Service Category Data
// ===========================================

const serviceCategories = [
  {
    name: "Face",
    description: "Brows, lips, chin & full face",
    price: "From $16",
    href: "/services?category=face",
    icon: FaceIcon,
    popular: false,
  },
  {
    name: "Body",
    description: "Arms, legs, underarms & more",
    price: "From $22",
    href: "/services?category=body",
    icon: BodyIcon,
    popular: false,
  },
  {
    name: "Brazilian",
    description: "Gentle hard wax technique",
    price: "From $75",
    href: "/services?category=brazilian",
    icon: BrazilianIcon,
    popular: true,
  },
];

// ===========================================
// Services Preview Section
// ===========================================

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-[100px] px-6 md:px-12 lg:px-20 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-14">
        <div>
          <SectionHeader
            title="Our Services"
            description="Premium hard wax treatments tailored to your needs"
            className="mb-0"
          />
        </div>
        <Link
          href="/services"
          className="text-xs tracking-[0.08em] uppercase text-charcoal hover:text-gold transition-colors inline-flex items-center gap-2 group"
        >
          View All Services
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Service Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {serviceCategories.map((category, index) => {
          const IconComponent = category.icon;
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={index}
              href={category.href}
              className="group bg-white border border-border p-9 relative overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,42,38,0.1)] hover:border-transparent"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute -top-px right-6 bg-gold text-white text-[10px] tracking-[0.08em] uppercase font-medium px-3 py-1.5">
                  Most Booked
                </div>
              )}

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold scale-x-0 transition-transform duration-400 group-hover:scale-x-100" />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  isHovered ? "bg-gold text-white" : "bg-cream text-gold"
                }`}
              >
                <IconComponent />
              </div>

              {/* Content */}
              <h3 className="font-display text-[28px] font-medium text-charcoal mb-2.5">
                {category.name}
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed mb-5">
                {category.description}
              </p>

              {/* Price & View Link */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <p className="text-[13px] tracking-[0.03em] text-gold font-medium">
                  {category.price}
                </p>
                <span
                  className={`text-xs flex items-center gap-1 transition-colors duration-300 ${
                    isHovered ? "text-gold" : "text-charcoal-light"
                  }`}
                >
                  View <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Packages Callout Banner */}
      <div className="bg-cream border border-border p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white flex-shrink-0">
            <Gift size={24} />
          </div>
          {/* Text */}
          <div>
            <p className="text-lg font-medium text-charcoal mb-1">
              Save with Packages
            </p>
            <p className="text-sm text-charcoal-light">
              Buy 9 sessions, get 2 free — save up to 20%
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/packages">
          <Button variant="secondary" rightIcon={<ArrowRight size={14} />}>
            View Packages
          </Button>
        </Link>
      </div>
    </section>
  );
}