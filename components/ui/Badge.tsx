import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "new" | "best";
  className?: string;
}

const variants = {
  default: "bg-black/5 dark:bg-white/10 text-[var(--fg)]",
  sale: "bg-error text-white",
  new: "bg-accent text-white",
  best: "bg-success text-white",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}