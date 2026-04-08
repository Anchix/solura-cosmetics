import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductBadge } from "./Badge";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
  className?: string;
  showSlider?: boolean;
}

export default function ProductCard({
  product,
  className,
  showSlider = false,
}: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`, { duration: 2000 });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((v) => !v);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      { duration: 1500 },
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((i) => (i > 0 ? i - 1 : product.images.length - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((i) => (i < product.images.length - 1 ? i + 1 : 0));
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Link
      to="/products/$id"
      params={{ id: product.slug }}
      className={cn("group block", className)}
      data-ocid={`product-card-${product.id}`}
    >
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-smooth hover:shadow-soft">
        {/* Image area */}
        <div className="relative aspect-[4/5] bg-muted/30 overflow-hidden">
          <img
            src={
              product.images[currentImage] || "/assets/images/placeholder.svg"
            }
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isBestseller && <ProductBadge variant="bestseller" />}
            {product.isNew && <ProductBadge variant="new" />}
            {product.isLowStock && !product.isBestseller && (
              <ProductBadge variant="lowstock" />
            )}
            {discount > 0 && (
              <span className="text-xs font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-card"
            aria-label="Add to wishlist"
            data-ocid={`wishlist-${product.id}`}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted
                  ? "fill-primary text-primary"
                  : "text-muted-foreground",
              )}
            />
          </button>

          {/* Image slider controls */}
          {showSlider && product.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {product.images.map((imgSrc, i) => (
                  <button
                    key={imgSrc}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImage(i);
                    }}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-smooth",
                      i === currentImage ? "bg-primary w-3" : "bg-card/60",
                    )}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
            {product.category}
          </p>
          <h3 className="font-display text-base font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2 font-body">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-foreground">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="gap-1.5 text-xs"
              data-ocid={`add-to-cart-${product.id}`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {product.inStock ? "Add" : "Sold out"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
