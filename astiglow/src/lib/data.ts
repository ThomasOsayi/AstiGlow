// src/lib/data.ts

// Service types
export interface Service {
    id: string;
    name: string;
    category: 'face' | 'body' | 'brazilian';
    description: string;
    price: number;
    duration: number; // minutes
    popular?: boolean;
  }
  
  export interface Package {
    id: string;
    name: string;
    originalPrice: number;
    packagePrice: number;
    savings: number;
    sessions: number;
    bonus: number;
    description: string;
    popular?: boolean;
  }
  
  export interface Review {
    text: string;
    author: string;
    date: string;
    rating: number;
  }
  
  export interface BusinessHours {
    day: string;
    hours: string;
  }
  
  // Services data
  export const services: Service[] = [
    // Face
    { id: "eyebrow", name: "Eyebrow", category: "face", description: "Enhance the shape of your brows with precision waxing for a bold, polished look.", price: 28, duration: 15, popular: true },
    { id: "upper-lip", name: "Upper Lip", category: "face", description: "Quick and gentle removal for smooth, hair-free skin above the lip.", price: 16, duration: 10 },
    { id: "lower-lip", name: "Lower Lip", category: "face", description: "Gentle wax treatment for the area just below the lower lip and chin area.", price: 20, duration: 10 },
    { id: "chin", name: "Chin", category: "face", description: "Achieve a smooth, flawless look with our gentle chin waxing service.", price: 16, duration: 10 },
    { id: "sideburns", name: "Sideburns", category: "face", description: "Frame your face with smooth, hair-free sideburns using gentle hard wax.", price: 20, duration: 10 },
    { id: "full-face", name: "Full Face", category: "face", description: "Complete facial waxing including brows, lip, chin, and sideburns for an all-over glow.", price: 64, duration: 30, popular: true },
    { id: "nose", name: "Nose", category: "face", description: "Quick and effective removal of unwanted hair from inside the nostrils.", price: 18, duration: 10 },
    { id: "ears", name: "Ears", category: "face", description: "Gentle ear waxing for a clean, polished appearance.", price: 16, duration: 15 },
    { id: "neck", name: "Neck", category: "face", description: "Smooth neckline waxing, ideal for maintaining a polished look.", price: 20, duration: 10 },
    { id: "hairline", name: "Hairline", category: "face", description: "Precision waxing along the hairline for a cleaner, more defined frame.", price: 15, duration: 10 },
    
    // Body
    { id: "underarms", name: "Underarms", category: "body", description: "Smooth, long-lasting results with our gentle underarm waxing treatment.", price: 22, duration: 15, popular: true },
    { id: "half-arms", name: "Half Arms", category: "body", description: "Waxing for either upper or lower arms — smooth skin that lasts.", price: 30, duration: 20 },
    { id: "full-arms", name: "Full Arms", category: "body", description: "Complete arm waxing from shoulder to wrist for silky smooth results.", price: 45, duration: 30 },
    { id: "half-legs", name: "Half Legs", category: "body", description: "Lower or upper leg waxing for smooth, beach-ready skin.", price: 45, duration: 30 },
    { id: "full-legs", name: "Full Legs", category: "body", description: "Complete leg waxing from thigh to ankle for lasting smoothness.", price: 70, duration: 45, popular: true },
    { id: "stomach-strip", name: "Stomach Strip", category: "body", description: "Removes the thin line of hair from navel to bikini area.", price: 18, duration: 10 },
    { id: "full-back", name: "Full Back", category: "body", description: "Complete back waxing for smooth, confident skin.", price: 55, duration: 40 },
    { id: "chest", name: "Chest", category: "body", description: "Full chest waxing for a clean, groomed appearance.", price: 45, duration: 30 },
    
    // Brazilian & Bikini
    { id: "bikini-line", name: "Bikini Line", category: "brazilian", description: "Clean up along the bikini line for a natural, polished look.", price: 40, duration: 15 },
    { id: "bikini-full", name: "Bikini Full", category: "brazilian", description: "More coverage than bikini line — removes hair from the front and sides.", price: 60, duration: 20 },
    { id: "brazilian", name: "Brazilian", category: "brazilian", description: "Complete hair removal with our signature gentle hard wax technique. Smooth, long-lasting results.", price: 75, duration: 30, popular: true },
    { id: "butt-strip", name: "Butt Strip", category: "brazilian", description: "Quick add-on service for complete smoothness.", price: 20, duration: 10 },
  ];
  
  // Packages data
  export const packages: Package[] = [
    { id: "brazilian-pkg", name: "Brazilian", originalPrice: 75, packagePrice: 61, savings: 14, sessions: 9, bonus: 2, description: "Our signature Brazilian wax package. Buy 9 sessions, get 2 free.", popular: true },
    { id: "full-face-pkg", name: "Full Face", originalPrice: 64, packagePrice: 52, savings: 12, sessions: 9, bonus: 2, description: "Complete facial waxing package including brows, lip, chin, and sideburns." },
    { id: "full-leg-pkg", name: "Full Leg", originalPrice: 70, packagePrice: 70, savings: 16, sessions: 9, bonus: 2, description: "Full leg waxing from thigh to ankle. Buy 9, get 2 free." },
    { id: "eyebrow-pkg", name: "Eyebrow", originalPrice: 28, packagePrice: 22, savings: 6, sessions: 9, bonus: 2, description: "Keep your brows perfect year-round with our eyebrow package.", popular: true },
    { id: "underarm-pkg", name: "Underarm", originalPrice: 30, packagePrice: 22, savings: 8, sessions: 9, bonus: 2, description: "Smooth underarms all year. Buy 9 sessions, get 2 free." },
  ];
  
  // Reviews data
  export const reviews: Review[] = [
    { text: "Aster is amazing! I've been seeing her for over three years now. Her new studio is lovely, and despite being a little farther from me now, I'm still willing to make the drive to see her, because nobody can shape my eyebrows as well as she does! She's also so kind and welcoming. I would recommend her to anyone.", author: "Lauren", date: "12.14.2025", rating: 5 },
    { text: "I have been going to Aster exclusively for over 5 years and I always receive compliments on my brows. She is professional, attentive, friendly, and makes you feel at ease as soon as you step through her doors. Her salon is always clean. Best waxer on the Westside!", author: "Hiroko", date: "11.26.2025", rating: 5 },
    { text: "I've been seeing Aster for the last 4 years and I'm thrilled that she is on her own now. Her studio is beyond lovely!!! The ambiance, the smell, the atmosphere and most of all, her. She makes you feel so comfortable on the table and I always walk away with so much more than a fresh wax. Aster is top tier!", author: "Alli M", date: "11.25.2025", rating: 5 },
    { text: "Highly recommended! Aster is the best in the business.", author: "Jordan", date: "11.24.2025", rating: 5 },
    { text: "BEST waxing experience I've ever had. She was so gentle, kind, professional, and thorough. I will never be able to go to anyone else.", author: "Christina Ellmers", date: "11.21.2025", rating: 5 },
  ];
  
  // Business info
  export const businessInfo = {
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
  
  // Business hours
  export const businessHours: BusinessHours[] = [
    { day: "Monday", hours: "9:00 AM – 8:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
    { day: "Friday", hours: "9:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
    { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
  ];
  
  // Short hours for footer
  export const shortHours = {
    weekday: "Mon–Wed: 9am – 8pm",
    weekend: "Thu–Sun: 9am – 5pm",
  };
  
  // Stats for about/home page
  export const stats = {
    yearsExperience: "4+",
    happyClients: "500+",
    starRating: "5.0",
    reviewCount: 11,
  };
  
  // Navigation links
  export const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/packages", label: "Packages" },
    { href: "/contact", label: "Contact" },
  ];
  
  // Category filters for services page
  export const serviceCategories = [
    { id: "all", label: "All Services" },
    { id: "face", label: "Face" },
    { id: "body", label: "Body" },
    { id: "brazilian", label: "Brazilian & Bikini" },
  ] as const;
  
  // Helper functions
  export function getServicesByCategory(category: string): Service[] {
    if (category === "all") return services;
    return services.filter((s) => s.category === category);
  }
  
  export function getPopularServices(): Service[] {
    return services.filter((s) => s.popular);
  }
  
  export function getServiceById(id: string): Service | undefined {
    return services.find((s) => s.id === id);
  }
  
  export function formatPrice(price: number): string {
    return `$${price}`;
  }
  
  export function formatDuration(minutes: number): string {
    return `${minutes} min`;
  }