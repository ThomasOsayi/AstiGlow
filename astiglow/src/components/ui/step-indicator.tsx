// src/components/ui/step-indicator.tsx

import { cn } from "@/lib/utils";

interface Step {
  num: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  // Calculate progress percentage for the line fill
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className={cn("w-full max-w-[600px] mx-auto", className)}>
      <div className="flex justify-between items-center relative">
        {/* Progress Line Background */}
        <div
          className="absolute top-5 h-0.5 bg-border z-0"
          style={{
            left: "60px",
            right: "60px",
          }}
        >
          {/* Progress Line Fill */}
          <div
            className="h-full bg-gold transition-all duration-400 ease-smooth"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Circles */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep >= step.num;

          return (
            <div
              key={step.num}
              className="flex flex-col items-center gap-3 z-10"
            >
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2",
                  isActive
                    ? "bg-gold border-gold text-white"
                    : "bg-white border-border text-charcoal-light"
                )}
              >
                {isCompleted ? "✓" : step.num}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs tracking-[0.05em]",
                  isActive ? "text-charcoal" : "text-charcoal-light",
                  currentStep === step.num ? "font-medium" : "font-normal"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}