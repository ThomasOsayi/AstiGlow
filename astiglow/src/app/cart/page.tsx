"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  getPackagesByIds,
  calculatePackageTotal,
  calculatePackageSavings,
  calculateCartTotals,
} from "@/lib/data/packages";
import type { Package } from "@/types";

// ===========================================
// Constants
// ===========================================

const CART_STORAGE_KEY = "astiglow-cart";

// ===========================================
// Icons
// ===========================================

const PackageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const EmptyCartIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="text-border"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ===========================================
// Cart Item Component
// ===========================================

interface CartItemProps {
  pkg: Package;
  onRemove: () => void;
}

function CartItem({ pkg, onRemove }: CartItemProps) {
  const total = calculatePackageTotal(pkg);
  const savings = calculatePackageSavings(pkg);
  const totalSessions = pkg.sessions + pkg.bonus;

  return (
    <div
      className={cn(
        "p-5 sm:p-6 bg-white border border-border",
        "flex flex-col sm:flex-row gap-4",
        "transition-all duration-300 hover:border-gold/50"
      )}
    >
      {/* Package Icon */}
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
          "bg-gold/10 text-gold"
        )}
      >
        <PackageIcon />
      </div>

      {/* Package Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <h3 className="font-display text-xl font-medium text-charcoal">
              {pkg.name} Package
            </h3>
            <p className="text-xs text-charcoal-light">
              {totalSessions} sessions ({pkg.bonus} free bonus)
            </p>
          </div>
          <button
            onClick={onRemove}
            className={cn(
              "p-2 rounded transition-colors flex-shrink-0",
              "text-charcoal-light hover:text-red-500 hover:bg-red-50"
            )}
            title="Remove from cart"
            aria-label={`Remove ${pkg.name} Package from cart`}
          >
            <TrashIcon />
          </button>
        </div>

        <p className="text-sm text-charcoal-light mb-3 line-clamp-2">
          {pkg.description}
        </p>

        {/* Session Dots */}
        <div className="flex gap-1 flex-wrap mb-3">
          {[...Array(pkg.sessions)].map((_, i) => (
            <div
              key={`paid-${i}`}
              className="w-2 h-2 rounded-full bg-charcoal"
              title="Paid session"
            />
          ))}
          {[...Array(pkg.bonus)].map((_, i) => (
            <div
              key={`free-${i}`}
              className="w-2 h-2 rounded-full bg-gold"
              title="Free bonus session"
            />
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-charcoal">${total}</span>
          <span
            className={cn(
              "text-xs px-2 py-1 rounded",
              "bg-gold/10 text-gold font-medium"
            )}
          >
            Save ${savings}
          </span>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Order Summary Component
// ===========================================

interface OrderSummaryProps {
  cart: Package[];
  onCheckout: () => void;
}

function OrderSummary({ cart, onCheckout }: OrderSummaryProps) {
  const { subtotal, savings, totalSessions } = calculateCartTotals(cart);

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      {/* Summary Card */}
      <div className="p-6 bg-white border border-border">
        <h2
          className={cn(
            "text-[11px] tracking-[0.15em] uppercase mb-5",
            "text-charcoal-light"
          )}
        >
          Order Summary
        </h2>

        {/* Package List */}
        <div className="space-y-3 mb-5 pb-5 border-b border-border">
          {cart.map((pkg) => (
            <div key={pkg.id} className="flex justify-between text-sm">
              <span className="text-charcoal">{pkg.name} Package</span>
              <span className="text-charcoal-light">
                ${calculatePackageTotal(pkg)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 mb-5 pb-5 border-b border-border">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-light">Subtotal</span>
            <span className="text-charcoal">${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-light">You Save</span>
            <span className="text-gold font-medium">-${savings}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-medium text-charcoal">Total</span>
          <span className="font-display text-3xl text-charcoal">
            ${subtotal}
          </span>
        </div>

        {/* Checkout Button */}
        <Button onClick={onCheckout} className="w-full" size="lg">
          Proceed to Checkout
        </Button>

        {/* Security Note */}
        <div
          className={cn(
            "flex items-center justify-center gap-2 mt-4",
            "text-xs text-charcoal-light"
          )}
        >
          <ShieldIcon />
          <span>Secure checkout</span>
        </div>
      </div>

      {/* Benefits Card */}
      <div className="p-5 bg-white border border-border">
        <p
          className={cn(
            "text-[11px] tracking-[0.1em] uppercase mb-3",
            "text-gold font-medium"
          )}
        >
          What You're Getting
        </p>
        <ul className="space-y-2">
          {[
            `${totalSessions} total sessions`,
            `$${savings} in savings`,
            "Valid for 12 months",
            "Book sessions anytime",
          ].map((benefit, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-charcoal-light"
            >
              <span className="text-gold">
                <CheckIcon />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* BNPL Options */}
      <div className="p-5 bg-white border border-border text-center">
        <p
          className={cn(
            "text-[10px] tracking-[0.1em] uppercase mb-3",
            "text-charcoal-light"
          )}
        >
          Pay Later With
        </p>
        <div className="flex justify-center gap-2">
          <span
            className="text-xs font-bold px-3 py-1.5 rounded"
            style={{ backgroundColor: "#FFB3C7", color: "#000000" }}
          >
            Klarna
          </span>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded"
            style={{ backgroundColor: "#0FA0EA", color: "#FFFFFF" }}
          >
            Affirm
          </span>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded"
            style={{ backgroundColor: "#B2FCE4", color: "#000000" }}
          >
            Afterpay
          </span>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Empty Cart Component
// ===========================================

function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="mb-6 flex justify-center">
        <EmptyCartIcon />
      </div>
      <h2 className="font-display text-2xl text-charcoal mb-3">
        Your cart is empty
      </h2>
      <p className="text-sm text-charcoal-light mb-8 max-w-md mx-auto">
        Looks like you haven't added any packages yet. Browse our packages to
        save on your favorite services.
      </p>
      <Link href="/packages">
        <Button>Browse Packages</Button>
      </Link>
    </div>
  );
}

// ===========================================
// Cart Page Component
// ===========================================

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Package[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const cartIds = JSON.parse(savedCart) as string[];
        const cartPackages = getPackagesByIds(cartIds);
        setCart(cartPackages);
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart.map((p) => p.id))
      );
    }
  }, [cart, isLoaded]);

  const removeFromCart = (pkgId: string) => {
    setCart(cart.filter((p) => p.id !== pkgId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    // Cart is already saved to localStorage
    router.push("/checkout");
  };

  // Loading state
  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full animate-spin mx-auto mb-4",
                "border-2 border-border border-t-gold"
              )}
            />
            <p className="text-charcoal-light">Loading cart...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream">
        {/* Header Section */}
        <section className="pt-28 sm:pt-32 pb-8 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            {/* Back Link */}
            <Link
              href="/packages"
              className={cn(
                "inline-flex items-center gap-2 text-sm mb-6",
                "text-charcoal-light hover:text-gold transition-colors"
              )}
            >
              <ArrowLeftIcon /> Continue Shopping
            </Link>

            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">
              Your Cart<span className="text-gold">_</span>
            </h1>
            <p className="text-sm text-charcoal-light">
              {cart.length === 0
                ? "Your cart is empty"
                : `${cart.length} package${cart.length > 1 ? "s" : ""} in your cart`}
            </p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                {/* Left - Cart Items */}
                <div>
                  <div className="space-y-4 mb-6">
                    {cart.map((pkg) => (
                      <CartItem
                        key={pkg.id}
                        pkg={pkg}
                        onRemove={() => removeFromCart(pkg.id)}
                      />
                    ))}
                  </div>

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="text-sm text-charcoal-light hover:text-red-500 transition-colors"
                  >
                    Clear cart
                  </button>

                  {/* Add More Link */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <Link
                      href="/packages"
                      className={cn(
                        "inline-flex items-center gap-2 text-sm",
                        "text-gold hover:opacity-70 transition-opacity"
                      )}
                    >
                      <ArrowLeftIcon /> Add more packages
                    </Link>
                  </div>
                </div>

                {/* Right - Order Summary */}
                <OrderSummary cart={cart} onCheckout={handleCheckout} />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}