// src/lib/twilio.ts
// Server-side Twilio utility for SMS notifications

import twilio from 'twilio';

// Initialize Twilio client (server-side only)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Validate environment variables
function validateConfig() {
  if (!accountSid || !authToken || !twilioPhoneNumber) {
    throw new Error(
      'Missing Twilio configuration. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER environment variables.'
    );
  }
}

// Create Twilio client
function getClient() {
  validateConfig();
  return twilio(accountSid, authToken);
}

// Types
export interface SMSOptions {
  to: string;
  body: string;
}

export interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface BookingDetails {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  dateTime: string; // formatted date/time string
  duration: number; // in minutes
}

// Format phone number to E.164 format
function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If it's a 10-digit US number, add +1
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If it already has country code (11 digits starting with 1)
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // If it already has + prefix, return as-is
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Default: assume US number
  return `+1${digits}`;
}

/**
 * Send an SMS message
 */
export async function sendSMS(options: SMSOptions): Promise<SMSResult> {
  try {
    validateConfig();
    const client = getClient();
    
    const message = await client.messages.create({
      body: options.body,
      from: twilioPhoneNumber,
      to: formatPhoneNumber(options.to),
    });

    console.log(`SMS sent successfully: ${message.sid}`);
    
    return {
      success: true,
      messageId: message.sid,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send SMS:', errorMessage);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Send booking confirmation SMS
 */
export async function sendBookingConfirmation(booking: BookingDetails): Promise<SMSResult> {
  const message = `Hi ${booking.customerName}! Your appointment at Astiglow has been confirmed.\n\n` +
    `📅 ${booking.dateTime}\n` +
    `💆 ${booking.serviceName} (${booking.duration} min)\n` +
    `📍 10880 Wilshire Blvd, Suite 402, LA 90024\n\n` +
    `Questions? Call (310) 309-7901\n\n` +
    `Reply STOP to opt out.`;

  return sendSMS({
    to: booking.customerPhone,
    body: message,
  });
}

/**
 * Send booking reminder SMS (typically 24h or 2h before)
 */
export async function sendBookingReminder(
  booking: BookingDetails,
  reminderType: '24h' | '2h' = '24h'
): Promise<SMSResult> {
  const timeframe = reminderType === '24h' ? 'tomorrow' : 'in 2 hours';
  
  const message = `Reminder: Your Astiglow appointment is ${timeframe}!\n\n` +
    `📅 ${booking.dateTime}\n` +
    `💆 ${booking.serviceName}\n\n` +
    `Need to reschedule? Call (310) 309-7901\n\n` +
    `Reply STOP to opt out.`;

  return sendSMS({
    to: booking.customerPhone,
    body: message,
  });
}

/**
 * Send booking cancellation SMS
 */
export async function sendBookingCancellation(booking: BookingDetails): Promise<SMSResult> {
  const message = `Hi ${booking.customerName}, your Astiglow appointment for ${booking.serviceName} ` +
    `on ${booking.dateTime} has been cancelled.\n\n` +
    `To rebook, visit astiglow.com/book or call (310) 309-7901\n\n` +
    `Reply STOP to opt out.`;

  return sendSMS({
    to: booking.customerPhone,
    body: message,
  });
}

/**
 * Send booking rescheduled SMS
 */
export async function sendBookingRescheduled(
  booking: BookingDetails,
  oldDateTime: string
): Promise<SMSResult> {
  const message = `Hi ${booking.customerName}, your Astiglow appointment has been rescheduled.\n\n` +
    `Old: ${oldDateTime}\n` +
    `New: ${booking.dateTime}\n` +
    `💆 ${booking.serviceName}\n\n` +
    `Questions? Call (310) 309-7901\n\n` +
    `Reply STOP to opt out.`;

  return sendSMS({
    to: booking.customerPhone,
    body: message,
  });
}

/**
 * Send a custom SMS (for admin use)
 */
export async function sendCustomSMS(to: string, message: string): Promise<SMSResult> {
  // Append opt-out notice if not present
  const body = message.includes('STOP') 
    ? message 
    : `${message}\n\nReply STOP to opt out.`;

  return sendSMS({ to, body });
}