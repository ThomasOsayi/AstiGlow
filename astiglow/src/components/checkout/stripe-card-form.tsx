// src/components/checkout/stripe-card-form.tsx

'use client';

import { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { cn } from '@/lib/utils';

// Custom icon components
const LockIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

interface StripeCardFormProps {
  clientSecret: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  onProcessing: (processing: boolean) => void;
  customerEmail: string;
  amount: number;
  triggerSubmit?: boolean;
  onReady?: () => void;
}

// Stripe Elements styling options
const elementOptions = {
  style: {
    base: {
      fontSize: '15px',
      color: '#2D2A26',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      '::placeholder': {
        color: '#6B6560',
      },
    },
    invalid: {
      color: '#dc2626',
      iconColor: '#dc2626',
    },
  },
};

export function StripeCardForm({
  clientSecret,
  onSuccess,
  onError,
  onProcessing,
  customerEmail,
  amount,
  triggerSubmit,
  onReady,
}: StripeCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [cardExpiryError, setCardExpiryError] = useState<string | null>(null);
  const [cardCvcError, setCardCvcError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Check if form is ready
  useEffect(() => {
    if (stripe && elements && !isReady) {
      setIsReady(true);
      onReady?.();
    }
  }, [stripe, elements, isReady, onReady]);

  // Handle submit trigger from parent
  useEffect(() => {
    if (triggerSubmit && stripe && elements && clientSecret) {
      handleSubmit();
    }
  }, [triggerSubmit]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      onError('Stripe has not loaded yet');
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      onError('Card element not found');
      return;
    }

    onProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            email: customerEmail,
          },
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
        onProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else {
        onError('Payment was not completed');
        onProcessing(false);
      }
    } catch (err: any) {
      onError(err.message || 'An unexpected error occurred');
      onProcessing(false);
    }
  };

  const isFormComplete = cardNumberComplete && cardExpiryComplete && cardCvcComplete;

  return (
    <div className="mt-6 p-5 bg-white border border-border animate-scale-in">
      <p className="text-[10px] tracking-[0.1em] uppercase mb-4 text-gold">
        Card Details
      </p>

      <div className="flex flex-col gap-4">
        {/* Card Number */}
        <div>
          <div
            className={cn(
              'w-full p-3.5 bg-cream border transition-colors',
              cardNumberError ? 'border-red-500' : 'border-border focus-within:border-gold'
            )}
          >
            <CardNumberElement
              options={elementOptions}
              onChange={(e) => {
                setCardNumberComplete(e.complete);
                setCardNumberError(e.error?.message || null);
              }}
            />
          </div>
          {cardNumberError && (
            <p className="text-[11px] mt-1.5 text-red-500">{cardNumberError}</p>
          )}
        </div>

        {/* Expiry & CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div
              className={cn(
                'w-full p-3.5 bg-cream border transition-colors',
                cardExpiryError ? 'border-red-500' : 'border-border focus-within:border-gold'
              )}
            >
              <CardExpiryElement
                options={elementOptions}
                onChange={(e) => {
                  setCardExpiryComplete(e.complete);
                  setCardExpiryError(e.error?.message || null);
                }}
              />
            </div>
            {cardExpiryError && (
              <p className="text-[11px] mt-1.5 text-red-500">{cardExpiryError}</p>
            )}
          </div>
          <div>
            <div
              className={cn(
                'w-full p-3.5 bg-cream border transition-colors',
                cardCvcError ? 'border-red-500' : 'border-border focus-within:border-gold'
              )}
            >
              <CardCvcElement
                options={elementOptions}
                onChange={(e) => {
                  setCardCvcComplete(e.complete);
                  setCardCvcError(e.error?.message || null);
                }}
              />
            </div>
            {cardCvcError && (
              <p className="text-[11px] mt-1.5 text-red-500">{cardCvcError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-charcoal-light">
        <LockIcon size={14} />
        <span className="text-xs">Secured by Stripe</span>
      </div>

      {/* Hidden input to track form completion for parent */}
      <input
        type="hidden"
        id="stripe-form-complete"
        value={isFormComplete ? 'true' : 'false'}
      />
    </div>
  );
}

// Export a check function for the parent component
export function useStripeFormReady() {
  const stripe = useStripe();
  const elements = useElements();
  return !!(stripe && elements);
}