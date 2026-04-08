import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useListBlogPosts } from "@/hooks/useBlog";
import type { BlogPost } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, ChevronRight, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Sample data for non-empty initial experience ─────────────────────────────

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1n,
    title: "5 Ayurvedic Skincare Rituals for a Natural Glow",
    excerpt:
      "Discover time-honoured Ayurvedic practices that South Indian women have used for centuries to maintain radiant, healthy skin.",
    content: "",
    author: "Meera Krishnan",
    category: "Skincare Tips",
    coverImage: "/assets/generated/blog-skincare-rituals.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 7 * 86400000) * 1000000n,
    updatedAt: BigInt(Date.now() - 7 * 86400000) * 1000000n,
    slug: "ayurvedic-skincare-rituals",
  },
  {
    id: 2n,
    title: "The Power of Kumkumadi: India's Golden Beauty Secret",
    excerpt:
      "Saffron, sandalwood, turmeric — the ancient kumkumadi formulation is having a modern revival. Here's why it works.",
    content: "",
    author: "Priya Ramaswamy",
    category: "Product News",
    coverImage: "/assets/generated/blog-kumkumadi.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 14 * 86400000) * 1000000n,
    updatedAt: BigInt(Date.now() - 14 * 86400000) * 1000000n,
    slug: "power-of-kumkumadi",
  },
  {
    id: 3n,
    title: "Top Beauty Trends for Indian Skin Tones in 2025",
    excerpt:
      "From rich ochre lip colours to glass-skin finishes — beauty trends uniquely suited to Indian skin tones and climates.",
    content: "",
    author: "Anitha Subramanian",
    category: "Beauty Trends",
    coverImage: "/assets/generated/blog-beauty-trends.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 21 * 86400000) * 1000000n,
    updatedAt: BigInt(Date.now() - 21 * 86400000) * 1000000n,
    slug: "beauty-trends-2025",
  },
  {
    id: 4n,
    title: "How to Build a Minimalist Haircare Routine",
    excerpt:
      "You don't need 10 products to have healthy hair. We break down a simple, effective routine using traditional Indian ingredients.",
    content: "",
    author: "Lakshmi Natarajan",
    category: "Skincare Tips",
    coverImage: "/assets/generated/blog-haircare-routine.dim_800x500.jpg",
    status: "published",
    createdAt: BigInt(Date.now() - 28 * 86400000) * 1000000n,
    updatedAt: BigInt(Date.now() - 28 * 86400000) * 1000000n,
    slug: "minimalist-haircare-routine",
  },
];

const CATEGORIES = [
  "All",
  "Skincare Tips",
  "Beauty Trends",
  "Product News",
  "Haircare",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Skincare Tips": "bg-primary/10 text-primary border-primary/20",
  "Beauty Trends": "bg-secondary/30 text-foreground border-secondary/40",
  "Product News": "bg-accent/10 text-accent border-accent/20",
  Haircare: "bg-muted text-muted-foreground border-border",
};

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Blog Card ─────────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const colorClass =
    CATEGORY_COLORS[post.category] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth flex flex-col"
      data-ocid={`blog-card-${post.id}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted/40">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground font-body line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Blog Skeleton ─────────────────────────────────────────────────────────────

function BlogSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-4 pt-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const { data: livePosts, isLoading } = useListBlogPosts();
  const [activeCategory, setActiveCategory] = useState("All");

  const posts = livePosts && livePosts.length > 0 ? livePosts : SAMPLE_POSTS;

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-muted/30 border-b border-border py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Beauty Journal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Tips & Inspiration
            </h1>
            <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
              Beauty wisdom rooted in Ayurveda, crafted for the modern Indian
              woman.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="bg-card border-b border-border sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="flex gap-1 overflow-x-auto py-3 scrollbar-hide"
            role="tablist"
            aria-label="Blog categories"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                data-ocid={`blog-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-body font-medium transition-smooth shrink-0 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 px-4" data-ocid="blog-empty-state">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <BookOpen className="h-10 w-10 text-primary/60" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Coming soon — beauty tips and inspiration on the way!
            </h2>
            <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto mb-6">
              We're crafting beautiful content just for you. Check back soon!
            </p>
            <Button
              onClick={() => setActiveCategory("All")}
              data-ocid="blog-browse-all"
            >
              Browse All Posts
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <Link
                  key={post.id.toString()}
                  to="/blog/$id"
                  params={{ id: post.id.toString() }}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                  data-ocid={`blog-link-${post.id}`}
                >
                  <BlogCard post={post} index={i} />
                </Link>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-10">
              Showing {filtered.length} article
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </section>
    </Layout>
  );
}
