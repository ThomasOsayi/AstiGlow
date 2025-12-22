// src/components/checkout/stripe-card-form.tsx

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Track previous triggerSubmit to detect changes
  const prevTriggerSubmit = useRef(triggerSubmit);

  // Check if form is ready
  useEffect(() => {
    if (stripe && elements && !isReady) {
      console.log('StripeCardForm: Stripe and Elements ready');
      setIsReady(true);
      onReady?.();
    }
  }, [stripe, elements, isReady, onReady]);

  // Handle payment submission
  const processPayment = useCallback(async () => {
    console.log('StripeCardForm: processPayment called');
    console.log('StripeCardForm: stripe available:', !!stripe);
    console.log('StripeCardForm: elements available:', !!elements);
    console.log('StripeCardForm: clientSecret available:', !!clientSecret);

    if (!stripe || !elements) {
      console.error('StripeCardForm: Stripe not loaded');
      onError('Stripe has not loaded yet. Please refresh and try again.');
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    console.log('StripeCardForm: cardNumber element:', !!cardNumber);
    
    if (!cardNumber) {
      console.error('StripeCardForm: Card element not found');
      onError('Card form not found. Please refresh and try again.');
      return;
    }

    if (isProcessing) {
      console.log('StripeCardForm: Already processing, skipping');
      return;
    }

    setIsProcessing(true);
    onProcessing(true);

    try {
      console.log('StripeCardForm: Calling stripe.confirmCardPayment');
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            email: customerEmail,
          },
        },
      });

      console.log('StripeCardForm: confirmCardPayment response:', { error, paymentIntent });

      if (error) {
        console.error('StripeCardForm: Payment error:', error);
        onError(error.message || 'Payment failed. Please try again.');
        setIsProcessing(false);
        onProcessing(false);
      } else if (paymentIntent) {
        console.log('StripeCardForm: PaymentIntent status:', paymentIntent.status);
        if (paymentIntent.status === 'succeeded') {
          console.log('StripeCardForm: Payment succeeded!');
          onSuccess(paymentIntent.id);
        } else if (paymentIntent.status === 'requires_action') {
          // 3D Secure or other authentication required
          console.log('StripeCardForm: Payment requires additional action');
          onError('Additional authentication required. Please try again.');
          setIsProcessing(false);
          onProcessing(false);
        } else {
          console.log('StripeCardForm: Payment not completed, status:', paymentIntent.status);
          onError(`Payment not completed. Status: ${paymentIntent.status}`);
          setIsProcessing(false);
          onProcessing(false);
        }
      }
    } catch (err: any) {
      console.error('StripeCardForm: Exception:', err);
      onError(err.message || 'An unexpected error occurred. Please try again.');
      setIsProcessing(false);
      onProcessing(false);
    }
  }, [stripe, elements, clientSecret, customerEmail, onSuccess, onError, onProcessing, isProcessing]);

  // Handle submit trigger from parent - detect transition from false to true
  useEffect(() => {
    const wasNotTriggered = !prevTriggerSubmit.current;
    const isNowTriggered = triggerSubmit;
    
    console.log('StripeCardForm: triggerSubmit effect', { 
      wasNotTriggered, 
      isNowTriggered, 
      stripe: !!stripe, 
      elements: !!elements 
    });

    if (wasNotTriggered && isNowTriggered && stripe && elements && clientSecret) {
      console.log('StripeCardForm: Trigger detected, processing payment');
      processPayment();
    }
    
    prevTriggerSubmit.current = triggerSubmit;
  }, [triggerSubmit, stripe, elements, clientSecret, processPayment]);

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