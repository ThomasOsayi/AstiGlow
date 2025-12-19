import type { BusinessInfo, BusinessHours, ShortHours, Stats, NavLink } from '@/types';

// ===========================================
// Business Information
// ===========================================
export const businessInfo: BusinessInfo = {
  name: "Astiglow_",
  owner: "Aster Ambaw",
  tagline: "Gentle Care, Radiant Results",
  description: "Premium waxing services in Los Angeles. Gentle care, radiant results.",
  address: {
    street: "10880 Wilshire Blvd",
    suite: "Suite 402",
    city: "Los Angeles",
    state: "CA",
    zip: "90024",
    full: "10880 Wilshire Blvd, Suite 402, Los Angeles, CA 90024",
  },
  phone: "(310) 309-7901",
  email: "hello@astiglow.com",
  instagram: "@astiglow_",
  instagramUrl: "https://instagram.com/astiglow_",
  googleMapsUrl: "https://maps.google.com/?q=10880+Wilshire+Blvd+Suite+402+Los+Angeles+CA+90024",
};

// ===========================================
// Business Hours
// ===========================================
export const businessHours: BusinessHours[] = [
  { day: "Monday", hours: "9:00 AM – 8:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
  { day: "Friday", hours: "9:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
];

// Short format for footer
export const shortHours: ShortHours = {
  weekday: "Mon–Wed: 9am – 8pm",
  weekend: "Thu–Sun: 9am – 5pm",
};

// ===========================================
// Stats (for About & Home pages)
// ===========================================
export const stats: Stats = {
  yearsExperience: "4+",
  happyClients: "500+",
  starRating: "5.0",
  reviewCount: 11,
};

// ===========================================
// Navigation
// ===========================================
export const navLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

// ===========================================
// Service Preview Categories (Home page)
// ===========================================
export const servicePreviewCategories = [
  { name: "Face", description: "Brows, lips, chin & full face", price: "From $16" },
  { name: "Body", description: "Arms, legs, underarms & more", price: "From $22" },
  { name: "Brazilian", description: "Gentle hard wax technique", price: "From $75" },
  { name: "Packages", description: "Save with bundled sessions", price: "Save 20%" },
];

// ===========================================
// Cancellation Policy
// ===========================================
export const cancellationPolicy = {
  text: "We understand things come up. If you need to cancel or reschedule, please notify us at (310) 309-7901 as soon as possible.",
  shortText: "Please notify us at least 24 hours in advance if you need to cancel or reschedule.",
};

// ===========================================
// Payment Options
// ===========================================
export const paymentOptions = ["Klarna", "Affirm", "Afterpay"];