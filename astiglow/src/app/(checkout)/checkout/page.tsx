// src/app/checkout/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import {
  Check,
  CheckCircle,
  CreditCard,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ShoppingBag,
  Spinner,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  getPackagesByIds,
  calculatePackageTotal,
  calculateCartTotals,
} from "@/lib/data/packages";
import type { Package } from "@/types";

// ===========================================
// Custom Icons (not in shared icons file)
// ===========================================

const LockIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PackageIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ===========================================
// Types
// ===========================================

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgClass: string;
}

// ===========================================
// Constants
// ===========================================

const steps = [
  { num: 1, label: "Your Details", shortLabel: "Details" },
  { num: 2, label: "Payment", shortLabel: "Payment" },
  { num: 3, label: "Confirm", shortLabel: "Confirm" },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Pay securely with your card",
    icon: <CreditCard size={24} />,
    color: "text-charcoal",
    bgClass: "bg-transparent border border-border",
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "Pay in 4 interest-free payments",
    icon: <span className="font-semibold text-lg">K</span>,
    color: "text-[#FFB3C7]",
    bgClass: "bg-[rgba(255,179,199,0.1)]",
  },
  {
    id: "affirm",
    name: "Affirm",
    description: "Monthly payments, 0% APR available",
    icon: <span className="font-semibold text-lg">A</span>,
    color: "text-[#0FA0EA]",
    bgClass: "bg-[rgba(15,160,234,0.1)]",
  },
  {
    id: "afterpay",
    name: "Afterpay",
    description: "Pay in 4 interest-free payments",
    icon: <span className="font-semibold text-lg">A</span>,
    color: "text-[#00C2A0]",
    bgClass: "bg-[rgba(0,194,160,0.1)]",
  },
];

// ===========================================
// Main Checkout Content
// ===========================================

function CheckoutContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartPackages, setCartPackages] = useState<Package[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("astiglow-cart");
      if (saved) {
        const ids = JSON.parse(saved) as string[];
        const packages = getPackagesByIds(ids);
        setCartPackages(packages);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
    setIsLoaded(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (isLoaded && cartPackages.length === 0 && !isConfirmed) {
      router.push("/packages");
    }
  }, [isLoaded, cartPackages.length, isConfirmed, router]);

  // Calculate totals
  const totals = calculateCartTotals(cartPackages);

  // Validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "firstName":
        return value.trim() ? "" : "First name is required";
      case "lastName":
        return value.trim() ? "" : "Last name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Please enter a valid email";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        return value.replace(/\D/g, "").length >= 10
          ? ""
          : "Please enter a valid phone number";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateField(name, formData[name as keyof typeof formData]),
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const newErrors: Record<string, string> = {};
      ["firstName", "lastName", "email", "phone"].forEach((key) => {
        const error = validateField(
          key,
          formData[key as keyof typeof formData]
        );
        if (error) newErrors[key] = error;
      });

      setErrors(newErrors);
      setTouched({ firstName: true, lastName: true, email: true, phone: true });

      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(2);
      }
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleConfirmPurchase = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const order = `AG-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(order);

    // Clear cart
    localStorage.removeItem("astiglow-cart");

    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const canProceed = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) return !!selectedPayment;
    return true;
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <Spinner size={32} className="mx-auto mb-4 text-gold" />
          <p className="text-charcoal-light">Loading...</p>
        </div>
      </div>
    );
  }

  // Confirmed state
  if (isConfirmed) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        {/* Header */}
        <header className="px-4 sm:px-6 md:px-16 py-4 sm:py-5 flex justify-between items-center bg-white border-b border-border">
          <Link
            href="/"
            className="font-display text-2xl sm:text-[28px] font-medium tracking-wide text-charcoal"
          >
            Astiglow<span className="text-gold">_</span>
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center max-w-md w-full">
            {/* Success Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 bg-gold/15 animate-scale-in">
              <CheckCircle size={64} className="text-gold" />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl mb-3 sm:mb-4 text-charcoal animate-fade-in-up animate-delay-100">
              Purchase Complete!
            </h1>
            <p className="text-sm sm:text-base mb-2 text-charcoal-light animate-fade-in-up animate-delay-150">
              Thank you for your purchase. Your package credits have been added
              to your account.
            </p>
            <p className="text-xs mb-6 sm:mb-8 text-gold animate-fade-in-up animate-delay-150">
              Order #{orderNumber}
            </p>

            {/* Order Summary */}
            <div className="p-4 sm:p-6 mb-6 sm:mb-8 text-left bg-white border border-border animate-fade-in-up animate-delay-200">
              <p className="text-[10px] tracking-[0.1em] uppercase mb-3 text-gold">
                Your Packages
              </p>
              {cartPackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between mb-2">
                  <div>
                    <span className="text-sm sm:text-base text-charcoal">
                      {pkg.name} Package
                    </span>
                    <span className="text-xs ml-2 text-charcoal-light">
                      {pkg.sessions + pkg.bonus} sessions
                    </span>
                  </div>
                  <span className="text-sm sm:text-base text-charcoal-light">
                    ${calculatePackageTotal(pkg)}
                  </span>
                </div>
              ))}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 flex justify-between border-t border-border">
                <span className="font-medium text-charcoal">Total Paid</span>
                <span className="font-display text-xl text-charcoal">
                  ${totals.total}
                </span>
              </div>
            </div>

            <p className="text-xs mb-6 text-charcoal-light animate-fade-in-up animate-delay-200">
              A confirmation email has been sent to {formData.email}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up animate-delay-300">
              <Link href="/book" className="flex-1">
                <Button className="w-full" size="lg">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="secondary" className="w-full" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="px-4 sm:px-6 md:px-16 py-4 sm:py-5 flex justify-between items-center bg-white border-b border-border animate-fade-in">
        <Link
          href="/"
          className="font-display text-2xl sm:text-[28px] font-medium tracking-wide text-charcoal"
        >
          Astiglow<span className="text-gold">_</span>
        </Link>

        <Link
          href="/cart"
          className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 text-charcoal-light hover:text-gold transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to cart</span>
          <span className="sm:hidden">Cart</span>
        </Link>
      </header>

      {/* Progress Steps */}
      <div className="px-4 sm:px-6 md:px-16 py-5 sm:py-8 bg-white border-b border-border animate-fade-in-up animate-delay-100">
        <div className="max-w-[500px] mx-auto flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute top-[14px] sm:top-[18px] left-[30px] sm:left-[50px] right-[30px] sm:right-[50px] h-0.5 bg-border z-0">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.num}
              onClick={() => goToStep(step.num)}
              className="flex flex-col items-center gap-1.5 sm:gap-2.5 z-10"
              style={{ cursor: step.num < currentStep ? "pointer" : "default" }}
            >
              <div
                className={cn(
                  "w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300",
                  currentStep >= step.num
                    ? "bg-gold border-2 border-gold text-white"
                    : "bg-white border-2 border-border text-charcoal-light"
                )}
              >
                {currentStep > step.num ? <Check size={14} /> : step.num}
              </div>
              <span
                className={cn(
                  "text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-center",
                  currentStep >= step.num
                    ? "text-charcoal"
                    : "text-charcoal-light/60",
                  currentStep === step.num && "font-medium"
                )}
              >
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[calc(100vh-160px)]">
        {/* Left - Form Area */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 pb-32 lg:pb-12 bg-cream">
          {/* Step 1: Your Details */}
          {currentStep === 1 && (
            <div className="animate-fade-in max-w-[500px]">
              <h2 className="font-display text-2xl sm:text-[32px] font-normal mb-2 text-charcoal animate-fade-in-up">
                Your Details<span className="text-gold">_</span>
              </h2>
              <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-charcoal-light animate-fade-in-up animate-delay-100">
                Enter your information to complete the purchase
              </p>

              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-in-up animate-delay-150">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("firstName")}
                      className={cn(
                        "w-full p-3.5 sm:p-4 text-sm sm:text-[15px] bg-white border outline-none transition-colors duration-300 text-charcoal placeholder:text-charcoal-light/60",
                        errors.firstName && touched.firstName
                          ? "border-error"
                          : "border-border focus:border-gold"
                      )}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 text-error animate-fade-in">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("lastName")}
                      className={cn(
                        "w-full p-3.5 sm:p-4 text-sm sm:text-[15px] bg-white border outline-none transition-colors duration-300 text-charcoal placeholder:text-charcoal-light/60",
                        errors.lastName && touched.lastName
                          ? "border-error"
                          : "border-border focus:border-gold"
                      )}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 text-error animate-fade-in">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="animate-fade-in-up animate-delay-200">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    className={cn(
                      "w-full p-3.5 sm:p-4 text-sm sm:text-[15px] bg-white border outline-none transition-colors duration-300 text-charcoal placeholder:text-charcoal-light/60",
                      errors.email && touched.email
                        ? "border-error"
                        : "border-border focus:border-gold"
                    )}
                  />
                  {errors.email && touched.email && (
                    <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 text-error animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="animate-fade-in-up animate-delay-250">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                    className={cn(
                      "w-full p-3.5 sm:p-4 text-sm sm:text-[15px] bg-white border outline-none transition-colors duration-300 text-charcoal placeholder:text-charcoal-light/60",
                      errors.phone && touched.phone
                        ? "border-error"
                        : "border-border focus:border-gold"
                    )}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 text-error animate-fade-in">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Security Note */}
                <div className="p-4 flex items-start gap-3 bg-gold/[0.08] border border-gold/20 animate-fade-in-up animate-delay-300">
                  <ShieldIcon size={16} />
                  <div>
                    <p className="text-sm mb-0.5 text-charcoal">
                      Your information is secure
                    </p>
                    <p className="text-[11px] sm:text-xs text-charcoal-light">
                      We use industry-standard encryption to protect your data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div className="animate-fade-in max-w-[500px]">
              <h2 className="font-display text-2xl sm:text-[32px] font-normal mb-2 text-charcoal animate-fade-in-up">
                Payment Method<span className="text-gold">_</span>
              </h2>
              <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-charcoal-light animate-fade-in-up animate-delay-100">
                Choose how you'd like to pay
              </p>

              <div className="flex flex-col gap-3">
                {paymentMethods.map((method, idx) => {
                  const isSelected = selectedPayment === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={cn(
                        "p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 bg-white border active:scale-[0.99] animate-fade-in-up",
                        isSelected
                          ? "border-gold border-l-[3px] bg-gold/[0.08]"
                          : "border-border hover:border-gold/50"
                      )}
                      style={{ animationDelay: `${(idx + 2) * 50}ms` }}
                    >
                      {/* Radio */}
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border-2",
                          isSelected ? "border-gold" : "border-border"
                        )}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          method.bgClass,
                          method.color
                        )}
                      >
                        {method.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className="text-sm sm:text-[15px] font-medium mb-0.5 text-charcoal">
                          {method.name}
                        </p>
                        <p className="text-[11px] sm:text-xs text-charcoal-light">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Details */}
              {selectedPayment === "card" && (
                <div className="mt-6 p-5 bg-white border border-border animate-scale-in">
                  <p className="text-[10px] tracking-[0.1em] uppercase mb-4 text-gold">
                    Card Details
                  </p>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-3.5 text-sm bg-cream border border-border text-charcoal outline-none focus:border-gold transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full p-3.5 text-sm bg-cream border border-border text-charcoal outline-none focus:border-gold transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full p-3.5 text-sm bg-cream border border-border text-charcoal outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-charcoal-light">
                    <LockIcon size={14} />
                    <span className="text-xs">Secured by Stripe</span>
                  </div>
                </div>
              )}

              {/* BNPL Note */}
              {selectedPayment !== "card" && (
                <div className="mt-6 p-4 bg-cream border border-border animate-fade-in">
                  <p className="text-xs text-charcoal-light">
                    You'll be redirected to{" "}
                    {paymentMethods.find((m) => m.id === selectedPayment)?.name}{" "}
                    to complete your payment securely.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="max-w-[600px] animate-fade-in">
              <div className="text-center mb-8 sm:mb-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gold/15 animate-scale-in">
                  <CheckCircle size={48} className="text-gold" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-normal mt-5 sm:mt-6 mb-2 text-charcoal animate-fade-in-up animate-delay-100">
                  Review Your Order<span className="text-gold">_</span>
                </h2>
                <p className="text-sm sm:text-[15px] text-charcoal-light animate-fade-in-up animate-delay-150">
                  Please confirm your purchase details
                </p>
              </div>

              <div className="p-5 sm:p-8 bg-white border border-border animate-fade-in-up animate-delay-200">
                {/* Packages */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-border">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.1em] uppercase mb-3 text-gold">
                    Packages
                  </p>
                  {cartPackages.map((pkg) => (
                    <div key={pkg.id} className="flex justify-between mb-2">
                      <div>
                        <span className="text-sm sm:text-[15px] text-charcoal">
                          {pkg.name} Package
                        </span>
                        <span className="text-xs ml-2 text-charcoal-light">
                          ({pkg.sessions + pkg.bonus} sessions)
                        </span>
                      </div>
                      <span className="text-sm sm:text-[15px] text-charcoal-light">
                        ${calculatePackageTotal(pkg)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-border">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.1em] uppercase mb-2 sm:mb-3 text-gold">
                    Your Information
                  </p>
                  <p className="text-sm sm:text-[15px] mb-1 text-charcoal">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-xs sm:text-sm mb-0.5 text-charcoal-light">
                    {formData.email}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-light">
                    {formData.phone}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-border">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.1em] uppercase mb-2 sm:mb-3 text-gold">
                    Payment Method
                  </p>
                  <p className="text-sm sm:text-[15px] text-charcoal">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                  </p>
                </div>

                {/* Total */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-charcoal-light">
                      Subtotal
                    </span>
                    <span className="text-sm text-charcoal-light">
                      ${totals.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-gold">Package Savings</span>
                    <span className="text-sm text-gold">
                      -${totals.savings}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="text-base font-medium text-charcoal">
                      Total
                    </span>
                    <span className="font-display text-2xl text-charcoal">
                      ${totals.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs mt-4 text-center text-charcoal-light animate-fade-in-up animate-delay-300">
                By completing this purchase, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-charcoal transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-charcoal transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-10 max-w-[600px]">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="order-2 sm:order-1 px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium text-charcoal-light hover:text-charcoal transition-colors"
              >
                ← Back
              </button>
            )}

            {currentStep < 3 && (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="order-1 sm:order-2 w-full sm:w-auto"
                size="lg"
              >
                Continue →
              </Button>
            )}

            {currentStep === 3 && (
              <Button
                onClick={handleConfirmPurchase}
                disabled={isSubmitting}
                isLoading={isSubmitting}
                loadingText="Processing..."
                leftIcon={!isSubmitting ? <LockIcon size={14} /> : undefined}
                className="order-1 sm:order-2 flex-1"
                size="lg"
              >
                Complete Purchase · ${totals.total}
              </Button>
            )}
          </div>
        </div>

        {/* Right - Summary Panel (Desktop only) */}
        <div className="hidden lg:block px-8 py-12 bg-white border-l border-border sticky top-0 h-fit max-h-[calc(100vh-160px)] overflow-y-auto animate-fade-in-up animate-delay-200">
          <h3 className="text-[11px] tracking-[0.15em] uppercase mb-5 text-charcoal-light">
            Order Summary
          </h3>

          {/* Packages */}
          <div className="p-5 mb-5 bg-cream">
            {cartPackages.map((pkg) => (
              <div key={pkg.id} className="mb-4 last:mb-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gold/15 text-gold">
                    <PackageIcon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-0.5 text-charcoal">
                      {pkg.name} Package
                    </p>
                    <p className="text-xs text-charcoal-light">
                      {pkg.sessions + pkg.bonus} sessions
                    </p>
                  </div>
                  <p className="font-display text-lg text-charcoal">
                    ${calculatePackageTotal(pkg)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between">
              <span className="text-sm text-charcoal-light">
                Subtotal ({totals.totalSessions} sessions)
              </span>
              <span className="text-sm text-charcoal-light">
                ${totals.subtotal}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gold">Package Savings</span>
              <span className="text-sm text-gold">-${totals.savings}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between pt-4 mb-6 border-t border-border">
            <span className="text-base font-medium text-charcoal">Total</span>
            <span className="font-display text-[28px] text-charcoal">
              ${totals.total}
            </span>
          </div>

          {/* Benefits */}
          <div className="p-4 mb-5 bg-cream">
            <p className="text-[10px] tracking-[0.1em] uppercase mb-3 text-charcoal-light">
              Package Benefits
            </p>
            <div className="space-y-2">
              {[
                "Credits never expire",
                "Book anytime online",
                "Priority scheduling",
                "Transferable between services",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-gold text-white">
                    <Check size={10} />
                  </div>
                  <span className="text-xs text-charcoal">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 text-center text-charcoal-light">
            <LockIcon size={14} />
            <span className="text-xs">Secure checkout powered by Stripe</span>
          </div>
        </div>
      </main>

      {/* Mobile Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        {/* Expandable Summary Drawer */}
        {showMobileSummary && (
          <div className="border-b border-border px-4 py-4 max-h-[50vh] overflow-y-auto bg-cream">
            <div className="mb-3">
              <p className="text-[10px] tracking-[0.1em] uppercase mb-2 text-gold">
                Your Packages
              </p>
              {cartPackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between mb-1">
                  <span className="text-sm text-charcoal">
                    {pkg.name} Package
                  </span>
                  <span className="text-sm text-charcoal-light">
                    ${calculatePackageTotal(pkg)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-charcoal-light">Subtotal</span>
                <span className="text-xs text-charcoal-light">
                  ${totals.subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gold">Savings</span>
                <span className="text-xs text-gold">-${totals.savings}</span>
              </div>
            </div>
          </div>
        )}

        {/* Summary Bar */}
        <div
          className="px-4 py-3 flex items-center justify-between cursor-pointer"
          onClick={() => setShowMobileSummary(!showMobileSummary)}
        >
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] tracking-[0.08em] uppercase text-charcoal-light">
                {cartPackages.length} package
                {cartPackages.length > 1 ? "s" : ""} · {totals.totalSessions}{" "}
                sessions
              </p>
              <p className="font-display text-xl text-charcoal">
                ${totals.total}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-charcoal-light">
            <span className="text-[11px] uppercase tracking-wide">
              {showMobileSummary ? "Hide" : "Details"}
            </span>
            {showMobileSummary ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Loading Fallback
// ===========================================

function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <Spinner size={32} className="mx-auto mb-4 text-gold" />
        <p className="text-charcoal-light">Loading checkout...</p>
      </div>
    </div>
  );
}

// ===========================================
// Main Export
// ===========================================

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}