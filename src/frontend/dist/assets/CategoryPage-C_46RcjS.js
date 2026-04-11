import { u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DBS95maA.js";
import { L as Layout } from "./Layout-KMtFnDpV.js";
import { P as ProductGridSkeleton } from "./LoadingSkeleton-DTyfrrLJ.js";
import { P as ProductCard } from "./ProductCard-eov0rlDa.js";
import { c as createLucideIcon, B as Button } from "./sheet-Bi-Q7ojW.js";
import { c as useProducts } from "./useProducts-V6WZMPVQ.js";
import { L as Leaf } from "./leaf-CceTaso_.js";
import { S as Sparkles } from "./sparkles-BMQ2JAcn.js";
import { C as ChevronRight } from "./chevron-right-CqtOTdwC.js";
import "./separator-DRO9oWly.js";
import "./index-B0a3ejYA.js";
import "./Badge-CK9LYXQ5.js";
import "./star-D1fgcFiw.js";
import "./useMutation-C725G2l4.js";
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
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
];
const Wind = createLucideIcon("wind", __iconNode);
const CATEGORY_META = {
  skincare: {
    label: "Skincare",
    description: "Nourish, protect, and reveal your skin's natural radiance with our Ayurvedic-inspired skincare range. Each formula is crafted with potent botanicals — saffron, sandalwood, rose, and turmeric — for a luminous, healthy complexion.",
    tagline: "Rooted in nature. Backed by Ayurveda.",
    Icon: Droplets,
    accentClass: "text-primary",
    bgClass: "from-primary/5 to-background"
  },
  makeup: {
    label: "Makeup",
    description: "Express yourself with our long-lasting, skin-loving makeup collection. Infused with nourishing botanical extracts and designed to complement every Indian skin tone.",
    tagline: "Colour that cares.",
    Icon: Sparkles,
    accentClass: "text-secondary-foreground",
    bgClass: "from-secondary/10 to-background"
  },
  haircare: {
    label: "Haircare",
    description: "Restore strength, shine, and vitality with our Bhringraj, Amla, and Brahmi formulations — developed for the Indian climate against humidity, heat, and pollution.",
    tagline: "Strength from root to tip.",
    Icon: Wind,
    accentClass: "text-accent",
    bgClass: "from-accent/5 to-background"
  },
  "bath-body": {
    label: "Bath & Body",
    description: "Indulge in a luxurious bathing ritual with our botanical body care range. Enriched with Indian spices, floral extracts, and cold-pressed oils for velvety-smooth skin.",
    tagline: "A ritual for every day.",
    Icon: Leaf,
    accentClass: "text-chart-3",
    bgClass: "from-chart-3/5 to-background"
  }
};
const FALLBACK_META = {
  label: "Collection",
  description: "Explore our curated collection of premium beauty products.",
  tagline: "Discover your glow.",
  Icon: Sparkles,
  accentClass: "text-primary",
  bgClass: "from-primary/5 to-background"
};
const OTHER_CATEGORIES = [
  "skincare",
  "makeup",
  "haircare",
  "bath-body"
];
function CategoryPage() {
  const { category } = useParams({ strict: false });
  const catKey = category;
  const meta = CATEGORY_META[catKey] ?? FALLBACK_META;
  const { Icon } = meta;
  const { data: products, isLoading } = useProducts(catKey);
  const categoryProducts = reactExports.useMemo(() => {
    const list = products ?? [];
    return [...list].sort((a, b) => {
      if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [products]);
  const bestsellers = categoryProducts.filter((p) => p.isBestseller);
  const newArrivals = categoryProducts.filter(
    (p) => p.isNew && !p.isBestseller
  );
  const rest = categoryProducts.filter((p) => !p.isBestseller && !p.isNew);
  const relatedCategories = OTHER_CATEGORIES.filter((c) => c !== catKey);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: `bg-gradient-to-b ${meta.bgClass} border-b border-border py-12 px-4`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-6",
              "aria-label": "Breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/shop",
                    className: "hover:text-foreground transition-colors",
                    children: "Shop"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: meta.label })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex h-12 w-12 rounded-xl bg-card border border-border items-center justify-center shadow-soft shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-6 w-6 ${meta.accentClass}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-1", children: meta.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground italic mb-3", children: meta.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm md:text-base max-w-2xl leading-relaxed", children: meta.description }),
              !isLoading && categoryProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs uppercase tracking-widest text-muted-foreground font-semibold", children: [
                categoryProducts.length,
                " product",
                categoryProducts.length !== 1 ? "s" : "",
                " available"
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-7xl mx-auto px-4 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 4 }) : categoryProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20",
        "data-ocid": `empty-state-${catKey}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🌿" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Coming Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-6 max-w-sm mx-auto", children: "We're crafting something beautiful for this collection. Check back soon!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", "data-ocid": "empty-browse-all-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Browse All Products" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      bestsellers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl md:text-2xl font-bold text-foreground", children: [
            meta.label,
            " Bestsellers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full uppercase tracking-wide", children: "Most Loved" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
            "data-ocid": `${catKey}-bestsellers-grid`,
            children: bestsellers.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProductCard,
              {
                product,
                showSlider: true
              },
              product.id
            ))
          }
        )
      ] }),
      newArrivals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl md:text-2xl font-bold text-foreground", children: [
            "New in ",
            meta.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full uppercase tracking-wide", children: "Just Arrived" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
            "data-ocid": `${catKey}-new-grid`,
            children: newArrivals.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProductCard,
              {
                product,
                showSlider: true
              },
              product.id
            ))
          }
        )
      ] }),
      rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl md:text-2xl font-bold text-foreground mb-6", children: bestsellers.length > 0 || newArrivals.length > 0 ? `More in ${meta.label}` : `${meta.label} Collection` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
            "data-ocid": `${catKey}-grid`,
            children: rest.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProductCard,
              {
                product,
                showSlider: true
              },
              product.id
            ))
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-6 text-center", children: "Explore More Collections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
        relatedCategories.map((cat) => {
          const m = CATEGORY_META[cat] ?? FALLBACK_META;
          const RelIcon = m.Icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop/$category",
              params: { category: cat },
              "data-ocid": `related-cat-${cat}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "gap-2 hover:border-primary/40 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RelIcon, { className: `h-4 w-4 ${m.accentClass}` }),
                    m.label
                  ]
                }
              )
            },
            cat
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", "data-ocid": "related-shop-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "gap-2", children: "View All" }) })
      ] })
    ] }) })
  ] });
}
export {
  CategoryPage as default
};
