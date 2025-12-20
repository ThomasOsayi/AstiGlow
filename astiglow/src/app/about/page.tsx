"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { reviews, businessInfo } from "@/lib/data";

// ===========================================
// Custom Hook for Scroll Animation
// ===========================================

function useScrollAnimation(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// ===========================================
// Icons
// ===========================================

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const StarIcon = ({ filled = true, size = 16 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
    <circle cx="6.5" cy="16.5" r="2.5"/>
    <circle cx="16.5" cy="16.5" r="2.5"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-gold/20">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);

// ===========================================
// Data
// ===========================================

const stats = [
  { number: "4+", label: "YEARS EXPERIENCE", icon: "calendar" },
  { number: "500+", label: "HAPPY CLIENTS", icon: "heart" },
  { number: "5.0", label: "STAR RATING", icon: "star", showStars: true },
  { number: "11", label: "VERIFIED REVIEWS", icon: "check" },
];

const hoursData = [
  { day: "Monday", hours: "9:00 AM – 8:00 PM", late: true },
  { day: "Tuesday", hours: "9:00 AM – 8:00 PM", late: true },
  { day: "Wednesday", hours: "9:00 AM – 8:00 PM", late: true },
  { day: "Thursday", hours: "9:00 AM – 5:00 PM", late: false },
  { day: "Friday", hours: "9:00 AM – 5:00 PM", late: false },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM", late: false },
  { day: "Sunday", hours: "9:00 AM – 5:00 PM", late: false },
];

// Extended reviews with service tags
const reviewsWithTags = [
  {
    text: "Aster is amazing! I've been seeing her for over three years now. Her new studio is lovely, and despite being a little farther from me now, I'm still willing to make the drive to see her, because nobody can shape my eyebrows as well as she does! She's also so kind and welcoming. I would recommend her to anyone.",
    author: "Lauren",
    date: "12.14.2025",
    rating: 5,
    service: "Eyebrows",
    featured: true,
  },
  {
    text: "I have been going to Aster exclusively for over 5 years and I always receive compliments on my brows. She is professional, attentive, friendly, and makes you feel at ease as soon as you step through her doors. Her salon is always clean. Best waxer on the Westside!",
    author: "Hiroko",
    date: "11.26.2025",
    rating: 5,
    service: "Eyebrows",
  },
  {
    text: "I've been seeing Aster for the last 4 years and I'm thrilled that she is on her own now. Her studio is beyond lovely!!! The ambiance, the smell, the atmosphere and most of all, her. She makes you feel so comfortable on the table and I always walk away with so much more than a fresh wax. Aster is top tier!",
    author: "Alli M",
    date: "11.25.2025",
    rating: 5,
    service: "Brazilian",
  },
  {
    text: "BEST waxing experience I've ever had. She was so gentle, kind, professional, and thorough. I will never be able to go to anyone else.",
    author: "Christina E.",
    date: "11.21.2025",
    rating: 5,
    service: "Brazilian",
  },
  {
    text: "Highly recommended! Aster is the best in the business. Her attention to detail and gentle technique make every visit a great experience.",
    author: "Jordan",
    date: "11.24.2025",
    rating: 5,
    service: "Full Face",
  },
  {
    text: "Finally found my go-to waxer! The studio is so clean and calming, and Aster makes you feel completely comfortable. Worth every penny.",
    author: "Michelle K.",
    date: "11.18.2025",
    rating: 5,
    service: "Brazilian",
  },
];

// ===========================================
// Helper Functions
// ===========================================

function getStatIcon(iconName: string) {
  switch (iconName) {
    case "calendar":
      return <CalendarIcon />;
    case "heart":
      return <HeartIcon />;
    case "star":
      return <StarIcon size={24} />;
    case "check":
      return <CheckCircleIcon />;
    default:
      return null;
  }
}

// ===========================================
// Page Component
// ===========================================

export default function AboutPage() {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Scroll animation refs for each section
  const heroAnimation = useScrollAnimation(0.15);
  const statsAnimation = useScrollAnimation(0.2);
  const hoursLocationAnimation = useScrollAnimation(0.15);
  const reviewsAnimation = useScrollAnimation(0.1);
  const ctaAnimation = useScrollAnimation(0.3);

  const displayedReviews = showAllReviews ? reviewsWithTags : reviewsWithTags.slice(0, 3);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section 
          ref={heroAnimation.ref}
          className="pt-24 sm:pt-28 lg:pt-32 grid grid-cols-1 lg:grid-cols-2 min-h-[auto] lg:min-h-[90vh] items-center"
        >
          {/* Image Side */}
          <div className="relative px-4 sm:px-6 py-8 sm:py-12 lg:py-16 lg:pl-20 lg:pr-10 order-2 lg:order-1">
            <div 
              className={`relative max-w-[400px] sm:max-w-[480px] mx-auto lg:mx-0 transition-all duration-700 ${
                heroAnimation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-10"
              }`}
            >
              {/* Main Photo */}
              <div className="relative aspect-[4/5] rounded-tr-[60px] sm:rounded-tr-[80px] overflow-hidden bg-cream-dark">
                <Image
                  src="/images/aster-portrait.jpeg"
                  alt="Aster Ambaw"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Experience Badge - Adjusted position for mobile */}
              <div 
                className={`absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 w-20 h-20 sm:w-24 sm:h-24 lg:w-[100px] lg:h-[100px] rounded-full bg-gold text-white flex flex-col items-center justify-center shadow-lg transition-all duration-700 delay-300 ${
                  heroAnimation.isVisible 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-75"
                }`}
              >
                <span className="font-display text-2xl sm:text-3xl font-medium leading-none">4+</span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.1em] mt-1">YEARS</span>
              </div>

              {/* Decorative Line - Hidden on mobile/tablet */}
              <div 
                className={`absolute top-1/4 -left-8 h-0.5 bg-gold hidden lg:block transition-all duration-700 delay-200 ${
                  heroAnimation.isVisible 
                    ? "w-16 opacity-100" 
                    : "w-0 opacity-0"
                }`}
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16 lg:pr-20 lg:pl-10 order-1 lg:order-2">
            <p 
              className={`text-[10px] sm:text-xs tracking-[0.2em] text-gold font-medium mb-4 sm:mb-5 transition-all duration-700 ${
                heroAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              MEET YOUR ESTHETICIAN
            </p>

            <h1 
              className={`font-display text-4xl sm:text-5xl md:text-6xl font-normal text-charcoal mb-6 sm:mb-8 leading-tight transition-all duration-700 delay-100 ${
                heroAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              Hi, I'm <span className="italic">Aster</span>
              <span className="text-gold">_</span>
            </h1>

            <div 
              className={`space-y-4 sm:space-y-6 mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
                heroAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
                Welcome to Astiglow! With over four years of experience in the
                waxing industry, I've dedicated my career to helping clients
                feel confident and comfortable in their own skin.
              </p>

              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
                I specialize in using high-quality hard wax that's gentle on the
                skin and perfect for even the most sensitive areas. My goal is
                to create a clean, welcoming, and relaxing space where every
                client leaves feeling smooth, refreshed, and glowing.
              </p>
            </div>

            {/* Signature Quote */}
            <div 
              className={`relative pl-4 sm:pl-6 py-4 sm:py-6 border-l-[3px] border-gold bg-gold/5 mb-6 sm:mb-8 transition-all duration-700 delay-300 ${
                heroAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="hidden sm:block">
                <QuoteIcon />
              </div>
              <p className="font-display text-lg sm:text-xl italic text-charcoal leading-relaxed">
                "Waxing isn't just a service to me — it's about self-care,
                confidence, and trust."
              </p>
            </div>

            <div 
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 delay-400 ${
                heroAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link href="/book" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">Book With Me</Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">View Services</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section 
          ref={statsAnimation.ref} 
          className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center relative transition-all duration-700 ${
                  statsAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: statsAnimation.isVisible ? `${index * 150}ms` : "0ms" }}
              >
                {/* Icon */}
                <div 
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-cream flex items-center justify-center mx-auto mb-3 sm:mb-4 text-gold transition-all duration-700 ${
                    statsAnimation.isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                  style={{ transitionDelay: statsAnimation.isVisible ? `${index * 150 + 100}ms` : "0ms" }}
                >
                  {getStatIcon(stat.icon)}
                </div>

                {/* Number */}
                <p className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal mb-1 sm:mb-2 leading-none">
                  {stat.number}
                </p>

                {/* Stars for rating */}
                {stat.showStars && (
                  <div className="flex justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={12} />
                    ))}
                  </div>
                )}

                {/* Label */}
                <p className="text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] text-charcoal-light">
                  {stat.label}
                </p>

                {/* Vertical Divider - Hidden on mobile */}
                {index < 3 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 sm:h-16 bg-border hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hours & Location Section */}
        <section 
          ref={hoursLocationAnimation.ref}
          className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Hours Card */}
            <div 
              className={`bg-white border border-border p-5 sm:p-8 lg:p-12 transition-all duration-700 ${
                hoursLocationAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Header with Icon */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div 
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold flex items-center justify-center text-white transition-all duration-700 delay-150 ${
                    hoursLocationAnimation.isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                >
                  <ClockIcon />
                </div>
                <h2 className="font-display text-2xl sm:text-[28px] font-medium text-charcoal">
                  Business Hours<span className="text-gold">_</span>
                </h2>
              </div>

              {/* Hours List */}
              <div className="space-y-0">
                {hoursData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 sm:py-4 transition-all duration-500 ${
                      index < hoursData.length - 1 ? "border-b border-border" : ""
                    } ${
                      hoursLocationAnimation.isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: hoursLocationAnimation.isVisible ? `${200 + index * 50}ms` : "0ms" }}
                  >
                    <span className="text-sm sm:text-[15px] text-charcoal flex items-center gap-2">
                      {item.day}
                      {item.late && (
                        <span className="text-[8px] sm:text-[9px] bg-gold text-white px-1 sm:px-1.5 py-0.5 rounded tracking-wider">
                          LATE
                        </span>
                      )}
                    </span>
                    <span className="text-sm sm:text-[15px] text-charcoal-light">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Policy Column */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Location Card */}
              <div 
                className={`bg-white border border-border p-5 sm:p-8 lg:p-12 flex-1 transition-all duration-700 delay-150 ${
                  hoursLocationAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div 
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold flex items-center justify-center text-white transition-all duration-700 delay-300 ${
                      hoursLocationAnimation.isVisible
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                    }`}
                  >
                    <MapPinIcon />
                  </div>
                  <h2 className="font-display text-2xl sm:text-[28px] font-medium text-charcoal">
                    Location<span className="text-gold">_</span>
                  </h2>
                </div>

                {/* Address */}
                <p 
                  className={`text-sm sm:text-base text-charcoal leading-relaxed mb-3 sm:mb-4 transition-all duration-700 delay-350 ${
                    hoursLocationAnimation.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {businessInfo.address.street}
                  <br />
                  {businessInfo.address.suite}
                  <br />
                  {businessInfo.address.city}, {businessInfo.address.state}{" "}
                  {businessInfo.address.zip}
                </p>

                {/* Directions Link */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-[12px] sm:text-[13px] tracking-[0.1em] text-gold font-medium hover:opacity-70 transition-all duration-700 delay-400 min-h-[44px] ${
                    hoursLocationAnimation.isVisible
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  GET DIRECTIONS <ArrowRightIcon />
                </a>

                {/* Map Placeholder */}
                <div 
                  className={`mt-4 sm:mt-5 h-[120px] sm:h-[140px] bg-cream-dark rounded relative overflow-hidden transition-all duration-700 delay-450 ${
                    hoursLocationAnimation.isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-charcoal-light">
                      Westwood, Los Angeles
                    </span>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <div className="absolute w-10 h-10 rounded-full border border-gold opacity-50" />
                    <div className="absolute w-20 h-20 rounded-full border border-gold opacity-30" />
                  </div>
                </div>

                {/* Parking Info */}
                <div 
                  className={`flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 p-2.5 sm:p-3 bg-cream rounded text-charcoal-light transition-all duration-700 delay-500 ${
                    hoursLocationAnimation.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <CarIcon />
                  <span className="text-[12px] sm:text-[13px]">
                    Parking available in building garage
                  </span>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div 
                className={`bg-charcoal p-5 sm:p-8 text-white transition-all duration-700 delay-300 ${
                  hoursLocationAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <h3 className="text-[10px] sm:text-[11px] tracking-[0.15em] text-gold mb-3 sm:mb-4">
                  CANCELLATION POLICY
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-white/80">
                  We understand things come up. If you need to cancel or
                  reschedule, please notify us at{" "}
                  <strong className="text-white">{businessInfo.phone}</strong> at
                  least 24 hours in advance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section 
          ref={reviewsAnimation.ref} 
          className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white"
        >
          {/* Header */}
          <div 
            className={`flex flex-col md:flex-row md:justify-between md:items-end gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-6xl mx-auto transition-all duration-700 ${
              reviewsAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <div 
                className={`w-10 h-0.5 bg-gold mb-4 sm:mb-6 transition-all duration-700 origin-left ${
                  reviewsAnimation.isVisible
                    ? "scale-x-100"
                    : "scale-x-0"
                }`}
              />
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-charcoal">
                Client Reviews<span className="text-gold">_</span>
              </h2>
            </div>

            <div 
              className={`flex items-center gap-3 sm:gap-4 transition-all duration-700 delay-150 ${
                reviewsAnimation.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6"
              }`}
            >
              <div className="flex gap-0.5 sm:gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <span className="text-sm sm:text-[15px] text-charcoal font-medium">5.0</span>
              <span className="text-xs sm:text-sm text-charcoal-light">
                ({reviewsWithTags.length} verified)
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-6xl mx-auto">
            {displayedReviews.map((review, index) => (
              <div
                key={index}
                className={`bg-white border border-border p-5 sm:p-8 transition-all duration-700 hover:shadow-lg hover:border-gold hover:-translate-y-1 active:scale-[0.99] ${
                  review.featured ? "border-l-[3px] border-l-gold" : ""
                } ${
                  reviewsAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: reviewsAnimation.isVisible ? `${200 + index * 100}ms` : "0ms" }}
              >
                {/* Stars + Service Tag Row */}
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <div className="flex gap-0.5 sm:gap-1 text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} size={12} />
                    ))}
                  </div>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.08em] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gold/15 text-gold rounded">
                    {review.service.toUpperCase()}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-[15px] text-charcoal-light leading-relaxed mb-4 sm:mb-6 italic">
                  "{review.text}"
                </p>

                {/* Author + Date */}
                <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-border">
                  <span className="font-display text-base sm:text-lg text-charcoal font-medium">
                    {review.author}
                  </span>
                  <span className="text-[10px] sm:text-xs text-charcoal-light">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {reviewsWithTags.length > 3 && (
            <div 
              className={`text-center transition-all duration-700 delay-500 ${
                reviewsAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {!showAllReviews ? (
                <button
                  onClick={() => setShowAllReviews(true)}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium border border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-white active:bg-charcoal active:text-white transition-all duration-300 min-h-[48px]"
                >
                  Show All {reviewsWithTags.length} Reviews
                </button>
              ) : (
                <button
                  onClick={() => setShowAllReviews(false)}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium border border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-white active:bg-charcoal active:text-white transition-all duration-300 min-h-[48px]"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaAnimation.ref}
          className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-cream text-center relative overflow-hidden"
        >
          {/* Background Pattern - Responsive sizing */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] pointer-events-none transition-all duration-1000 ${
              ctaAnimation.isVisible
                ? "opacity-5 scale-100"
                : "opacity-0 scale-75"
            }`}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#2D2A26" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#2D2A26" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#2D2A26" strokeWidth="1" />
            </svg>
          </div>

          <h2 
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal mb-4 sm:mb-5 relative transition-all duration-700 ${
              ctaAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Ready to experience the{" "}
            <span className="italic">Astiglow</span> difference
            <span className="text-gold">?</span>
          </h2>
          <p 
            className={`text-sm sm:text-base text-charcoal-light max-w-[500px] mx-auto mb-6 sm:mb-8 relative transition-all duration-700 delay-100 ${
              ctaAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Book your appointment today and treat yourself to the care you
            deserve.
          </p>
          <div
            className={`relative inline-block w-full sm:w-auto transition-all duration-700 delay-200 ${
              ctaAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/book" className="block sm:inline-block">
              <Button size="lg" className="w-full sm:w-auto">Book Your Appointment</Button>
            </Link>
          </div>
          <p 
            className={`text-[12px] sm:text-[13px] text-charcoal-light mt-4 sm:mt-5 relative transition-all duration-700 delay-300 ${
              ctaAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            or call{" "}
            <a
              href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
              className="text-gold hover:underline"
            >
              {businessInfo.phone}
            </a>
          </p>
        </section>
      </main>
    </>
  );
}