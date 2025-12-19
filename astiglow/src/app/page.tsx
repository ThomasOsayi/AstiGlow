// src/app/page.tsx

import {
  Hero,
  ServicesPreview,
  AboutPreview,
  TestimonialsSection,
  CTASection,
  homeTestimonials,
} from "@/components/sections";

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
        autoRotateInterval={6000}
      />

      {/* Final CTA */}
      <CTASection />
    </>
  );
}