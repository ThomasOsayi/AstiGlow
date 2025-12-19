import { Navbar, Footer } from "@/components/layout";
import { TestimonialCarousel } from "@/components/ui";
import {
  Hero,
  ServicesPreview,
  AboutPreview,
  CTASection,
} from "@/components/sections";
import { reviews } from "@/lib/data";

// Select 3 testimonials for the carousel
const homeTestimonials = reviews.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Preview */}
        <ServicesPreview />

        {/* About Preview */}
        <AboutPreview />

        {/* Testimonials Carousel */}
        <TestimonialCarousel testimonials={homeTestimonials} />

        {/* Final CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}