import { ProductBadge } from "@/components/Badge";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  MOCK_PRODUCTS,
  useProduct,
  useProductReviews,
  useSubmitReview,
} from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { Review } from "@/types";
import { Link, useParams, useRouter } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ category, name }: { category: string; name: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground font-body flex-wrap"
    >
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link to="/shop" className="hover:text-foreground transition-colors">
        Shop
      </Link>
      <span>/</span>
      <Link
        to="/shop/$category"
        params={{ category }}
        className="hover:text-foreground transition-colors capitalize"
      >
        {category}
      </Link>
      <span>/</span>
      <span
        className="text-foreground font-medium truncate max-w-[200px]"
        aria-current="page"
      >
        {name}
      </span>
    </nav>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((idx: number, dir = 0) => {
    setDirection(dir);
    setActive(idx);
  }, []);

  const prev = useCallback(() => {
    goTo(active > 0 ? active - 1 : images.length - 1, -1);
  }, [active, images.length, goTo]);

  const next = useCallback(() => {
    goTo(active < images.length - 1 ? active + 1 : 0, 1);
  }, [active, images.length, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-square bg-muted/20 rounded-2xl overflow-hidden border border-border"
        data-ocid="product-main-image"
        aria-label="Product image gallery"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.img
            key={active}
            src={images[active] || "/assets/images/placeholder.svg"}
            alt={`${productName} — view ${active + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-sm"
              aria-label="Previous image"
              data-ocid="gallery-prev"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-sm"
              aria-label="Next image"
              data-ocid="gallery-next"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 bg-foreground/60 text-background text-xs px-2 py-0.5 rounded-full font-body backdrop-blur-sm">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i, i > active ? 1 : -1)}
            className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === active
                ? "border-primary shadow-sm scale-105"
                : "border-border hover:border-primary/40"
            }`}
            aria-label={`View ${productName} — ${i + 1}`}
            aria-pressed={i === active}
            data-ocid={`gallery-thumb-${i}`}
          >
            <img
              src={src || "/assets/images/placeholder.svg"}
              alt={`${productName} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-left font-body font-semibold text-foreground hover:text-primary transition-colors"
        aria-expanded={open}
        data-ocid={`accordion-${title.toLowerCase()}`}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-muted-foreground font-body leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: CheckCircle, label: "100% Original", sub: "Genuine products only" },
  { icon: Award, label: "GST Certified", sub: "33AFUFS3776C1ZM" },
  { icon: Shield, label: "Secure Checkout", sub: "Encrypted & safe" },
  { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
];

// ─── Rating Breakdown ─────────────────────────────────────────────────────────

function RatingBreakdown({
  reviews,
  avgRating,
  total,
}: {
  reviews: Review[];
  avgRating: number;
  total: number;
}) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:items-center p-5 bg-muted/30 rounded-xl border border-border">
      <div className="text-center flex-shrink-0">
        <div className="font-display text-5xl font-bold text-foreground leading-none">
          {avgRating.toFixed(1)}
        </div>
        <StarRating
          rating={avgRating}
          size="md"
          className="mt-2 justify-center"
        />
        <p className="text-xs text-muted-foreground mt-1 font-body">
          {total} review{total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 space-y-1.5">
        {counts.map(({ star, count }) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div
              key={star}
              className="flex items-center gap-2 text-xs font-body"
            >
              <span className="w-4 text-right text-muted-foreground">
                {star}
              </span>
              <Star className="h-3 w-3 text-secondary fill-secondary flex-shrink-0" />
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: (5 - star) * 0.08 }}
                />
              </div>
              <span className="w-6 text-right text-muted-foreground">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="py-5 border-b border-border last:border-0"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-sm font-bold text-primary">
              {review.userName[0].toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-body font-semibold text-sm text-foreground">
              {review.userName}
            </p>
            <StarRating rating={review.rating} size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {review.verified && (
            <span className="text-xs text-primary font-body flex items-center gap-0.5">
              <CheckCircle className="h-3 w-3" />
              Verified
            </span>
          )}
          <span className="text-xs text-muted-foreground font-body">
            {date}
          </span>
        </div>
      </div>

      {review.title && (
        <p className="font-body font-semibold text-sm text-foreground mt-3">
          {review.title}
        </p>
      )}
      <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">
        {review.body}
      </p>

      {review.images.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.images.map((src) => (
            <img
              key={src}
              src={src}
              alt="Customer review attachment"
              className="h-16 w-16 rounded-lg object-cover border border-border"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Write Review Form ────────────────────────────────────────────────────────

function WriteReviewForm({
  productId,
  onSuccess,
}: {
  productId: string;
  onSuccess: () => void;
}) {
  const { user } = useAuthStore();
  const { mutate, isPending } = useSubmitReview();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      3 - imagePreviews.length,
    );
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 3));
  };

  const removeImage = (src: string) => {
    setImagePreviews((prev) => {
      URL.revokeObjectURL(src);
      return prev.filter((s) => s !== src);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (!body.trim()) {
      toast.error("Please write your review");
      return;
    }
    if (!user) return;
    mutate(
      {
        productId,
        userId: user.id,
        userName: user.name,
        rating,
        title: title.trim(),
        body: body.trim(),
        images: imagePreviews,
        verified: false,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted! Thank you.");
          setRating(0);
          setTitle("");
          setBody("");
          setImagePreviews([]);
          onSuccess();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-5 bg-card rounded-xl border border-border"
    >
      <h3 className="font-display text-lg font-semibold text-foreground">
        Write a Review
      </h3>

      <div>
        <label
          htmlFor="star-rating-group"
          className="text-sm font-body font-medium text-foreground mb-2 block"
        >
          Your Rating *
        </label>
        <div id="star-rating-group">
          <StarRating
            rating={rating}
            size="lg"
            interactive
            onChange={setRating}
            className="gap-1"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="review-title"
          className="text-sm font-body font-medium text-foreground mb-1 block"
        >
          Review Title
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          maxLength={100}
          className="w-full px-3 py-2 text-sm font-body border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          data-ocid="review-title-input"
        />
      </div>

      <div>
        <label
          htmlFor="review-body"
          className="text-sm font-body font-medium text-foreground mb-1 block"
        >
          Your Review *
        </label>
        <Textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell us what you loved (or didn't) about this product…"
          rows={4}
          maxLength={1000}
          className="font-body text-sm resize-none"
          data-ocid="review-body-input"
        />
        <p className="text-xs text-muted-foreground text-right mt-1">
          {body.length}/1000
        </p>
      </div>

      <div>
        <p className="text-sm font-body font-medium text-foreground mb-2">
          Add Photos (up to 3)
        </p>
        <div className="flex flex-wrap gap-2">
          {imagePreviews.map((src) => (
            <div
              key={src}
              className="relative h-16 w-16 rounded-lg overflow-hidden border border-border"
            >
              <img
                src={src}
                alt="Your uploaded preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(src)}
                className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-foreground/70 text-background flex items-center justify-center"
                aria-label="Remove uploaded photo"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {imagePreviews.length < 3 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-16 w-16 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors text-muted-foreground hover:text-primary"
              data-ocid="review-image-upload"
              aria-label="Upload review image"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="text-xs font-body">Add</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
          aria-label="Upload review images"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
        data-ocid="review-submit-btn"
      >
        {isPending ? "Submitting…" : "Submit Review"}
      </Button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams({ strict: false });
  const productId = (params as Record<string, string>).id ?? "";
  const router = useRouter();

  const { data: product, isLoading } = useProduct(productId);
  const { data: reviews = [] } = useProductReviews(product?.id ?? "");
  const addItem = useCartStore((s) => s.addItem);
  const { isLoggedIn } = useAuthStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product?.category && p.id !== product?.id,
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedVariant);
    toast.success(`${product.name} added to cart`, {
      description: `Qty: ${quantity}`,
      duration: 2500,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, quantity, selectedVariant);
    router.navigate({ to: "/checkout" });
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : (product?.rating ?? 0);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex gap-2">
                {["t1", "t2", "t3", "t4", "t5", "t6"].map((k) => (
                  <Skeleton key={k} className="h-16 w-16 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-12 w-full mt-6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="font-display text-2xl text-foreground mb-4">
            Product not found
          </p>
          <Link to="/shop">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const stockStatus = !product.inStock
    ? {
        label: "Out of Stock",
        color: "text-destructive",
        dot: "bg-destructive",
      }
    : product.isLowStock
      ? {
          label: `Low Stock — Only ${product.stock} left`,
          color: "text-accent",
          dot: "bg-accent",
        }
      : { label: "In Stock", color: "text-primary", dot: "bg-primary" };

  return (
    <Layout>
      {/* Breadcrumb bar */}
      <div className="bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <Breadcrumb category={product.category} name={product.name} />
        </div>
      </div>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Top: gallery + info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ImageGallery
                images={product.images}
                productName={product.name}
              />
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.isBestseller && <ProductBadge variant="bestseller" />}
                {product.isNew && <ProductBadge variant="new" />}
                {product.isLowStock && product.inStock && (
                  <ProductBadge variant="lowstock" />
                )}
                {discount > 0 && <ProductBadge variant="sale" />}
                <span className="text-xs font-body font-medium text-muted-foreground capitalize bg-muted/50 px-2 py-0.5 rounded-full border border-border">
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={avgRating} size="md" />
                <span className="text-sm font-body text-muted-foreground">
                  {avgRating.toFixed(1)} ({product.reviewCount + reviews.length}{" "}
                  reviews)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("reviews-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs font-body text-primary underline-offset-2 hover:underline"
                >
                  Read reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-display text-3xl font-bold text-secondary">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-body">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-semibold text-accent font-body bg-accent/10 px-2 py-0.5 rounded-md">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <p
                className={`text-sm font-body font-medium ${stockStatus.color} flex items-center gap-1.5`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full ${stockStatus.dot}`}
                />
                {stockStatus.label}
              </p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="text-sm font-body font-medium text-foreground mb-2">
                    Shade:{" "}
                    <span className="text-muted-foreground">
                      {selectedVariant ?? "Select"}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.value)}
                        aria-pressed={selectedVariant === v.value}
                        className={`px-3 py-1.5 text-sm font-body rounded-full border transition-all ${
                          selectedVariant === v.value
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                        data-ocid={`variant-${v.id}`}
                      >
                        {v.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + CTA */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-body font-medium text-foreground">
                    Quantity
                  </span>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="h-9 w-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                      aria-label="Decrease quantity"
                      data-ocid="qty-decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span
                      className="h-9 w-12 flex items-center justify-center text-sm font-body font-semibold text-foreground border-x border-border"
                      aria-label={`Quantity: ${quantity}`}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      disabled={!product.inStock}
                      className="h-9 w-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                      aria-label="Increase quantity"
                      data-ocid="qty-increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 gap-2 h-11 font-body font-semibold"
                    data-ocid="pdp-add-to-cart"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="flex-1 gap-2 h-11 font-body font-semibold border-secondary text-secondary hover:bg-secondary/10"
                    data-ocid="pdp-buy-now"
                  >
                    <Zap className="h-4 w-4" />
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center p-2.5 rounded-xl bg-muted/30 border border-border/60 gap-1"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-body font-semibold text-foreground leading-tight">
                      {label}
                    </span>
                    <span className="text-[10px] font-body text-muted-foreground leading-tight">
                      {sub}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Description Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 bg-card rounded-2xl border border-border p-6"
          >
            <AccordionItem title="Description" defaultOpen>
              <p className="whitespace-pre-line">{product.description}</p>
              {product.howToUse && (
                <div className="mt-4">
                  <p className="font-semibold text-foreground mb-1 font-body">
                    How to Use
                  </p>
                  <p>{product.howToUse}</p>
                </div>
              )}
            </AccordionItem>
            <AccordionItem title="Benefits">
              <ul className="space-y-2">
                {product.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="capitalize">{tag.replace(/-/g, " ")}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Ingredients">
              {product.ingredients ? (
                <p className="leading-relaxed">{product.ingredients}</p>
              ) : (
                <p className="italic">
                  Full ingredient list available soon. All Solura products are
                  dermatologist tested and free from harmful chemicals.
                </p>
              )}
            </AccordionItem>
          </motion.div>

          {/* Reviews Section */}
          <motion.section
            id="reviews-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-14"
            data-ocid="reviews-section"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Customer Reviews
            </h2>

            <RatingBreakdown
              reviews={reviews}
              avgRating={avgRating}
              total={product.reviewCount + reviews.length}
            />

            {reviews.length > 0 ? (
              <div className="mt-6 bg-card rounded-2xl border border-border p-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="mt-6 py-10 text-center bg-card rounded-2xl border border-border">
                <Star className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-display text-lg font-semibold text-foreground">
                  No reviews yet
                </p>
                <p className="text-sm text-muted-foreground font-body mt-1">
                  Be the first to review this product!
                </p>
              </div>
            )}

            <div className="mt-6">
              {isLoggedIn ? (
                showReviewForm ? (
                  <WriteReviewForm
                    productId={product.id}
                    onSuccess={() => setShowReviewForm(false)}
                  />
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowReviewForm(true)}
                    className="gap-2"
                    data-ocid="write-review-btn"
                  >
                    <Star className="h-4 w-4" />
                    Write a Review
                  </Button>
                )
              ) : (
                <div className="p-5 bg-muted/30 rounded-xl border border-border text-center">
                  <p className="text-sm font-body text-muted-foreground mb-3">
                    Please log in to leave a review
                  </p>
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      size="sm"
                      data-ocid="login-to-review-btn"
                    >
                      Login / Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-16 pb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  You May Also Like
                </h2>
                <Link
                  to="/shop/$category"
                  params={{ category: product.category }}
                  className="text-sm font-body text-primary hover:underline underline-offset-2"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <ProductCard product={p} showSlider />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </Layout>
  );
}
