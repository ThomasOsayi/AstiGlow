// src/components/sections/hero.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { stats } from "@/lib/data";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20">
      {/* Left Content */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-20 lg:pr-16 py-16 lg:py-20 order-2 lg:order-1">
        <p
          className={`text-xs tracking-[0.2em] uppercase text-gold font-medium mb-6 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Los Angeles Waxing Studio
        </p>

        <h1
          className={`font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1] mb-8 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Gentle Care,
          <br />
          <span className="italic">Radiant</span> Results
          <span className="text-gold">_</span>
        </h1>

        <p
          className={`text-base text-charcoal-light leading-[1.8] max-w-[440px] mb-12 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Experience premium hard wax treatments in a clean, serene environment.
          Specializing in gentle techniques for even the most sensitive skin.
        </p>

        <div
          className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Link href="/book">
            <Button>Book Appointment</Button>
          </Link>
          <Link href="/services">
            <Button variant="secondary">View Services</Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          className={`flex flex-wrap gap-8 lg:gap-12 mt-16 pt-8 border-t border-border transition-all duration-700 delay-[400ms] ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <p className="font-display text-4xl text-charcoal">
              {stats.yearsExperience}
            </p>
            <p className="text-xs tracking-[0.1em] uppercase text-charcoal-light">
              Years Experience
            </p>
          </div>
          <div>
            <p className="font-display text-4xl text-charcoal">
              {stats.happyClients}
            </p>
            <p className="text-xs tracking-[0.1em] uppercase text-charcoal-light">
              Happy Clients
            </p>
          </div>
          <div>
            <p className="font-display text-4xl text-charcoal">
              {stats.starRating}
            </p>
            <p className="text-xs tracking-[0.1em] uppercase text-charcoal-light">
              Star Rating
            </p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative min-h-[400px] lg:min-h-0 order-1 lg:order-2">
        <div className="absolute top-[5%] lg:top-[10%] right-[5%] lg:right-[10%] bottom-[5%] lg:bottom-[10%] left-[5%] lg:left-0 bg-cream-dark rounded-bl-[60px] lg:rounded-bl-[120px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
            alt="Relaxing spa treatment"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Floating Review Badge - Hidden on mobile */}
        <div
          className={`hidden lg:block absolute bottom-[15%] -left-10 bg-white p-6 shadow-[0_20px_60px_rgba(45,42,38,0.1)] border-l-[3px] border-gold max-w-[240px] transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gold text-sm">
                ★
              </span>
            ))}
          </div>
          <p className="font-display text-lg italic text-charcoal mb-2">
            "The best waxing experience I've ever had."
          </p>
          <p className="text-xs text-charcoal-light">— Christina E.</p>
        </div>
      </div>
    </section>
  );
}