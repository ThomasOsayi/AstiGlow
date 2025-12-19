// ===========================================
// Service Types
// ===========================================
export interface Service {
    id: string;
    name: string;
    category: ServiceCategory;
    description: string;
    price: number;
    duration: number; // minutes
    popular?: boolean;
  }
  
  export type ServiceCategory = 'face' | 'body' | 'brazilian';
  
  export interface ServiceCategoryFilter {
    id: string;
    label: string;
  }
  
  // ===========================================
  // Package Types
  // ===========================================
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
  
  // ===========================================
  // Review Types
  // ===========================================
  export interface Review {
    id?: string;
    text: string;
    author: string;
    date: string;
    rating: number;
  }
  
  // ===========================================
  // Business Types
  // ===========================================
  export interface Address {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  }
  
  export interface BusinessInfo {
    name: string;
    owner: string;
    tagline: string;
    description: string;
    address: Address;
    phone: string;
    email: string;
    instagram: string;
    instagramUrl: string;
    googleMapsUrl: string;
  }
  
  export interface BusinessHours {
    day: string;
    hours: string;
  }
  
  export interface ShortHours {
    weekday: string;
    weekend: string;
  }
  
  export interface Stats {
    yearsExperience: string;
    happyClients: string;
    starRating: string;
    reviewCount: number;
  }
  
  // ===========================================
  // Navigation Types
  // ===========================================
  export interface NavLink {
    href: string;
    label: string;
  }
  
  // ===========================================
  // Booking Types
  // ===========================================
  export interface BookingFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service?: Service;
    date?: Date;
    time?: string;
    notes?: string;
    smsOptIn?: boolean;
  }
  
  export interface TimeSlot {
    time: string;
    available: boolean;
  }
  
  // ===========================================
  // Contact Form Types
  // ===========================================
  export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }