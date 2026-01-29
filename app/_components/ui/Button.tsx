"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const baseStyles = [
      "inline-flex items-center justify-center gap-2 font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      "rounded-sm", // Squared corners
    ];

    const variants = {
      primary: [
        "bg-neutral-900 text-white hover:bg-neutral-800",
        "dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
      ],
      secondary: [
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        "dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
      ],
      ghost: [
        "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
        "dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800",
      ],
      outline: [
        "border border-neutral-300 text-neutral-900 hover:bg-neutral-50",
        "dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800",
      ],
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-6 text-base",
    };

    const classes = cn(...baseStyles, ...variants[variant], sizes[size], className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(classes, (children as any).props?.className),
        ref,
        ...props,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
