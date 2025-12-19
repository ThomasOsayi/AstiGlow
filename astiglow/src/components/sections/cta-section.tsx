// src/components/sections/cta-section.tsx

import Link from "next/link";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="py-20 lg:py-[120px] px-6 md:px-12 lg:px-20 bg-cream text-center">
      <h2 className="font-display text-4xl md:text-5xl font-normal text-charcoal mb-6">
        Ready to <span className="italic">Glow</span>
        <span className="text-gold">?</span>
      </h2>

      <p className="text-base text-charcoal-light max-w-[500px] mx-auto mb-10">
        Book your appointment today and experience the Astiglow difference.
      </p>

      <Link href="/book">
        <Button size="lg">Book Your Appointment</Button>
      </Link>
    </section>
  );
}