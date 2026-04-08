import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogPost, useListBlogPosts } from "@/hooks/useBlog";
import type { BlogPost } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, Tag, User } from "lucide-react";
import { motion } from "motion/react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Skincare Tips": "bg-primary/10 text-primary border-primary/20",
  "Beauty Trends": "bg-secondary/30 text-foreground border-secondary/40",
  "Product News": "bg-accent/10 text-accent border-accent/20",
  Haircare: "bg-muted text-muted-foreground border-border",
};

// ─── Related posts ─────────────────────────────────────────────────────────────

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$id"
      params={{ id: post.id.toString() }}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-soft transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      data-ocid={`related-post-${post.id}`}
    >
      <div className="aspect-video overflow-hidden bg-muted/40">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
      </div>
      <div className="p-4">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"}`}
        >
          {post.category}
        </span>
        <h3 className="font-display font-semibold text-sm text-foreground mt-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDate(post.createdAt)}
        </p>
      </div>
    </Link>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="aspect-[2/1] w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </Layout>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogDetailPage() {
  const { id } = useParams({ strict: false });
  const postId = id ? BigInt(id) : 0n;
  const navigate = useNavigate();

  const { data: post, isLoading } = useGetBlogPost(postId);
  const { data: allPosts } = useListBlogPosts();

  if (isLoading) return <DetailSkeleton />;

  if (!post) {
    return (
      <Layout>
        <div
          className="max-w-3xl mx-auto px-4 py-24 text-center"
          data-ocid="blog-not-found"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Article not found
          </h1>
          <p className="text-muted-foreground font-body mb-6">
            This article may have been removed or the link is incorrect.
          </p>
          <Button
            onClick={() => navigate({ to: "/blog" })}
            data-ocid="back-to-blog"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Button>
        </div>
      </Layout>
    );
  }

  const related = (allPosts ?? [])
    .filter((p) => p.id !== post.id)
    .sort((a, b) => {
      // same category first
      const aSame = a.category === post.category ? -1 : 0;
      const bSame = b.category === post.category ? -1 : 0;
      return aSame - bSame;
    })
    .slice(0, 3);

  const colorClass =
    CATEGORY_COLORS[post.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <Layout>
      {/* Back navigation */}
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-body group"
          data-ocid="back-to-blog"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Hero */}
      <article className="max-w-3xl mx-auto px-4 pb-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {/* Category badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${colorClass}`}
          >
            <Tag className="h-3 w-3" />
            {post.category}
          </span>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-muted-foreground font-body text-lg mb-5 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.createdAt)}
            </span>
          </div>
        </motion.header>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-elevated"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-neutral max-w-none font-body text-foreground
            prose-headings:font-display prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-li:text-muted-foreground
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: blog content is admin-controlled HTML
          dangerouslySetInnerHTML={{
            __html:
              post.content ||
              `<p>${post.excerpt}</p><p>Full article coming soon. Stay tuned for more beauty tips and inspiration from Solura Cosmetics.</p>`,
          }}
          data-ocid="blog-content"
        />
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section
          className="bg-muted/30 border-t border-border py-12 px-4"
          data-ocid="related-posts"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((relPost) => (
                <RelatedPostCard key={relPost.id.toString()} post={relPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA footer strip */}
      <section className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-foreground">
              Loved this article?
            </p>
            <p className="text-sm text-muted-foreground font-body">
              Explore more beauty tips and discover our products.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/blog" })}
              data-ocid="more-articles-cta"
            >
              More Articles
            </Button>
            <Button
              onClick={() => navigate({ to: "/shop" })}
              data-ocid="shop-now-cta"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
