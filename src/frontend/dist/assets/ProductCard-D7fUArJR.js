import { j as jsxRuntimeExports, c as cn, r as reactExports, L as Link, b as ue } from "./index-BrjEsxOs.js";
import { c as createLucideIcon, B as Button } from "./authStore-DllIseEP.js";
import { u as useCartStore, H as Heart, a as ShoppingBag } from "./Layout-de5RFWf_.js";
import { P as ProductBadge } from "./Badge-CBfUvLbY.js";
import { S as Star } from "./star-CYYhAL5I.js";
import { C as ChevronRight } from "./chevron-right-DT3fecrv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const SIZE_MAP = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5"
};
function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className
}) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  const iconClass = SIZE_MAP[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex items-center gap-0.5", className),
      role: interactive ? "radiogroup" : "img",
      "aria-label": `Rating: ${rating} out of ${maxRating} stars`,
      children: stars.map((star) => {
        const filled = star <= Math.floor(rating);
        const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;
        const fillPercent = partial ? Math.round(rating % 1 * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: !interactive,
            onClick: () => interactive && (onChange == null ? void 0 : onChange(star)),
            className: cn(
              "relative flex-shrink-0",
              interactive ? "cursor-pointer hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" : "cursor-default"
            ),
            "aria-label": interactive ? `Rate ${star} stars` : void 0,
            role: interactive ? "radio" : void 0,
            "aria-checked": interactive ? star === Math.round(rating) : void 0,
            children: partial ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: cn(iconClass, "text-muted-foreground/30"),
                  fill: "currentColor"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute inset-0 overflow-hidden",
                  style: { width: `${fillPercent}%` },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: cn(iconClass, "text-secondary"),
                      fill: "currentColor"
                    }
                  )
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: cn(
                  iconClass,
                  filled ? "text-secondary" : "text-muted-foreground/30",
                  interactive && !filled && "hover:text-secondary/60"
                ),
                fill: "currentColor"
              }
            )
          },
          star
        );
      })
    }
  );
}
function ProductCard({
  product,
  className,
  showSlider = false
}) {
  const [currentImage, setCurrentImage] = reactExports.useState(0);
  const [isWishlisted, setIsWishlisted] = reactExports.useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    ue.success(`${product.name} added to cart`, { duration: 2e3 });
  };
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((v) => !v);
    ue.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      { duration: 1500 }
    );
  };
  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((i) => i > 0 ? i - 1 : product.images.length - 1);
  };
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((i) => i < product.images.length - 1 ? i + 1 : 0);
  };
  const discount = product.originalPrice ? Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/products/$id",
      params: { id: product.slug },
      className: cn("group block", className),
      "data-ocid": `product-card-${product.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-smooth hover:shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] bg-muted/30 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.images[currentImage] || "/assets/images/placeholder.svg",
              alt: product.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-1", children: [
            product.isBestseller && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "bestseller" }),
            product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "new" }),
            product.isLowStock && !product.isBestseller && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "lowstock" }),
            discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full", children: [
              "-",
              discount,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleWishlist,
              className: "absolute top-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-card",
              "aria-label": "Add to wishlist",
              "data-ocid": `wishlist-${product.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: cn(
                    "h-4 w-4 transition-colors",
                    isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"
                  )
                }
              )
            }
          ),
          showSlider && product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prevImage,
                className: "absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
                "aria-label": "Previous image",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: nextImage,
                className: "absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
                "aria-label": "Next image",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-0 right-0 flex justify-center gap-1", children: product.images.map((imgSrc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImage(i);
                },
                className: cn(
                  "w-1.5 h-1.5 rounded-full transition-smooth",
                  i === currentImage ? "bg-primary w-3" : "bg-card/60"
                ),
                "aria-label": `Image ${i + 1}`
              },
              imgSrc
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-2 font-body", children: product.shortDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: product.rating, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              product.reviewCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold text-foreground", children: [
                "₹",
                product.price.toLocaleString("en-IN")
              ] }),
              product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
                "₹",
                product.originalPrice.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleAddToCart,
                disabled: !product.inStock,
                className: "gap-1.5 text-xs",
                "data-ocid": `add-to-cart-${product.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
                  product.inStock ? "Add" : "Sold out"
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  ChevronLeft as C,
  ProductCard as P,
  StarRating as S
};
