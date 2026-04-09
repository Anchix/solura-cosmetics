import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBestsellers, useNewArrivals } from "@/hooks/useProducts";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Flame,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Sale Banner ─────────────────────────────────────────────────────────────
function SaleBanner() {
  return (
    <div
      className="bg-secondary text-secondary-foreground text-xs text-center py-2.5 px-4 font-body tracking-wide flex items-center justify-center gap-3"
      aria-label="Promotional banner"
    >
      <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>
        🌸 <strong>SUMMER GLOW SALE</strong> — Up to 20% off on selected
        skincare &amp; makeup!
      </span>
      <span className="hidden sm:block text-secondary-foreground/60">|</span>
      <span className="hidden sm:block">
        Free shipping on orders above ₹999
      </span>
      <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [soldToday] = useState(() => Math.floor(Math.random() * 40) + 80);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.025 15) 0%, oklch(0.98 0.01 20) 50%, oklch(0.94 0.03 85) 100%)",
      }}
      aria-labelledby="hero-heading"
      data-ocid="hero-section"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.1 85) 0%, oklch(0.75 0.16 12) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.12 15) 0%, oklch(0.75 0.08 30) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Copy */}
          <div className="relative z-10 max-w-xl">
            {/* Urgency pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5 text-xs font-body text-accent font-semibold"
              aria-live="polite"
              data-ocid="hero-urgency"
            >
              <Flame className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
              <span>{soldToday} products sold today</span>
            </div>

            <h1
              id="hero-heading"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-4"
            >
              Reveal Your{" "}
              <span style={{ color: "oklch(0.65 0.12 15)" }}>Natural</span>
              <br />
              Glow.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-md">
              Ancient Ayurvedic wisdom meets modern skincare science. Crafted
              from saffron, rose, and 16 rare botanicals — right from the heart
              of Tamil Nadu.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="font-body font-semibold px-8 shadow-elevated"
                  data-ocid="hero-shop-now"
                >
                  Shop the Collection
                </Button>
              </Link>
              <Link to="/shop/$category" params={{ category: "skincare" }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-body font-semibold px-8"
                  data-ocid="hero-explore"
                >
                  Explore Skincare
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-body">
              {[
                { icon: ShieldCheck, label: "Dermatologist Tested" },
                { icon: Award, label: "GST Certified" },
                { icon: Truck, label: "Free Delivery ₹999+" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/assets/generated/hero-lifestyle.dim_700x800.jpg"
                alt="Woman with radiant glowing skin applying Solura Cosmetics skincare surrounded by natural botanicals"
                className="w-full h-auto rounded-2xl shadow-elevated object-cover max-h-[520px]"
                loading="eager"
              />
              {/* Floating product snippet */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-card rounded-xl shadow-elevated p-3 flex items-center gap-3 border border-border max-w-[220px]">
                <img
                  src="/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg"
                  alt="Solura Whitening Cream"
                  className="w-12 h-14 object-cover rounded-lg shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-foreground line-clamp-1">
                    Solura Whitening Cream
                  </p>
                  <StarRating rating={4.8} size="sm" className="my-0.5" />
                  <p className="font-body text-sm font-bold text-primary">
                    ₹499
                  </p>
                </div>
              </div>
              {/* Floating reviews badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-card rounded-full shadow-soft px-3 py-2 border border-border flex items-center gap-2">
                <div className="flex -space-x-1" aria-hidden="true">
                  {["🌸", "✨", "💫"].map((emoji) => (
                    <span
                      key={emoji}
                      className="h-6 w-6 rounded-full bg-muted/50 flex items-center justify-center text-xs border border-border"
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-body font-semibold text-foreground leading-none">
                    4.8★
                  </p>
                  <p className="text-[10px] text-muted-foreground font-body leading-none mt-0.5">
                    1000+ reviews
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-center text-xs italic text-muted-foreground/70">
              ✏️ Product shown, images &amp; price are managed by the admin panel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Category Cards ───────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    name: "Radiance Skincare",
    slug: "skincare",
    description:
      "Experience the luxury of Solura Cosmetics, where ancient beauty secrets meet modern innovation.",
    image: "/assets/generated/category-skincare.dim_600x400.jpg",
  },
  {
    name: "Makeup",
    slug: "makeup",
    description:
      "Formulated with potent botanical actives for luminous, long-lasting complexion.",
    image: "/assets/generated/category-makeup.dim_600x400.jpg",
  },
  {
    name: "Haircare",
    slug: "haircare",
    description:
      "High quality Ayurvedic haircare for all hair types. Bhringraj, Amla & more.",
    image: "/assets/generated/category-haircare.dim_600x400.jpg",
  },
];

function CategorySection() {
  return (
    <section
      className="py-16 md:py-20 bg-background"
      aria-labelledby="categories-heading"
      data-ocid="category-section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2">
            Shop by Category
          </p>
          <h2
            id="categories-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Explore Our Curated Collections
          </h2>
          <p className="text-muted-foreground font-body mt-2 text-sm">
            Crafted with purpose, powered by nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/shop/$category"
              params={{ category: cat.slug }}
              className="group block"
              data-ocid={`category-card-${cat.slug}`}
              aria-label={`Shop ${cat.name}`}
            >
              <div className="rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-1 bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={`${cat.name} collection — premium Ayurvedic cosmetics by Solura`}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold font-body text-primary gap-1">
                    Shop now
                    <ChevronRight
                      className="h-4 w-4 transition-smooth group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bestseller Carousel ──────────────────────────────────────────────────────
function BestsellerCarousel({ products }: { products: Product[] }) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? 2 : 4;
  const maxIndex = Math.max(0, products.length - visibleCount);

  const goTo = useCallback(
    (idx: number) => setCurrent(Math.max(0, Math.min(idx, maxIndex))),
    [maxIndex],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
      4000,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [maxIndex]);

  if (products.length === 0) return null;

  const gapRem = 1.5;
  const itemWidth = `calc(${100 / visibleCount}% - ${(gapRem * (visibleCount - 1)) / visibleCount}rem)`;
  const offset = `calc(-${current} * (${100 / visibleCount}% + ${gapRem / visibleCount}rem))`;

  return (
    <div className="relative px-7" data-ocid="bestseller-carousel">
      <div className="overflow-hidden">
        <div
          className="flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${offset})` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0"
              style={{ width: itemWidth }}
            >
              <ProductCard product={product} showSlider />
            </div>
          ))}
        </div>
      </div>

      {products.length > visibleCount && (
        <>
          <button
            type="button"
            onClick={prev}
            disabled={current === 0}
            className="absolute left-0 top-1/3 -translate-y-1/2 h-9 w-9 rounded-full bg-card shadow-elevated border border-border flex items-center justify-center transition-smooth hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="Previous products"
            data-ocid="carousel-prev"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={current >= maxIndex}
            className="absolute right-0 top-1/3 -translate-y-1/2 h-9 w-9 rounded-full bg-card shadow-elevated border border-border flex items-center justify-center transition-smooth hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="Next products"
            data-ocid="carousel-next"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
          <div
            className="flex justify-center gap-1.5 mt-6"
            role="tablist"
            aria-label="Carousel navigation"
          >
            {products.slice(0, maxIndex + 1).map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={current === i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-smooth ${
                  current === i
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BestsellerSection() {
  const { data: products, isLoading } = useBestsellers();

  return (
    <section
      className="py-16 md:py-20 bg-muted/30"
      aria-labelledby="bestsellers-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2">
              Most Loved
            </p>
            <h2
              id="bestsellers-heading"
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
            >
              Bestsellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-body font-semibold text-primary hover:underline hidden sm:flex items-center gap-1"
            data-ocid="bestsellers-see-all"
          >
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {["bs-a", "bs-b", "bs-c", "bs-d"].map((id) => (
              <div key={id} className="space-y-3">
                <Skeleton className="aspect-[4/5] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <BestsellerCarousel products={products ?? []} />
        )}
      </div>
    </section>
  );
}

// ─── Trust Section ────────────────────────────────────────────────────────────
function TrustSection() {
  return (
    <section
      className="py-14 md:py-16 bg-muted/20 border-y border-border"
      aria-labelledby="trust-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2">
            Our Promise
          </p>
          <h2
            id="trust-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Trusted Beauty
          </h2>
        </div>
        <TrustBadges variant="grid" />
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            "🚚 Free Delivery above ₹999",
            "💳 Secure Checkout",
            "📦 Cash on Delivery",
            "🔄 Easy Returns",
            "🇮🇳 Made in India",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-card text-sm font-body text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── New Arrivals ─────────────────────────────────────────────────────────────
function NewArrivalsSection() {
  const { data: products, isLoading } = useNewArrivals();

  return (
    <section
      className="py-16 md:py-20 bg-background"
      aria-labelledby="new-arrivals-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2">
              Just Launched
            </p>
            <h2
              id="new-arrivals-heading"
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
            >
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-body font-semibold text-primary hover:underline hidden sm:flex items-center gap-1"
            data-ocid="new-arrivals-see-all"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {["na-a", "na-b", "na-c", "na-d"].map((id) => (
              <div key={id} className="space-y-3">
                <Skeleton className="aspect-[4/5] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : !products?.length ? (
          <div
            className="text-center py-12 text-muted-foreground font-body"
            data-ocid="new-arrivals-empty"
          >
            New products launching soon — stay tuned!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} showSlider />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Priya Krishnamurthy",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    quote:
      "The Solura Whitening Cream has genuinely transformed my skin. Three weeks in and my dark spots have faded significantly. My friends keep asking what I'm doing differently!",
    avatar: "PK",
  },
  {
    name: "Anitha Subramanian",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    quote:
      "I've tried so many serums — nothing works like this. The saffron and rose formula is incredibly luxurious, and results come within the first week. Worth every rupee!",
    avatar: "AS",
  },
  {
    name: "Lakshmi Natarajan",
    location: "Madurai, Tamil Nadu",
    rating: 5,
    quote:
      "After 2 months of the Ayurvedic Hair Vitalizer, my hair fall reduced by 70%. Baby hairs are growing back. This is truly magical — I recommend it to everyone.",
    avatar: "LN",
  },
  {
    name: "Arun Srinivas",
    location: "Bengaluru, Karnataka",
    rating: 5,
    quote:
      "Gifted this to my wife and she absolutely loves the entire skincare range. Packaging is premium and the natural ingredients really make a difference.",
    avatar: "AR",
  },
  {
    name: "Meena Pillai",
    location: "Trivandrum, Kerala",
    rating: 5,
    quote:
      "Finally a brand that understands South Indian skin! The formulas work beautifully for our climate — not oily, deeply nourishing, and the glow is real.",
    avatar: "MP",
  },
];

function TestimonialsSection() {
  return (
    <section
      className="py-16 md:py-20 bg-muted/30"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2">
            Real Results
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Customer Testimonials
          </h2>
          <p className="text-muted-foreground font-body mt-2 text-sm">
            Over 1,000 happy customers across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <article
              key={t.name}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-elevated transition-smooth hover:-translate-y-0.5"
              data-ocid={`testimonial-card-${i}`}
            >
              <StarRating rating={t.rating} size="sm" className="mb-3" />
              <blockquote className="mb-4">
                <p className="text-sm text-foreground font-body leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <footer className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-display text-sm font-bold text-primary">
                    {t.avatar}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-sm text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-body flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {t.location}
                  </p>
                </div>
                <span className="ml-auto text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                  ✓ Verified
                </span>
              </footer>
            </article>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-5 mt-5 max-w-3xl mx-auto">
          {TESTIMONIALS.slice(3).map((t, i) => (
            <article
              key={t.name}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-elevated transition-smooth hover:-translate-y-0.5"
              data-ocid={`testimonial-extra-${i}`}
            >
              <StarRating rating={t.rating} size="sm" className="mb-3" />
              <blockquote className="mb-4">
                <p className="text-sm text-foreground font-body leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <footer className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-display text-sm font-bold text-primary">
                    {t.avatar}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-sm text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-body flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {t.location}
                  </p>
                </div>
                <span className="ml-auto text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                  ✓ Verified
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      className="py-16 md:py-20 bg-background"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-3">
              Our Story
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-snug"
            >
              Born from Ancient Wisdom,
              <br />
              <span className="italic text-primary">Made for Modern Skin</span>
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
              Solura Cosmetics was born in Karur, Tamil Nadu — the heart of
              South India's textile and trade heritage. We believe beauty is
              rooted in nature. Our formulations draw from centuries-old
              Ayurvedic traditions, combining the power of saffron, rose,
              sandalwood, and 16+ rare botanicals with modern dermatological
              science.
            </p>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              Every product is sustainably sourced, cruelty-free, and
              dermatologist tested. Proudly GST-certified and made in India,
              committed to celebrating the natural beauty of every Indian woman.
            </p>
            <Link to="/shop">
              <Button
                className="font-body font-semibold"
                data-ocid="about-shop-cta"
              >
                Discover Our Range
              </Button>
            </Link>
          </div>

          <div>
            <img
              src="/assets/generated/hero-product.dim_800x600.jpg"
              alt="Solura Cosmetics premium product collection — Ayurvedic beauty made in Karur, Tamil Nadu"
              className="w-full rounded-2xl shadow-elevated object-cover max-h-[400px]"
              loading="lazy"
            />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { value: "16+", label: "Rare Botanicals" },
                { value: "1000+", label: "Happy Customers" },
                { value: "100%", label: "Natural Ingredients" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center bg-card rounded-xl p-4 shadow-soft border border-border"
                >
                  <p className="font-display text-2xl font-bold text-primary">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter CTA ───────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      className="py-14 md:py-16 bg-card border-t border-border"
      aria-labelledby="newsletter-heading"
    >
      <div className="container mx-auto px-4 text-center max-w-xl">
        <p className="text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2">
          Stay Radiant
        </p>
        <h2
          id="newsletter-heading"
          className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3"
        >
          Subscribe for Exclusive Offers
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-6">
          Get early access to new launches, beauty tips, and exclusive discounts
          delivered to your inbox.
        </p>

        {submitted ? (
          <output
            className="block bg-primary/10 border border-primary/20 rounded-xl p-4 text-primary font-body font-semibold"
            data-ocid="newsletter-success"
            aria-live="polite"
          >
            🌸 Welcome to the Solura family! You'll hear from us soon.
          </output>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-md mx-auto"
            data-ocid="newsletter-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 h-11 px-4 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
              aria-label="Email address for newsletter"
              data-ocid="newsletter-email-input"
            />
            <Button
              type="submit"
              className="shrink-0 font-body font-semibold px-5"
              data-ocid="newsletter-submit"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <Layout>
      <SaleBanner />
      <HeroSection />
      <CategorySection />
      <BestsellerSection />
      <TrustSection />
      <NewArrivalsSection />
      <TestimonialsSection />
      <AboutSection />
      <NewsletterSection />
    </Layout>
  );
}
