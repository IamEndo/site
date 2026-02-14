"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-600 ease-out",
        visible && "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
