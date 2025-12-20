// src/components/sections/hero.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, StarFilled } from "@/components/ui";
import { stats } from "@/lib/data";

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

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroAnimation = useScrollAnimation(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Combined visibility: initial load AND scroll visibility
  const isActive = isLoaded && heroAnimation.isVisible;

  return (
    <section 
      ref={heroAnimation.ref}
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-[72px] md:pt-[84px]"
    >
      {/* Left Content */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-20 lg:pr-16 py-10 md:py-12 lg:py-16 order-2 lg:order-1">
        {/* Eyebrow */}
        <p
          className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold font-medium mb-4 md:mb-6 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Los Angeles Waxing Studio
        </p>

        {/* Headline - Responsive text sizes */}
        <h1
          className={`font-display text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] text-charcoal leading-[1.1] mb-5 md:mb-7 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: isActive ? "100ms" : "0ms" }}
        >
          Gentle Care,
          <br />
          <span className="italic">Radiant</span> Results
          <span className="text-gold">_</span>
        </h1>

        {/* Description */}
        <p
          className={`text-sm sm:text-base text-charcoal-light leading-[1.8] max-w-[420px] mb-8 md:mb-10 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
        >
          Experience premium hard wax treatments in a clean, serene environment.
          Specializing in gentle techniques for even the most sensitive skin.
        </p>

        {/* CTAs - Stack on smallest screens */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-12 transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: isActive ? "300ms" : "0ms" }}
        >
          <Link href="/book" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Book Appointment</Button>
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="secondary" rightIcon={<ArrowRight size={14} />} className="w-full sm:w-auto">
              View Services
            </Button>
          </Link>
        </div>

        {/* Trust Indicators - Responsive grid */}
        <div
          className={`grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-6 lg:gap-10 pt-6 md:pt-8 border-t border-border transition-all duration-700 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: isActive ? "400ms" : "0ms" }}
        >
          <TrustBadge 
            value={stats.yearsExperience} 
            label="Years" 
            sublabel="Experience" 
            isVisible={isActive}
            delay={450}
          />
          <TrustBadge 
            value={stats.happyClients} 
            label="Happy" 
            sublabel="Clients" 
            isVisible={isActive}
            delay={500}
          />
          <TrustBadge 
            value={stats.starRating} 
            label="Star" 
            sublabel="Rating" 
            isVisible={isActive}
            delay={550}
          />
        </div>
      </div>

      {/* Right Image Area - Constrained to prevent overflow */}
      <div className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-0 order-1 lg:order-2 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden">
        {/* Main Image Container */}
        <div className="relative w-full max-w-[480px] lg:max-w-[520px]">
          {/* Background shape - Adjusted positioning for mobile */}
          <div 
            className={`absolute top-3 sm:top-5 right-0 sm:right-[-10px] lg:right-[-20px] bottom-[-10px] sm:bottom-[-20px] left-3 sm:left-5 bg-cream-dark rounded-bl-[60px] sm:rounded-bl-[80px] transition-all duration-700 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />

          {/* Main Image */}
          <div 
            className={`relative aspect-[4/5] bg-cream-dark rounded-bl-[60px] sm:rounded-bl-[80px] overflow-hidden transition-all duration-700 delay-100 ${
              isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
              alt="Smooth, radiant skin after waxing treatment"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
          </div>

          {/* Floating Review Card - Hidden on mobile, adjusted positioning for tablet */}
          <div
            className={`hidden lg:block absolute bottom-[60px] left-[-40px] xl:left-[-60px] bg-white p-5 xl:p-6 shadow-[0_20px_60px_rgba(45,42,38,0.12)] max-w-[260px] xl:max-w-[280px] border-l-[3px] border-gold transition-all duration-700 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isActive ? "500ms" : "0ms" }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarFilled key={i} size={14} className="text-gold" />
              ))}
            </div>
            <p className="font-display text-[15px] xl:text-[17px] italic text-charcoal leading-[1.5] mb-3">
              "The best waxing experience I've ever had. So gentle and professional."
            </p>
            <p className="text-[11px] text-charcoal-light tracking-[0.05em]">
              — CHRISTINA E.
            </p>
          </div>

          {/* First Visit Badge - Hidden on small mobile */}
          <div
            className={`hidden sm:block absolute top-6 sm:top-10 right-0 sm:right-[-20px] lg:right-[-30px] bg-charcoal text-cream px-4 sm:px-5 py-3 sm:py-4 text-center transition-all duration-700 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
            style={{ transitionDelay: isActive ? "400ms" : "0ms" }}
          >
            <p className="text-[9px] sm:text-[10px] tracking-[0.1em] uppercase opacity-70 mb-1">
              First Visit?
            </p>
            <p className="text-xs sm:text-sm font-medium">Book a Consult</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================
// Trust Badge Component - Mobile optimized
// ===========================================

interface TrustBadgeProps {
  value: string | number;
  label: string;
  sublabel: string;
  isVisible?: boolean;
  delay?: number;
}

function TrustBadge({ value, label, sublabel, isVisible = true, delay = 0 }: TrustBadgeProps) {
  return (
    <div 
      className={`flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 text-center sm:text-left transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      <div 
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{ transitionDelay: isVisible ? `${delay + 50}ms` : "0ms" }}
      >
        <span className="font-display text-base sm:text-lg font-semibold text-gold">
          {value}
        </span>
      </div>
      <div>
        <p className="text-xs sm:text-sm font-medium text-charcoal">{label}</p>
        <p className="text-[10px] sm:text-xs text-charcoal-light">{sublabel}</p>
      </div>
    </div>
  );
}