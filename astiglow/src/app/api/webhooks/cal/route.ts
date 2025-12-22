// src/app/api/webhooks/cal/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Webhook handler for Cal.com events
    const body = await request.json();
    
    // TODO: Handle webhook events from Cal.com
    console.log("Cal.com webhook received:", body);
    
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling Cal.com webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'Cal.com Webhook Handler',
    timestamp: new Date().toISOString()
  });
}