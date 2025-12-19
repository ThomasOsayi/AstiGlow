"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Button, ReviewCard } from "@/components/ui";
import { reviews, businessInfo } from "@/lib/data";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "5.0", label: "Star Rating" },
  { value: "11", label: "Verified Reviews" },
];

const hoursData = [
  { day: "Monday", hours: "9:00 AM – 8:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
  { day: "Friday", hours: "9:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
];

export default function AboutPage() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section - Image Left, Content Right */}
        <section className="pt-32 grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] items-center">
          {/* Image Side */}
          <div className="relative h-[500px] lg:h-full lg:min-h-[600px] order-2 lg:order-1">
            <div
              className="absolute top-8 lg:top-16 left-6 lg:left-20 right-6 lg:right-10 bottom-8 lg:bottom-16"
              style={{ backgroundColor: "#EDE5DC" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800&q=80"
                alt="Aster Ambaw - Founder of Astiglow"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative Element */}
            <div
              className="absolute bottom-4 lg:bottom-10 left-4 lg:left-16 w-24 lg:w-32 h-24 lg:h-32 z-10 hidden md:block"
              style={{ border: "1px solid #C4A484" }}
            />
          </div>

          {/* Content Side */}
          <div className="px-6 py-12 lg:px-16 lg:py-20 order-1 lg:order-2">
            <p
              className="text-xs tracking-[0.2em] uppercase font-medium mb-5"
              style={{ color: "#C4A484" }}
            >
              Meet Your Esthetician
            </p>

            <h1 className="font-display text-5xl md:text-6xl font-normal text-charcoal mb-8 leading-tight">
              Hi, I'm <span className="italic">Aster</span>
              <span style={{ color: "#C4A484" }}>_</span>
            </h1>

            <div className="space-y-6 mb-10">
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6B6560" }}
              >
                Welcome to Astiglow! With over four years of experience in the
                waxing industry, I've dedicated my career to helping clients
                feel confident and comfortable in their own skin.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#6B6560" }}
              >
                At Astiglow, I specialize in using high-quality hard wax that's
                gentle on the skin and perfect for even the most sensitive
                areas. My goal is to create a clean, welcoming, and relaxing
                space where every client leaves feeling smooth, refreshed, and
                glowing.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#6B6560" }}
              >
                Waxing isn't just a service to me — it's about self-care,
                confidence, and trust. I pride myself on attention to detail,
                hygiene, and making each appointment a positive experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button>Book With Me</Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary">View Services</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index}>
                <p
                  className="font-display text-5xl font-normal mb-2"
                  style={{ color: "#2D2A26" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: "#6B6560" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Info Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-cream">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
            {/* Hours Card */}
            <div
              className="bg-white p-8 lg:p-12"
              style={{ border: "1px solid #E5DED6" }}
            >
              {/* Accent line */}
              <div
                className="w-10 h-0.5 mb-6"
                style={{ backgroundColor: "#C4A484" }}
              />

              <h2 className="font-display text-3xl font-normal text-charcoal mb-8">
                Business Hours<span style={{ color: "#C4A484" }}>_</span>
              </h2>

              <div className="space-y-4">
                {hoursData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between pb-4"
                    style={{
                      borderBottom:
                        index < hoursData.length - 1
                          ? "1px solid #E5DED6"
                          : "none",
                    }}
                  >
                    <span
                      className="text-[15px]"
                      style={{ color: "#2D2A26" }}
                    >
                      {item.day}
                    </span>
                    <span
                      className="text-[15px]"
                      style={{ color: "#6B6560" }}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Policy Column */}
            <div className="flex flex-col gap-8">
              {/* Location Card */}
              <div
                className="bg-white p-8 lg:p-12 flex-1"
                style={{ border: "1px solid #E5DED6" }}
              >
                {/* Accent line */}
                <div
                  className="w-10 h-0.5 mb-6"
                  style={{ backgroundColor: "#C4A484" }}
                />

                <h2 className="font-display text-3xl font-normal text-charcoal mb-6">
                  Location<span style={{ color: "#C4A484" }}>_</span>
                </h2>

                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "#6B6560" }}
                >
                  {businessInfo.address.street}
                  <br />
                  {businessInfo.address.suite}
                  <br />
                  {businessInfo.address.city}, {businessInfo.address.state}{" "}
                  {businessInfo.address.zip}
                </p>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#C4A484" }}
                >
                  Get Directions →
                </a>
              </div>

              {/* Cancellation Policy */}
              <div className="p-8" style={{ backgroundColor: "#2D2A26" }}>
                <h3
                  className="text-xs tracking-[0.15em] uppercase mb-4"
                  style={{ color: "#C4A484" }}
                >
                  Cancellation Policy
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(250, 246, 243, 0.8)" }}
                >
                  We understand things come up. If you need to cancel or
                  reschedule, please notify us at {businessInfo.phone} as soon
                  as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 max-w-6xl mx-auto">
            <div>
              {/* Accent line */}
              <div
                className="w-10 h-0.5 mb-6"
                style={{ backgroundColor: "#C4A484" }}
              />
              <h2 className="font-display text-4xl font-normal text-charcoal">
                Client Reviews<span style={{ color: "#C4A484" }}>_</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#C4A484", fontSize: "18px" }}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm" style={{ color: "#6B6560" }}>
                5.0 ({reviews.length} reviews)
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
            {displayedReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          {/* Show More Button */}
          {!showAllReviews && reviews.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllReviews(true)}
                className="px-8 py-3.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  color: "#2D2A26",
                  border: "1px solid #2D2A26",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2D2A26";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#2D2A26";
                }}
              >
                Show More Reviews
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-cream text-center">
          <h2 className="font-display text-4xl md:text-5xl font-normal text-charcoal mb-5">
            Ready to experience the{" "}
            <span className="italic">Astiglow</span> difference
            <span style={{ color: "#C4A484" }}>?</span>
          </h2>
          <p
            className="text-base max-w-[500px] mx-auto mb-8"
            style={{ color: "#6B6560" }}
          >
            Book your appointment today and treat yourself to the care you
            deserve.
          </p>
          <Link href="/book">
            <Button size="lg">Book Your Appointment</Button>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}