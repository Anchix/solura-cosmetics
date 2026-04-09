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
  useAdminCoupons,
  useAdminCreateCoupon,
  useAdminDeleteCoupon,
  useAdminUpdateCoupon,
} from "@/hooks/useCoupons";
import type { Coupon, CouponInput, DiscountType } from "@/hooks/useCoupons";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Pencil,
  Percent,
  Plus,
  Tag,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_COUPON: CouponInput = {
  code: "",
  discountType: "percentage",
  discountValue: 10,
  minOrderAmount: undefined,
  maxUses: undefined,
  isActive: true,
  expiryDate: undefined,
};

// ─── Coupon Form Dialog ────────────────────────────────────────────────────────

interface CouponDialogProps {
  open: boolean;
  onClose: () => void;
  coupon: CouponInput;
  isEditing: boolean;
  isSaving: boolean;
  onChange: (c: CouponInput) => void;
  onSave: () => void;
}

function CouponDialog({
  open,
  onClose,
  coupon,
  isEditing,
  isSaving,
  onChange,
  onSave,
}: CouponDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEditing ? "Edit Coupon" : "Create New Coupon"}
          </DialogTitle>
          <DialogDescription>
            Configure the discount code details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Coupon Code *</Label>
            <Input
              value={coupon.code}
              onChange={(e) =>
                onChange({
                  ...coupon,
                  code: e.target.value.toUpperCase().replace(/\s+/g, ""),
                })
              }
              placeholder="SAVE20"
              data-ocid="admin-coupon-code"
              className="font-mono uppercase"
            />
            <p className="text-xs text-muted-foreground">
              Letters and numbers only, no spaces.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label>Discount Type *</Label>
            <select
              value={coupon.discountType}
              onChange={(e) =>
                onChange({
                  ...coupon,
                  discountType: e.target.value as DiscountType,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="admin-coupon-type"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label>
              Discount Value *{" "}
              {coupon.discountType === "percentage" ? "(0–100%)" : "(₹ amount)"}
            </Label>
            <Input
              type="number"
              value={coupon.discountValue}
              onChange={(e) =>
                onChange({
                  ...coupon,
                  discountValue: Number(e.target.value),
                })
              }
              min={1}
              max={coupon.discountType === "percentage" ? 100 : undefined}
              placeholder={coupon.discountType === "percentage" ? "10" : "100"}
              data-ocid="admin-coupon-value"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Minimum Order Amount (₹)</Label>
            <Input
              type="number"
              value={coupon.minOrderAmount ?? ""}
              onChange={(e) =>
                onChange({
                  ...coupon,
                  minOrderAmount: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              placeholder="Optional — e.g. 500"
              data-ocid="admin-coupon-min-order"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Max Uses</Label>
            <Input
              type="number"
              value={coupon.maxUses ?? ""}
              onChange={(e) =>
                onChange({
                  ...coupon,
                  maxUses: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Optional — unlimited if blank"
              data-ocid="admin-coupon-max-uses"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label>Expiry Date</Label>
            <Input
              type="date"
              value={coupon.expiryDate ?? ""}
              onChange={(e) =>
                onChange({
                  ...coupon,
                  expiryDate: e.target.value || undefined,
                })
              }
              data-ocid="admin-coupon-expiry"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onChange({ ...coupon, isActive: !coupon.isActive })
              }
              className="flex items-center gap-2 text-sm"
              data-ocid="admin-coupon-active"
            >
              {coupon.isActive ? (
                <ToggleRight className="h-5 w-5 text-primary" />
              ) : (
                <ToggleLeft className="h-5 w-5 text-muted-foreground" />
              )}
              <span
                className={
                  coupon.isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }
              >
                {coupon.isActive ? "Active" : "Inactive"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            data-ocid="admin-coupon-save"
          >
            {isSaving
              ? "Saving…"
              : isEditing
                ? "Update Coupon"
                : "Create Coupon"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm ────────────────────────────────────────────────────────────

interface DeleteConfirmProps {
  open: boolean;
  couponCode: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmDialog({
  open,
  couponCode,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-destructive">
            Delete Coupon?
          </DialogTitle>
          <DialogDescription>
            This will permanently remove coupon{" "}
            <span className="font-mono font-bold text-foreground">
              {couponCode}
            </span>
            . Customers will no longer be able to use it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            data-ocid="delete-coupon-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            data-ocid="delete-coupon-confirm"
          >
            Delete Coupon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminCouponsPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: coupons, isLoading } = useAdminCoupons();
  const createMutation = useAdminCreateCoupon();
  const updateMutation = useAdminUpdateCoupon();
  const deleteMutation = useAdminDeleteCoupon();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState<CouponInput>(EMPTY_COUPON);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);

  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }

  const handleNew = () => {
    setEditCoupon(EMPTY_COUPON);
    setEditId(null);
    setDialogOpen(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditCoupon({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxUses: coupon.maxUses,
      isActive: coupon.isActive,
      expiryDate: coupon.expiryDate,
    });
    setEditId(coupon.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editCoupon.code.trim()) {
      toast.error("Coupon code is required.");
      return;
    }
    if (editCoupon.discountValue <= 0) {
      toast.error("Discount value must be greater than 0.");
      return;
    }
    try {
      if (editId) {
        await updateMutation.mutateAsync({ id: editId, input: editCoupon });
        toast.success("Coupon updated successfully!");
      } else {
        await createMutation.mutateAsync(editCoupon);
        toast.success("Coupon created successfully!");
      }
      setDialogOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(`Failed to save coupon. ${msg}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`Coupon "${deleteTarget.code}" deleted`);
    } catch {
      toast.error("Failed to delete coupon.");
    }
    setDeleteTarget(null);
  };

  return (
    <AdminLayout title="Coupons">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Discount Coupons
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Create and manage coupon codes customers can apply at checkout.
            </p>
          </div>
          <Button
            onClick={handleNew}
            className="gap-2"
            data-ocid="admin-add-coupon"
          >
            <Plus className="h-4 w-4" />
            New Coupon
          </Button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="h-48 bg-muted/30 rounded-xl animate-pulse" />
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Code
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Type
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Value
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                      Min. Order
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Uses
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Expiry
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {!coupons?.length && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-14 text-center"
                        data-ocid="coupons-empty"
                      >
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                          <Tag className="h-10 w-10 opacity-30" />
                          <p className="font-medium">No coupons yet</p>
                          <p className="text-xs max-w-xs">
                            Create your first discount code to offer deals to
                            your customers.
                          </p>
                          <Button
                            size="sm"
                            className="mt-1 gap-1.5"
                            onClick={handleNew}
                          >
                            <Plus className="h-4 w-4" />
                            Create Coupon
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                  {coupons?.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-coupon-row-${coupon.id}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {coupon.discountType === "percentage" ? (
                              <Percent className="h-4 w-4 text-primary" />
                            ) : (
                              <Tag className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <span className="font-mono font-semibold text-foreground">
                            {coupon.code}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize hidden sm:table-cell">
                        {coupon.discountType === "percentage"
                          ? "Percentage"
                          : "Fixed Amount"}
                      </td>
                      <td className="px-4 py-3 text-right font-display font-bold text-primary">
                        {coupon.discountType === "percentage"
                          ? `${coupon.discountValue}%`
                          : `₹${coupon.discountValue}`}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                        {coupon.minOrderAmount
                          ? `₹${coupon.minOrderAmount.toLocaleString("en-IN")}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground hidden lg:table-cell">
                        {coupon.usedCount}
                        {coupon.maxUses ? ` / ${coupon.maxUses}` : ""}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {coupon.expiryDate ?? "No expiry"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            coupon.isActive
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(coupon)}
                            aria-label="Edit coupon"
                            data-ocid={`edit-coupon-${coupon.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteTarget(coupon)}
                            aria-label="Delete coupon"
                            data-ocid={`delete-coupon-${coupon.id}`}
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

      <CouponDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        coupon={editCoupon}
        isEditing={!!editId}
        isSaving={createMutation.isPending || updateMutation.isPending}
        onChange={setEditCoupon}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        couponCode={deleteTarget?.code ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  );
}
