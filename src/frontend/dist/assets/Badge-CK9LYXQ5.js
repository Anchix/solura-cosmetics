import { j as jsxRuntimeExports, c as cn } from "./index-DBS95maA.js";
const BADGE_CONFIG = {
  bestseller: {
    label: "Bestseller",
    className: "bg-secondary text-secondary-foreground"
  },
  new: {
    label: "New",
    className: "bg-primary text-primary-foreground"
  },
  lowstock: {
    label: "Only a few left",
    className: "bg-accent text-accent-foreground"
  },
  sale: {
    label: "Sale",
    className: "bg-destructive text-destructive-foreground"
  },
  verified: {
    label: "✓ Verified Purchase",
    className: "bg-muted text-muted-foreground"
  }
};
function ProductBadge({ variant, className }) {
  const config = BADGE_CONFIG[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-body",
        config.className,
        className
      ),
      children: config.label
    }
  );
}
const STATUS_COLORS = {
  pending: "bg-secondary/20 text-secondary-foreground border border-secondary/30",
  confirmed: "bg-primary/10 text-primary border border-primary/20",
  processing: "bg-accent/20 text-accent-foreground border border-accent/30",
  shipped: "bg-muted text-muted-foreground border border-border",
  delivered: "bg-primary/15 text-primary border border-primary/25",
  cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
  refunded: "bg-muted/60 text-muted-foreground border border-border"
};
function StatusBadge({ status, className }) {
  const colorClass = STATUS_COLORS[status] ?? "bg-muted text-muted-foreground border border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize font-body",
        colorClass,
        className
      ),
      children: status
    }
  );
}
export {
  ProductBadge as P,
  StatusBadge as S
};
