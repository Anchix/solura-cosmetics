import { cn } from "@/lib/utils";

type BadgeVariant = "bestseller" | "new" | "lowstock" | "sale" | "verified";

interface ProductBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const BADGE_CONFIG: Record<BadgeVariant, { label: string; className: string }> =
  {
    bestseller: {
      label: "Bestseller",
      className: "bg-secondary text-secondary-foreground",
    },
    new: {
      label: "New",
      className: "bg-primary text-primary-foreground",
    },
    lowstock: {
      label: "Only a few left",
      className: "bg-accent text-accent-foreground",
    },
    sale: {
      label: "Sale",
      className: "bg-destructive text-destructive-foreground",
    },
    verified: {
      label: "✓ Verified Purchase",
      className: "bg-muted text-muted-foreground",
    },
  };

export function ProductBadge({ variant, className }: ProductBadgeProps) {
  const config = BADGE_CONFIG[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-body",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:
    "bg-secondary/20 text-secondary-foreground border border-secondary/30",
  confirmed: "bg-primary/10 text-primary border border-primary/20",
  processing: "bg-accent/20 text-accent-foreground border border-accent/30",
  shipped: "bg-muted text-muted-foreground border border-border",
  delivered: "bg-primary/15 text-primary border border-primary/25",
  cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
  refunded: "bg-muted/60 text-muted-foreground border border-border",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass =
    STATUS_COLORS[status] ??
    "bg-muted text-muted-foreground border border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize font-body",
        colorClass,
        className,
      )}
    >
      {status}
    </span>
  );
}
