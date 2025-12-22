// src/app/api/create-bnpl-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Package data
const packages: Record<string, { name: string; pricePerSession: number; sessions: number; bonus: number }> = {
  'brazilian-pkg': { name: 'Brazilian', pricePerSession: 61, sessions: 9, bonus: 2 },
  'full-face-pkg': { name: 'Full Face', pricePerSession: 52, sessions: 9, bonus: 2 },
  'full-leg-pkg': { name: 'Full Leg', pricePerSession: 57, sessions: 9, bonus: 2 },
  'eyebrow-pkg': { name: 'Eyebrow', pricePerSession: 22, sessions: 9, bonus: 2 },
  'underarm-pkg': { name: 'Underarm', pricePerSession: 18, sessions: 9, bonus: 2 },
};

type BNPLMethod = 'klarna' | 'affirm' | 'afterpay_clearpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageIds, customerEmail, customerName, paymentMethod } = body;

    if (!packageIds || !Array.isArray(packageIds) || packageIds.length === 0) {
      return NextResponse.json(
        { error: 'No packages provided' },
        { status: 400 }
      );
    }

    // Map payment method to Stripe payment method type
    const paymentMethodMap: Record<string, BNPLMethod> = {
      'klarna': 'klarna',
      'affirm': 'affirm',
      'afterpay': 'afterpay_clearpay',
    };

    const stripePaymentMethod = paymentMethodMap[paymentMethod];
    if (!stripePaymentMethod) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const pkgId of packageIds) {
      const pkg = packages[pkgId];
      if (!pkg) {
        return NextResponse.json(
          { error: `Invalid package: ${pkgId}` },
          { status: 400 }
        );
      }

      const totalSessions = pkg.sessions + pkg.bonus;
      const pkgTotal = pkg.pricePerSession * pkg.sessions;

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${pkg.name} Package`,
            description: `${totalSessions} sessions (${pkg.sessions} paid + ${pkg.bonus} bonus)`,
          },
          unit_amount: Math.round(pkgTotal * 100),
        },
        quantity: 1,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Create Checkout Session for BNPL
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [stripePaymentMethod],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        packageIds: packageIds.join(','),
        customerName: customerName || '',
        paymentMethod: paymentMethod,
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('BNPL session creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}