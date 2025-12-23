// src/app/api/sms/send/route.ts

import { NextRequest, NextResponse } from "next/server";
import { sendSMS, sendCustomSMS, type SMSResult } from "@/lib/twilio";

// Simple API key check for admin endpoints
function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ADMIN_API_KEY;
  
  // If no admin key is configured, deny all requests in production
  if (!expectedKey) {
    if (process.env.NODE_ENV === "production") {
      return false;
    }
    // Allow in development without key
    console.warn("ADMIN_API_KEY not set - allowing request in development");
    return true;
  }
  
  return apiKey === expectedKey;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { to, message } = body;

    // Validate required fields
    if (!to || !message) {
      return NextResponse.json(
        { error: "Missing required fields: to, message" },
        { status: 400 }
      );
    }

    // Validate phone number format (basic check)
    const phoneDigits = to.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Send the SMS
    const result: SMSResult = await sendCustomSMS(to, message);

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: "SMS sent successfully",
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || "Failed to send SMS" 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in SMS send endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint for testing the service
export async function GET() {
  // Check if Twilio is configured
  const isConfigured = !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  );

  return NextResponse.json({
    status: "ok",
    service: "SMS Send API",
    configured: isConfigured,
    usage: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "your-admin-api-key",
      },
      body: {
        to: "+1234567890",
        message: "Your message here",
      },
    },
    timestamp: new Date().toISOString(),
  });
}