import Layout from "@/components/Layout";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_PRODUCTS, useProducts } from "@/hooks/useProducts";
import type { Product, ProductCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "bestseller"
  | "rating";
type CategoryFilter = ProductCategory | "all";

const PRICE_MAX = 3000;

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: "All Products",
  skincare: "Skincare",
  makeup: "Makeup",
  haircare: "Haircare",
  "bath-body": "Bath & Body",
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "bestseller":
      return copy.sort(
        (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0),
      );
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return copy;
  }
}

interface FilterSidebarProps {
  category: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  priceMax: number;
  setPriceMax: (v: number) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  onClose?: () => void;
}

function FilterSidebar({
  category,
  setCategory,
  priceMax,
  setPriceMax,
  sort,
  setSort,
  onClose,
}: FilterSidebarProps) {
  const categories = [
    "all",
    "skincare",
    "makeup",
    "haircare",
    "bath-body",
  ] as CategoryFilter[];

  return (
    <aside className="bg-card border border-border rounded-xl p-5 space-y-6 sticky top-24">
      {onClose && (
        <div className="flex items-center justify-between">
          <span className="font-display font-semibold text-foreground">
            Filters
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Category */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Category
        </p>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              data-ocid={`filter-cat-${cat}`}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-smooth ${
                category === cat
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Price Range
        </p>
        <div className="space-y-3">
          <input
            type="range"
            min={100}
            max={PRICE_MAX}
            step={50}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            data-ocid="filter-price-range"
            className="w-full accent-primary cursor-pointer"
            aria-label="Maximum price filter"
          />
          <div className="flex justify-between text-sm font-body text-muted-foreground">
            <span>₹100</span>
            <span className="font-semibold text-foreground">
              Up to ₹{priceMax.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Sort By
        </p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSort(opt.value)}
              data-ocid={`sort-${opt.value}`}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-smooth ${
                sort === opt.value
                  ? "bg-secondary/40 text-foreground font-semibold"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        data-ocid="filter-reset"
        onClick={() => {
          setCategory("all");
          setPriceMax(PRICE_MAX);
          setSort("newest");
        }}
      >
        Reset Filters
      </Button>
    </aside>
  );
}

export default function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortOption>("newest");
  const [search, setSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products ?? MOCK_PRODUCTS;
    if (category !== "all") list = list.filter((p) => p.category === category);
    list = list.filter((p) => p.price <= priceMax);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return sortProducts(list, sort);
  }, [products, category, priceMax, sort, search]);

  const hasActiveFilters =
    category !== "all" || priceMax < PRICE_MAX || search.trim().length > 0;

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-muted/30 border-b border-border py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav
            className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Shop</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            All Products
          </h1>
          <p className="text-muted-foreground font-body max-w-xl">
            Discover our full collection of Ayurvedic-inspired skincare, makeup,
            and haircare — crafted for the Indian woman.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + mobile filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search products, ingredients, tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="shop-search"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            className="lg:hidden gap-2"
            onClick={() => setShowMobileFilters(true)}
            data-ocid="mobile-filter-toggle"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            )}
          </Button>
        </div>

        <div className="flex gap-7">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-56 shrink-0">
            <FilterSidebar
              category={category}
              setCategory={setCategory}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              sort={sort}
              setSort={setSort}
            />
          </div>

          {/* Mobile sidebar overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div
                className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
                onKeyDown={(e) =>
                  e.key === "Escape" && setShowMobileFilters(false)
                }
                role="button"
                tabIndex={-1}
                aria-label="Close filter panel"
              />
              <div className="relative z-10 ml-auto w-72 bg-background p-4 h-full overflow-y-auto shadow-elevated">
                <FilterSidebar
                  category={category}
                  setCategory={setCategory}
                  priceMax={priceMax}
                  setPriceMax={setPriceMax}
                  sort={sort}
                  setSort={setSort}
                  onClose={() => setShowMobileFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Results count + active filters */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                <p
                  className="text-sm text-muted-foreground font-body"
                  data-ocid="results-count"
                >
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filtered.length}
                  </span>{" "}
                  product{filtered.length !== 1 ? "s" : ""}
                </p>
              )}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setCategory("all");
                    setPriceMax(PRICE_MAX);
                    setSearch("");
                  }}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  data-ocid="clear-all-filters"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
              {category !== "all" && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-semibold">
                  {CATEGORY_LABELS[category]}
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    aria-label="Remove category filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>

            {isLoading ? (
              <ProductGridSkeleton count={6} />
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-20 px-4"
                data-ocid="empty-state-shop"
              >
                <div className="text-5xl mb-4">🌸</div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                  No products found
                </h2>
                <p className="text-muted-foreground font-body text-sm mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or search term to find what you're
                  looking for.
                </p>
                <Button
                  onClick={() => {
                    setCategory("all");
                    setPriceMax(PRICE_MAX);
                    setSearch("");
                    setSort("newest");
                  }}
                  data-ocid="browse-all-cta"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Browse All Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} showSlider />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
