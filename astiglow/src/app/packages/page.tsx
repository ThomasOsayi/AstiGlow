"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout";

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

const ShoppingBagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const CalendarCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 16l2 2 4-4" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ===========================================
// Data
// ===========================================

const steps = [
  {
    num: 1,
    title: "Choose a Package",
    desc: "Select your favorite service",
    icon: <ShoppingBagIcon />,
  },
  {
    num: 2,
    title: "Purchase & Save",
    desc: "Get 11 sessions for the price of 9",
    icon: <CreditCardIcon />,
  },
  {
    num: 3,
    title: "Book as Usual",
    desc: "Credits apply automatically",
    icon: <CalendarCheckIcon />,
  },
];

const faqs = [
  {
    q: "How do package credits work?",
    a: "Once you purchase a package, your credits are automatically applied when you book that service. Simply book as usual through our online system and your session will be deducted from your package.",
  },
  {
    q: "Do package credits expire?",
    a: "Package credits are valid for 12 months from the date of purchase. We recommend booking regularly to get the most out of your package!",
  },
  {
    q: "Can I share my package with someone else?",
    a: "Packages are non-transferable and can only be used by the original purchaser.",
  },
  {
    q: "Can I get a refund on unused credits?",
    a: "Packages are non-refundable, but unused credits can be applied to any future booking within the 12-month validity period.",
  },
];

// Extended packages data with badges
const packagesData = [
  {
    id: "brazilian-pkg",
    name: "Brazilian",
    originalPrice: 75,
    packagePrice: 61,
    sessions: 9,
    bonus: 2,
    description: "Our signature Brazilian wax package. Gentle hard wax technique for sensitive areas.",
    badge: "BEST VALUE",
    badgeColor: "gold" as const,
  },
  {
    id: "full-face-pkg",
    name: "Full Face",
    originalPrice: 64,
    packagePrice: 52,
    sessions: 9,
    bonus: 2,
    description: "Complete facial waxing including brows, lip, chin, and sideburns.",
    badge: null,
    badgeColor: null,
  },
  {
    id: "full-legs-pkg",
    name: "Full Legs",
    originalPrice: 70,
    packagePrice: 57,
    sessions: 9,
    bonus: 2,
    description: "Full leg waxing from thigh to ankle for lasting smoothness.",
    badge: null,
    badgeColor: null,
  },
  {
    id: "eyebrows-pkg",
    name: "Eyebrows",
    originalPrice: 28,
    packagePrice: 23,
    sessions: 9,
    bonus: 2,
    description: "Keep your brows perfectly shaped year-round with precision waxing.",
    badge: "MOST POPULAR",
    badgeColor: "charcoal" as const,
  },
  {
    id: "underarms-pkg",
    name: "Underarms",
    originalPrice: 22,
    packagePrice: 18,
    sessions: 9,
    bonus: 2,
    description: "Smooth underarms all year with our gentle waxing treatment.",
    badge: null,
    badgeColor: null,
  },
];

// ===========================================
// Constants
// ===========================================

const CART_STORAGE_KEY = "astiglow-cart";

// ===========================================
// Helper Functions
// ===========================================

function calculateSavings(pkg: typeof packagesData[0]) {
  const totalSessions = pkg.sessions + pkg.bonus;
  const normalCost = totalSessions * pkg.originalPrice;
  const packageCost = pkg.sessions * pkg.packagePrice;
  return normalCost - packageCost;
}

function calculateTotal(pkg: typeof packagesData[0]) {
  return pkg.sessions * pkg.packagePrice;
}

// ===========================================
// Package Card Component
// ===========================================

