import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  HelpCircle,
  Mail,
  MessageCircle,
  Package,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react";

const QUICK_LINKS = [
  {
    icon: Package,
    title: "Track My Order",
    desc: "Check the status of your order",
    href: "/account/orders" as "/",
  },
  {
    icon: RefreshCw,
    title: "Returns & Refunds",
    desc: "Easy 7-day return policy",
    href: "/shipping-returns" as "/",
  },
  {
    icon: Truck,
    title: "Shipping Info",
    desc: "Delivery timelines and charges",
    href: "/shipping-returns" as "/",
  },
  {
    icon: BookOpen,
    title: "FAQs",
    desc: "Quick answers to common questions",
    href: "/faqs" as "/",
  },
];

const TOPICS = [
  { label: "Placing an Order", href: "/faqs" as "/" },
  { label: "Payment Options", href: "/faqs" as "/" },
  { label: "Changing / Cancelling an Order", href: "/faqs" as "/" },
  { label: "Delivery Timelines", href: "/shipping-returns" as "/" },
  { label: "Returns & Refunds", href: "/shipping-returns" as "/" },
  { label: "Product Ingredients", href: "/faqs" as "/" },
  { label: "Skin Type Guidance", href: "/faqs" as "/" },
  { label: "Contact Support", href: "/contact" as "/" },
];

export default function HelpPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-14 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            How can we help you?
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers, track orders, and get in touch with our team.
          </p>
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="help-search"
            />
          </div>
        </div>
      </div>

      <div className="bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          {/* Quick links */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Quick Links
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_LINKS.map(({ icon: Icon, title, desc, href }) => (
                <Link
                  key={title}
                  to={href}
                  className="bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-soft transition-smooth flex flex-col gap-3 group"
                  data-ocid={`help-quick-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <Separator />

          {/* Browse topics */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Browse by Topic
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {TOPICS.map((topic, i) => (
                <div key={topic.label}>
                  <Link
                    to={topic.href}
                    className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors group"
                    data-ocid={`help-topic-${i}`}
                  >
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {topic.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                  {i < TOPICS.length - 1 && (
                    <Separator className="mx-5 w-auto" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Contact CTA */}
          <section className="bg-primary/5 rounded-2xl border border-primary/20 p-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-5">
              Our customer care team is here for you, Monday–Saturday, 10am–6pm
              IST.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:contact@soluracosmo.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-smooth"
                data-ocid="help-email-cta"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-foreground font-medium text-sm hover:border-primary/40 transition-smooth"
                data-ocid="help-contact-cta"
              >
                Contact Form
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
