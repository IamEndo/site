"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...args: Array<string | undefined>) {
  return args.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-neutral-700 dark:focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2",
  {
    variants: {
      variant: {
        // Dark mode = white button on black for contrast
        default:
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
        // Outline keeps black surface, neutral borders in dark
        outline:
          "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 dark:border-neutral-800 dark:bg-black dark:hover:bg-neutral-900 dark:text-gray-100",
        // Ghost is a subtle black surface hover in dark
        ghost:
          "hover:bg-slate-100 text-slate-900 dark:text-gray-100 dark:hover:bg-neutral-900",
        link: "underline underline-offset-4 hover:opacity-80",
      },
      size: { sm: "h-9 px-3", md: "h-10 px-4", lg: "h-12 px-6 text-base" },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(classes, (children as any).props?.className),
        ref: (children as any).ref ?? ref,
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
