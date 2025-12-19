// src/components/sections/hero.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, StarFilled } from "@/components/ui";
import { stats } from "@/lib/data";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-[72px] md:pt-[84px]">
      {/* Left Content */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-20 lg:pr-16 py-12 lg:py-16 order-2 lg:order-1">
        {/* Eyebrow */}
        <p
          className={`text-xs tracking-[0.2em] uppercase text-gold font-medium mb-6 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Los Angeles Waxing Studio
        </p>

        {/* Headline */}
        <h1
          className={`font-display text-[44px] md:text-[56px] lg:text-[68px] text-charcoal leading-[1.1] mb-7 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Gentle Care,
          <br />
          <span className="italic">Radiant</span> Results
          <span className="text-gold">_</span>
        </h1>

        {/* Description */}
        <p
          className={`text-base text-charcoal-light leading-[1.8] max-w-[420px] mb-10 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Experience premium hard wax treatments in a clean, serene environment.
          Specializing in gentle techniques for even the most sensitive skin.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Link href="/book">
            <Button>Book Appointment</Button>
          </Link>
          <Link href="/services">
            <Button variant="secondary" rightIcon={<ArrowRight size={14} />}>
              View Services
            </Button>
          </Link>
        </div>

        {/* Trust Indicators - New circular badge design */}
        <div
          className={`flex flex-wrap gap-6 lg:gap-10 pt-8 border-t border-border transition-all duration-700 delay-[400ms] ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <TrustBadge value={stats.yearsExperience} label="Years" sublabel="Experience" />
          <TrustBadge value={stats.happyClients} label="Happy" sublabel="Clients" />
          <TrustBadge value={stats.starRating} label="Star" sublabel="Rating" />
        </div>
      </div>

      {/* Right Image Area */}
      <div className="relative min-h-[400px] lg:min-h-0 order-1 lg:order-2 flex items-center justify-center p-6 lg:p-10">
        {/* Main Image Container */}
        <div className="relative w-full max-w-[520px]">
          {/* Background shape */}
          <div className="absolute top-5 right-[-20px] bottom-[-20px] left-5 bg-cream-dark rounded-bl-[80px]" />

          {/* Main Image */}
          <div className="relative aspect-[4/5] bg-cream-dark rounded-bl-[80px] overflow-hidden">
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

          {/* Floating Review Card */}
          <div
            className={`hidden lg:block absolute bottom-[60px] left-[-60px] bg-white p-6 shadow-[0_20px_60px_rgba(45,42,38,0.12)] max-w-[280px] border-l-[3px] border-gold transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarFilled key={i} size={16} className="text-gold" />
              ))}
            </div>
            <p className="font-display text-[17px] italic text-charcoal leading-[1.5] mb-3">
              "The best waxing experience I've ever had. So gentle and professional."
            </p>
            <p className="text-xs text-charcoal-light tracking-[0.05em]">
              — CHRISTINA E.
            </p>
          </div>

          {/* First Visit Badge */}
          <div
            className={`hidden md:block absolute top-10 right-[-30px] bg-charcoal text-cream px-5 py-4 text-center transition-all duration-700 delay-[400ms] ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p className="text-[10px] tracking-[0.1em] uppercase opacity-70 mb-1">
              First Visit?
            </p>
            <p className="text-sm font-medium">Book a Consult</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================
// Trust Badge Component
// ===========================================

interface TrustBadgeProps {
  value: string | number;
  label: string;
  sublabel: string;
}

function TrustBadge({ value, label, sublabel }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
        <span className="font-display text-lg font-semibold text-gold">
          {value}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-charcoal">{label}</p>
        <p className="text-xs text-charcoal-light">{sublabel}</p>
      </div>
    </div>
  );
}