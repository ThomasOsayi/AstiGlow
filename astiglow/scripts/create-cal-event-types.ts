// scripts/create-cal-event-types.ts

import 'dotenv/config';

// ============================================
// Configuration
// ============================================

const CAL_API_KEY = process.env.CAL_API_KEY || 'cal_live_a408a971854f063abf71e072afe50836';
const CAL_USERNAME = 'astiglow';
const CAL_API_URL = 'https://api.cal.com/v2/event-types';
const CAL_API_VERSION = '2024-06-14';

// Rate limiting: 120 requests/min = 500ms between requests to be safe
const DELAY_BETWEEN_REQUESTS = 600; // ms

// ============================================
// Services Data (from src/lib/data/services.ts)
// ============================================

interface Service {
  id: string;
  name: string;
  category: 'face' | 'body' | 'brazilian';
  description: string;
  price: number;
  duration: number;
  popular?: boolean;
}

const services: Service[] = [
  // Face Services
  { id: "eyebrow", name: "Eyebrow", category: "face", description: "Enhance the shape of your brows with precision waxing for a bold, polished look.", price: 28, duration: 15, popular: true },
  { id: "upper-lip", name: "Upper Lip", category: "face", description: "Quick and gentle removal for smooth, hair-free skin above the lip.", price: 16, duration: 10 },
  { id: "lower-lip", name: "Lower Lip", category: "face", description: "Gentle wax treatment for the area just below the lower lip and chin area.", price: 20, duration: 10 },
  { id: "chin", name: "Chin", category: "face", description: "Achieve a smooth, flawless look with our gentle chin waxing service.", price: 16, duration: 10 },
  { id: "sideburns", name: "Sideburns", category: "face", description: "Frame your face with smooth, hair-free sideburns using gentle hard wax.", price: 20, duration: 10 },
  { id: "full-face", name: "Full Face", category: "face", description: "Complete facial waxing including brows, lip, chin, and sideburns for an all-over glow.", price: 64, duration: 30, popular: true },
  { id: "nose", name: "Nose", category: "face", description: "Quick and effective removal of unwanted hair from inside the nostrils.", price: 18, duration: 10 },
  { id: "ears", name: "Ears", category: "face", description: "Gentle ear waxing for a clean, polished appearance.", price: 16, duration: 15 },
  { id: "neck", name: "Neck", category: "face", description: "Smooth neckline waxing, ideal for maintaining a polished look.", price: 20, duration: 10 },
  { id: "hairline", name: "Hairline", category: "face", description: "Precision waxing along the hairline for a cleaner, more defined frame.", price: 15, duration: 10 },
  
  // Body Services
  { id: "underarms", name: "Underarms", category: "body", description: "Smooth, long-lasting results with our gentle underarm waxing treatment.", price: 22, duration: 15, popular: true },
  { id: "half-arms", name: "Half Arms", category: "body", description: "Waxing for either upper or lower arms — smooth skin that lasts.", price: 30, duration: 20 },
  { id: "full-arms", name: "Full Arms", category: "body", description: "Complete arm waxing from shoulder to wrist for silky smooth results.", price: 45, duration: 30 },
  { id: "half-legs", name: "Half Legs", category: "body", description: "Lower or upper leg waxing for smooth, beach-ready skin.", price: 45, duration: 30 },
  { id: "full-legs", name: "Full Legs", category: "body", description: "Complete leg waxing from thigh to ankle for lasting smoothness.", price: 70, duration: 45, popular: true },
  { id: "stomach-strip", name: "Stomach Strip", category: "body", description: "Removes the thin line of hair from navel to bikini area.", price: 18, duration: 10 },
  { id: "full-back", name: "Full Back", category: "body", description: "Complete back waxing for smooth, confident skin.", price: 55, duration: 40 },
  { id: "chest", name: "Chest", category: "body", description: "Full chest waxing for a clean, groomed appearance.", price: 45, duration: 30 },
  
  // Brazilian & Bikini Services
  { id: "bikini-line", name: "Bikini Line", category: "brazilian", description: "Clean up along the bikini line for a natural, polished look.", price: 40, duration: 15 },
  { id: "bikini-full", name: "Bikini Full", category: "brazilian", description: "More coverage than bikini line — removes hair from the front and sides.", price: 60, duration: 20 },
  { id: "brazilian", name: "Brazilian", category: "brazilian", description: "Complete hair removal with our signature gentle hard wax technique. Smooth, long-lasting results.", price: 75, duration: 30, popular: true },
  { id: "butt-strip", name: "Butt Strip", category: "brazilian", description: "Quick add-on service for complete smoothness.", price: 20, duration: 10 },
];

