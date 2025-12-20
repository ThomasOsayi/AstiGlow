// src/lib/data/packages.ts

import type { Package } from "@/types";

export const packages: Package[] = [
  {
    id: "brazilian-pkg",
    name: "Brazilian",
    originalPrice: 75,
    packagePrice: 61,
    savings: 14,
    sessions: 9,
    bonus: 2,
    description:
      "Our signature Brazilian wax package. Gentle hard wax technique for sensitive areas.",
    popular: true,
    badge: "BEST VALUE",
    badgeColor: "gold",
  },
  {
    id: "full-face-pkg",
    name: "Full Face",
    originalPrice: 64,
    packagePrice: 52,
    savings: 12,
    sessions: 9,
    bonus: 2,
    description:
      "Complete facial waxing including brows, lip, chin, and sideburns.",
    popular: false,
    badge: null,
    badgeColor: null,
  },
  {
    id: "full-legs-pkg",
    name: "Full Legs",
    originalPrice: 70,
    packagePrice: 57,
    savings: 16,
    sessions: 9,
    bonus: 2,
    description: "Full leg waxing from thigh to ankle for lasting smoothness.",
    popular: false,
    badge: null,
    badgeColor: null,
  },
  {
    id: "eyebrows-pkg",
    name: "Eyebrows",
    originalPrice: 28,
    packagePrice: 23,
    savings: 6,
    sessions: 9,
    bonus: 2,
    description:
      "Keep your brows perfectly shaped year-round with precision waxing.",
    popular: true,
    badge: "MOST POPULAR",
    badgeColor: "charcoal",
  },
  {
    id: "underarms-pkg",
    name: "Underarms",
    originalPrice: 22,
    packagePrice: 18,
    savings: 8,
    sessions: 9,
    bonus: 2,
    description: "Smooth underarms all year with our gentle waxing treatment.",
    popular: false,
    badge: null,
    badgeColor: null,
  },
];

// ===========================================
// Helper Functions
// ===========================================

/**
 * Get a package by its ID
 */
export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

/**
 * Get multiple packages by their IDs
 */
export function getPackagesByIds(ids: string[]): Package[] {
  return ids
    .map((id) => packages.find((p) => p.id === id))
    .filter((p): p is Package => p !== undefined);
}

/**
 * Get all popular packages
 */
export function getPopularPackages(): Package[] {
  return packages.filter((p) => p.popular);
}

/**
 * Calculate the total cost of a package (sessions × packagePrice)
 */
export function calculatePackageTotal(pkg: Package): number {
  return pkg.packagePrice * pkg.sessions;
}

/**
 * Calculate what the regular cost would be (all sessions at original price)
 */
export function calculateRegularTotal(pkg: Package): number {
  return pkg.originalPrice * (pkg.sessions + pkg.bonus);
}

/**
 * Calculate total savings for a package
 */
export function calculatePackageSavings(pkg: Package): number {
  return calculateRegularTotal(pkg) - calculatePackageTotal(pkg);
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(cartPackages: Package[]) {
  const subtotal = cartPackages.reduce(
    (sum, pkg) => sum + calculatePackageTotal(pkg),
    0
  );
  const savings = cartPackages.reduce(
    (sum, pkg) => sum + calculatePackageSavings(pkg),
    0
  );
  const totalSessions = cartPackages.reduce(
    (sum, pkg) => sum + pkg.sessions + pkg.bonus,
    0
  );

  return {
    subtotal,
    savings,
    totalSessions,
    total: subtotal, // same as subtotal for now (no taxes/fees)
  };
}