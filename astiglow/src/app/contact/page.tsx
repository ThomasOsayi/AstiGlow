"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { businessInfo } from "@/lib/data";

const contactMethods = [
  {
    icon: "📍",
    label: "Location",
    primary: "10880 Wilshire Blvd, Suite 402",
    secondary: "Los Angeles, CA 90024",
  },
  {
    icon: "📱",
    label: "Phone",
    primary: "(310) 309-7901",
    secondary: "Call or text anytime",
  },
  {
    icon: "✉️",
    label: "Email",
    primary: "hello@astiglow.com",
    secondary: "Response within 24 hours",
  },
  {
    icon: "📸",
    label: "Instagram",
    primary: "@astiglow_",
    secondary: "DM for quick questions",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <main>
        {/* Main Content - Split Layout */}
        <section className="pt-36 pb-24 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left - Contact Info */}
          <div className="px-6 md:px-12 lg:px-20 py-12 lg:py-16 bg-white flex flex-col justify-center">
            <p
              className="text-xs tracking-[0.2em] uppercase font-medium mb-5"
              style={{ color: "#C4A484" }}
            >
              Get In Touch
            </p>

            <h1 className="font-display text-4xl md:text-5xl font-normal text-charcoal mb-6 leading-tight">
              Let's <span className="italic">Connect</span>
              <span style={{ color: "#C4A484" }}>_</span>
            </h1>

            <p
              className="text-base leading-relaxed mb-12 max-w-[400px]"
              style={{ color: "#6B6560" }}
            >
              Have questions about services, booking, or anything else? I'd love
              to hear from you. Reach out anytime and I'll get back to you
              within 24 hours.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: "#FAF6F3" }}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs tracking-[0.1em] uppercase mb-1"
                      style={{ color: "#C4A484" }}
                    >
                      {method.label}
                    </p>
                    <p
                      className="text-[15px]"
                      style={{ color: "#2D2A26" }}
                    >
                      {method.primary}
                    </p>
                    <p
                      className="text-[13px]"
                      style={{ color: "#6B6560" }}
                    >
                      {method.secondary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact Form */}
          <div
            className="px-6 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col justify-center"
            style={{ backgroundColor: "#FAF6F3" }}
          >
            <div
              className="bg-white p-8 md:p-12"
              style={{ border: "1px solid #E5DED6" }}
            >
              <h2 className="font-display text-[28px] font-normal text-charcoal mb-2">
                Send a Message
              </h2>
              <p className="text-sm mb-8" style={{ color: "#6B6560" }}>
                Fill out the form below and I'll get back to you soon.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                    style={{ backgroundColor: "rgba(196, 164, 132, 0.15)" }}
                  >
                    ✓
                  </div>
                  <h3
                    className="font-display text-2xl mb-2"
                    style={{ color: "#2D2A26" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "#6B6560" }}>
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      className="w-full py-5 text-base bg-transparent outline-none transition-colors duration-300"
                      style={{
                        color: "#2D2A26",
                        borderBottom: `1px solid ${
                          focused === "name" ? "#C4A484" : "#E5DED6"
                        }`,
                      }}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      className="w-full py-5 text-base bg-transparent outline-none transition-colors duration-300"
                      style={{
                        color: "#2D2A26",
                        borderBottom: `1px solid ${
                          focused === "email" ? "#C4A484" : "#E5DED6"
                        }`,
                      }}
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      className="w-full py-5 text-base bg-transparent outline-none transition-colors duration-300"
                      style={{
                        color: "#2D2A26",
                        borderBottom: `1px solid ${
                          focused === "phone" ? "#C4A484" : "#E5DED6"
                        }`,
                      }}
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="pt-4">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      className="w-full py-5 text-base bg-transparent outline-none transition-colors duration-300 resize-none"
                      style={{
                        color: "#2D2A26",
                        borderBottom: `1px solid ${
                          focused === "message" ? "#C4A484" : "#E5DED6"
                        }`,
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300 relative overflow-hidden"
                      style={{
                        backgroundColor: "#2D2A26",
                        color: "#FFFFFF",
                        opacity: isSubmitting ? 0.7 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = "#C4A484";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#2D2A26";
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Business Hours Banner */}
        <section
          className="py-16 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "#2D2A26" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Hours */}
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-4"
                style={{ color: "#C4A484" }}
              >
                Business Hours
              </p>
              <p
                className="font-display text-2xl leading-relaxed"
                style={{ color: "#FAF6F3" }}
              >
                Monday – Wednesday: 9am – 8pm
                <br />
                Thursday – Sunday: 9am – 5pm
              </p>
            </div>

            {/* Book CTA */}
            <div className="md:text-right">
              <p
                className="text-xs tracking-[0.15em] uppercase mb-4"
                style={{ color: "#C4A484" }}
              >
                Ready to Book?
              </p>
              <p
                className="font-display text-2xl mb-6"
                style={{ color: "#FAF6F3" }}
              >
                Skip the form, book directly
              </p>
              <Link href="/book">
                <button
                  className="px-8 py-3.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: "#FAF6F3",
                    border: "1px solid #FAF6F3",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FAF6F3";
                    e.currentTarget.style.color = "#2D2A26";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#FAF6F3";
                  }}
                >
                  Book Appointment →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section
          className="h-[400px] flex items-center justify-center relative"
          style={{ backgroundColor: "#E5DED6" }}
        >
          <div
            className="text-center px-8 py-8 md:px-12 md:py-8 bg-white"
            style={{ boxShadow: "0 10px 40px rgba(45, 42, 38, 0.1)" }}
          >
            <p
              className="font-display text-2xl mb-2"
              style={{ color: "#2D2A26" }}
            >
              {businessInfo.address.street}, {businessInfo.address.suite}
            </p>
            <p className="text-sm mb-4" style={{ color: "#6B6560" }}>
              {businessInfo.address.city}, {businessInfo.address.state}{" "}
              {businessInfo.address.zip}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-70"
              style={{ color: "#C4A484" }}
            >
              Open in Google Maps →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}