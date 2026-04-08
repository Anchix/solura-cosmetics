import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  Package,
  RefreshCw,
  Truck,
} from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Shipping & Returns
          </h1>
          <p className="text-muted-foreground text-lg">
            Free shipping, fast delivery, and hassle-free returns — because your
            satisfaction matters to us.
          </p>
        </div>
      </div>

      <div className="bg-background py-12 px-4">
        <div className="container mx-auto max-w-3xl space-y-10">
          {/* Shipping highlights */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "On all prepaid orders across India",
              },
              {
                icon: Package,
                title: "5–7 Days Delivery",
                desc: "Standard delivery to most locations",
              },
              {
                icon: RefreshCw,
                title: "7-Day Returns",
                desc: "Easy returns on unopened products",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card rounded-xl border border-border p-5 text-center"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-semibold text-foreground text-sm">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Shipping Policy */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              Shipping Policy
            </h2>

            <h3 className="font-semibold text-foreground">
              Delivery Timelines
            </h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Shipping Type
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Delivery Time
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Charges
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      type: "Prepaid (Online / UPI)",
                      time: "5–7 business days",
                      charge: "FREE",
                    },
                    {
                      type: "Cash on Delivery (COD)",
                      time: "5–7 business days",
                      charge: "₹40 handling fee",
                    },
                    {
                      type: "Express (select pincodes)",
                      time: "3–4 business days",
                      charge: "₹99",
                    },
                  ].map((row) => (
                    <tr
                      key={row.type}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3 text-foreground">{row.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.time}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">
                        {row.charge}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2">
              {[
                "Orders are processed within 1–2 business days after payment confirmation.",
                "Delivery to Tier 1 & 2 cities is generally faster (3–5 days).",
                "Remote areas (J&K, Northeast India) may take up to 10 business days.",
                "You will receive a shipment tracking link via email once dispatched.",
                "Business days are Monday–Saturday, excluding public holidays.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Returns Policy */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              Returns & Refunds Policy
            </h2>

            <h3 className="font-semibold text-foreground">
              Eligibility for Returns
            </h3>
            <p className="text-sm text-muted-foreground">
              We accept returns within 7 days of delivery under the following
              conditions:
            </p>
            <div className="space-y-2">
              {[
                "Product is unused and in its original, sealed packaging.",
                "Product was received damaged, defective, or incorrect.",
                "Return request is raised within 7 days of delivery date.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Non-Returnable Items
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Opened or partially used products, items returned after 7
                  days, and products without original packaging are not eligible
                  for return (except in cases of manufacturing defects).
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-foreground">
              How to Initiate a Return
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  text: 'Email contact@soluracosmo.com with subject "Return Request — [Order ID]".',
                },
                {
                  step: "2",
                  text: "Attach photos of the product and packaging, and describe the reason for return.",
                },
                {
                  step: "3",
                  text: "Our team will review and approve the return within 1–2 business days.",
                },
                {
                  step: "4",
                  text: "We will arrange a reverse pickup. Please keep the product ready in its original packaging.",
                },
                {
                  step: "5",
                  text: "Refund is processed within 5–10 business days after we receive and inspect the product.",
                },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                    {step}
                  </div>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-foreground">Refund Timeline</h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Payment Method
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Refund Timeline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      method: "Credit / Debit Card",
                      timeline: "5–7 business days",
                    },
                    {
                      method: "UPI / Net Banking",
                      timeline: "3–5 business days",
                    },
                    {
                      method: "Cash on Delivery",
                      timeline: "7–10 business days (bank transfer)",
                    },
                  ].map((row) => (
                    <tr
                      key={row.method}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3 text-foreground">
                        {row.method}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {row.timeline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Separator />

          {/* Contact */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 text-center">
            <p className="font-semibold text-foreground mb-1">
              Need help with a return or shipment?
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Email us at{" "}
              <a
                href="mailto:contact@soluracosmo.com"
                className="text-primary hover:underline"
              >
                contact@soluracosmo.com
              </a>{" "}
              with your Order ID and we'll resolve it promptly.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
