"use client";

import { cn } from "@/lib/cn";
import { Check, X } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

const comparison = [
  {
    aspect: "Processing fees",
    paydeck: "Network only (~$0.01)",
    traditional: "1.5% to 3% per transaction",
  },
  {
    aspect: "Ownership",
    paydeck: "You own the hardware",
    traditional: "Usually rented",
  },
  {
    aspect: "Custody",
    paydeck: "Non-custodial (you control funds)",
    traditional: "Custodial (third-party holds funds)",
  },
  {
    aspect: "Contracts",
    paydeck: "None required",
    traditional: "Often multi-year lock-in",
  },
  {
    aspect: "Source code",
    paydeck: "Open and verifiable",
    traditional: "Proprietary",
  },
  {
    aspect: "Data collection",
    paydeck: "None",
    traditional: "Transaction history, customer data",
  },
];

export function Comparison() {
  return (
    <section className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16 md:mb-20">
            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
              Comparison
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
              PayDeck vs. traditional payment terminals
            </h2>
          </div>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={100}>
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-neutral-100 dark:bg-neutral-900">
              <div className="px-4 md:px-6 py-4 text-sm font-medium text-neutral-500">
                Aspect
              </div>
              <div className="px-4 md:px-6 py-4 text-sm font-medium text-neutral-900 dark:text-white border-l border-neutral-200 dark:border-neutral-800">
                PayDeck
              </div>
              <div className="px-4 md:px-6 py-4 text-sm font-medium text-neutral-500 border-l border-neutral-200 dark:border-neutral-800">
                Traditional
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, index) => (
              <div
                key={row.aspect}
                className={cn(
                  "grid grid-cols-3 border-t border-neutral-200 dark:border-neutral-800",
                  index % 2 === 0
                    ? "bg-white dark:bg-neutral-950"
                    : "bg-neutral-50/50 dark:bg-neutral-900/30"
                )}
              >
                <div className="px-4 md:px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {row.aspect}
                </div>
                <div className="px-4 md:px-6 py-4 text-sm text-neutral-900 dark:text-white border-l border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0 hidden sm:block" />
                  <span>{row.paydeck}</span>
                </div>
                <div className="px-4 md:px-6 py-4 text-sm text-neutral-500 border-l border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                  <X className="w-4 h-4 text-neutral-400 flex-shrink-0 hidden sm:block" />
                  <span>{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
