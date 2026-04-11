import { j as jsxRuntimeExports } from "./index-DBS95maA.js";
import { L as Layout } from "./Layout-KMtFnDpV.js";
import { S as Separator } from "./separator-DRO9oWly.js";
import { T as Truck } from "./truck-CtEYmikJ.js";
import { P as Package } from "./package-Bdck2MzZ.js";
import { R as RefreshCw } from "./refresh-cw-CLTtcK0V.js";
import { C as CircleCheck } from "./circle-check-Dl5lTX0k.js";
import { C as CircleAlert } from "./circle-alert-BMGh4O3v.js";
import "./sheet-Bi-Q7ojW.js";
import "./index-B0a3ejYA.js";
function ShippingReturnsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 border-b border-border py-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-3", children: "Shipping & Returns" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Free shipping, fast delivery, and hassle-free returns — because your satisfaction matters to us." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [
        {
          icon: Truck,
          title: "Free Shipping",
          desc: "On all prepaid orders across India"
        },
        {
          icon: Package,
          title: "5–7 Days Delivery",
          desc: "Standard delivery to most locations"
        },
        {
          icon: RefreshCw,
          title: "7-Day Returns",
          desc: "Easy returns on unopened products"
        }
      ].map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border p-5 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
          ]
        },
        title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-6 w-6 text-primary" }),
          "Shipping Policy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Delivery Timelines" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Shipping Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Delivery Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Charges" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
            {
              type: "Prepaid (Online / UPI)",
              time: "5–7 business days",
              charge: "FREE"
            },
            {
              type: "Cash on Delivery (COD)",
              time: "5–7 business days",
              charge: "₹40 handling fee"
            },
            {
              type: "Express (select pincodes)",
              time: "3–4 business days",
              charge: "₹99"
            }
          ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: row.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.time }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-foreground", children: row.charge })
              ]
            },
            row.type
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
          "Orders are processed within 1–2 business days after payment confirmation.",
          "Delivery to Tier 1 & 2 cities is generally faster (3–5 days).",
          "Remote areas (J&K, Northeast India) may take up to 10 business days.",
          "You will receive a shipment tracking link via email once dispatched.",
          "Business days are Monday–Saturday, excluding public holidays."
        ].map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: point })
        ] }, point)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 text-primary" }),
          "Returns & Refunds Policy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Eligibility for Returns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We accept returns within 7 days of delivery under the following conditions:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
          "Product is unused and in its original, sealed packaging.",
          "Product was received damaged, defective, or incorrect.",
          "Return request is raised within 7 days of delivery date."
        ].map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: point })
        ] }, point)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 border border-destructive/20 rounded-xl p-4 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-destructive flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Non-Returnable Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Opened or partially used products, items returned after 7 days, and products without original packaging are not eligible for return (except in cases of manufacturing defects)." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "How to Initiate a Return" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            step: "1",
            text: 'Email contact@soluracosmo.com with subject "Return Request — [Order ID]".'
          },
          {
            step: "2",
            text: "Attach photos of the product and packaging, and describe the reason for return."
          },
          {
            step: "3",
            text: "Our team will review and approve the return within 1–2 business days."
          },
          {
            step: "4",
            text: "We will arrange a reverse pickup. Please keep the product ready in its original packaging."
          },
          {
            step: "5",
            text: "Refund is processed within 5–10 business days after we receive and inspect the product."
          }
        ].map(({ step, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0", children: step }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: text })
        ] }, step)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Refund Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Payment Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Refund Timeline" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
            {
              method: "Credit / Debit Card",
              timeline: "5–7 business days"
            },
            {
              method: "UPI / Net Banking",
              timeline: "3–5 business days"
            },
            {
              method: "Cash on Delivery",
              timeline: "7–10 business days (bank transfer)"
            }
          ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: row.method }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: row.timeline })
              ]
            },
            row.method
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 rounded-2xl border border-primary/20 p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Need help with a return or shipment?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
          "Email us at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "mailto:contact@soluracosmo.com",
              className: "text-primary hover:underline",
              children: "contact@soluracosmo.com"
            }
          ),
          " ",
          "with your Order ID and we'll resolve it promptly."
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ShippingReturnsPage as default
};
