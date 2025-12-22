// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Package data (should match your packages page)
const packages = [
  {
    id: 'brazilian-pkg',
    name: 'Brazilian Package',
    description: '11 sessions (9 paid + 2 free)',
    pricePerSession: 61,
    sessions: 9,
    bonusSessions: 2,
  },
  {
    id: 'full-face-pkg',
    name: 'Full Face Package',
    description: '11 sessions (9 paid + 2 free)',
    pricePerSession: 52,
    sessions: 9,
    bonusSessions: 2,
  },
  {
    id: 'full-leg-pkg',
    name: 'Full Leg Package',
    description: '11 sessions (9 paid + 2 free)',
    pricePerSession: 57,
    sessions: 9,
    bonusSessions: 2,
  },
  {
    id: 'eyebrow-pkg',
    name: 'Eyebrow Package',
    description: '11 sessions (9 paid + 2 free)',
    pricePerSession: 22,
    sessions: 9,
    bonusSessions: 2,
  },
  {
    id: 'underarm-pkg',
    name: 'Underarm Package',
    description: '11 sessions (9 paid + 2 free)',
    pricePerSession: 18,
    sessions: 9,
    bonusSessions: 2,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageId, customerEmail, successUrl, cancelUrl } = body;

    // Find the package
    const pkg = packages.find((p) => p.id === packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    // Calculate total price (price per session × number of paid sessions)
    const totalAmount = pkg.pricePerSession * pkg.sessions * 100; // Convert to cents

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna', 'affirm', 'afterpay_clearpay'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: pkg.name,
              description: pkg.description,
              metadata: {
                packageId: pkg.id,
                sessions: String(pkg.sessions),
                bonusSessions: String(pkg.bonusSessions),
              },
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/packages`,
      customer_email: customerEmail,
      metadata: {
        packageId: pkg.id,
        packageName: pkg.name,
        totalSessions: String(pkg.sessions + pkg.bonusSessions),
      },
      payment_intent_data: {
        metadata: {
          packageId: pkg.id,
          packageName: pkg.name,
          totalSessions: String(pkg.sessions + pkg.bonusSessions),
        },
      },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Billing address collection
      billing_address_collection: 'required',
      // Phone number collection
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// Get session details (for success page)
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });

    return NextResponse.json({
      status: session.status,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      metadata: session.metadata,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}