"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getPackagesByIds,
  calculatePackageTotal,
  calculateCartTotals,
} from "@/lib/data/packages";
import type { Package } from "@/types";

// ===========================================
// Icons
// ===========================================

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C4A484" strokeWidth="1.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
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
  bgColor: string;
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
    icon: <CreditCardIcon />,
    color: "#2D2A26",
    bgColor: "transparent",
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "Pay in 4 interest-free payments",
    icon: <span className="font-semibold text-lg">K</span>,
    color: "#FFB3C7",
    bgColor: "rgba(255, 179, 199, 0.1)",
  },
  {
    id: "affirm",
    name: "Affirm",
    description: "Monthly payments, 0% APR available",
    icon: <span className="font-semibold text-lg">A</span>,
    color: "#0FA0EA",
    bgColor: "rgba(15, 160, 234, 0.1)",
  },
  {
    id: "afterpay",
    name: "Afterpay",
    description: "Pay in 4 interest-free payments",
    icon: <span className="font-semibold text-lg">A</span>,
    color: "#00C2A0",
    bgColor: "rgba(0, 194, 160, 0.1)",
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
        return value.replace(/\D/g, "").length >= 10 ? "" : "Please enter a valid phone number";
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
    setErrors({ ...errors, [name]: validateField(name, formData[name as keyof typeof formData]) });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const newErrors: Record<string, string> = {};
      ["firstName", "lastName", "email", "phone"].forEach((key) => {
        const error = validateField(key, formData[key as keyof typeof formData]);
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
    if (currentStep === 1) return true; // Validation happens on next
    if (currentStep === 2) return !!selectedPayment;
    return true;
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="text-center">
          <div 
            className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
            style={{ 
              border: "2px solid #E5DED6",
              borderTopColor: "#C4A484"
            }}
          />
          <p style={{ color: "#6B6560" }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Confirmed state
  if (isConfirmed) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAFAF8" }}>
        <style jsx global>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
          .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
          .animate-bounce-once { animation: bounce 0.5s ease-out 0.3s; }
          .stagger-1 { animation-delay: 0.1s; opacity: 0; }
          .stagger-2 { animation-delay: 0.2s; opacity: 0; }
          .stagger-3 { animation-delay: 0.3s; opacity: 0; }
          .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        `}</style>
        
        <header
          className="px-4 sm:px-6 md:px-16 py-4 sm:py-5 flex justify-between items-center bg-white"
          style={{ borderBottom: "1px solid #E5DED6" }}
        >
          <Link
            href="/"
            className="font-display text-2xl sm:text-[28px] font-medium tracking-wide"
            style={{ color: "#2D2A26" }}
          >
            Astiglow<span style={{ color: "#C4A484" }}>_</span>
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center max-w-md w-full">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 animate-scale-in animate-bounce-once"
              style={{ backgroundColor: "rgba(196, 164, 132, 0.15)" }}
            >
              <CheckCircleIcon />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl mb-3 sm:mb-4 animate-fade-in-up stagger-1" style={{ color: "#2D2A26" }}>
              Purchase Complete!
            </h1>
            <p className="text-sm sm:text-base mb-2 animate-fade-in-up stagger-2" style={{ color: "#6B6560" }}>
              Thank you for your purchase. Your package credits have been added to your account.
            </p>
            <p className="text-xs mb-6 sm:mb-8 animate-fade-in-up stagger-2" style={{ color: "#C4A484" }}>
              Order #{orderNumber}
            </p>

            <div
              className="p-4 sm:p-6 mb-6 sm:mb-8 text-left animate-fade-in-up stagger-3"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}
            >
              <p className="text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: "#C4A484" }}>
                Your Packages
              </p>
              {cartPackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between mb-2">
                  <div>
                    <span className="text-sm sm:text-base" style={{ color: "#2D2A26" }}>{pkg.name} Package</span>
                    <span className="text-xs ml-2" style={{ color: "#6B6560" }}>
                      {pkg.sessions + pkg.bonus} sessions
                    </span>
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: "#6B6560" }}>${calculatePackageTotal(pkg)}</span>
                </div>
              ))}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 flex justify-between" style={{ borderTop: "1px solid #E5DED6" }}>
                <span className="font-medium" style={{ color: "#2D2A26" }}>Total Paid</span>
                <span className="font-display text-xl" style={{ color: "#2D2A26" }}>${totals.total}</span>
              </div>
            </div>

            <p className="text-xs mb-6 animate-fade-in-up stagger-3" style={{ color: "#6B6560" }}>
              A confirmation email has been sent to {formData.email}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up stagger-4">
              <Link href="/book" className="flex-1">
                <button
                  className="w-full px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:bg-[#C4A484] active:bg-[#C4A484] min-h-[48px]"
                  style={{ backgroundColor: "#2D2A26", color: "#FFFFFF" }}
                >
                  Book Appointment
                </button>
              </Link>
              <Link href="/" className="flex-1">
                <button
                  className="w-full px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300 min-h-[48px]"
                  style={{ backgroundColor: "transparent", color: "#6B6560", border: "1px solid #E5DED6" }}
                >
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
        .stagger-1 { animation-delay: 0.05s; opacity: 0; }
        .stagger-2 { animation-delay: 0.1s; opacity: 0; }
        .stagger-3 { animation-delay: 0.15s; opacity: 0; }
        .stagger-4 { animation-delay: 0.2s; opacity: 0; }
        .stagger-5 { animation-delay: 0.25s; opacity: 0; }
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
          href="/cart"
          className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors hover:opacity-70 active:opacity-70"
          style={{ color: "#6B6560" }}
        >
          ← <span className="hidden sm:inline">Back to cart</span><span className="sm:hidden">Cart</span>
        </Link>
      </header>

      {/* Progress Steps */}
      <div
        className="px-4 sm:px-6 md:px-16 py-5 sm:py-8 bg-white animate-fade-in-up stagger-1"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <div className="max-w-[500px] mx-auto flex justify-between items-center relative">
          {/* Progress Line */}
          <div
            className="absolute top-[14px] sm:top-[18px] left-[30px] sm:left-[50px] right-[30px] sm:right-[50px] h-0.5 z-0"
            style={{ backgroundColor: "#E5DED6" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / 2) * 100}%`,
                backgroundColor: "#C4A484",
              }}
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
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: currentStep >= step.num ? "#C4A484" : "#FFFFFF",
                  border: `2px solid ${currentStep >= step.num ? "#C4A484" : "#E5DED6"}`,
                  color: currentStep >= step.num ? "#FFFFFF" : "#6B6560",
                }}
              >
                {currentStep > step.num ? <CheckIcon /> : step.num}
              </div>
              <span
                className="text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-center"
                style={{
                  color: currentStep >= step.num ? "#2D2A26" : "#A0A0A0",
                  fontWeight: currentStep === step.num ? 500 : 400,
                }}
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
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 pb-32 lg:pb-12" style={{ backgroundColor: "#FAFAF8" }}>
          {/* Step 1: Your Details */}
          {currentStep === 1 && (
            <div className="animate-fade-in max-w-[500px]">
              <h2 className="font-display text-2xl sm:text-[32px] font-normal mb-2 animate-fade-in-up" style={{ color: "#2D2A26" }}>
                Your Details<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in-up stagger-1" style={{ color: "#6B6560" }}>
                Enter your information to complete the purchase
              </p>

              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-in-up stagger-2">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("firstName")}
                      className="w-full p-3.5 sm:p-4 text-sm sm:text-[15px] outline-none transition-colors duration-300"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${errors.firstName && touched.firstName ? "#D64545" : "#E5DED6"}`,
                        color: "#2D2A26",
                      }}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
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
                      className="w-full p-3.5 sm:p-4 text-sm sm:text-[15px] outline-none transition-colors duration-300"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${errors.lastName && touched.lastName ? "#D64545" : "#E5DED6"}`,
                        color: "#2D2A26",
                      }}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="animate-fade-in-up stagger-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    className="w-full p-3.5 sm:p-4 text-sm sm:text-[15px] outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${errors.email && touched.email ? "#D64545" : "#E5DED6"}`,
                      color: "#2D2A26",
                    }}
                  />
                  {errors.email && touched.email && (
                    <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="animate-fade-in-up stagger-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                    className="w-full p-3.5 sm:p-4 text-sm sm:text-[15px] outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${errors.phone && touched.phone ? "#D64545" : "#E5DED6"}`,
                      color: "#2D2A26",
                    }}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-[11px] sm:text-xs mt-1 sm:mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Security Note */}
                <div
                  className="p-4 flex items-start gap-3 animate-fade-in-up stagger-5"
                  style={{
                    backgroundColor: "rgba(196, 164, 132, 0.08)",
                    border: "1px solid rgba(196, 164, 132, 0.2)",
                  }}
                >
                  <ShieldIcon />
                  <div>
                    <p className="text-sm mb-0.5" style={{ color: "#2D2A26" }}>
                      Your information is secure
                    </p>
                    <p className="text-[11px] sm:text-xs" style={{ color: "#6B6560" }}>
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
              <h2 className="font-display text-2xl sm:text-[32px] font-normal mb-2 animate-fade-in-up" style={{ color: "#2D2A26" }}>
                Payment Method<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in-up stagger-1" style={{ color: "#6B6560" }}>
                Choose how you'd like to pay
              </p>

              <div className="flex flex-col gap-3">
                {paymentMethods.map((method, idx) => {
                  const isSelected = selectedPayment === method.id;
                  const staggerClass = `stagger-${idx + 2}`;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 animate-fade-in-up ${staggerClass} active:scale-[0.99]`}
                      style={{
                        backgroundColor: isSelected ? "rgba(196, 164, 132, 0.08)" : "#FFFFFF",
                        border: "1px solid",
                        borderColor: isSelected ? "#C4A484" : "#E5DED6",
                        borderLeftWidth: isSelected ? "3px" : "1px",
                        borderLeftColor: isSelected ? "#C4A484" : "#E5DED6",
                      }}
                    >
                      {/* Radio */}
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          border: `2px solid ${isSelected ? "#C4A484" : "#D0CCC5"}`,
                        }}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#C4A484" }} />
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: method.bgColor || "transparent",
                          color: method.color,
                          border: method.id === "card" ? "1px solid #E5DED6" : "none",
                        }}
                      >
                        {method.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className="text-sm sm:text-[15px] font-medium mb-0.5" style={{ color: "#2D2A26" }}>
                          {method.name}
                        </p>
                        <p className="text-[11px] sm:text-xs" style={{ color: "#6B6560" }}>
                          {method.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Details (shown when card is selected) */}
              {selectedPayment === "card" && (
                <div className="mt-6 p-5 animate-scale-in" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}>
                  <p className="text-[10px] tracking-[0.1em] uppercase mb-4" style={{ color: "#C4A484" }}>
                    Card Details
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-3.5 text-sm outline-none transition-colors duration-300"
                      style={{ backgroundColor: "#FAFAF8", border: "1px solid #E5DED6", color: "#2D2A26" }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full p-3.5 text-sm outline-none transition-colors duration-300"
                        style={{ backgroundColor: "#FAFAF8", border: "1px solid #E5DED6", color: "#2D2A26" }}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full p-3.5 text-sm outline-none transition-colors duration-300"
                        style={{ backgroundColor: "#FAFAF8", border: "1px solid #E5DED6", color: "#2D2A26" }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4" style={{ color: "#6B6560" }}>
                    <LockIcon />
                    <span className="text-xs">Secured by Stripe</span>
                  </div>
                </div>
              )}

              {/* BNPL Note */}
              {selectedPayment !== "card" && (
                <div className="mt-6 p-4 animate-fade-in" style={{ backgroundColor: "#FAFAF8", border: "1px solid #E5DED6" }}>
                  <p className="text-xs" style={{ color: "#6B6560" }}>
                    You'll be redirected to {paymentMethods.find(m => m.id === selectedPayment)?.name} to complete your payment securely.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="max-w-[600px] animate-fade-in">
              <div className="text-center mb-8 sm:mb-10 animate-scale-in">
                <CheckCircleIcon />
                <h2 className="font-display text-3xl sm:text-4xl font-normal mt-5 sm:mt-6 mb-2 animate-fade-in-up stagger-1" style={{ color: "#2D2A26" }}>
                  Review Your Order<span style={{ color: "#C4A484" }}>_</span>
                </h2>
                <p className="text-sm sm:text-[15px] animate-fade-in-up stagger-2" style={{ color: "#6B6560" }}>
                  Please confirm your purchase details
                </p>
              </div>

              <div className="p-5 sm:p-8 animate-fade-in-up stagger-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}>
                {/* Packages */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6" style={{ borderBottom: "1px solid #E5DED6" }}>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: "#C4A484" }}>
                    Packages
                  </p>
                  {cartPackages.map((pkg) => (
                    <div key={pkg.id} className="flex justify-between mb-2">
                      <div>
                        <span className="text-sm sm:text-[15px]" style={{ color: "#2D2A26" }}>
                          {pkg.name} Package
                        </span>
                        <span className="text-xs ml-2" style={{ color: "#6B6560" }}>
                          ({pkg.sessions + pkg.bonus} sessions)
                        </span>
                      </div>
                      <span className="text-sm sm:text-[15px]" style={{ color: "#6B6560" }}>
                        ${calculatePackageTotal(pkg)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6" style={{ borderBottom: "1px solid #E5DED6" }}>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.1em] uppercase mb-2 sm:mb-3" style={{ color: "#C4A484" }}>
                    Your Information
                  </p>
                  <p className="text-sm sm:text-[15px] mb-1" style={{ color: "#2D2A26" }}>
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-xs sm:text-sm mb-0.5" style={{ color: "#6B6560" }}>
                    {formData.email}
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#6B6560" }}>
                    {formData.phone}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6" style={{ borderBottom: "1px solid #E5DED6" }}>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.1em] uppercase mb-2 sm:mb-3" style={{ color: "#C4A484" }}>
                    Payment Method
                  </p>
                  <p className="text-sm sm:text-[15px]" style={{ color: "#2D2A26" }}>
                    {paymentMethods.find(m => m.id === selectedPayment)?.name}
                  </p>
                </div>

                {/* Total */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm" style={{ color: "#6B6560" }}>Subtotal</span>
                    <span className="text-sm" style={{ color: "#6B6560" }}>${totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm" style={{ color: "#C4A484" }}>Package Savings</span>
                    <span className="text-sm" style={{ color: "#C4A484" }}>-${totals.savings}</span>
                  </div>
                  <div className="flex justify-between pt-3" style={{ borderTop: "1px solid #E5DED6" }}>
                    <span className="text-base font-medium" style={{ color: "#2D2A26" }}>Total</span>
                    <span className="font-display text-2xl" style={{ color: "#2D2A26" }}>${totals.total}</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs mt-4 text-center animate-fade-in-up stagger-4" style={{ color: "#6B6560" }}>
                By completing this purchase, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-charcoal">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="underline hover:text-charcoal">Privacy Policy</Link>
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-10">
            {currentStep > 1 && currentStep <= 3 && (
              <button
                onClick={handleBack}
                className="order-2 sm:order-1 px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium transition-colors hover:opacity-70 active:opacity-70 min-h-[48px]"
                style={{ color: "#6B6560", backgroundColor: "transparent", border: "none" }}
              >
                ← Back
              </button>
            )}

            {currentStep < 3 && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="order-1 sm:order-2 w-full sm:w-auto px-10 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:bg-[#C4A484] active:bg-[#C4A484] min-h-[48px]"
                style={{
                  backgroundColor: canProceed() ? "#2D2A26" : "#E5DED6",
                  color: "#FFFFFF",
                  cursor: canProceed() ? "pointer" : "not-allowed",
                }}
              >
                Continue →
              </button>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[600px]">
                <button
                  onClick={handleBack}
                  className="order-2 sm:order-1 px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium transition-colors hover:opacity-70 active:opacity-70 min-h-[48px]"
                  style={{ color: "#6B6560", backgroundColor: "transparent", border: "none" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  disabled={isSubmitting}
                  className="order-1 sm:order-2 flex-1 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2.5 min-h-[48px]"
                  style={{
                    backgroundColor: isSubmitting ? "#E5DED6" : "#2D2A26",
                    color: "#FFFFFF",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className="w-4 h-4 rounded-full animate-spin"
                        style={{
                          border: "2px solid rgba(250, 250, 248, 0.3)",
                          borderTopColor: "#FAFAF8",
                        }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockIcon />
                      Complete Purchase · ${totals.total}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right - Summary Panel (Desktop only) */}
        <div
          className="hidden lg:block px-8 py-12 bg-white sticky top-0 h-fit max-h-[calc(100vh-160px)] overflow-y-auto animate-slide-in-right"
          style={{ borderLeft: "1px solid #E5DED6" }}
        >
          <h3 className="text-[11px] tracking-[0.15em] uppercase mb-5 animate-fade-in-up" style={{ color: "#6B6560" }}>
            Order Summary
          </h3>

          {/* Packages */}
          <div className="p-5 mb-5 animate-fade-in-up stagger-1" style={{ backgroundColor: "#FAFAF8" }}>
            {cartPackages.map((pkg) => (
              <div key={pkg.id} className="mb-4 last:mb-0">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(196, 164, 132, 0.15)" }}
                  >
                    <PackageIcon />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-0.5" style={{ color: "#2D2A26" }}>
                      {pkg.name} Package
                    </p>
                    <p className="text-xs" style={{ color: "#6B6560" }}>
                      {pkg.sessions + pkg.bonus} sessions
                    </p>
                  </div>
                  <p className="font-display text-lg" style={{ color: "#2D2A26" }}>
                    ${calculatePackageTotal(pkg)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 mb-5 animate-fade-in-up stagger-2">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: "#6B6560" }}>Subtotal ({totals.totalSessions} sessions)</span>
              <span className="text-sm" style={{ color: "#6B6560" }}>${totals.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: "#C4A484" }}>Package Savings</span>
              <span className="text-sm" style={{ color: "#C4A484" }}>-${totals.savings}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between pt-4 mb-6 animate-fade-in-up stagger-3" style={{ borderTop: "1px solid #E5DED6" }}>
            <span className="text-base font-medium" style={{ color: "#2D2A26" }}>
              Total
            </span>
            <span className="font-display text-[28px]" style={{ color: "#2D2A26" }}>
              ${totals.total}
            </span>
          </div>

          {/* Benefits */}
          <div className="p-4 mb-5 animate-fade-in-up stagger-4" style={{ backgroundColor: "#FAFAF8" }}>
            <p className="text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: "#6B6560" }}>
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
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#C4A484" }}>
                    <CheckIcon />
                  </div>
                  <span className="text-xs" style={{ color: "#2D2A26" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 text-center animate-fade-in-up stagger-5" style={{ color: "#6B6560" }}>
            <LockIcon />
            <span className="text-xs">Secure checkout powered by Stripe</span>
          </div>
        </div>
      </main>

      {/* Mobile Summary Bar (Fixed at bottom) */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 animate-slide-up"
        style={{ borderColor: "#E5DED6" }}
      >
        {/* Expandable Summary Drawer */}
        {showMobileSummary && (
          <div 
            className="border-b px-4 py-4 max-h-[50vh] overflow-y-auto"
            style={{ borderColor: "#E5DED6", backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-3">
              <p className="text-[10px] tracking-[0.1em] uppercase mb-2" style={{ color: "#C4A484" }}>
                Your Packages
              </p>
              {cartPackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between mb-1">
                  <span className="text-sm" style={{ color: "#2D2A26" }}>{pkg.name} Package</span>
                  <span className="text-sm" style={{ color: "#6B6560" }}>${calculatePackageTotal(pkg)}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-3 border-t" style={{ borderColor: "#E5DED6" }}>
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: "#6B6560" }}>Subtotal</span>
                <span className="text-xs" style={{ color: "#6B6560" }}>${totals.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: "#C4A484" }}>Savings</span>
                <span className="text-xs" style={{ color: "#C4A484" }}>-${totals.savings}</span>
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
              <p className="text-[10px] tracking-[0.08em] uppercase" style={{ color: "#6B6560" }}>
                {cartPackages.length} package{cartPackages.length > 1 ? 's' : ''} · {totals.totalSessions} sessions
              </p>
              <p className="font-display text-xl" style={{ color: "#2D2A26" }}>
                ${totals.total}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2" style={{ color: "#6B6560" }}>
            <span className="text-[11px] uppercase tracking-wide">
              {showMobileSummary ? 'Hide' : 'Details'}
            </span>
            {showMobileSummary ? <ChevronDownIcon /> : <ChevronUpIcon />}
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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="text-center">
        <div 
          className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
          style={{ 
            border: "2px solid #E5DED6",
            borderTopColor: "#C4A484"
          }}
        />
        <p style={{ color: "#6B6560" }}>Loading checkout...</p>
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