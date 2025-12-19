import type { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: "review-1",
    text: "Aster is amazing! I've been seeing her for over three years now. Her new studio is lovely, and despite being a little farther from me now, I'm still willing to make the drive to see her, because nobody can shape my eyebrows as well as she does! She's also so kind and welcoming. I would recommend her to anyone.",
    author: "Lauren",
    date: "12.14.2025",
    rating: 5,
  },
  {
    id: "review-2",
    text: "I have been going to Aster exclusively for over 5 years and I always receive compliments on my brows. She is professional, attentive, friendly, and makes you feel at ease as soon as you step through her doors. Her salon is always clean. Best waxer on the Westside!",
    author: "Hiroko",
    date: "11.26.2025",
    rating: 5,
  },
  {
    id: "review-3",
    text: "I've been seeing Aster for the last 4 years and I'm thrilled that she is on her own now. Her studio is beyond lovely!!! The ambiance, the smell, the atmosphere and most of all, her. She makes you feel so comfortable on the table and I always walk away with so much more than a fresh wax. Aster is top tier!",
    author: "Alli M",
    date: "11.25.2025",
    rating: 5,
  },
  {
    id: "review-4",
    text: "Highly recommended! Aster is the best in the business.",
    author: "Jordan",
    date: "11.24.2025",
    rating: 5,
  },
  {
    id: "review-5",
    text: "BEST waxing experience I've ever had. She was so gentle, kind, professional, and thorough. I will never be able to go to anyone else.",
    author: "Christina Ellmers",
    date: "11.21.2025",
    rating: 5,
  },
];

// ===========================================
// Helper Functions
// ===========================================
export function getFeaturedReviews(count: number = 3): Review[] {
  return reviews.slice(0, count);
}

export function getAverageRating(): number {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

export function getTotalReviewCount(): number {
  return reviews.length;
}