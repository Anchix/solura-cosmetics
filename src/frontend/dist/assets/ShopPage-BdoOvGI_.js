import { r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-DBS95maA.js";
import { L as Layout, S as Search } from "./Layout-KMtFnDpV.js";
import { P as ProductGridSkeleton } from "./LoadingSkeleton-DTyfrrLJ.js";
import { P as ProductCard } from "./ProductCard-eov0rlDa.js";
import { c as createLucideIcon, X, B as Button } from "./sheet-Bi-Q7ojW.js";
import { I as Input } from "./input-ZHQY_1wr.js";
import { S as Separator } from "./separator-DRO9oWly.js";
import { c as useProducts } from "./useProducts-V6WZMPVQ.js";
import "./Badge-CK9LYXQ5.js";
import "./star-D1fgcFiw.js";
import "./chevron-right-CqtOTdwC.js";
import "./index-B0a3ejYA.js";
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const PRICE_MAX = 3e3;
const CATEGORY_LABELS = {
  all: "All Products",
  skincare: "Skincare",
  makeup: "Makeup",
  haircare: "Haircare"
};
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" }
];
function sortProducts(products, sort) {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "bestseller":
      return copy.sort(
        (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
      );
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return copy;
  }
}
function FilterSidebar({
  category,
  setCategory,
  priceMax,
  setPriceMax,
  sort,
  setSort,
  onClose
}) {
  const categories = [
    "all",
    "skincare",
    "makeup",
    "haircare"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-card border border-border rounded-xl p-5 space-y-6 sticky top-24", children: [
    onClose && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Filters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          "aria-label": "Close filters",
          className: "text-muted-foreground hover:text-foreground transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCategory(cat),
          "data-ocid": `filter-cat-${cat}`,
          className: `w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-smooth ${category === cat ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted/50"}`,
          children: CATEGORY_LABELS[cat]
        },
        cat
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Price Range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 100,
            max: PRICE_MAX,
            step: 50,
            value: priceMax,
            onChange: (e) => setPriceMax(Number(e.target.value)),
            "data-ocid": "filter-price-range",
            className: "w-full accent-primary cursor-pointer",
            "aria-label": "Maximum price filter"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            "Up to ₹",
            priceMax.toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Sort By" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSort(opt.value),
          "data-ocid": `sort-${opt.value}`,
          className: `w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-smooth ${sort === opt.value ? "bg-secondary/40 text-foreground font-semibold" : "text-foreground hover:bg-muted/50"}`,
          children: opt.label
        },
        opt.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "w-full",
        "data-ocid": "filter-reset",
        onClick: () => {
          setCategory("all");
          setPriceMax(PRICE_MAX);
          setSort("newest");
        },
        children: "Reset Filters"
      }
    )
  ] });
}
function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const [category, setCategory] = reactExports.useState("all");
  const [priceMax, setPriceMax] = reactExports.useState(PRICE_MAX);
  const [sort, setSort] = reactExports.useState("newest");
  const [search, setSearch] = reactExports.useState("");
  const [showMobileFilters, setShowMobileFilters] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    let list = products ?? [];
    if (category !== "all") list = list.filter((p) => p.category === category);
    list = list.filter((p) => p.price <= priceMax);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return sortProducts(list, sort);
  }, [products, category, priceMax, sort, search]);
  const hasActiveFilters = category !== "all" || priceMax < PRICE_MAX || search.trim().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-2 text-sm text-muted-foreground mb-4",
          "aria-label": "Breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Shop" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-2", children: "All Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl", children: "Discover our full collection of Ayurvedic-inspired skincare, makeup, and haircare — crafted for the Indian woman." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search products, ingredients, tags…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "shop-search"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              "aria-label": "Clear search",
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "lg:hidden gap-2",
            onClick: () => setShowMobileFilters(true),
            "data-ocid": "mobile-filter-toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
              "Filters",
              hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-56 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterSidebar,
          {
            category,
            setCategory,
            priceMax,
            setPriceMax,
            sort,
            setSort
          }
        ) }),
        showMobileFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden fixed inset-0 z-50 flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-foreground/30 backdrop-blur-sm",
              onClick: () => setShowMobileFilters(false),
              onKeyDown: (e) => e.key === "Escape" && setShowMobileFilters(false),
              role: "button",
              tabIndex: -1,
              "aria-label": "Close filter panel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 ml-auto w-72 bg-background p-4 h-full overflow-y-auto shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterSidebar,
            {
              category,
              setCategory,
              priceMax,
              setPriceMax,
              sort,
              setSort,
              onClose: () => setShowMobileFilters(false)
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-5", children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm text-muted-foreground font-body",
                "data-ocid": "results-count",
                children: [
                  "Showing",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
                  " ",
                  "product",
                  filtered.length !== 1 ? "s" : ""
                ]
              }
            ),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setCategory("all");
                  setPriceMax(PRICE_MAX);
                  setSearch("");
                },
                className: "text-xs text-primary font-semibold hover:underline flex items-center gap-1",
                "data-ocid": "clear-all-filters",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
                  " Clear all"
                ]
              }
            ),
            category !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-semibold", children: [
              CATEGORY_LABELS[category],
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCategory("all"),
                  "aria-label": "Remove category filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                }
              )
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 6 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-20 px-4",
              "data-ocid": "empty-state-shop",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🌸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No products found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-6 max-w-sm mx-auto", children: "Try adjusting your filters or search term to find what you're looking for." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => {
                      setCategory("all");
                      setPriceMax(PRICE_MAX);
                      setSearch("");
                      setSort("newest");
                    },
                    "data-ocid": "browse-all-cta",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 mr-2" }),
                      "Browse All Products"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5", children: filtered.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, showSlider: true }, product.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ShopPage as default
};
