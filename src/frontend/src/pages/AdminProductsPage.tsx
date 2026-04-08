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
import { useAdminProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import type { Banner, Product, ProductCategory } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ImagePlus, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
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

const MOCK_BANNERS: Banner[] = [
  {
    id: "b1",
    title: "Unlock Your Eternal Glow",
    subtitle: "Discover South Indian Beauty Secrets",
    image: "/assets/generated/hero-banner.dim_1400x600.jpg",
    ctaText: "Shop the Collection",
    ctaLink: "/shop",
    isActive: true,
    order: 1,
  },
  {
    id: "b2",
    title: "New Arrivals — Spring Glow",
    subtitle: "Fresh botanicals for luminous skin",
    image: "/assets/generated/hero-product.dim_600x700.jpg",
    ctaText: "Explore Now",
    ctaLink: "/shop/skincare",
    isActive: false,
    order: 2,
  },
];

// ─── Image Upload Slot ────────────────────────────────────────────────────────

interface ImageSlotProps {
  url: string | undefined;
  index: number;
  onUpload: (index: number, url: string) => void;
  onRemove: (index: number) => void;
}

function ImageSlot({ url, index, onUpload, onRemove }: ImageSlotProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Simulate object-storage upload — in production use ExternalBlob
    const objectUrl = URL.createObjectURL(file);
    onUpload(index, objectUrl);
    toast.success(`Image ${index + 1} uploaded`);
  };

  return (
    <div className="relative h-20 w-20 rounded-xl border-2 border-dashed border-border bg-muted/20 overflow-hidden group hover:border-primary/50 transition-smooth flex-shrink-0">
      {url ? (
        <>
          <img src={url} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
            aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="absolute bottom-1 left-1 bg-background/80 text-foreground rounded px-1 text-[9px] font-mono">
            {index + 1}
          </div>
        </>
      ) : (
        <label
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary transition-colors"
          data-ocid={`admin-product-image-slot-${index}`}
        >
          <Upload className="h-4 w-4 mb-1" />
          <span className="text-[9px] font-body">Slot {index + 1}</span>
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

// ─── Product Form Dialog ──────────────────────────────────────────────────────

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Partial<Product>;
  isEditing: boolean;
  onChange: (p: Partial<Product>) => void;
  onSave: () => void;
}

function ProductDialog({
  open,
  onClose,
  product,
  isEditing,
  onChange,
  onSave,
}: ProductDialogProps) {
  const images = product.images ?? [];

  const handleImageUpload = (index: number, url: string) => {
    const updated = [...images];
    updated[index] = url;
    onChange({ ...product, images: updated });
  };

  const handleImageRemove = (index: number) => {
    const updated = [...images];
    updated[index] = "";
    onChange({ ...product, images: updated.filter(Boolean) });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Up to 6 product images can be uploaded.
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-2 space-y-2">
            <Label>Product Name *</Label>
            <Input
              value={product.name ?? ""}
              onChange={(e) => onChange({ ...product, name: e.target.value })}
              placeholder="Kumkumadi Radiance Serum"
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
              <option value="bath-body">Bath &amp; Body</option>
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
              placeholder="Saffron & 16-herb brightening serum"
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

          {/* 6-slot image upload */}
          <div className="sm:col-span-2 space-y-3">
            <Label>Product Images (up to 6)</Label>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <ImageSlot
                  key={i}
                  index={i}
                  url={images[i]}
                  onUpload={handleImageUpload}
                  onRemove={handleImageRemove}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Click a slot to upload. Slot 1 is the primary thumbnail.
            </p>
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
          <Button onClick={onSave} data-ocid="admin-product-save">
            {isEditing ? "Update Product" : "Add Product"}
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
  const [banners, setBanners] = useState<Banner[]>(MOCK_BANNERS);

  const handleDeleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Banner removed");
  };

  const handleToggle = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)),
    );
    toast.success("Banner status updated");
  };

  const handleUpload = () => {
    toast.info("Connect object-storage to upload banner images");
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Banner Management
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage homepage banners and promotional images
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={handleUpload}
          data-ocid="admin-banner-upload"
        >
          <ImagePlus className="h-4 w-4" />
          Upload Banner
        </Button>
      </div>
      <div className="divide-y divide-border">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
            data-ocid={`admin-banner-row-${banner.id}`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-14 w-24 rounded-lg object-cover bg-muted/30 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {banner.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {banner.subtitle}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                CTA: {banner.ctaText} → {banner.ctaLink}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleToggle(banner.id)}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
                  banner.isActive ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={banner.isActive ? "Deactivate" : "Activate"}
                data-ocid={`admin-banner-toggle-${banner.id}`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-card shadow transform transition-transform top-0.5 absolute ${
                    banner.isActive ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-xs ${banner.isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {banner.isActive ? "Active" : "Inactive"}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => handleDeleteBanner(banner.id)}
                aria-label="Delete banner"
                data-ocid={`admin-banner-delete-${banner.id}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: products, isLoading } = useAdminProducts();
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

  const handleSave = () => {
    if (!editProduct.name || !editProduct.price) {
      toast.error("Name and price are required.");
      return;
    }
    toast.success(isEditing ? "Product updated!" : "Product added!");
    setDialogOpen(false);
    setEditProduct(EMPTY_PRODUCT);
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

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    toast.success(`"${deleteTarget.name}" deleted`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout title="Products">
      <div className="space-y-8">
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
