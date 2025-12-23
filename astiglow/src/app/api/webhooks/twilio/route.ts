// src/app/api/webhooks/twilio/route.ts

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Verify that the request is actually from Twilio
function validateTwilioRequest(request: NextRequest, body: string): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  // Skip validation in development if no auth token
  if (!authToken) {
    console.warn("TWILIO_AUTH_TOKEN not set - skipping request validation");
    return true;
  }

  const twilioSignature = request.headers.get("x-twilio-signature");
  const url = request.url;

  if (!twilioSignature) {
    console.error("No Twilio signature found");
    return false;
  }

  // Parse the body as form data for validation
  const params = Object.fromEntries(new URLSearchParams(body));

  return twilio.validateRequest(authToken, twilioSignature, url, params);
}

// Generate TwiML response
function twimlResponse(message: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${message}</Message>
</Response>`;
}

export async function POST(request: NextRequest) {
  let rawBody: string;

  try {
    rawBody = await request.text();

    // Validate the request is from Twilio (optional in dev)
    if (process.env.NODE_ENV === "production") {
      if (!validateTwilioRequest(request, rawBody)) {
        return new Response("Forbidden", { status: 403 });
      }
    }

    // Parse form-encoded body from Twilio
    const params = Object.fromEntries(new URLSearchParams(rawBody));
    
    const from = params.From || "";
    const body = params.Body || "";
    const messageSid = params.MessageSid || "";

    console.log("Incoming SMS:", {
      from,
      body: body.substring(0, 50) + (body.length > 50 ? "..." : ""),
      messageSid,
    });

    // Handle STOP/unsubscribe (Twilio handles this automatically, but log it)
    const normalizedBody = body.trim().toUpperCase();
    if (["STOP", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"].includes(normalizedBody)) {
      console.log(`Opt-out received from ${from}`);
      // Twilio automatically handles opt-out, no response needed
      return new Response(twimlResponse("You have been unsubscribed. Reply START to resubscribe."), {
        headers: { "Content-Type": "text/xml" },
      });
    }

    // Handle START/resubscribe
    if (["START", "SUBSCRIBE", "YES"].includes(normalizedBody)) {
      console.log(`Opt-in received from ${from}`);
      return new Response(
        twimlResponse("You have been resubscribed to Astiglow appointment reminders."),
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Handle HELP
    if (normalizedBody === "HELP") {
      return new Response(
        twimlResponse(
          "Astiglow Waxing Studio\n" +
          "📞 (310) 309-7901\n" +
          "🌐 astiglow.com\n\n" +
          "Reply STOP to unsubscribe."
        ),
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Default auto-reply for other messages
    const autoReply = 
      "Thanks for your message! For booking or questions, please:\n\n" +
      "📱 Call: (310) 309-7901\n" +
      "🌐 Book: astiglow.com/book\n\n" +
      "Reply STOP to opt out.";

    // Log the message for potential follow-up
    console.log(`Auto-reply sent to ${from}`);

    // Optionally: Forward to business phone or save to database
    // await forwardToBusinessPhone(from, body);

    return new Response(twimlResponse(autoReply), {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Error handling incoming SMS:", error);
    return new Response(
      twimlResponse("Sorry, we couldn't process your message. Please call (310) 309-7901."),
      { 
        status: 200, // Return 200 so Twilio doesn't retry
        headers: { "Content-Type": "text/xml" } 
      }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Twilio Incoming SMS Handler",
    timestamp: new Date().toISOString(),
  });
}