// src/components/sections/about-preview.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, SectionHeader } from "@/components/ui";
import { ArrowRight } from "@/components/ui";

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

export function AboutPreview() {
  const sectionAnimation = useScrollAnimation(0.15);

  return (
    <section 
      ref={sectionAnimation.ref}
      className="py-16 md:py-20 lg:py-[100px] px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
        {/* Image Side */}
        <div className="relative">
          {/* Main Image */}
          <div 
            className={`w-full lg:w-[85%] aspect-[4/5] bg-cream-dark rounded-tr-[40px] sm:rounded-tr-[60px] lg:rounded-tr-[80px] overflow-hidden relative transition-all duration-700 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="/images/aster-portrait.jpeg"
              alt="Aster Ambaw"
              fill
              className="object-cover"
            />
          </div>

          {/* Experience Badge - Repositioned for mobile */}
          <div 
            className={`absolute bottom-6 right-4 sm:bottom-10 sm:right-0 lg:right-auto lg:bottom-10 lg:left-[75%] bg-white p-4 sm:p-6 shadow-[0_10px_40px_rgba(45,42,38,0.1)] text-center transition-all duration-700 delay-300 ${
              sectionAnimation.isVisible 
                ? "opacity-100 scale-100 translate-y-0" 
                : "opacity-0 scale-90 translate-y-5"
            }`}
          >
            <p className="font-display text-3xl sm:text-4xl font-medium text-gold leading-none">
              4+
            </p>
            <p className="text-[10px] sm:text-[11px] tracking-[0.1em] text-charcoal-light mt-1 uppercase">
              Years
            </p>
          </div>

          {/* Decorative line */}
          <div 
            className={`absolute top-1/3 -left-6 h-0.5 bg-gold hidden lg:block transition-all duration-700 delay-200 origin-right ${
              sectionAnimation.isVisible 
                ? "w-12 opacity-100" 
                : "w-0 opacity-0"
            }`}
          />
        </div>

        {/* Content Side */}
        <div className="lg:pl-4">
          <div
            className={`transition-all duration-700 delay-100 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
          >
            <SectionHeader title="Meet Aster" className="mb-5 sm:mb-7" />
          </div>

          <p 
            className={`text-sm sm:text-base text-charcoal-light leading-[1.8] sm:leading-[1.9] mb-4 sm:mb-5 transition-all duration-700 delay-200 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Hi, I'm Aster, the founder of Astiglow. With over four years of
            experience in the waxing industry, I've dedicated my career to helping
            clients feel confident and comfortable in their own skin.
          </p>

          <p 
            className={`text-sm sm:text-base text-charcoal-light leading-[1.8] sm:leading-[1.9] mb-6 sm:mb-8 transition-all duration-700 delay-300 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            I specialize in using high-quality hard wax that's gentle on the skin
            and perfect for even the most sensitive areas. My goal is to create a
            clean, welcoming space where every client leaves feeling smooth and
            glowing.
          </p>

          {/* Signature Quote - Responsive sizing */}
          <blockquote 
            className={`font-display text-xl sm:text-2xl italic text-gold pl-4 sm:pl-5 border-l-2 border-gold mb-6 sm:mb-8 leading-relaxed transition-all duration-700 delay-400 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-6"
            }`}
          >
            "Waxing isn't just a service — it's about self-care, confidence, and
            trust."
          </blockquote>

          <div
            className={`transition-all duration-700 delay-500 ${
              sectionAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/about" className="inline-block">
              <Button variant="secondary" rightIcon={<ArrowRight size={14} />}>
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}