interface PackageCardProps {
  pkg: typeof packagesData[0];
  isInCart: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

function PackageCard({ pkg, isInCart, onAdd, onRemove }: PackageCardProps) {
  const savings = calculateSavings(pkg);
  const total = calculateTotal(pkg);
  const totalSessions = pkg.sessions + pkg.bonus;

  return (
    <div
      className={`bg-white border p-5 sm:p-6 md:p-8 transition-all duration-400 relative flex flex-col h-full hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.99] ${
        isInCart ? "border-gold bg-gold/[0.03]" : "border-border hover:border-gold"
      }`}
    >
      {/* Badge */}
      {pkg.badge && (
        <div
          className={`absolute -top-px right-4 sm:right-6 text-[9px] sm:text-[10px] tracking-[0.1em] font-medium px-2.5 sm:px-4 py-1.5 sm:py-2 text-white ${
            pkg.badgeColor === "gold" ? "bg-gold" : "bg-charcoal"
          }`}
        >
          {pkg.badge}
        </div>
      )}

      <div className="flex-1">
        {/* Title */}
        <h3 className="font-display text-2xl sm:text-[28px] font-medium text-charcoal mb-2">
          {pkg.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed mb-4 sm:mb-5">
          {pkg.description}
        </p>

        {/* Session Visualization */}
        <div className="mb-4 sm:mb-5">
          <p className="text-[10px] sm:text-[11px] tracking-[0.1em] text-charcoal-light mb-2 sm:mb-2.5">
            {totalSessions} SESSIONS INCLUDED
          </p>
          <div className="flex gap-1 sm:gap-1.5 flex-wrap">
            {/* Paid sessions - charcoal dots */}
            {[...Array(pkg.sessions)].map((_, i) => (
              <div
                key={`paid-${i}`}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-charcoal"
                title="Paid session"
              />
            ))}
            {/* Bonus sessions - gold dots with pulse */}
            {[...Array(pkg.bonus)].map((_, i) => (
              <div
                key={`free-${i}`}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gold animate-pulse-subtle"
                title="FREE bonus session"
              />
            ))}
          </div>
          <p className="text-[10px] sm:text-[11px] text-gold mt-1.5 sm:mt-2">
            ● {pkg.bonus} FREE bonus sessions
          </p>
        </div>

        {/* Savings Badge */}
        <div className="inline-block px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-gold/10 rounded mb-4 sm:mb-5">
          <span className="text-[12px] sm:text-[13px] font-semibold text-gold">
            SAVE ${savings}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="pt-4 sm:pt-5 border-t border-border">
        {/* Total Price */}
        <div className="mb-1.5 sm:mb-2">
          <span className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
            ${total}
          </span>
          <span className="text-xs sm:text-sm text-charcoal-light ml-1.5 sm:ml-2">total</span>
        </div>

        {/* Per Session Breakdown */}
        <p className="text-[12px] sm:text-[13px] text-charcoal-light mb-4 sm:mb-5">
          <span className="line-through">${pkg.originalPrice}</span>{" "}
          <span className="text-charcoal font-medium">${pkg.packagePrice}</span>{" "}
          per session
        </p>

        {/* Button */}
        <button
          onClick={isInCart ? onRemove : onAdd}
          className={`w-full py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] font-medium transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] ${
            isInCart
              ? "bg-gold text-white"
              : "bg-charcoal text-white hover:bg-gold active:bg-gold"
          }`}
        >
          {isInCart ? (
            <>
              <CheckIcon />
              ADDED TO CART
            </>
          ) : (
            "ADD TO CART"
          )}
        </button>
      </div>
    </div>
  );
}

// ===========================================
// Page Component
// ===========================================

export default function PackagesPage() {
  const [cart, setCart] = useState<string[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Scroll animation refs for each section
  const heroAnimation = useScrollAnimation(0.3);
  const stepsAnimation = useScrollAnimation(0.2);
  const packagesTopAnimation = useScrollAnimation(0.15);
  const packagesBottomAnimation = useScrollAnimation(0.15);
  const bnplAnimation = useScrollAnimation(0.3);
  const faqAnimation = useScrollAnimation(0.2);
  const ctaAnimation = useScrollAnimation(0.3);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const cartIds = JSON.parse(savedCart) as string[];
        setCart(cartIds);
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pkg: typeof packagesData[0]) => {
    if (!isInCart(pkg.id)) {
      setCart([...cart, pkg.id]);
      setToastMessage(`${pkg.name} Package added to cart`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const removeFromCart = (pkgId: string) => {
    setCart(cart.filter((id) => id !== pkgId));
  };

  const isInCart = (pkgId: string) => cart.includes(pkgId);

  // Calculate cart total from package IDs
  const cartPackages = packagesData.filter((pkg) => cart.includes(pkg.id));
  const cartTotal = cartPackages.reduce((sum, pkg) => sum + calculateTotal(pkg), 0);

  return (
    <>
      <Navbar />

      {/* Toast Notification - Responsive positioning */}
      {showToast && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto bg-charcoal text-white px-4 sm:px-6 py-3 sm:py-4 rounded flex items-center gap-3 shadow-xl z-[1000] animate-slide-in">
          <CheckIcon />
          <span className="text-sm flex-1">{toastMessage}</span>
          <button 
            onClick={() => setShowToast(false)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section 
          ref={heroAnimation.ref}
          className="pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-16 text-center px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
        >
          <p 
            className={`text-[10px] sm:text-xs tracking-[0.2em] text-gold font-medium mb-4 sm:mb-5 transition-all duration-700 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            SAVE UP TO 20%
          </p>

          <h1 
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-normal text-charcoal mb-4 sm:mb-5 transition-all duration-700 delay-100 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Packages<span className="text-gold">_</span>
          </h1>

          <p 
            className={`text-sm sm:text-base text-charcoal-light max-w-[520px] mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Commit to smooth skin all year long. Purchase a package and enjoy{" "}
            <strong className="text-charcoal">11 sessions for the price of 9</strong>.
          </p>
        </section>

        {/* How It Works */}
        <section 
          ref={stepsAnimation.ref}
          className="py-8 sm:py-10 pb-14 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
        >
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-6 max-w-[900px] mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.num} 
                className={`flex flex-col md:flex-row items-center transition-all duration-700 ${
                  stepsAnimation.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: stepsAnimation.isVisible ? `${index * 150}ms` : "0ms" }}
              >
                {/* Step */}
                <div className="text-center max-w-[200px]">
                  {/* Icon Circle */}
                  <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full border-2 border-gold bg-white flex items-center justify-center mx-auto mb-4 sm:mb-5 text-gold">
                    {step.icon}
                    {/* Number Badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gold text-white text-[10px] sm:text-xs font-semibold flex items-center justify-center">
                      {step.num}
                    </div>
                  </div>
                  <p className="text-sm sm:text-[15px] text-charcoal font-medium mb-1 sm:mb-1.5">
                    {step.title}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-charcoal-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Connector - Vertical on mobile, horizontal on desktop */}
                {index < steps.length - 1 && (
                  <>
                    {/* Mobile: Vertical connector */}
                    <div className="flex md:hidden items-center my-4">
                      <div className="h-8 w-0.5 bg-border relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-gold" />
                      </div>
                    </div>
                    {/* Desktop: Horizontal connector */}
                    <div className="hidden md:flex items-center mx-6">
                      <div className="w-16 lg:w-20 h-0.5 bg-border relative">
                        <div className="absolute right-0 -top-1 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-gold" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Packages Grid */}
        <section className="pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-cream">
          {/* Top Row - 3 cards */}
          <div 
            ref={packagesTopAnimation.ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[1200px] mx-auto mb-4 sm:mb-6"
          >
            {packagesData.slice(0, 3).map((pkg, index) => (
              <div
                key={pkg.id}
                className={`transition-all duration-700 ${
                  packagesTopAnimation.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: packagesTopAnimation.isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <PackageCard
                  pkg={pkg}
                  isInCart={isInCart(pkg.id)}
                  onAdd={() => addToCart(pkg)}
                  onRemove={() => removeFromCart(pkg.id)}
                />
              </div>
            ))}
          </div>

          {/* Bottom Row - 2 cards centered */}
          <div 
            ref={packagesBottomAnimation.ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-[800px] mx-auto"
          >
            {packagesData.slice(3).map((pkg, index) => (
              <div
                key={pkg.id}
                className={`transition-all duration-700 ${
                  packagesBottomAnimation.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: packagesBottomAnimation.isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <PackageCard
                  pkg={pkg}
                  isInCart={isInCart(pkg.id)}
                  onAdd={() => addToCart(pkg)}
                  onRemove={() => removeFromCart(pkg.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* BNPL Section */}
        <section 
          ref={bnplAnimation.ref}
          className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-white text-center"
        >
          <p 
            className={`text-[10px] sm:text-[11px] tracking-[0.15em] text-charcoal-light mb-6 sm:mb-8 transition-all duration-700 ${
              bnplAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            FLEXIBLE PAYMENT OPTIONS
          </p>

          <div 
            className={`flex justify-center items-center gap-3 sm:gap-6 md:gap-8 flex-wrap mb-5 sm:mb-6 transition-all duration-700 delay-150 ${
              bnplAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* Klarna */}
            <div 
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-transform duration-300 hover:scale-105 active:scale-100" 
              style={{ backgroundColor: "#FFB3C7" }}
            >
              <span className="font-bold text-base sm:text-lg md:text-xl text-black">Klarna.</span>
            </div>

            {/* Affirm */}
            <div 
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-transform duration-300 hover:scale-105 active:scale-100" 
              style={{ backgroundColor: "#0FA0EA" }}
            >
              <span className="font-bold text-base sm:text-lg md:text-xl text-white">affirm</span>
            </div>

            {/* Afterpay */}
            <div 
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-transform duration-300 hover:scale-105 active:scale-100" 
              style={{ backgroundColor: "#B2FCE4" }}
            >
              <span className="font-bold text-sm sm:text-base md:text-lg text-black">Afterpay</span>
            </div>
          </div>

          <p 
            className={`text-xs sm:text-sm text-charcoal-light transition-all duration-700 delay-300 ${
              bnplAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Buy now, pay later — available for purchases{" "}
            <strong className="text-charcoal">$50 and up</strong>
          </p>
        </section>

        {/* FAQ Section */}
        <section 
          ref={faqAnimation.ref}
          className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-cream"
        >
          <div className="max-w-[700px] mx-auto">
            <div 
              className={`w-10 h-0.5 bg-gold mb-4 sm:mb-6 transition-all duration-500 ${
                faqAnimation.isVisible 
                  ? "opacity-100 scale-x-100 origin-left" 
                  : "opacity-0 scale-x-0 origin-left"
              }`}
            />
            <h2 
              className={`font-display text-3xl sm:text-4xl font-normal text-charcoal mb-8 sm:mb-12 transition-all duration-700 delay-100 ${
                faqAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
            >
              Questions<span className="text-gold">?</span>
            </h2>

            <div>
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border-b border-border transition-all duration-700 ${
                    faqAnimation.isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: faqAnimation.isVisible ? `${200 + index * 100}ms` : "0ms" }}
                >
                  <button
                    className="w-full py-5 sm:py-6 flex justify-between items-center text-left bg-transparent gap-4 min-h-[64px]"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="text-sm sm:text-base font-medium text-charcoal">
                      {faq.q}
                    </span>
                    <ChevronDownIcon isOpen={expandedFaq === index} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFaq === index ? "max-h-48 pb-5 sm:pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm sm:text-[15px] text-charcoal-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaAnimation.ref}
          className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-charcoal text-center text-white"
        >
          <p 
            className={`text-[10px] sm:text-[11px] tracking-[0.2em] text-gold mb-3 sm:mb-4 transition-all duration-700 ${
              ctaAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            PREFER INDIVIDUAL SESSIONS?
          </p>
          <h2 
            className={`font-display text-3xl sm:text-4xl font-normal mb-3 sm:mb-4 transition-all duration-700 delay-100 ${
              ctaAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            Not ready to commit<span className="text-gold">?</span>
          </h2>
          <p 
            className={`text-sm sm:text-[15px] text-white/70 max-w-[400px] mx-auto mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
              ctaAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            That's okay! You can always book individual sessions and upgrade to a
            package later.
          </p>
          <div 
            className={`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
              ctaAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 bg-white text-charcoal text-[11px] sm:text-xs tracking-[0.1em] font-medium hover:bg-cream active:bg-cream transition-colors min-h-[48px]">
                VIEW ALL SERVICES
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 bg-transparent border border-white/30 text-white text-[11px] sm:text-xs tracking-[0.1em] font-medium hover:bg-white/10 active:bg-white/10 transition-colors min-h-[48px]">
                CONTACT ASTER
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* ============================================= */}
      {/* FIX: Changed href from "/book" to "/cart"    */}
      {/* ============================================= */}
      {/* Floating Cart Indicator (when cart has items) - Responsive */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto bg-white border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 shadow-lg flex items-center gap-2 sm:gap-3 z-50 animate-slide-in">
          <CartIcon />
          <div className="flex-1 sm:flex-none">
            <p className="text-[10px] sm:text-xs text-charcoal-light">Cart ({cart.length})</p>
            <p className="text-sm sm:text-base font-medium text-charcoal">
              ${cartTotal.toLocaleString()}
            </p>
          </div>
          {/* ✅ FIXED: Now links to /cart instead of /book */}
          <Link href="/cart" className="flex-shrink-0">
            <button className="px-3 sm:px-4 py-2 bg-charcoal text-white text-[10px] sm:text-xs tracking-wider hover:bg-gold active:bg-gold transition-colors min-h-[40px]">
              CHECKOUT
            </button>
          </Link>
        </div>
      )}
    </>
  );
}