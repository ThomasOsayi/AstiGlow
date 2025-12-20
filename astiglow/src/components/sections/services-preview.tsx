// src/components/sections/services-preview.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SectionHeader, Button } from "@/components/ui";
import { ArrowRight, Gift } from "@/components/ui";

// ===========================================
// Custom Hook for Scroll Animation
// ===========================================

function useScrollAnimation(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// ===========================================
// Category Icons (inline SVGs for custom designs)
// ===========================================

function FaceIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
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
      width="28"
      height="28"
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
      width="28"
      height="28"
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
  const sectionAnimation = useScrollAnimation(0.15);
  const cardsAnimation = useScrollAnimation(0.1);
  const bannerAnimation = useScrollAnimation(0.3);

  return (
    <section className="py-16 md:py-20 lg:py-[100px] px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
      {/* Header */}
      <div 
        ref={sectionAnimation.ref}
        className={`flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-6 mb-10 md:mb-14 transition-all duration-700 ${
          sectionAnimation.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <SectionHeader
            title="Our Services"
            description="Premium hard wax treatments tailored to your needs"
            className="mb-0"
          />
        </div>
        <Link
          href="/services"
          className={`text-xs tracking-[0.08em] uppercase text-charcoal hover:text-gold transition-all inline-flex items-center gap-2 group duration-700 delay-200 self-start sm:self-auto ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-6"
          }`}
        >
          View All Services
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Service Category Cards */}
      <div 
        ref={cardsAnimation.ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
      >
        {serviceCategories.map((category, index) => {
          const IconComponent = category.icon;
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={index}
              href={category.href}
              className={`group bg-white border border-border p-6 sm:p-7 md:p-9 relative overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,42,38,0.1)] hover:border-transparent ${
                cardsAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: cardsAnimation.isVisible ? `${index * 100}ms` : "0ms" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute -top-px right-4 sm:right-6 bg-gold text-white text-[9px] sm:text-[10px] tracking-[0.08em] uppercase font-medium px-2 sm:px-3 py-1 sm:py-1.5">
                  Most Booked
                </div>
              )}

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold scale-x-0 transition-transform duration-400 group-hover:scale-x-100" />

              {/* Icon */}
              <div
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 ${
                  isHovered ? "bg-gold text-white" : "bg-cream text-gold"
                }`}
              >
                <IconComponent />
              </div>

              {/* Content */}
              <h3 className="font-display text-[22px] sm:text-[26px] md:text-[28px] font-medium text-charcoal mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed mb-4 sm:mb-5">
                {category.description}
              </p>

              {/* Price & View Link */}
              <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-border">
                <p className="text-xs sm:text-[13px] tracking-[0.03em] text-gold font-medium">
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
      <div 
        ref={bannerAnimation.ref}
        className={`bg-cream border border-border p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 transition-all duration-700 ${
          bannerAnimation.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10"
        }`}
      >
        <div 
          className={`flex items-center gap-4 sm:gap-5 transition-all duration-700 delay-100 ${
            bannerAnimation.isVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-6"
          }`}
        >
          {/* Icon */}
          <div 
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold flex items-center justify-center text-white flex-shrink-0 transition-all duration-700 delay-150 ${
              bannerAnimation.isVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-75"
            }`}
          >
            <Gift size={20} className="sm:w-6 sm:h-6" />
          </div>
          {/* Text */}
          <div>
            <p className="text-base sm:text-lg font-medium text-charcoal mb-0.5 sm:mb-1">
              Save with Packages
            </p>
            <p className="text-xs sm:text-sm text-charcoal-light">
              Buy 9 sessions, get 2 free — save up to 20%
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`w-full sm:w-auto transition-all duration-700 delay-200 ${
            bannerAnimation.isVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-6"
          }`}
        >
          <Link href="/packages" className="block">
            <Button variant="secondary" rightIcon={<ArrowRight size={14} />} className="w-full sm:w-auto">
              View Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}