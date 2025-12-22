// src/app/(main)/checkout/success/page.tsx

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface SessionData {
  status: string;
  customerEmail: string;
  amountTotal: number;
  metadata: {
    packageId: string;
    packageName: string;
    totalSessions: string;
  };
  paymentStatus: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided");
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout?session_id=${sessionId}`);
        if (!response.ok) throw new Error("Failed to fetch session");
        const data = await response.json();
        setSessionData(data);
      } catch (err) {
        setError("Unable to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="text-center">
          <div
            className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
            style={{
              border: "2px solid #E5DED6",
              borderTopColor: "#C4A484",
            }}
          />
          <p style={{ color: "#6B6560" }}>Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="text-center max-w-md px-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(214, 69, 69, 0.1)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D64545" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="font-display text-2xl mb-3" style={{ color: "#2D2A26" }}>
            Something went wrong
          </h1>
          <p className="text-sm mb-6" style={{ color: "#6B6560" }}>
            {error}
          </p>
          <Link href="/packages">
            <button
              className="px-8 py-3 text-xs tracking-[0.1em] uppercase font-medium transition-colors"
              style={{ backgroundColor: "#2D2A26", color: "#FFFFFF" }}
            >
              Back to Packages
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAFAF8" }}>
      <style jsx global>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      {/* Header */}
      <header
        className="px-6 md:px-16 py-5 flex justify-between items-center bg-white"
        style={{ borderBottom: "1px solid #E5DED6" }}
      >
        <Link
          href="/"
          className="font-display text-[28px] font-medium tracking-wide"
          style={{ color: "#2D2A26" }}
        >
          Astiglow<span style={{ color: "#C4A484" }}>_</span>
        </Link>
      </header>

      {/* Success Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-lg">
          {/* Success Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in"
            style={{ backgroundColor: "rgba(196, 164, 132, 0.15)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4A484" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1
            className="font-display text-4xl mb-3 animate-fade-in-up stagger-1"
            style={{ color: "#2D2A26" }}
          >
            Purchase Complete!
          </h1>

          <p
            className="text-base mb-8 animate-fade-in-up stagger-2"
            style={{ color: "#6B6560" }}
          >
            Thank you for your purchase. Your package credits have been added to your account.
          </p>

          {/* Order Summary */}
          {sessionData && (
            <div
              className="p-6 mb-8 text-left animate-fade-in-up stagger-3"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5DED6" }}
            >
              <h3
                className="text-xs tracking-[0.1em] uppercase mb-4"
                style={{ color: "#C4A484" }}
              >
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: "#6B6560" }}>Package</span>
                  <span style={{ color: "#2D2A26" }}>{sessionData.metadata?.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B6560" }}>Sessions</span>
                  <span style={{ color: "#2D2A26" }}>{sessionData.metadata?.totalSessions} total</span>
                </div>
                <div
                  className="flex justify-between pt-3"
                  style={{ borderTop: "1px solid #E5DED6" }}
                >
                  <span className="font-medium" style={{ color: "#2D2A26" }}>Total Paid</span>
                  <span className="font-display text-xl" style={{ color: "#2D2A26" }}>
                    ${((sessionData.amountTotal || 0) / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-xs mt-4" style={{ color: "#6B6560" }}>
                Confirmation sent to: {sessionData.customerEmail}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up stagger-4">
            <Link href="/book">
              <button
                className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.1em] uppercase font-medium transition-colors hover:bg-[#C4A484]"
                style={{ backgroundColor: "#2D2A26", color: "#FFFFFF" }}
              >
                Book an Appointment
              </button>
            </Link>
            <Link href="/">
              <button
                className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.1em] uppercase font-medium transition-colors hover:bg-[#2D2A26] hover:text-white"
                style={{
                  backgroundColor: "transparent",
                  color: "#2D2A26",
                  border: "1px solid #2D2A26",
                }}
              >
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="px-6 py-6 text-center"
        style={{ borderTop: "1px solid #E5DED6" }}
      >
        <p className="text-xs" style={{ color: "#6B6560" }}>
          Questions? Contact us at{" "}
          <a href="tel:3103097901" style={{ color: "#C4A484" }}>
            (310) 309-7901
          </a>{" "}
          or{" "}
          <a href="mailto:hello@astiglow.com" style={{ color: "#C4A484" }}>
            hello@astiglow.com
          </a>
        </p>
      </footer>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="text-center">
        <div
          className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
          style={{
            border: "2px solid #E5DED6",
            borderTopColor: "#C4A484",
          }}
        />
        <p style={{ color: "#6B6560" }}>Loading...</p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}