import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { Award, Heart, Leaf, Sparkles, Star, Users } from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    desc: "We source the finest Ayurvedic herbs and botanicals — saffron from Kashmir, sandalwood from Karnataka, and rose from the valleys of Tamil Nadu.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free Always",
    desc: "Every Solura product is 100% cruelty-free. We believe in beauty that does not harm — not animals, not the planet, not your skin.",
  },
  {
    icon: Sparkles,
    title: "Science-Backed Formulas",
    desc: "Ancient wisdom meets modern science. Our R&D team blends time-tested Ayurvedic recipes with clinically validated active ingredients.",
  },
  {
    icon: Award,
    title: "Quality Certified",
    desc: "All products are manufactured in ISO-certified facilities and pass rigorous dermatological testing before reaching your hands.",
  },
];

const TEAM = [
  {
    name: "Kavitha Sundarajan",
    role: "Founder & CEO",
    bio: "Born and raised in Karur, Kavitha draws on generations of family wisdom in natural beauty care to craft products that truly work for Indian skin.",
  },
  {
    name: "Dr. Rajan Pillai",
    role: "Head of Formulation",
    bio: "Ayurvedic practitioner with 15+ years of experience, Dr. Pillai bridges traditional Sidha medicine with modern cosmetic chemistry.",
  },
  {
    name: "Meenakshi Iyer",
    role: "Brand & Creative Director",
    bio: "With a background in textile design and South Indian aesthetics, Meenakshi brings the warmth and grace of Tamil culture to every Solura touchpoint.",
  },
];

const MILESTONES = [
  { year: "2018", event: "Founded in Karur, Tamil Nadu with 3 products" },
  { year: "2019", event: "Expanded to 50+ retail outlets across Tamil Nadu" },
  { year: "2021", event: "Launched online store; 10,000+ customers served" },
  { year: "2022", event: "Introduced Ayurvedic Hair Vitalizer range" },
  { year: "2023", event: "Reached North India markets in Delhi & Mumbai" },
  { year: "2024", event: "50,000+ happy customers and counting" },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-display text-5xl font-bold text-foreground mb-4">
            Beauty Rooted in Heritage
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Solura Cosmetics was born in the heart of Tamil Nadu — where
            centuries of Ayurvedic wisdom meet the modern need for gentle,
            effective skincare. Every product we craft carries the soul of South
            India and the science of tomorrow.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-background py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-primary font-medium text-sm tracking-widest uppercase">
                Our Mission
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Reveal Your Natural Glow
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Indian skin is unique — shaped by climate, sun exposure, and
                diverse skin tones that span the full spectrum. Yet global
                beauty brands rarely understand it. Solura was created to fill
                that gap: formulated in India, for India, celebrating the
                richness of Indian beauty traditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that every Indian woman deserves skincare crafted for
                her skin — products that work with her unique chemistry, not
                against it. Clean, potent, and deeply nourishing.
              </p>
            </div>
            <div className="bg-primary/8 rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    50,000+
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Happy customers
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    4.8 / 5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Average rating
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    100%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cruelty-free products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/30 border-y border-border py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card rounded-xl border border-border p-6 flex gap-4"
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

      {/* Journey */}
      <div className="bg-background py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Our Journey
          </h2>
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
                  <p className="font-display text-lg font-bold text-primary">
                    {year}
                  </p>
                  <p className="text-foreground mt-1">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-muted/30 border-y border-border py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bio }) => (
              <div
                key={name}
                className="bg-card rounded-xl border border-border p-6 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-primary">
                    {name[0]}
                  </span>
                </div>
                <p className="font-display font-bold text-foreground">{name}</p>
                <p className="text-xs text-primary font-medium mt-0.5 mb-3">
                  {role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
