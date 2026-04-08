import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const SIZE_MAP = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  const iconClass = SIZE_MAP[size];

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
    >
      {stars.map((star) => {
        const filled = star <= Math.floor(rating);
        const partial =
          !filled && star === Math.ceil(rating) && rating % 1 !== 0;
        const fillPercent = partial ? Math.round((rating % 1) * 100) : 0;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            className={cn(
              "relative flex-shrink-0",
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                : "cursor-default",
            )}
            aria-label={interactive ? `Rate ${star} stars` : undefined}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? star === Math.round(rating) : undefined}
          >
            {partial ? (
              <span className="relative inline-flex">
                <Star
                  className={cn(iconClass, "text-muted-foreground/30")}
                  fill="currentColor"
                />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercent}%` }}
                >
                  <Star
                    className={cn(iconClass, "text-secondary")}
                    fill="currentColor"
                  />
                </span>
              </span>
            ) : (
              <Star
                className={cn(
                  iconClass,
                  filled ? "text-secondary" : "text-muted-foreground/30",
                  interactive && !filled && "hover:text-secondary/60",
                )}
                fill="currentColor"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
