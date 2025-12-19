// src/components/sections/services-preview.tsx

import Link from "next/link";
import { SectionHeader } from "@/components/ui";

const serviceCategories = [
  {
    name: "Face",
    description: "Brows, lips, chin & full face",
    price: "From $16",
    href: "/services?category=face",
  },
  {
    name: "Body",
    description: "Arms, legs, underarms & more",
    price: "From $22",
    href: "/services?category=body",
  },
  {
    name: "Brazilian",
    description: "Gentle hard wax technique",
    price: "From $75",
    href: "/services?category=brazilian",
  },
  {
    name: "Packages",
    description: "Save with bundled sessions",
    price: "Save 20%",
    href: "/packages",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-20 lg:py-[120px] px-6 md:px-12 lg:px-20 bg-white">
      {/* Header with "View All" link */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-16">
        <SectionHeader title="Services" className="mb-0" />
        <Link
          href="/services"
          className="text-xs tracking-[0.08em] uppercase text-charcoal hover:text-gold transition-colors relative group"
        >
          View All Services →
          <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      {/* Service Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceCategories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className="group bg-white border border-border p-8 lg:p-10 relative overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] hover:border-transparent"
          >
            {/* Bottom accent line on hover */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" />

            <h3 className="font-display text-[28px] font-medium text-charcoal mb-3">
              {category.name}
            </h3>
            <p className="text-sm text-charcoal-light leading-relaxed mb-6">
              {category.description}
            </p>
            <p className="text-[13px] tracking-[0.05em] text-gold font-medium">
              {category.price}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}