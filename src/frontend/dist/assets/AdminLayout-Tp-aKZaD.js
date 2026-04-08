import { a as useRouter, r as reactExports, j as jsxRuntimeExports, L as Link, c as cn } from "./index-BYwbnXHo.js";
import { c as createLucideIcon, u as useAuthStore, B as Button, x as Sheet, y as SheetTrigger, M as Menu, z as SheetContent } from "./authStore-bVvk2SIb.js";
import { L as LogOut } from "./log-out-CWlpqAcE.js";
import { P as Package } from "./package-DSIGmOwv.js";
import { B as BookOpen } from "./book-open-ztOrSX2C.js";
import { C as ChevronRight } from "./chevron-right-B73qp2IS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
const ADMIN_LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Banners", href: "/admin/banners", icon: Image }
];
function SidebarNav({ currentPath, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-foreground mb-6 px-2", children: "Admin Panel" }),
    ADMIN_LINKS.map(({ label, href, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: href,
        onClick: onClose,
        className: cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-smooth",
          currentPath === href ? "bg-primary text-primary-foreground font-medium" : "text-foreground hover:bg-muted/60"
        ),
        "data-ocid": `admin-nav-${label.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 flex-shrink-0" }),
          label,
          currentPath === href && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 ml-auto" })
        ]
      },
      href
    ))
  ] });
}
function AdminLayout({ children, title }) {
  const { logout } = useAuthStore();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-muted/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex flex-col w-64 bg-card border-r border-border min-h-screen fixed top-0 left-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-primary", children: "Solura" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarNav, { currentPath }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          className: "w-full justify-start gap-2 text-muted-foreground hover:text-destructive",
          onClick: handleLogout,
          "data-ocid": "admin-logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Logout"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 lg:ml-64 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-card border-b border-border px-6 h-16 flex items-center justify-between shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "left", className: "w-64 bg-card p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SidebarNav,
              {
                currentPath,
                onClose: () => setMobileOpen(false)
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-foreground", children: title || "Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground hidden md:block", children: "contact@soluracosmo.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleLogout,
              className: "hidden lg:flex gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
                "Logout"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6", children })
    ] })
  ] });
}
export {
  AdminLayout as A,
  ShoppingCart as S
};
