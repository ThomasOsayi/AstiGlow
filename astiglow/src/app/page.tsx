// src/app/page.tsx

import { stats } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Basic test */}
      <section className="min-h-screen flex items-center justify-center px-20">
        <div className="text-center">
          {/* Eyebrow text */}
          <p className="text-label uppercase tracking-caps-widest text-gold mb-6 font-medium">
            Los Angeles Waxing Studio
          </p>
          
          {/* Main headline */}
          <h1 className="font-display text-display-xl text-charcoal mb-8">
            Gentle Care,<br />
            <span className="italic">Radiant</span> Results
            <span className="text-gold">_</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-body-lg text-charcoal-light max-w-md mx-auto mb-12">
            Experience premium hard wax treatments in a clean, serene environment. 
            Specializing in gentle techniques for even the most sensitive skin.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="bg-charcoal text-cream px-8 py-4 text-label uppercase tracking-caps-wide font-medium hover:bg-gold transition-colors">
              Book Appointment
            </button>
            <button className="border border-charcoal text-charcoal px-8 py-4 text-label uppercase tracking-caps-wide font-medium hover:bg-charcoal hover:text-cream transition-colors">
              View Services
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex gap-12 justify-center mt-16 pt-8 border-t border-border">
            <div>
              <p className="font-display text-4xl text-charcoal">{stats.yearsExperience}</p>
              <p className="text-label-sm uppercase tracking-caps-wide text-charcoal-light">Years Experience</p>
            </div>
            <div>
              <p className="font-display text-4xl text-charcoal">{stats.happyClients}</p>
              <p className="text-label-sm uppercase tracking-caps-wide text-charcoal-light">Happy Clients</p>
            </div>
            <div>
              <p className="font-display text-4xl text-charcoal">{stats.starRating}</p>
              <p className="text-label-sm uppercase tracking-caps-wide text-charcoal-light">Star Rating</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}