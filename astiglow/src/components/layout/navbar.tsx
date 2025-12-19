// src/components/layout/navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data/business";
import { Button, Menu, X } from "@/components/ui";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "px-6 md:px-10 lg:px-[60px] py-5 md:py-6",
          "flex items-center justify-between",
          "transition-all duration-300",
          // Background styling
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
                {/* Animated underline */}
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

        {/* Right side: CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
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
