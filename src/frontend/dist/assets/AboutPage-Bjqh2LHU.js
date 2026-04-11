import { r as reactExports, j as jsxRuntimeExports } from "./index-DBS95maA.js";
import { L as Layout, H as Heart } from "./Layout-KMtFnDpV.js";
import { S as Separator } from "./separator-DRO9oWly.js";
import { F as Flame } from "./flame-CXrF0p8o.js";
import { c as createLucideIcon } from "./sheet-Bi-Q7ojW.js";
import { L as Leaf } from "./leaf-CceTaso_.js";
import { A as Award } from "./award-8fiql1uM.js";
import { S as Star } from "./star-D1fgcFiw.js";
import { U as Users } from "./users-BEDMF-fg.js";
import { S as Sparkles } from "./sparkles-BMQ2JAcn.js";
import { C as CircleCheck } from "./circle-check-Dl5lTX0k.js";
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
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$2);
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
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
];
const Rocket = createLucideIcon("rocket", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const DIFFERENTIATORS = [
  "100% Natural & Chemical-Free Ingredients",
  "Eco-Friendly & Skin-Safe Formulations",
  "Designed for Indian Skin & Hair Needs",
  "Honest, Transparent Approach",
  "Affordable & Effective Solutions"
];
const PHILOSOPHY_POINTS = [
  { label: "Treat root causes", icon: Target },
  { label: "Deliver long-term results", icon: Star },
  { label: "Support healthy skin and hair", icon: Heart }
];
const JOURNEY_MILESTONES = [
  {
    icon: Rocket,
    label: "Idea born at a startup pitch competition — won recognition at the state level"
  },
  {
    icon: Leaf,
    label: "Ingredient research — deep dive into natural formulations"
  },
  {
    icon: Lightbulb,
    label: "Product formulation — crafting solutions for real skin concerns"
  },
  { icon: Award, label: "Safety testing — rigorous trials before launch" },
  {
    icon: Star,
    label: "Solura Cosmetics officially launched — 27 October 2025"
  }
];
function AboutPage() {
  reactExports.useEffect(() => {
    document.title = "Solura Cosmetics | Natural Skincare Brand in India for Real Results";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Discover Solura Cosmetics, a natural skincare brand in India offering chemical-free, eco-friendly skincare and haircare solutions for real results. Cure Problem, Sure Solution."
      );
    }
    return () => {
      document.title = "Solura Cosmetics - Natural Beauty Products | Skincare Makeup Haircare India";
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-primary/8 border-b border-border py-24 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 left-12 h-56 w-56 rounded-full bg-primary/10 blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-16 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm tracking-widest uppercase mb-4", children: "About Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight", children: "About Solura Cosmetics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl text-foreground font-display font-semibold mb-6", children: "Natural Skincare Brand in India That Actually Solves Problems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-primary text-sm tracking-wide", children: "Cure Problem, Sure Solution" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-muted-foreground leading-relaxed", children: [
        "Solura Cosmetics is a fast-growing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "natural skincare brand in India" }),
        " ",
        "built on one powerful belief — every skin and hair problem deserves a real, honest solution."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base text-muted-foreground leading-relaxed", children: [
        "Unlike brands that focus on temporary beauty, we create chemical-free skincare and haircare products that target real concerns like",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "acne, hair fall, dull skin, and scalp damage" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground leading-relaxed", children: "As a trusted natural skincare brand in India, our goal is simple:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-2xl px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "👉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-foreground font-bold text-lg", children: "Deliver safe, effective, and long-term results — not false promises." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-y border-border py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm tracking-widest uppercase mb-3", children: "Our Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-4", children: "From Startup Stage to Your Doorstep" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-muted-foreground leading-relaxed text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Solura Cosmetics started as an idea during a startup pitch competition, where it",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground font-semibold", children: "won recognition at the state level" }),
            ". That moment validated our mission — to build a natural skincare brand in India people can trust."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "After months of:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 pl-2", children: [
            "Ingredient research",
            "Product formulation",
            "Safety testing"
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: item })
          ] }, item)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground font-semibold", children: "Solura Cosmetics officially launched on 27 October 2025" }),
            ", turning vision into reality."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: JOURNEY_MILESTONES.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed pt-1.5 min-w-0", children: label })
        ] }, label)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm tracking-widest uppercase mb-3", children: "The People Behind Solura" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Founder's Story" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5 hover:border-primary/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-primary", children: "MM" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Muhammadh Muaadh" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium", children: "Founder" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Started at age 16" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Founded by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Muhammadh Muaadh" }),
            ", this natural skincare brand in India was built with passion and discipline. At just 16, balancing studies and business required:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: ["Consistency", "Hard work", "Continuous learning"].map(
            (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: item })
            ] }, item)
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "From late nights to real product development — Solura was built step by step." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5 hover:border-primary/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-secondary-foreground", children: "MJ" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Muhammed Javith" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium", children: "Co-Founder & Mentor" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Muhammed Javith" }),
            " ",
            "played a key role in shaping strategy and execution."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Together, they built Solura into more than a brand — a",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "trust-driven ecosystem" }),
            " ",
            "focused on real results."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-primary/20 p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed max-w-xl mx-auto", children: [
          "Together, they built Solura into more than a brand — a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "trust-driven ecosystem" }),
          " ",
          "focused on real results and lasting relationships with every customer."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-y border-border py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm tracking-widest uppercase", children: "What Makes Us Different" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground leading-snug", children: "At Solura, We Don't Sell Trends — We Solve Problems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We are building a natural skincare brand in India that customers rely on — not just try once." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: DIFFERENTIATORS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: item })
        ] }, item)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 rounded-2xl p-8 space-y-5 border border-primary/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: "Oct 2025" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Official launch date" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: "State Winner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Startup pitch competition" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: "100%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Natural & cruelty-free" })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Lightbulb,
            {
              className: "h-5 w-5 text-primary",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm tracking-widest uppercase", children: "Our Philosophy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground leading-snug", children: "Beauty Is Not About Hiding Problems — It's About Solving Them" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Every product is designed to:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pt-1", children: PHILOSOPHY_POINTS.map(({ label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: "h-4 w-4 text-primary",
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: label })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-primary/20 p-8 text-center space-y-4 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-7 w-7 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium tracking-widest uppercase mb-3", children: "Our Mission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display text-2xl font-bold text-foreground leading-snug mb-4", children: [
            '"Cure Problem,',
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            'Sure Solution"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto", children: "To create result-driven, natural skincare and haircare products that genuinely improve lives." })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/8 border-t border-primary/20 py-12 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-8 w-8 text-primary mx-auto", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Ready to experience real results?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Shop our chemical-free skincare and haircare range — designed for Indian skin and hair needs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/shop",
          className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-full px-8 py-3 transition-all duration-200 hover:opacity-90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "data-ocid": "about-shop-cta",
          children: "Shop Solura Products"
        }
      )
    ] }) })
  ] });
}
export {
  AboutPage as default
};
