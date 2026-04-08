import { u as useParams, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-BYwbnXHo.js";
import { L as Layout, M as MapPin } from "./Layout-DTgLeLmj.js";
import { c as createLucideIcon, B as Button } from "./authStore-bVvk2SIb.js";
import { S as Separator } from "./separator-EpQ6h15r.js";
import { a as useOrder } from "./useOrders-Cf1TPwy3.js";
import { P as Package } from "./package-DSIGmOwv.js";
import { C as CircleCheck } from "./circle-check-B34ud4Es.js";
import { A as ArrowRight } from "./arrow-right-BX47Rrsb.js";
import "./index-CB7yveq3.js";
import "./backend-C0WYxHKI.js";
import "./useMutation-ybpFZUfc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const COMPANY = {
  name: "Solura Cosmetics",
  address: "184, South Manthai Street, Pallapatti, Karur, Tamil Nadu 639205",
  gst: "33AFUFS3776C1ZM",
  email: "contact@soluracosmo.com",
  tagline: "Reveal Your Natural Glow"
};
const GST_RATE = 0.18;
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function OrderSuccessPage() {
  const { orderId } = useParams({ strict: false });
  const { data: order, isLoading } = useOrder(orderId);
  const handlePrint = () => {
    window.print();
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl" })
    ] }) });
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Order not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "We couldn't find your order. Please check your order history." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "View Order History" }) })
    ] }) });
  }
  const gst = Math.round(order.subtotal * GST_RATE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          body * { visibility: hidden; }
          #invoice-section, #invoice-section * { visibility: visible; }
          #invoice-section { position: fixed; top: 0; left: 0; width: 100%; padding: 2rem; }
          .no-print { display: none !important; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "no-print bg-card rounded-2xl border border-border p-8 text-center mb-6 shadow-soft",
          "data-ocid": "order-success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Order Placed Successfully!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto leading-relaxed", children: "Thank you for shopping with Solura Cosmetics. Your order has been confirmed and will be dispatched soon." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 bg-muted/60 rounded-full px-4 py-2 text-sm font-mono font-semibold text-foreground", children: [
              "Order ID: ",
              order.id
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: "invoice-section",
          className: "bg-card rounded-2xl border border-border shadow-soft overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-rose p-6 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: COMPANY.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mt-0.5", children: COMPANY.tagline })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold", children: "INVOICE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/80 text-sm", children: [
                  "#",
                  order.id
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold", children: "From" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: COMPANY.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: COMPANY.address }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    "GST: ",
                    COMPANY.gst
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Email:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: `mailto:${COMPANY.email}`,
                        className: "text-primary hover:underline",
                        children: COMPANY.email
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold", children: "Bill To" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: order.shippingAddress.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: order.shippingAddress.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: order.shippingAddress.phone }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                      order.shippingAddress.address,
                      ",",
                      " ",
                      order.shippingAddress.city,
                      ",",
                      " ",
                      order.shippingAddress.state,
                      " –",
                      " ",
                      order.shippingAddress.pincode
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/40 rounded-xl p-4", children: [
                { label: "Order Date", value: formatDate(order.createdAt) },
                {
                  label: "Payment",
                  value: order.paymentMethod === "razorpay" ? "Online" : "Cash on Delivery"
                },
                {
                  label: "Status",
                  value: order.paymentStatus === "paid" ? "Paid" : "Pending"
                },
                { label: "Order Status", value: order.status }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground capitalize mt-0.5", children: value })
              ] }, label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold", children: "Items Ordered" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold text-foreground", children: "Product" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-3 font-semibold text-foreground", children: "Qty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-semibold text-foreground", children: "Unit Price" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-semibold text-foreground", children: "Total" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-t border-border",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: item.productImage,
                              alt: item.productName,
                              className: "h-10 w-10 rounded-lg object-cover bg-muted/30 flex-shrink-0 no-print"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: item.productName }),
                            item.variantName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.variantName })
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center text-muted-foreground", children: item.quantity }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right text-muted-foreground", children: [
                          "₹",
                          item.price.toLocaleString("en-IN")
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right font-semibold text-foreground", children: [
                          "₹",
                          (item.price * item.quantity).toLocaleString(
                            "en-IN"
                          )
                        ] })
                      ]
                    },
                    `${item.productId}-${i}`
                  )) })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-72 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "₹",
                    order.subtotal.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18% incl.)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "₹",
                    gst.toLocaleString("en-IN")
                  ] })
                ] }),
                order.codCharge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "COD Charge" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "₹",
                    order.codCharge.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl", children: [
                    "₹",
                    order.total.toLocaleString("en-IN")
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Thank you for shopping with ",
                  COMPANY.name,
                  "!"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5", children: [
                  "For support, email",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `mailto:${COMPANY.email}`,
                      className: "text-primary hover:underline",
                      children: COMPANY.email
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5", children: [
                  "GST No: ",
                  COMPANY.gst,
                  " | This is a computer-generated invoice."
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "no-print flex flex-col sm:flex-row gap-3 mt-6",
          "data-ocid": "order-success-actions",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 gap-2",
                onClick: handlePrint,
                "data-ocid": "download-invoice",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                  "Download Invoice"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full gap-2",
                "data-ocid": "success-view-orders",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
                  "Track Order"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-2",
                "data-ocid": "success-continue-shopping",
                children: [
                  "Continue Shopping",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                ]
              }
            ) })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  OrderSuccessPage as default
};
