"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/data";
import type { Service } from "@/types";

// Animation hook for scroll-triggered animations
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
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

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: false },
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const categories = [
  { id: "all", label: "All" },
  { id: "face", label: "Face" },
  { id: "body", label: "Body" },
  { id: "brazilian", label: "Brazilian" },
];

const steps = [
  { num: 1, label: "Service" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Details" },
  { num: 4, label: "Confirm" },
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

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C4A484" strokeWidth="1.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Main booking content component that uses useSearchParams
function BookingContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isFirstVisit: false,
    notes: "",
    smsReminders: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Handle pre-selected service from URL parameter
  useEffect(() => {
    if (hasInitialized) return;
    
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedServices([service]);
        setCurrentStep(2); // Jump directly to date/time selection
        // Set the category filter to match the selected service
        setActiveCategory(service.category);
      }
    }
    setHasInitialized(true);
  }, [searchParams, hasInitialized]);

  // Generate next 28 days for calendar
  const calendarDays = useMemo(() => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 28; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  }, []);

  // Group calendar days by month
  const groupedDays = useMemo(() => {
    return calendarDays.reduce((acc, date) => {
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      if (!acc[monthKey]) acc[monthKey] = [];
      acc[monthKey].push(date);
      return acc;
    }, {} as Record<string, Date[]>);
  }, [calendarDays]);

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === "all") {
      return services;
    }
    return services.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const formatDate = (date: Date) => {
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const formatShortDate = (date: Date) => {
    return `${monthNames[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((sum, s) => sum + s.duration, 0);
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  };

  const getEndTime = () => {
    if (!selectedTime) return null;
    const [time, period] = selectedTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = (period === "PM" && hours !== 12 ? hours + 12 : hours) * 60 + minutes;
    if (period === "AM" && hours === 12) totalMinutes = minutes;
    totalMinutes += getTotalDuration();
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    const endPeriod = endHours >= 12 ? "PM" : "AM";
    const displayHours = endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
    return `${displayHours}:${endMinutes.toString().padStart(2, "0")} ${endPeriod}`;
  };

  const toggleService = (service: Service) => {
    if (selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: newValue });

    if (touched[name] && type !== "checkbox") {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, formData[name as keyof typeof formData] as string) });
  };

  const handleNext = () => {
    if (currentStep === 3) {
      const newErrors: Record<string, string> = {};
      ["firstName", "lastName", "email", "phone"].forEach((key) => {
        const error = validateField(key, formData[key as keyof typeof formData] as string);
        if (error) newErrors[key] = error;
      });

      setErrors(newErrors);
      setTouched({ firstName: true, lastName: true, email: true, phone: true });

      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(4);
      }
    } else if (currentStep < 4) {
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

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedServices.length > 0;
    if (currentStep === 2) return !!selectedDate && !!selectedTime;
    if (currentStep === 3) return true;
    return true;
  };

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
          className="px-6 md:px-16 py-5 flex justify-between items-center bg-white"
          style={{ borderBottom: "1px solid #E5DED6" }}
        >
          <Link
            href="/"
            className="font-display text-[28px] font-medium tracking-wide"
            style={{ color: "#2D2A26" }}
          >
            Astiglow<span style={{ color: "#C4A484" }}>_</span>
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in animate-bounce-once"
              style={{ backgroundColor: "rgba(196, 164, 132, 0.15)" }}
            >
              <CheckCircleIcon />
            </div>
            <h1 className="font-display text-4xl mb-4 animate-fade-in-up stagger-1" style={{ color: "#2D2A26" }}>
              Booking Confirmed!
            </h1>
            <p className="text-base mb-8 animate-fade-in-up stagger-2" style={{ color: "#6B6560" }}>
              Thank you for booking with Astiglow. You'll receive a confirmation
              email shortly with all the details.
            </p>

            <div
              className="p-6 mb-8 text-left animate-fade-in-up stagger-3"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}
            >
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between mb-2">
                  <span style={{ color: "#2D2A26" }}>{service.name}</span>
                  <span style={{ color: "#6B6560" }}>${service.price}</span>
                </div>
              ))}
              <div className="pt-4 mt-4" style={{ borderTop: "1px solid #E5DED6" }}>
                <p className="text-sm" style={{ color: "#2D2A26" }}>
                  {selectedDate && formatDate(selectedDate)}
                </p>
                <p className="text-sm" style={{ color: "#C4A484" }}>
                  {selectedTime} – {getEndTime()} ({getTotalDuration()} min)
                </p>
              </div>
            </div>

            <Link href="/" className="animate-fade-in-up stagger-4 inline-block">
              <button
                className="px-8 py-4 text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:bg-[#C4A484]"
                style={{ backgroundColor: "#2D2A26", color: "#FFFFFF" }}
              >
                Back to Home
              </button>
            </Link>
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
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
      `}</style>

      {/* Header */}
      <header
        className="px-6 md:px-16 py-5 flex justify-between items-center bg-white animate-fade-in"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <Link
          href="/"
          className="font-display text-[28px] font-medium tracking-wide"
          style={{ color: "#2D2A26" }}
        >
          Astiglow<span style={{ color: "#C4A484" }}>_</span>
        </Link>

        <Link
          href="/"
          className="text-sm flex items-center gap-2 transition-colors hover:opacity-70"
          style={{ color: "#6B6560" }}
        >
          ← Back to website
        </Link>
      </header>

      {/* Progress Steps */}
      <div
        className="px-6 md:px-16 py-8 bg-white animate-fade-in-up stagger-1"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <div className="max-w-[700px] mx-auto flex justify-between items-center relative">
          {/* Progress Line */}
          <div
            className="absolute top-[18px] left-[50px] right-[50px] h-0.5 z-0"
            style={{ backgroundColor: "#E5DED6" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / 3) * 100}%`,
                backgroundColor: "#C4A484",
              }}
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.num}
              onClick={() => goToStep(step.num)}
              className="flex flex-col items-center gap-2.5 z-10"
              style={{ cursor: step.num < currentStep ? "pointer" : "default" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: currentStep >= step.num ? "#C4A484" : "#FFFFFF",
                  border: `2px solid ${currentStep >= step.num ? "#C4A484" : "#E5DED6"}`,
                  color: currentStep >= step.num ? "#FFFFFF" : "#6B6560",
                }}
              >
                {currentStep > step.num ? <CheckIcon /> : step.num}
              </div>
              <span
                className="text-[11px] tracking-[0.05em] uppercase"
                style={{
                  color: currentStep >= step.num ? "#2D2A26" : "#A0A0A0",
                  fontWeight: currentStep === step.num ? 500 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[calc(100vh-160px)]">
        {/* Left - Form Area */}
        <div className="px-6 md:px-12 lg:px-16 py-12" style={{ backgroundColor: "#FAFAF8" }}>
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-[32px] font-normal mb-2 animate-fade-in-up" style={{ color: "#2D2A26" }}>
                Choose Your Service<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-sm mb-6 animate-fade-in-up stagger-1" style={{ color: "#6B6560" }}>
                Select one or more services for your appointment
              </p>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-6 animate-fade-in-up stagger-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-5 py-2.5 text-xs tracking-[0.08em] uppercase transition-all duration-300"
                    style={{
                      backgroundColor: activeCategory === cat.id ? "#2D2A26" : "transparent",
                      border: "1px solid",
                      borderColor: activeCategory === cat.id ? "#2D2A26" : "#E5DED6",
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
                  const isSelected = selectedServices.find((s) => s.id === service.id);
                  const staggerClass = `stagger-${Math.min(idx + 3, 10)}`;
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`p-4 flex justify-between items-center cursor-pointer transition-all duration-300 relative animate-fade-in-up ${staggerClass}`}
                      style={{
                        backgroundColor: isSelected ? "rgba(196, 164, 132, 0.08)" : "#FFFFFF",
                        border: "1px solid",
                        borderColor: isSelected ? "#C4A484" : "#E5DED6",
                        borderLeftWidth: isSelected ? "3px" : "1px",
                        borderLeftColor: isSelected ? "#C4A484" : "#E5DED6",
                      }}
                    >
                      {service.popular && (
                        <div
                          className="absolute -top-px right-4 px-2 py-1 text-[9px] tracking-[0.05em] font-medium uppercase"
                          style={{ backgroundColor: "#C4A484", color: "#FFFFFF" }}
                        >
                          Popular
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                          style={{
                            border: `2px solid ${isSelected ? "#C4A484" : "#D0CCC5"}`,
                            backgroundColor: isSelected ? "#C4A484" : "transparent",
                            color: "#FFFFFF",
                          }}
                        >
                          {isSelected && <CheckIcon />}
                        </div>
                        <div>
                          <p className="text-[15px] font-medium mb-0.5" style={{ color: "#2D2A26" }}>
                            {service.name}
                          </p>
                          <p className="text-xs flex items-center gap-1" style={{ color: "#6B6560" }}>
                            <ClockIcon /> {service.duration} min
                          </p>
                        </div>
                      </div>

                      <p className="font-display text-xl" style={{ color: "#2D2A26" }}>
                        ${service.price}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-[32px] font-normal mb-2 animate-fade-in-up" style={{ color: "#2D2A26" }}>
                Pick a Time<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-sm mb-8 animate-fade-in-up stagger-1" style={{ color: "#6B6560" }}>
                Choose a date and time that works for you
              </p>

              {/* Date Selection */}
              <div className="mb-10 animate-fade-in-up stagger-2">
                <p className="text-[11px] tracking-[0.1em] uppercase mb-4" style={{ color: "#6B6560" }}>
                  Select Date
                </p>

                {Object.entries(groupedDays).map(([month, days], monthIdx) => (
                  <div key={month} className={`mb-5 animate-fade-in-up stagger-${Math.min(monthIdx + 3, 10)}`}>
                    <p className="text-[13px] font-medium mb-3" style={{ color: "#2D2A26" }}>
                      {month}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {days.map((date, index) => {
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isSelected = selectedDate?.getTime() === date.getTime();
                        return (
                          <div
                            key={index}
                            onClick={() => setSelectedDate(date)}
                            className="p-3 min-w-[60px] text-center cursor-pointer transition-all duration-300 flex-shrink-0"
                            style={{
                              backgroundColor: isSelected ? "#C4A484" : "#FFFFFF",
                              border: "1px solid",
                              borderColor: isSelected ? "#C4A484" : isToday ? "#C4A484" : "#E5DED6",
                              color: isSelected ? "#FFFFFF" : "#2D2A26",
                            }}
                          >
                            <p className="text-[10px] mb-0.5 opacity-70">
                              {dayNames[date.getDay()]}
                            </p>
                            <p className="text-base font-medium">{date.getDate()}</p>
                            {isToday && (
                              <p
                                className="text-[8px] mt-0.5"
                                style={{ color: isSelected ? "#FFFFFF" : "#C4A484" }}
                              >
                                TODAY
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="animate-fade-in-up">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: "#6B6560" }}>
                      Select Time
                    </p>
                    <p className="text-[11px]" style={{ color: "#A0A0A0" }}>
                      Pacific Time (PT)
                    </p>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                    {timeSlots.map((slot, index) => {
                      const isSelected = selectedTime === slot.time;
                      const staggerClass = `stagger-${Math.min(Math.floor(index / 4) + 1, 10)}`;
                      return (
                        <div
                          key={index}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          className={`py-3.5 px-5 text-center transition-all duration-300 animate-scale-in ${staggerClass}`}
                          style={{
                            backgroundColor: !slot.available
                              ? "#F5F5F3"
                              : isSelected
                              ? "#C4A484"
                              : "#FFFFFF",
                            border: "1px solid",
                            borderColor: isSelected ? "#C4A484" : "#E5DED6",
                            color: !slot.available
                              ? "#C0BDB8"
                              : isSelected
                              ? "#FFFFFF"
                              : "#2D2A26",
                            cursor: slot.available ? "pointer" : "not-allowed",
                            textDecoration: !slot.available ? "line-through" : "none",
                          }}
                        >
                          <p className="text-[13px]">{slot.time}</p>
                        </div>
                      );
                    })}
                  </div>

                  {selectedTime && (
                    <p className="text-[13px] mt-4 flex items-center gap-1.5 animate-fade-in" style={{ color: "#6B6560" }}>
                      <ClockIcon /> Your appointment: {selectedTime} – {getEndTime()} ({getTotalDuration()} min)
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Your Details */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-[32px] font-normal mb-2 animate-fade-in-up" style={{ color: "#2D2A26" }}>
                Your Details<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-sm mb-8 animate-fade-in-up stagger-1" style={{ color: "#6B6560" }}>
                Enter your information to complete the booking
              </p>

              <div className="flex flex-col gap-5 max-w-[500px]">
                <div className="grid grid-cols-2 gap-4 animate-fade-in-up stagger-2">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("firstName")}
                      className="w-full p-4 text-[15px] outline-none transition-colors duration-300"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${errors.firstName && touched.firstName ? "#D64545" : "#E5DED6"}`,
                        color: "#2D2A26",
                      }}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-xs mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
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
                      className="w-full p-4 text-[15px] outline-none transition-colors duration-300"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${errors.lastName && touched.lastName ? "#D64545" : "#E5DED6"}`,
                        color: "#2D2A26",
                      }}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-xs mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
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
                    className="w-full p-4 text-[15px] outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${errors.email && touched.email ? "#D64545" : "#E5DED6"}`,
                      color: "#2D2A26",
                    }}
                  />
                  {errors.email && touched.email && (
                    <p className="text-xs mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
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
                    className="w-full p-4 text-[15px] outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${errors.phone && touched.phone ? "#D64545" : "#E5DED6"}`,
                      color: "#2D2A26",
                    }}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-xs mt-1.5 animate-fade-in" style={{ color: "#D64545" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* First Visit Checkbox */}
                <div className="p-5 animate-fade-in-up stagger-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFirstVisit"
                      checked={formData.isFirstVisit}
                      onChange={handleChange}
                      className="mt-0.5 w-[18px] h-[18px] accent-[#C4A484]"
                    />
                    <div>
                      <p className="text-sm mb-0.5" style={{ color: "#2D2A26" }}>
                        This is my first visit to Astiglow
                      </p>
                      <p className="text-xs" style={{ color: "#6B6560" }}>
                        We'll make sure to allow extra time for consultation
                      </p>
                    </div>
                  </label>
                </div>

                {/* Notes */}
                <textarea
                  name="notes"
                  placeholder="Anything we should know? (skin sensitivities, preferences, etc.)"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-4 text-[15px] outline-none transition-colors duration-300 resize-none animate-fade-in-up stagger-6"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5DED6",
                    color: "#2D2A26",
                  }}
                />

                {/* SMS Reminders */}
                <div
                  className="p-5 animate-fade-in-up stagger-7"
                  style={{
                    backgroundColor: "rgba(196, 164, 132, 0.08)",
                    border: "1px solid rgba(196, 164, 132, 0.2)",
                  }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsReminders"
                      checked={formData.smsReminders}
                      onChange={handleChange}
                      className="mt-0.5 w-[18px] h-[18px] accent-[#C4A484]"
                    />
                    <div>
                      <p className="text-sm mb-0.5" style={{ color: "#2D2A26" }}>
                        Send me appointment reminders via text
                      </p>
                      <p className="text-xs" style={{ color: "#6B6560" }}>
                        You'll receive a reminder 24 hours and 2 hours before your appointment
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="max-w-[600px] animate-fade-in">
              <div className="text-center mb-10 animate-scale-in">
                <CheckCircleIcon />
                <h2 className="font-display text-4xl font-normal mt-6 mb-2 animate-fade-in-up stagger-1" style={{ color: "#2D2A26" }}>
                  Review Your Booking<span style={{ color: "#C4A484" }}>_</span>
                </h2>
                <p className="text-[15px] animate-fade-in-up stagger-2" style={{ color: "#6B6560" }}>
                  Please confirm your appointment details
                </p>
              </div>

              <div className="p-8 animate-fade-in-up stagger-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}>
                {/* Services */}
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #E5DED6" }}>
                  <p className="text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: "#C4A484" }}>
                    Services
                  </p>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between mb-2">
                      <span className="text-[15px]" style={{ color: "#2D2A26" }}>
                        {service.name}
                      </span>
                      <span className="text-[15px]" style={{ color: "#6B6560" }}>
                        ${service.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Date & Time */}
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #E5DED6" }}>
                  <p className="text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: "#C4A484" }}>
                    Date & Time
                  </p>
                  <p className="text-[15px] mb-1" style={{ color: "#2D2A26" }}>
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                  <p className="text-[15px]" style={{ color: "#6B6560" }}>
                    {selectedTime} – {getEndTime()} ({getTotalDuration()} min)
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #E5DED6" }}>
                  <p className="text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: "#C4A484" }}>
                    Your Information
                  </p>
                  <p className="text-[15px] mb-1" style={{ color: "#2D2A26" }}>
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm mb-0.5" style={{ color: "#6B6560" }}>
                    {formData.email}
                  </p>
                  <p className="text-sm" style={{ color: "#6B6560" }}>
                    {formData.phone}
                  </p>
                  {formData.isFirstVisit && (
                    <p className="text-xs mt-2" style={{ color: "#C4A484" }}>
                      ★ First-time client
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <p className="text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: "#C4A484" }}>
                    Location
                  </p>
                  <p className="text-[15px] mb-1" style={{ color: "#2D2A26" }}>
                    Astiglow
                  </p>
                  <p className="text-sm" style={{ color: "#6B6560" }}>
                    10880 Wilshire Blvd, Suite 402
                    <br />
                    Los Angeles, CA 90024
                  </p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div
                className="mt-5 p-4 animate-fade-in-up stagger-4"
                style={{ backgroundColor: "#FAFAF8", border: "1px solid #E5DED6" }}
              >
                <p className="text-[13px]" style={{ color: "#6B6560" }}>
                  <strong style={{ color: "#2D2A26" }}>Cancellation Policy:</strong> Please notify us
                  at least 24 hours in advance if you need to cancel or reschedule.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-10">
            {currentStep > 1 && currentStep < 4 && (
              <button
                onClick={handleBack}
                className="px-6 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-colors hover:opacity-70"
                style={{ color: "#6B6560", backgroundColor: "transparent", border: "none" }}
              >
                ← Back
              </button>
            )}

            {currentStep < 3 && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-10 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
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
              <button
                onClick={handleNext}
                className="px-10 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:bg-[#C4A484]"
                style={{ backgroundColor: "#2D2A26", color: "#FFFFFF" }}
              >
                Review Booking →
              </button>
            )}

            {currentStep === 4 && (
              <div className="flex gap-3 w-full max-w-[600px]">
                <button
                  onClick={handleBack}
                  className="px-6 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-colors hover:opacity-70"
                  style={{ color: "#6B6560", backgroundColor: "transparent", border: "none" }}
                >
                  ← Edit Details
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="flex-1 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2.5"
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
                      Confirming...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right - Summary Panel */}
        <div
          className="hidden lg:block px-8 py-12 bg-white sticky top-0 h-fit max-h-[calc(100vh-160px)] overflow-y-auto animate-slide-in-right"
          style={{ borderLeft: "1px solid #E5DED6" }}
        >
          <h3 className="text-[11px] tracking-[0.15em] uppercase mb-5 animate-fade-in-up" style={{ color: "#6B6560" }}>
            Booking Summary
          </h3>

          {/* Summary Content */}
          <div className="p-5 mb-5 animate-fade-in-up stagger-1" style={{ backgroundColor: "#FAFAF8" }}>
            {selectedServices.length > 0 ? (
              <>
                {/* Services */}
                <div
                  className="pb-3 mb-3 cursor-pointer hover:bg-[rgba(196,164,132,0.05)] -mx-2 px-2 transition-colors"
                  style={{ borderBottom: "1px solid #E5DED6" }}
                  onClick={() => goToStep(1)}
                >
                  <p className="text-[11px] tracking-[0.1em] uppercase mb-2 flex items-center gap-1.5" style={{ color: "#C4A484" }}>
                    Services {currentStep > 1 && <EditIcon />}
                  </p>
                  {selectedServices.map((service) => (
                    <p key={service.id} className="text-sm mb-1" style={{ color: "#2D2A26" }}>
                      {service.name} <span style={{ color: "#6B6560" }}>· ${service.price}</span>
                    </p>
                  ))}
                  <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#6B6560" }}>
                    <ClockIcon /> {getTotalDuration()} min total
                  </p>
                </div>

                {/* Date & Time */}
                {selectedDate && (
                  <div
                    className="pb-3 mb-3 cursor-pointer hover:bg-[rgba(196,164,132,0.05)] -mx-2 px-2 transition-colors"
                    style={{ borderBottom: currentStep >= 3 && formData.firstName ? "1px solid #E5DED6" : "none" }}
                    onClick={() => goToStep(2)}
                  >
                    <p className="text-[11px] tracking-[0.1em] uppercase mb-2 flex items-center gap-1.5" style={{ color: "#C4A484" }}>
                      Date & Time {currentStep > 2 && <EditIcon />}
                    </p>
                    <p className="text-sm" style={{ color: "#2D2A26" }}>
                      {formatShortDate(selectedDate)}
                    </p>
                    {selectedTime && (
                      <p className="text-sm" style={{ color: "#C4A484" }}>
                        {selectedTime} – {getEndTime()}
                      </p>
                    )}
                  </div>
                )}

                {/* Contact */}
                {currentStep >= 3 && formData.firstName && (
                  <div
                    className="cursor-pointer hover:bg-[rgba(196,164,132,0.05)] -mx-2 px-2 transition-colors"
                    onClick={() => goToStep(3)}
                  >
                    <p className="text-[11px] tracking-[0.1em] uppercase mb-2 flex items-center gap-1.5" style={{ color: "#C4A484" }}>
                      Contact {currentStep > 3 && <EditIcon />}
                    </p>
                    <p className="text-sm" style={{ color: "#2D2A26" }}>
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-xs" style={{ color: "#6B6560" }}>
                      {formData.email}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm italic" style={{ color: "#6B6560" }}>
                Select a service to begin
              </p>
            )}
          </div>

          {/* Total */}
          {selectedServices.length > 0 && (
            <>
              <div className="flex justify-between pt-4 mb-6 animate-fade-in-up stagger-2" style={{ borderTop: "1px solid #E5DED6" }}>
                <span className="text-base font-medium" style={{ color: "#2D2A26" }}>
                  Total
                </span>
                <span className="font-display text-[28px]" style={{ color: "#2D2A26" }}>
                  ${getTotalPrice()}
                </span>
              </div>

              {/* Payment Options */}
              <div className="p-4 text-center mb-5 animate-fade-in-up stagger-3" style={{ backgroundColor: "#FAFAF8" }}>
                <p className="text-[10px] tracking-[0.1em] uppercase mb-2" style={{ color: "#6B6560" }}>
                  Pay Later With
                </p>
                <div className="flex justify-center gap-3">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ color: "#FFB3C7", backgroundColor: "rgba(255, 179, 199, 0.1)" }}
                  >
                    Klarna
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ color: "#0FA0EA", backgroundColor: "rgba(15, 160, 234, 0.1)" }}
                  >
                    Affirm
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ color: "#00C2A0", backgroundColor: "rgba(0, 194, 160, 0.1)" }}
                  >
                    Afterpay
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Cancellation Policy */}
          <div className="p-4 animate-fade-in-up stagger-4" style={{ border: "1px solid #E5DED6", backgroundColor: "#FFFFFF" }}>
            <p className="text-[11px] tracking-[0.05em] uppercase font-medium mb-1.5" style={{ color: "#2D2A26" }}>
              Cancellation Policy
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#6B6560" }}>
              Please notify us at least 24 hours in advance if you need to cancel or reschedule.
            </p>
          </div>

          {/* Location */}
          <div className="mt-5 p-4 animate-fade-in-up stagger-5" style={{ backgroundColor: "#FAFAF8" }}>
            <p className="text-[11px] tracking-[0.05em] uppercase mb-2" style={{ color: "#6B6560" }}>
              Studio Location
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: "#2D2A26" }}>
              10880 Wilshire Blvd
              <br />
              Suite 402
              <br />
              Los Angeles, CA 90024
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Loading fallback for Suspense
function BookingLoading() {
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

// Main export wraps content in Suspense for useSearchParams
export default function BookPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  );
}