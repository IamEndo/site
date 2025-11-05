import * as React from "react";

function cn(...args: Array<string | undefined>) {
  return args.filter(Boolean).join(" ");
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate-300 dark:border-neutral-800 bg-white dark:bg-black px-3 py-2 text-sm text-slate-900 dark:text-gray-100 outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-neutral-700",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
