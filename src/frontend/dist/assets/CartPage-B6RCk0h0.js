import { j as jsxRuntimeExports, L as Link } from "./index-BYwbnXHo.js";
import { u as useCartStore, L as Layout, a as ShoppingBag } from "./Layout-DTgLeLmj.js";
import { B as Button } from "./authStore-bVvk2SIb.js";
import { S as Separator } from "./separator-EpQ6h15r.js";
import { A as ArrowRight } from "./arrow-right-BX47Rrsb.js";
import { M as Minus } from "./minus-CVd-kGaH.js";
import { P as Plus } from "./plus-UUG32RCm.js";
import { T as Trash2 } from "./trash-2-CkqsbYgS.js";
import "./index-CB7yveq3.js";
const GST_RATE = 0.18;
function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const subtotal = getTotal();
  const gst = Math.round(subtotal * GST_RATE);
  const shipping = subtotal >= 999 ? 0 : 60;
  const total = subtotal + gst + shipping;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-24 text-center",
        "data-ocid": "cart-empty",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Your bag is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Looks like you haven't added anything yet. Explore our curated collection of natural beauty products." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2", "data-ocid": "cart-empty-shop", children: [
            "Shop Now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Your Bag" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
        items.length,
        " item",
        items.length !== 1 ? "s" : "",
        " in your cart"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-4 bg-card rounded-2xl border border-border p-4 shadow-soft hover:shadow-elevated transition-smooth",
          "data-ocid": `cart-item-${item.productId}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products/$id",
                params: { id: item.productId },
                className: "flex-shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.product.images[0],
                    alt: item.product.name,
                    className: "h-24 w-24 object-cover rounded-xl bg-muted/30"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: item.productId }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate hover:text-primary transition-colors", children: item.product.name }) }),
              item.variantName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 capitalize", children: item.variantName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 capitalize", children: item.product.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-xl overflow-hidden bg-background", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(
                        item.productId,
                        item.quantity - 1,
                        item.variantId
                      ),
                      className: "px-3 py-2 text-foreground hover:bg-muted/60 transition-smooth",
                      "aria-label": "Decrease quantity",
                      "data-ocid": `cart-decrement-${item.productId}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 text-sm font-semibold border-x border-border min-w-[2.5rem] text-center tabular-nums", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(
                        item.productId,
                        item.quantity + 1,
                        item.variantId
                      ),
                      className: "px-3 py-2 text-foreground hover:bg-muted/60 transition-smooth",
                      "aria-label": "Increase quantity",
                      "data-ocid": `cart-increment-${item.productId}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(item.productId, item.variantId),
                    className: "text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10",
                    "aria-label": "Remove item",
                    "data-ocid": `cart-remove-${item.productId}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex flex-col justify-between pl-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-lg", children: [
                "₹",
                (item.product.price * item.quantity).toLocaleString(
                  "en-IN"
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "₹",
                item.product.price.toLocaleString("en-IN"),
                " each"
              ] })
            ] })
          ]
        },
        `${item.productId}-${item.variantId ?? ""}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border p-6 shadow-soft space-y-4",
            "data-ocid": "cart-summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Order Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Subtotal (",
                    items.reduce((s, i) => s + i.quantity, 0),
                    " ",
                    "items)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                    "₹",
                    subtotal.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                    "₹",
                    gst.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: shipping === 0 ? "text-primary font-medium" : "font-medium",
                      children: shipping === 0 ? "Free" : `₹${shipping}`
                    }
                  )
                ] })
              ] }),
              subtotal < 999 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 rounded-xl p-3 text-xs text-primary font-medium", children: [
                "🎁 Add ₹",
                (999 - subtotal).toLocaleString("en-IN"),
                " more for free shipping!"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
                  "₹",
                  total.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Inclusive of all taxes. Final total at checkout." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full gap-2",
                  size: "lg",
                  "data-ocid": "cart-checkout",
                  children: [
                    "Proceed to Checkout ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Continue Shopping" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border p-4 space-y-2", children: [
          { icon: "🔒", text: "Secure checkout" },
          { icon: "🚚", text: "Free shipping above ₹999" },
          { icon: "↩️", text: "Easy 7-day returns" }
        ].map(({ icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
            ]
          },
          text
        )) })
      ] })
    ] })
  ] }) }) });
}
export {
  CartPage as default
};
