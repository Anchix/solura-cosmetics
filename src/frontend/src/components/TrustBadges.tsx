import { cn } from "@/lib/utils";
import {
  Award,
  FlaskConical,
  Heart,
  Leaf,
  Recycle,
  Shield,
} from "lucide-react";

interface TrustBadge {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BADGES: TrustBadge[] = [
  {
    icon: Shield,
    title: "Dermatologist Tested",
    description: "Clinically tested & recommended by dermatologists.",
  },
  {
    icon: Leaf,
    title: "Cruelty-Free",
    description: "Never tested on animals. 100% cruelty-free formulas.",
  },
  {
    icon: FlaskConical,
    title: "Ayurvedic Formulations",
    description: "Authentic Ayurvedic ingredients, scientifically enhanced.",
  },
  {
    icon: Recycle,
    title: "Sustainably Sourced",
    description: "Ethically sourced ingredients & eco-conscious packaging.",
  },
];

interface TrustBadgesProps {
  variant?: "row" | "grid";
  className?: string;
}

export default function TrustBadges({
  variant = "row",
  className,
}: TrustBadgesProps) {
  return (
    <div
      className={cn(
        variant === "grid"
          ? "grid grid-cols-2 md:grid-cols-4 gap-6"
          : "flex flex-wrap justify-center gap-6 md:gap-10",
        className,
      )}
    >
      {BADGES.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className={cn(
            "flex gap-3 items-start",
            variant === "row"
              ? "flex-col items-center text-center max-w-[160px]"
              : "",
          )}
        >
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className={cn(variant === "row" ? "" : "")}>
            <p className="font-body font-semibold text-foreground text-sm">
              {title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface MiniTrustBadgesProps {
  className?: string;
}

export function MiniTrustBadges({ className }: MiniTrustBadgesProps) {
  const items = [
    { icon: Shield, label: "Dermatologist Tested" },
    { icon: Leaf, label: "Cruelty-Free" },
    { icon: FlaskConical, label: "Ayurvedic" },
    { icon: Recycle, label: "Eco-Sourced" },
    { icon: Award, label: "ISO Certified" },
    { icon: Heart, label: "Made in India" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/30 text-xs text-muted-foreground"
        >
          <Icon className="h-3 w-3 text-primary" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
