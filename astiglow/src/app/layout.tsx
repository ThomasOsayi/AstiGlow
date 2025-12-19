// src/app/layout.tsx

import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Astiglow_ | Premium Waxing Studio in Los Angeles",
    template: "%s | Astiglow_",
  },
  description:
    "Experience premium hard wax treatments in a clean, serene environment. Specializing in gentle techniques for even the most sensitive skin. Located in Los Angeles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}