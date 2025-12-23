// src/app/api/webhooks/cal/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingRescheduled,
  type BookingDetails,
} from "@/lib/twilio";

// Cal.com webhook event types
type CalWebhookEvent =
  | "BOOKING_CREATED"
  | "BOOKING_RESCHEDULED"
  | "BOOKING_CANCELLED"
  | "BOOKING_REJECTED"
  | "BOOKING_REQUESTED"
  | "BOOKING_PAYMENT_INITIATED"
  | "MEETING_ENDED"
  | "MEETING_STARTED"
  | "RECORDING_READY";

// Cal.com webhook payload structure
interface CalWebhookPayload {
  triggerEvent: CalWebhookEvent;
  createdAt: string;
  payload: {
    title: string;
    type: string;
    description: string;
    startTime: string;
    endTime: string;
    organizer: {
      name: string;
      email: string;
      timeZone: string;
    };
    attendees: Array<{
      name: string;
      email: string;
      timeZone: string;
    }>;
    location?: string;
    destinationCalendar?: object;
    cancellationReason?: string;
    rejectionReason?: string;
    metadata?: {
      videoCallUrl?: string;
    };
    responses?: {
      phone?: { value: string };
      name?: { value: string };
      email?: { value: string };
      // Custom questions from Cal.com
      [key: string]: { value: string } | undefined;
    };
    uid: string;
    bookingId?: number;
    rescheduleUid?: string;
    rescheduleStartTime?: string;
    rescheduleEndTime?: string;
  };
}

// Verify webhook signature (optional but recommended)
function verifyWebhookSignature(
  request: NextRequest,
  body: string
): boolean {
  const webhookSecret = process.env.CAL_WEBHOOK_SECRET;
  
  // If no secret is configured, skip verification (for development)
  if (!webhookSecret) {
    console.warn("CAL_WEBHOOK_SECRET not set - skipping signature verification");
    return true;
  }

  // Cal.com sends signature in header
  const signature = request.headers.get("x-cal-signature-256");
  
  if (!signature) {
    console.warn("No webhook signature found in request");
    return false;
  }

  // Verify signature using HMAC SHA256
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Extract phone number from Cal.com booking
function extractPhoneNumber(payload: CalWebhookPayload["payload"]): string | null {
  // Check responses for phone field
  if (payload.responses?.phone?.value) {
    return payload.responses.phone.value;
  }
  
  // Check for common phone field variations
  const phoneKeys = ["phone", "phoneNumber", "phone_number", "mobile"];
  for (const key of phoneKeys) {
    if (payload.responses?.[key]?.value) {
      return payload.responses[key]!.value;
    }
  }

  return null;
}

// Format date/time for SMS
function formatDateTime(isoString: string, timeZone: string = "America/Los_Angeles"): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
}

// Calculate duration in minutes
function calculateDuration(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
}

// Build BookingDetails from Cal.com payload
function buildBookingDetails(payload: CalWebhookPayload["payload"]): BookingDetails | null {
  const phone = extractPhoneNumber(payload);
  
  if (!phone) {
    console.warn("No phone number found in booking - skipping SMS");
    return null;
  }

  const attendee = payload.attendees?.[0];
  const customerName = attendee?.name || payload.responses?.name?.value || "there";
  const timeZone = attendee?.timeZone || payload.organizer.timeZone || "America/Los_Angeles";

  return {
    customerName,
    customerPhone: phone,
    serviceName: payload.title || payload.type || "your service",
    dateTime: formatDateTime(payload.startTime, timeZone),
    duration: calculateDuration(payload.startTime, payload.endTime),
  };
}

export async function POST(request: NextRequest) {
  let rawBody: string;
  
  try {
    // Read raw body for signature verification
    rawBody = await request.text();
    
    // Verify webhook signature
    if (!verifyWebhookSignature(request, rawBody)) {
      console.error("Webhook signature verification failed");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the body
    const webhookData: CalWebhookPayload = JSON.parse(rawBody);
    const { triggerEvent, payload } = webhookData;

    console.log(`Cal.com webhook received: ${triggerEvent}`, {
      bookingId: payload.bookingId,
      uid: payload.uid,
      title: payload.title,
    });

    // Build booking details for SMS
    const bookingDetails = buildBookingDetails(payload);

    // Handle different event types
    switch (triggerEvent) {
      case "BOOKING_CREATED":
      case "BOOKING_REQUESTED": {
        if (bookingDetails) {
          const result = await sendBookingConfirmation(bookingDetails);
          console.log("Booking confirmation SMS:", result);
        }
        break;
      }

      case "BOOKING_RESCHEDULED": {
        if (bookingDetails && payload.rescheduleStartTime) {
          const oldDateTime = formatDateTime(
            payload.rescheduleStartTime,
            payload.attendees?.[0]?.timeZone || "America/Los_Angeles"
          );
          const result = await sendBookingRescheduled(bookingDetails, oldDateTime);
          console.log("Booking rescheduled SMS:", result);
        }
        break;
      }

      case "BOOKING_CANCELLED":
      case "BOOKING_REJECTED": {
        if (bookingDetails) {
          const result = await sendBookingCancellation(bookingDetails);
          console.log("Booking cancellation SMS:", result);
        }
        break;
      }

      case "MEETING_ENDED":
      case "MEETING_STARTED":
      case "RECORDING_READY":
      case "BOOKING_PAYMENT_INITIATED": {
        // Log but don't send SMS for these events
        console.log(`Event ${triggerEvent} received - no SMS action needed`);
        break;
      }

      default: {
        console.log(`Unhandled webhook event: ${triggerEvent}`);
      }
    }

    return NextResponse.json(
      { 
        received: true, 
        event: triggerEvent,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
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
    status: "ok",
    service: "Cal.com Webhook Handler",
    features: ["SMS notifications via Twilio"],
    timestamp: new Date().toISOString(),
  });
}