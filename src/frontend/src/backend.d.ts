import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Product {
    id: bigint;
    status: ProductStatus;
    name: string;
    createdAt: bigint;
    description: string;
    stock: bigint;
    isBestseller: boolean;
    category: ProductCategory;
    isNew: boolean;
    price: bigint;
    image1?: ExternalBlob;
    image2?: ExternalBlob;
    image3?: ExternalBlob;
    image4?: ExternalBlob;
    image5?: ExternalBlob;
    image6?: ExternalBlob;
}
export interface Address {
    tag: string;
    city: string;
    line1: string;
    line2: string;
    state: string;
    pincode: string;
}
export interface OrderItem {
    name: string;
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export interface OrderInput {
    paymentMethod: PaymentMethod;
    customer: CustomerInfo;
    razorpayOrderId?: string;
    items: Array<OrderItem>;
}
export type BlogId = bigint;
export type ReviewId = bigint;
export interface Review {
    id: bigint;
    userId: Principal;
    createdAt: bigint;
    text: string;
    productId: bigint;
    rating: bigint;
    image1?: ExternalBlob;
    image2?: ExternalBlob;
    image3?: ExternalBlob;
}
export interface InvoiceData {
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    codSurcharge: bigint;
    customer: CustomerInfo;
    gstNumber: string;
    orderDate: bigint;
    gstAmount: bigint;
    orderId: bigint;
    totalAmount: bigint;
    companyName: string;
    items: Array<OrderItem>;
    companyAddress: string;
    subtotal: bigint;
}
export interface ProductInput {
    status: ProductStatus;
    name: string;
    description: string;
    stock: bigint;
    isBestseller: boolean;
    category: ProductCategory;
    isNew: boolean;
    price: bigint;
    image1?: ExternalBlob;
    image2?: ExternalBlob;
    image3?: ExternalBlob;
    image4?: ExternalBlob;
    image5?: ExternalBlob;
    image6?: ExternalBlob;
}
export interface BlogPost {
    id: BlogId;
    status: BlogStatus;
    title: string;
    content: string;
    createdAt: bigint;
    slug: string;
    author: string;
    coverImage?: ExternalBlob;
    updatedAt: bigint;
    excerpt: string;
    category: string;
}
export interface Order {
    id: bigint;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    codSurcharge: bigint;
    customer: CustomerInfo;
    orderStatus: OrderStatus;
    userId?: Principal;
    createdAt: bigint;
    gstAmount: bigint;
    razorpayOrderId?: string;
    totalAmount: bigint;
    items: Array<OrderItem>;
    subtotal: bigint;
}
export interface ProductRating {
    productId: bigint;
    averageRating: bigint;
    reviewCount: bigint;
}
export interface Banner {
    id: bigint;
    name: string;
    createdAt: bigint;
    image: ExternalBlob;
}
export interface BlogInput {
    status: BlogStatus;
    title: string;
    content: string;
    slug: string;
    author: string;
    coverImage?: ExternalBlob;
    excerpt: string;
    category: string;
}
export interface DailyAnalytics {
    revenue: bigint;
    date: bigint;
    orderCount: bigint;
}
export interface CustomerInfo {
    city: string;
    name: string;
    email: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
    pincode: string;
}
export type ProductId = bigint;
export interface ReviewInput {
    text: string;
    productId: bigint;
    rating: bigint;
    image1?: ExternalBlob;
    image2?: ExternalBlob;
    image3?: ExternalBlob;
}
export interface UserProfile {
    name: string;
    email: string;
    addresses: Array<Address>;
    phone: string;
}
export type OrderId = bigint;
export enum BlogStatus {
    published = "published",
    draft = "draft"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum PaymentMethod {
    COD = "COD",
    Razorpay = "Razorpay"
}
export enum PaymentStatus {
    Failed = "Failed",
    Refunded = "Refunded",
    Paid = "Paid",
    Pending = "Pending"
}
export enum ProductCategory {
    Skincare = "Skincare",
    Haircare = "Haircare",
    Makeup = "Makeup"
}
export enum ProductStatus {
    active = "active",
    inactive = "inactive"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAddress(address: Address): Promise<boolean>;
    adminAddBanner(name: string, image: ExternalBlob): Promise<Banner>;
    adminCreateBlogPost(input: BlogInput): Promise<BlogPost>;
    adminCreateProduct(input: ProductInput): Promise<Product>;
    adminDeleteBanner(id: bigint): Promise<boolean>;
    adminDeleteBlogPost(id: BlogId): Promise<boolean>;
    adminDeleteProduct(id: ProductId): Promise<boolean>;
    adminGetAnalytics(): Promise<Array<DailyAnalytics>>;
    adminListAllBlogPosts(): Promise<Array<BlogPost>>;
    adminListAllOrders(): Promise<Array<Order>>;
    adminUpdateBlogPost(id: BlogId, input: BlogInput): Promise<BlogPost | null>;
    adminUpdateOrderStatus(id: OrderId, status: OrderStatus): Promise<boolean>;
    adminUpdateProduct(id: ProductId, input: ProductInput): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    chatbotQuery(userMessage: string): Promise<string>;
    createOrder(input: OrderInput): Promise<Order>;
    createReview(input: ReviewInput): Promise<Review>;
    deleteReview(reviewId: ReviewId): Promise<boolean>;
    getBestsellers(): Promise<Array<Product>>;
    getBlogPost(id: BlogId): Promise<BlogPost | null>;
    getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInvoice(id: OrderId): Promise<InvoiceData | null>;
    getNewArrivals(): Promise<Array<Product>>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProductRating(productId: ProductId): Promise<ProductRating>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listActiveProducts(): Promise<Array<Product>>;
    listBanners(): Promise<Array<Banner>>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    listMyOrders(): Promise<Array<Order>>;
    listProducts(): Promise<Array<Product>>;
    listReviewsByProduct(productId: ProductId): Promise<Array<Review>>;
    lookupPincode(pincode: string): Promise<string>;
    removeAddress(index: bigint): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    transform(input: {
        context: Uint8Array;
        response: {
            status: bigint;
            body: Uint8Array;
            headers: Array<{
                value: string;
                name: string;
            }>;
        };
    }): Promise<{
        status: bigint;
        body: Uint8Array;
        headers: Array<{
            value: string;
            name: string;
        }>;
    }>;
    updatePaymentStatus(id: OrderId, status: PaymentStatus, razorpayOrderId: string | null): Promise<boolean>;
}
