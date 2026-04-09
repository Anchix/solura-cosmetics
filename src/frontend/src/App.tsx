import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("@/pages/OrderSuccessPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
const OrderHistoryPage = lazy(() => import("@/pages/OrderHistoryPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminProductsPage = lazy(() => import("@/pages/AdminProductsPage"));
const AdminOrdersPage = lazy(() => import("@/pages/AdminOrdersPage"));
const AdminBlogPage = lazy(() => import("@/pages/AdminBlogPage"));
const AdminCouponsPage = lazy(() => import("@/pages/AdminCouponsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FAQsPage = lazy(() => import("@/pages/FAQsPage"));
const ShippingReturnsPage = lazy(() => import("@/pages/ShippingReturnsPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ShopPage />
    </Suspense>
  ),
});
const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/$category",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CategoryPage />
    </Suspense>
  ),
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProductDetailPage />
    </Suspense>
  ),
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CartPage />
    </Suspense>
  ),
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CheckoutPage />
    </Suspense>
  ),
});
const orderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-success/$orderId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrderSuccessPage />
    </Suspense>
  ),
});
const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AccountPage />
    </Suspense>
  ),
});
const orderHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrderHistoryPage />
    </Suspense>
  ),
});
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthPage />
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
});
const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminProductsPage />
    </Suspense>
  ),
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminOrdersPage />
    </Suspense>
  ),
});
const adminBlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBlogPage />
    </Suspense>
  ),
});
const adminCouponsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/coupons",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminCouponsPage />
    </Suspense>
  ),
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});
const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogDetailPage />
    </Suspense>
  ),
});
const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HelpPage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});
const faqsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faqs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FAQsPage />
    </Suspense>
  ),
});
const shippingReturnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shipping-returns",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ShippingReturnsPage />
    </Suspense>
  ),
});
const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivacyPolicyPage />
    </Suspense>
  ),
});
const termsOfServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms-of-service",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsOfServicePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  categoryRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  orderSuccessRoute,
  accountRoute,
  orderHistoryRoute,
  authRoute,
  adminRoute,
  adminProductsRoute,
  adminOrdersRoute,
  adminBlogRoute,
  adminCouponsRoute,
  blogRoute,
  blogDetailRoute,
  helpRoute,
  aboutRoute,
  contactRoute,
  faqsRoute,
  shippingReturnsRoute,
  privacyPolicyRoute,
  termsOfServiceRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
