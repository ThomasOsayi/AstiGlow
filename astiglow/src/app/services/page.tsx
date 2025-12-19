"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { services, serviceCategories, getServicesByCategory } from "@/lib/data";
import type { Service, ServiceCategory } from "@/types";

// ===========================================
// Icons
// ===========================================
const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const MessageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <path d="M1 10h22" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const WalletIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
  </svg>
);

// Category Icons
const FaceIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <ellipse cx="16" cy="14" rx="10" ry="12" />
    <path d="M10 11c1-1 2-1.5 3-1.5s2 .5 3 1.5" />
    <path d="M16 11c1-1 2-1.5 3-1.5s2 .5 3 1.5" />
    <circle cx="11.5" cy="14" r="1.5" fill="currentColor" />
    <circle cx="20.5" cy="14" r="1.5" fill="currentColor" />
    <path d="M13 20c1.5 1 4.5 1 6 0" />
  </svg>
);

const BodyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M16 4v6" />
    <path d="M16 10c-3 0-5 2-5 5v10c0 1.5 1 2 2 2h6c1 0 2-.5 2-2V15c0-3-2-5-5-5z" />
    <path d="M11 12l-4 6" />
    <path d="M21 12l4 6" />
  </svg>
);

const BrazilianIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M16 6l2 4 4.5.5-3.25 3.5.75 4.5L16 16.5l-4 2 .75-4.5L9.5 10.5 14 10l2-4z" />
    <circle cx="16" cy="22" r="4" />
  </svg>
);

// ===========================================
// Category Info
// ===========================================
const categoryInfo: Record<
  ServiceCategory,
  { title: string; description: string; icon: React.ReactNode }
> = {
  face: {
    title: "Face",
    description: "Precision facial waxing for a polished, glowing look",
    icon: <FaceIcon />,
  },
  body: {
    title: "Body",
    description: "Smooth, long-lasting results from head to toe",
    icon: <BodyIcon />,
  },
  brazilian: {
    title: "Brazilian & Bikini",
    description: "Gentle hard wax technique for sensitive areas",
    icon: <BrazilianIcon />,
  },
};

// ===========================================
// Service Card Component
// ===========================================
interface ServiceCardProps {
  service: Service;
  showCategoryBadge?: boolean;
  onSelect: (service: Service) => void;
}

