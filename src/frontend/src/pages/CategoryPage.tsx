import Layout from "@/components/Layout";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight, Droplets, Leaf, Sparkles, Wind } from "lucide-react";
import { useMemo } from "react";

interface CategoryMeta {
  label: string;
  description: string;
  tagline: string;
  Icon: React.ElementType;
  accentClass: string;
  bgClass: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  skincare: {
    label: "Skincare",
    description:
      "Nourish, protect, and reveal your skin's natural radiance with our Ayurvedic-inspired skincare range. Each formula is crafted with potent botanicals — saffron, sandalwood, rose, and turmeric — for a luminous, healthy complexion.",
    tagline: "Rooted in nature. Backed by Ayurveda.",
    Icon: Droplets,
    accentClass: "text-primary",
    bgClass: "from-primary/5 to-background",
  },
  makeup: {
    label: "Makeup",
    description:
      "Express yourself with our long-lasting, skin-loving makeup collection. Infused with nourishing botanical extracts and designed to complement every Indian skin tone.",
    tagline: "Colour that cares.",
    Icon: Sparkles,
    accentClass: "text-secondary-foreground",
    bgClass: "from-secondary/10 to-background",
  },
  haircare: {
    label: "Haircare",
    description:
      "Restore strength, shine, and vitality with our Bhringraj, Amla, and Brahmi formulations — developed for the Indian climate against humidity, heat, and pollution.",
    tagline: "Strength from root to tip.",
    Icon: Wind,
    accentClass: "text-accent",
    bgClass: "from-accent/5 to-background",
  },
  "bath-body": {
    label: "Bath & Body",
    description:
      "Indulge in a luxurious bathing ritual with our botanical body care range. Enriched with Indian spices, floral extracts, and cold-pressed oils for velvety-smooth skin.",
    tagline: "A ritual for every day.",
    Icon: Leaf,
    accentClass: "text-chart-3",
    bgClass: "from-chart-3/5 to-background",
  },
};

const FALLBACK_META: CategoryMeta = {
  label: "Collection",
  description: "Explore our curated collection of premium beauty products.",
  tagline: "Discover your glow.",
  Icon: Sparkles,
  accentClass: "text-primary",
  bgClass: "from-primary/5 to-background",
};

const OTHER_CATEGORIES = [
  "skincare",
  "makeup",
  "haircare",
  "bath-body",
] as const;

export default function CategoryPage() {
  const { category } = useParams({ strict: false }) as { category: string };
  const catKey = category as ProductCategory;
  const meta = CATEGORY_META[catKey] ?? FALLBACK_META;
  const { Icon } = meta;

  const { data: products, isLoading } = useProducts(catKey);

  const categoryProducts = useMemo(() => {
    const list = products ?? [];
    return [...list].sort((a, b) => {
      if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [products]);

  const bestsellers = categoryProducts.filter((p) => p.isBestseller);
  const newArrivals = categoryProducts.filter(
    (p) => p.isNew && !p.isBestseller,
  );
  const rest = categoryProducts.filter((p) => !p.isBestseller && !p.isNew);

  const relatedCategories = OTHER_CATEGORIES.filter((c) => c !== catKey);

  return (
    <Layout>
      {/* Hero */}
      <section
        className={`bg-gradient-to-b ${meta.bgClass} border-b border-border py-12 px-4`}
      >
        <div className="max-w-7xl mx-auto">
          <nav
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              to="/shop"
              className="hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{meta.label}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 rounded-xl bg-card border border-border items-center justify-center shadow-soft shrink-0">
              <Icon className={`h-6 w-6 ${meta.accentClass}`} />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                {meta.label}
              </h1>
              <p className="text-sm font-semibold text-muted-foreground italic mb-3">
                {meta.tagline}
              </p>
              <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl leading-relaxed">
                {meta.description}
              </p>
              {!isLoading && categoryProducts.length > 0 && (
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {categoryProducts.length} product
                  {categoryProducts.length !== 1 ? "s" : ""} available
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : categoryProducts.length === 0 ? (
          <div
            className="text-center py-20"
            data-ocid={`empty-state-${catKey}`}
          >
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Coming Soon
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-6 max-w-sm mx-auto">
              We're crafting something beautiful for this collection. Check back
              soon!
            </p>
            <Link to="/shop" data-ocid="empty-browse-all-cta">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Bestsellers */}
            {bestsellers.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {meta.label} Bestsellers
                  </h2>
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Most Loved
                  </span>
                </div>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  data-ocid={`${catKey}-bestsellers-grid`}
                >
                  {bestsellers.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showSlider
                    />
                  ))}
                </div>
              </div>
            )}

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    New in {meta.label}
                  </h2>
                  <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Just Arrived
                  </span>
                </div>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  data-ocid={`${catKey}-new-grid`}
                >
                  {newArrivals.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showSlider
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
                  {bestsellers.length > 0 || newArrivals.length > 0
                    ? `More in ${meta.label}`
                    : `${meta.label} Collection`}
                </h2>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  data-ocid={`${catKey}-grid`}
                >
                  {rest.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showSlider
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Related categories */}
      <section className="bg-muted/30 border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
            Explore More Collections
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {relatedCategories.map((cat) => {
              const m = CATEGORY_META[cat] ?? FALLBACK_META;
              const RelIcon = m.Icon;
              return (
                <Link
                  key={cat}
                  to="/shop/$category"
                  params={{ category: cat }}
                  data-ocid={`related-cat-${cat}`}
                >
                  <Button
                    variant="outline"
                    className="gap-2 hover:border-primary/40 transition-smooth"
                  >
                    <RelIcon className={`h-4 w-4 ${m.accentClass}`} />
                    {m.label}
                  </Button>
                </Link>
              );
            })}
            <Link to="/shop" data-ocid="related-shop-all">
              <Button variant="outline" className="gap-2">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
