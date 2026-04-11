import { r as reactExports, j as jsxRuntimeExports, L as Link, c as cn, S as Skeleton } from "./index-DBS95maA.js";
import { u as useBanners, a as useBestsellers, b as useNewArrivals } from "./useProducts-V6WZMPVQ.js";
import { C as ChevronRight } from "./chevron-right-CqtOTdwC.js";
import { C as ChevronLeft, S as StarRating, P as ProductCard } from "./ProductCard-eov0rlDa.js";
import { L as Layout, M as MapPin } from "./Layout-KMtFnDpV.js";
import { S as Shield } from "./shield-CC2Cd8vB.js";
import { L as Leaf } from "./leaf-CceTaso_.js";
import { c as createLucideIcon, B as Button } from "./sheet-Bi-Q7ojW.js";
import { S as Sparkles } from "./sparkles-BMQ2JAcn.js";
import { F as Flame } from "./flame-CXrF0p8o.js";
import { A as Award } from "./award-8fiql1uM.js";
import { T as Truck } from "./truck-CtEYmikJ.js";
import "./useMutation-C725G2l4.js";
import "./Badge-CK9LYXQ5.js";
import "./star-D1fgcFiw.js";
import "./separator-DRO9oWly.js";
import "./index-B0a3ejYA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
      key: "x6z5xu"
    }
  ],
  [
    "path",
    {
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
      key: "1x4zh5"
    }
  ],
  ["path", { d: "m14 16-3 3 3 3", key: "f6jyew" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598", key: "wf1obh" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
      key: "9tzpgr"
    }
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096", key: "1oe83g" }]
];
const Recycle = createLucideIcon("recycle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const PRODUCT_IMAGE = "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg";
const FALLBACK_SLIDES = [
  {
    id: "glow",
    headline: "Reveal Your\nNatural Glow",
    subtext: "Ancient Ayurvedic wisdom meets modern skincare science — crafted from saffron, rose & 16 rare botanicals.",
    cta: "Shop Now",
    ctaLink: "/shop",
    badge: "🌿 New Season Collection",
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: "whitening",
    headline: "Solura Whitening\nCream — ₹499",
    subtext: "Clinically formulated to brighten, even, and illuminate your complexion. Dermatologist tested & certified.",
    cta: "Buy Now — ₹499",
    ctaLink: "/shop",
    badge: "⭐ Bestseller",
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: "pure",
    headline: "Cure Problem,\nSure Solution",
    subtext: "Every formula is 100% cruelty-free, sustainably sourced, and tested by dermatologists across India.",
    cta: "Explore Range",
    ctaLink: "/shop",
    badge: "🌱 Chemical-Free Formula",
    imageUrl: PRODUCT_IMAGE
  }
];
const ACCENT_COLORS = [
  "oklch(0.92 0.06 20)",
  "oklch(0.35 0.05 60)",
  "oklch(0.92 0.06 155)",
  "oklch(0.88 0.08 240)",
  "oklch(0.82 0.1 310)"
];
function bannerToSlide(b, index) {
  return {
    id: b.id,
    headline: b.title,
    subtext: b.subtitle || "Discover our exclusive range of natural skincare and beauty products.",
    cta: "Shop Now",
    ctaLink: "/shop",
    imageUrl: b.imageUrl,
    accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length]
  };
}
const INTERVAL_MS = 4500;
function HeroSlider() {
  const { data: banners, isLoading } = useBanners();
  const slides = banners && banners.length > 0 ? banners.map(bannerToSlide) : FALLBACK_SLIDES.map((f) => ({
    ...f,
    accentColor: ACCENT_COLORS[0]
  }));
  const [current, setCurrent] = reactExports.useState(0);
  const [isAnimating, setIsAnimating] = reactExports.useState(false);
  const [direction, setDirection] = reactExports.useState("next");
  const timerRef = reactExports.useRef(null);
  const slideCount = slides.length;
  const goTo = reactExports.useCallback(
    (idx, dir = "next") => {
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
    [isAnimating, slides.length]
  );
  const startTimer = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL_MS);
  }, [slides.length]);
  reactExports.useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);
  const prevSlideCountRef = reactExports.useRef(slides.length);
  reactExports.useEffect(() => {
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
  const handleDot = (idx) => {
    goTo(idx, idx > current ? "next" : "prev");
    startTimer();
  };
  const slide = slides[current] ?? slides[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative w-full overflow-hidden",
      style: { height: "clamp(320px, 56vw, 580px)" },
      "aria-label": "Hero promotional slider",
      "data-ocid": "hero-slider",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-700",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: slide.imageUrl,
                  alt: slide.headline,
                  className: "w-full h-full object-cover",
                  draggable: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)"
                  }
                }
              )
            ]
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-muted/20 animate-pulse",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full container mx-auto px-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "max-w-2xl",
              style: {
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? `translateX(${direction === "next" ? "-24px" : "24px"})` : "translateX(0)",
                transition: "opacity 0.35s ease, transform 0.35s ease"
              },
              children: [
                slide.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-body font-semibold tracking-wide",
                    style: {
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "rgba(255,255,255,0.95)"
                    },
                    children: slide.badge
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-bold leading-tight mb-4 text-white",
                    style: {
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      textShadow: "0 2px 20px rgba(0,0,0,0.35)",
                      whiteSpace: "pre-line"
                    },
                    children: slide.headline
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body leading-relaxed mb-8 max-w-md",
                    style: {
                      fontSize: "clamp(0.875rem, 1.6vw, 1.0625rem)",
                      color: "rgba(255,255,255,0.88)",
                      textShadow: "0 1px 8px rgba(0,0,0,0.3)"
                    },
                    children: slide.subtext
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: slide.ctaLink, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "inline-flex items-center gap-2 font-body font-semibold rounded-full px-7 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    style: {
                      background: "rgba(255,255,255,0.95)",
                      color: "oklch(0.25 0.05 15)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                      fontSize: "clamp(0.875rem, 1.3vw, 1rem)"
                    },
                    "data-ocid": `hero-slider-cta-${slide.id}`,
                    children: [
                      slide.cta,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4", "aria-hidden": "true" })
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-1",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display font-bold text-white/90 leading-none",
                    style: { fontSize: "clamp(2rem, 3vw, 3rem)" },
                    children: [
                      "0",
                      current + 1
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-px h-10",
                    style: { background: "rgba(255,255,255,0.35)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-body text-white/50",
                    style: { fontSize: "0.75rem" },
                    children: [
                      "0",
                      slideCount
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handlePrev,
            className: "absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
            style: {
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)"
            },
            "aria-label": "Previous slide",
            "data-ocid": "hero-slider-prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleNext,
            className: "absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
            style: {
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)"
            },
            "aria-label": "Next slide",
            "data-ocid": "hero-slider-next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20",
            role: "tablist",
            "aria-label": "Slide navigation",
            children: slides.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": current === i,
                "aria-label": `Go to slide ${i + 1}`,
                onClick: () => handleDot(i),
                className: "rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                style: {
                  width: current === i ? "28px" : "8px",
                  height: "8px",
                  background: current === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                  boxShadow: current === i ? "0 2px 8px rgba(0,0,0,0.3)" : "none"
                }
              },
              s.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 h-0.5 bg-white/30 w-full",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-white/80",
                style: {
                  animation: `slider-progress ${INTERVAL_MS}ms linear forwards`
                }
              },
              current
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes slider-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      ` })
      ]
    }
  );
}
const BADGES = [
  {
    icon: Shield,
    title: "Dermatologist Tested",
    description: "Clinically tested & recommended by dermatologists."
  },
  {
    icon: Leaf,
    title: "Cruelty-Free",
    description: "Never tested on animals. 100% cruelty-free formulas."
  },
  {
    icon: FlaskConical,
    title: "Ayurvedic Formulations",
    description: "Authentic Ayurvedic ingredients, scientifically enhanced."
  },
  {
    icon: Recycle,
    title: "Sustainably Sourced",
    description: "Ethically sourced ingredients & eco-conscious packaging."
  }
];
function TrustBadges({
  variant = "row",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        variant === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-6" : "flex flex-wrap justify-center gap-6 md:gap-10",
        className
      ),
      children: BADGES.map(({ icon: Icon, title, description }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex gap-3 items-start",
            variant === "row" ? "flex-col items-center text-center max-w-[160px]" : ""
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(variant === "row" ? "" : ""), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-foreground text-sm", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: description })
            ] })
          ]
        },
        title
      ))
    }
  );
}
function SaleBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-secondary text-secondary-foreground text-xs text-center py-2.5 px-4 font-body tracking-wide flex items-center justify-center gap-3",
      "aria-label": "Promotional banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "🌸 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "SUMMER GLOW SALE" }),
          " — Up to 20% off on selected skincare & makeup!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block text-secondary-foreground/60", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "Free shipping on orders above ₹999" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" })
      ]
    }
  );
}
function HeroSection() {
  const [soldToday] = reactExports.useState(() => Math.floor(Math.random() * 40) + 80);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, oklch(0.96 0.025 15) 0%, oklch(0.98 0.01 20) 50%, oklch(0.94 0.03 85) 100%)"
      },
      "aria-labelledby": "hero-heading",
      "data-ocid": "hero-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.78 0.1 85) 0%, oklch(0.75 0.16 12) 100%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.65 0.12 15) 0%, oklch(0.75 0.08 30) 100%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12 md:py-16 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5 text-xs font-body text-accent font-semibold",
                "aria-live": "polite",
                "data-ocid": "hero-urgency",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 animate-pulse", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    soldToday,
                    " products sold today"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                id: "hero-heading",
                className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-4",
                children: [
                  "Reveal Your",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.65 0.12 15)" }, children: "Natural" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "Glow."
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-md", children: "Ancient Ayurvedic wisdom meets modern skincare science. Crafted from saffron, rose, and 16 rare botanicals — right from the heart of Tamil Nadu." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "font-body font-semibold px-8 shadow-elevated",
                  "data-ocid": "hero-shop-now",
                  children: "Shop the Collection"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "skincare" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "font-body font-semibold px-8",
                  "data-ocid": "hero-explore",
                  children: "Explore Skincare"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 text-xs text-muted-foreground font-body", children: [
              { icon: ShieldCheck, label: "Dermatologist Tested" },
              { icon: Award, label: "GST Certified" },
              { icon: Truck, label: "Free Delivery ₹999+" }
            ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
            ] }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex justify-center lg:justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md lg:max-w-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/hero-lifestyle.dim_700x800.jpg",
                  alt: "Woman with radiant glowing skin applying Solura Cosmetics skincare surrounded by natural botanicals",
                  className: "w-full h-auto rounded-2xl shadow-elevated object-cover max-h-[520px]",
                  loading: "eager"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-card rounded-xl shadow-elevated p-3 flex items-center gap-3 border border-border max-w-[220px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg",
                    alt: "Solura Whitening Cream",
                    className: "w-12 h-14 object-cover rounded-lg shrink-0",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground line-clamp-1", children: "Solura Whitening Cream" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: 4.8, size: "sm", className: "my-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-bold text-primary", children: "₹499" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-card rounded-full shadow-soft px-3 py-2 border border-border flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1", "aria-hidden": "true", children: ["🌸", "✨", "💫"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-6 w-6 rounded-full bg-muted/50 flex items-center justify-center text-xs border border-border",
                    children: emoji
                  },
                  emoji
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold text-foreground leading-none", children: "4.8★" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-body leading-none mt-0.5", children: "1000+ reviews" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-center text-xs italic text-muted-foreground/70", children: "✏️ Product shown, images & price are managed by the admin panel" })
          ] })
        ] }) })
      ]
    }
  );
}
const CATEGORIES = [
  {
    name: "Radiance Skincare",
    slug: "skincare",
    description: "Experience the luxury of Solura Cosmetics, where ancient beauty secrets meet modern innovation.",
    image: "/assets/generated/category-skincare.dim_600x400.jpg"
  },
  {
    name: "Makeup",
    slug: "makeup",
    description: "Formulated with potent botanical actives for luminous, long-lasting complexion.",
    image: "/assets/generated/category-makeup.dim_600x400.jpg"
  },
  {
    name: "Haircare",
    slug: "haircare",
    description: "High quality Ayurvedic haircare for all hair types. Bhringraj, Amla & more.",
    image: "/assets/generated/category-haircare.dim_600x400.jpg"
  }
];
function CategorySection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 md:py-20 bg-background",
      "aria-labelledby": "categories-heading",
      "data-ocid": "category-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2", children: "Shop by Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "categories-heading",
              className: "font-display text-3xl md:text-4xl font-bold text-foreground",
              children: "Explore Our Curated Collections"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mt-2 text-sm", children: "Crafted with purpose, powered by nature." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/shop/$category",
            params: { category: cat.slug },
            className: "group block",
            "data-ocid": `category-card-${cat.slug}`,
            "aria-label": `Shop ${cat.name}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-1 bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: cat.image,
                  alt: `${cat.name} collection — premium Ayurvedic cosmetics by Solura`,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors", children: cat.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body line-clamp-2 mb-3", children: cat.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center text-sm font-semibold font-body text-primary gap-1", children: [
                  "Shop now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      className: "h-4 w-4 transition-smooth group-hover:translate-x-1",
                      "aria-hidden": "true"
                    }
                  )
                ] })
              ] })
            ] })
          },
          cat.slug
        )) })
      ] })
    }
  );
}
function BestsellerCarousel({ products }) {
  const [current, setCurrent] = reactExports.useState(0);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const visibleCount = isMobile ? 2 : 4;
  const maxIndex = Math.max(0, products.length - visibleCount);
  const goTo = reactExports.useCallback(
    (idx) => setCurrent(Math.max(0, Math.min(idx, maxIndex))),
    [maxIndex]
  );
  const prev = reactExports.useCallback(() => goTo(current - 1), [current, goTo]);
  const next = reactExports.useCallback(() => goTo(current + 1), [current, goTo]);
  reactExports.useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => c >= maxIndex ? 0 : c + 1),
      4e3
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [maxIndex]);
  if (products.length === 0) return null;
  const gapRem = 1.5;
  const itemWidth = `calc(${100 / visibleCount}% - ${gapRem * (visibleCount - 1) / visibleCount}rem)`;
  const offset = `calc(-${current} * (${100 / visibleCount}% + ${gapRem / visibleCount}rem))`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-7", "data-ocid": "bestseller-carousel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out",
        style: { transform: `translateX(${offset})` },
        children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "shrink-0",
            style: { width: itemWidth },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, showSlider: true })
          },
          product.id
        ))
      }
    ) }),
    products.length > visibleCount && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: prev,
          disabled: current === 0,
          className: "absolute left-0 top-1/3 -translate-y-1/2 h-9 w-9 rounded-full bg-card shadow-elevated border border-border flex items-center justify-center transition-smooth hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed z-10",
          "aria-label": "Previous products",
          "data-ocid": "carousel-prev",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: next,
          disabled: current >= maxIndex,
          className: "absolute right-0 top-1/3 -translate-y-1/2 h-9 w-9 rounded-full bg-card shadow-elevated border border-border flex items-center justify-center transition-smooth hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed z-10",
          "aria-label": "Next products",
          "data-ocid": "carousel-next",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center gap-1.5 mt-6",
          role: "tablist",
          "aria-label": "Carousel navigation",
          children: products.slice(0, maxIndex + 1).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": current === i,
              onClick: () => goTo(i),
              className: `h-2 rounded-full transition-smooth ${current === i ? "bg-primary w-6" : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"}`,
              "aria-label": `Go to slide ${i + 1}`
            },
            p.id
          ))
        }
      )
    ] })
  ] });
}
function BestsellerSection() {
  const { data: products, isLoading } = useBestsellers();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 md:py-20 bg-muted/30",
      "aria-labelledby": "bestsellers-heading",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2", children: "Most Loved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "bestsellers-heading",
                className: "font-display text-3xl md:text-4xl font-bold text-foreground",
                children: "Bestsellers"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/shop",
              className: "text-sm font-body font-semibold text-primary hover:underline hidden sm:flex items-center gap-1",
              "data-ocid": "bestsellers-see-all",
              children: [
                "See all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: ["bs-a", "bs-b", "bs-c", "bs-d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
        ] }, id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BestsellerCarousel, { products: products ?? [] })
      ] })
    }
  );
}
function TrustSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-14 md:py-16 bg-muted/20 border-y border-border",
      "aria-labelledby": "trust-heading",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2", children: "Our Promise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "trust-heading",
              className: "font-display text-3xl md:text-4xl font-bold text-foreground",
              children: "Trusted Beauty"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, { variant: "grid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mt-8", children: [
          "🚚 Free Delivery above ₹999",
          "💳 Secure Checkout",
          "📦 Cash on Delivery",
          "🔄 Easy Returns",
          "🇮🇳 Made in India"
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-flex items-center px-4 py-2 rounded-full border border-border bg-card text-sm font-body text-muted-foreground",
            children: item
          },
          item
        )) })
      ] })
    }
  );
}
function NewArrivalsSection() {
  const { data: products, isLoading } = useNewArrivals();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 md:py-20 bg-background",
      "aria-labelledby": "new-arrivals-heading",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2", children: "Just Launched" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "new-arrivals-heading",
                className: "font-display text-3xl md:text-4xl font-bold text-foreground",
                children: "New Arrivals"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/shop",
              className: "text-sm font-body font-semibold text-primary hover:underline hidden sm:flex items-center gap-1",
              "data-ocid": "new-arrivals-see-all",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: ["na-a", "na-b", "na-c", "na-d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
        ] }, id)) }) : !(products == null ? void 0 : products.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-12 text-muted-foreground font-body",
            "data-ocid": "new-arrivals-empty",
            children: "New products launching soon — stay tuned!"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, showSlider: true }, product.id)) })
      ] })
    }
  );
}
const TESTIMONIALS = [
  {
    name: "Priya Krishnamurthy",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    quote: "The Solura Whitening Cream has genuinely transformed my skin. Three weeks in and my dark spots have faded significantly. My friends keep asking what I'm doing differently!",
    avatar: "PK"
  },
  {
    name: "Anitha Subramanian",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    quote: "I've tried so many serums — nothing works like this. The saffron and rose formula is incredibly luxurious, and results come within the first week. Worth every rupee!",
    avatar: "AS"
  },
  {
    name: "Lakshmi Natarajan",
    location: "Madurai, Tamil Nadu",
    rating: 5,
    quote: "After 2 months of the Ayurvedic Hair Vitalizer, my hair fall reduced by 70%. Baby hairs are growing back. This is truly magical — I recommend it to everyone.",
    avatar: "LN"
  },
  {
    name: "Arun Srinivas",
    location: "Bengaluru, Karnataka",
    rating: 5,
    quote: "Gifted this to my wife and she absolutely loves the entire skincare range. Packaging is premium and the natural ingredients really make a difference.",
    avatar: "AR"
  },
  {
    name: "Meena Pillai",
    location: "Trivandrum, Kerala",
    rating: 5,
    quote: "Finally a brand that understands South Indian skin! The formulas work beautifully for our climate — not oily, deeply nourishing, and the glow is real.",
    avatar: "MP"
  }
];
function TestimonialsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 md:py-20 bg-muted/30",
      "aria-labelledby": "testimonials-heading",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2", children: "Real Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "testimonials-heading",
              className: "font-display text-3xl md:text-4xl font-bold text-foreground",
              children: "Customer Testimonials"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mt-2 text-sm", children: "Over 1,000 happy customers across India" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: TESTIMONIALS.slice(0, 3).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "article",
          {
            className: "bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-elevated transition-smooth hover:-translate-y-0.5",
            "data-ocid": `testimonial-card-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: t.rating, size: "sm", className: "mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-body leading-relaxed italic", children: [
                "“",
                t.quote,
                "”"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-primary", children: t.avatar })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body flex items-center gap-1 truncate", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0", "aria-hidden": "true" }),
                    t.location
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0", children: "✓ Verified" })
              ] })
            ]
          },
          t.name
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:grid lg:grid-cols-2 gap-5 mt-5 max-w-3xl mx-auto", children: TESTIMONIALS.slice(3).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "article",
          {
            className: "bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-elevated transition-smooth hover:-translate-y-0.5",
            "data-ocid": `testimonial-extra-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: t.rating, size: "sm", className: "mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-body leading-relaxed italic", children: [
                "“",
                t.quote,
                "”"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-primary", children: t.avatar })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body flex items-center gap-1 truncate", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0", "aria-hidden": "true" }),
                    t.location
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0", children: "✓ Verified" })
              ] })
            ]
          },
          t.name
        )) })
      ] })
    }
  );
}
function AboutSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 md:py-20 bg-background",
      "aria-labelledby": "about-heading",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-3", children: "Our Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              id: "about-heading",
              className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-snug",
              children: [
                "Born from Ancient Wisdom,",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Made for Modern Skin" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-base leading-relaxed mb-4", children: "Solura Cosmetics was born in Karur, Tamil Nadu — the heart of South India's textile and trade heritage. We believe beauty is rooted in nature. Our formulations draw from centuries-old Ayurvedic traditions, combining the power of saffron, rose, sandalwood, and 16+ rare botanicals with modern dermatological science." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-base leading-relaxed mb-6", children: "Every product is sustainably sourced, cruelty-free, and dermatologist tested. Proudly GST-certified and made in India, committed to celebrating the natural beauty of every Indian woman." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "font-body font-semibold",
              "data-ocid": "about-shop-cta",
              children: "Discover Our Range"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-product.dim_800x600.jpg",
              alt: "Solura Cosmetics premium product collection — Ayurvedic beauty made in Karur, Tamil Nadu",
              className: "w-full rounded-2xl shadow-elevated object-cover max-h-[400px]",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: [
            { value: "16+", label: "Rare Botanicals" },
            { value: "1000+", label: "Happy Customers" },
            { value: "100%", label: "Natural Ingredients" }
          ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center bg-card rounded-xl p-4 shadow-soft border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: label })
              ]
            },
            label
          )) })
        ] })
      ] }) })
    }
  );
}
function NewsletterSection() {
  const [email, setEmail] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-14 md:py-16 bg-card border-t border-border",
      "aria-labelledby": "newsletter-heading",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-primary font-semibold mb-2", children: "Stay Radiant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            id: "newsletter-heading",
            className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-3",
            children: "Subscribe for Exclusive Offers"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-6", children: "Get early access to new launches, beauty tips, and exclusive discounts delivered to your inbox." }),
        submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "output",
          {
            className: "block bg-primary/10 border border-primary/20 rounded-xl p-4 text-primary font-body font-semibold",
            "data-ocid": "newsletter-success",
            "aria-live": "polite",
            children: "🌸 Welcome to the Solura family! You'll hear from us soon."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex gap-2 max-w-md mx-auto",
            "data-ocid": "newsletter-form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "Enter your email address",
                  required: true,
                  className: "flex-1 h-11 px-4 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring min-w-0",
                  "aria-label": "Email address for newsletter",
                  "data-ocid": "newsletter-email-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "shrink-0 font-body font-semibold px-5",
                  "data-ocid": "newsletter-submit",
                  children: "Subscribe"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaleBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategorySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BestsellerSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewArrivalsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterSection, {})
  ] });
}
export {
  HomePage as default
};
