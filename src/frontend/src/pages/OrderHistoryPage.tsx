import { StatusBadge } from "@/components/Badge";
import Layout from "@/components/Layout";
import { OrderRowSkeleton } from "@/components/LoadingSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCancelOrder, useUserOrders } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { Order, OrderItem } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PAYMENT_LABELS: Record<string, string> = {
  razorpay: "Razorpay",
  cod: "Cash on Delivery",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Package className="h-3.5 w-3.5" />,
  confirmed: <Package className="h-3.5 w-3.5" />,
  processing: <Package className="h-3.5 w-3.5" />,
  shipped: <Truck className="h-3.5 w-3.5" />,
  delivered: <ShoppingBag className="h-3.5 w-3.5" />,
  cancelled: <X className="h-3.5 w-3.5" />,
};

export default function OrderHistoryPage() {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useUserOrders();
  const cancelOrder = useCancelOrder();
  const addItem = useCartStore((s) => s.addItem);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/auth" });
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const handleReorder = (items: OrderItem[]) => {
    for (const item of items) {
      // Reconstruct a minimal product for cart
      const product = {
        id: item.productId,
        name: item.productName,
        slug: item.productId,
        category: "skincare" as const,
        price: item.price,
        description: item.productName,
        shortDescription: "",
        images: [item.productImage],
        rating: 5,
        reviewCount: 0,
        inStock: true,
        stock: 99,
        isBestseller: false,
        isNew: false,
        isLowStock: false,
        tags: [],
        createdAt: "",
        updatedAt: "",
      };
      addItem(product, item.quantity, undefined, item.variantName);
    }
    toast.success("Items added to your bag!", {
      description: "Proceed to checkout to complete purchase.",
    });
    navigate({ to: "/cart" });
  };

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return;
    await cancelOrder.mutateAsync(cancelTarget);
    setCancelTarget(null);
    toast.success("Order cancelled successfully.");
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link
              to="/account"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
              data-ocid="orders-back-link"
            >
              <ArrowLeft className="h-4 w-4" />
              Account
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Order History
            </h1>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((k) => (
                <OrderRowSkeleton key={k} />
              ))}
            </div>
          ) : !orders || orders.length === 0 ? (
            /* Empty state */
            <div
              className="bg-card rounded-2xl border border-border p-16 text-center shadow-soft"
              data-ocid="orders-empty"
            >
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Package className="h-10 w-10 text-primary/50" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                No orders yet
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                You haven't placed any orders yet. Start exploring our natural
                beauty collection!
              </p>
              <Link to="/shop">
                <Button className="gap-2 px-8" data-ocid="orders-shop-now-cta">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            /* Orders list */
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {orders.length} order{orders.length !== 1 ? "s" : ""} found
              </p>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth"
                  data-ocid={`order-row-${order.id}`}
                >
                  {/* Order header bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-muted/30 border-b border-border">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        {STATUS_ICONS[order.status]}
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {order.id}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <StatusBadge status={order.status} />
                      <Badge
                        variant="outline"
                        className="text-xs gap-1 font-body"
                      >
                        <CreditCard className="h-3 w-3" />
                        {PAYMENT_LABELS[order.paymentMethod] ??
                          order.paymentMethod}
                      </Badge>
                    </div>
                    <span className="font-display text-lg font-bold text-foreground">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Items preview */}
                  <div className="px-5 py-4">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                      {order.items.map((item, idx) => (
                        <div
                          key={`${item.productId}-${idx}`}
                          className="flex-shrink-0 flex gap-2.5 items-center bg-muted/20 rounded-xl p-2 border border-border/60"
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-12 w-12 rounded-lg object-cover bg-muted/30"
                          />
                          <div>
                            <p className="text-xs font-semibold text-foreground w-28 truncate">
                              {item.productName}
                            </p>
                            {item.variantName && (
                              <p className="text-xs text-muted-foreground">
                                {item.variantName}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Qty {item.quantity} · ₹
                              {item.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions row */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() => toggleExpand(order.id)}
                        data-ocid={`order-expand-${order.id}`}
                      >
                        {expandedId === order.id ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            View Details
                          </>
                        )}
                      </Button>

                      {order.status === "delivered" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs"
                          onClick={() => handleReorder(order.items)}
                          data-ocid={`reorder-${order.id}`}
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          Reorder
                        </Button>
                      )}

                      {(order.status === "pending" ||
                        order.status === "confirmed") && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/30 gap-1.5 text-xs"
                          onClick={() => setCancelTarget(order.id)}
                          data-ocid={`cancel-${order.id}`}
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel Order
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-xs text-primary hover:text-primary ml-auto"
                        onClick={() => setDetailOrder(order)}
                        data-ocid={`invoice-${order.id}`}
                      >
                        Invoice
                      </Button>
                    </div>

                    {/* Expanded inline details */}
                    {expandedId === order.id && (
                      <div className="mt-4 border-t border-border pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* All items */}
                          <div>
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                              Items Ordered
                            </p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={`exp-${item.productId}-${idx}`}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-foreground truncate max-w-[180px]">
                                    {item.productName}
                                    {item.variantName && (
                                      <span className="text-muted-foreground">
                                        {" "}
                                        ({item.variantName})
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-muted-foreground ml-2 shrink-0">
                                    ×{item.quantity} · ₹
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Subtotal
                                </span>
                                <span>
                                  ₹{order.subtotal.toLocaleString("en-IN")}
                                </span>
                              </div>
                              {order.codCharge > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    COD Charge
                                  </span>
                                  <span>₹{order.codCharge}</span>
                                </div>
                              )}
                              <div className="flex justify-between font-semibold text-foreground">
                                <span>Total</span>
                                <span>
                                  ₹{order.total.toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Delivery address */}
                          <div>
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              Delivery Address
                            </p>
                            <div className="text-sm text-muted-foreground space-y-0.5 bg-muted/30 rounded-xl p-3 border border-border">
                              <p className="font-medium text-foreground">
                                {order.shippingAddress.name}
                              </p>
                              <p>{order.shippingAddress.address}</p>
                              <p>
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.state} —{" "}
                                {order.shippingAddress.pincode}
                              </p>
                              <p>{order.shippingAddress.phone}</p>
                              <p>{order.shippingAddress.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation */}
      <AlertDialog
        open={!!cancelTarget}
        onOpenChange={(v) => {
          if (!v) setCancelTarget(null);
        }}
      >
        <AlertDialogContent data-ocid="cancel-confirm-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl">
              Cancel this order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your order will be marked as
              cancelled and a refund (if applicable) will be initiated within
              5–7 business days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="cancel-confirm-no">
              Keep Order
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleCancelConfirm}
              disabled={cancelOrder.isPending}
              data-ocid="cancel-confirm-yes"
            >
              {cancelOrder.isPending ? "Cancelling…" : "Yes, Cancel Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Invoice / Detail Modal */}
      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
        />
      )}
    </Layout>
  );
}

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  return (
    <Dialog
      open
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-lg" data-ocid="order-detail-modal">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Invoice — {order.id}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          {/* Company header */}
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <p className="font-display text-base font-bold text-foreground">
              Solura Cosmetics
            </p>
            <p className="text-xs text-muted-foreground">
              184, South Manthai Street, Pallapatti, Karur, Tamil Nadu 639205
            </p>
            <p className="text-xs text-muted-foreground">
              GST: 33AFUFS3776C1ZM
            </p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Order Date
              </p>
              <p className="font-medium text-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Status
              </p>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Payment
              </p>
              <p className="font-medium text-foreground">
                {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Payment Status
              </p>
              <p className="font-medium text-foreground capitalize">
                {order.paymentStatus}
              </p>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
              Items
            </p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={`inv-${item.productId}-${idx}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-10 w-10 rounded-lg object-cover bg-muted/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.productName}
                    </p>
                    {item.variantName && (
                      <p className="text-xs text-muted-foreground">
                        {item.variantName}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-primary">Free</span>
            </div>
            {order.codCharge > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>COD Charge</span>
                <span>₹{order.codCharge}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-foreground text-base">
              <span>Total Paid</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <Separator />

          {/* Shipping address */}
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Shipped To
            </p>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p className="font-medium text-foreground">
                {order.shippingAddress.name}
              </p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
                {order.shippingAddress.pincode}
              </p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
