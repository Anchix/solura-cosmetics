import { j as jsxRuntimeExports, r as reactExports } from "./index-BYwbnXHo.js";
import { L as Layout } from "./Layout-DTgLeLmj.js";
import { C as ChevronDown } from "./chevron-down-CJC3SpnN.js";
import "./authStore-bVvk2SIb.js";
import "./separator-EpQ6h15r.js";
import "./index-CB7yveq3.js";
const FAQ_SECTIONS = [
  {
    title: "Ordering & Payments",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our shop, add products to your cart, and proceed to checkout. Enter your delivery address and choose between Online Payment (Razorpay) or Cash on Delivery. That's it — your order is confirmed!"
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major debit and credit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and digital wallets via Razorpay. We also offer Cash on Delivery (COD) with a ₹40 handling charge."
      },
      {
        q: "Is online payment safe on your website?",
        a: "Absolutely. All payments are processed securely through Razorpay, which is PCI DSS Level 1 certified. We never store your card details."
      },
      {
        q: "Can I apply a discount or promo code?",
        a: "Yes! If you have a valid promo code, enter it at checkout in the discount field. Follow us on Instagram @solura_cosmo to stay updated on the latest offers."
      },
      {
        q: "Will I receive an invoice for my order?",
        a: "Yes. A GST invoice is automatically generated and available to download from your order history page after payment."
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 5–7 business days for most locations in India. Express delivery (3–4 days) is available for select pin codes. You will receive tracking updates via email."
      },
      {
        q: "Do you ship across India?",
        a: "Yes! We deliver to all serviceable pin codes across India, from Kanyakumari to Kashmir. Enter your pincode at checkout to confirm availability."
      },
      {
        q: "What are the shipping charges?",
        a: "Free shipping on all prepaid orders. A ₹40 handling charge applies for Cash on Delivery orders. Orders above ₹999 also qualify for free shipping regardless of payment method."
      },
      {
        q: "Can I track my order?",
        a: 'Yes. Once your order ships, you will receive a tracking link via email. You can also view the status in your account under "My Orders".'
      }
    ]
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return window from the date of delivery for unopened, unused products in their original packaging. Opened or used products are not eligible for return except in cases of manufacturing defects."
      },
      {
        q: "How do I initiate a return?",
        a: "Email us at contact@soluracosmo.com with your order ID and reason for return. Our team will arrange a pickup and process your refund within 7–10 business days after receiving the returned product."
      },
      {
        q: "When will I get my refund?",
        a: "Refunds for online payments are processed within 5–7 business days to the original payment method. COD refunds are credited to your bank account within 7–10 business days."
      },
      {
        q: "What if I receive a damaged or wrong product?",
        a: "We sincerely apologise! Please email us at contact@soluracosmo.com with photos of the damaged/wrong product within 48 hours of delivery. We will send a replacement at no extra cost."
      }
    ]
  },
  {
    title: "Products & Skincare",
    items: [
      {
        q: "Are Solura products suitable for sensitive skin?",
        a: "Most of our formulations are gentle enough for sensitive skin, but we recommend a patch test before first use. Check individual product pages for specific skin-type recommendations."
      },
      {
        q: "Are your products cruelty-free and vegan?",
        a: "All Solura products are 100% cruelty-free. Most of our range is also vegan — check the individual product listing for vegan certification."
      },
      {
        q: "Do your products contain parabens or sulphates?",
        a: "No. We formulate without parabens, sulphates, phthalates, or artificial dyes. We believe clean beauty is non-negotiable."
      },
      {
        q: "Can I use your skincare products during pregnancy?",
        a: "We recommend consulting your gynaecologist before starting any new skincare regimen during pregnancy. While our formulas are gentle, it's always best to check with your doctor."
      },
      {
        q: "Where are your products manufactured?",
        a: "All Solura products are proudly made in India, in ISO-certified manufacturing facilities that comply with CDSCO cosmetics regulations."
      }
    ]
  },
  {
    title: "Account & Orders",
    items: [
      {
        q: "Do I need an account to shop?",
        a: "You can browse and add items to cart without an account, but you will need to register or log in at checkout to complete your order."
      },
      {
        q: "How do I view my order history?",
        a: 'Log in to your account and navigate to "My Orders" from the account menu or footer. All past orders with their statuses will be listed there.'
      },
      {
        q: "Can I cancel an order?",
        a: "Orders can be cancelled within 1 hour of placement if not yet dispatched. Email us immediately at contact@soluracosmo.com with your order ID."
      }
    ]
  }
];
function FAQAccordion({ item }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((p) => !p),
        className: "w-full flex items-center justify-between py-4 px-5 text-left hover:bg-muted/20 transition-colors",
        "data-ocid": `faq-q-${item.q.substring(0, 20).replace(/\s+/g, "-").toLowerCase()}`,
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground pr-4", children: item.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.a }) })
  ] });
}
function FAQsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 border-b border-border py-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-3", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Everything you need to know about Solura Cosmetics — orders, delivery, returns, and our products." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl space-y-8", children: [
      FAQ_SECTIONS.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-4", children: section.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: section.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(FAQAccordion, { item }, item.q)) })
      ] }, section.title)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 rounded-2xl border border-primary/20 p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Didn't find your answer?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4 text-sm", children: "Our support team is happy to help with any question not covered above." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:contact@soluracosmo.com",
            className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-smooth",
            "data-ocid": "faqs-contact-cta",
            children: "Email contact@soluracosmo.com"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  FAQsPage as default
};
