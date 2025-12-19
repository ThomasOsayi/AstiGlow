// src/components/ui/review-card.tsx

"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { StarFilled, Check, Quote } from "./icons";
import type { Review } from "@/types";

// ===========================================
// Extended Review Type (for V2 features)
// ===========================================

export interface ReviewV2 extends Review {
  /** Services the reviewer received */
  services?: string[];
  /** Whether the review is verified */
  verified?: boolean;
  /** Source of the review (e.g., "Google", "Yelp") */
  source?: string;
  /** Reviewer's initial/avatar */
  initial?: string;
}

// ===========================================
// ReviewCard Types
// ===========================================

interface ReviewCardBaseProps {
  /** Review data */
  review: Review | ReviewV2;
  /** Additional class names */
  className?: string;
}

interface ReviewCardDefaultProps extends ReviewCardBaseProps {
  /** Display mode */
  mode?: "default";
}

interface ReviewCardFeaturedProps extends ReviewCardBaseProps {
  /** Display mode - larger, more prominent */
  mode: "featured";
}

interface ReviewCardCompactProps extends ReviewCardBaseProps {
  /** Display mode - minimal, for lists */
  mode: "compact";
}

interface ReviewCardQuoteProps extends ReviewCardBaseProps {
  /** Display mode - testimonial style with quote marks */
  mode: "quote";
}

export type ReviewCardProps =
  | ReviewCardDefaultProps
  | ReviewCardFeaturedProps
  | ReviewCardCompactProps
  | ReviewCardQuoteProps;

// ===========================================
// ReviewCard Component
// ===========================================

export const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(
  (props, ref) => {
    const { review, className, mode = "default" } = props;

    if (mode === "featured") {
      return <FeaturedReviewCard ref={ref} review={review} className={className} />;
    }

    if (mode === "compact") {
      return <CompactReviewCard ref={ref} review={review} className={className} />;
    }

    if (mode === "quote") {
      return <QuoteReviewCard ref={ref} review={review} className={className} />;
    }

    // Default mode
    return <DefaultReviewCard ref={ref} review={review} className={className} />;
  }
);

ReviewCard.displayName = "ReviewCard";

// ===========================================
// Default ReviewCard
// ===========================================

interface DefaultReviewCardProps {
  review: Review | ReviewV2;
  className?: string;
}

