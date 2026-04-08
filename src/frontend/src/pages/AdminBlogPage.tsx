import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAdminCreateBlogPost,
  useAdminDeleteBlogPost,
  useAdminListAllBlogPosts,
  useAdminUpdateBlogPost,
} from "@/hooks/useBlog";
import { useAuthStore } from "@/store/authStore";
import type { BlogInput, BlogPost } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const BLOG_CATEGORIES = [
  "Skincare Tips",
  "Beauty Trends",
  "Product News",
  "Tutorials",
  "Brand Updates",
];

const EMPTY_INPUT: BlogInput = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Skincare Tips",
  author: "Solura Team",
  status: "draft",
  content: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Cover Image Slot ─────────────────────────────────────────────────────────

interface CoverImageSlotProps {
  url: string | undefined;
  onUpload: (url: string) => void;
  onRemove: () => void;
}

function CoverImageSlot({ url, onUpload, onRemove }: CoverImageSlotProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onUpload(objectUrl);
    toast.success("Cover image uploaded");
  };

  return (
    <div className="relative h-40 w-full rounded-xl border-2 border-dashed border-border bg-muted/20 overflow-hidden group hover:border-primary/50 transition-smooth">
      {url ? (
        <>
          <img src={url} alt="Cover" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
            aria-label="Remove cover image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </>
      ) : (
        <label
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary transition-colors gap-2"
          data-ocid="admin-blog-cover-upload"
        >
          <Upload className="h-6 w-6" />
          <span className="text-sm font-body">Upload Cover Image</span>
          <span className="text-xs">JPG, PNG or WebP recommended</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

// ─── Blog Post Form Dialog ─────────────────────────────────────────────────────

interface BlogDialogProps {
  open: boolean;
  onClose: () => void;
  input: BlogInput;
  isEditing: boolean;
  onChange: (b: BlogInput) => void;
  onSave: () => void;
  isSaving: boolean;
}

function BlogDialog({
  open,
  onClose,
  input,
  isEditing,
  onChange,
  onSave,
  isSaving,
}: BlogDialogProps) {
  const handleTitleChange = (title: string) => {
    onChange({
      ...input,
      title,
      slug: isEditing ? input.slug : slugify(title),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEditing ? "Edit Blog Post" : "New Blog Post"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Draft posts are not visible to customers.
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {/* Title */}
          <div className="sm:col-span-2 space-y-2">
            <Label>Title *</Label>
            <Input
              value={input.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="5 Skincare Secrets for a Natural Glow"
              data-ocid="admin-blog-title"
            />
          </div>

          {/* Slug */}
          <div className="sm:col-span-2 space-y-2">
            <Label>URL Slug</Label>
            <Input
              value={input.slug}
              onChange={(e) => onChange({ ...input, slug: e.target.value })}
              placeholder="5-skincare-secrets-natural-glow"
              data-ocid="admin-blog-slug"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category *</Label>
            <select
              value={input.category}
              onChange={(e) => onChange({ ...input, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="admin-blog-category"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label>Author *</Label>
            <Input
              value={input.author}
              onChange={(e) => onChange({ ...input, author: e.target.value })}
              placeholder="Solura Team"
              data-ocid="admin-blog-author"
            />
          </div>

          {/* Excerpt */}
          <div className="sm:col-span-2 space-y-2">
            <Label>
              Excerpt{" "}
              <span className="text-muted-foreground text-xs">
                ({input.excerpt.length}/200)
              </span>
            </Label>
            <textarea
              value={input.excerpt}
              onChange={(e) =>
                onChange({
                  ...input,
                  excerpt: e.target.value.slice(0, 200),
                })
              }
              placeholder="A short summary shown on the blog listing page..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="admin-blog-excerpt"
            />
          </div>

          {/* Content */}
          <div className="sm:col-span-2 space-y-2">
            <Label>Content *</Label>
            <textarea
              value={input.content}
              onChange={(e) => onChange({ ...input, content: e.target.value })}
              placeholder="Write your full blog post content here..."
              rows={10}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              data-ocid="admin-blog-content"
            />
          </div>

          {/* Cover Image */}
          <div className="sm:col-span-2 space-y-2">
            <Label>Cover Image</Label>
            <CoverImageSlot
              url={input.coverImage}
              onUpload={(url) => onChange({ ...input, coverImage: url })}
              onRemove={() => onChange({ ...input, coverImage: undefined })}
            />
          </div>

          {/* Status toggle */}
          <div className="sm:col-span-2 space-y-2">
            <Label>Publication Status</Label>
            <div className="flex gap-3">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange({ ...input, status: s })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth border ${
                    input.status === s
                      ? s === "published"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-foreground border-border"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                  data-ocid={`admin-blog-status-${s}`}
                >
                  {s === "draft" ? "Draft" : "Published"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin-blog-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            data-ocid="admin-blog-save"
          >
            {isSaving
              ? "Saving..."
              : isEditing
                ? "Update Post"
                : "Publish Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

interface DeleteConfirmProps {
  open: boolean;
  postTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

function DeleteConfirmDialog({
  open,
  postTitle,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-destructive">
            Delete Blog Post?
          </DialogTitle>
          <DialogDescription>
            This will permanently remove{" "}
            <span className="font-semibold text-foreground">"{postTitle}"</span>
            . This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
            data-ocid="admin-blog-delete-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            data-ocid="admin-blog-delete-confirm"
          >
            {isDeleting ? "Deleting..." : "Delete Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "draft" | "published" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        status === "published"
          ? "bg-primary/15 text-primary"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminBlogPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const { data: posts, isLoading } = useAdminListAllBlogPosts();
  const createMutation = useAdminCreateBlogPost();
  const updateMutation = useAdminUpdateBlogPost();
  const deleteMutation = useAdminDeleteBlogPost();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editInput, setEditInput] = useState<BlogInput>(EMPTY_INPUT);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }

  const filtered = posts?.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNew = () => {
    setEditInput(EMPTY_INPUT);
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditInput({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      status: post.status,
      content: post.content,
      coverImage: post.coverImage,
    });
    setEditingId(post.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editInput.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!editInput.content.trim()) {
      toast.error("Content is required.");
      return;
    }
    if (!editInput.slug.trim()) {
      toast.error("Slug is required.");
      return;
    }

    try {
      if (editingId !== null) {
        await updateMutation.mutateAsync({ id: editingId, input: editInput });
        toast.success("Blog post updated!");
      } else {
        await createMutation.mutateAsync(editInput);
        toast.success("Blog post created!");
      }
      setDialogOpen(false);
      setEditInput(EMPTY_INPUT);
      setEditingId(null);
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title="Blog">
      <div className="space-y-6">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
            data-ocid="admin-blog-search"
          />
          <Button
            onClick={handleNew}
            className="gap-2"
            data-ocid="admin-add-blog-post"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Posts table */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-muted/30 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Post
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Date
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered?.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-16 text-center"
                        data-ocid="blog-posts-empty"
                      >
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                          <BookOpen className="h-10 w-10 opacity-30" />
                          <p className="text-sm">
                            {search
                              ? "No posts match your search"
                              : "No blog posts yet. Create your first post!"}
                          </p>
                          {!search && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleNew}
                              className="gap-1.5"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Create First Post
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  {filtered?.map((post) => (
                    <tr
                      key={String(post.id)}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-blog-row-${post.id}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="h-10 w-16 rounded-lg object-cover bg-muted/30 flex-shrink-0"
                            />
                          ) : (
                            <div className="h-10 w-16 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate max-w-[160px]">
                              {post.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                              by {post.author}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {post.category}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <StatusBadge status={post.status} />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.createdAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(post)}
                            aria-label="Edit post"
                            data-ocid={`edit-blog-${post.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteTarget(post)}
                            aria-label="Delete post"
                            data-ocid={`delete-blog-${post.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Blog post form dialog */}
      <BlogDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        input={editInput}
        isEditing={editingId !== null}
        onChange={setEditInput}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        postTitle={deleteTarget?.title ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={deleteMutation.isPending}
      />
    </AdminLayout>
  );
}
