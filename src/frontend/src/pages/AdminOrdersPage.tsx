import AdminLayout from "@/components/AdminLayout";
import { StatusBadge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";
import type { Order, OrderStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Eye, Printer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// ─── Invoice Preview ──────────────────────────────────────────────────────────

function InvoicePreview({ order }: { order: Order }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background text-foreground">
      {/* Invoice Header */}
      <div className="bg-primary/5 border-b border-border px-6 py-4 flex items-start justify-between">
        <div>
          <span className="font-display text-xl font-bold text-primary">
            Solura Cosmetics
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">
            184, South Manthai Street, Pallapatti, Karur, Tamil Nadu 639205
          </p>
          <p className="text-xs text-muted-foreground">GST: 33AFUFS3776C1ZM</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-foreground">TAX INVOICE</p>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">
            #{order.id}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Bill To */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Bill To
        </p>
        <p className="text-sm font-medium text-foreground">
          {order.shippingAddress.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {order.shippingAddress.email}
        </p>
        <p className="text-xs text-muted-foreground">
          {order.shippingAddress.phone}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} — {order.shippingAddress.pincode}
        </p>
      </div>

      {/* Items */}
      <div className="px-6 py-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs font-medium text-muted-foreground">
                Item
              </th>
              <th className="text-center py-2 text-xs font-medium text-muted-foreground w-12">
                Qty
              </th>
              <th className="text-right py-2 text-xs font-medium text-muted-foreground">
                Price
              </th>
              <th className="text-right py-2 text-xs font-medium text-muted-foreground">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr
                key={`${item.productId}-${item.variantName}`}
                className="border-b border-border/40"
              >
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="h-8 w-8 rounded object-cover bg-muted/30 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {item.productName}
                      </p>
                      {item.variantName && (
                        <p className="text-[10px] text-muted-foreground">
                          {item.variantName}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center text-xs text-muted-foreground">
                  {item.quantity}
                </td>
                <td className="py-2 text-right text-xs text-muted-foreground">
                  ₹{item.price.toLocaleString("en-IN")}
                </td>
                <td className="py-2 text-right text-xs font-medium text-foreground">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-6 pb-4 space-y-1.5">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
        </div>
        {order.codCharge > 0 && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>COD Charge</span>
            <span>₹{order.codCharge}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between text-sm font-display font-bold text-foreground">
          <span>Total</span>
          <span>₹{order.total.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Payment Method</span>
          <span className="capitalize">
            {order.paymentMethod === "razorpay"
              ? "Online (Razorpay)"
              : "Cash on Delivery"}
          </span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Payment Status</span>
          <span className="capitalize">{order.paymentStatus}</span>
        </div>
      </div>

      <div className="px-6 pb-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
          onClick={handlePrint}
          data-ocid="admin-invoice-print"
        >
          <Printer className="h-3.5 w-3.5" />
          Print Invoice
        </Button>
      </div>
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

function OrderDetailModal({
  order,
  onClose,
  onStatusChange,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-3">
            Order Details
            <span className="font-mono text-sm font-normal text-muted-foreground">
              #{order.id}
            </span>
          </DialogTitle>
          <DialogDescription>
            Full order information, customer address, and invoice preview.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Status update */}
          <div className="flex items-center justify-between bg-muted/20 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Current Status:
              </span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Update to:</span>
              <Select
                value={order.status}
                onValueChange={(val) =>
                  onStatusChange(order.id, val as OrderStatus)
                }
              >
                <SelectTrigger
                  className="w-36 h-8 text-xs"
                  data-ocid="order-detail-status-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="capitalize text-xs"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Customer
              </p>
              <p className="text-sm font-medium text-foreground">
                {order.shippingAddress.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {order.shippingAddress.email}
              </p>
              <p className="text-xs text-muted-foreground">
                {order.shippingAddress.phone}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Shipping Address
              </p>
              <p className="text-sm text-foreground">
                {order.shippingAddress.address}
              </p>
              <p className="text-xs text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          <Separator />

          {/* Invoice preview */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Invoice
            </p>
            <InvoicePreview order={order} />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="order-detail-close"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminOrdersPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }

  const filtered = orders?.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.name.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    await updateStatus.mutateAsync({ orderId, status });
    toast.success(`Order ${orderId} updated to ${status}`);
    // Update the selected order if it's open
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search by order ID, name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
            data-ocid="admin-orders-search"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-44"
              data-ocid="admin-orders-status-filter"
            >
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filtered && (
            <span className="text-xs text-muted-foreground ml-auto">
              {filtered.length} order{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
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
                      Order ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Date
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden xl:table-cell">
                      Payment
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
                  {filtered?.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-12 text-center text-muted-foreground"
                        data-ocid="orders-empty-admin"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                  {filtered?.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-order-row-${order.id}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-foreground">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div>
                          <p className="text-sm text-foreground font-medium">
                            {order.shippingAddress.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.shippingAddress.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right font-display font-semibold text-foreground">
                        ₹{order.total.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-muted-foreground capitalize">
                            {order.paymentMethod === "razorpay"
                              ? "Online"
                              : "COD"}
                          </span>
                          <span
                            className={`text-[10px] font-medium capitalize ${
                              order.paymentStatus === "paid"
                                ? "text-primary"
                                : order.paymentStatus === "failed"
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => setSelectedOrder(order)}
                            aria-label="View order details"
                            data-ocid={`admin-order-view-${order.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select
                            value={order.status}
                            onValueChange={(val) =>
                              handleStatusChange(order.id, val as OrderStatus)
                            }
                          >
                            <SelectTrigger
                              className="w-32 h-8 text-xs"
                              data-ocid={`admin-order-status-${order.id}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="capitalize text-xs"
                                >
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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

      {/* Order detail modal */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleStatusChange}
      />
    </AdminLayout>
  );
}
