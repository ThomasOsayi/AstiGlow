"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { services } from "@/lib/data";
import type { Service } from "@/types";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const steps = [
  { num: 1, label: "Select Service" },
  { num: 2, label: "Choose Time" },
  { num: 3, label: "Your Details" },
];

// Get a subset of popular services for the booking flow
const bookingServices = services.filter((s) => s.popular).slice(0, 8);
// Add a few more common ones
const additionalServices = services.filter(
  (s) => !s.popular && ["underarms", "half-arms", "bikini-line"].includes(s.id)
);
const allBookingServices = [...bookingServices, ...additionalServices];

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const formatDate = (date: Date) => {
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return !!selectedDate && !!selectedTime;
    if (currentStep === 3) {
      return formData.firstName && formData.email && formData.phone;
    }
    return false;
  };

  if (isConfirmed) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#FAF6F3" }}
      >
        {/* Header */}
        <header
          className="px-6 md:px-16 py-6 flex justify-between items-center bg-white"
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

        {/* Confirmation */}
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
              style={{ backgroundColor: "rgba(196, 164, 132, 0.15)", color: "#C4A484" }}
            >
              ✓
            </div>
            <h1
              className="font-display text-4xl mb-4"
              style={{ color: "#2D2A26" }}
            >
              Booking Confirmed!
            </h1>
            <p className="text-base mb-8" style={{ color: "#6B6560" }}>
              Thank you for booking with Astiglow. You'll receive a confirmation
              email shortly with all the details.
            </p>

            <div
              className="p-6 mb-8 text-left"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}
            >
              <p
                className="font-display text-xl mb-2"
                style={{ color: "#2D2A26" }}
              >
                {selectedService?.name}
              </p>
              <p className="text-sm mb-4" style={{ color: "#6B6560" }}>
                {selectedService?.duration} min
              </p>
              <div
                className="pt-4"
                style={{ borderTop: "1px solid #E5DED6" }}
              >
                <p className="text-sm" style={{ color: "#2D2A26" }}>
                  {selectedDate && formatDate(selectedDate)}
                </p>
                <p className="text-sm" style={{ color: "#C4A484" }}>
                  {selectedTime}
                </p>
              </div>
            </div>

            <Link href="/">
              <button
                className="px-8 py-4 text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300"
                style={{ backgroundColor: "#2D2A26", color: "#FFFFFF" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C4A484";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2D2A26";
                }}
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
    <div className="min-h-screen" style={{ backgroundColor: "#FAF6F3" }}>
      {/* Header */}
      <header
        className="px-6 md:px-16 py-6 flex justify-between items-center bg-white"
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
        className="px-6 md:px-16 py-10 bg-white"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <div className="max-w-[600px] mx-auto flex justify-between items-center relative">
          {/* Progress Line Background */}
          <div
            className="absolute top-5 left-16 right-16 h-0.5 z-0"
            style={{ backgroundColor: "#E5DED6" }}
          >
            {/* Progress Line Fill */}
            <div
              className="h-full transition-all duration-400"
              style={{
                width: `${((currentStep - 1) / 2) * 100}%`,
                backgroundColor: "#C4A484",
              }}
            />
          </div>

          {/* Steps */}
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col items-center gap-3 z-10"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: currentStep >= step.num ? "#C4A484" : "#FFFFFF",
                  border: `2px solid ${currentStep >= step.num ? "#C4A484" : "#E5DED6"}`,
                  color: currentStep >= step.num ? "#FFFFFF" : "#6B6560",
                }}
              >
                {currentStep > step.num ? "✓" : step.num}
              </div>
              <span
                className="text-xs tracking-[0.05em]"
                style={{
                  color: currentStep >= step.num ? "#2D2A26" : "#6B6560",
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
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[calc(100vh-180px)]">
        {/* Left - Form Area */}
        <div className="px-6 md:px-12 lg:px-20 py-12 lg:py-16">
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-display text-3xl font-normal mb-2" style={{ color: "#2D2A26" }}>
                Choose a Service<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-[15px] mb-8" style={{ color: "#6B6560" }}>
                Select the service you'd like to book
              </p>

              <div className="flex flex-col gap-3">
                {allBookingServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 flex justify-between items-center cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: selectedService?.id === service.id
                        ? "1px solid #C4A484"
                        : "1px solid #E5DED6",
                      background: selectedService?.id === service.id
                        ? "rgba(196, 164, 132, 0.05)"
                        : "#FFFFFF",
                    }}
                    onClick={() => setSelectedService(service)}
                    onMouseEnter={(e) => {
                      if (selectedService?.id !== service.id) {
                        e.currentTarget.style.borderColor = "#C4A484";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedService?.id !== service.id) {
                        e.currentTarget.style.borderColor = "#E5DED6";
                      }
                    }}
                  >
                    <div>
                      <p
                        className="text-base font-medium mb-1"
                        style={{ color: "#2D2A26" }}
                      >
                        {service.name}
                      </p>
                      <p className="text-[13px]" style={{ color: "#6B6560" }}>
                        {service.duration} min · {service.category}
                      </p>
                    </div>
                    <p className="font-display text-[22px]" style={{ color: "#2D2A26" }}>
                      ${service.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-display text-3xl font-normal mb-2" style={{ color: "#2D2A26" }}>
                Choose Date & Time<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-[15px] mb-8" style={{ color: "#6B6560" }}>
                Pick a convenient time for your appointment
              </p>

              {/* Date Selection */}
              <div className="mb-10">
                <p
                  className="text-xs tracking-[0.1em] uppercase mb-4"
                  style={{ color: "#6B6560" }}
                >
                  Select Date
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {calendarDays.slice(0, 14).map((date, index) => (
                    <div
                      key={index}
                      className="p-4 min-w-[70px] text-center cursor-pointer transition-all duration-300 shrink-0"
                      style={{
                        backgroundColor:
                          selectedDate?.getTime() === date.getTime()
                            ? "#C4A484"
                            : "#FFFFFF",
                        border: "1px solid",
                        borderColor:
                          selectedDate?.getTime() === date.getTime()
                            ? "#C4A484"
                            : "#E5DED6",
                        color:
                          selectedDate?.getTime() === date.getTime()
                            ? "#FFFFFF"
                            : "#2D2A26",
                      }}
                      onClick={() => setSelectedDate(date)}
                      onMouseEnter={(e) => {
                        if (selectedDate?.getTime() !== date.getTime()) {
                          e.currentTarget.style.borderColor = "#C4A484";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedDate?.getTime() !== date.getTime()) {
                          e.currentTarget.style.borderColor = "#E5DED6";
                        }
                      }}
                    >
                      <p className="text-[11px] mb-1 opacity-70">
                        {dayNames[date.getDay()]}
                      </p>
                      <p className="text-lg font-medium">{date.getDate()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <p
                    className="text-xs tracking-[0.1em] uppercase mb-4"
                    style={{ color: "#6B6560" }}
                  >
                    Select Time
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time, index) => (
                      <div
                        key={index}
                        className="py-4 px-6 text-center cursor-pointer transition-all duration-300"
                        style={{
                          backgroundColor:
                            selectedTime === time ? "#C4A484" : "#FFFFFF",
                          border: "1px solid",
                          borderColor:
                            selectedTime === time ? "#C4A484" : "#E5DED6",
                          color: selectedTime === time ? "#FFFFFF" : "#2D2A26",
                        }}
                        onClick={() => setSelectedTime(time)}
                        onMouseEnter={(e) => {
                          if (selectedTime !== time) {
                            e.currentTarget.style.borderColor = "#C4A484";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedTime !== time) {
                            e.currentTarget.style.borderColor = "#E5DED6";
                          }
                        }}
                      >
                        <p className="text-sm">{time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Your Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-display text-3xl font-normal mb-2" style={{ color: "#2D2A26" }}>
                Your Details<span style={{ color: "#C4A484" }}>_</span>
              </h2>
              <p className="text-[15px] mb-8" style={{ color: "#6B6560" }}>
                Enter your information to complete the booking
              </p>

              <div className="flex flex-col gap-4 max-w-[500px]">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full p-5 text-[15px] outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5DED6",
                      color: "#2D2A26",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#C4A484";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E5DED6";
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full p-5 text-[15px] outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5DED6",
                      color: "#2D2A26",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#C4A484";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E5DED6";
                    }}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-5 text-[15px] outline-none transition-colors duration-300"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5DED6",
                    color: "#2D2A26",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C4A484";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E5DED6";
                  }}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-5 text-[15px] outline-none transition-colors duration-300"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5DED6",
                    color: "#2D2A26",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C4A484";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E5DED6";
                  }}
                />

                {/* SMS Opt-in */}
                <div
                  className="mt-4 p-5"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsOptIn}
                      onChange={(e) => setSmsOptIn(e.target.checked)}
                      className="mt-1"
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "#6B6560" }}
                    >
                      Send me appointment reminders and updates via text message
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-8 py-4 text-[13px] tracking-[0.1em] uppercase font-medium transition-colors hover:opacity-70"
                style={{ color: "#6B6560", backgroundColor: "transparent", border: "none" }}
              >
                ← Back
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-12 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
                style={{
                  backgroundColor: canProceed() ? "#2D2A26" : "#E5DED6",
                  color: "#FFFFFF",
                  cursor: canProceed() ? "pointer" : "not-allowed",
                }}
                onMouseEnter={(e) => {
                  if (canProceed()) {
                    e.currentTarget.style.backgroundColor = "#C4A484";
                  }
                }}
                onMouseLeave={(e) => {
                  if (canProceed()) {
                    e.currentTarget.style.backgroundColor = "#2D2A26";
                  }
                }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="px-12 py-4 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
                style={{
                  backgroundColor: canProceed() && !isSubmitting ? "#2D2A26" : "#E5DED6",
                  color: "#FFFFFF",
                  cursor: canProceed() && !isSubmitting ? "pointer" : "not-allowed",
                }}
                onMouseEnter={(e) => {
                  if (canProceed() && !isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#C4A484";
                  }
                }}
                onMouseLeave={(e) => {
                  if (canProceed() && !isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#2D2A26";
                  }
                }}
              >
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </button>
            )}
          </div>
        </div>

        {/* Right - Summary Panel */}
        <div
          className="hidden lg:block px-10 py-16 bg-white"
          style={{ borderLeft: "1px solid #E5DED6" }}
        >
          <h3
            className="text-xs tracking-[0.15em] uppercase mb-6"
            style={{ color: "#6B6560" }}
          >
            Booking Summary
          </h3>

          {/* Service Info */}
          <div className="p-6 mb-6" style={{ backgroundColor: "#FAF6F3" }}>
            {selectedService ? (
              <>
                <p
                  className="font-display text-[22px] mb-2"
                  style={{ color: "#2D2A26" }}
                >
                  {selectedService.name}
                </p>
                <p className="text-sm mb-4" style={{ color: "#6B6560" }}>
                  {selectedService.duration} min · {selectedService.category}
                </p>

                {selectedDate && (
                  <div
                    className="pt-4"
                    style={{ borderTop: "1px solid #E5DED6" }}
                  >
                    <p className="text-sm" style={{ color: "#2D2A26" }}>
                      {formatDate(selectedDate)}
                    </p>
                    {selectedTime && (
                      <p className="text-sm mt-1" style={{ color: "#C4A484" }}>
                        {selectedTime}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm italic" style={{ color: "#6B6560" }}>
                No service selected yet
              </p>
            )}
          </div>

          {/* Pricing */}
          {selectedService && (
            <>
              <div className="flex justify-between mb-3">
                <span className="text-sm" style={{ color: "#6B6560" }}>
                  Subtotal
                </span>
                <span className="text-sm" style={{ color: "#2D2A26" }}>
                  ${selectedService.price}.00
                </span>
              </div>

              <div
                className="flex justify-between pt-4"
                style={{ borderTop: "1px solid #E5DED6" }}
              >
                <span
                  className="text-base font-medium"
                  style={{ color: "#2D2A26" }}
                >
                  Total
                </span>
                <span
                  className="font-display text-2xl"
                  style={{ color: "#2D2A26" }}
                >
                  ${selectedService.price}.00
                </span>
              </div>
            </>
          )}

          {/* Payment Options */}
          <div
            className="mt-8 p-5 text-center"
            style={{ backgroundColor: "#FAF6F3" }}
          >
            <p
              className="text-[11px] tracking-[0.1em] uppercase mb-3"
              style={{ color: "#6B6560" }}
            >
              Pay Later With
            </p>
            <div className="flex justify-center gap-4">
              <span className="text-sm font-semibold" style={{ color: "#2D2A26" }}>
                Klarna
              </span>
              <span className="text-sm font-semibold" style={{ color: "#2D2A26" }}>
                Affirm
              </span>
              <span className="text-sm font-semibold" style={{ color: "#2D2A26" }}>
                Afterpay
              </span>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div
            className="mt-8 p-5"
            style={{ border: "1px solid #E5DED6", backgroundColor: "#FFFFFF" }}
          >
            <p
              className="text-xs tracking-[0.05em] uppercase font-medium mb-2"
              style={{ color: "#2D2A26" }}
            >
              Cancellation Policy
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "#6B6560" }}
            >
              Please notify us at least 24 hours in advance if you need to
              cancel or reschedule.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}