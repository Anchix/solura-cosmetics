import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateOrder } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { ShippingAddress } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Loader2,
  MapPin,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const COD_CHARGE = 40;
const GST_RATE = 0.18;

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface FormState extends ShippingAddress {
  addressLine2: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const createOrder = useCreateOrder();
  const subtotal = getTotal();
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay",
  );
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentError, setPaymentError] = useState("");
  const razorpayLoaded = useRef(false);

  const gst = Math.round(subtotal * GST_RATE);
  const codCharge = paymentMethod === "cod" ? COD_CHARGE : 0;
  const total = subtotal + gst + codCharge;

  const [form, setForm] = useState<FormState>({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Preload Razorpay script
  useEffect(() => {
    if (!razorpayLoaded.current) {
      razorpayLoaded.current = true;
      loadRazorpayScript();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === "phone" || name === "pincode") && !/^\d*$/.test(value))
      return;
    if (name === "phone" && value.length > 10) return;
    if (name === "pincode" && value.length > 6) return;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode") {
      setPincodeError("");
      if (value.length === 6) {
        setPincodeLoading(true);
        fetch(`https://api.postalpincode.in/pincode/${value}`)
          .then((r) => r.json())
          .then((data) => {
            if (data[0]?.Status === "Success") {
              const post = data[0].PostOffice?.[0];
              if (post) {
                setForm((prev) => ({
                  ...prev,
                  city: post.District ?? prev.city,
                  state: post.State ?? prev.state,
                }));
                setPincodeError("");
              }
            } else {
              setPincodeError("Invalid pincode. Please check and try again.");
            }
          })
          .catch(() => setPincodeError("Unable to fetch pincode details."))
          .finally(() => setPincodeLoading(false));
      }
    }
  };

  const isValid =
    form.name.trim() &&
    form.phone.length === 10 &&
    form.email.trim() &&
    form.address.trim() &&
    form.pincode.length === 6 &&
    form.city.trim() &&
    form.state.trim() &&
    !pincodeLoading;

  const shippingAddr: ShippingAddress = {
    name: form.name,
    phone: form.phone,
    email: form.email,
    address: form.addressLine2
      ? `${form.address}, ${form.addressLine2}`
      : form.address,
    city: form.city,
    state: form.state,
    pincode: form.pincode,
  };

  const orderItems = items.map((item) => ({
    productId: item.productId,
    productName: item.product.name,
    productImage: item.product.images[0],
    quantity: item.quantity,
    price: item.product.price,
    variantName: item.variantName,
  }));

  const handleCOD = async () => {
    const order = await createOrder.mutateAsync({
      items: orderItems,
      subtotal,
      codCharge: COD_CHARGE,
      total,
      paymentMethod: "cod",
      shippingAddress: shippingAddr,
    });
    clearCart();
    navigate({
      to: "/order-success/$orderId",
      params: { orderId: order.id },
    });
  };

  const handleRazorpay = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setPaymentError(
        "Payment gateway failed to load. Please check your connection.",
      );
      return;
    }

    // Create a pending order first to get orderId
    const order = await createOrder.mutateAsync({
      items: orderItems,
      subtotal,
      codCharge: 0,
      total,
      paymentMethod: "razorpay",
      shippingAddress: shippingAddr,
    });

    const options: RazorpayOptions = {
      key: "rzp_test_solura", // Replace with real key
      amount: total * 100, // paise
      currency: "INR",
      name: "Solura Cosmetics",
      description: `Order ${order.id}`,
      order_id: order.razorpayOrderId,
      handler: (_response: RazorpayResponse) => {
        clearCart();
        toast.success("Payment successful!");
        navigate({
          to: "/order-success/$orderId",
          params: { orderId: order.id },
        });
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#c2473a" },
      modal: {
        ondismiss: () => {
          setPaymentError(
            "Payment was cancelled. You can retry or choose Cash on Delivery.",
          );
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError("");
    if (!isValid) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    if (items.length === 0) {
      navigate({ to: "/cart" });
      return;
    }

    try {
      if (paymentMethod === "cod") {
        await handleCOD();
      } else {
        await handleRazorpay();
      }
    } catch {
      setPaymentError("Something went wrong. Please try again.");
    }
  };

  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <span>Cart</span>
            <span>›</span>
            <span className="text-foreground font-medium">Checkout</span>
            <span>›</span>
            <span>Confirmation</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Address */}
                <section className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Delivery Address
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Krishnamurthy"
                        required
                        autoComplete="name"
                        data-ocid="checkout-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        maxLength={10}
                        required
                        autoComplete="tel"
                        data-ocid="checkout-phone"
                      />
                      {form.phone.length > 0 && form.phone.length < 10 && (
                        <p className="text-xs text-destructive">
                          Enter a 10-digit phone number
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        required
                        autoComplete="email"
                        data-ocid="checkout-email"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="address">
                        Address Line 1{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="House/Flat no., Street name"
                        required
                        autoComplete="address-line1"
                        data-ocid="checkout-address"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={form.addressLine2}
                        onChange={handleChange}
                        placeholder="Landmark, Area (optional)"
                        autoComplete="address-line2"
                        data-ocid="checkout-address2"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pincode">
                        Pincode <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="pincode"
                          name="pincode"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          value={form.pincode}
                          onChange={handleChange}
                          placeholder="639205"
                          maxLength={6}
                          required
                          data-ocid="checkout-pincode"
                          className={pincodeError ? "border-destructive" : ""}
                        />
                        {pincodeLoading && (
                          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                        {!pincodeLoading &&
                          form.pincode.length === 6 &&
                          form.city &&
                          !pincodeError && (
                            <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-primary" />
                          )}
                      </div>
                      {pincodeError && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {pincodeError}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Auto-filled from pincode"
                        required
                        data-ocid="checkout-city"
                        className={pincodeLoading ? "opacity-60" : ""}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="state">
                        State <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Auto-filled from pincode"
                        required
                        data-ocid="checkout-state"
                        className={pincodeLoading ? "opacity-60" : ""}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Checkbox
                      id="sameAsBilling"
                      checked={sameAsBilling}
                      onCheckedChange={(v) => setSameAsBilling(!!v)}
                      data-ocid="checkout-same-billing"
                    />
                    <Label
                      htmlFor="sameAsBilling"
                      className="text-sm cursor-pointer"
                    >
                      Billing address same as delivery address
                    </Label>
                  </div>
                </section>

                {/* Payment Method */}
                <section className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* Razorpay */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("razorpay");
                        setPaymentError("");
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth ${
                        paymentMethod === "razorpay"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                      data-ocid="payment-razorpay"
                    >
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex-shrink-0 transition-smooth ${
                          paymentMethod === "razorpay"
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {paymentMethod === "razorpay" && (
                          <div className="h-full w-full rounded-full bg-primary-foreground scale-[0.4]" />
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          Online Payment
                        </p>
                        <p className="text-xs text-muted-foreground">
                          UPI · Cards · Net Banking · Wallets via Razorpay
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                          No extra charge
                        </span>
                      </div>
                    </button>

                    {/* COD */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("cod");
                        setPaymentError("");
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                      data-ocid="payment-cod"
                    >
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex-shrink-0 transition-smooth ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="h-full w-full rounded-full bg-primary-foreground scale-[0.4]" />
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Pay in cash when your order arrives
                        </p>
                      </div>
                      <span className="text-xs font-semibold bg-secondary/30 text-foreground px-2 py-0.5 rounded-full">
                        +₹{COD_CHARGE} extra
                      </span>
                    </button>

                    {paymentMethod === "cod" && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl p-3">
                        <Truck className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>
                          A ₹{COD_CHARGE} handling charge is added for Cash on
                          Delivery orders. Pay the total amount to the delivery
                          partner.
                        </span>
                      </div>
                    )}
                  </div>

                  {paymentError && (
                    <div className="mt-4 flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-xl p-3">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>{paymentError}</p>
                        <button
                          type="submit"
                          className="underline text-xs mt-1 hover:no-underline"
                          data-ocid="payment-retry"
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* Right: Order Summary */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-4 lg:sticky lg:top-24">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.variantId ?? ""}`}
                        className="flex gap-3"
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-14 w-14 rounded-lg object-cover bg-muted/30"
                          />
                          <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-bold">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground font-medium truncate">
                            {item.product.name}
                          </p>
                          {item.variantName && (
                            <p className="text-xs text-muted-foreground">
                              {item.variantName}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-foreground flex-shrink-0">
                          ₹
                          {(item.product.price * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-primary font-medium">Free</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          COD Charge
                        </span>
                        <span>₹{COD_CHARGE}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span className="text-base">Total</span>
                    <span className="font-display text-2xl">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {pincodeLoading ? (
                    <Skeleton className="h-12 w-full rounded-xl" />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={!isValid || createOrder.isPending}
                      data-ocid="checkout-place-order"
                    >
                      {createOrder.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Placing Order...
                        </>
                      ) : paymentMethod === "razorpay" ? (
                        `Pay ₹${total.toLocaleString("en-IN")}`
                      ) : (
                        "Place Order — COD"
                      )}
                    </Button>
                  )}

                  {!isValid && (
                    <p className="text-xs text-muted-foreground text-center">
                      Please fill all required fields to continue
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-4 pt-1">
                    {["🔒 Secure", "🛡️ Protected", "✓ Verified"].map((t) => (
                      <span key={t} className="text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
