"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Review } from "@/types";

interface TestimonialCarouselProps {
  testimonials: Review[];
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, autoPlayInterval]);

  return (
    <section
      className={cn(
        "py-20 lg:py-[120px] px-6 md:px-10 lg:px-20 bg-charcoal text-cream text-center",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Accent Line */}
      <div className="w-10 h-0.5 bg-gold mx-auto mb-6" />

      {/* Title */}
      <h2 className="font-display text-display-md font-normal mb-16">
        Client Love<span className="text-gold">_</span>
      </h2>

      {/* Testimonials */}
      <div className="max-w-[700px] mx-auto min-h-[180px] relative">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              activeIndex === index
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {/* Stars */}
            <div className="flex gap-1 justify-center mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-gold text-lg">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-display text-[28px] font-light italic leading-[1.6] mb-6">
              "{testimonial.text}"
            </p>

            {/* Author */}
            <p className="text-xs tracking-[0.15em] text-gold uppercase">
              — {testimonial.author}
            </p>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2 justify-center mt-12">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              activeIndex === index
                ? "w-8 bg-gold"
                : "w-2 bg-cream/30 hover:bg-cream/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}