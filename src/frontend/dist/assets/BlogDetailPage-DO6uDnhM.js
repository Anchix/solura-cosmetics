import { u as useParams, d as useNavigate, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-BrjEsxOs.js";
import { L as Layout, m as motion, U as User } from "./Layout-de5RFWf_.js";
import { B as Button } from "./authStore-DllIseEP.js";
import { e as useGetBlogPost, d as useListBlogPosts } from "./useBlog-Bpp1qD07.js";
import { B as BookOpen } from "./book-open-fX09zw6d.js";
import { A as ArrowLeft } from "./arrow-left-CmYK3MNM.js";
import { T as Tag } from "./tag-VRaMPiU5.js";
import { C as Calendar } from "./calendar-DCwSBDsj.js";
import "./separator-rMUPFFHz.js";
import "./index-CwkAE0ts.js";
import "./useMutation-C6TNdxjV.js";
function formatDate(ns) {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
const CATEGORY_COLORS = {
  "Skincare Tips": "bg-primary/10 text-primary border-primary/20",
  "Beauty Trends": "bg-secondary/30 text-foreground border-secondary/40",
  "Product News": "bg-accent/10 text-accent border-accent/20",
  Haircare: "bg-muted text-muted-foreground border-border"
};
function RelatedPostCard({ post }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/blog/$id",
      params: { id: post.id.toString() },
      className: "group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-soft transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "data-ocid": `related-post-${post.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden bg-muted/40", children: post.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.coverImage,
            alt: post.title,
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-muted-foreground/30" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"}`,
              children: post.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mt-2 line-clamp-2 group-hover:text-primary transition-colors", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(post.createdAt) })
        ] })
      ]
    }
  );
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/1] w-full rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" })
    ] })
  ] }) });
}
function BlogDetailPage() {
  const { id } = useParams({ strict: false });
  const postId = id ? BigInt(id) : 0n;
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetBlogPost(postId);
  const { data: allPosts } = useListBlogPosts();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 py-24 text-center",
        "data-ocid": "blog-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Article not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-6", children: "This article may have been removed or the link is incorrect." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/blog" }),
              "data-ocid": "back-to-blog",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
                " Back to Blog"
              ]
            }
          )
        ]
      }
    ) });
  }
  const related = (allPosts ?? []).filter((p) => p.id !== post.id).sort((a, b) => {
    const aSame = a.category === post.category ? -1 : 0;
    const bSame = b.category === post.category ? -1 : 0;
    return aSame - bSame;
  }).slice(0, 3);
  const colorClass = CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/blog",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-body group",
        "data-ocid": "back-to-blog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 group-hover:-translate-x-1 transition-transform" }),
          "Back to Blog"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "max-w-3xl mx-auto px-4 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.header,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${colorClass}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
                  post.category
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg mb-5 leading-relaxed", children: post.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                post.author
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                formatDate(post.createdAt)
              ] })
            ] })
          ]
        }
      ),
      post.coverImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-elevated",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.coverImage,
              alt: post.title,
              className: "w-full h-full object-cover"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "prose prose-neutral max-w-none font-body text-foreground\n            prose-headings:font-display prose-headings:text-foreground\n            prose-p:text-muted-foreground prose-p:leading-relaxed\n            prose-a:text-primary prose-a:no-underline hover:prose-a:underline\n            prose-strong:text-foreground prose-li:text-muted-foreground\n            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
          dangerouslySetInnerHTML: {
            __html: post.content || `<p>${post.excerpt}</p><p>Full article coming soon. Stay tuned for more beauty tips and inspiration from Solura Cosmetics.</p>`
          },
          "data-ocid": "blog-content"
        }
      )
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-t border-border py-12 px-4",
        "data-ocid": "related-posts",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "You Might Also Like" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: related.map((relPost) => /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedPostCard, { post: relPost }, relPost.id.toString())) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-t border-border py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Loved this article?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Explore more beauty tips and discover our products." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => navigate({ to: "/blog" }),
            "data-ocid": "more-articles-cta",
            children: "More Articles"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => navigate({ to: "/shop" }),
            "data-ocid": "shop-now-cta",
            children: "Shop Now"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  BlogDetailPage as default
};
