// src/components/sections/cta-section.tsx

import Link from "next/link";
import { Button } from "@/components/ui";
import { businessInfo } from "@/lib/data/business";

export function CTASection() {
  return (
    <section className="py-20 lg:py-[100px] px-6 md:px-12 lg:px-20 bg-cream text-center relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/15 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="font-display text-4xl md:text-5xl font-normal text-charcoal mb-5">
          Ready to <span className="italic">Glow</span>
          <span className="text-gold">?</span>
        </h2>

        <p className="text-base text-charcoal-light max-w-[450px] mx-auto mb-9">
          Book your appointment today and experience the Astiglow difference.
        </p>

        <Link href="/book">
          <Button size="lg">Book Your Appointment</Button>
        </Link>

        <p className="mt-6 text-[13px] text-charcoal-light">
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