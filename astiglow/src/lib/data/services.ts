import type { Service, ServiceCategoryFilter } from '@/types';

export const services: Service[] = [
  // ===========================================
  // Face Services
  // ===========================================
  {
    id: "eyebrow",
    name: "Eyebrow",
    category: "face",
    description: "Enhance the shape of your brows with precision waxing for a bold, polished look.",
    price: 28,
    duration: 15,
    popular: true,
  },
  {
    id: "upper-lip",
    name: "Upper Lip",
    category: "face",
    description: "Quick and gentle removal for smooth, hair-free skin above the lip.",
    price: 16,
    duration: 10,
  },
  {
    id: "lower-lip",
    name: "Lower Lip",
    category: "face",
    description: "Gentle wax treatment for the area just below the lower lip and chin area.",
    price: 20,
    duration: 10,
  },
  {
    id: "chin",
    name: "Chin",
    category: "face",
    description: "Achieve a smooth, flawless look with our gentle chin waxing service.",
    price: 16,
    duration: 10,
  },
  {
    id: "sideburns",
    name: "Sideburns",
    category: "face",
    description: "Frame your face with smooth, hair-free sideburns using gentle hard wax.",
    price: 20,
    duration: 10,
  },
  {
    id: "full-face",
    name: "Full Face",
    category: "face",
    description: "Complete facial waxing including brows, lip, chin, and sideburns for an all-over glow.",
    price: 64,
    duration: 30,
    popular: true,
  },
  {
    id: "nose",
    name: "Nose",
    category: "face",
    description: "Quick and effective removal of unwanted hair from inside the nostrils.",
    price: 18,
    duration: 10,
  },
  {
    id: "ears",
    name: "Ears",
    category: "face",
    description: "Gentle ear waxing for a clean, polished appearance.",
    price: 16,
    duration: 15,
  },
  {
    id: "neck",
    name: "Neck",
    category: "face",
    description: "Smooth neckline waxing, ideal for maintaining a polished look.",
    price: 20,
    duration: 10,
  },
  {
    id: "hairline",
    name: "Hairline",
    category: "face",
    description: "Precision waxing along the hairline for a cleaner, more defined frame.",
    price: 15,
    duration: 10,
  },

  // ===========================================
  // Body Services
  // ===========================================
  {
    id: "underarms",
    name: "Underarms",
    category: "body",
    description: "Smooth, long-lasting results with our gentle underarm waxing treatment.",
    price: 22,
    duration: 15,
    popular: true,
  },
  {
    id: "half-arms",
    name: "Half Arms",
    category: "body",
    description: "Waxing for either upper or lower arms — smooth skin that lasts.",
    price: 30,
    duration: 20,
  },
  {
    id: "full-arms",
    name: "Full Arms",
    category: "body",
    description: "Complete arm waxing from shoulder to wrist for silky smooth results.",
    price: 45,
    duration: 30,
  },
  {
    id: "half-legs",
    name: "Half Legs",
    category: "body",
    description: "Lower or upper leg waxing for smooth, beach-ready skin.",
    price: 45,
    duration: 30,
  },
  {
    id: "full-legs",
    name: "Full Legs",
    category: "body",
    description: "Complete leg waxing from thigh to ankle for lasting smoothness.",
    price: 70,
    duration: 45,
    popular: true,
  },
  {
    id: "stomach-strip",
    name: "Stomach Strip",
    category: "body",
    description: "Removes the thin line of hair from navel to bikini area.",
    price: 18,
    duration: 10,
  },
  {
    id: "full-back",
    name: "Full Back",
    category: "body",
    description: "Complete back waxing for smooth, confident skin.",
    price: 55,
    duration: 40,
  },
  {
    id: "chest",
    name: "Chest",
    category: "body",
    description: "Full chest waxing for a clean, groomed appearance.",
    price: 45,
    duration: 30,
  },

  // ===========================================
  // Brazilian & Bikini Services
  // ===========================================
  {
    id: "bikini-line",
    name: "Bikini Line",
    category: "brazilian",
    description: "Clean up along the bikini line for a natural, polished look.",
    price: 40,
    duration: 15,
  },
  {
    id: "bikini-full",
    name: "Bikini Full",
    category: "brazilian",
    description: "More coverage than bikini line — removes hair from the front and sides.",
    price: 60,
    duration: 20,
  },
  {
    id: "brazilian",
    name: "Brazilian",
    category: "brazilian",
    description: "Complete hair removal with our signature gentle hard wax technique. Smooth, long-lasting results.",
    price: 75,
    duration: 30,
    popular: true,
  },
  {
    id: "butt-strip",
    name: "Butt Strip",
    category: "brazilian",
    description: "Quick add-on service for complete smoothness.",
    price: 20,
    duration: 10,
  },
];

// Category filters for services page
export const serviceCategories: ServiceCategoryFilter[] = [
  { id: "all", label: "All Services" },
  { id: "face", label: "Face" },
  { id: "body", label: "Body" },
  { id: "brazilian", label: "Brazilian & Bikini" },
];

// ===========================================
// Helper Functions
// ===========================================
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