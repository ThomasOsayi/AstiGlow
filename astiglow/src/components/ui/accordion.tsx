// src/components/ui/accordion.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Minus } from "./icons";

// ===========================================
// Accordion Types
// ===========================================

type AccordionType = "single" | "multiple";
type AccordionIconStyle = "chevron" | "plus-minus" | "none";

interface AccordionContextValue {
  type: AccordionType;
  openItems: string[];
  toggle: (value: string) => void;
  iconStyle: AccordionIconStyle;
}

// ===========================================
// Accordion Context
// ===========================================

const AccordionContext = createContext<AccordionContextValue | undefined>(
  undefined
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
}

// ===========================================
// Accordion Root
// ===========================================

interface AccordionProps {
  /** Allow single or multiple items open at once */
  type?: AccordionType;
  /** Default open item(s) */
  defaultValue?: string | string[];
  /** Controlled open item(s) */
  value?: string | string[];
  /** Callback when open items change */
  onValueChange?: (value: string | string[]) => void;
  /** Icon style for triggers */
  iconStyle?: AccordionIconStyle;
  /** Additional class names */
  className?: string;
  /** Accordion items */
  children: ReactNode;
}

export function Accordion({
  type = "single",
  defaultValue,
  value,
  onValueChange,
  iconStyle = "chevron",
  className,
  children,
}: AccordionProps) {
  // Normalize default value to array
  const normalizedDefault = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : [];

  const [openItems, setOpenItems] = useState<string[]>(normalizedDefault);

  // Use controlled value if provided
  const currentOpenItems = value
    ? Array.isArray(value)
      ? value
      : [value]
    : openItems;

  const toggle = useCallback(
    (itemValue: string) => {
      let newOpenItems: string[];

      if (type === "single") {
        // Single mode: toggle the item, close others
        newOpenItems = currentOpenItems.includes(itemValue) ? [] : [itemValue];
      } else {
        // Multiple mode: toggle the item independently
        newOpenItems = currentOpenItems.includes(itemValue)
          ? currentOpenItems.filter((v) => v !== itemValue)
          : [...currentOpenItems, itemValue];
      }

      if (!value) {
        setOpenItems(newOpenItems);
      }

      onValueChange?.(type === "single" ? newOpenItems[0] || "" : newOpenItems);
    },
    [type, currentOpenItems, value, onValueChange]
  );

  return (
    <AccordionContext.Provider
      value={{ type, openItems: currentOpenItems, toggle, iconStyle }}
    >
      <div className={cn("divide-y divide-border", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

// ===========================================
// Accordion Item
// ===========================================

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(
  undefined
);

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within an AccordionItem");
  }
  return context;
}

interface AccordionItemProps {
  /** Unique value for this item */
  value: string;
  /** Additional class names */
  className?: string;
  /** Item content (trigger + content) */
  children: ReactNode;
}

export function AccordionItem({ value, className, children }: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn("", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

// ===========================================
// Accordion Trigger
// ===========================================

interface AccordionTriggerProps {
  /** Additional class names */
  className?: string;
  /** Trigger content */
  children: ReactNode;
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children }, ref) => {
    const { toggle, iconStyle } = useAccordion();
    const { value, isOpen } = useAccordionItem();

    const handleClick = () => {
      toggle(value);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between py-5 text-left",
          "transition-colors duration-200",
          "hover:text-gold focus:outline-none focus-visible:text-gold",
          className
        )}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-charcoal text-[15px] sm:text-base pr-4">
          {children}
        </span>

        {/* Icon */}
        {iconStyle === "chevron" && (
          <ChevronDown
            size={18}
            className={cn(
              "flex-shrink-0 text-charcoal-light transition-transform duration-300",
              isOpen && "rotate-180 text-gold"
            )}
          />
        )}

        {iconStyle === "plus-minus" && (
          <div className="flex-shrink-0 text-charcoal-light">
            {isOpen ? (
              <Minus size={18} className="text-gold" />
            ) : (
              <Plus size={18} />
            )}
          </div>
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

// ===========================================
// Accordion Content
// ===========================================

interface AccordionContentProps {
  /** Additional class names */
  className?: string;
  /** Content */
  children: ReactNode;
}

export function AccordionContent({ className, children }: AccordionContentProps) {
  const { isOpen } = useAccordionItem();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-out",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      style={{
        height: isOpen ? height : 0,
      }}
      aria-hidden={!isOpen}
    >
      <div ref={contentRef} className={cn("pb-5", className)}>
        <p className="text-sm sm:text-[15px] text-charcoal-light leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
}

// ===========================================
// FAQ Item (Convenience Component)
// ===========================================

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  /** Array of FAQ items */
  items: FAQItemData[];
  /** Allow multiple open at once */
  allowMultiple?: boolean;
  /** Icon style */
  iconStyle?: AccordionIconStyle;
  /** Additional class names */
  className?: string;
}

export function FAQAccordion({
  items,
  allowMultiple = false,
  iconStyle = "chevron",
  className,
}: FAQAccordionProps) {
  return (
    <Accordion
      type={allowMultiple ? "multiple" : "single"}
      iconStyle={iconStyle}
      className={className}
    >
      {items.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// ===========================================
// Styled FAQ Section (with header)
// ===========================================

interface FAQSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** FAQ items */
  items: FAQItemData[];
  /** Allow multiple open at once */
  allowMultiple?: boolean;
  /** Additional class names */
  className?: string;
}

export function FAQSection({
  title = "Frequently Asked Questions",
  description,
  items,
  allowMultiple = false,
  className,
}: FAQSectionProps) {
  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {/* Header */}
      <div className="mb-8">
        <div className="w-10 h-0.5 bg-gold mb-6" />
        <h2 className="font-display text-3xl sm:text-4xl font-normal text-charcoal mb-4">
          {title}
          <span className="text-gold">?</span>
        </h2>
        {description && (
          <p className="text-charcoal-light leading-relaxed">{description}</p>
        )}
      </div>

      {/* Accordion */}
      <div className="bg-white border border-border p-6 sm:p-8">
        <FAQAccordion items={items} allowMultiple={allowMultiple} />
      </div>
    </div>
  );
}

// ===========================================
// Inline FAQ (for smaller sections)
// ===========================================

interface InlineFAQProps {
  /** FAQ items */
  items: FAQItemData[];
  /** Additional class names */
  className?: string;
}

export function InlineFAQ({ items, className }: InlineFAQProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <details key={index} className="group">
          <summary
            className={cn(
              "flex items-center justify-between cursor-pointer",
              "py-3 px-4 bg-cream hover:bg-cream-dark/50 transition-colors",
              "list-none [&::-webkit-details-marker]:hidden"
            )}
          >
            <span className="text-sm font-medium text-charcoal pr-4">
              {item.question}
            </span>
            <ChevronDown
              size={16}
              className="flex-shrink-0 text-charcoal-light transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <div className="px-4 py-3 text-sm text-charcoal-light leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

// ===========================================
// Contact FAQ (for Contact page quick FAQ)
// ===========================================

interface ContactFAQProps {
  /** FAQ items (max 3-4 recommended) */
  items: FAQItemData[];
  /** Additional class names */
  className?: string;
}

export function ContactFAQ({ items, className }: ContactFAQProps) {
  return (
    <div className={cn("bg-white border border-border", className)}>
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-xs uppercase tracking-wider text-charcoal-light">
          Quick Answers
        </h3>
      </div>
      <Accordion type="single" iconStyle="plus-minus" className="px-6">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`contact-faq-${index}`}>
            <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
            <AccordionContent className="text-sm">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}