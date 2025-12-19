// src/app/page.tsx

import {
  Hero,
  ServicesPreview,
  AboutPreview,
  TestimonialsSection,
  CTASection,
  homeTestimonials,
} from "@/components/sections";
import { stats } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Preview */}
      <ServicesPreview />

      {/* About Preview */}
      <AboutPreview />

      {/* Testimonials Carousel */}
      <TestimonialsSection
        testimonials={homeTestimonials}
        totalReviews={stats.verifiedReviews || 11}
        autoRotateInterval={6000}
      />

      {/* Final CTA */}
      <CTASection />
    </>
  );
}