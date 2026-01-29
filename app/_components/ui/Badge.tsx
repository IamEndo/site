import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
    outline: "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
    muted: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium tracking-wide uppercase",
        "rounded-sm",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
