import { j as jsxRuntimeExports, L as Link } from "./index-BrjEsxOs.js";
import { L as Layout, S as Search, c as MessageCircle, b as Mail } from "./Layout-de5RFWf_.js";
import { S as Separator } from "./separator-rMUPFFHz.js";
import { c as createLucideIcon } from "./authStore-DllIseEP.js";
import { P as Package } from "./package-B6LtfKzX.js";
import { R as RefreshCw } from "./refresh-cw-BcnbVu2a.js";
import { T as Truck } from "./truck-CWbvVWkZ.js";
import { B as BookOpen } from "./book-open-fX09zw6d.js";
import { C as ChevronRight } from "./chevron-right-DT3fecrv.js";
import "./index-CwkAE0ts.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode);
const QUICK_LINKS = [
  {
    icon: Package,
    title: "Track My Order",
    desc: "Check the status of your order",
    href: "/account/orders"
  },
  {
    icon: RefreshCw,
    title: "Returns & Refunds",
    desc: "Easy 7-day return policy",
    href: "/shipping-returns"
  },
  {
    icon: Truck,
    title: "Shipping Info",
    desc: "Delivery timelines and charges",
    href: "/shipping-returns"
  },
  {
    icon: BookOpen,
    title: "FAQs",
    desc: "Quick answers to common questions",
    href: "/faqs"
  }
];
const TOPICS = [
  { label: "Placing an Order", href: "/faqs" },
  { label: "Payment Options", href: "/faqs" },
  { label: "Changing / Cancelling an Order", href: "/faqs" },
  { label: "Delivery Timelines", href: "/shipping-returns" },
  { label: "Returns & Refunds", href: "/shipping-returns" },
  { label: "Product Ingredients", href: "/faqs" },
  { label: "Skin Type Guidance", href: "/faqs" },
  { label: "Contact Support", href: "/contact" }
];
function HelpPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 border-b border-border py-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto text-center max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-3", children: "How can we help you?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Find answers, track orders, and get in touch with our team." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 relative max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            placeholder: "Search for help topics...",
            className: "w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "help-search"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-6", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: QUICK_LINKS.map(({ icon: Icon, title, desc, href }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: href,
            className: "bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-soft transition-smooth flex flex-col gap-3 group",
            "data-ocid": `help-quick-${title.toLowerCase().replace(/\s+/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm group-hover:text-primary transition-colors", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
              ] })
            ]
          },
          title
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-6", children: "Browse by Topic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: TOPICS.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: topic.href,
              className: "flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors group",
              "data-ocid": `help-topic-${i}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-colors", children: topic.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" })
              ]
            }
          ),
          i < TOPICS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mx-5 w-auto" })
        ] }, topic.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-primary/5 rounded-2xl border border-primary/20 p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Still need help?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-5", children: "Our customer care team is here for you, Monday–Saturday, 10am–6pm IST." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "mailto:contact@soluracosmo.com",
              className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-smooth",
              "data-ocid": "help-email-cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
                "Email Us"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-foreground font-medium text-sm hover:border-primary/40 transition-smooth",
              "data-ocid": "help-contact-cta",
              children: "Contact Form"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  HelpPage as default
};
