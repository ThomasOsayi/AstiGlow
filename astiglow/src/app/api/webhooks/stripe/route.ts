// src/app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Stripe Webhook Handler',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('⚠️ Missing Stripe signature');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`⚠️ Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  console.log(`✅ Stripe webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`💰 Payment succeeded: ${paymentIntent.id}`);
        console.log(`   Amount: $${(paymentIntent.amount / 100).toFixed(2)}`);
        console.log(`   Customer: ${paymentIntent.customer || 'Guest'}`);
        console.log(`   Metadata:`, paymentIntent.metadata);
        
        // TODO: Update database with package purchase
        // TODO: Send confirmation email
        // TODO: Send SMS notification
        
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Payment failed: ${paymentIntent.id}`);
        console.log(`   Error: ${paymentIntent.last_payment_error?.message}`);
        
        // TODO: Send failure notification
        
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`↩️ Refund processed: ${charge.id}`);
        console.log(`   Amount refunded: $${(charge.amount_refunded / 100).toFixed(2)}`);
        
        // TODO: Update package credits
        
        break;
      }

      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer;
        console.log(`👤 New customer: ${customer.id}`);
        console.log(`   Email: ${customer.email}`);
        
        // TODO: Store customer in database
        
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`🛒 Checkout completed: ${session.id}`);
        console.log(`   Customer email: ${session.customer_email}`);
        console.log(`   Amount: $${((session.amount_total || 0) / 100).toFixed(2)}`);
        console.log(`   Metadata:`, session.metadata);
        
        // TODO: Fulfill order - grant package credits
        
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}