// src/components/ui/index.ts

// ===========================================
// Icon Components
// ===========================================
export {
    // Icon types
    type IconProps,
    type IconName,
    
    // Dynamic icon component
    Icon,
    iconMap,
    
    // Navigation & UI
    ChevronDown,
    ChevronUp,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    ArrowLeft,
    ArrowUpRight,
    ExternalLink,
    Menu,
    X,
    Close,
    Edit,
    
    // Actions
    Check,
    CheckCircle,
    Plus,
    Minus,
    Search,
    Filter,
    
    // Contact & Location
    MapPin,
    Phone,
    Mail,
    Email,
    
    // Social Media
    Instagram,
    Facebook,
    Twitter,
    
    // Time & Date
    Clock,
    Calendar,
    
    // User & Profile
    User,
    Users,
    
    // Rating & Feedback
    Star,
    StarFilled,
    Heart,
    ThumbsUp,
    
    // Commerce & Shopping
    ShoppingBag,
    CreditCard,
    Tag,
    Gift,
    
    // Info & Alerts
    Info,
    AlertCircle,
    HelpCircle,
    
    // Misc & Decorative
    Sparkles,
    Loader,
    Spinner,
    Quote,
  } from "./icons";
  
  // ===========================================
  // Core UI Components
  // ===========================================
  export { Button, ButtonLink, IconButton } from "./button";
  export type { ButtonProps } from "./button";
  
  export { 
    SectionHeader, 
    PageHeader, 
    Divider 
  } from "./section-header";
  export type { SectionHeaderProps, PageHeaderProps } from "./section-header";
  
  // ===========================================
  // Form Components
  // ===========================================
  export { 
    Input, 
    Textarea, 
    Select, 
    Checkbox, 
    RadioGroup,
    Label,
    FormField,
  } from "./input";
  
  // ===========================================
  // Card Components
  // ===========================================
  export { 
    ServiceCard,
    ServiceAddOn,
    SelectedServicesSummary,
  } from "./service-card";
  export type { ServiceCardProps } from "./service-card";
  
  export { 
    PackageCard,
    PackageCardCompact,
    PackageComparison,
    PackageCartSummary,
  } from "./package-card";
  export type { PackageCardProps } from "./package-card";
  
  export { 
    ReviewCard,
    StarRating,
    ReviewsSummary,
  } from "./review-card";
  export type { ReviewCardProps, ReviewV2 } from "./review-card";
  
  // ===========================================
  // Feedback Components
  // ===========================================
  export {
    ToastProvider,
    useToast,
    useToastHelpers,
    ToastStandalone,
    CartToast,
  } from "./toast";
  export type { Toast, ToastVariant } from "./toast";
  
  // ===========================================
  // Disclosure Components
  // ===========================================
  export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    FAQAccordion,
    FAQSection,
    InlineFAQ,
    ContactFAQ,
  } from "./accordion";
  
  // ===========================================
  // Interactive Components
  // ===========================================
  export { StepIndicator } from "./step-indicator";
  export { TestimonialCarousel } from "./testimonial-carousel";