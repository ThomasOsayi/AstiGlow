// src/components/ui/service-card.tsx

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
        "bg-white p-8 flex flex-col h-full relative cursor-pointer",
        "transition-all duration-300"
      )}
      style={{
        border: isHovered ? "1px solid #C4A484" : "1px solid #E5DED6",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 20px 40px rgba(45, 42, 38, 0.08)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(service)}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div
          className="absolute top-4 right-4 text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 font-medium"
          style={{ backgroundColor: "#C4A484", color: "#FFFFFF" }}
        >
          Popular
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3
          className="font-display text-[26px] font-medium mb-3"
          style={{ color: "#2D2A26" }}
        >
          {service.name}
        </h3>
        <p
          className="text-sm leading-[1.7] mb-6"
          style={{ color: "#6B6560" }}
        >
          {service.description}
        </p>
      </div>

      {/* Price & Duration */}
      <div>
        <div
          className="flex justify-between items-center pt-5 mb-4"
          style={{ borderTop: "1px solid #E5DED6" }}
        >
          <span
            className="font-display text-2xl font-medium"
            style={{ color: "#2D2A26" }}
          >
            ${service.price}
          </span>
          <span
            className="text-xs tracking-[0.05em] uppercase"
            style={{ color: "#6B6560" }}
          >
            {service.duration} min
          </span>
        </div>

        {/* CTA Button - Reveals on hover */}
        <button
          className="w-full py-3.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
          style={{
            backgroundColor: isHovered ? "#2D2A26" : "transparent",
            color: isHovered ? "#FFFFFF" : "#2D2A26",
            border: "1px solid #2D2A26",
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