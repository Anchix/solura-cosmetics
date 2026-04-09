import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  Flame,
  Heart,
  Leaf,
  Lightbulb,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "Natural & Chemical-Free",
    desc: "We formulate with eco-friendly, natural ingredients — gentle on your skin and kind to the planet.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free Always",
    desc: "Every Solura product is 100% cruelty-free. Beauty should never come at the cost of harm.",
  },
  {
    icon: Sparkles,
    title: "Effective & Honest",
    desc: "We don't believe in temporary fixes or fake promises — only products that solve real problems.",
  },
  {
    icon: Award,
    title: "Certified Quality",
    desc: "Manufactured with rigorous standards — FDA Approved, GMP, ISO Certified for your safety.",
  },
];

const FOUNDERS = [
  {
    name: "Muhammadh Muaadh",
    role: "Founder",
    initials: "MM",
    bio: "A 16-year-old student entrepreneur in 11th Standard. Balancing school with business was not easy — but passion made it possible. Late nights, early mornings, learning, failing, and learning again — Solura was built step by step with dedication and discipline.",
  },
  {
    name: "Muhammed Javith",
    role: "Co-Founder & Mentor",
    initials: "MJ",
    bio: "Believed in the vision, shaped the strategy, and stood as a pillar of support in transforming a student idea into a growing brand. More than a mentor — a brother and partner in every challenge and milestone.",
  },
];

const MILESTONES = [
  {
    year: "2024",
    event: "Idea born at a state-level startup pitch competition — and won",
  },
  {
    year: "2025",
    event:
      "Months of research, ingredient analysis, and formulation trials begin",
  },
  {
    year: "Oct 27, 2025",
    event:
      "Solura Cosmetics officially launches — a student dream becomes real",
  },
  {
    year: "2026",
    event: "Growing nationally, trusted by customers across India",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="relative bg-primary/8 border-b border-border py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-8 left-12 h-48 w-48 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 right-16 h-64 w-64 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            About Us
          </p>
          <h1 className="font-display text-5xl font-bold text-foreground mb-5 leading-tight">
            Solura Cosmetics
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            Born from a simple yet powerful belief — every skin and hair problem
            deserves a sure, honest solution.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
            <Flame className="h-4 w-4 text-primary" />
            <span className="font-display font-semibold text-primary text-sm tracking-wide">
              Cure Problem, Sure Solution
            </span>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              From a Startup Stage to Your Doorstep
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
            <p>
              Our journey began not in a factory, but in a startup pitch
              competition, where an idea rooted in care, nature, and purpose{" "}
              <strong className="text-foreground font-semibold">
                won at the state level
              </strong>
              . That victory was not just a trophy — it was a turning point.
              What started as a vision soon became a responsibility.
            </p>
            <p>
              From that moment, we decided to convert our idea into a real
              business that could touch real lives. After months of hard work,
              deep research, ingredient analysis, and formulation trials,{" "}
              <strong className="text-foreground font-semibold">
                Solura Cosmetics officially launched on 27 October 2025
              </strong>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Founders */}
      <div className="bg-muted/30 border-y border-border py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              The People Behind Solura
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              A Founder's Story
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {FOUNDERS.map(({ name, role, initials, bio }) => (
              <div
                key={name}
                className="bg-card rounded-2xl border border-border p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg font-bold text-primary">
                      {initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">
                      {name}
                    </p>
                    <p className="text-xs text-primary font-medium">{role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {bio}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-2xl border border-primary/20 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Solura Cosmetics is not just a startup — it is a{" "}
              <strong className="text-foreground">brotherhood</strong> built on
              trust, belief, and shared dreams. More than titles like founder
              and mentor, we stand together like brothers, supporting each other
              through every challenge and milestone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Idea */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <p className="text-primary font-medium text-sm tracking-widest uppercase">
                  Our Idea
                </p>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground leading-snug">
                Built with Heart, Guided by Nature
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We don't believe in temporary beauty or fake promises. Our
                mission is to create products that{" "}
                <strong className="text-foreground">solve real problems</strong>
                , using natural, chemical-free, and eco-friendly ingredients,
                while being gentle, effective, and honest.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From a student's dream to a growing brand — Solura Cosmetics is
                built with heart, guided by nature, and driven by trust.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Flame className="h-4 w-4 text-primary" />
                <span className="font-display font-semibold text-foreground">
                  "Cure Problem, Sure Solution"
                </span>
              </div>
            </div>
            <div className="bg-primary/8 rounded-2xl p-8 space-y-5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-primary" />
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
                  <Award className="h-5 w-5 text-primary" />
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
                  <Leaf className="h-5 w-5 text-primary" />
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

      {/* Values */}
      <div className="bg-muted/30 border-y border-border py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Principles
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card rounded-xl border border-border p-6 flex gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              Timeline
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Journey
            </h2>
          </div>
          <div className="space-y-0">
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="flex-1 w-0.5 bg-border my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="font-display text-base font-bold text-primary">
                    {year}
                  </p>
                  <p className="text-foreground mt-0.5 text-sm leading-relaxed">
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
