// src/lib/data/index.ts

import { businessInfo, shortHours, navLinks } from "./business";

// ===========================================
// Stats (used in Hero, About, etc.)
// ===========================================

export const stats = {
  yearsExperience: "4+",
  happyClients: "500+",
  starRating: "5.0",
  verifiedReviews: 11,
};

// ===========================================
// Reviews Data
// ===========================================

export interface Review {
  id: string;
  text: string;
  author: string;
  date: string;
  rating: number;
  service?: string;
  verified?: boolean;
}

export const reviews: Review[] = [
  {
    id: "1",
    text: "Aster is amazing! I've been seeing her for over three years now. Her new studio is lovely, and nobody can shape my eyebrows as well as she does! She's also so kind and welcoming. I would recommend her to anyone.",
    author: "Lauren",
    date: "12.14.2025",
    rating: 5,
    service: "Eyebrow Wax",
    verified: true,
  },
  {
    id: "2",
    text: "I have been going to Aster exclusively for over 5 years and I always receive compliments on my brows. She is professional, attentive, friendly, and makes you feel at ease as soon as you step through her doors. Her salon is always clean. Best waxer on the Westside!",
    author: "Hiroko",
    date: "11.26.2025",
    rating: 5,
    service: "Eyebrow Wax",
    verified: true,
  },
  {
    id: "3",
    text: "I've been seeing Aster for the last 4 years and I'm thrilled that she is on her own now. Her studio is beyond lovely!!! The ambiance, the smell, the atmosphere and most of all, her. She makes you feel so comfortable on the table and I always walk away with so much more than a fresh wax. Aster is top tier!",
    author: "Alli M",
    date: "11.25.2025",
    rating: 5,
    service: "Full Face",
    verified: true,
  },
  {
    id: "4",
    text: "Highly recommended! Aster is the best in the business.",
    author: "Jordan",
    date: "11.24.2025",
    rating: 5,
    verified: true,
  },
  {
    id: "5",
    text: "BEST waxing experience I've ever had. She was so gentle, kind, professional, and thorough. I will never be able to go to anyone else.",
    author: "Christina Ellmers",
    date: "11.21.2025",
    rating: 5,
    service: "Brazilian",
    verified: true,
  },
];

// ===========================================
// Re-export business data
// ===========================================

export { businessInfo, shortHours, navLinks };

// ===========================================
// Re-export services data
// ===========================================

export {
  services,
  serviceCategories,
  getServicesByCategory,
  getPopularServices,
  getServiceById,
  formatPrice,
  formatDuration,
} from "./services";