import AdminLayout from "@/components/AdminLayout";
import { ProductBadge } from "@/components/Badge";
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
  useAdminAddBanner,
  useAdminCreateProduct,
  useAdminDeleteBanner,
  useAdminDeleteProduct,
  useAdminProducts,
  useAdminUpdateProduct,
  useBanners,
} from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import type { Product, ProductCategory } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_PRODUCT: Partial<Product> = {
  name: "",
  category: "skincare",
  price: 0,
  description: "",
  shortDescription: "",
  images: [],
  inStock: true,
  stock: 0,
  isBestseller: false,
  isNew: false,
  isLowStock: false,
  tags: [],
};

// ─── Image URL Input ──────────────────────────────────────────────────────────

interface ImageUrlInputProps {
  url: string;
  index: number;
  onChange: (index: number, url: string) => void;
  onClear: (index: number) => void;
}

function ImageUrlInput({ url, index, onChange, onClear }: ImageUrlInputProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            value={url}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder="/assets/images/your-product.jpg  or  https://..."
            className="pr-8 text-xs"
            data-ocid={`admin-product-image-url-${index}`}
          />
          {url && (
            <button
              type="button"
              onClick={() => onClear(index)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Clear image ${index + 1} URL`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {url && (
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="h-10 w-10 rounded-lg object-cover bg-muted/30 flex-shrink-0 border border-border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Product Form Dialog ──────────────────────────────────────────────────────

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Partial<Product>;
  isEditing: boolean;
  isSaving: boolean;
  onChange: (p: Partial<Product>) => void;
  onSave: () => void;
}

function ProductDialog({
  open,
  onClose,
  product,
  isEditing,
  isSaving,
  onChange,
  onSave,
}: ProductDialogProps) {
  // Ensure images is always a 6-element string array
  const images: string[] = Array.from(
    { length: 6 },
    (_, i) => product.images?.[i] ?? "",
  );

  const handleImageChange = (index: number, url: string) => {
    const updated = [...images];
    updated[index] = url;
    onChange({ ...product, images: updated });
  };

  const handleImageClear = (index: number) => {
    const updated = [...images];
    updated[index] = "";
    onChange({ ...product, images: updated });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Paste image URLs (Google Drive or direct
            links) for up to 6 product images.
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-2 space-y-2">
            <Label>Product Name *</Label>
            <Input
              value={product.name ?? ""}
              onChange={(e) => onChange({ ...product, name: e.target.value })}
              placeholder="Solura Whitening Cream"
              data-ocid="admin-product-name"
            />
          </div>
          <div className="space-y-2">
            <Label>Category *</Label>
            <select
              value={product.category ?? "skincare"}
              onChange={(e) =>
                onChange({
                  ...product,
                  category: e.target.value as ProductCategory,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="admin-product-category"
            >
              <option value="skincare">Skincare</option>
              <option value="makeup">Makeup</option>
              <option value="haircare">Haircare</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Price (₹) *</Label>
            <Input
              type="number"
              value={product.price ?? ""}
              onChange={(e) =>
                onChange({ ...product, price: Number(e.target.value) })
              }
              placeholder="1299"
              data-ocid="admin-product-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Original Price (₹)</Label>
            <Input
              type="number"
              value={product.originalPrice ?? ""}
              onChange={(e) =>
                onChange({ ...product, originalPrice: Number(e.target.value) })
              }
              placeholder="1599"
              data-ocid="admin-product-original-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Stock Quantity</Label>
            <Input
              type="number"
              value={product.stock ?? ""}
              onChange={(e) =>
                onChange({ ...product, stock: Number(e.target.value) })
              }
              placeholder="50"
              data-ocid="admin-product-stock"
            />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Short Description</Label>
            <Input
              value={product.shortDescription ?? ""}
              onChange={(e) =>
                onChange({ ...product, shortDescription: e.target.value })
              }
              placeholder="Advanced brightening formula for radiant skin"
              data-ocid="admin-product-short-desc"
            />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Full Description</Label>
            <textarea
              value={product.description ?? ""}
              onChange={(e) =>
                onChange({ ...product, description: e.target.value })
              }
              placeholder="Detailed product description..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="admin-product-desc"
            />
          </div>

          {/* 6-slot image URL inputs */}
          <div className="sm:col-span-2 space-y-3">
            <div>
              <Label>Product Images (up to 6)</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Paste a direct image URL or a local path like{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono">
                  /assets/images/your-image.jpg
                </code>{" "}
                for uploaded images. Image 1 is the primary thumbnail.
              </p>
            </div>
            <div className="space-y-2">
              {(["img1", "img2", "img3", "img4", "img5", "img6"] as const).map(
                (slot, i) => (
                  <div key={slot} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono w-14 flex-shrink-0">
                      Image {i + 1}
                      {i === 0 ? " *" : ""}
                    </span>
                    <ImageUrlInput
                      index={i}
                      url={images[i]}
                      onChange={handleImageChange}
                      onClear={handleImageClear}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-4">
            {[
              {
                key: "isBestseller",
                label: "Bestseller",
                ocid: "admin-product-bestseller",
              },
              { key: "isNew", label: "New Arrival", ocid: "admin-product-new" },
              {
                key: "inStock",
                label: "In Stock",
                ocid: "admin-product-instock",
              },
            ].map(({ key, label, ocid }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={(product[key as keyof Product] as boolean) ?? false}
                  onChange={(e) =>
                    onChange({ ...product, [key]: e.target.checked })
                  }
                  className="rounded border-input"
                  data-ocid={ocid}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin-product-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            data-ocid="admin-product-save"
            disabled={isSaving}
          >
            {isSaving
              ? "Saving…"
              : isEditing
                ? "Update Product"
                : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

interface DeleteConfirmProps {
  open: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmDialog({
  open,
  productName,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-destructive">
            Delete Product?
          </DialogTitle>
          <DialogDescription>
            This will permanently remove{" "}
            <span className="font-semibold text-foreground">{productName}</span>{" "}
            from your store. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            data-ocid="delete-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            data-ocid="delete-confirm"
          >
            Delete Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Banner Management ────────────────────────────────────────────────────────

function BannerManagement() {
  const { data: banners, isLoading, isError } = useBanners();
  const addBanner = useAdminAddBanner();
  const deleteBanner = useAdminDeleteBanner();

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a banner headline.");
      return;
    }
    if (!newImageUrl.trim()) {
      toast.error("Please enter an image URL for the banner.");
      return;
    }
    // Encode title|subtitle in the name field (subtitle is optional)
    const encodedName = newSubtitle.trim()
      ? `${newTitle.trim()}|${newSubtitle.trim()}`
      : newTitle.trim();
    try {
      await addBanner.mutateAsync({
        name: encodedName,
        imageUrl: newImageUrl.trim(),
      });
      toast.success("Banner added! It will appear in the hero slider.");
      setNewTitle("");
      setNewSubtitle("");
      setNewImageUrl("");
      setShowForm(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(`Failed to add banner. ${msg}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBanner.mutateAsync(id);
      toast.success("Banner removed from the slider.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(`Failed to delete banner. ${msg}`);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Hero Slider Banners
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add image banners that appear in the homepage hero slider. Each
            banner shows your image as a full background with your headline over
            it.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="admin-banner-add-toggle"
        >
          {showForm ? (
            <X className="h-4 w-4" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {showForm ? "Cancel" : "Add Banner"}
        </Button>
      </div>

      {/* Add banner form */}
      {showForm && (
        <div className="px-6 py-4 bg-muted/20 border-b border-border space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="banner-title">Headline *</Label>
              <Input
                id="banner-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Reveal Your Natural Glow"
                data-ocid="admin-banner-name-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="banner-subtitle">
                Subtitle{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="banner-subtitle"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="e.g. Chemical-free skincare for real results"
                data-ocid="admin-banner-subtitle-input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="banner-image">Image URL *</Label>
            <Input
              id="banner-image"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://... or /assets/images/banner.jpg"
              data-ocid="admin-banner-image-input"
            />
          </div>
          {newImageUrl && (
            <img
              src={newImageUrl}
              alt="Banner preview"
              className="h-28 w-full rounded-lg object-cover bg-muted/30 border border-border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowForm(false);
                setNewTitle("");
                setNewSubtitle("");
                setNewImageUrl("");
              }}
              data-ocid="admin-banner-cancel"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={addBanner.isPending}
              data-ocid="admin-banner-save"
            >
              {addBanner.isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  Saving…
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add to Slider
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Banner list */}
      {isLoading ? (
        <div className="px-6 py-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading banners…
        </div>
      ) : isError ? (
        <div
          className="px-6 py-8 text-center text-sm text-destructive"
          data-ocid="admin-banners-error"
        >
          Failed to load banners. Please refresh the page.
        </div>
      ) : !banners || banners.length === 0 ? (
        <div className="px-6 py-10 text-center" data-ocid="admin-banners-empty">
          <p className="text-muted-foreground text-sm">No banners added yet.</p>
          <p className="text-xs text-muted-foreground mt-1">
            The hero slider will show default product slides until you add
            banners here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
              data-ocid={`admin-banner-row-${banner.id}`}
            >
              <div className="flex-shrink-0 text-xs text-muted-foreground font-mono w-5 text-center">
                {idx + 1}
              </div>
              <img
                src={
                  banner.imageUrl ||
                  "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg"
                }
                alt={banner.title}
                className="h-16 w-28 rounded-lg object-cover bg-muted/30 flex-shrink-0 border border-border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {banner.title}
                </p>
                {banner.subtitle && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {banner.subtitle}
                  </p>
                )}
                {banner.imageUrl && (
                  <p className="text-[10px] text-muted-foreground/60 truncate mt-0.5 font-mono">
                    {banner.imageUrl}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {deleteTarget === banner.id ? (
                  <>
                    <span className="text-xs text-destructive font-medium">
                      Delete?
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(banner.id)}
                      disabled={deleteBanner.isPending}
                      data-ocid={`admin-banner-confirm-delete-${banner.id}`}
                    >
                      {deleteBanner.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        "Yes"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteTarget(null)}
                      data-ocid={`admin-banner-cancel-delete-${banner.id}`}
                    >
                      No
                    </Button>
                  </>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setDeleteTarget(banner.id)}
                    aria-label="Delete banner"
                    data-ocid={`admin-banner-delete-${banner.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: products, isLoading } = useAdminProducts();
  const createMutation = useAdminCreateProduct();
  const updateMutation = useAdminUpdateProduct();
  const deleteMutation = useAdminDeleteProduct();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] =
    useState<Partial<Product>>(EMPTY_PRODUCT);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }

  const filtered = products?.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async () => {
    if (!editProduct.name || !editProduct.price) {
      toast.error("Product name and price are required.");
      return;
    }
    const images = editProduct.images ?? [];
    if (!images[0]) {
      toast.error(
        "At least one product image URL is required. Please paste an image URL in Image 1.",
      );
      return;
    }
    try {
      if (isEditing && editProduct.id) {
        await updateMutation.mutateAsync({
          id: editProduct.id,
          product: editProduct,
        });
        toast.success("Product updated successfully!");
      } else {
        await createMutation.mutateAsync(editProduct);
        toast.success("Product added successfully!");
      }
      setDialogOpen(false);
      setEditProduct(EMPTY_PRODUCT);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(
        isEditing
          ? `Failed to update product. ${msg || "Please check all fields and try again."}`
          : `Failed to add product. ${msg || "Please check all fields and try again."}`,
      );
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditProduct(EMPTY_PRODUCT);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted`);
    } catch {
      toast.error("Failed to delete product.");
    }
    setDeleteTarget(null);
  };

  return (
    <AdminLayout title="Products">
      <div className="space-y-8">
        {/* Admin note */}
        <div
          className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 text-sm text-foreground space-y-1"
          data-ocid="admin-products-note"
        >
          <p className="font-semibold text-primary">
            💡 Managing Products & Images
          </p>
          <p className="text-muted-foreground">
            All product details — name, price, description, and images — can be
            edited at any time from this panel. To update a product image, click
            the <strong>Edit</strong> button on any product row and paste a new
            image URL in the Image fields. You can also use local paths like{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
              /assets/images/your-image.jpg
            </code>{" "}
            for images uploaded to the site.
          </p>
        </div>

        {/* Products section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
              data-ocid="admin-products-search"
            />
            <Button
              onClick={handleNew}
              className="gap-2"
              data-ocid="admin-add-product"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {isLoading ? (
            <div className="h-48 bg-muted/30 rounded-xl animate-pulse" />
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                        Product
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                        Category
                      </th>
                      <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                        Stock
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                        Status
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
                          colSpan={6}
                          className="px-4 py-12 text-center text-muted-foreground"
                          data-ocid="products-empty-admin"
                        >
                          No products found
                        </td>
                      </tr>
                    )}
                    {filtered?.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`admin-product-row-${product.id}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                product.images[0] ??
                                "/assets/images/placeholder.svg"
                              }
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover bg-muted/30 flex-shrink-0"
                            />
                            <span className="font-medium text-foreground truncate max-w-[140px]">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell capitalize">
                          {product.category}
                        </td>
                        <td className="px-4 py-3 text-right font-display font-semibold text-foreground">
                          ₹{product.price.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">
                          {product.stock}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex gap-1 flex-wrap">
                            {product.isBestseller && (
                              <ProductBadge variant="bestseller" />
                            )}
                            {product.isNew && <ProductBadge variant="new" />}
                            {!product.inStock && (
                              <ProductBadge
                                variant="sale"
                                className="bg-destructive/10 text-destructive"
                              />
                            )}
                            {product.inStock &&
                              !product.isBestseller &&
                              !product.isNew && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                                  Active
                                </span>
                              )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(product)}
                              aria-label="Edit product"
                              data-ocid={`edit-product-${product.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              aria-label="Delete product"
                              data-ocid={`delete-product-${product.id}`}
                              onClick={() => setDeleteTarget(product)}
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

        {/* Banner management */}
        <BannerManagement />
      </div>

      {/* Product dialog */}
      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={editProduct}
        isEditing={isEditing}
        isSaving={createMutation.isPending || updateMutation.isPending}
        onChange={setEditProduct}
        onSave={handleSave}
      />

      {/* Delete confirm */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        productName={deleteTarget?.name ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  );
}
