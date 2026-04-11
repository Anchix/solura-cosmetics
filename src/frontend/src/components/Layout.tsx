import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ChatbotWidget from "./ChatbotWidget";
import Footer from "./Footer";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Skincare", href: "/shop/skincare" },
  { label: "Makeup", href: "/shop/makeup" },
  { label: "Haircare", href: "/shop/haircare" },
  { label: "Bath & Body", href: "/shop/bath-body" },
  { label: "Blog", href: "/blog" },
];

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Layout({ children, fullWidth = false }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs text-center py-2 px-4 font-body tracking-wide">
        🌿 Free shipping on orders above ₹999 | Designed in India, Inspired by
        Tradition
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-50 bg-card border-b border-border transition-smooth ${
          scrolled ? "shadow-soft" : ""
        }`}
        data-ocid="header-nav"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
            aria-label="Solura Cosmetics — Home"
          >
            <img
              src="/assets/logo.jpg"
              alt="Solura Cosmetics"
              className="h-12 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
              loading="eager"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href as "/"}
                className="px-3 py-2 text-sm font-body text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="hidden md:flex"
              data-ocid="header-search"
              onClick={() => navigate({ to: "/shop" })}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              className="hidden md:flex"
              data-ocid="header-wishlist"
              onClick={() => navigate({ to: "/account" })}
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Link to="/auth" data-ocid="header-account">
              <Button
                variant="ghost"
                size="icon"
                aria-label={isLoggedIn ? "My Account" : "Login"}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart" className="relative" data-ocid="header-cart">
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                  data-ocid="header-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card">
                <div className="flex flex-col gap-1 mt-8">
                  <div className="flex items-center mb-4">
                    <img
                      src="/assets/logo.jpg"
                      alt="Solura Cosmetics"
                      className="h-10 w-auto object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href as "/"}
                      className="py-3 px-2 text-base font-body border-b border-border text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/shop"
                    className="py-3 px-2 text-base font-body border-b border-border text-foreground hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    to="/auth"
                    className="py-3 px-2 text-base font-body text-foreground hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {isLoggedIn ? "My Account" : "Login / Register"}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={`flex-1 ${fullWidth ? "" : ""}`}>{children}</main>

      <Footer />
      <ChatbotWidget />
    </div>
  );
}
