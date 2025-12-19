// src/components/layout/footer.tsx

import Link from "next/link";
import { businessInfo, shortHours } from "@/lib/data/business";
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "@/components/ui";
import { cn } from "@/lib/utils";

// ===========================================
// Footer Column Component
// ===========================================

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div className={className}>
      <h4 className="text-xs tracking-[0.15em] uppercase text-charcoal font-medium mb-5">
        {title}
      </h4>
      {children}
    </div>
  );
}

// ===========================================
// Social Link Component
// ===========================================

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-10 h-10 rounded-full border border-border",
        "flex items-center justify-center",
        "text-charcoal hover:text-gold hover:border-gold",
        "transition-colors duration-300"
      )}
      aria-label={label}
    >
      {icon}
    </a>
  );
}

// ===========================================
// Main Footer Component
// ===========================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border" role="contentinfo">
      {/* Main Footer Content */}
      <div className="px-6 md:px-10 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-[28px] font-medium text-charcoal inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              Astiglow<span className="text-gold">_</span>
            </Link>
            <p className="text-sm text-charcoal-light leading-relaxed max-w-[280px] mb-6">
              {businessInfo.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <SocialLink
                href={businessInfo.instagramUrl}
                icon={<Instagram size={18} />}
                label="Follow us on Instagram"
              />
              <SocialLink
                href={`mailto:${businessInfo.email}`}
                icon={<Mail size={18} />}
                label="Send us an email"
              />
            </div>
          </div>

          {/* Hours Column */}
          <FooterColumn title="Hours">
            <div className="space-y-2 text-sm text-charcoal-light">
              <p>{shortHours.weekday}</p>
              <p>{shortHours.weekend}</p>
            </div>
          </FooterColumn>

          {/* Location Column */}
          <FooterColumn title="Location">
            <address className="text-sm text-charcoal-light leading-relaxed not-italic mb-4">
              {businessInfo.address.street}
              <br />
              {businessInfo.address.suite}
              <br />
              {businessInfo.address.city}, {businessInfo.address.state}{" "}
              {businessInfo.address.zip}
            </address>
            <a
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-gold hover:text-charcoal transition-colors"
            >
              Get Directions
              <ArrowUpRight size={12} />
            </a>
          </FooterColumn>

          {/* Contact Column */}
          <FooterColumn title="Contact">
            <div className="space-y-3">
              <a
                href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>{businessInfo.phone}</span>
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span>{businessInfo.email}</span>
              </a>
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-charcoal-light hover:text-gold transition-colors"
              >
                <MapPin size={16} className="flex-shrink-0" />
                <span>View on Map</span>
              </a>
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-10 lg:px-20 py-5 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-light">
          <p>© {currentYear} Astiglow. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-charcoal transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-charcoal transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ===========================================
// Compact Footer (for booking flow, etc.)
// ===========================================

export function FooterCompact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border px-6 py-4" role="contentinfo">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-charcoal-light">
        <div className="flex items-center gap-2">
          <span className="font-display text-base text-charcoal">
            Astiglow<span className="text-gold">_</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">© {currentYear}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, "")}`}
            className="hover:text-gold transition-colors"
          >
            {businessInfo.phone}
          </a>
          <span>•</span>
          <Link href="/privacy" className="hover:text-charcoal transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ===========================================
// Footer with Newsletter
// ===========================================

interface FooterWithNewsletterProps {
  onSubscribe?: (email: string) => Promise<void>;
}

export function FooterWithNewsletter({ onSubscribe }: FooterWithNewsletterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border" role="contentinfo">
      {/* Newsletter Section */}
      <div className="px-6 md:px-10 lg:px-20 py-12 bg-cream border-b border-border">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-display text-2xl text-charcoal mb-3">
            Stay in the Glow<span className="text-gold">_</span>
          </h3>
          <p className="text-sm text-charcoal-light mb-6">
            Subscribe for exclusive offers, skincare tips, and appointment reminders.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
              if (email && onSubscribe) {
                await onSubscribe(email);
                form.reset();
              }
            }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className={cn(
                "flex-1 px-4 py-3 text-sm",
                "bg-white border border-border",
                "focus:outline-none focus:border-gold",
                "placeholder:text-charcoal-light/60",
                "transition-colors"
              )}
            />
            <button
              type="submit"
              className={cn(
                "px-6 py-3 bg-charcoal text-white",
                "text-xs uppercase tracking-[0.1em] font-medium",
                "hover:bg-gold transition-colors"
              )}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 md:px-10 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-[28px] font-medium text-charcoal inline-block mb-4"
            >
              Astiglow<span className="text-gold">_</span>
            </Link>
            <p className="text-sm text-charcoal-light leading-relaxed max-w-[280px] mb-6">
              {businessInfo.description}
            </p>
            <div className="flex gap-3">
              <SocialLink
                href={businessInfo.instagramUrl}
                icon={<Instagram size={18} />}
                label="Follow us on Instagram"
              />
              <SocialLink
                href={`mailto:${businessInfo.email}`}
                icon={<Mail size={18} />}
                label="Send us an email"
              />
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: "/services", label: "Services" },
                  { href: "/packages", label: "Packages" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  { href: "/book", label: "Book Now" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-charcoal-light hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterColumn>

          {/* Hours */}
          <FooterColumn title="Hours">
            <div className="space-y-2 text-sm text-charcoal-light">
              <p>{shortHours.weekday}</p>
              <p>{shortHours.weekend}</p>
            </div>
          </FooterColumn>

          {/* Location */}
          <FooterColumn title="Location">
            <address className="text-sm text-charcoal-light leading-relaxed not-italic mb-4">
              {businessInfo.address.street}
              <br />
              {businessInfo.address.suite}
              <br />
              {businessInfo.address.city}, {businessInfo.address.state}{" "}
              {businessInfo.address.zip}
            </address>
            <a
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-gold hover:text-charcoal transition-colors"
            >
              Get Directions
              <ArrowUpRight size={12} />
            </a>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-10 lg:px-20 py-5 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-light">
          <p>© {currentYear} Astiglow. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex gap-6">
            <Link href="/privacy" className="hover:text-charcoal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-charcoal transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}