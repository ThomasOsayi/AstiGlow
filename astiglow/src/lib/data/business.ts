// src/lib/data/business.ts

// ===========================================
// Business Information
// ===========================================

export const businessInfo = {
    name: "Astiglow_",
    owner: "Aster Ambaw",
    description: "Premium waxing services in Los Angeles. Gentle care, radiant results.",
    
    // Contact
    phone: "(310) 309-7901",
    email: "hello@astiglow.com",
    
    // Social
    instagram: "@astiglow_",
    instagramUrl: "https://instagram.com/astiglow_",
    
    // Address
    address: {
      street: "10880 Wilshire Blvd",
      suite: "Suite 402",
      city: "Los Angeles",
      state: "CA",
      zip: "90024",
    },
    
    // Google Maps
    googleMapsUrl: "https://maps.google.com/?q=10880+Wilshire+Blvd+Suite+402+Los+Angeles+CA+90024",
    
    // Hours (detailed)
    hours: {
      monday: { open: "9:00 AM", close: "8:00 PM" },
      tuesday: { open: "9:00 AM", close: "8:00 PM" },
      wednesday: { open: "9:00 AM", close: "8:00 PM" },
      thursday: { open: "9:00 AM", close: "5:00 PM" },
      friday: { open: "9:00 AM", close: "5:00 PM" },
      saturday: { open: "9:00 AM", close: "5:00 PM" },
      sunday: { open: "9:00 AM", close: "5:00 PM" },
    },
  };
  
  // ===========================================
  // Short Hours Format (for footer, etc.)
  // ===========================================
  
  export const shortHours = {
    weekday: "Mon–Wed: 9am – 8pm",
    weekend: "Thu–Sun: 9am – 5pm",
  };
  
  // ===========================================
  // Full Hours Array (for about page, etc.)
  // ===========================================
  
  export const fullHours = [
    { day: "Monday", hours: "9:00 AM – 8:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
    { day: "Friday", hours: "9:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
    { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
  ];
  
  // ===========================================
  // Navigation Links
  // ===========================================
  
  export interface NavLink {
    label: string;
    href: string;
  }
  
  export const navLinks: NavLink[] = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ];
  
  // ===========================================
  // Footer Links
  // ===========================================
  
  export const footerLinks = {
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "Packages", href: "/packages" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };