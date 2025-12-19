import type { Package } from '@/types';

export const packages: Package[] = [
  {
    id: "brazilian-pkg",
    name: "Brazilian",
    originalPrice: 75,
    packagePrice: 61,
    savings: 14,
    sessions: 9,
    bonus: 2,
    description: "Our signature Brazilian wax package. Buy 9 sessions, get 2 free.",
    popular: true,
  },
  {
    id: "full-face-pkg",
    name: "Full Face",
    originalPrice: 64,
    packagePrice: 52,
    savings: 12,
    sessions: 9,
    bonus: 2,
    description: "Complete facial waxing package including brows, lip, chin, and sideburns.",
  },
  {
    id: "full-leg-pkg",
    name: "Full Leg",
    originalPrice: 70,
    packagePrice: 70,
    savings: 16,
    sessions: 9,
    bonus: 2,
    description: "Full leg waxing from thigh to ankle. Buy 9, get 2 free.",
  },
  {
    id: "eyebrow-pkg",
    name: "Eyebrow",
    originalPrice: 28,
    packagePrice: 22,
    savings: 6,
    sessions: 9,
    bonus: 2,
    description: "Keep your brows perfect year-round with our eyebrow package.",
    popular: true,
  },
  {
    id: "underarm-pkg",
    name: "Underarm",
    originalPrice: 30,
    packagePrice: 22,
    savings: 8,
    sessions: 9,
    bonus: 2,
    description: "Smooth underarms all year. Buy 9 sessions, get 2 free.",
  },
];

// ===========================================
// Helper Functions
// ===========================================
export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

export function getPopularPackages(): Package[] {
  return packages.filter((p) => p.popular);
}

export function calculatePackageTotal(pkg: Package): number {
  return pkg.packagePrice * pkg.sessions;
}

export function calculateRegularTotal(pkg: Package): number {
  return pkg.originalPrice * (pkg.sessions + pkg.bonus);
}