function ServiceCard({ service, showCategoryBadge = true, onSelect }: ServiceCardProps) {
  const categoryLabels: Record<ServiceCategory, string> = {
    face: "FACE",
    body: "BODY",
    brazilian: "BRAZILIAN",
  };

  return (
    <div className="group relative flex flex-col h-full bg-white border border-border p-7 transition-all duration-400 ease-out cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] hover:border-gold">
      {/* Badges */}
      {service.popular && (
        <div className="absolute -top-px right-5 bg-gold text-white text-[10px] tracking-[0.08em] font-medium px-3 py-1.5">
          POPULAR
        </div>
      )}
      {service.addon && (
        <div className="absolute -top-px right-5 bg-charcoal-light text-white text-[10px] tracking-[0.08em] font-medium px-3 py-1.5">
          ADD-ON
        </div>
      )}

      {/* Card Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-2xl font-medium text-charcoal">
            {service.name}
          </h3>
          {showCategoryBadge && (
            <span className="text-[10px] tracking-[0.05em] text-gold bg-gold/10 px-2 py-1 rounded mt-1">
              {categoryLabels[service.category]}
            </span>
          )}
        </div>

        <p className="text-sm text-charcoal-light leading-relaxed mb-5">
          {service.description}
        </p>
      </div>

      {/* Price & Duration */}
      <div>
        <div className="flex justify-between items-center pt-4 border-t border-border mb-4">
          <span className="font-display text-2xl font-medium text-charcoal">
            ${service.price}
          </span>
          <span className="text-xs text-charcoal-light tracking-[0.05em]">
            {service.duration} MIN
          </span>
        </div>

        <button
          onClick={() => onSelect(service)}
          className="w-full py-3.5 bg-transparent text-charcoal border border-border text-xs tracking-[0.1em] font-medium flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-charcoal group-hover:text-cream group-hover:border-charcoal"
        >
          BOOK THIS SERVICE
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

// ===========================================
// Category Section Header
// ===========================================
interface CategoryHeaderProps {
  category: ServiceCategory;
  count: number;
}

function CategoryHeader({ category, count }: CategoryHeaderProps) {
  const info = categoryInfo[category];

  return (
    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white">
        {info.icon}
      </div>
      <div>
        <h2 className="font-display text-[28px] font-medium text-charcoal mb-1">
          {info.title}
        </h2>
        <p className="text-sm text-charcoal-light">{info.description}</p>
      </div>
      <span className="ml-auto text-[13px] text-charcoal-light">
        {count} services
      </span>
    </div>
  );
}

// ===========================================
// Icons for Help Modal
// ===========================================

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ModalCloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ModalArrowRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ===========================================
// Help Modal Component
// ===========================================

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function HelpModal({ isOpen, onClose }: HelpModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contactOptions = [
    {
      icon: <PhoneIcon />,
      title: "Call or Text",
      subtitle: "(310) 309-7901",
      description: "Quick response during business hours",
      href: "tel:+13103097901",
    },
    {
      icon: <EmailIcon />,
      title: "Email",
      subtitle: "hello@astiglow.com",
      description: "We'll respond within 24 hours",
      href: "mailto:hello@astiglow.com",
    },
    {
      icon: <InstagramIcon />,
      title: "Instagram DM",
      subtitle: "@astiglow_",
      description: "Perfect for quick questions",
      href: "https://instagram.com/astiglow_",
      external: true,
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white w-full max-w-md transform transition-all duration-300 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-charcoal-light hover:text-charcoal hover:bg-cream rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <ModalCloseIcon />
        </button>

        {/* Top Accent Line */}
        <div className="h-1 bg-gold" />

        {/* Content */}
        <div className="p-8 pt-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Avatar with gold ring */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-gold" />
              <div className="absolute inset-1 rounded-full overflow-hidden bg-cream-dark">
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80"
                  alt="Aster"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {/* Heading */}
            <h3 className="font-display text-3xl text-charcoal mb-3">
              Not sure what you need<span className="text-gold">?</span>
            </h3>

            <p className="text-sm text-charcoal-light leading-relaxed max-w-xs mx-auto">
              First time getting waxed or unsure which service is right for you?
              I'm happy to help guide you!
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 border border-border rounded-sm hover:border-gold hover:bg-cream/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  {option.icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="font-medium text-charcoal group-hover:text-gold transition-colors">
                    {option.title}
                  </p>
                  <p className="text-sm text-charcoal-light">{option.subtitle}</p>
                </div>

                {/* Arrow */}
                <div className="text-border group-hover:text-gold transition-colors">
                  <ModalArrowRightIcon />
                </div>
              </a>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-charcoal-light">
              <span className="font-medium text-charcoal">Business Hours:</span>{" "}
              Mon–Wed 9am–8pm, Thu–Sun 9am–5pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Main Services Page
// ===========================================
type CategoryFilter = "all" | ServiceCategory;

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const filterTopRef = useRef<HTMLDivElement>(null);

  // Count services by category
  const categoryCounts = {
    all: services.length,
    face: services.filter((s) => s.category === "face").length,
    body: services.filter((s) => s.category === "body").length,
    brazilian: services.filter((s) => s.category === "brazilian").length,
  };

  // Sticky filter on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (filterTopRef.current) {
        const filterTop = filterTopRef.current.getBoundingClientRect().top;
        setIsFilterSticky(filterTop <= 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceSelect = (service: Service) => {
    // TODO: Navigate to booking with service pre-selected
    console.log("Selected service:", service);
  };

  // Get filtered services grouped by category
  const getFilteredServicesByCategory = () => {
    if (activeCategory === "all") {
      return {
        face: services.filter((s) => s.category === "face"),
        body: services.filter((s) => s.category === "body"),
        brazilian: services.filter((s) => s.category === "brazilian"),
      };
    }
    return {
      [activeCategory]: services.filter((s) => s.category === activeCategory),
    };
  };

  const filteredServices = getFilteredServicesByCategory();

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-36 pb-12 text-center px-6 md:px-12 lg:px-20 bg-cream">
          <p className="text-xs tracking-[0.2em] uppercase font-medium text-gold mb-5 animate-fade-in">
            OUR OFFERINGS
          </p>

          <h1 className="font-display text-5xl md:text-6xl font-normal text-charcoal mb-5 animate-fade-in animate-delay-100">
            Services<span className="text-gold">_</span>
          </h1>

          <p className="text-base text-charcoal-light max-w-[500px] mx-auto leading-relaxed animate-fade-in animate-delay-200">
            Premium hard wax treatments tailored to your needs. Gentle on
            sensitive skin, with long-lasting results.
          </p>
        </section>

        {/* Category Filter */}
        <section ref={filterTopRef} className="px-6 md:px-12 lg:px-20 pb-8 bg-cream">
          <div className="flex justify-center gap-2 p-4 bg-cream-100 rounded-full w-fit mx-auto">
            {[
              { id: "all", label: "All Services" },
              { id: "face", label: "Face" },
              { id: "body", label: "Body" },
              { id: "brazilian", label: "Brazilian & Bikini" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-5 py-3 text-xs tracking-[0.08em] rounded-full flex items-center gap-2 transition-all duration-300 border-none cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-charcoal text-cream"
                    : "bg-transparent text-charcoal-light hover:bg-white hover:text-charcoal"
                }`}
              >
                {cat.label}
                <span className="text-[10px] opacity-60">
                  ({categoryCounts[cat.id as CategoryFilter]})
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <div
          className={`fixed top-20 left-0 right-0 bg-cream/98 backdrop-blur-md px-20 py-4 border-b border-border z-40 transition-transform duration-300 ${
            isFilterSticky ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex justify-center gap-2">
            {[
              { id: "all", label: "All Services" },
              { id: "face", label: "Face" },
              { id: "body", label: "Body" },
              { id: "brazilian", label: "Brazilian & Bikini" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-5 py-3 text-xs tracking-[0.08em] rounded-full flex items-center gap-2 transition-all duration-300 border-none cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-charcoal text-cream"
                    : "bg-transparent text-charcoal-light hover:bg-cream-100 hover:text-charcoal"
                }`}
              >
                {cat.label}
                <span className="text-[10px] opacity-60">
                  ({categoryCounts[cat.id as CategoryFilter]})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <section className="px-6 md:px-12 lg:px-20 py-6 pb-20 bg-cream">
          {Object.entries(filteredServices).map(([categoryKey, categoryServices]) => (
            <div key={categoryKey} className="mb-16 last:mb-0">
              {/* Category Header (only in "all" view) */}
              {activeCategory === "all" && (
                <CategoryHeader
                  category={categoryKey as ServiceCategory}
                  count={categoryServices.length}
                />
              )}

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    showCategoryBadge={activeCategory === "all"}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Value Props Banner */}
        <section className="py-16 px-6 md:px-12 lg:px-20 bg-charcoal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <ClockIcon />,
                title: "Premium Hard Wax",
                subtitle: "GENTLE ON SENSITIVE SKIN",
              },
              {
                icon: <CreditCardIcon />,
                title: "Klarna, Affirm & Afterpay",
                subtitle: "BUY NOW, PAY LATER",
              },
              {
                icon: <HomeIcon />,
                title: "Clean & Serene",
                subtitle: "RELAXING STUDIO ENVIRONMENT",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 relative"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-5">
                  {item.icon}
                </div>
                <p className="font-display text-2xl text-cream mb-2">{item.title}</p>
                <p className="text-[11px] text-gold tracking-[0.12em]">
                  {item.subtitle}
                </p>

                {/* Divider */}
                {index < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[60px] bg-cream/15" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Packages Upsell */}
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-cream">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 bg-white border border-border">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-white flex-shrink-0">
              <WalletIcon />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-[28px] font-medium text-charcoal mb-2">
                Save Up to 20% with Packages
              </h3>
              <p className="text-[15px] text-charcoal-light leading-relaxed">
                Buy 9 sessions of your favorite service and get 2 bonus sessions
                free. Perfect for maintaining your smooth, glowing skin year-round.
              </p>
            </div>
            <Link href="/packages">
              <Button rightIcon={<ArrowRightIcon />}>
                VIEW PACKAGES
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Help Button */}
      <button
        onClick={() => setShowHelpModal(true)}
        className="fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full bg-gold text-white border-none cursor-pointer shadow-[0_4px_20px_rgba(201,162,124,0.4)] flex items-center justify-center transition-all duration-300 z-[100] hover:scale-110 hover:shadow-[0_6px_30px_rgba(201,162,124,0.5)]"
        aria-label="Need help choosing?"
      >
        <MessageIcon />
      </button>

      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
}