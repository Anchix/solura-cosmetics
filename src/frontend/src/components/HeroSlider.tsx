import { useBanners } from "@/hooks/useProducts";
import type { CanisterBanner } from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Fallback slides shown when no banners exist in the canister ──────────────
// All fallback slides use real product images — NO color gradients.

const PRODUCT_IMAGE =
  "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg";

interface FallbackSlide {
  id: string;
  headline: string;
  subtext: string;
  cta: string;
  ctaLink: string;
  badge?: string;
  imageUrl: string;
}

const FALLBACK_SLIDES: FallbackSlide[] = [
  {
    id: "glow",
    headline: "Reveal Your\nNatural Glow",
    subtext:
      "Ancient Ayurvedic wisdom meets modern skincare science — crafted from saffron, rose & 16 rare botanicals.",
    cta: "Shop Now",
    ctaLink: "/shop",
    badge: "🌿 New Season Collection",
    imageUrl: PRODUCT_IMAGE,
  },
  {
    id: "whitening",
    headline: "Solura Whitening\nCream — ₹499",
    subtext:
      "Clinically formulated to brighten, even, and illuminate your complexion. Dermatologist tested & certified.",
    cta: "Buy Now — ₹499",
    ctaLink: "/shop",
    badge: "⭐ Bestseller",
    imageUrl: PRODUCT_IMAGE,
  },
  {
    id: "pure",
    headline: "Cure Problem,\nSure Solution",
    subtext:
      "Every formula is 100% cruelty-free, sustainably sourced, and tested by dermatologists across India.",
    cta: "Explore Range",
    ctaLink: "/shop",
    badge: "🌱 Chemical-Free Formula",
    imageUrl: PRODUCT_IMAGE,
  },
];

// Accent colors cycled for canister banners (used for text accent only)
const ACCENT_COLORS = [
  "oklch(0.92 0.06 20)",
  "oklch(0.35 0.05 60)",
  "oklch(0.92 0.06 155)",
  "oklch(0.88 0.08 240)",
  "oklch(0.82 0.1 310)",
];

interface SlideData {
  id: string;
  headline: string;
  subtext: string;
  cta: string;
  ctaLink: string;
  badge?: string;
  imageUrl: string;
  accentColor: string;
}

function bannerToSlide(b: CanisterBanner, index: number): SlideData {
  return {
    id: b.id,
    headline: b.title,
    subtext:
      b.subtitle ||
      "Discover our exclusive range of natural skincare and beauty products.",
    cta: "Shop Now",
    ctaLink: "/shop",
    imageUrl: b.imageUrl,
    accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
  };
}

const INTERVAL_MS = 4500;

export default function HeroSlider() {
  const { data: banners, isLoading } = useBanners();

  const slides: SlideData[] =
    banners && banners.length > 0
      ? banners.map(bannerToSlide)
      : FALLBACK_SLIDES.map((f) => ({
          ...f,
          accentColor: ACCENT_COLORS[0],
        }));

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideCount = slides.length;

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev" = "next") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((idx + slides.length) % slides.length);
        setIsAnimating(false);
      }, 350);
    },
    // slides.length is a primitive — safe to include directly
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAnimating, slides.length],
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Reset to first slide when banner list loads
  const prevSlideCountRef = useRef(slides.length);
  useEffect(() => {
    if (prevSlideCountRef.current !== slides.length) {
      prevSlideCountRef.current = slides.length;
      setCurrent(0);
    }
  });

  const handlePrev = () => {
    goTo(current - 1, "prev");
    startTimer();
  };

  const handleNext = () => {
    goTo(current + 1, "next");
    startTimer();
  };

  const handleDot = (idx: number) => {
    goTo(idx, idx > current ? "next" : "prev");
    startTimer();
  };

  const slide = slides[current] ?? slides[0];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(320px, 56vw, 580px)" }}
      aria-label="Hero promotional slider"
      data-ocid="hero-slider"
    >
      {/* Slide background — always a real image */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        aria-hidden="true"
      >
        <img
          src={slide.imageUrl}
          alt={slide.headline}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)",
          }}
        />
      </div>

      {/* Loading shimmer — neutral, no gradient */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted/20 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Slide content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div
          className="max-w-2xl"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${direction === "next" ? "-24px" : "24px"})`
              : "translateX(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Badge */}
          {slide.badge && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-body font-semibold tracking-wide"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {slide.badge}
            </div>
          )}

          {/* Headline */}
          <h2
            className="font-display font-bold leading-tight mb-4 text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
              whiteSpace: "pre-line",
            }}
          >
            {slide.headline}
          </h2>

          {/* Subtext */}
          <p
            className="font-body leading-relaxed mb-8 max-w-md"
            style={{
              fontSize: "clamp(0.875rem, 1.6vw, 1.0625rem)",
              color: "rgba(255,255,255,0.88)",
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            {slide.subtext}
          </p>

          {/* CTA */}
          <Link to={slide.ctaLink as "/"}>
            <button
              type="button"
              className="inline-flex items-center gap-2 font-body font-semibold rounded-full px-7 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "oklch(0.25 0.05 15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
              }}
              data-ocid={`hero-slider-cta-${slide.id}`}
            >
              {slide.cta}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Link>
        </div>

        {/* Slide counter — right side */}
        <div
          className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span
            className="font-display font-bold text-white/90 leading-none"
            style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
          >
            0{current + 1}
          </span>
          <div
            className="w-px h-10"
            style={{ background: "rgba(255,255,255,0.35)" }}
          />
          <span
            className="font-body text-white/50"
            style={{ fontSize: "0.75rem" }}
          >
            0{slideCount}
          </span>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
        aria-label="Previous slide"
        data-ocid="hero-slider-prev"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
        aria-label="Next slide"
        data-ocid="hero-slider-next"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Dot navigation */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => handleDot(i)}
            className="rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              width: current === i ? "28px" : "8px",
              height: "8px",
              background:
                current === i
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.4)",
              boxShadow: current === i ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-full"
        aria-hidden="true"
      >
        <div
          key={current}
          className="h-full bg-white/80"
          style={{
            animation: `slider-progress ${INTERVAL_MS}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes slider-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
