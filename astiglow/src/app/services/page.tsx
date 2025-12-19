"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { SectionHeader, ServiceCard } from "@/components/ui";
import { services } from "@/lib/data";
import type { Service, ServiceCategory } from "@/types";

const categories = [
  { id: "all", label: "All Services" },
  { id: "face", label: "Face" },
  { id: "body", label: "Body" },
  { id: "brazilian", label: "Brazilian & Bikini" },
] as const;

type CategoryFilter = "all" | ServiceCategory;

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const handleServiceSelect = (service: Service) => {
    // TODO: Navigate to booking with service pre-selected
    console.log("Selected service:", service);
  };

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-36 pb-16 text-center px-6 md:px-12 lg:px-20 bg-cream">
          <p
            className="text-xs tracking-[0.2em] uppercase font-medium mb-5"
            style={{ color: "#C4A484" }}
          >
            Our Offerings
          </p>

          <h1 className="font-display text-5xl md:text-6xl font-normal text-charcoal mb-5">
            Services<span style={{ color: "#C4A484" }}>_</span>
          </h1>

          <p className="text-base text-charcoal-light max-w-[500px] mx-auto leading-relaxed">
            Premium hard wax treatments tailored to your needs. Gentle on
            sensitive skin, with long-lasting results.
          </p>
        </section>

        {/* Category Filter */}
        <section className="px-6 md:px-12 lg:px-20 pb-10 bg-cream">
          <div className="flex justify-center gap-2 border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className="relative px-6 py-3 text-[13px] tracking-[0.08em] uppercase transition-colors duration-300"
                style={{
                  color:
                    activeCategory === cat.id ? "#2D2A26" : "#6B6560",
                  fontWeight: activeCategory === cat.id ? 500 : 400,
                }}
              >
                {cat.label}
                {/* Active indicator line */}
                {activeCategory === cat.id && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5"
                    style={{ backgroundColor: "#C4A484" }}
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 md:px-12 lg:px-20 py-10 pb-24 bg-cream">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
              />
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <section
          className="py-16 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "#2D2A26" }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-20 text-center">
            <div>
              <p className="font-display text-2xl md:text-[28px] text-white mb-2">
                Premium Hard Wax
              </p>
              <p
                className="text-[13px] tracking-[0.1em] uppercase"
                style={{ color: "#C4A484" }}
              >
                Gentle on Sensitive Skin
              </p>
            </div>

            <div
              className="hidden md:block w-px h-12"
              style={{ backgroundColor: "rgba(250, 246, 243, 0.2)" }}
            />

            <div>
              <p className="font-display text-2xl md:text-[28px] text-white mb-2">
                Klarna & Afterpay
              </p>
              <p
                className="text-[13px] tracking-[0.1em] uppercase"
                style={{ color: "#C4A484" }}
              >
                Buy Now, Pay Later
              </p>
            </div>

            <div
              className="hidden md:block w-px h-12"
              style={{ backgroundColor: "rgba(250, 246, 243, 0.2)" }}
            />

            <div>
              <p className="font-display text-2xl md:text-[28px] text-white mb-2">
                Clean & Serene
              </p>
              <p
                className="text-[13px] tracking-[0.1em] uppercase"
                style={{ color: "#C4A484" }}
              >
                Relaxing Studio Environment
              </p>
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-cream">
          <div className="max-w-[600px] mx-auto text-center p-12 bg-white border border-border">
            <h3 className="font-display text-[28px] text-charcoal mb-4">
              Not sure what you need<span style={{ color: "#C4A484" }}>?</span>
            </h3>
            <p className="text-[15px] text-charcoal-light leading-relaxed mb-6">
              First time getting waxed or not sure which service is right for
              you? Feel free to reach out — I'm happy to help guide you.
            </p>
            <button
              className="px-8 py-3.5 text-xs tracking-[0.1em] uppercase font-medium border transition-colors duration-300 hover:bg-charcoal hover:text-white"
              style={{
                borderColor: "#2D2A26",
                color: "#2D2A26",
              }}
            >
              Contact Aster
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}