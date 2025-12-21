"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data/business";
import { Button, Menu, X } from "@/components/ui";
import { MobileMenu } from "./mobile-menu";
import { useCart } from "@/hooks";

// ===========================================
// Icons
// ===========================================

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// ===========================================
// Mini Cart Dropdown
// ===========================================

interface MiniCartProps {
  isOpen: boolean;
  cartItems: {
    id: string;
    name: string;
    packagePrice: number;
    sessions: number;
  }[];
  cartTotal: number;
  onRemove: (id: string) => void;
  onClose: () => void;
}

function MiniCart({ isOpen, cartItems, cartTotal, onRemove, onClose }: MiniCartProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute top-full right-0 mt-2 w-80",
        "bg-white border border-border rounded-sm shadow-xl",
        "transform transition-all duration-200 origin-top-right",
        "z-50",
        isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      )}
      onMouseLeave={onClose}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-xs tracking-[0.1em] text-charcoal-light uppercase">
          Your Cart ({cartItems.length})
        </p>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <ShoppingBagIcon className="w-8 h-8 text-charcoal-light/50 mx-auto mb-3" />
          <p className="text-sm text-charcoal-light">Your cart is empty</p>
          <Link href="/packages" onClick={onClose}>
            <span className="text-xs text-gold hover:underline mt-2 inline-block">
              Browse packages →
            </span>
          </Link>
        </div>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="px-4 py-3 flex items-center justify-between border-b border-border/50 last:border-b-0 group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">
                    {item.name} Package
                  </p>
                  <p className="text-xs text-charcoal-light">
                    {item.sessions} + 2 free sessions
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className="text-sm font-medium text-charcoal">
                    ${item.sessions * item.packagePrice}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                    className="p-1 text-charcoal-light hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-cream-dark/30 border-t border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-charcoal-light">Total</span>
              <span className="font-display text-lg font-medium text-charcoal">
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <Link href="/cart" className="flex-1" onClick={onClose}>
                <button className="w-full py-2.5 text-xs tracking-[0.08em] font-medium border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-colors">
                  VIEW CART
                </button>
              </Link>
              <Link href="/checkout" className="flex-1" onClick={onClose}>
                <button className="w-full py-2.5 text-xs tracking-[0.08em] font-medium bg-charcoal text-white hover:bg-gold transition-colors">
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ===========================================
// Navbar Component
// ===========================================

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { cartItems, cartCount, cartTotal, removeFromCart, isHydrated } = useCart();

  // Handle scroll state for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Cart hover handlers with delay to prevent flickering
  const handleCartMouseEnter = () => {
    if (cartTimeoutRef.current) {
      clearTimeout(cartTimeoutRef.current);
    }
    setIsCartOpen(true);
  };

  const handleCartMouseLeave = () => {
    cartTimeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 150);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "px-6 md:px-10 lg:px-[60px] py-5 md:py-6",
          "flex items-center justify-between",
          "transition-all duration-300",
          isScrolled
            ? "bg-cream/98 backdrop-blur-lg shadow-nav"
            : "bg-cream/95 backdrop-blur-md",
          "border-b border-border/50"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[26px] md:text-[28px] font-medium tracking-[0.02em] text-charcoal hover:opacity-80 transition-opacity"
        >
          Astiglow<span className="text-gold">_</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10 xl:gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-[13px] font-normal tracking-[0.08em] uppercase",
                  "transition-colors duration-300",
                  isActive ? "text-gold" : "text-charcoal hover:text-gold"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[1px] bg-gold",
                    "transition-all duration-300 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Right side: Cart + CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Cart Icon with Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
          >
            <Link
              href="/cart"
              className={cn(
                "flex items-center justify-center",
                "w-10 h-10 rounded-full",
                "text-charcoal hover:text-gold transition-colors",
                "hover:bg-charcoal/5",
                "relative"
              )}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBagIcon />
              {/* Badge */}
              {isHydrated && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mini Cart Dropdown (Desktop only) */}
            <div className="hidden lg:block">
              <MiniCart
                isOpen={isCartOpen}
                cartItems={cartItems}
                cartTotal={cartTotal}
                onRemove={removeFromCart}
                onClose={() => setIsCartOpen(false)}
              />
            </div>
          </div>

          {/* CTA Button - Hidden on mobile */}
          <Link href="/book" className="hidden md:block">
            <Button size="default">Book Now</Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              "lg:hidden flex items-center justify-center",
              "w-10 h-10 -mr-2",
              "text-charcoal hover:text-gold transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            )}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}

// ===========================================
// Navbar Spacer (for page content offset)
// ===========================================

export function NavbarSpacer() {
  return <div className="h-[72px] md:h-[84px]" aria-hidden="true" />;
}