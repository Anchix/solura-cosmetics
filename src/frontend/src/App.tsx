import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// USER PAGES
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

// OPTIONAL PAGES (keep if exist)
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import FAQsPage from "./pages/FAQsPage";
import HelpPage from "./pages/HelpPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminBlogPage from "./pages/AdminBlogPage";
import AdminCouponsPage from "./pages/AdminCouponsPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* ===== USER ROUTES ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />

        {/* ===== EXTRA PAGES ===== */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/blog" element={<AdminBlogPage />} />
        <Route path="/admin/coupons" element={<AdminCouponsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
