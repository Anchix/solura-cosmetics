import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Youtube } from "lucide-react";

// Registered TanStack routes
const SHOP_LINKS = [
  { label: "Skincare", href: "/shop/skincare" as "/" },
  { label: "Makeup", href: "/shop/makeup" as "/" },
  { label: "Haircare", href: "/shop/haircare" as "/" },
  { label: "Bath & Body", href: "/shop/bath-body" as "/" },
  { label: "New Arrivals", href: "/shop?filter=new" as "/" },
  { label: "Bestsellers", href: "/shop?filter=bestsellers" as "/" },
];

const HELP_LINKS = [
  { label: "Help", href: "/help" as "/" },
  { label: "About Us", href: "/about" as "/" },
  { label: "Contact Us", href: "/contact" as "/" },
  { label: "FAQs", href: "/faqs" as "/" },
  { label: "Shipping & Returns", href: "/shipping-returns" as "/" },
  { label: "Privacy Policy", href: "/privacy-policy" as "/" },
  { label: "Terms of Service", href: "/terms-of-service" as "/" },
];

const ACCOUNT_ROUTER_LINKS = [
  { label: "Login / Register", href: "/auth" as "/" },
  { label: "My Profile", href: "/account" as "/" },
  { label: "My Orders", href: "/account/orders" as "/" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "soluracosmo.com";

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Newsletter strip */}
      <div className="bg-primary/8 border-b border-border py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              Stay Radiant.
            </p>
            <p className="text-sm text-muted-foreground">
              Subscribe for exclusive offers and beauty tips.
            </p>
          </div>
          <form
            className="flex gap-2 w-full max-w-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-smooth hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-display text-2xl font-bold text-foreground">
                Solura
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase ml-2">
                Cosmetics
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Reveal Your Natural Glow. Premium beauty rooted in Ayurvedic
              wisdom, crafted for modern Indian skin.
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  184, South Manthai Street, Pallapatti, Karur, Tamil Nadu
                  639205
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@soluracosmo.com"
                  className="hover:text-primary transition-colors"
                  data-ocid="footer-email"
                >
                  contact@soluracosmo.com
                </a>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/solura_cosmo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-smooth"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-smooth"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-smooth"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-body font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h3 className="font-body font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Help
            </h3>
            <ul className="space-y-2">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-ocid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="font-body font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Account
            </h3>
            <ul className="space-y-2">
              {ACCOUNT_ROUTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          <span>© {year} Solura Cosmetics.</span>
          <span className="hidden md:inline">·</span>
          <span>GST: 33AFUFS3776C1ZM</span>
          <span className="hidden md:inline">·</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Accepted payments:</span>
          <div className="flex gap-1 text-muted-foreground">
            <span className="px-2 py-0.5 border border-border rounded text-xs bg-muted/40">
              Visa
            </span>
            <span className="px-2 py-0.5 border border-border rounded text-xs bg-muted/40">
              Mastercard
            </span>
            <span className="px-2 py-0.5 border border-border rounded text-xs bg-muted/40">
              UPI
            </span>
            <span className="px-2 py-0.5 border border-border rounded text-xs bg-muted/40">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
