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
          "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-700",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
