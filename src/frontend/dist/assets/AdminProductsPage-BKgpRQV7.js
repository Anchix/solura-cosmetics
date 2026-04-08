import { d as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-BYwbnXHo.js";
import { A as AdminLayout } from "./AdminLayout-Tp-aKZaD.js";
import { P as ProductBadge } from "./Badge-DEZ1nedM.js";
import { u as useAuthStore, B as Button, X } from "./authStore-bVvk2SIb.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Dq54NDRN.js";
import { I as Input } from "./input-CQNpYXih.js";
import { L as Label } from "./label-BQccOJNV.js";
import { f as useAdminProducts } from "./useProducts-C-l9iLD-.js";
import { P as Plus } from "./plus-UUG32RCm.js";
import { P as Pencil, U as Upload } from "./upload-kZQXpoXe.js";
import { T as Trash2 } from "./trash-2-CkqsbYgS.js";
import { I as ImagePlus } from "./image-plus-CvlVyiyZ.js";
import "./log-out-CWlpqAcE.js";
import "./package-DSIGmOwv.js";
import "./book-open-ztOrSX2C.js";
import "./chevron-right-B73qp2IS.js";
import "./index-CB7yveq3.js";
import "./useMutation-ybpFZUfc.js";
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
const MOCK_BANNERS = [
  {
    id: "b1",
    title: "Unlock Your Eternal Glow",
    subtitle: "Discover South Indian Beauty Secrets",
    image: "/assets/generated/hero-banner.dim_1400x600.jpg",
    ctaText: "Shop the Collection",
    ctaLink: "/shop",
    isActive: true,
    order: 1
  },
  {
    id: "b2",
    title: "New Arrivals — Spring Glow",
    subtitle: "Fresh botanicals for luminous skin",
    image: "/assets/generated/hero-product.dim_600x700.jpg",
    ctaText: "Explore Now",
    ctaLink: "/shop/skincare",
    isActive: false,
    order: 2
  }
];
function ImageSlot({ url, index, onUpload, onRemove }) {
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onUpload(index, objectUrl);
    ue.success(`Image ${index + 1} uploaded`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-20 w-20 rounded-xl border-2 border-dashed border-border bg-muted/20 overflow-hidden group hover:border-primary/50 transition-smooth flex-shrink-0", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "w-full h-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onRemove(index),
        className: "absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
        "aria-label": "Remove image",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 left-1 bg-background/80 text-foreground rounded px-1 text-[9px] font-mono", children: index + 1 })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "label",
    {
      className: "w-full h-full flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary transition-colors",
      "data-ocid": `admin-product-image-slot-${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-body", children: [
          "Slot ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "sr-only",
            onChange: handleFileChange
          }
        )
      ]
    }
  ) });
}
function ProductDialog({
  open,
  onClose,
  product,
  isEditing,
  onChange,
  onSave
}) {
  const images = product.images ?? [];
  const handleImageUpload = (index, url) => {
    const updated = [...images];
    updated[index] = url;
    onChange({ ...product, images: updated });
  };
  const handleImageRemove = (index) => {
    const updated = [...images];
    updated[index] = "";
    onChange({ ...product, images: updated.filter(Boolean) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEditing ? "Edit Product" : "Add New Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Fill in the details below. Up to 6 product images can be uploaded." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: product.name ?? "",
            onChange: (e) => onChange({ ...product, name: e.target.value }),
            placeholder: "Kumkumadi Radiance Serum",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "haircare", children: "Haircare" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bath-body", children: "Bath & Body" })
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
            placeholder: "Saffron & 16-herb brightening serum",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Images (up to 6)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: Array.from({ length: 6 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ImageSlot,
          {
            index: i,
            url: images[i],
            onUpload: handleImageUpload,
            onRemove: handleImageRemove
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click a slot to upload. Slot 1 is the primary thumbnail." })
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, "data-ocid": "admin-product-save", children: isEditing ? "Update Product" : "Add Product" })
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
  const [banners, setBanners] = reactExports.useState(MOCK_BANNERS);
  const handleDeleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    ue.success("Banner removed");
  };
  const handleToggle = (id) => {
    setBanners(
      (prev) => prev.map((b) => b.id === id ? { ...b, isActive: !b.isActive } : b)
    );
    ue.success("Banner status updated");
  };
  const handleUpload = () => {
    ue.info("Connect object-storage to upload banner images");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Banner Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage homepage banners and promotional images" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "gap-2",
          onClick: handleUpload,
          "data-ocid": "admin-banner-upload",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }),
            "Upload Banner"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: banners.map((banner) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors",
        "data-ocid": `admin-banner-row-${banner.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: banner.image,
              alt: banner.title,
              className: "h-14 w-24 rounded-lg object-cover bg-muted/30 flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: banner.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: banner.subtitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "CTA: ",
              banner.ctaText,
              " → ",
              banner.ctaLink
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleToggle(banner.id),
                className: `relative inline-flex h-5 w-9 rounded-full transition-colors ${banner.isActive ? "bg-primary" : "bg-muted-foreground/30"}`,
                "aria-label": banner.isActive ? "Deactivate" : "Activate",
                "data-ocid": `admin-banner-toggle-${banner.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-block h-4 w-4 rounded-full bg-card shadow transform transition-transform top-0.5 absolute ${banner.isActive ? "translate-x-4" : "translate-x-0.5"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs ${banner.isActive ? "text-primary" : "text-muted-foreground"}`,
                children: banner.isActive ? "Active" : "Inactive"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "icon",
                variant: "ghost",
                className: "h-8 w-8 text-destructive hover:text-destructive",
                onClick: () => handleDeleteBanner(banner.id),
                "aria-label": "Delete banner",
                "data-ocid": `admin-banner-delete-${banner.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
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
  const handleSave = () => {
    if (!editProduct.name || !editProduct.price) {
      ue.error("Name and price are required.");
      return;
    }
    ue.success(isEditing ? "Product updated!" : "Product added!");
    setDialogOpen(false);
    setEditProduct(EMPTY_PRODUCT);
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
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    ue.success(`"${deleteTarget.name}" deleted`);
    setDeleteTarget(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Products", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
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
