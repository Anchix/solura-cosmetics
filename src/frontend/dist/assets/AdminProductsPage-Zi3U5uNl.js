import { d as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DBS95maA.js";
import { A as AdminLayout } from "./AdminLayout-CWp3-BmB.js";
import { P as ProductBadge } from "./Badge-CK9LYXQ5.js";
import { u as useAuthStore, B as Button, X } from "./sheet-Bi-Q7ojW.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-BAoURZna.js";
import { I as Input } from "./input-ZHQY_1wr.js";
import { L as Label } from "./label-DOSWc5t3.js";
import { g as useAdminProducts, h as useAdminCreateProduct, i as useAdminUpdateProduct, j as useAdminDeleteProduct, u as useBanners, k as useAdminAddBanner, l as useAdminDeleteBanner } from "./useProducts-V6WZMPVQ.js";
import { P as Plus } from "./plus-CbwJydTb.js";
import { P as Pencil } from "./pencil-D2Lg15O9.js";
import { T as Trash2 } from "./trash-2-OUC2iiO1.js";
import { I as ImagePlus } from "./image-plus-CR2973xi.js";
import { L as LoaderCircle } from "./loader-circle-BQjy2lRM.js";
import "./log-out-DVOSqMQw.js";
import "./package-Bdck2MzZ.js";
import "./book-open-CpEgBBFa.js";
import "./tag-BYbxGn68.js";
import "./chevron-right-CqtOTdwC.js";
import "./index-B0a3ejYA.js";
import "./useMutation-C725G2l4.js";
const EMPTY_PRODUCT = {
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
  tags: []
};
function ImageUrlInput({ url, index, onChange, onClear }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: url,
          onChange: (e) => onChange(index, e.target.value),
          placeholder: "/assets/images/your-product.jpg  or  https://...",
          className: "pr-8 text-xs",
          "data-ocid": `admin-product-image-url-${index}`
        }
      ),
      url && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onClear(index),
          className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": `Clear image ${index + 1} URL`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
        }
      )
    ] }),
    url && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: url,
        alt: `Preview ${index + 1}`,
        className: "h-10 w-10 rounded-lg object-cover bg-muted/30 flex-shrink-0 border border-border",
        onError: (e) => {
          e.target.style.display = "none";
        }
      }
    )
  ] }) });
}
function ProductDialog({
  open,
  onClose,
  product,
  isEditing,
  isSaving,
  onChange,
  onSave
}) {
  const images = Array.from(
    { length: 6 },
    (_, i) => {
      var _a;
      return ((_a = product.images) == null ? void 0 : _a[i]) ?? "";
    }
  );
  const handleImageChange = (index, url) => {
    const updated = [...images];
    updated[index] = url;
    onChange({ ...product, images: updated });
  };
  const handleImageClear = (index) => {
    const updated = [...images];
    updated[index] = "";
    onChange({ ...product, images: updated });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEditing ? "Edit Product" : "Add New Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Fill in the details below. Paste image URLs (Google Drive or direct links) for up to 6 product images." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: product.name ?? "",
            onChange: (e) => onChange({ ...product, name: e.target.value }),
            placeholder: "Solura Whitening Cream",
            "data-ocid": "admin-product-name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: product.category ?? "skincare",
            onChange: (e) => onChange({
              ...product,
              category: e.target.value
            }),
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "admin-product-category",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "skincare", children: "Skincare" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "makeup", children: "Makeup" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "haircare", children: "Haircare" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (₹) *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: product.price ?? "",
            onChange: (e) => onChange({ ...product, price: Number(e.target.value) }),
            placeholder: "1299",
            "data-ocid": "admin-product-price"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Original Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: product.originalPrice ?? "",
            onChange: (e) => onChange({ ...product, originalPrice: Number(e.target.value) }),
            placeholder: "1599",
            "data-ocid": "admin-product-original-price"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Stock Quantity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: product.stock ?? "",
            onChange: (e) => onChange({ ...product, stock: Number(e.target.value) }),
            placeholder: "50",
            "data-ocid": "admin-product-stock"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Short Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: product.shortDescription ?? "",
            onChange: (e) => onChange({ ...product, shortDescription: e.target.value }),
            placeholder: "Advanced brightening formula for radiant skin",
            "data-ocid": "admin-product-short-desc"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: product.description ?? "",
            onChange: (e) => onChange({ ...product, description: e.target.value }),
            placeholder: "Detailed product description...",
            rows: 4,
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
            "data-ocid": "admin-product-desc"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Images (up to 6)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Paste a direct image URL or a local path like",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-[10px] font-mono", children: "/assets/images/your-image.jpg" }),
            " ",
            "for uploaded images. Image 1 is the primary thumbnail."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["img1", "img2", "img3", "img4", "img5", "img6"].map(
          (slot, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono w-14 flex-shrink-0", children: [
              "Image ",
              i + 1,
              i === 0 ? " *" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageUrlInput,
              {
                index: i,
                url: images[i],
                onChange: handleImageChange,
                onClear: handleImageClear
              }
            )
          ] }, slot)
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex flex-wrap gap-4", children: [
        {
          key: "isBestseller",
          label: "Bestseller",
          ocid: "admin-product-bestseller"
        },
        { key: "isNew", label: "New Arrival", ocid: "admin-product-new" },
        {
          key: "inStock",
          label: "In Stock",
          ocid: "admin-product-instock"
        }
      ].map(({ key, label, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2 cursor-pointer text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: product[key] ?? false,
                onChange: (e) => onChange({ ...product, [key]: e.target.checked }),
                className: "rounded border-input",
                "data-ocid": ocid
              }
            ),
            label
          ]
        },
        key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          "data-ocid": "admin-product-cancel",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onSave,
          "data-ocid": "admin-product-save",
          disabled: isSaving,
          children: isSaving ? "Saving…" : isEditing ? "Update Product" : "Add Product"
        }
      )
    ] })
  ] }) });
}
function DeleteConfirmDialog({
  open,
  productName,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Product?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "This will permanently remove",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: productName }),
        " ",
        "from your store. This action cannot be undone."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onCancel,
          "data-ocid": "delete-cancel",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: onConfirm,
          "data-ocid": "delete-confirm",
          children: "Delete Product"
        }
      )
    ] })
  ] }) });
}
function BannerManagement() {
  const { data: banners, isLoading, isError } = useBanners();
  const addBanner = useAdminAddBanner();
  const deleteBanner = useAdminDeleteBanner();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newTitle, setNewTitle] = reactExports.useState("");
  const [newSubtitle, setNewSubtitle] = reactExports.useState("");
  const [newImageUrl, setNewImageUrl] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handleAdd = async () => {
    if (!newTitle.trim()) {
      ue.error("Please enter a banner headline.");
      return;
    }
    if (!newImageUrl.trim()) {
      ue.error("Please enter an image URL for the banner.");
      return;
    }
    const encodedName = newSubtitle.trim() ? `${newTitle.trim()}|${newSubtitle.trim()}` : newTitle.trim();
    try {
      await addBanner.mutateAsync({
        name: encodedName,
        imageUrl: newImageUrl.trim()
      });
      ue.success("Banner added! It will appear in the hero slider.");
      setNewTitle("");
      setNewSubtitle("");
      setNewImageUrl("");
      setShowForm(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      ue.error(`Failed to add banner. ${msg}`);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteBanner.mutateAsync(id);
      ue.success("Banner removed from the slider.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      ue.error(`Failed to delete banner. ${msg}`);
    }
    setDeleteTarget(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Hero Slider Banners" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Add image banners that appear in the homepage hero slider. Each banner shows your image as a full background with your headline over it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2",
          onClick: () => setShowForm((v) => !v),
          "data-ocid": "admin-banner-add-toggle",
          children: [
            showForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }),
            showForm ? "Cancel" : "Add Banner"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-muted/20 border-b border-border space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "banner-title", children: "Headline *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "banner-title",
              value: newTitle,
              onChange: (e) => setNewTitle(e.target.value),
              placeholder: "e.g. Reveal Your Natural Glow",
              "data-ocid": "admin-banner-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "banner-subtitle", children: [
            "Subtitle",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "banner-subtitle",
              value: newSubtitle,
              onChange: (e) => setNewSubtitle(e.target.value),
              placeholder: "e.g. Chemical-free skincare for real results",
              "data-ocid": "admin-banner-subtitle-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "banner-image", children: "Image URL *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "banner-image",
            value: newImageUrl,
            onChange: (e) => setNewImageUrl(e.target.value),
            placeholder: "https://... or /assets/images/banner.jpg",
            "data-ocid": "admin-banner-image-input"
          }
        )
      ] }),
      newImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: newImageUrl,
          alt: "Banner preview",
          className: "h-28 w-full rounded-lg object-cover bg-muted/30 border border-border",
          onError: (e) => {
            e.target.style.display = "none";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              setShowForm(false);
              setNewTitle("");
              setNewSubtitle("");
              setNewImageUrl("");
            },
            "data-ocid": "admin-banner-cancel",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: handleAdd,
            disabled: addBanner.isPending,
            "data-ocid": "admin-banner-save",
            children: addBanner.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin mr-1.5" }),
              "Saving…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Add to Slider"
            ] })
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 flex items-center justify-center gap-2 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Loading banners…"
    ] }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-6 py-8 text-center text-sm text-destructive",
        "data-ocid": "admin-banners-error",
        children: "Failed to load banners. Please refresh the page."
      }
    ) : !banners || banners.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 text-center", "data-ocid": "admin-banners-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No banners added yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "The hero slider will show default product slides until you add banners here." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: banners.map((banner, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors",
        "data-ocid": `admin-banner-row-${banner.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 text-xs text-muted-foreground font-mono w-5 text-center", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: banner.imageUrl || "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg",
              alt: banner.title,
              className: "h-16 w-28 rounded-lg object-cover bg-muted/30 flex-shrink-0 border border-border",
              onError: (e) => {
                e.target.src = "/assets/images/img-20260316-wa0004-019d71db-72fb-75fa-b051-70700f8c04a9.jpg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: banner.title }),
            banner.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: banner.subtitle }),
            banner.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 truncate mt-0.5 font-mono", children: banner.imageUrl })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: deleteTarget === banner.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Delete?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: () => handleDelete(banner.id),
                disabled: deleteBanner.isPending,
                "data-ocid": `admin-banner-confirm-delete-${banner.id}`,
                children: deleteBanner.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : "Yes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => setDeleteTarget(null),
                "data-ocid": `admin-banner-cancel-delete-${banner.id}`,
                children: "No"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => setDeleteTarget(banner.id),
              "aria-label": "Delete banner",
              "data-ocid": `admin-banner-delete-${banner.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          ) })
        ]
      },
      banner.id
    )) })
  ] });
}
function AdminProductsPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: products, isLoading } = useAdminProducts();
  const createMutation = useAdminCreateProduct();
  const updateMutation = useAdminUpdateProduct();
  const deleteMutation = useAdminDeleteProduct();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editProduct, setEditProduct] = reactExports.useState(EMPTY_PRODUCT);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }
  const filtered = products == null ? void 0 : products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );
  const handleSave = async () => {
    if (!editProduct.name || !editProduct.price) {
      ue.error("Product name and price are required.");
      return;
    }
    const images = editProduct.images ?? [];
    if (!images[0]) {
      ue.error(
        "At least one product image URL is required. Please paste an image URL in Image 1."
      );
      return;
    }
    try {
      if (isEditing && editProduct.id) {
        await updateMutation.mutateAsync({
          id: editProduct.id,
          product: editProduct
        });
        ue.success("Product updated successfully!");
      } else {
        await createMutation.mutateAsync(editProduct);
        ue.success("Product added successfully!");
      }
      setDialogOpen(false);
      setEditProduct(EMPTY_PRODUCT);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      ue.error(
        isEditing ? `Failed to update product. ${msg || "Please check all fields and try again."}` : `Failed to add product. ${msg || "Please check all fields and try again."}`
      );
    }
  };
  const handleEdit = (product) => {
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
      ue.success(`"${deleteTarget.name}" deleted`);
    } catch {
      ue.error("Failed to delete product.");
    }
    setDeleteTarget(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Products", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 text-sm text-foreground space-y-1",
          "data-ocid": "admin-products-note",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary", children: "💡 Managing Products & Images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "All product details — name, price, description, and images — can be edited at any time from this panel. To update a product image, click the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Edit" }),
              " button on any product row and paste a new image URL in the Image fields. You can also use local paths like",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-xs font-mono", children: "/assets/images/your-image.jpg" }),
              " ",
              "for images uploaded to the site."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search products...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "max-w-xs",
              "data-ocid": "admin-products-search"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleNew,
              className: "gap-2",
              "data-ocid": "admin-add-product",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Add Product"
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted/30 rounded-xl animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
            (filtered == null ? void 0 : filtered.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 6,
                className: "px-4 py-12 text-center text-muted-foreground",
                "data-ocid": "products-empty-admin",
                children: "No products found"
              }
            ) }),
            filtered == null ? void 0 : filtered.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors",
                "data-ocid": `admin-product-row-${product.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.images[0] ?? "/assets/images/placeholder.svg",
                        alt: product.name,
                        className: "h-10 w-10 rounded-lg object-cover bg-muted/30 flex-shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[140px]", children: product.name })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell capitalize", children: product.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-display font-semibold text-foreground", children: [
                    "₹",
                    product.price.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground hidden sm:table-cell", children: product.stock }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-wrap", children: [
                    product.isBestseller && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "bestseller" }),
                    product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductBadge, { variant: "new" }),
                    !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ProductBadge,
                      {
                        variant: "sale",
                        className: "bg-destructive/10 text-destructive"
                      }
                    ),
                    product.inStock && !product.isBestseller && !product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground", children: "Active" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        onClick: () => handleEdit(product),
                        "aria-label": "Edit product",
                        "data-ocid": `edit-product-${product.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "text-destructive hover:text-destructive hover:bg-destructive/10",
                        "aria-label": "Delete product",
                        "data-ocid": `delete-product-${product.id}`,
                        onClick: () => setDeleteTarget(product),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                      }
                    )
                  ] }) })
                ]
              },
              product.id
            ))
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BannerManagement, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        product: editProduct,
        isEditing,
        isSaving: createMutation.isPending || updateMutation.isPending,
        onChange: setEditProduct,
        onSave: handleSave
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        open: !!deleteTarget,
        productName: (deleteTarget == null ? void 0 : deleteTarget.name) ?? "",
        onConfirm: handleConfirmDelete,
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
export {
  AdminProductsPage as default
};
