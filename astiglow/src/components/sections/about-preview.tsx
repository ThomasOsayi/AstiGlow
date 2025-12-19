// src/components/sections/about-preview.tsx

import Image from "next/image";
import Link from "next/link";
import { Button, SectionHeader } from "@/components/ui";
import { ArrowRight } from "@/components/ui";

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-[100px] px-6 md:px-12 lg:px-20 bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Side */}
        <div className="relative">
          {/* Main Image */}
          <div className="w-full lg:w-[85%] aspect-[4/5] bg-cream-dark rounded-tr-[60px] lg:rounded-tr-[80px] overflow-hidden relative">
            <Image
              src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80"
              alt="Aster Ambaw - Founder of Astiglow"
              fill
              className="object-cover"
            />
            {/* Placeholder indicator - remove when real photo is added */}
            <div className="absolute bottom-5 left-5 bg-charcoal/80 text-cream px-3 py-2 text-[10px] tracking-[0.1em] uppercase">
              Aster's Photo Here
            </div>
          </div>

          {/* Experience Badge */}
          <div className="absolute bottom-10 right-0 lg:right-auto lg:bottom-10 lg:left-[75%] bg-white p-6 shadow-[0_10px_40px_rgba(45,42,38,0.1)] text-center">
            <p className="font-display text-4xl font-medium text-gold leading-none">
              4+
            </p>
            <p className="text-[11px] tracking-[0.1em] text-charcoal-light mt-1 uppercase">
              Years
            </p>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:pl-4">
          <SectionHeader title="Meet Aster" className="mb-7" />

          <p className="text-base text-charcoal-light leading-[1.9] mb-5">
            Hi, I'm Aster, the founder of Astiglow. With over four years of
            experience in the waxing industry, I've dedicated my career to helping
            clients feel confident and comfortable in their own skin.
          </p>

          <p className="text-base text-charcoal-light leading-[1.9] mb-8">
            I specialize in using high-quality hard wax that's gentle on the skin
            and perfect for even the most sensitive areas. My goal is to create a
            clean, welcoming space where every client leaves feeling smooth and
            glowing.
          </p>

          {/* Signature Quote */}
          <blockquote className="font-display text-2xl italic text-gold pl-5 border-l-2 border-gold mb-8 leading-relaxed">
            "Waxing isn't just a service — it's about self-care, confidence, and
            trust."
          </blockquote>

          <Link href="/about">
            <Button variant="secondary" rightIcon={<ArrowRight size={14} />}>
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}