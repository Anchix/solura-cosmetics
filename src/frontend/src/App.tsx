import { RouterProvider, createRouter } from "@tanstack/react-router";

// import your root route + routes
import { rootRoute } from "./routes/rootRoute"; // adjust path if needed
import { indexRoute } from "./routes/indexRoute";
import { shopRoute } from "./routes/shopRoute";
import { categoryRoute } from "./routes/categoryRoute";
import { productRoute } from "./routes/productRoute";
import { cartRoute } from "./routes/cartRoute";
import { checkoutRoute } from "./routes/checkoutRoute";
import { orderSuccessRoute } from "./routes/orderSuccessRoute";

import { adminRoute } from "./routes/adminRoute";
import { adminProductsRoute } from "./routes/adminProductsRoute";
import { adminOrdersRoute } from "./routes/adminOrdersRoute";
import { adminBlogRoute } from "./routes/adminBlogRoute";
import { adminCouponsRoute } from "./routes/adminCouponsRoute";

import { blogRoute } from "./routes/blogRoute";
import { blogDetailRoute } from "./routes/blogDetailRoute";

import { helpRoute } from "./routes/helpRoute";
import { aboutRoute } from "./routes/aboutRoute";
import { contactRoute } from "./routes/contactRoute";
import { faqsRoute } from "./routes/faqsRoute";

import { shippingReturnsRoute } from "./routes/shippingReturnsRoute";
import { privacyPolicyRoute } from "./routes/privacyPolicyRoute";
import { termsOfServiceRoute } from "./routes/termsOfServiceRoute";

// 🔥 CREATE ROUTE TREE
const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  categoryRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  orderSuccessRoute,
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

// 🔥 CREATE ROUTER
const router = createRouter({
  routeTree,
});

// ✅ MAIN APP COMPONENT (THIS WAS MISSING)
function App() {
  return <RouterProvider router={router} />;
}

export default App;
