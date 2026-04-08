import { r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-BYwbnXHo.js";
import { L as Layout, m as motion, U as User } from "./Layout-DTgLeLmj.js";
import { B as Button } from "./authStore-bVvk2SIb.js";
import { d as useListBlogPosts, C as Calendar } from "./useBlog-DbQGyHMj.js";
import { B as BookOpen } from "./book-open-ztOrSX2C.js";
import { C as ChevronRight } from "./chevron-right-B73qp2IS.js";
import "./separator-EpQ6h15r.js";
import "./index-CB7yveq3.js";
import "./backend-C0WYxHKI.js";
import "./useMutation-ybpFZUfc.js";
const SAMPLE_POSTS = [
  {
    id: 1n,
    title: "5 Ayurvedic Skincare Rituals for a Natural Glow",
    excerpt: "Discover time-honoured Ayurvedic practices that South Indian women have used for centuries to maintain radiant, healthy skin.",
    content: "",
    author: "Meera Krishnan",
    category: "Skincare Tips",
    coverImage: "/assets/generated/blog-skincare-rituals.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 7 * 864e5) * 1000000n,
    updatedAt: BigInt(Date.now() - 7 * 864e5) * 1000000n,
    slug: "ayurvedic-skincare-rituals"
  },
  {
    id: 2n,
    title: "The Power of Kumkumadi: India's Golden Beauty Secret",
    excerpt: "Saffron, sandalwood, turmeric — the ancient kumkumadi formulation is having a modern revival. Here's why it works.",
    content: "",
    author: "Priya Ramaswamy",
    category: "Product News",
    coverImage: "/assets/generated/blog-kumkumadi.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 14 * 864e5) * 1000000n,
    updatedAt: BigInt(Date.now() - 14 * 864e5) * 1000000n,
    slug: "power-of-kumkumadi"
  },
  {
    id: 3n,
    title: "Top Beauty Trends for Indian Skin Tones in 2025",
    excerpt: "From rich ochre lip colours to glass-skin finishes — beauty trends uniquely suited to Indian skin tones and climates.",
    content: "",
    author: "Anitha Subramanian",
    category: "Beauty Trends",
    coverImage: "/assets/generated/blog-beauty-trends.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 21 * 864e5) * 1000000n,
    updatedAt: BigInt(Date.now() - 21 * 864e5) * 1000000n,
    slug: "beauty-trends-2025"
  },
  {
    id: 4n,
    title: "How to Build a Minimalist Haircare Routine",
    excerpt: "You don't need 10 products to have healthy hair. We break down a simple, effective routine using traditional Indian ingredients.",
    content: "",
    author: "Lakshmi Natarajan",
    category: "Skincare Tips",
    coverImage: "/assets/generated/blog-haircare-routine.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 28 * 864e5) * 1000000n,
    updatedAt: BigInt(Date.now() - 28 * 864e5) * 1000000n,
    slug: "minimalist-haircare-routine"
  }
];
const CATEGORIES = [
  "All",
  "Skincare Tips",
  "Beauty Trends",
  "Product News",
  "Haircare"
];
const CATEGORY_COLORS = {
  "Skincare Tips": "bg-primary/10 text-primary border-primary/20",
  "Beauty Trends": "bg-secondary/30 text-foreground border-secondary/40",
  "Product News": "bg-accent/10 text-accent border-accent/20",
  Haircare: "bg-muted text-muted-foreground border-border"
};
function formatDate(ns) {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function BlogCard({ post, index }) {
  const colorClass = CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: "group bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth flex flex-col",
      "data-ocid": `blog-card-${post.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-muted/40", children: [
          post.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.coverImage,
              alt: post.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-muted-foreground/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`,
              children: post.category
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body line-clamp-3 mb-4 flex-1", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
                post.author
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                formatDate(post.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" })
          ] })
        ] })
      ]
    }
  );
}
function BlogSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[16/9] w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
      ] })
    ] })
  ] });
}
function BlogPage() {
  const { data: livePosts, isLoading } = useListBlogPosts();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const posts = livePosts && livePosts.length > 0 ? livePosts : SAMPLE_POSTS;
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
            "Beauty Journal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3", children: "Tips & Inspiration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-base max-w-xl mx-auto", children: "Beauty wisdom rooted in Ayurveda, crafted for the modern Indian woman." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border sticky top-16 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 overflow-x-auto py-3 scrollbar-hide",
        role: "tablist",
        "aria-label": "Blog categories",
        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeCategory === cat,
            "data-ocid": `blog-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`,
            onClick: () => setActiveCategory(cat),
            className: `whitespace-nowrap px-4 py-2 rounded-full text-sm font-body font-medium transition-smooth shrink-0 ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
            children: cat
          },
          cat
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-6xl mx-auto px-4 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogSkeleton, {}, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 px-4", "data-ocid": "blog-empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-primary/60" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Coming soon — beauty tips and inspiration on the way!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-sm mx-auto mb-6", children: "We're crafting beautiful content just for you. Check back soon!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => setActiveCategory("All"),
          "data-ocid": "blog-browse-all",
          children: "Browse All Posts"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/blog/$id",
          params: { id: post.id.toString() },
          className: "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl",
          "data-ocid": `blog-link-${post.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post, index: i })
        },
        post.id.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-10", children: [
        "Showing ",
        filtered.length,
        " article",
        filtered.length !== 1 ? "s" : ""
      ] })
    ] }) })
  ] });
}
export {
  BlogPage as default
};
