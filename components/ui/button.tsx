"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...args: Array<string | undefined>) {
  return args.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-700 dark:focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2",
  {
    variants: {
      variant: {
        // Light = neutral gray; Dark = white-on-black
        default:
          "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",

        // Outline: solid white (light) / solid black (dark). No transparent hover in light mode.
        outline:
          "border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-black dark:hover:bg-neutral-900 dark:text-gray-100",

        // Ghost: subtle
        ghost:
          "hover:bg-neutral-100 text-neutral-900 dark:text-gray-100 dark:hover:bg-neutral-900",

        link: "underline underline-offset-4 hover:opacity-80",
      },

      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },

      // NEW: layout context (normal pages vs. hero image overlay)
      context: {
        default: "",    // normal behavior
        hero: "",       // special styles applied via compoundVariants below
      },
    },

    // Default variant values
    defaultVariants: {
      variant: "default",
      size: "md",
      context: "default",
    },

    // Context-specific overrides for the hero (photo background)
    compoundVariants: [
      // Primary button on hero: white bg, black text, gentle darker hover
      {
        variant: "default",
        context: "hero",
        class: "bg-white text-black hover:bg-neutral-200",
      },
      // Outline on hero: white border/text + subtle dark fill; hover gets darker (not transparent)
      {
        variant: "outline",
        context: "hero",
        class: "border-white/80 text-white bg-black/30 hover:bg-black/55",
      },
      // Ghost on hero: white text, darker hover film
      {
        variant: "ghost",
        context: "hero",
        class: "text-white hover:bg-black/40",
      },
      // Link on hero: keep white text
      {
        variant: "link",
        context: "hero",
        class: "text-white",
      },
    ],

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
  ({ className, variant, size, context, asChild, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, context }), className);

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
