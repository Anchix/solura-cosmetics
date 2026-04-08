import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

const GST_RATE = 0.18;

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const subtotal = getTotal();
  const gst = Math.round(subtotal * GST_RATE);
  const shipping = subtotal >= 999 ? 0 : 60;
  const total = subtotal + gst + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-24 text-center"
          data-ocid="cart-empty"
        >
          <div className="max-w-sm mx-auto">
            <div className="h-24 w-24 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Your bag is empty
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Looks like you haven't added anything yet. Explore our curated
              collection of natural beauty products.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gap-2" data-ocid="cart-empty-shop">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Your Bag
            </h1>
            <p className="text-muted-foreground mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId ?? ""}`}
                  className="flex gap-4 bg-card rounded-2xl border border-border p-4 shadow-soft hover:shadow-elevated transition-smooth"
                  data-ocid={`cart-item-${item.productId}`}
                >
                  <Link
                    to="/products/$id"
                    params={{ id: item.productId }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-24 w-24 object-cover rounded-xl bg-muted/30"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to="/products/$id" params={{ id: item.productId }}>
                      <h3 className="font-display font-semibold text-foreground truncate hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.variantName && (
                      <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                        {item.variantName}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                      {item.product.category}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-xl overflow-hidden bg-background">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.variantId,
                            )
                          }
                          className="px-3 py-2 text-foreground hover:bg-muted/60 transition-smooth"
                          aria-label="Decrease quantity"
                          data-ocid={`cart-decrement-${item.productId}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-4 py-2 text-sm font-semibold border-x border-border min-w-[2.5rem] text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.variantId,
                            )
                          }
                          className="px-3 py-2 text-foreground hover:bg-muted/60 transition-smooth"
                          aria-label="Increase quantity"
                          data-ocid={`cart-increment-${item.productId}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.variantId)
                        }
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10"
                        aria-label="Remove item"
                        data-ocid={`cart-remove-${item.productId}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-between pl-2 flex-shrink-0">
                    <p className="font-display font-bold text-foreground text-lg">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.product.price.toLocaleString("en-IN")} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div
                className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-4"
                data-ocid="cart-summary"
              >
                <h2 className="font-display text-xl font-bold text-foreground">
                  Order Summary
                </h2>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">
                      ₹{gst.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "text-primary font-medium"
                          : "font-medium"
                      }
                    >
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                </div>

                {subtotal < 999 && (
                  <div className="bg-primary/8 rounded-xl p-3 text-xs text-primary font-medium">
                    🎁 Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for
                    free shipping!
                  </div>
                )}

                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="font-display text-2xl">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Inclusive of all taxes. Final total at checkout.
                </p>

                <Link to="/checkout" className="block">
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    data-ocid="cart-checkout"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="bg-card rounded-2xl border border-border p-4 space-y-2">
                {[
                  { icon: "🔒", text: "Secure checkout" },
                  { icon: "🚚", text: "Free shipping above ₹999" },
                  { icon: "↩️", text: "Easy 7-day returns" },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
