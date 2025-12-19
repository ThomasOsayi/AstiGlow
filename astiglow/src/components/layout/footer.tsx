// src/components/layout/footer.tsx

import Link from "next/link";
import { businessInfo, shortHours } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      {/* Main Footer */}
      <div className="px-6 md:px-10 lg:px-20 py-12 lg:py-[60px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[60px]">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-[28px] font-medium text-charcoal inline-block mb-4"
            >
              Astiglow<span className="text-gold">_</span>
            </Link>
            <p className="text-sm text-charcoal-light leading-[1.7] max-w-[280px]">
              {businessInfo.description}
            </p>
          </div>

          {/* Hours Column */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-charcoal font-normal mb-5">
              Hours
            </h4>
            <p className="text-sm text-charcoal-light leading-8">
              {shortHours.weekday}
              <br />
              {shortHours.weekend}
            </p>
          </div>

          {/* Location Column */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-charcoal font-normal mb-5">
              Location
            </h4>
            <p className="text-sm text-charcoal-light leading-[1.7]">
              {businessInfo.address.street}
              <br />
              {businessInfo.address.suite}
              <br />
              {businessInfo.address.city}, {businessInfo.address.state}{" "}
              {businessInfo.address.zip}
            </p>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-charcoal font-normal mb-5">
              Connect
            </h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href={businessInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-charcoal text-sm hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
              {/* Email */}
              <a
                href={`mailto:${businessInfo.email}`}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-charcoal text-sm hover:border-gold hover:text-gold transition-colors"
                aria-label="Email"
              >
                @
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-10 lg:px-20 py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-light">
        <p>© {new Date().getFullYear()} Astiglow. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-charcoal transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-charcoal transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}