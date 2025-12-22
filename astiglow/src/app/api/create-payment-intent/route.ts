// src/app/api/create-payment-intent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPackagesByIds, calculatePackageTotal } from '@/lib/data/packages';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageIds, customerEmail, customerName, customerPhone } = body;

    if (!packageIds || !Array.isArray(packageIds) || packageIds.length === 0) {
      return NextResponse.json(
        { error: 'No packages provided' },
        { status: 400 }
      );
    }

    // Get packages and calculate total
    const packages = getPackagesByIds(packageIds);
    
    if (packages.length !== packageIds.length) {
      return NextResponse.json(
        { error: 'One or more packages not found' },
        { status: 400 }
      );
    }

    // Calculate total amount (in cents)
    const amount = packages.reduce((sum, pkg) => {
      return sum + calculatePackageTotal(pkg);
    }, 0);

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        packageIds: packageIds.join(','),
        customerName: customerName || '',
        customerEmail: customerEmail || '',
        customerPhone: customerPhone || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

