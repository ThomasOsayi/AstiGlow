"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "bg-white border border-border p-8 flex flex-col h-full relative",
        "transition-all duration-400 ease-smooth cursor-pointer",
        "hover:-translate-y-1 hover:shadow-card hover:border-gold"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(service)}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 bg-gold text-white text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 font-medium">
          Popular
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-display text-[26px] font-medium text-charcoal mb-3">
          {service.name}
        </h3>
        <p className="text-sm text-charcoal-light leading-[1.7] mb-6">
          {service.description}
        </p>
      </div>

      {/* Price & Duration */}
      <div>
        <div className="flex justify-between items-center pt-5 border-t border-border mb-4">
          <span className="font-display text-2xl font-medium text-charcoal">
            ${service.price}
          </span>
          <span className="text-xs text-charcoal-light tracking-[0.05em] uppercase">
            {service.duration} min
          </span>
        </div>

        {/* CTA Button - Reveals on hover */}
        <button
          className={cn(
            "w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium border border-charcoal transition-all duration-300",
            isHovered
              ? "bg-charcoal text-cream"
              : "bg-transparent text-charcoal opacity-0 translate-y-2"
          )}
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          Select Service
        </button>
      </div>
    </div>
  );
}