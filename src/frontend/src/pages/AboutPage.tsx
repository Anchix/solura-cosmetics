import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  CheckCircle2,
  Flame,
  Heart,
  Leaf,
  Lightbulb,
  Rocket,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const DIFFERENTIATORS = [
  "100% Natural & Chemical-Free Ingredients",
  "Eco-Friendly & Skin-Safe Formulations",
  "Designed for Indian Skin & Hair Needs",
  "Honest, Transparent Approach",
  "Affordable & Effective Solutions",
];

const PHILOSOPHY_POINTS = [
  { label: "Treat root causes", icon: Target },
  { label: "Deliver long-term results", icon: Star },
  { label: "Support healthy skin and hair", icon: Heart },
];

const JOURNEY_MILESTONES = [
  {
    icon: Rocket,
    label:
      "Idea born at a startup pitch competition — won recognition at the state level",
  },
  {
    icon: Leaf,
    label: "Ingredient research — deep dive into natural formulations",
  },
  {
    icon: Lightbulb,
    label: "Product formulation — crafting solutions for real skin concerns",
  },
  { icon: Award, label: "Safety testing — rigorous trials before launch" },
  {
    icon: Star,
    label: "Solura Cosmetics officially launched — 27 October 2025",
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title =
      "Solura Cosmetics | Natural Skincare Brand in India for Real Results";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Discover Solura Cosmetics, a natural skincare brand in India offering chemical-free, eco-friendly skincare and haircare solutions for real results. Cure Problem, Sure Solution.",
      );
    }
    return () => {
      document.title =
        "Solura Cosmetics - Natural Beauty Products | Skincare Makeup Haircare India";
    };
  }, []);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-primary/8 border-b border-border py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-8 left-12 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-16 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            About Us
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
            About Solura Cosmetics
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-display font-semibold mb-6">
            Natural Skincare Brand in India That Actually Solves Problems
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-display font-semibold text-primary text-sm tracking-wide">
              Cure Problem, Sure Solution
            </span>
          </div>
        </div>
      </div>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Solura Cosmetics is a fast-growing{" "}
            <strong className="text-foreground">
              natural skincare brand in India
            </strong>{" "}
            built on one powerful belief — every skin and hair problem deserves
            a real, honest solution.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Unlike brands that focus on temporary beauty, we create
            chemical-free skincare and haircare products that target real
            concerns like{" "}
            <strong className="text-foreground">
              acne, hair fall, dull skin, and scalp damage
            </strong>
            .
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            As a trusted natural skincare brand in India, our goal is simple:
          </p>
          <div className="inline-flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-2xl px-6 py-4">
            <span className="text-xl">👉</span>
            <p className="font-display text-foreground font-bold text-lg">
              Deliver safe, effective, and long-term results — not false
              promises.
            </p>
          </div>
        </div>
      </div>

      {/* ── Our Journey ──────────────────────────────────────────────────── */}
      <div className="bg-muted/30 border-y border-border py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              Our Journey
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              From Startup Stage to Your Doorstep
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                Solura Cosmetics started as an idea during a startup pitch
                competition, where it{" "}
                <strong className="text-foreground font-semibold">
                  won recognition at the state level
                </strong>
                . That moment validated our mission — to build a natural
                skincare brand in India people can trust.
              </p>
              <p>After months of:</p>
              <ul className="space-y-2 pl-2">
                {[
                  "Ingredient research",
                  "Product formulation",
                  "Safety testing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                <strong className="text-foreground font-semibold">
                  Solura Cosmetics officially launched on 27 October 2025
                </strong>
                , turning vision into reality.
              </p>
            </div>
            <div className="space-y-4">
              {JOURNEY_MILESTONES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-1.5 min-w-0">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Founder's Story ───────────────────────────────────────────────── */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              The People Behind Solura
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Founder's Story
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Founder */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-lg font-bold text-primary">
                    MM
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Muhammadh Muaadh
                  </p>
                  <p className="text-xs text-primary font-medium">Founder</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Started at age 16
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Founded by{" "}
                <strong className="text-foreground">Muhammadh Muaadh</strong>,
                this natural skincare brand in India was built with passion and
                discipline. At just 16, balancing studies and business required:
              </p>
              <ul className="space-y-2">
                {["Consistency", "Hard work", "Continuous learning"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-foreground font-medium">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From late nights to real product development — Solura was built
                step by step.
              </p>
            </div>

            {/* Co-Founder */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-lg font-bold text-secondary-foreground">
                    MJ
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Muhammed Javith
                  </p>
                  <p className="text-xs text-primary font-medium">
                    Co-Founder & Mentor
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Muhammed Javith</strong>{" "}
                played a key role in shaping strategy and execution.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Together, they built Solura into more than a brand — a{" "}
                <strong className="text-foreground">
                  trust-driven ecosystem
                </strong>{" "}
                focused on real results.
              </p>
            </div>
          </div>

          {/* Together callout */}
          <div className="bg-card rounded-2xl border border-primary/20 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Together, they built Solura into more than a brand — a{" "}
              <strong className="text-foreground">
                trust-driven ecosystem
              </strong>{" "}
              focused on real results and lasting relationships with every
              customer.
            </p>
          </div>
        </div>
      </div>

      {/* ── What Makes Us Different ───────────────────────────────────────── */}
      <div className="bg-muted/30 border-y border-border py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-primary font-medium text-sm tracking-widest uppercase">
                  What Makes Us Different
                </p>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground leading-snug">
                At Solura, We Don't Sell Trends — We Solve Problems
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We are building a natural skincare brand in India that customers
                rely on — not just try once.
              </p>
              <ul className="space-y-3">
                {DIFFERENTIATORS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-foreground font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/8 rounded-2xl p-8 space-y-5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    Oct 2025
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Official launch date
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    State Winner
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Startup pitch competition
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    100%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Natural & cruelty-free
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Our Philosophy ────────────────────────────────────────────────── */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Lightbulb
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                <p className="text-primary font-medium text-sm tracking-widest uppercase">
                  Our Philosophy
                </p>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground leading-snug">
                Beauty Is Not About Hiding Problems — It's About Solving Them
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every product is designed to:
              </p>
              <div className="space-y-3 pt-1">
                {PHILOSOPHY_POINTS.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm text-foreground font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission box */}
            <div className="bg-card rounded-2xl border border-primary/20 p-8 text-center space-y-4 flex flex-col items-center justify-center">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Target className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-primary font-medium tracking-widest uppercase mb-3">
                  Our Mission
                </p>
                <blockquote className="font-display text-2xl font-bold text-foreground leading-snug mb-4">
                  "Cure Problem,
                  <br />
                  Sure Solution"
                </blockquote>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  To create result-driven, natural skincare and haircare
                  products that genuinely improve lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <div className="bg-primary/8 border-t border-primary/20 py-12 px-4 text-center">
        <div className="container mx-auto max-w-xl space-y-4">
          <Flame className="h-8 w-8 text-primary mx-auto" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            Ready to experience real results?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Shop our chemical-free skincare and haircare range — designed for
            Indian skin and hair needs.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-full px-8 py-3 transition-all duration-200 hover:opacity-90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            data-ocid="about-shop-cta"
          >
            Shop Solura Products
          </a>
        </div>
      </div>
    </Layout>
  );
}
