"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

const CART_STORAGE_KEY = "astiglow-cart";

// Package data (should match your packages page)
export const packagesData = [
  {
    id: "brazilian-pkg",
    name: "Brazilian",
    originalPrice: 75,
    packagePrice: 61,
    sessions: 9,
    bonus: 2,
  },
  {
    id: "full-face-pkg",
    name: "Full Face",
    originalPrice: 64,
    packagePrice: 52,
    sessions: 9,
    bonus: 2,
  },
  {
    id: "full-legs-pkg",
    name: "Full Legs",
    originalPrice: 70,
    packagePrice: 57,
    sessions: 9,
    bonus: 2,
  },
  {
    id: "eyebrows-pkg",
    name: "Eyebrows",
    originalPrice: 28,
    packagePrice: 23,
    sessions: 9,
    bonus: 2,
  },
  {
    id: "underarms-pkg",
    name: "Underarms",
    originalPrice: 22,
    packagePrice: 18,
    sessions: 9,
    bonus: 2,
  },
];

export function useCart() {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const ids = JSON.parse(savedCart) as string[];
        setCartIds(ids);
      } catch (e) {
        console.error("Failed to parse cart:", e);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartIds));
    }
  }, [cartIds, isHydrated]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const ids = JSON.parse(e.newValue) as string[];
          setCartIds(ids);
        } catch (e) {
          console.error("Failed to parse cart from storage event:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToCart = useCallback((pkgId: string) => {
    setCartIds((prev) => {
      if (prev.includes(pkgId)) return prev;
      return [...prev, pkgId];
    });
  }, []);

  const removeFromCart = useCallback((pkgId: string) => {
    setCartIds((prev) => prev.filter((id) => id !== pkgId));
  }, []);

  const clearCart = useCallback(() => {
    setCartIds([]);
  }, []);

  const isInCart = useCallback(
    (pkgId: string) => cartIds.includes(pkgId),
    [cartIds]
  );

  // Get full package objects for items in cart
  const cartItems = useMemo(
    () => packagesData.filter((pkg) => cartIds.includes(pkg.id)),
    [cartIds]
  );

  // Calculate totals
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, pkg) => sum + pkg.sessions * pkg.packagePrice, 0),
    [cartItems]
  );

  const cartCount = cartIds.length;

  return {
    cartIds,
    cartItems,
    cartCount,
    cartTotal,
    isHydrated,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
  };
}