import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviews?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, reviews, size = 14, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={cn(
              star <= Math.round(value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-[var(--muted)]"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-[var(--muted)]">
        {value.toFixed(1)}
        {reviews !== undefined && ` (${reviews})`}
      </span>
    </div>
  );
}