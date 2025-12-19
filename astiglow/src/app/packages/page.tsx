"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { PackageCard } from "@/components/ui";
import { packages } from "@/lib/data";
import type { Package } from "@/types";

const faqs = [
  {
    q: "How do package credits work?",
    a: "Once you purchase a package, your credits are automatically applied when you book that service. Simply book as usual through our online system and your session will be deducted from your package.",
  },
  {
    q: "Do package credits expire?",
    a: "Package credits are valid for 12 months from the date of purchase. We recommend booking regularly to get the most out of your package!",
  },
  {
    q: "Can I share my package with someone else?",
    a: "Packages are non-transferable and can only be used by the original purchaser.",
  },
];

export default function PackagesPage() {
  const [cart, setCart] = useState<Package[]>([]);

  const handleAddToCart = (pkg: Package) => {
    setCart([...cart, pkg]);
  };

  const handleRemoveFromCart = (pkgId: string) => {
    setCart(cart.filter((p) => p.id !== pkgId));
  };

  const isInCart = (pkgId: string) => cart.some((p) => p.id === pkgId);

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
            Save More
          </p>

          <h1 className="font-display text-5xl md:text-6xl font-normal text-charcoal mb-5">
            Packages<span style={{ color: "#C4A484" }}>_</span>
          </h1>

          <p className="text-base text-charcoal-light max-w-[560px] mx-auto leading-relaxed">
            Commit to smooth skin all year long. Purchase a package and save up
            to 20% on your favorite services. All packages include 9 sessions +
            2 bonus sessions free.
          </p>
        </section>

        {/* How It Works */}
        <section className="py-10 px-6 md:px-12 lg:px-20 bg-cream">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 max-w-[900px] mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-display text-xl"
                style={{ border: "1px solid #C4A484", color: "#C4A484" }}
              >
                1
              </div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "#2D2A26" }}
              >
                Choose a Package
              </p>
              <p className="text-[13px]" style={{ color: "#6B6560" }}>
                Select the service you want
              </p>
            </div>

            {/* Connector */}
            <div
              className="hidden md:block w-16 h-px"
              style={{ backgroundColor: "#E5DED6" }}
            />

            {/* Step 2 */}
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-display text-xl"
                style={{ border: "1px solid #C4A484", color: "#C4A484" }}
              >
                2
              </div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "#2D2A26" }}
              >
                Purchase & Save
              </p>
              <p className="text-[13px]" style={{ color: "#6B6560" }}>
                Get 11 sessions for the price of 9
              </p>
            </div>

            {/* Connector */}
            <div
              className="hidden md:block w-16 h-px"
              style={{ backgroundColor: "#E5DED6" }}
            />

            {/* Step 3 */}
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-display text-xl"
                style={{ border: "1px solid #C4A484", color: "#C4A484" }}
              >
                3
              </div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "#2D2A26" }}
              >
                Book as Usual
              </p>
              <p className="text-[13px]" style={{ color: "#6B6560" }}>
                Credits apply automatically
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-10 pb-24 px-6 md:px-12 lg:px-20 bg-cream">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isInCart={isInCart(pkg.id)}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        </section>

        {/* Payment Options */}
        <section className="py-16 px-6 md:px-12 lg:px-20 bg-white text-center">
          <p
            className="text-xs tracking-[0.15em] uppercase mb-6"
            style={{ color: "#6B6560" }}
          >
            Flexible Payment Options
          </p>

          <div className="flex justify-center items-center gap-12 flex-wrap">
            <div
              className="px-8 py-4 rounded"
              style={{ backgroundColor: "#FAF6F3" }}
            >
              <span
                className="font-semibold text-lg"
                style={{ color: "#2D2A26" }}
              >
                Klarna
              </span>
            </div>
            <div
              className="px-8 py-4 rounded"
              style={{ backgroundColor: "#FAF6F3" }}
            >
              <span
                className="font-semibold text-lg"
                style={{ color: "#2D2A26" }}
              >
                Affirm
              </span>
            </div>
            <div
              className="px-8 py-4 rounded"
              style={{ backgroundColor: "#FAF6F3" }}
            >
              <span
                className="font-semibold text-lg"
                style={{ color: "#2D2A26" }}
              >
                Afterpay
              </span>
            </div>
          </div>

          <p className="text-sm mt-6" style={{ color: "#6B6560" }}>
            Buy now, pay later — available for bookings $50 and up
          </p>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-cream">
          <div className="max-w-[700px] mx-auto">
            {/* Accent line */}
            <div
              className="w-10 h-0.5 mb-6"
              style={{ backgroundColor: "#C4A484" }}
            />

            <h2 className="font-display text-4xl font-normal text-charcoal mb-12">
              Questions<span style={{ color: "#C4A484" }}>?</span>
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="pb-6"
                  style={{
                    borderBottom:
                      index < faqs.length - 1
                        ? "1px solid #E5DED6"
                        : "none",
                  }}
                >
                  <h4
                    className="text-base font-medium mb-3"
                    style={{ color: "#2D2A26" }}
                  >
                    {faq.q}
                  </h4>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: "#6B6560" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}