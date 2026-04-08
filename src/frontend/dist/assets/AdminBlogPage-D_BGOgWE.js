import { d as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-BYwbnXHo.js";
import { A as AdminLayout } from "./AdminLayout-Tp-aKZaD.js";
import { u as useAuthStore, B as Button, X } from "./authStore-bVvk2SIb.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Dq54NDRN.js";
import { I as Input } from "./input-CQNpYXih.js";
import { L as Label } from "./label-BQccOJNV.js";
import { u as useAdminListAllBlogPosts, a as useAdminCreateBlogPost, b as useAdminUpdateBlogPost, c as useAdminDeleteBlogPost, C as Calendar } from "./useBlog-DbQGyHMj.js";
import { P as Plus } from "./plus-UUG32RCm.js";
import { B as BookOpen } from "./book-open-ztOrSX2C.js";
import { P as Pencil, U as Upload } from "./upload-kZQXpoXe.js";
import { T as Trash2 } from "./trash-2-CkqsbYgS.js";
import "./log-out-CWlpqAcE.js";
import "./package-DSIGmOwv.js";
import "./chevron-right-B73qp2IS.js";
import "./index-CB7yveq3.js";
import "./backend-C0WYxHKI.js";
import "./useMutation-ybpFZUfc.js";
const BLOG_CATEGORIES = [
  "Skincare Tips",
  "Beauty Trends",
  "Product News",
  "Tutorials",
  "Brand Updates"
];
const EMPTY_INPUT = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Skincare Tips",
  author: "Solura Team",
  status: "draft",
  content: ""
};
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function CoverImageSlot({ url, onUpload, onRemove }) {
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onUpload(objectUrl);
    ue.success("Cover image uploaded");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-40 w-full rounded-xl border-2 border-dashed border-border bg-muted/20 overflow-hidden group hover:border-primary/50 transition-smooth", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "Cover", className: "w-full h-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onRemove,
        className: "absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
        "aria-label": "Remove cover image",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "label",
    {
      className: "w-full h-full flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary transition-colors gap-2",
      "data-ocid": "admin-blog-cover-upload",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body", children: "Upload Cover Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "JPG, PNG or WebP recommended" }),
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
function BlogDialog({
  open,
  onClose,
  input,
  isEditing,
  onChange,
  onSave,
  isSaving
}) {
  const handleTitleChange = (title) => {
    onChange({
      ...input,
      title,
      slug: isEditing ? input.slug : slugify(title)
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEditing ? "Edit Blog Post" : "New Blog Post" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Fill in the details below. Draft posts are not visible to customers." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: input.title,
            onChange: (e) => handleTitleChange(e.target.value),
            placeholder: "5 Skincare Secrets for a Natural Glow",
            "data-ocid": "admin-blog-title"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: input.slug,
            onChange: (e) => onChange({ ...input, slug: e.target.value }),
            placeholder: "5-skincare-secrets-natural-glow",
            "data-ocid": "admin-blog-slug"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: input.category,
            onChange: (e) => onChange({ ...input, category: e.target.value }),
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "admin-blog-category",
            children: BLOG_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Author *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: input.author,
            onChange: (e) => onChange({ ...input, author: e.target.value }),
            placeholder: "Solura Team",
            "data-ocid": "admin-blog-author"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          "Excerpt",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
            "(",
            input.excerpt.length,
            "/200)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: input.excerpt,
            onChange: (e) => onChange({
              ...input,
              excerpt: e.target.value.slice(0, 200)
            }),
            placeholder: "A short summary shown on the blog listing page...",
            rows: 2,
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
            "data-ocid": "admin-blog-excerpt"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Content *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: input.content,
            onChange: (e) => onChange({ ...input, content: e.target.value }),
            placeholder: "Write your full blog post content here...",
            rows: 10,
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y",
            "data-ocid": "admin-blog-content"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cover Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CoverImageSlot,
          {
            url: input.coverImage,
            onUpload: (url) => onChange({ ...input, coverImage: url }),
            onRemove: () => onChange({ ...input, coverImage: void 0 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Publication Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["draft", "published"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange({ ...input, status: s }),
            className: `px-4 py-2 rounded-lg text-sm font-medium transition-smooth border ${input.status === s ? s === "published" ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-foreground border-border" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`,
            "data-ocid": `admin-blog-status-${s}`,
            children: s === "draft" ? "Draft" : "Published"
          },
          s
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          "data-ocid": "admin-blog-cancel",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onSave,
          disabled: isSaving,
          "data-ocid": "admin-blog-save",
          children: isSaving ? "Saving..." : isEditing ? "Update Post" : "Publish Post"
        }
      )
    ] })
  ] }) });
}
function DeleteConfirmDialog({
  open,
  postTitle,
  onConfirm,
  onCancel,
  isDeleting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Blog Post?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "This will permanently remove",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          '"',
          postTitle,
          '"'
        ] }),
        ". This action cannot be undone."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onCancel,
          disabled: isDeleting,
          "data-ocid": "admin-blog-delete-cancel",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: onConfirm,
          disabled: isDeleting,
          "data-ocid": "admin-blog-delete-confirm",
          children: isDeleting ? "Deleting..." : "Delete Post"
        }
      )
    ] })
  ] }) });
}
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status === "published" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
      children: status === "published" ? "Published" : "Draft"
    }
  );
}
function AdminBlogPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: posts, isLoading } = useAdminListAllBlogPosts();
  const createMutation = useAdminCreateBlogPost();
  const updateMutation = useAdminUpdateBlogPost();
  const deleteMutation = useAdminDeleteBlogPost();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editInput, setEditInput] = reactExports.useState(EMPTY_INPUT);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }
  const filtered = posts == null ? void 0 : posts.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase())
  );
  const handleNew = () => {
    setEditInput(EMPTY_INPUT);
    setEditingId(null);
    setDialogOpen(true);
  };
  const handleEdit = (post) => {
    setEditInput({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      status: post.status,
      content: post.content,
      coverImage: post.coverImage
    });
    setEditingId(post.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    if (!editInput.title.trim()) {
      ue.error("Title is required.");
      return;
    }
    if (!editInput.content.trim()) {
      ue.error("Content is required.");
      return;
    }
    if (!editInput.slug.trim()) {
      ue.error("Slug is required.");
      return;
    }
    try {
      if (editingId !== null) {
        await updateMutation.mutateAsync({ id: editingId, input: editInput });
        ue.success("Blog post updated!");
      } else {
        await createMutation.mutateAsync(editInput);
        ue.success("Blog post created!");
      }
      setDialogOpen(false);
      setEditInput(EMPTY_INPUT);
      setEditingId(null);
    } catch {
      ue.error("Failed to save. Please try again.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success(`"${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete. Please try again.");
    }
  };
  const isSaving = createMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Blog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search posts...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "max-w-xs",
            "data-ocid": "admin-blog-search"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNew,
            className: "gap-2",
            "data-ocid": "admin-add-blog-post",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "New Post"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-16 bg-muted/30 rounded-xl animate-pulse"
        },
        i
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          (filtered == null ? void 0 : filtered.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 5,
              className: "px-4 py-16 text-center",
              "data-ocid": "blog-posts-empty",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: search ? "No posts match your search" : "No blog posts yet. Create your first post!" }),
                !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: handleNew,
                    className: "gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                      "Create First Post"
                    ]
                  }
                )
              ] })
            }
          ) }),
          filtered == null ? void 0 : filtered.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": `admin-blog-row-${post.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  post.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: post.coverImage,
                      alt: post.title,
                      className: "h-10 w-16 rounded-lg object-cover bg-muted/30 flex-shrink-0"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-16 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[160px]", children: post.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate max-w-[160px]", children: [
                      "by ",
                      post.author
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: post.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: post.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                  formatDate(post.createdAt)
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      onClick: () => handleEdit(post),
                      "aria-label": "Edit post",
                      "data-ocid": `edit-blog-${post.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => setDeleteTarget(post),
                      "aria-label": "Delete post",
                      "data-ocid": `delete-blog-${post.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] }) })
              ]
            },
            String(post.id)
          ))
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BlogDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        input: editInput,
        isEditing: editingId !== null,
        onChange: setEditInput,
        onSave: handleSave,
        isSaving
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        open: !!deleteTarget,
        postTitle: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onConfirm: handleConfirmDelete,
        onCancel: () => setDeleteTarget(null),
        isDeleting: deleteMutation.isPending
      }
    )
  ] });
}
export {
  AdminBlogPage as default
};
