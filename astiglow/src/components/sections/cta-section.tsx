// src/components/sections/cta-section.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { businessInfo } from "@/lib/data/business";

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

export function CTASection() {
  const sectionAnimation = useScrollAnimation(0.25);

  return (
    <section 
      ref={sectionAnimation.ref}
      className="py-20 lg:py-[100px] px-6 md:px-12 lg:px-20 bg-cream text-center relative overflow-hidden"
    >
      {/* Decorative Background Circles */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none transition-all duration-1000 ${
          sectionAnimation.isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-50"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/15 pointer-events-none transition-all duration-1000 delay-100 ${
          sectionAnimation.isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-50"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-gold/10 pointer-events-none transition-all duration-1000 delay-200 ${
          sectionAnimation.isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-50"
        }`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <h2 
          className={`font-display text-4xl md:text-5xl font-normal text-charcoal mb-5 transition-all duration-700 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          Ready to <span className="italic">Glow</span>
          <span className="text-gold">?</span>
        </h2>

        <p 
          className={`text-base text-charcoal-light max-w-[450px] mx-auto mb-9 transition-all duration-700 delay-100 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-6"
          }`}
        >
          Book your appointment today and experience the Astiglow difference.
        </p>

        <div
          className={`transition-all duration-700 delay-200 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-6"
          }`}
        >
          <Link href="/book">
            <Button size="lg">Book Your Appointment</Button>
          </Link>
        </div>

        <p 
          className={`mt-6 text-[13px] text-charcoal-light transition-all duration-700 delay-300 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
        >
          Or call us at{" "}
          <a
            href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
            className="text-gold hover:underline transition-colors"
          >
            {businessInfo.phone}
          </a>
        </p>
      </div>
    </section>
  );
}