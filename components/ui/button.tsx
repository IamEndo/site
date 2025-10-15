import * as React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };
export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { className = "", ...props }, ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-slate-200 shadow-sm hover:bg-slate-50 ${className}`}
      {...props}
    />
  );
});
export default Button;
