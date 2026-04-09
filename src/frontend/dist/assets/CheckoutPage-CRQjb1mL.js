import { d as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton, b as ue } from "./index-BrjEsxOs.js";
import { u as useCartStore, L as Layout, M as MapPin } from "./Layout-de5RFWf_.js";
import { u as useAuthStore, X, B as Button } from "./authStore-DllIseEP.js";
import { C as Checkbox } from "./checkbox-5ji_PXO-.js";
import { I as Input } from "./input-C6uNCtqe.js";
import { L as Label } from "./label-CfKvP0rj.js";
import { S as Separator } from "./separator-rMUPFFHz.js";
import { u as useValidateCoupon } from "./useCoupons-BkBbR7-9.js";
import { u as useCreateOrder } from "./useOrders-BV2CJZ35.js";
import { L as LoaderCircle } from "./loader-circle-BvXBDf1o.js";
import { C as CircleCheck } from "./circle-check-CdstDzCb.js";
import { C as CircleAlert } from "./circle-alert-CXtYohSO.js";
import { C as CreditCard } from "./credit-card-4o6asuhT.js";
import { T as Truck } from "./truck-CWbvVWkZ.js";
import { T as Tag } from "./tag-VRaMPiU5.js";
import "./index-PXL3iLE8.js";
import "./index-CwkAE0ts.js";
import "./useMutation-C6TNdxjV.js";
const COD_CHARGE = 40;
const GST_RATE = 0.18;
function loadRazorpayScript() {
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
function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const createOrder = useCreateOrder();
  const validateCoupon = useValidateCoupon();
  const subtotal = getTotal();
  const [paymentMethod, setPaymentMethod] = reactExports.useState(
    "razorpay"
  );
  const [pincodeLoading, setPincodeLoading] = reactExports.useState(false);
  const [pincodeError, setPincodeError] = reactExports.useState("");
  const [sameAsBilling, setSameAsBilling] = reactExports.useState(true);
  const [paymentError, setPaymentError] = reactExports.useState("");
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const [couponError, setCouponError] = reactExports.useState("");
  const razorpayLoaded = reactExports.useRef(false);
  const gst = Math.round(subtotal * GST_RATE);
  const codCharge = paymentMethod === "cod" ? COD_CHARGE : 0;
  const discount = (appliedCoupon == null ? void 0 : appliedCoupon.discountAmount) ?? 0;
  const total = Math.max(0, subtotal + gst + codCharge - discount);
  const [form, setForm] = reactExports.useState({
    name: (user == null ? void 0 : user.name) ?? "",
    phone: (user == null ? void 0 : user.phone) ?? "",
    email: (user == null ? void 0 : user.email) ?? "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: ""
  });
  reactExports.useEffect(() => {
    if (!razorpayLoaded.current) {
      razorpayLoaded.current = true;
      loadRazorpayScript();
    }
  }, []);
  const handleChange = (e) => {
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
        fetch(`https://api.postalpincode.in/pincode/${value}`).then((r) => r.json()).then((data) => {
          var _a, _b;
          if (((_a = data[0]) == null ? void 0 : _a.Status) === "Success") {
            const post = (_b = data[0].PostOffice) == null ? void 0 : _b[0];
            if (post) {
              setForm((prev) => ({
                ...prev,
                city: post.District ?? prev.city,
                state: post.State ?? prev.state
              }));
            }
          } else {
            setPincodeError("Invalid pincode. Please check and try again.");
          }
        }).catch(() => setPincodeError("Unable to fetch pincode details.")).finally(() => setPincodeLoading(false));
      }
    }
  };
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponError("");
    try {
      const result = await validateCoupon.mutateAsync({
        code: couponCode,
        orderTotal: subtotal
      });
      if (result.valid) {
        setAppliedCoupon({
          code: couponCode.trim().toUpperCase(),
          discountAmount: result.discountAmount
        });
        setCouponCode("");
        ue.success(result.message);
      } else {
        setCouponError(result.message);
        setAppliedCoupon(null);
      }
    } catch {
      setCouponError("Could not validate coupon. Please try again.");
    }
  };
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };
  const isValid = form.name.trim() && form.phone.length === 10 && form.email.trim() && form.address.trim() && form.pincode.length === 6 && form.city.trim() && form.state.trim() && !pincodeLoading;
  const shippingAddr = {
    name: form.name,
    phone: form.phone,
    email: form.email,
    address: form.addressLine2 ? `${form.address}, ${form.addressLine2}` : form.address,
    city: form.city,
    state: form.state,
    pincode: form.pincode
  };
  const orderItems = items.map((item) => ({
    productId: item.productId,
    productName: item.product.name,
    productImage: item.product.images[0],
    quantity: item.quantity,
    price: item.product.price,
    variantName: item.variantName
  }));
  const handleCOD = async () => {
    const order = await createOrder.mutateAsync({
      items: orderItems,
      subtotal,
      codCharge: COD_CHARGE,
      total,
      paymentMethod: "cod",
      shippingAddress: shippingAddr
    });
    clearCart();
    navigate({ to: "/order-success/$orderId", params: { orderId: order.id } });
  };
  const handleRazorpay = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setPaymentError(
        "Payment gateway failed to load. Please check your connection."
      );
      return;
    }
    const order = await createOrder.mutateAsync({
      items: orderItems,
      subtotal,
      codCharge: 0,
      total,
      paymentMethod: "razorpay",
      shippingAddress: shippingAddr
    });
    const options = {
      key: "rzp_test_solura",
      amount: total * 100,
      currency: "INR",
      name: "Solura Cosmetics",
      description: `Order ${order.id}`,
      order_id: order.razorpayOrderId,
      handler: (_response) => {
        clearCart();
        ue.success("Payment successful!");
        navigate({
          to: "/order-success/$orderId",
          params: { orderId: order.id }
        });
      },
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: "#c2473a" },
      modal: {
        ondismiss: () => setPaymentError(
          "Payment was cancelled. You can retry or choose Cash on Delivery."
        )
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentError("");
    if (!isValid) {
      ue.error("Please fill all required fields correctly.");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "›" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "›" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confirmation" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-2xl border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Delivery Address" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
                "Full Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  name: "name",
                  value: form.name,
                  onChange: handleChange,
                  placeholder: "Priya Krishnamurthy",
                  required: true,
                  autoComplete: "name",
                  "data-ocid": "checkout-name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", children: [
                "Phone Number ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  name: "phone",
                  type: "tel",
                  inputMode: "numeric",
                  pattern: "[0-9]{10}",
                  value: form.phone,
                  onChange: handleChange,
                  placeholder: "9876543210",
                  maxLength: 10,
                  required: true,
                  autoComplete: "tel",
                  "data-ocid": "checkout-phone"
                }
              ),
              form.phone.length > 0 && form.phone.length < 10 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Enter a 10-digit phone number" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
                "Email Address",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  type: "email",
                  value: form.email,
                  onChange: handleChange,
                  placeholder: "priya@example.com",
                  required: true,
                  autoComplete: "email",
                  "data-ocid": "checkout-email"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "address", children: [
                "Address Line 1",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "address",
                  name: "address",
                  value: form.address,
                  onChange: handleChange,
                  placeholder: "House/Flat no., Street name",
                  required: true,
                  autoComplete: "address-line1",
                  "data-ocid": "checkout-address"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addressLine2", children: "Address Line 2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "addressLine2",
                  name: "addressLine2",
                  value: form.addressLine2,
                  onChange: handleChange,
                  placeholder: "Landmark, Area (optional)",
                  autoComplete: "address-line2",
                  "data-ocid": "checkout-address2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pincode", children: [
                "Pincode ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pincode",
                    name: "pincode",
                    type: "tel",
                    inputMode: "numeric",
                    pattern: "[0-9]{6}",
                    value: form.pincode,
                    onChange: handleChange,
                    placeholder: "639205",
                    maxLength: 6,
                    required: true,
                    "data-ocid": "checkout-pincode",
                    className: pincodeError ? "border-destructive" : ""
                  }
                ),
                pincodeLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" }),
                !pincodeLoading && form.pincode.length === 6 && form.city && !pincodeError && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute right-3 top-3 h-4 w-4 text-primary" })
              ] }),
              pincodeError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                pincodeError
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "city", children: [
                "City ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "city",
                  name: "city",
                  value: form.city,
                  onChange: handleChange,
                  placeholder: "Auto-filled from pincode",
                  required: true,
                  "data-ocid": "checkout-city",
                  className: pincodeLoading ? "opacity-60" : ""
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "state", children: [
                "State ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "state",
                  name: "state",
                  value: form.state,
                  onChange: handleChange,
                  placeholder: "Auto-filled from pincode",
                  required: true,
                  "data-ocid": "checkout-state",
                  className: pincodeLoading ? "opacity-60" : ""
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: "sameAsBilling",
                checked: sameAsBilling,
                onCheckedChange: (v) => setSameAsBilling(!!v),
                "data-ocid": "checkout-same-billing"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "sameAsBilling",
                className: "text-sm cursor-pointer",
                children: "Billing address same as delivery address"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-2xl border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Payment Method" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setPaymentMethod("razorpay");
                  setPaymentError("");
                },
                className: `w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth ${paymentMethod === "razorpay" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                "data-ocid": "payment-razorpay",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-5 w-5 rounded-full border-2 flex-shrink-0 transition-smooth ${paymentMethod === "razorpay" ? "border-primary bg-primary" : "border-muted-foreground"}`,
                      children: paymentMethod === "razorpay" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-full bg-primary-foreground scale-[0.4]" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Online Payment" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "UPI · Cards · Net Banking · Wallets via Razorpay" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full", children: "No extra charge" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setPaymentMethod("cod");
                  setPaymentError("");
                },
                className: `w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                "data-ocid": "payment-cod",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-5 w-5 rounded-full border-2 flex-shrink-0 transition-smooth ${paymentMethod === "cod" ? "border-primary bg-primary" : "border-muted-foreground"}`,
                      children: paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-full bg-primary-foreground scale-[0.4]" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Cash on Delivery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pay in cash when your order arrives" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold bg-secondary/30 text-foreground px-2 py-0.5 rounded-full", children: [
                    "+₹",
                    COD_CHARGE,
                    " extra"
                  ] })
                ]
              }
            ),
            paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "A ₹",
                COD_CHARGE,
                " handling charge is added for Cash on Delivery orders."
              ] })
            ] })
          ] }),
          paymentError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: paymentError }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "underline text-xs mt-1 hover:no-underline",
                  "data-ocid": "payment-retry",
                  children: "Try again"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 shadow-soft space-y-4 lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-60 overflow-y-auto pr-1", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.product.images[0],
                    alt: item.product.name,
                    className: "h-14 w-14 rounded-lg object-cover bg-muted/30"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-bold", children: item.quantity })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: item.product.name }),
                item.variantName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.variantName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground flex-shrink-0", children: [
                "₹",
                (item.product.price * item.quantity).toLocaleString(
                  "en-IN"
                )
              ] })
            ]
          },
          `${item.productId}-${item.variantId ?? ""}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-primary" }),
            "Coupon Code"
          ] }),
          appliedCoupon ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-primary/8 border border-primary/20 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-primary", children: appliedCoupon.code }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
                "−₹",
                appliedCoupon.discountAmount.toLocaleString(
                  "en-IN"
                ),
                " ",
                "off"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleRemoveCoupon,
                className: "text-muted-foreground hover:text-destructive transition-colors",
                "aria-label": "Remove coupon",
                "data-ocid": "checkout-remove-coupon",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: couponCode,
                onChange: (e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError("");
                },
                placeholder: "Enter code",
                className: "font-mono uppercase text-sm",
                "data-ocid": "checkout-coupon-input",
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyCoupon();
                  }
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handleApplyCoupon,
                disabled: validateCoupon.isPending,
                className: "flex-shrink-0",
                "data-ocid": "checkout-apply-coupon",
                children: validateCoupon.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : "Apply"
              }
            )
          ] }),
          couponError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3 flex-shrink-0" }),
            couponError
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              subtotal.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              gst.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Free" })
          ] }),
          paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "COD Charge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              COD_CHARGE
            ] })
          ] }),
          appliedCoupon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-primary font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5" }),
              "Coupon (",
              appliedCoupon.code,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−₹",
              appliedCoupon.discountAmount.toLocaleString("en-IN")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
            "₹",
            total.toLocaleString("en-IN")
          ] })
        ] }),
        pincodeLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            size: "lg",
            disabled: !isValid || createOrder.isPending,
            "data-ocid": "checkout-place-order",
            children: createOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
              "Placing Order..."
            ] }) : paymentMethod === "razorpay" ? `Pay ₹${total.toLocaleString("en-IN")}` : "Place Order — COD"
          }
        ),
        !isValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Please fill all required fields to continue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 pt-1", children: ["🔒 Secure", "🛡️ Protected", "✓ Verified"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t }, t)) })
      ] }) })
    ] }) })
  ] }) }) });
}
export {
  CheckoutPage as default
};
