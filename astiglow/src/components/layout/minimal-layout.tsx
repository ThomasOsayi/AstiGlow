// src/components/layout/minimal-layout.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, Phone } from "@/components/ui";
import { FooterCompact } from "./footer";
import { businessInfo } from "@/lib/data/business";

// ===========================================
// Minimal Header
// ===========================================

interface MinimalHeaderProps {
  /** Show back button */
  showBack?: boolean;
  /** Custom back URL (defaults to browser back) */
  backHref?: string;
  /** Back button label */
  backLabel?: string;
  /** Show phone number */
  showPhone?: boolean;
  /** Additional class names */
  className?: string;
}

export function MinimalHeader({
  showBack = true,
  backHref,
  backLabel = "Back",
  showPhone = true,
  className,
}: MinimalHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "px-6 py-4 md:py-5",
        "flex items-center justify-between",
        "bg-white border-b border-border",
        className
      )}
    >
      {/* Left: Back Button */}
      <div className="flex-1">
        {showBack && (
          <button
            onClick={handleBack}
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm text-charcoal-light hover:text-charcoal",
              "transition-colors"
            )}
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
        )}
      </div>

      {/* Center: Logo */}
      <Link
        href="/"
        className="font-display text-2xl md:text-[28px] font-medium text-charcoal hover:opacity-80 transition-opacity"
      >
        Astiglow<span className="text-gold">_</span>
      </Link>

      {/* Right: Phone or spacer */}
      <div className="flex-1 flex justify-end">
        {showPhone && (
          <a
            href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm text-charcoal-light hover:text-gold",
              "transition-colors"
            )}
          >
            <Phone size={16} />
            <span className="hidden md:inline">{businessInfo.phone}</span>
          </a>
        )}
      </div>
    </header>
  );
}

// ===========================================
// Minimal Layout Wrapper
// ===========================================

interface MinimalLayoutProps {
  children: React.ReactNode;
  /** Header options */
  header?: MinimalHeaderProps;
  /** Show compact footer */
  showFooter?: boolean;
  /** Additional main content class names */
  className?: string;
}

export function MinimalLayout({
  children,
  header = {},
  showFooter = true,
  className,
}: MinimalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <MinimalHeader {...header} />
      <main className={cn("flex-1", className)}>{children}</main>
      {showFooter && <FooterCompact />}
    </div>
  );
}

// ===========================================
// Booking Layout (specific variant)
// ===========================================

interface BookingLayoutProps {
  children: React.ReactNode;
  /** Current step for progress display */
  currentStep?: number;
  /** Total steps */
  totalSteps?: number;
}

export function BookingLayout({
  children,
  currentStep,
  totalSteps,
}: BookingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <MinimalHeader
        showBack={true}
        backLabel="Back to website"
        backHref="/"
        showPhone={true}
      />

      {/* Optional progress bar */}
      {currentStep !== undefined && totalSteps !== undefined && (
        <div className="h-1 bg-border">
          <div
            className="h-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}

      <main className="flex-1">{children}</main>
      <FooterCompact />
    </div>
  );
}

// ===========================================
// Checkout Layout (specific variant)
// ===========================================

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MinimalHeader
        showBack={true}
        backLabel="Continue shopping"
        backHref="/packages"
        showPhone={false}
      />
      <main className="flex-1 bg-cream">{children}</main>
      <FooterCompact />
    </div>
  );
}

// ===========================================
// Confirmation Layout (success pages)
// ===========================================

interface ConfirmationLayoutProps {
  children: React.ReactNode;
}

export function ConfirmationLayout({ children }: ConfirmationLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="px-6 py-5 flex justify-center bg-white border-b border-border">
        <Link
          href="/"
          className="font-display text-2xl md:text-[28px] font-medium text-charcoal"
        >
          Astiglow<span className="text-gold">_</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
      <FooterCompact />
    </div>
  );
}