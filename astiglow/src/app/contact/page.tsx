// src/app/contact/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { businessInfo } from "@/lib/data/business";

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

const MapPinIcon = ({ size = 22 }: { size?: number }) => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = ({ size = 22 }: { size?: number }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ size = 22 }: { size?: number }) => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const InstagramIcon = ({ size = 22 }: { size?: number }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ClockIcon = ({ size = 16 }: { size?: number }) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRightIcon = ({ size = 16 }: { size?: number }) => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ExternalLinkIcon = ({ size = 14 }: { size?: number }) => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C9A27C"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ===========================================
// Data
// ===========================================

const contactMethods = [
  {
    icon: MapPinIcon,
    label: "LOCATION",
    primary: "10880 Wilshire Blvd, Suite 402",
    secondary: "Los Angeles, CA 90024",
    href: "https://maps.google.com/?q=10880+Wilshire+Blvd+Suite+402+Los+Angeles+CA+90024",
    isExternal: true,
  },
  {
    icon: PhoneIcon,
    label: "PHONE",
    primary: "(310) 309-7901",
    secondary: "Call or text anytime",
    href: "tel:+13103097901",
    isExternal: false,
  },
  {
    icon: MailIcon,
    label: "EMAIL",
    primary: "hello@astiglow.com",
    secondary: "Response within 24 hours",
    href: "mailto:hello@astiglow.com",
    isExternal: false,
  },
  {
    icon: InstagramIcon,
    label: "INSTAGRAM",
    primary: "@astiglow_",
    secondary: "DM for quick questions",
    href: "https://instagram.com/astiglow_",
    isExternal: true,
  },
];

const inquiryTypes = [
  { value: "", label: "Select a topic..." },
  { value: "booking", label: "Booking Question" },
  { value: "services", label: "Service Information" },
  { value: "packages", label: "Package Inquiry" },
  { value: "reschedule", label: "Reschedule/Cancel" },
  { value: "other", label: "Something Else" },
];

const quickFaqs = [
  {
    question: "What should I do before my appointment?",
    answer:
      "Hair should be at least 1/4 inch long. Exfoliate gently 24 hours before, but avoid lotions on the day of your appointment.",
  },
  {
    question: "How do I reschedule?",
    answer:
      "You can reschedule by calling/texting (310) 309-7901 or through your booking confirmation email. Please give at least 24 hours notice.",
  },
  {
    question: "Do you offer group bookings?",
    answer:
      "Yes! Contact us for group appointments like bridal parties or special events.",
  },
];

// ===========================================
// Contact Page Component
// ===========================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll animation refs
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.1);
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation(0.2);
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1);
  const { ref: bannerRef, isVisible: bannerVisible } = useScrollAnimation(0.2);
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation(0.2);

  const maxMessageLength = 500;

  // Validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Please enter a valid email";
      case "inquiryType":
        return value ? "" : "Please select a topic";
      case "message":
        if (!value.trim()) return "Message is required";
        return value.trim().length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (name: string) => {
    setFocusedField(null);
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, formData[name as keyof typeof formData]) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: Record<string, string> = {};
    ["name", "email", "inquiryType", "message"].forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, inquiryType: true, message: true });

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    setTouched({});
    setErrors({});
  };

  return (
    <>
      <Navbar />

      <main className="pt-[72px] md:pt-[84px]">
        {/* Main Content - Split Layout */}
        <section className="min-h-[calc(100vh-84px)] grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Contact Info */}
          <div className="bg-white px-6 md:px-12 lg:px-16 xl:px-20 py-12 lg:py-16">
            {/* Header Section */}
            <div ref={heroRef}>
              {/* Eyebrow */}
              <p
                className={`text-xs tracking-[0.2em] uppercase text-gold font-medium mb-5 transition-all duration-700 ${
                  heroVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Get In Touch
              </p>

              {/* Heading */}
              <h1
                className={`font-display text-[36px] md:text-[42px] lg:text-[48px] text-charcoal leading-[1.15] mb-4 transition-all duration-700 delay-100 ${
                  heroVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Let's <span className="italic">Connect</span>
                <span className="text-gold">_</span>
              </h1>

              {/* Description */}
              <p
                className={`text-[15px] text-charcoal-light leading-[1.8] mb-6 max-w-[400px] transition-all duration-700 delay-200 ${
                  heroVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Have questions about services, booking, or anything else? I'd love
                to hear from you.
              </p>

              {/* Response Time Badge */}
              <div
                className={`mb-10 transition-all duration-700 delay-300 ${
                  heroVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-95"
                }`}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full text-xs text-gold font-medium">
                  <ClockIcon size={14} />
                  Usually responds within 4 hours
                </span>
              </div>
            </div>

            {/* Contact Method Cards */}
            <div ref={cardsRef} className="flex flex-col gap-4 mb-12">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    target={method.isExternal ? "_blank" : undefined}
                    rel={method.isExternal ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-4 p-5 bg-white border border-border rounded hover:border-gold hover:translate-x-1 hover:shadow-[0_4px_20px_rgba(45,42,38,0.06)] transition-all duration-700 ${
                      cardsVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms" }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full bg-cream flex items-center justify-center text-gold flex-shrink-0 transition-transform duration-500 ${
                        cardsVisible ? "scale-100" : "scale-0"
                      }`}
                      style={{ transitionDelay: cardsVisible ? `${index * 100 + 150}ms` : "0ms" }}
                    >
                      <IconComponent size={22} />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p className="text-[11px] tracking-[0.1em] text-gold mb-1">
                        {method.label}
                      </p>
                      <p className="text-[15px] text-charcoal mb-0.5">
                        {method.primary}
                      </p>
                      <p className="text-[13px] text-charcoal-light">
                        {method.secondary}
                      </p>
                    </div>

                    {/* Action Icon */}
                    <div className="text-gold opacity-50 group-hover:opacity-100 transition-opacity">
                      {method.isExternal ? (
                        <ExternalLinkIcon size={16} />
                      ) : (
                        <ArrowRightIcon size={16} />
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Quick Answers FAQ */}
            <div ref={faqRef}>
              <p
                className={`text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-4 transition-all duration-700 ${
                  faqVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Quick Answers
              </p>

              <div className="border-t border-border">
                {quickFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`border-b border-border transition-all duration-700 ${
                      faqVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: faqVisible ? `${index * 100 + 100}ms` : "0ms" }}
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                      className="w-full py-5 flex items-center justify-between text-left"
                    >
                      <span className="text-sm text-charcoal pr-4">
                        {faq.question}
                      </span>
                      <ChevronDownIcon isOpen={expandedFaq === index} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedFaq === index
                          ? "max-h-40 pb-5"
                          : "max-h-0"
                      }`}
                    >
                      <p className="text-[13px] text-charcoal-light leading-[1.7]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div
            ref={formRef}
            className="bg-cream px-6 md:px-12 lg:px-16 xl:px-20 py-12 lg:py-16 flex items-start justify-center"
          >
            <div
              className={`w-full max-w-[480px] bg-white border border-border p-8 md:p-12 transition-all duration-700 ${
                formVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {!isSubmitted ? (
                <>
                  {/* Form Header */}
                  <h2
                    className={`font-display text-[28px] text-charcoal mb-2 transition-all duration-700 delay-100 ${
                      formVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    Send a Message
                  </h2>
                  <p
                    className={`text-sm text-charcoal-light mb-8 transition-all duration-700 delay-200 ${
                      formVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    Fill out the form below and I'll get back to you soon.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div
                      className={`relative mb-6 transition-all duration-700 delay-[250ms] ${
                        formVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => handleBlur("name")}
                        className={`w-full py-4 text-[15px] text-charcoal bg-transparent border-b outline-none transition-colors duration-300 placeholder:text-charcoal-light/60 ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : focusedField === "name"
                            ? "border-gold"
                            : "border-border"
                        }`}
                      />
                      {/* Floating Label */}
                      {(focusedField === "name" || formData.name) && (
                        <span className="absolute -top-2 left-0 text-[10px] tracking-[0.1em] text-gold">
                          YOUR NAME
                        </span>
                      )}
                      {errors.name && touched.name && (
                        <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div
                      className={`relative mb-6 transition-all duration-700 delay-[300ms] ${
                        formVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => handleBlur("email")}
                        className={`w-full py-4 text-[15px] text-charcoal bg-transparent border-b outline-none transition-colors duration-300 placeholder:text-charcoal-light/60 ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : focusedField === "email"
                            ? "border-gold"
                            : "border-border"
                        }`}
                      />
                      {(focusedField === "email" || formData.email) && (
                        <span className="absolute -top-2 left-0 text-[10px] tracking-[0.1em] text-gold">
                          EMAIL ADDRESS
                        </span>
                      )}
                      {errors.email && touched.email && (
                        <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div
                      className={`relative mb-6 transition-all duration-700 delay-[350ms] ${
                        formVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full py-4 text-[15px] text-charcoal bg-transparent border-b outline-none transition-colors duration-300 placeholder:text-charcoal-light/60 ${
                          focusedField === "phone" ? "border-gold" : "border-border"
                        }`}
                      />
                      {(focusedField === "phone" || formData.phone) && (
                        <span className="absolute -top-2 left-0 text-[10px] tracking-[0.1em] text-gold">
                          PHONE NUMBER
                        </span>
                      )}
                    </div>

                    {/* Inquiry Type Dropdown */}
                    <div
                      className={`relative mb-6 transition-all duration-700 delay-[400ms] ${
                        formVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("inquiryType")}
                        onBlur={() => handleBlur("inquiryType")}
                        className={`w-full py-4 text-[15px] bg-transparent border-b outline-none transition-colors duration-300 appearance-none cursor-pointer ${
                          formData.inquiryType ? "text-charcoal" : "text-charcoal-light/60"
                        } ${
                          errors.inquiryType && touched.inquiryType
                            ? "border-red-500"
                            : focusedField === "inquiryType"
                            ? "border-gold"
                            : "border-border"
                        }`}
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {/* Dropdown Arrow */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-light">
                        <ChevronDownIcon isOpen={false} />
                      </div>
                      {(focusedField === "inquiryType" || formData.inquiryType) && (
                        <span className="absolute -top-2 left-0 text-[10px] tracking-[0.1em] text-gold">
                          WHAT CAN WE HELP WITH?
                        </span>
                      )}
                      {errors.inquiryType && touched.inquiryType && (
                        <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                          {errors.inquiryType}
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div
                      className={`relative mb-6 transition-all duration-700 delay-[450ms] ${
                        formVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      <textarea
                        name="message"
                        placeholder="Your Message *"
                        rows={4}
                        maxLength={maxMessageLength}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => handleBlur("message")}
                        className={`w-full py-4 text-[15px] text-charcoal bg-transparent border-b outline-none transition-colors duration-300 placeholder:text-charcoal-light/60 resize-none ${
                          errors.message && touched.message
                            ? "border-red-500"
                            : focusedField === "message"
                            ? "border-gold"
                            : "border-border"
                        }`}
                      />
                      {(focusedField === "message" || formData.message) && (
                        <span className="absolute -top-2 left-0 text-[10px] tracking-[0.1em] text-gold">
                          YOUR MESSAGE
                        </span>
                      )}
                      {/* Character Count */}
                      <span className="absolute -bottom-5 right-0 text-[11px] text-charcoal-light/60">
                        {formData.message.length}/{maxMessageLength}
                      </span>
                      {errors.message && touched.message && (
                        <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`mt-4 w-full py-4 bg-charcoal text-cream text-xs tracking-[0.12em] uppercase font-medium hover:bg-gold transition-all duration-700 delay-[500ms] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        formVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-10">
                  <div className="mb-6 animate-[scaleIn_0.4s_ease]">
                    <CheckCircleIcon />
                  </div>
                  <h2 className="font-display text-[28px] text-charcoal mb-3">
                    Message Sent<span className="text-gold">!</span>
                  </h2>
                  <p className="text-[15px] text-charcoal-light leading-[1.7] mb-8">
                    Thank you for reaching out! I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-8 py-3.5 border border-charcoal text-charcoal text-xs tracking-[0.1em] uppercase font-medium hover:bg-charcoal hover:text-cream transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Business Hours Banner */}
        <section ref={bannerRef} className="py-16 px-6 md:px-12 lg:px-20 bg-charcoal">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hours */}
            <div
              className={`transition-all duration-700 ${
                bannerVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <p className="text-[11px] tracking-[0.15em] uppercase text-gold mb-4">
                Business Hours
              </p>
              <p className="font-display text-2xl text-cream leading-[1.6]">
                Monday – Wednesday: 9am – 8pm
                <br />
                Thursday – Sunday: 9am – 5pm
              </p>
            </div>

            {/* Book CTA */}
            <div
              className={`md:text-right transition-all duration-700 delay-200 ${
                bannerVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <p className="text-[11px] tracking-[0.15em] uppercase text-gold mb-4">
                Ready to Book?
              </p>
              <p className="font-display text-2xl text-cream mb-6">
                Skip the form, book directly
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-cream text-cream text-xs tracking-[0.1em] uppercase font-medium hover:bg-cream hover:text-charcoal transition-colors duration-300"
              >
                Book Appointment
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section ref={mapRef} className="h-[400px] bg-[#F0EDE8] relative overflow-hidden">
          {/* Stylized Map Background */}
          <div className="absolute inset-0">
            {/* Grid Pattern */}
            <svg
              width="100%"
              height="100%"
              className={`absolute transition-opacity duration-1000 ${
                mapVisible ? "opacity-30" : "opacity-0"
              }`}
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#D0CCC5"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Location Pin Indicator */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-300 ${
                mapVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gold/40 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-gold" />
                </div>
              </div>
            </div>

            {/* Neighborhood Labels */}
            <span
              className={`absolute top-[30%] left-[20%] text-xs tracking-[0.1em] text-charcoal-light/50 transition-all duration-700 delay-500 ${
                mapVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              WESTWOOD
            </span>
            <span
              className={`absolute top-[60%] right-[25%] text-xs tracking-[0.1em] text-charcoal-light/50 transition-all duration-700 delay-600 ${
                mapVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              UCLA
            </span>
            <span
              className={`absolute bottom-[25%] left-[35%] text-xs tracking-[0.1em] text-charcoal-light/50 transition-all duration-700 delay-700 ${
                mapVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              WILSHIRE BLVD
            </span>
          </div>

          {/* Address Card */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-12 py-8 shadow-[0_20px_60px_rgba(45,42,38,0.15)] text-center z-10 transition-all duration-700 delay-200 ${
              mapVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <p className="font-display text-2xl text-charcoal mb-2">
              10880 Wilshire Blvd, Suite 402
            </p>
            <p className="text-sm text-charcoal-light mb-5">
              Los Angeles, CA 90024
            </p>
            <a
              href="https://maps.google.com/?q=10880+Wilshire+Blvd+Suite+402+Los+Angeles+CA+90024"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-gold font-medium hover:opacity-70 transition-opacity"
            >
              Open in Google Maps
              <ExternalLinkIcon size={12} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}