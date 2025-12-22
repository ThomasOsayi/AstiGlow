// src/app/(main)/book/page.tsx
// Updated with Cal.com integration

"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { services } from "@/lib/data";
import type { Service } from "@/types";

const categories = [
  { id: "all", label: "All" },
  { id: "face", label: "Face" },
  { id: "body", label: "Body" },
  { id: "brazilian", label: "Brazilian" },
];

// Icons
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// Map service IDs to Cal.com event type slugs
// These should match the slugs created in Cal.com
const getCalSlug = (serviceId: string): string => {
  // The slug format we used when creating event types
  return serviceId; // e.g., "eyebrow", "brazilian", "full-face"
};

// Main booking content component
function BookingContent() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#C4A484" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  // Handle pre-selected service from URL parameter
  useEffect(() => {
    if (hasInitialized) return;
    
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        setActiveCategory(service.category);
        setShowCalendar(true);
      }
    }
    setHasInitialized(true);
  }, [searchParams, hasInitialized]);

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === "all") {
      return services;
    }
    return services.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowCalendar(true);
  };

  const handleBackToServices = () => {
    setShowCalendar(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.05s; opacity: 0; }
        .stagger-2 { animation-delay: 0.1s; opacity: 0; }
        .stagger-3 { animation-delay: 0.15s; opacity: 0; }
        .stagger-4 { animation-delay: 0.2s; opacity: 0; }
        .stagger-5 { animation-delay: 0.25s; opacity: 0; }
        .stagger-6 { animation-delay: 0.3s; opacity: 0; }
        .stagger-7 { animation-delay: 0.35s; opacity: 0; }
        .stagger-8 { animation-delay: 0.4s; opacity: 0; }
        .stagger-9 { animation-delay: 0.45s; opacity: 0; }
        .stagger-10 { animation-delay: 0.5s; opacity: 0; }

        /* Hide scrollbar for category tabs */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Cal.com embed customizations */
        :root {
          --cal-brand-color: #C4A484;
        }
      `}</style>

      {/* Header */}
      <header
        className="px-4 sm:px-6 md:px-16 py-4 sm:py-5 flex justify-between items-center bg-white animate-fade-in"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <Link
          href="/"
          className="font-display text-2xl sm:text-[28px] font-medium tracking-wide"
          style={{ color: "#2D2A26" }}
        >
          Astiglow<span style={{ color: "#C4A484" }}>_</span>
        </Link>

        <Link
          href="/"
          className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors hover:opacity-70 active:opacity-70"
          style={{ color: "#6B6560" }}
        >
          ← <span className="hidden sm:inline">Back to website</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </header>

      {/* Progress Indicator */}
      <div
        className="px-4 sm:px-6 md:px-16 py-5 sm:py-8 bg-white animate-fade-in-up stagger-1"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <div className="max-w-[500px] mx-auto flex justify-between items-center relative">
          {/* Progress Line */}
          <div
            className="absolute top-[14px] sm:top-[18px] left-[50px] right-[50px] h-0.5 z-0"
            style={{ backgroundColor: "#E5DED6" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: showCalendar ? "100%" : "0%",
                backgroundColor: "#C4A484",
              }}
            />
          </div>

          {/* Step 1: Service */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2.5 z-10">
            <div
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: "#C4A484",
                border: "2px solid #C4A484",
                color: "#FFFFFF",
              }}
            >
              {showCalendar ? <CheckIcon /> : "1"}
            </div>
            <span
              className="text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-center"
              style={{ color: "#2D2A26", fontWeight: 500 }}
            >
              Service
            </span>
          </div>

          {/* Step 2: Schedule */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2.5 z-10">
            <div
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: showCalendar ? "#C4A484" : "#FFFFFF",
                border: `2px solid ${showCalendar ? "#C4A484" : "#E5DED6"}`,
                color: showCalendar ? "#FFFFFF" : "#6B6560",
              }}
            >
              2
            </div>
            <span
              className="text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-center"
              style={{
                color: showCalendar ? "#2D2A26" : "#A0A0A0",
                fontWeight: showCalendar ? 500 : 400,
              }}
            >
              Schedule
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-180px)]">
        {/* Step 1: Service Selection */}
        {!showCalendar && (
          <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 max-w-4xl mx-auto animate-fade-in">
            <h2
              className="font-display text-2xl sm:text-[32px] font-normal mb-2 animate-fade-in-up"
              style={{ color: "#2D2A26" }}
            >
              Choose Your Service<span style={{ color: "#C4A484" }}>_</span>
            </h2>
            <p
              className="text-xs sm:text-sm mb-5 sm:mb-6 animate-fade-in-up stagger-1"
              style={{ color: "#6B6560" }}
            >
              Select a service to view available appointment times
            </p>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-5 sm:mb-6 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 animate-fade-in-up stagger-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs tracking-[0.08em] uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 min-h-[40px] active:scale-95"
                  style={{
                    backgroundColor:
                      activeCategory === cat.id ? "#2D2A26" : "transparent",
                    border: "1px solid",
                    borderColor:
                      activeCategory === cat.id ? "#2D2A26" : "#E5DED6",
                    color: activeCategory === cat.id ? "#FAFAF8" : "#6B6560",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-2">
              {filteredServices.map((service, idx) => {
                const staggerClass = `stagger-${Math.min(idx + 3, 10)}`;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`p-3 sm:p-4 flex justify-between items-center cursor-pointer transition-all duration-300 relative animate-fade-in-up ${staggerClass} active:scale-[0.99] hover:border-[#C4A484]`}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5DED6",
                    }}
                  >
                    {service.popular && (
                      <div
                        className="absolute -top-px right-3 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[9px] tracking-[0.05em] font-medium uppercase"
                        style={{ backgroundColor: "#C4A484", color: "#FFFFFF" }}
                      >
                        Popular
                      </div>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4">
                      <div>
                        <p
                          className="text-sm sm:text-[15px] font-medium mb-0.5"
                          style={{ color: "#2D2A26" }}
                        >
                          {service.name}
                        </p>
                        <p
                          className="text-[11px] sm:text-xs flex items-center gap-1"
                          style={{ color: "#6B6560" }}
                        >
                          <ClockIcon /> {service.duration} min
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p
                        className="font-display text-lg sm:text-xl"
                        style={{ color: "#2D2A26" }}
                      >
                        ${service.price}
                      </p>
                      <div
                        className="text-xs px-3 py-1.5 transition-colors"
                        style={{
                          backgroundColor: "#2D2A26",
                          color: "#FFFFFF",
                        }}
                      >
                        SELECT
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Cal.com Embed */}
        {showCalendar && selectedService && (
          <div className="animate-fade-in">
            {/* Back Button & Service Info */}
            <div
              className="px-4 sm:px-6 md:px-16 py-4 bg-white"
              style={{ borderBottom: "1px solid #E5DED6" }}
            >
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <button
                  onClick={handleBackToServices}
                  className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
                  style={{ color: "#6B6560" }}
                >
                  <ArrowLeftIcon />
                  <span>Change service</span>
                </button>

                <div className="text-right">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#2D2A26" }}
                  >
                    {selectedService.name}
                  </p>
                  <p className="text-xs" style={{ color: "#6B6560" }}>
                    {selectedService.duration} min · ${selectedService.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Cal.com Inline Embed */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              <Cal
                calLink={`astiglow/${getCalSlug(selectedService.id)}`}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{
                  layout: "month_view",
                  theme: "light",
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <div
        className="px-4 sm:px-6 md:px-16 py-6 bg-white mt-auto"
        style={{ borderTop: "1px solid #E5DED6" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs" style={{ color: "#6B6560" }}>
              <strong style={{ color: "#2D2A26" }}>Location:</strong> 10880
              Wilshire Blvd, Suite 402, Los Angeles, CA 90024
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "#6B6560" }}>
              <strong style={{ color: "#2D2A26" }}>Questions?</strong> Call or
              text{" "}
              <a href="tel:3103097901" style={{ color: "#C4A484" }}>
                (310) 309-7901
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback
function BookingLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="text-center">
        <div
          className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
          style={{
            border: "2px solid #E5DED6",
            borderTopColor: "#C4A484",
          }}
        />
        <p style={{ color: "#6B6560" }}>Loading...</p>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  );
}