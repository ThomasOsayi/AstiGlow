"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { services, serviceCategories, getServicesByCategory } from "@/lib/data";
import type { Service, ServiceCategory } from "@/types";

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
  animationDelay?: number;
  isVisible?: boolean;
}

function ServiceCard({ 
  service, 
  showCategoryBadge = true, 
  onSelect,
  animationDelay = 0,
  isVisible = true
}: ServiceCardProps) {
  const categoryLabels: Record<ServiceCategory, string> = {
    face: "FACE",
    body: "BODY",
    brazilian: "BRAZILIAN",
  };

  return (
    <div 
      className={`group relative flex flex-col h-full bg-white border border-border p-5 sm:p-6 md:p-7 transition-all duration-700 ease-out cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(45,42,38,0.08)] hover:border-gold active:scale-[0.99] ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: isVisible ? `${animationDelay}ms` : "0ms" }}
      onClick={() => onSelect(service)}
    >
      {/* Badges */}
      {service.popular && (
        <div className="absolute -top-px right-4 sm:right-5 bg-gold text-white text-[9px] sm:text-[10px] tracking-[0.08em] font-medium px-2 sm:px-3 py-1 sm:py-1.5">
          POPULAR
        </div>
      )}
      {service.addon && (
        <div className="absolute -top-px right-4 sm:right-5 bg-charcoal-light text-white text-[9px] sm:text-[10px] tracking-[0.08em] font-medium px-2 sm:px-3 py-1 sm:py-1.5">
          ADD-ON
        </div>
      )}

      {/* Card Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <h3 className="font-display text-xl sm:text-2xl font-medium text-charcoal">
            {service.name}
          </h3>
          {showCategoryBadge && (
            <span className="text-[9px] sm:text-[10px] tracking-[0.05em] text-gold bg-gold/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded mt-1 flex-shrink-0">
              {categoryLabels[service.category]}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed mb-4 sm:mb-5">
          {service.description}
        </p>
      </div>

      {/* Price & Duration */}
      <div>
        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-border mb-3 sm:mb-4">
          <span className="font-display text-xl sm:text-2xl font-medium text-charcoal">
            ${service.price}
          </span>
          <span className="text-[10px] sm:text-xs text-charcoal-light tracking-[0.05em]">
            {service.duration} MIN
          </span>
        </div>

        {/* Button - Always visible on mobile, hover effect on desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(service);
          }}
          className="w-full py-3 sm:py-3.5 bg-transparent text-charcoal border border-border text-[11px] sm:text-xs tracking-[0.1em] font-medium flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-charcoal group-hover:text-cream group-hover:border-charcoal active:bg-charcoal active:text-cream"
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
  isVisible?: boolean;
}

function CategoryHeader({ category, count, isVisible = true }: CategoryHeaderProps) {
  const info = categoryInfo[category];

  return (
    <div 
      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b border-border transition-all duration-700 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold flex items-center justify-center text-white flex-shrink-0">
          {info.icon}
        </div>
        <div>
          <h2 className="font-display text-2xl sm:text-[28px] font-medium text-charcoal mb-0.5 sm:mb-1">
            {info.title}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-light">{info.description}</p>
        </div>
      </div>
      <span className="text-[12px] sm:text-[13px] text-charcoal-light sm:ml-auto">
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
      className={`fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

      {/* Modal - Full width on mobile, centered on desktop */}
      <div
        className={`relative bg-white w-full sm:max-w-md transform transition-all duration-300 sm:rounded-sm ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center text-charcoal-light hover:text-charcoal hover:bg-cream rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <ModalCloseIcon />
        </button>

        {/* Top Accent Line */}
        <div className="h-1 bg-gold" />

        {/* Content */}
        <div className="p-6 sm:p-8 pt-8 sm:pt-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            {/* Avatar with gold ring */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-gold" />
              <div className="absolute inset-1 rounded-full overflow-hidden bg-cream-dark">
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80"
                  alt="Aster"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {/* Heading */}
            <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-2 sm:mb-3">
              Not sure what you need<span className="text-gold">?</span>
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed max-w-xs mx-auto">
              First time getting waxed or unsure which service is right for you?
              I'm happy to help guide you!
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-2 sm:space-y-3">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-border rounded-sm hover:border-gold hover:bg-cream/50 active:bg-cream transition-all duration-300 min-h-[64px]"
              >
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 flex-shrink-0">
                  {option.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base text-charcoal group-hover:text-gold transition-colors">
                    {option.title}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-light truncate">{option.subtitle}</p>
                </div>

                {/* Arrow */}
                <div className="text-border group-hover:text-gold transition-colors flex-shrink-0">
                  <ModalArrowRightIcon />
                </div>
              </a>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border text-center">
            <p className="text-[10px] sm:text-xs text-charcoal-light">
              <span className="font-medium text-charcoal">Business Hours:</span>{" "}
              Mon–Wed 9am–8pm, Thu–Sun 9am–5pm
            </p>
          </div>
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-safe-area-inset-bottom sm:hidden" />
      </div>
    </div>
  );
}

// ===========================================
// Category Section with Animation
// ===========================================
interface CategorySectionProps {
  categoryKey: ServiceCategory;
  categoryServices: Service[];
  showCategoryHeader: boolean;
  onServiceSelect: (service: Service) => void;
}

function CategorySection({ 
  categoryKey, 
  categoryServices, 
  showCategoryHeader,
  onServiceSelect 
}: CategorySectionProps) {
  const sectionAnimation = useScrollAnimation(0.1);

  return (
    <div ref={sectionAnimation.ref} className="mb-12 sm:mb-16 last:mb-0">
      {/* Category Header (only in "all" view) */}
      {showCategoryHeader && (
        <CategoryHeader
          category={categoryKey}
          count={categoryServices.length}
          isVisible={sectionAnimation.isVisible}
        />
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {categoryServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            showCategoryBadge={showCategoryHeader}
            onSelect={onServiceSelect}
            isVisible={sectionAnimation.isVisible}
            animationDelay={index * 75}
          />
        ))}
      </div>
    </div>
  );
}

// ===========================================
// Filter Pills Component
// ===========================================
interface FilterPillsProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  categoryCounts: Record<CategoryFilter, number>;
  variant?: "default" | "sticky";
}

function FilterPills({ activeCategory, onCategoryChange, categoryCounts, variant = "default" }: FilterPillsProps) {
  const categories = [
    { id: "all", label: "All", fullLabel: "All Services" },
    { id: "face", label: "Face", fullLabel: "Face" },
    { id: "body", label: "Body", fullLabel: "Body" },
    { id: "brazilian", label: "Brazilian", fullLabel: "Brazilian & Bikini" },
  ];

  return (
    <div 
      className={`flex gap-2 overflow-x-auto scrollbar-hide ${
        variant === "sticky" ? "justify-center" : "justify-start sm:justify-center"
      }`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id as CategoryFilter)}
          className={`px-3 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs tracking-[0.08em] rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 border-none cursor-pointer whitespace-nowrap flex-shrink-0 min-h-[44px] ${
            activeCategory === cat.id
              ? "bg-charcoal text-cream"
              : "bg-white sm:bg-transparent text-charcoal-light hover:bg-white hover:text-charcoal active:bg-cream-dark"
          }`}
        >
          {/* Show short label on mobile, full label on larger screens */}
          <span className="sm:hidden">{cat.label}</span>
          <span className="hidden sm:inline">{cat.fullLabel}</span>
          <span className="text-[9px] sm:text-[10px] opacity-60">
            ({categoryCounts[cat.id as CategoryFilter]})
          </span>
        </button>
      ))}
    </div>
  );
}

// ===========================================
// Main Services Page
// ===========================================
type CategoryFilter = "all" | ServiceCategory;

export default function ServicesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const filterTopRef = useRef<HTMLDivElement>(null);

  // Scroll animation refs
  const heroAnimation = useScrollAnimation(0.3);
  const valuePropsAnimation = useScrollAnimation(0.2);
  const packagesUpsellAnimation = useScrollAnimation(0.3);

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
        // Adjust for different navbar heights on mobile vs desktop
        const navbarHeight = window.innerWidth < 768 ? 72 : 84;
        setIsFilterSticky(filterTop <= navbarHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceSelect = (service: Service) => {
    router.push(`/book?service=${service.id}`);
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
        <section 
          ref={heroAnimation.ref}
          className="pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 text-center px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
        >
          <p 
            className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium text-gold mb-4 sm:mb-5 transition-all duration-700 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            OUR OFFERINGS
          </p>

          <h1 
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-normal text-charcoal mb-4 sm:mb-5 transition-all duration-700 delay-100 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Services<span className="text-gold">_</span>
          </h1>

          <p 
            className={`text-sm sm:text-base text-charcoal-light max-w-[500px] mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Premium hard wax treatments tailored to your needs. Gentle on
            sensitive skin, with long-lasting results.
          </p>
        </section>

        {/* Category Filter */}
        <section ref={filterTopRef} className="px-4 sm:px-6 md:px-12 lg:px-20 pb-6 sm:pb-8 bg-cream">
          <div className="p-2 sm:p-4 bg-cream-dark/50 rounded-full w-full sm:w-fit sm:mx-auto">
            <FilterPills
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categoryCounts={categoryCounts}
            />
          </div>
        </section>

        {/* Sticky Filter Bar - Hidden on mobile (uses native scroll instead) */}
        <div
          className={`fixed top-[72px] md:top-[84px] left-0 right-0 bg-cream/98 backdrop-blur-md px-4 sm:px-6 md:px-12 lg:px-20 py-3 sm:py-4 border-b border-border z-40 transition-transform duration-300 ${
            isFilterSticky ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <FilterPills
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={categoryCounts}
            variant="sticky"
          />
        </div>

        {/* Services Grid */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 pb-16 sm:pb-20 bg-cream">
          {Object.entries(filteredServices).map(([categoryKey, categoryServices]) => (
            <CategorySection
              key={categoryKey}
              categoryKey={categoryKey as ServiceCategory}
              categoryServices={categoryServices}
              showCategoryHeader={activeCategory === "all"}
              onServiceSelect={handleServiceSelect}
            />
          ))}
        </section>

        {/* Value Props Banner */}
        <section 
          ref={valuePropsAnimation.ref}
          className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-charcoal"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
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
                className={`flex flex-col items-center text-center p-4 sm:p-6 relative transition-all duration-700 ${
                  valuePropsAnimation.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: valuePropsAnimation.isVisible ? `${index * 150}ms` : "0ms" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-4 sm:mb-5">
                  {item.icon}
                </div>
                <p className="font-display text-xl sm:text-2xl text-cream mb-1 sm:mb-2">{item.title}</p>
                <p className="text-[10px] sm:text-[11px] text-gold tracking-[0.12em]">
                  {item.subtitle}
                </p>

                {/* Divider - Only visible on md+ */}
                {index < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[60px] bg-cream/15" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Packages Upsell */}
        <section 
          ref={packagesUpsellAnimation.ref}
          className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
        >
          <div 
            className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-12 bg-white border border-border transition-all duration-700 ${
              packagesUpsellAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
            }`}
          >
            <div 
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold flex items-center justify-center text-white flex-shrink-0 transition-all duration-700 delay-150 ${
                packagesUpsellAnimation.isVisible 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-75"
              }`}
            >
              <WalletIcon />
            </div>
            <div 
              className={`flex-1 text-center md:text-left transition-all duration-700 delay-200 ${
                packagesUpsellAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h3 className="font-display text-2xl sm:text-[28px] font-medium text-charcoal mb-2">
                Save Up to 20% with Packages
              </h3>
              <p className="text-sm sm:text-[15px] text-charcoal-light leading-relaxed">
                Buy 9 sessions of your favorite service and get 2 bonus sessions
                free. Perfect for maintaining your smooth, glowing skin year-round.
              </p>
            </div>
            <div
              className={`w-full md:w-auto transition-all duration-700 delay-300 ${
                packagesUpsellAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link href="/packages" className="block">
                <Button rightIcon={<ArrowRightIcon />} className="w-full md:w-auto">
                  VIEW PACKAGES
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Help Button - Adjusted position for mobile */}
      <button
        onClick={() => setShowHelpModal(true)}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full bg-gold text-white border-none cursor-pointer shadow-[0_4px_20px_rgba(201,162,124,0.4)] flex items-center justify-center transition-all duration-300 z-[100] hover:scale-110 hover:shadow-[0_6px_30px_rgba(201,162,124,0.5)] active:scale-105"
        aria-label="Need help choosing?"
      >
        <MessageIcon />
      </button>

      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
}