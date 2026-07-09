"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Plus, Minus } from "lucide-react";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({ id, question, answer, isOpen = false, onToggle }: AccordionItemProps) {
  const panelId = `faq-panel-${id}`;
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between py-5 text-left",
          "text-neutral-900 dark:text-white",
          "hover:text-neutral-600 dark:hover:text-neutral-300",
          "transition-colors"
        )}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-medium pr-4">{question}</span>
        <span className="flex-shrink-0 text-neutral-400" aria-hidden="true">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        className={cn(
          "overflow-hidden transition-all duration-200 motion-reduce:transition-none",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: readonly { readonly id: string; readonly question: string; readonly answer: string }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div className={cn("divide-y-0", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
