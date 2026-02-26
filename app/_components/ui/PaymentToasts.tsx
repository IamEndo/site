"use client";

import { useEffect, useState, useCallback } from "react";
import { Check } from "lucide-react";

const AMOUNTS = ["25.00", "142.50", "8.99", "500.00", "33.75", "12.00", "89.99", "1,250.00", "47.20", "6.50"];
const LABELS = ["Payment received"];

interface Toast {
  id: number;
  amount: string;
  label: string;
  left: number;
  top: number;
}

let toastId = 0;

export function PaymentToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = useCallback(() => {
    const side = Math.random() > 0.5;
    const toast: Toast = {
      id: ++toastId,
      amount: AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)],
      label: LABELS[Math.floor(Math.random() * LABELS.length)],
      left: side ? Math.random() * 20 + 3 : Math.random() * 20 + 65,
      top: Math.random() * 50 + 15,
    };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 8500);
  }, []);

  useEffect(() => {
    // First toast after 3s
    const initial = setTimeout(createToast, 4500);

    // Recurring toasts
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") createToast();
    }, 10000 + Math.random() * 5000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [createToast]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="absolute flex items-center gap-2.5 px-4 py-2.5 bg-neutral-950/85 dark:bg-neutral-900/85 backdrop-blur-lg border border-neutral-200/10 dark:border-neutral-700/50 rounded-lg text-sm whitespace-nowrap animate-toast-float max-w-[220px]"
          style={{ left: `${toast.left}%`, top: `${toast.top}%`, maxWidth: 'calc(100% - 2rem)' }}
        >
          <div className="w-7 h-7 rounded-full bg-accent-500/15 dark:bg-accent-dark-500/15 flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 text-accent-500 dark:text-accent-dark-500" />
          </div>
          <div>
            <div className="font-semibold text-white font-mono text-[0.82rem]">
              {toast.amount} NEX
            </div>
            <div className="text-neutral-500 text-[0.7rem]">{toast.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
