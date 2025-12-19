// src/components/layout/mobile-menu.tsx

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navLinks, businessInfo, shortHours } from "@/lib/data/business";
import { Button } from "@/components/ui";
import {
  X,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  ArrowRight,
} from "@/components/ui";

// ===========================================
// Mobile Menu Types
// ===========================================

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

// ===========================================
// Mobile Menu Component
// ===========================================

export function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus first element when menu opens
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm",
          "transition-opacity duration-300",
          "lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-[360px]",
          "bg-cream shadow-xl",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          "lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-2xl font-medium text-charcoal"
          >
            Astiglow<span className="text-gold">_</span>
          </Link>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              "text-charcoal-light hover:text-charcoal transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            )}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1">
            {navLinks.map((link, index) => {
              const isActive = currentPath === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-6 py-4",
                      "text-lg transition-colors duration-200",
                      "border-l-2",
                      isActive
                        ? "text-charcoal border-l-gold bg-gold/5"
                        : "text-charcoal-light border-l-transparent hover:text-charcoal hover:bg-cream-dark/30"
                    )}
                    style={{
                      animationDelay: isOpen ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      size={16}
                      className={cn(
                        "transition-opacity",
                        isActive ? "opacity-100 text-gold" : "opacity-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="px-6 pb-6">
          <Link href="/book" onClick={onClose} className="block">
            <Button size="lg" className="w-full">
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border px-6 py-6 bg-white">
          <h3 className="text-[10px] uppercase tracking-[0.15em] text-charcoal-light mb-4">
            Contact
          </h3>

          <div className="space-y-3">
            {/* Phone */}
            <a
              href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors"
            >
              <Phone size={16} className="flex-shrink-0" />
              <span>{businessInfo.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${businessInfo.email}`}
              className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors"
            >
              <Mail size={16} className="flex-shrink-0" />
              <span>{businessInfo.email}</span>
            </a>

            {/* Location */}
            <a
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-charcoal-light hover:text-gold transition-colors"
            >
              <MapPin size={16} className="flex-shrink-0 mt-0.5" />
              <span>
                {businessInfo.address.street}, {businessInfo.address.suite}
              </span>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-3 text-sm text-charcoal-light">
              <Clock size={16} className="flex-shrink-0 mt-0.5" />
              <span>
                {shortHours.weekday}
                <br />
                {shortHours.weekend}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <a
              href={businessInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-10 h-10 rounded-full border border-border",
                "flex items-center justify-center",
                "text-charcoal-light hover:text-gold hover:border-gold transition-colors"
              )}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`mailto:${businessInfo.email}`}
              className={cn(
                "w-10 h-10 rounded-full border border-border",
                "flex items-center justify-center",
                "text-charcoal-light hover:text-gold hover:border-gold transition-colors"
              )}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ===========================================
// Mobile Menu Trigger (standalone version)
// ===========================================

interface MobileMenuTriggerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MobileMenuTrigger({
  isOpen,
  onClick,
  className,
}: MobileMenuTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "lg:hidden flex flex-col items-center justify-center gap-1.5",
        "w-10 h-10",
        "text-charcoal hover:text-gold transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          "block h-[2px] bg-current transition-all duration-300",
          isOpen ? "w-6 rotate-45 translate-y-[5px]" : "w-6"
        )}
      />
      <span
        className={cn(
          "block h-[2px] bg-current transition-all duration-300",
          isOpen ? "w-0 opacity-0" : "w-6"
        )}
      />
      <span
        className={cn(
          "block h-[2px] bg-current transition-all duration-300",
          isOpen ? "w-6 -rotate-45 -translate-y-[5px]" : "w-4"
        )}
      />
    </button>
  );
}
