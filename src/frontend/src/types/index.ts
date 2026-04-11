export type ProductCategory = "skincare" | "makeup" | "haircare";

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  isBestseller: boolean;
  isNew: boolean;
  isLowStock: boolean;
  tags: string[];
  ingredients?: string;
  howToUse?: string;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  images: string[];
  verified: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
  variantName?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod = "razorpay" | "cod";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  variantName?: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  codCharge: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceData {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  codCharge: number;
  total: number;
  gstNumber: string;
  companyName: string;
  companyAddress: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface DailyAnalytics {
  date: string;
  orders: number;
  revenue: number;
  newUsers: number;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  pendingOrders: number;
  last7Days: DailyAnalytics[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  order: number;
}

/** Banner as returned by the canister (maps to backend Banner type) */
export interface CanisterBanner {
  id: string;
  /** Raw name stored in canister. May contain "|" separator: "Title|Subtitle" */
  name: string;
  /** Parsed display title (part before "|" in name, or full name if no "|") */
  title: string;
  /** Parsed subtitle (part after "|" in name, or empty string) */
  subtitle: string;
  imageUrl: string;
  createdAt: number;
}

export interface PincodeData {
  pincode: string;
  district: string;
  state: string;
  stateName: string;
}

export type BlogStatus = "draft" | "published";

export interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  coverImage?: string; // URL resolved from ExternalBlob
  status: BlogStatus;
  createdAt: bigint;
  updatedAt: bigint;
  slug: string;
}

export interface BlogInput {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  coverImage?: string;
  status: BlogStatus;
  slug: string;
}