const DefaultReviewCard = forwardRef<HTMLDivElement, DefaultReviewCardProps>(
  ({ review, className }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const extendedReview = review as ReviewV2;
    const hasServices = extendedReview.services && extendedReview.services.length > 0;
    
    // Truncate long reviews
    const maxLength = 200;
    const isLongReview = review.text.length > maxLength;
    const displayText = isLongReview && !isExpanded 
      ? review.text.slice(0, maxLength) + "..." 
      : review.text;

    return (
      <div
        ref={ref}
        className={cn(
          "group bg-white p-8 h-full flex flex-col",
          "border border-border transition-all duration-300",
          "hover:border-gold hover:shadow-[0_10px_30px_rgba(45,42,38,0.06)]",
          className
        )}
      >
        {/* Header: Stars + Verified Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarFilled
                key={i}
                size={14}
                className={cn(
                  i < review.rating ? "text-gold" : "text-border"
                )}
              />
            ))}
          </div>
          {extendedReview.verified && (
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-charcoal-light">
              <Check size={12} className="text-green-600" />
              Verified
            </span>
          )}
        </div>

        {/* Service Tags */}
        {hasServices && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {extendedReview.services!.map((service, i) => (
              <span
                key={i}
                className="px-2 py-1 text-[10px] uppercase tracking-wider bg-cream text-charcoal-light rounded-sm"
              >
                {service}
              </span>
            ))}
          </div>
        )}

        {/* Review Text */}
        <div className="flex-1">
          <p className="text-[15px] leading-relaxed text-charcoal-light italic">
            "{displayText}"
          </p>
          {isLongReview && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gold hover:text-gold/80 mt-2 transition-colors"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Author & Date */}
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
          <div className="flex items-center gap-3">
            {/* Avatar/Initial */}
            <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-sm font-medium text-charcoal">
              {extendedReview.initial || review.author.charAt(0)}
            </div>
            <span className="font-display text-lg text-charcoal">
              {review.author}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-charcoal-light block">
              {review.date}
            </span>
            {extendedReview.source && (
              <span className="text-[10px] text-charcoal-light/70">
                via {extendedReview.source}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DefaultReviewCard.displayName = "DefaultReviewCard";

// ===========================================
// Featured ReviewCard (for hero/highlight)
// ===========================================

const FeaturedReviewCard = forwardRef<HTMLDivElement, DefaultReviewCardProps>(
  ({ review, className }, ref) => {
    const extendedReview = review as ReviewV2;

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white p-10 lg:p-12 relative",
          "border-l-[3px] border-l-gold border border-border",
          "shadow-[0_20px_60px_rgba(45,42,38,0.1)]",
          className
        )}
      >
        {/* Large quote mark */}
        <Quote 
          size={48} 
          className="text-gold/20 absolute top-8 right-8" 
          strokeWidth={1}
        />

        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <StarFilled
              key={i}
              size={18}
              className={cn(
                i < review.rating ? "text-gold" : "text-border"
              )}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="font-display text-2xl lg:text-[28px] leading-relaxed text-charcoal italic mb-8">
          "{review.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center text-lg font-medium text-charcoal">
            {extendedReview.initial || review.author.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-charcoal">{review.author}</p>
            <p className="text-sm text-charcoal-light">{review.date}</p>
          </div>
          {extendedReview.verified && (
            <span className="ml-auto flex items-center gap-1 text-xs text-charcoal-light">
              <Check size={14} className="text-green-600" />
              Verified Client
            </span>
          )}
        </div>
      </div>
    );
  }
);

FeaturedReviewCard.displayName = "FeaturedReviewCard";

// ===========================================
// Compact ReviewCard (for lists/sidebar)
// ===========================================

const CompactReviewCard = forwardRef<HTMLDivElement, DefaultReviewCardProps>(
  ({ review, className }, ref) => {
    // Truncate to first sentence or 100 chars
    const shortText = review.text.length > 100 
      ? review.text.slice(0, 100) + "..." 
      : review.text;

    return (
      <div
        ref={ref}
        className={cn(
          "py-4 border-b border-border last:border-b-0",
          className
        )}
      >
        {/* Stars + Author on same line */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarFilled
                  key={i}
                  size={10}
                  className={cn(
                    i < review.rating ? "text-gold" : "text-border"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-charcoal">
              {review.author}
            </span>
          </div>
          <span className="text-[10px] text-charcoal-light">
            {review.date}
          </span>
        </div>

        {/* Short text */}
        <p className="text-sm text-charcoal-light leading-relaxed">
          "{shortText}"
        </p>
      </div>
    );
  }
);

CompactReviewCard.displayName = "CompactReviewCard";

// ===========================================
// Quote ReviewCard (for testimonial carousel)
// ===========================================

const QuoteReviewCard = forwardRef<HTMLDivElement, DefaultReviewCardProps>(
  ({ review, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-center px-4 py-8",
          className
        )}
      >
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <StarFilled
              key={i}
              size={16}
              className={cn(
                i < review.rating ? "text-gold" : "text-white/30"
              )}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-display text-2xl lg:text-[28px] leading-relaxed italic mb-6">
          "{review.text}"
        </blockquote>

        {/* Author */}
        <p className="text-xs uppercase tracking-[0.15em] text-gold">
          — {review.author}
        </p>
      </div>
    );
  }
);

QuoteReviewCard.displayName = "QuoteReviewCard";

// ===========================================
// Star Rating Display Component
// ===========================================

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 14,
  showValue = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-0.5">
        {[...Array(maxRating)].map((_, i) => (
          <StarFilled
            key={i}
            size={size}
            className={cn(
              i < rating ? "text-gold" : "text-border"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-charcoal-light">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// ===========================================
// Reviews Summary Component
// ===========================================

interface ReviewsSummaryProps {
  rating: number;
  totalReviews: number;
  className?: string;
}

export function ReviewsSummary({
  rating,
  totalReviews,
  className,
}: ReviewsSummaryProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <StarRating rating={rating} size={16} />
      <span className="text-sm text-charcoal-light">
        {rating.toFixed(1)} ({totalReviews} reviews)
      </span>
    </div>
  );
}