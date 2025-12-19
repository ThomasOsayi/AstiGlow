// src/components/layout/navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data/business";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-6 md:px-10 lg:px-[60px] py-6",
        "flex items-center justify-between",
        "bg-cream/95 backdrop-blur-md",
        "border-b border-border/50"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-[28px] font-medium tracking-[0.02em] text-charcoal hover:opacity-80 transition-opacity"
      >
        Astiglow<span className="text-gold">_</span>
      </Link>

      {/* Navigation Links - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link relative text-[13px] font-normal tracking-caps uppercase",
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
              />
            </Link>
          );
        })}
      </div>

      {/* CTA Button */}
      <Link href="/book" className="hidden sm:block">
        <button className="btn-primary group relative overflow-hidden bg-charcoal text-cream px-6 lg:px-8 py-3.5 text-xs tracking-[0.12em] font-medium uppercase">
          <span className="relative z-10">Book Now</span>
          {/* Hover fill effect */}
          <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-smooth" />
        </button>
      </Link>

      {/* Mobile Menu Button - Show on small screens */}
      <button className="sm:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
        <span className="w-6 h-[1.5px] bg-charcoal" />
        <span className="w-6 h-[1.5px] bg-charcoal" />
        <span className="w-4 h-[1.5px] bg-charcoal" />
      </button>
    </nav>
  );
}

// Add custom styles for the nav link hover underline effect
// This goes in your globals.css or can be a styled component
export const navLinkStyles = `
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: #C9A27C;
    transition: width 0.3s ease;
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
`;  