"use client";

import { Toaster } from "@/components/ui/toaster";
import { CurrencyProvider } from "@/contexts/currency-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      {children}
      <Toaster />
    </CurrencyProvider>
  );
}
