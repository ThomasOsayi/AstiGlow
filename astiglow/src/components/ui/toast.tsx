// src/components/ui/toast.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Check, X, AlertCircle, Info } from "./icons";

// ===========================================
// Toast Types
// ===========================================

export type ToastVariant = "success" | "error" | "warning" | "info" | "default";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// ===========================================
// Toast Context
// ===========================================

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// ===========================================
// Toast Provider
// ===========================================

interface ToastProviderProps {
  children: ReactNode;
  /** Position of toast container */
  position?: "top-right" | "top-center" | "bottom-right" | "bottom-center";
  /** Maximum number of toasts to show */
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = {
        id,
        variant: "default",
        duration: 5000,
        ...toast,
      };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        // Limit number of toasts
        return updated.slice(0, maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} position={position} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

// ===========================================
// Toast Container
// ===========================================

interface ToastContainerProps {
  toasts: Toast[];
  position: "top-right" | "top-center" | "bottom-right" | "bottom-center";
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, position, onDismiss }: ToastContainerProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed z-[100] flex flex-col gap-3 pointer-events-none",
        positionClasses[position]
      )}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// ===========================================
// Toast Item
// ===========================================

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 200); // Match animation duration
  };

  const variantStyles = {
    default: {
      container: "bg-white border-border",
      icon: null,
      iconColor: "",
    },
    success: {
      container: "bg-white border-l-[3px] border-l-green-500 border-border",
      icon: Check,
      iconColor: "text-green-500",
    },
    error: {
      container: "bg-white border-l-[3px] border-l-red-500 border-border",
      icon: AlertCircle,
      iconColor: "text-red-500",
    },
    warning: {
      container: "bg-white border-l-[3px] border-l-amber-500 border-border",
      icon: AlertCircle,
      iconColor: "text-amber-500",
    },
    info: {
      container: "bg-white border-l-[3px] border-l-gold border-border",
      icon: Info,
      iconColor: "text-gold",
    },
  };

  const variant = toast.variant || "default";
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div
      className={cn(
        "pointer-events-auto w-[360px] max-w-[calc(100vw-2rem)]",
        "border shadow-lg",
        "flex items-start gap-3 p-4",
        "transition-all duration-200",
        styles.container,
        isExiting
          ? "opacity-0 translate-x-4"
          : "opacity-100 translate-x-0 animate-in slide-in-from-right-4"
      )}
      role="alert"
    >
      {/* Icon */}
      {IconComponent && (
        <div className={cn("flex-shrink-0 mt-0.5", styles.iconColor)}>
          <IconComponent size={18} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-medium text-charcoal text-sm mb-0.5">
            {toast.title}
          </p>
        )}
        <p className="text-sm text-charcoal-light leading-relaxed">
          {toast.message}
        </p>

        {/* Action button */}
        {toast.action && (
          <button
            onClick={() => {
              toast.action?.onClick();
              handleDismiss();
            }}
            className="mt-2 text-xs font-medium uppercase tracking-wider text-gold hover:text-gold/80 transition-colors"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 text-charcoal-light hover:text-charcoal transition-colors p-0.5"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// ===========================================
// Convenience Hooks
// ===========================================

/**
 * Hook that returns helper functions for common toast types
 */
export function useToastHelpers() {
  const { addToast, removeToast, clearToasts } = useToast();

  const success = useCallback(
    (message: string, options?: Partial<Omit<Toast, "id" | "message" | "variant">>) => {
      return addToast({ message, variant: "success", ...options });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, options?: Partial<Omit<Toast, "id" | "message" | "variant">>) => {
      return addToast({ message, variant: "error", duration: 7000, ...options });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, options?: Partial<Omit<Toast, "id" | "message" | "variant">>) => {
      return addToast({ message, variant: "warning", ...options });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, options?: Partial<Omit<Toast, "id" | "message" | "variant">>) => {
      return addToast({ message, variant: "info", ...options });
    },
    [addToast]
  );

  const notify = useCallback(
    (message: string, options?: Partial<Omit<Toast, "id" | "message">>) => {
      return addToast({ message, ...options });
    },
    [addToast]
  );

  return {
    success,
    error,
    warning,
    info,
    notify,
    dismiss: removeToast,
    clearAll: clearToasts,
  };
}

// ===========================================
// Standalone Toast Component (for static use)
// ===========================================

interface StandaloneToastProps {
  variant?: ToastVariant;
  title?: string;
  message: string;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function ToastStandalone({
  variant = "default",
  title,
  message,
  onDismiss,
  action,
  className,
}: StandaloneToastProps) {
  const variantStyles = {
    default: {
      container: "bg-white border-border",
      icon: null,
      iconColor: "",
    },
    success: {
      container: "bg-white border-l-[3px] border-l-green-500 border-border",
      icon: Check,
      iconColor: "text-green-500",
    },
    error: {
      container: "bg-white border-l-[3px] border-l-red-500 border-border",
      icon: AlertCircle,
      iconColor: "text-red-500",
    },
    warning: {
      container: "bg-white border-l-[3px] border-l-amber-500 border-border",
      icon: AlertCircle,
      iconColor: "text-amber-500",
    },
    info: {
      container: "bg-white border-l-[3px] border-l-gold border-border",
      icon: Info,
      iconColor: "text-gold",
    },
  };

  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div
      className={cn(
        "w-full border shadow-sm",
        "flex items-start gap-3 p-4",
        styles.container,
        className
      )}
      role="alert"
    >
      {IconComponent && (
        <div className={cn("flex-shrink-0 mt-0.5", styles.iconColor)}>
          <IconComponent size={18} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-medium text-charcoal text-sm mb-0.5">{title}</p>
        )}
        <p className="text-sm text-charcoal-light leading-relaxed">{message}</p>

        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-xs font-medium uppercase tracking-wider text-gold hover:text-gold/80 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-charcoal-light hover:text-charcoal transition-colors p-0.5"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// ===========================================
// Cart Toast (specialized for add-to-cart)
// ===========================================

interface CartToastProps {
  itemName: string;
  itemPrice: number;
  onViewCart?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function CartToast({
  itemName,
  itemPrice,
  onViewCart,
  onDismiss,
  className,
}: CartToastProps) {
  return (
    <div
      className={cn(
        "bg-white border border-border shadow-lg",
        "flex items-center gap-4 p-4",
        "animate-in slide-in-from-right-4",
        className
      )}
      role="alert"
    >
      {/* Checkmark */}
      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
        <Check size={16} className="text-gold" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal">Added to bag</p>
        <p className="text-sm text-charcoal-light truncate">
          {itemName} · ${itemPrice}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {onViewCart && (
          <button
            onClick={onViewCart}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-charcoal text-white hover:bg-gold transition-colors"
          >
            View Bag
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-2 text-charcoal-light hover:text-charcoal transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}