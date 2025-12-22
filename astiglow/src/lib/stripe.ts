// src/lib/stripe.ts

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Types for checkout
export interface CheckoutOptions {
  packageId: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

// Create a checkout session and redirect
export async function redirectToCheckout(options: CheckoutOptions): Promise<void> {
  try {
    // Create checkout session on the server
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { url } = await response.json() as CheckoutResponse;

    // Redirect to Stripe Checkout
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

// Alternative: Use Stripe.js to redirect (if you need more control)
export async function redirectToCheckoutWithStripe(sessionId: string): Promise<void> {
  const stripe = await getStripe();
  if (!stripe) throw new Error('Stripe failed to load');

  // Type assertion needed due to TypeScript type definitions
  const { error } = await (stripe as any).redirectToCheckout({ sessionId });
  if (error) {
    throw new Error(error.message);
  }
}