// ============================================
// Helper Functions
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'face': return 'Face';
    case 'body': return 'Body';
    case 'brazilian': return 'Brazilian & Bikini';
    default: return category;
  }
}

// ============================================
// Cal.com API Functions
// ============================================

interface CalEventTypePayload {
  title: string;
  slug: string;
  lengthInMinutes: number;
  description: string;
  minimumBookingNotice: number;
  beforeEventBuffer: number;
  afterEventBuffer: number;
  locations: Array<{ type: string; address?: string; public?: boolean }>;
  bookingFields: Array<{
    type: string;
    slug: string;
    label: string;
    placeholder?: string;
    required: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
}

interface CalApiResponse {
  status: 'success' | 'error';
  data?: {
    id: number;
    slug: string;
    title: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

async function createEventType(service: Service): Promise<{ success: boolean; id?: number; error?: string }> {
  const payload: CalEventTypePayload = {
    title: `${service.name} — $${service.price}`,
    slug: service.id,
    lengthInMinutes: service.duration,
    description: `${service.description}\n\nCategory: ${getCategoryLabel(service.category)}\nPrice: $${service.price}\nDuration: ${service.duration} minutes`,
    
    // Scheduling settings
    minimumBookingNotice: 120, // 2 hours minimum notice
    beforeEventBuffer: 10,     // 10 min buffer before
    afterEventBuffer: 10,      // 10 min buffer after
    
    // Location: In-person at the studio
    locations: [
      {
        type: 'attendeeInPerson',
        address: '10880 Wilshire Blvd, Suite 402, Los Angeles, CA 90024',
        public: true
      }
    ],
    
    // Custom booking questions
    bookingFields: [
      {
        type: 'phone',
        slug: 'phone',
        label: 'Phone Number',
        placeholder: '(310) 555-0000',
        required: true
      },
      {
        type: 'boolean',
        slug: 'first-visit',
        label: 'Is this your first visit to Astiglow?',
        required: false
      },
      {
        type: 'textarea',
        slug: 'skin-sensitivities',
        label: 'Any skin sensitivities we should know about?',
        placeholder: 'e.g., allergies, recent sunburn, medications, etc.',
        required: false
      }
    ]
  };

  try {
    const response = await fetch(CAL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CAL_API_KEY}`,
        'Content-Type': 'application/json',
        'cal-api-version': CAL_API_VERSION
      },
      body: JSON.stringify(payload)
    });

    const result: CalApiResponse = await response.json();

    if (!response.ok || result.status === 'error') {
      return {
        success: false,
        error: result.error?.message || `HTTP ${response.status}`
      };
    }

    return {
      success: true,
      id: result.data?.id
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================
// Main Script
// ============================================

async function main() {
  console.log('\n🌟 Astiglow — Cal.com Event Types Creator\n');
  console.log('━'.repeat(50));
  console.log(`📍 Cal.com Username: ${CAL_USERNAME}`);
  console.log(`🔑 API Key: ${CAL_API_KEY.slice(0, 15)}...`);
  console.log(`📋 Services to create: ${services.length}`);
  console.log('━'.repeat(50));
  console.log('');

  const results = {
    success: [] as string[],
    failed: [] as { name: string; error: string }[]
  };

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    const progress = `[${i + 1}/${services.length}]`;
    
    process.stdout.write(`${progress} Creating "${service.name}"...`);
    
    const result = await createEventType(service);
    
    if (result.success) {
      console.log(` ✅ (ID: ${result.id})`);
      results.success.push(service.name);
    } else {
      console.log(` ❌ ${result.error}`);
      results.failed.push({ name: service.name, error: result.error || 'Unknown' });
    }
    
    // Rate limiting delay (except for last item)
    if (i < services.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Summary
  console.log('\n' + '━'.repeat(50));
  console.log('📊 Summary\n');
  console.log(`   ✅ Created: ${results.success.length}`);
  console.log(`   ❌ Failed:  ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n   Failed services:');
    results.failed.forEach(f => {
      console.log(`   • ${f.name}: ${f.error}`);
    });
  }

  console.log('\n' + '━'.repeat(50));
  
  if (results.success.length > 0) {
    console.log(`\n🎉 Done! View your event types at:`);
    console.log(`   https://cal.com/${CAL_USERNAME}\n`);
  }
}

// Run the script
main().catch(console.error);