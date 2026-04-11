import { u as useParams, a as useRouter, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link, b as ue } from "./index-DBS95maA.js";
import { P as ProductBadge } from "./Badge-CK9LYXQ5.js";
import { u as useCartStore, L as Layout, m as motion, a as ShoppingBag, A as AnimatePresence } from "./Layout-KMtFnDpV.js";
import { S as StarRating, P as ProductCard, C as ChevronLeft } from "./ProductCard-eov0rlDa.js";
import { c as createLucideIcon, u as useAuthStore, B as Button, X } from "./sheet-Bi-Q7ojW.js";
import { T as Textarea } from "./textarea-DDpqMVDs.js";
import { d as useProduct, e as useProductReviews, c as useProducts, f as useSubmitReview } from "./useProducts-V6WZMPVQ.js";
import { M as Minus } from "./minus-CPrrUPrk.js";
import { P as Plus } from "./plus-CbwJydTb.js";
import { A as Award } from "./award-8fiql1uM.js";
import { S as Shield } from "./shield-CC2Cd8vB.js";
import { T as Truck } from "./truck-CtEYmikJ.js";
import { S as Star } from "./star-D1fgcFiw.js";
import { C as ChevronRight } from "./chevron-right-CqtOTdwC.js";
import { C as ChevronDown } from "./chevron-down-CADuhAOd.js";
import { I as ImagePlus } from "./image-plus-CR2973xi.js";
import "./separator-DRO9oWly.js";
import "./index-B0a3ejYA.js";
import "./useMutation-C725G2l4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function Breadcrumb({ category, name }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: "flex items-center gap-1.5 text-sm text-muted-foreground font-body flex-wrap",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-foreground transition-colors", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/shop/$category",
            params: { category },
            className: "hover:text-foreground transition-colors capitalize",
            children: category
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-foreground font-medium truncate max-w-[200px]",
            "aria-current": "page",
            children: name
          }
        )
      ]
    }
  );
}
function ImageGallery({
  images,
  productName
}) {
  const [active, setActive] = reactExports.useState(0);
  const [direction, setDirection] = reactExports.useState(0);
  const goTo = reactExports.useCallback((idx, dir = 0) => {
    setDirection(dir);
    setActive(idx);
  }, []);
  const prev = reactExports.useCallback(() => {
    goTo(active > 0 ? active - 1 : images.length - 1, -1);
  }, [active, images.length, goTo]);
  const next = reactExports.useCallback(() => {
    goTo(active < images.length - 1 ? active + 1 : 0, 1);
  }, [active, images.length, goTo]);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative aspect-square bg-muted/20 rounded-2xl overflow-hidden border border-border",
        "data-ocid": "product-main-image",
        "aria-label": "Product image gallery",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: images[active] || "/assets/images/placeholder.svg",
              alt: `${productName} — view ${active + 1}`,
              className: "absolute inset-0 w-full h-full object-cover",
              custom: direction,
              initial: { opacity: 0, x: direction * 40 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -direction * 40 },
              transition: { duration: 0.25, ease: "easeInOut" }
            },
            active
          ) }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                className: "absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-sm",
                "aria-label": "Previous image",
                "data-ocid": "gallery-prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 text-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: next,
                className: "absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-sm",
                "aria-label": "Next image",
                "data-ocid": "gallery-next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 bg-foreground/60 text-background text-xs px-2 py-0.5 rounded-full font-body backdrop-blur-sm", children: [
            active + 1,
            " / ",
            images.length
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => goTo(i, i > active ? 1 : -1),
        className: `relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === active ? "border-primary shadow-sm scale-105" : "border-border hover:border-primary/40"}`,
        "aria-label": `View ${productName} — ${i + 1}`,
        "aria-pressed": i === active,
        "data-ocid": `gallery-thumb-${i}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: src || "/assets/images/placeholder.svg",
            alt: `${productName} thumbnail ${i + 1}`,
            className: "w-full h-full object-cover"
          }
        )
      },
      src
    )) })
  ] });
}
function AccordionItem({
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "flex items-center justify-between w-full py-4 text-left font-body font-semibold text-foreground hover:text-primary transition-colors",
        "aria-expanded": open,
        "data-ocid": `accordion-${title.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              animate: { rotate: open ? 180 : 0 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.2, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4 text-sm text-muted-foreground font-body leading-relaxed", children })
      }
    ) })
  ] });
}
const TRUST_ITEMS = [
  { icon: CircleCheckBig, label: "100% Original", sub: "Genuine products only" },
  { icon: Award, label: "GST Certified", sub: "33AFUFS3776C1ZM" },
  { icon: Shield, label: "Secure Checkout", sub: "Encrypted & safe" },
  { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" }
];
function RatingBreakdown({
  reviews,
  avgRating,
  total
}) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6 sm:items-center p-5 bg-muted/30 rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl font-bold text-foreground leading-none", children: avgRating.toFixed(1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StarRating,
        {
          rating: avgRating,
          size: "md",
          className: "mt-2 justify-center"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 font-body", children: [
        total,
        " review",
        total !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1.5", children: counts.map(({ star, count }) => {
      const pct = total > 0 ? Math.round(count / total * 100) : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 text-xs font-body",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 text-right text-muted-foreground", children: star }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-secondary fill-secondary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-secondary rounded-full",
                initial: { width: 0 },
                animate: { width: `${pct}%` },
                transition: { duration: 0.6, delay: (5 - star) * 0.08 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-right text-muted-foreground", children: count })
          ]
        },
        star
      );
    }) })
  ] });
}
function ReviewCard({ review }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.3 },
      className: "py-5 border-b border-border last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-primary", children: review.userName[0].toUpperCase() }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground", children: review.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating, size: "sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            review.verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary font-body flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
              "Verified"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: date })
          ] })
        ] }),
        review.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground mt-3", children: review.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1 leading-relaxed", children: review.body }),
        review.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3", children: review.images.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: "Customer review attachment",
            className: "h-16 w-16 rounded-lg object-cover border border-border"
          },
          src
        )) })
      ]
    }
  );
}
function WriteReviewForm({
  productId,
  onSuccess
}) {
  const { user } = useAuthStore();
  const { mutate, isPending } = useSubmitReview();
  const [rating, setRating] = reactExports.useState(0);
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [imagePreviews, setImagePreviews] = reactExports.useState([]);
  const fileInputRef = reactExports.useRef(null);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      3 - imagePreviews.length
    );
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 3));
  };
  const removeImage = (src) => {
    setImagePreviews((prev) => {
      URL.revokeObjectURL(src);
      return prev.filter((s) => s !== src);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a star rating");
      return;
    }
    if (!body.trim()) {
      ue.error("Please write your review");
      return;
    }
    if (!user) return;
    mutate(
      {
        productId,
        userId: user.id,
        userName: user.name,
        rating,
        title: title.trim(),
        body: body.trim(),
        images: imagePreviews,
        verified: false
      },
      {
        onSuccess: () => {
          ue.success("Review submitted! Thank you.");
          setRating(0);
          setTitle("");
          setBody("");
          setImagePreviews([]);
          onSuccess();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4 p-5 bg-card rounded-xl border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "Write a Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "star-rating-group",
              className: "text-sm font-body font-medium text-foreground mb-2 block",
              children: "Your Rating *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "star-rating-group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating,
              size: "lg",
              interactive: true,
              onChange: setRating,
              className: "gap-1"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "review-title",
              className: "text-sm font-body font-medium text-foreground mb-1 block",
              children: "Review Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "review-title",
              type: "text",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Summarize your experience",
              maxLength: 100,
              className: "w-full px-3 py-2 text-sm font-body border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "review-title-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "review-body",
              className: "text-sm font-body font-medium text-foreground mb-1 block",
              children: "Your Review *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-body",
              value: body,
              onChange: (e) => setBody(e.target.value),
              placeholder: "Tell us what you loved (or didn't) about this product…",
              rows: 4,
              maxLength: 1e3,
              className: "font-body text-sm resize-none",
              "data-ocid": "review-body-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right mt-1", children: [
            body.length,
            "/1000"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body font-medium text-foreground mb-2", children: "Add Photos (up to 3)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            imagePreviews.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative h-16 w-16 rounded-lg overflow-hidden border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src,
                      alt: "Your uploaded preview",
                      className: "w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeImage(src),
                      className: "absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-foreground/70 text-background flex items-center justify-center",
                      "aria-label": "Remove uploaded photo",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                    }
                  )
                ]
              },
              src
            )),
            imagePreviews.length < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: "h-16 w-16 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors text-muted-foreground hover:text-primary",
                "data-ocid": "review-image-upload",
                "aria-label": "Upload review image",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-5 w-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body", children: "Add" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: handleImageChange,
              "aria-label": "Upload review images"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "w-full",
            "data-ocid": "review-submit-btn",
            children: isPending ? "Submitting…" : "Submit Review"
          }
        )
      ]
    }
  );
}
function ProductDetailPage() {
  const params = useParams({ strict: false });
  const productId = params.id ?? "";
  const router = useRouter();
  const { data: product, isLoading } = useProduct(productId);
  const { data: reviews = [] } = useProductReviews((product == null ? void 0 : product.id) ?? "");
  const { data: allProducts = [] } = useProducts(product == null ? void 0 : product.category);
  const addItem = useCartStore((s) => s.addItem);
  const { isLoggedIn } = useAuthStore();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [selectedVariant, setSelectedVariant] = reactExports.useState();
  const [showReviewForm, setShowReviewForm] = reactExports.useState(false);
  const relatedProducts = allProducts.filter((p) => p.id !== (product == null ? void 0 : product.id)).slice(0, 4);
  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedVariant);
    ue.success(`${product.name} added to cart`, {
      description: `Qty: ${quantity}`,
      duration: 2500
    });
  };
  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, quantity, selectedVariant);
    router.navigate({ to: "/checkout" });
  };
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : (product == null ? void 0 : product.rating) ?? 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["t1", "t2", "t3", "t4", "t5", "t6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-lg" }, k)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full mt-6" })
      ] })
    ] }) }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground mb-4", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Browse All Products" }) })
    ] }) });
  }
  const discount = product.originalPrice ? Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  ) : 0;
  const stockStatus = !product.inStock ? {
    label: "Out of Stock",
    color: "text-destructive",
    dot: "bg-destructive"
  } : product.isLowStock ? {
    label: `Low Stock — Only ${product.stock} left`,
    color: "text-accent",
    dot: "bg-accent"
  } : { label: "In Stock", color: "text-primary", dot: "bg-primary" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-3 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { category: product.category, name: product.name }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageGallery,
              {
                images: product.images,
                productName: product.name
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "flex flex-col gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                product.isBestseller && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "bestseller" }),
                product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "new" }),
                product.isLowStock && product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "lowstock" }),
                discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "sale" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground capitalize bg-muted/50 px-2 py-0.5 rounded-full border border-border", children: product.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: product.shortDescription }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: avgRating, size: "md" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-body text-muted-foreground", children: [
                  avgRating.toFixed(1),
                  " (",
                  product.reviewCount + reviews.length,
                  " ",
                  "reviews)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("reviews-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "text-xs font-body text-primary underline-offset-2 hover:underline",
                    children: "Read reviews"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold text-secondary", children: [
                  "₹",
                  product.price.toLocaleString("en-IN")
                ] }),
                product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through font-body", children: [
                    "₹",
                    product.originalPrice.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-accent font-body bg-accent/10 px-2 py-0.5 rounded-md", children: [
                    discount,
                    "% off"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-sm font-body font-medium ${stockStatus.color} flex items-center gap-1.5`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-block h-2 w-2 rounded-full ${stockStatus.dot}`
                      }
                    ),
                    stockStatus.label
                  ]
                }
              ),
              product.variants && product.variants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body font-medium text-foreground mb-2", children: [
                  "Shade:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: selectedVariant ?? "Select" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.variants.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedVariant(v.value),
                    "aria-pressed": selectedVariant === v.value,
                    className: `px-3 py-1.5 text-sm font-body rounded-full border transition-all ${selectedVariant === v.value ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50"}`,
                    "data-ocid": `variant-${v.id}`,
                    children: v.value
                  },
                  v.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-foreground", children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                        disabled: quantity <= 1,
                        className: "h-9 w-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-40",
                        "aria-label": "Decrease quantity",
                        "data-ocid": "qty-decrease",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "h-9 w-12 flex items-center justify-center text-sm font-body font-semibold text-foreground border-x border-border",
                        "aria-label": `Quantity: ${quantity}`,
                        children: quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setQuantity((q) => q + 1),
                        disabled: !product.inStock,
                        className: "h-9 w-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-40",
                        "aria-label": "Increase quantity",
                        "data-ocid": "qty-increase",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleAddToCart,
                      disabled: !product.inStock,
                      className: "flex-1 gap-2 h-11 font-body font-semibold",
                      "data-ocid": "pdp-add-to-cart",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
                        "Add to Cart"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      onClick: handleBuyNow,
                      disabled: !product.inStock,
                      className: "flex-1 gap-2 h-11 font-body font-semibold border-secondary text-secondary hover:bg-secondary/10",
                      "data-ocid": "pdp-buy-now",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                        "Buy Now"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1", children: TRUST_ITEMS.map(({ icon: Icon, label, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center text-center p-2.5 rounded-xl bg-muted/30 border border-border/60 gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-semibold text-foreground leading-tight", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body text-muted-foreground leading-tight", children: sub })
                  ]
                },
                label
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "mt-12 bg-card rounded-2xl border border-border p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { title: "Description", defaultOpen: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line", children: product.description }),
              product.howToUse && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1 font-body", children: "How to Use" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: product.howToUse })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { title: "Benefits", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: product.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: tag.replace(/-/g, " ") })
            ] }, tag)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { title: "Ingredients", children: product.ingredients ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: product.ingredients }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "italic", children: "Full ingredient list available soon. All Solura products are dermatologist tested and free from harmful chemicals." }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          id: "reviews-section",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "mt-14",
          "data-ocid": "reviews-section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "Customer Reviews" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RatingBreakdown,
              {
                reviews,
                avgRating,
                total: product.reviewCount + reviews.length
              }
            ),
            reviews.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 bg-card rounded-2xl border border-border p-6", children: reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review }, review.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 py-10 text-center bg-card rounded-2xl border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "No reviews yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: "Be the first to review this product!" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: isLoggedIn ? showReviewForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              WriteReviewForm,
              {
                productId: product.id,
                onSuccess: () => setShowReviewForm(false)
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setShowReviewForm(true),
                className: "gap-2",
                "data-ocid": "write-review-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }),
                  "Write a Review"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-muted/30 rounded-xl border border-border text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground mb-3", children: "Please log in to leave a review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "login-to-review-btn",
                  children: "Login / Register"
                }
              ) })
            ] }) })
          ]
        }
      ),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "mt-16 pb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "You May Also Like" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/shop/$category",
                  params: { category: product.category },
                  className: "text-sm font-body text-primary hover:underline underline-offset-2",
                  children: "View all →"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.3, delay: i * 0.08 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, showSlider: true })
              },
              p.id
            )) })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  ProductDetailPage as default
};
