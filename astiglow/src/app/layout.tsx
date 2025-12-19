// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar, NavbarSpacer } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui";
import "./globals.css";

// ===========================================
// Font Configuration
// ===========================================

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

// ===========================================
// Metadata
// ===========================================

export const metadata: Metadata = {
  title: {
    default: "Astiglow_ | Premium Waxing Studio in Los Angeles",
    template: "%s | Astiglow_",
  },
  description:
    "Experience premium hard wax treatments in a clean, serene environment. Specializing in gentle techniques for even the most sensitive skin. Located in Los Angeles.",
  keywords: [
    "waxing",
    "Los Angeles",
    "Brazilian wax",
    "eyebrow waxing",
    "spa",
    "beauty",
    "skincare",
    "hard wax",
    "sensitive skin",
    "Westside LA",
  ],
  authors: [{ name: "Astiglow" }],
  creator: "Astiglow",
  publisher: "Astiglow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://astiglow.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Astiglow_ | Premium Waxing Studio in Los Angeles",
    description:
      "Experience premium hard wax treatments in a clean, serene environment. Specializing in gentle techniques for even the most sensitive skin.",
    url: "https://astiglow.com",
    siteName: "Astiglow",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Astiglow - Premium Waxing Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astiglow_ | Premium Waxing Studio in Los Angeles",
    description:
      "Experience premium hard wax treatments in a clean, serene environment.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ===========================================
// Root Layout
// ===========================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased min-h-screen flex flex-col">
        <ToastProvider position="bottom-right">
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-charcoal focus:text-white focus:outline-none"
          >
            Skip to main content
          </a>

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

// ===========================================
// Alternate Layout: Minimal (for booking, checkout)
// ===========================================

// Use this in specific pages that need a minimal layout:
// export { MinimalLayout } from "@/components/layout/minimal-layout";