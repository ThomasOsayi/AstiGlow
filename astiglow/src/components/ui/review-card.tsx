import { cn } from "@/lib/utils";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-border p-8 transition-all duration-300",
        "hover:shadow-card hover:border-gold",
        className
      )}
    >
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={cn(
              "text-sm",
              i < review.rating ? "text-gold" : "text-border"
            )}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-[15px] text-charcoal-light leading-[1.8] italic mb-6">
        "{review.text}"
      </p>

      {/* Author & Date */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <span className="font-display text-lg text-charcoal">
          {review.author}
        </span>
        <span className="text-xs text-charcoal-light">{review.date}</span>
      </div>
    </div>
  );
}