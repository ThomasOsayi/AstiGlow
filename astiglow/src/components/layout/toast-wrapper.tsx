// src/components/layout/toast-wrapper.tsx

"use client";

import { ToastProvider } from "@/components/ui";

interface ToastWrapperProps {
  children: React.ReactNode;
}

export function ToastWrapper({ children }: ToastWrapperProps) {
  return (
    <ToastProvider position="bottom-right">
      {children}
    </ToastProvider>
  );
}
