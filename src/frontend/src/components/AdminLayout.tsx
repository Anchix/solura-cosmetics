import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSharedActor } from "@/context/ActorContext";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { useState } from "react";

const ADMIN_LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Banners", href: "/admin/banners", icon: Image },
];

interface SidebarNavProps {
  currentPath: string;
  onClose?: () => void;
}

function SidebarNav({ currentPath, onClose }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      <div className="font-display text-lg font-bold text-foreground mb-6 px-2">
        Admin Panel
      </div>
      {ADMIN_LINKS.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          to={href as "/admin"}
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-smooth",
            currentPath === href
              ? "bg-primary text-primary-foreground font-medium"
              : "text-foreground hover:bg-muted/60",
          )}
          data-ocid={`admin-nav-${label.toLowerCase()}`}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          {label}
          {currentPath === href && <ChevronRight className="h-3 w-3 ml-auto" />}
        </Link>
      ))}
    </nav>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { adminToken, clearAdminSession } = useAuthStore();
  const { actor } = useSharedActor();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    // Invalidate server-side session first
    if (actor && adminToken) {
      try {
        await actor.adminLogout(adminToken);
      } catch {
        // Ignore — server may already have cleared it
      }
    }
    clearAdminSession();
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border min-h-screen fixed top-0 left-0">
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <span className="font-display text-xl font-bold text-primary">
            Solura
          </span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav currentPath={currentPath} />
        </div>
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
            data-ocid="admin-logout"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Admin header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border px-6 h-16 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-card p-0">
                <SidebarNav
                  currentPath={currentPath}
                  onClose={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <h1 className="font-display text-lg font-semibold text-foreground">
              {title || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:block">
              contact@soluracosmo.com
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden lg:flex gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
