// src/components/sections/testimonials.tsx

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { StarFilled } from "@/components/ui";
import { cn } from "@/lib/utils";

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
// Types
// ===========================================

interface Testimonial {
  text: string;
  author: string;
  rating: number;
  service?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  /** Auto-rotate interval in ms (default: 6000) */
  autoRotateInterval?: number;
}

// ===========================================
// Testimonials Section Component
// ===========================================

export function TestimonialsSection({
  testimonials,
  autoRotateInterval = 6000,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionAnimation = useScrollAnimation(0.2);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-rotate effect
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(goToNext, autoRotateInterval);
    return () => clearInterval(interval);
  }, [isPaused, autoRotateInterval, goToNext, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section
      ref={sectionAnimation.ref}
      className="py-20 lg:py-[100px] px-6 md:px-12 lg:px-20 bg-charcoal text-cream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Accent Line */}
          <div 
            className={`w-10 h-0.5 bg-gold mx-auto mb-6 transition-all duration-700 origin-center ${
              sectionAnimation.isVisible 
                ? "scale-x-100 opacity-100" 
                : "scale-x-0 opacity-0"
            }`}
          />
          
          {/* Heading */}
          <h2 
            className={`font-display text-4xl lg:text-[42px] font-normal text-cream transition-all duration-700 delay-100 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Client Love<span className="text-gold">_</span>
          </h2>
        </div>

        {/* Testimonial Container */}
        <div 
          className={`relative min-h-[280px] flex flex-col items-center justify-center transition-all duration-700 delay-200 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "text-center max-w-[700px] transition-all duration-600",
                activeIndex === index
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 translate-y-5 absolute pointer-events-none"
              )}
              aria-hidden={activeIndex !== index}
            >
              {/* Stars */}
              <div className="flex gap-1 justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarFilled key={i} size={18} className="text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-[24px] lg:text-[26px] font-light italic leading-[1.6] mb-7 text-cream">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-[13px] tracking-[0.15em] text-gold mb-1">
                  — {testimonial.author.toUpperCase()}
                </p>
                {testimonial.service && (
                  <p className="text-xs text-cream/50">{testimonial.service}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div 
          className={`flex gap-3 justify-center mt-10 transition-all duration-700 delay-300 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-3 rounded-full transition-all duration-400",
                activeIndex === index
                  ? "w-10 bg-gold"
                  : "w-3 bg-cream/20 hover:bg-cream/40"
              )}
              aria-label={`View testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        {/* 5-Star Rated */}
        <p 
          className={`text-center mt-8 text-[13px] text-cream/40 tracking-[0.08em] uppercase transition-all duration-700 delay-400 ${
            sectionAnimation.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
        >
          5-Star Rated on Google
        </p>
      </div>
    </section>
  );
}

// ===========================================
// Default testimonials data for home page
// ===========================================

export const homeTestimonials: Testimonial[] = [
  {
    text: "Aster is amazing! Her new studio is lovely, and nobody can shape my eyebrows as well as she does. She's so kind and welcoming.",
    author: "Lauren",
    rating: 5,
    service: "Eyebrow Wax",
  },
  {
    text: "Best waxing experience I've ever had. She was so gentle, kind, professional, and thorough. I will never go to anyone else.",
    author: "Christina",
    rating: 5,
    service: "Brazilian",
  },
  {
    text: "I've been seeing Aster for 4 years. The ambiance, the atmosphere — Aster is top tier! Her studio is beyond lovely.",
    author: "Alli M",
    rating: 5,
    service: "Full Face",
  },
];