import { d as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DBS95maA.js";
import { A as AdminLayout } from "./AdminLayout-CWp3-BmB.js";
import { c as createLucideIcon, u as useAuthStore, B as Button } from "./sheet-Bi-Q7ojW.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-BAoURZna.js";
import { I as Input } from "./input-ZHQY_1wr.js";
import { L as Label } from "./label-DOSWc5t3.js";
import { a as useAdminCoupons, b as useAdminCreateCoupon, c as useAdminUpdateCoupon, d as useAdminDeleteCoupon } from "./useCoupons-CtLpRhno.js";
import { P as Plus } from "./plus-CbwJydTb.js";
import { T as Tag } from "./tag-BYbxGn68.js";
import { C as Calendar } from "./calendar-DfTUYOPw.js";
import { P as Pencil } from "./pencil-D2Lg15O9.js";
import { T as Trash2 } from "./trash-2-OUC2iiO1.js";
import "./log-out-DVOSqMQw.js";
import "./package-Bdck2MzZ.js";
import "./book-open-CpEgBBFa.js";
import "./chevron-right-CqtOTdwC.js";
import "./index-B0a3ejYA.js";
import "./useMutation-C725G2l4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleLeft = createLucideIcon("toggle-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleRight = createLucideIcon("toggle-right", __iconNode);
const EMPTY_COUPON = {
  code: "",
  discountType: "percentage",
  discountValue: 10,
  minOrderAmount: void 0,
  maxUses: void 0,
  isActive: true,
  expiryDate: void 0
};
function CouponDialog({
  open,
  onClose,
  coupon,
  isEditing,
  isSaving,
  onChange,
  onSave
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEditing ? "Edit Coupon" : "Create New Coupon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Configure the discount code details below." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Coupon Code *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: coupon.code,
            onChange: (e) => onChange({
              ...coupon,
              code: e.target.value.toUpperCase().replace(/\s+/g, "")
            }),
            placeholder: "SAVE20",
            "data-ocid": "admin-coupon-code",
            className: "font-mono uppercase"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Letters and numbers only, no spaces." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount Type *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: coupon.discountType,
            onChange: (e) => onChange({
              ...coupon,
              discountType: e.target.value
            }),
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "admin-coupon-type",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "percentage", children: "Percentage (%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fixed", children: "Fixed Amount (₹)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          "Discount Value *",
          " ",
          coupon.discountType === "percentage" ? "(0–100%)" : "(₹ amount)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: coupon.discountValue,
            onChange: (e) => onChange({
              ...coupon,
              discountValue: Number(e.target.value)
            }),
            min: 1,
            max: coupon.discountType === "percentage" ? 100 : void 0,
            placeholder: coupon.discountType === "percentage" ? "10" : "100",
            "data-ocid": "admin-coupon-value"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Minimum Order Amount (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: coupon.minOrderAmount ?? "",
            onChange: (e) => onChange({
              ...coupon,
              minOrderAmount: e.target.value ? Number(e.target.value) : void 0
            }),
            placeholder: "Optional — e.g. 500",
            "data-ocid": "admin-coupon-min-order"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max Uses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: coupon.maxUses ?? "",
            onChange: (e) => onChange({
              ...coupon,
              maxUses: e.target.value ? Number(e.target.value) : void 0
            }),
            placeholder: "Optional — unlimited if blank",
            "data-ocid": "admin-coupon-max-uses"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: coupon.expiryDate ?? "",
            onChange: (e) => onChange({
              ...coupon,
              expiryDate: e.target.value || void 0
            }),
            "data-ocid": "admin-coupon-expiry"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange({ ...coupon, isActive: !coupon.isActive }),
          className: "flex items-center gap-2 text-sm",
          "data-ocid": "admin-coupon-active",
          children: [
            coupon.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "h-5 w-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: coupon.isActive ? "text-primary font-medium" : "text-muted-foreground",
                children: coupon.isActive ? "Active" : "Inactive"
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onSave,
          disabled: isSaving,
          "data-ocid": "admin-coupon-save",
          children: isSaving ? "Saving…" : isEditing ? "Update Coupon" : "Create Coupon"
        }
      )
    ] })
  ] }) });
}
function DeleteConfirmDialog({
  open,
  couponCode,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Coupon?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "This will permanently remove coupon",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: couponCode }),
        ". Customers will no longer be able to use it."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onCancel,
          "data-ocid": "delete-coupon-cancel",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: onConfirm,
          "data-ocid": "delete-coupon-confirm",
          children: "Delete Coupon"
        }
      )
    ] })
  ] }) });
}
function AdminCouponsPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: coupons, isLoading } = useAdminCoupons();
  const createMutation = useAdminCreateCoupon();
  const updateMutation = useAdminUpdateCoupon();
  const deleteMutation = useAdminDeleteCoupon();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editCoupon, setEditCoupon] = reactExports.useState(EMPTY_COUPON);
  const [editId, setEditId] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }
  const handleNew = () => {
    setEditCoupon(EMPTY_COUPON);
    setEditId(null);
    setDialogOpen(true);
  };
  const handleEdit = (coupon) => {
    setEditCoupon({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxUses: coupon.maxUses,
      isActive: coupon.isActive,
      expiryDate: coupon.expiryDate
    });
    setEditId(coupon.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    if (!editCoupon.code.trim()) {
      ue.error("Coupon code is required.");
      return;
    }
    if (editCoupon.discountValue <= 0) {
      ue.error("Discount value must be greater than 0.");
      return;
    }
    try {
      if (editId) {
        await updateMutation.mutateAsync({ id: editId, input: editCoupon });
        ue.success("Coupon updated successfully!");
      } else {
        await createMutation.mutateAsync(editCoupon);
        ue.success("Coupon created successfully!");
      }
      setDialogOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      ue.error(`Failed to save coupon. ${msg}`);
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success(`Coupon "${deleteTarget.code}" deleted`);
    } catch {
      ue.error("Failed to delete coupon.");
    }
    setDeleteTarget(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Coupons", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Discount Coupons" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Create and manage coupon codes customers can apply at checkout." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNew,
            className: "gap-2",
            "data-ocid": "admin-add-coupon",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "New Coupon"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted/30 rounded-xl animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell", children: "Min. Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Uses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Expiry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          !(coupons == null ? void 0 : coupons.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 8,
              className: "px-4 py-14 text-center",
              "data-ocid": "coupons-empty",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-10 w-10 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No coupons yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs max-w-xs", children: "Create your first discount code to offer deals to your customers." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "mt-1 gap-1.5",
                    onClick: handleNew,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                      "Create Coupon"
                    ]
                  }
                )
              ] })
            }
          ) }),
          coupons == null ? void 0 : coupons.map((coupon) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": `admin-coupon-row-${coupon.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: coupon.discountType === "percentage" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: coupon.code })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground capitalize hidden sm:table-cell", children: coupon.discountType === "percentage" ? "Percentage" : "Fixed Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-display font-bold text-primary", children: coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground hidden md:table-cell", children: coupon.minOrderAmount ? `₹${coupon.minOrderAmount.toLocaleString("en-IN")}` : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground hidden lg:table-cell", children: [
                  coupon.usedCount,
                  coupon.maxUses ? ` / ${coupon.maxUses}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  coupon.expiryDate ?? "No expiry"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${coupon.isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                    children: coupon.isActive ? "Active" : "Inactive"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      onClick: () => handleEdit(coupon),
                      "aria-label": "Edit coupon",
                      "data-ocid": `edit-coupon-${coupon.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => setDeleteTarget(coupon),
                      "aria-label": "Delete coupon",
                      "data-ocid": `delete-coupon-${coupon.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] }) })
              ]
            },
            coupon.id
          ))
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CouponDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        coupon: editCoupon,
        isEditing: !!editId,
        isSaving: createMutation.isPending || updateMutation.isPending,
        onChange: setEditCoupon,
        onSave: handleSave
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        open: !!deleteTarget,
        couponCode: (deleteTarget == null ? void 0 : deleteTarget.code) ?? "",
        onConfirm: handleConfirmDelete,
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
export {
  AdminCouponsPage as default
};
