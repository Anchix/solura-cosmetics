import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder } from "@/hooks/useOrders";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  MapPin,
  Package,
} from "lucide-react";

const COMPANY = {
  name: "Solura Cosmetics",
  address: "184, South Manthai Street, Pallapatti, Karur, Tamil Nadu 639205",
  gst: "33AFUFS3776C1ZM",
  email: "contact@soluracosmo.com",
  tagline: "Reveal Your Natural Glow",
};

const GST_RATE = 0.18;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OrderSuccessPage() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const { data: order, isLoading } = useOrder(orderId);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Order not found
          </h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your order. Please check your order history.
          </p>
          <Link to="/account/orders">
            <Button>View Order History</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const gst = Math.round(order.subtotal * GST_RATE);

  return (
    <Layout>
      {/* Print styles injected globally */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-section, #invoice-section * { visibility: visible; }
          #invoice-section { position: fixed; top: 0; left: 0; width: 100%; padding: 2rem; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="bg-muted/30 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Success header — no print */}
          <div
            className="no-print bg-card rounded-2xl border border-border p-8 text-center mb-6 shadow-soft"
            data-ocid="order-success"
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Thank you for shopping with Solura Cosmetics. Your order has been
              confirmed and will be dispatched soon.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-muted/60 rounded-full px-4 py-2 text-sm font-mono font-semibold text-foreground">
              Order ID: {order.id}
            </div>
          </div>

          {/* Invoice Section */}
          <div
            id="invoice-section"
            className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden"
          >
            {/* Invoice Header */}
            <div className="gradient-rose p-6 text-primary-foreground">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-display text-2xl font-bold">
                    {COMPANY.name}
                  </h2>
                  <p className="text-primary-foreground/80 text-sm mt-0.5">
                    {COMPANY.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold">INVOICE</p>
                  <p className="text-primary-foreground/80 text-sm">
                    #{order.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Company + Customer Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                    From
                  </p>
                  <p className="font-semibold text-foreground">
                    {COMPANY.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {COMPANY.address}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    GST: {COMPANY.gst}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Email:{" "}
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-primary hover:underline"
                    >
                      {COMPANY.email}
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                    Bill To
                  </p>
                  <p className="font-semibold text-foreground">
                    {order.shippingAddress.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.shippingAddress.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.phone}
                  </p>
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} –{" "}
                      {order.shippingAddress.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-muted/40 rounded-xl p-4">
                {[
                  { label: "Order Date", value: formatDate(order.createdAt) },
                  {
                    label: "Payment",
                    value:
                      order.paymentMethod === "razorpay"
                        ? "Online"
                        : "Cash on Delivery",
                  },
                  {
                    label: "Status",
                    value: order.paymentStatus === "paid" ? "Paid" : "Pending",
                  },
                  { label: "Order Status", value: order.status },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground capitalize mt-0.5">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Items Table */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
                  Items Ordered
                </p>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40">
                        <th className="text-left p-3 font-semibold text-foreground">
                          Product
                        </th>
                        <th className="text-center p-3 font-semibold text-foreground">
                          Qty
                        </th>
                        <th className="text-right p-3 font-semibold text-foreground">
                          Unit Price
                        </th>
                        <th className="text-right p-3 font-semibold text-foreground">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr
                          key={`${item.productId}-${i}`}
                          className="border-t border-border"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="h-10 w-10 rounded-lg object-cover bg-muted/30 flex-shrink-0 no-print"
                              />
                              <div>
                                <p className="font-medium text-foreground">
                                  {item.productName}
                                </p>
                                {item.variantName && (
                                  <p className="text-xs text-muted-foreground">
                                    {item.variantName}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center text-muted-foreground">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-right text-muted-foreground">
                            ₹{item.price.toLocaleString("en-IN")}
                          </td>
                          <td className="p-3 text-right font-semibold text-foreground">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-full sm:w-72 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      GST (18% incl.)
                    </span>
                    <span>₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  {order.codCharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">COD Charge</span>
                      <span>₹{order.codCharge.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>Total Paid</span>
                    <span className="font-display text-xl">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="text-center text-xs text-muted-foreground pt-2">
                <p>Thank you for shopping with {COMPANY.name}!</p>
                <p className="mt-0.5">
                  For support, email{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-primary hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </p>
                <p className="mt-0.5">
                  GST No: {COMPANY.gst} | This is a computer-generated invoice.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons — no print */}
          <div
            className="no-print flex flex-col sm:flex-row gap-3 mt-6"
            data-ocid="order-success-actions"
          >
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handlePrint}
              data-ocid="download-invoice"
            >
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Link to="/account/orders" className="flex-1">
              <Button
                variant="outline"
                className="w-full gap-2"
                data-ocid="success-view-orders"
              >
                <Package className="h-4 w-4" />
                Track Order
              </Button>
            </Link>
            <Link to="/shop" className="flex-1">
              <Button
                className="w-full gap-2"
                data-ocid="success-continue-shopping"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
