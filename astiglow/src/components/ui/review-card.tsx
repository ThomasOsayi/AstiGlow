"use client";

import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="bg-white p-8 transition-all duration-300 h-full flex flex-col"
      style={{
        border: "1px solid #E5DED6",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#C4A484";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(45, 42, 38, 0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5DED6";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} style={{ color: "#C4A484", fontSize: "14px" }}>
            ★
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p
        className="text-[15px] leading-relaxed mb-6 italic flex-1"
        style={{ color: "#6B6560" }}
      >
        "{review.text}"
      </p>

      {/* Author & Date */}
      <div
        className="flex justify-between items-center pt-4"
        style={{ borderTop: "1px solid #E5DED6" }}
      >
        <span
          className="font-display text-lg"
          style={{ color: "#2D2A26" }}
        >
          {review.author}
        </span>
        <span className="text-xs" style={{ color: "#6B6560" }}>
          {review.date}
        </span>
      </div>
    </div>
  );
}