import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-full border border-[var(--border)] bg-transparent px-5 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-accent",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";