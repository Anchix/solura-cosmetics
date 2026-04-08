import { u as useActor, P as PaymentMethod, O as OrderStatus, a as PaymentStatus, c as createActor } from "./backend-C0WYxHKI.js";
import { h as useQueryClient, r as reactExports } from "./index-BYwbnXHo.js";
import { a as useMutation, u as useQuery } from "./useMutation-ybpFZUfc.js";
function mapOrderStatus(status) {
  switch (status) {
    case OrderStatus.Pending:
      return "pending";
    case OrderStatus.Shipped:
      return "shipped";
    case OrderStatus.Delivered:
      return "delivered";
    case OrderStatus.Cancelled:
      return "cancelled";
    default:
      return "pending";
  }
}
function toBackendOrderStatus(status) {
  switch (status) {
    case "pending":
      return OrderStatus.Pending;
    case "shipped":
      return OrderStatus.Shipped;
    case "delivered":
      return OrderStatus.Delivered;
    case "cancelled":
      return OrderStatus.Cancelled;
    default:
      return OrderStatus.Pending;
  }
}
function mapPaymentMethod(method) {
  return method === PaymentMethod.Razorpay ? "razorpay" : "cod";
}
function mapPaymentStatus(status) {
  switch (status) {
    case PaymentStatus.Paid:
      return "paid";
    case PaymentStatus.Failed:
      return "failed";
    case PaymentStatus.Refunded:
      return "refunded";
    default:
      return "pending";
  }
}
function customerInfoToAddress(c) {
  return {
    name: c.name,
    phone: c.phone,
    email: c.email,
    address: c.addressLine2 ? `${c.addressLine1}, ${c.addressLine2}` : c.addressLine1,
    city: c.city,
    state: c.state,
    pincode: c.pincode
  };
}
function mapBackendOrder(o) {
  var _a;
  const items = o.items.map((item) => ({
    productId: item.productId.toString(),
    productName: item.name,
    productImage: "/assets/generated/product-serum.dim_500x600.jpg",
    quantity: Number(item.quantity),
    price: Number(item.price)
  }));
  const subtotal = Number(o.subtotal);
  const codCharge = Number(o.codSurcharge);
  const total = Number(o.totalAmount);
  return {
    id: o.id.toString(),
    userId: ((_a = o.userId) == null ? void 0 : _a.toString()) ?? "guest",
    items,
    subtotal,
    codCharge,
    total,
    status: mapOrderStatus(o.orderStatus),
    paymentMethod: mapPaymentMethod(o.paymentMethod),
    paymentStatus: mapPaymentStatus(o.paymentStatus),
    razorpayOrderId: o.razorpayOrderId,
    shippingAddress: customerInfoToAddress(o.customer),
    createdAt: new Date(Number(o.createdAt) / 1e6).toISOString(),
    updatedAt: new Date(Number(o.createdAt) / 1e6).toISOString()
  };
}
function useUserOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders", "user"],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.listMyOrders();
      return orders.map(mapBackendOrder);
    },
    enabled: !!actor && !isFetching
  });
}
function useOrder(orderId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      const order = await actor.getOrder(BigInt(orderId));
      return order ? mapBackendOrder(order) : null;
    },
    enabled: !!actor && !isFetching && !!orderId
  });
}
function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const orderInput = {
        paymentMethod: input.paymentMethod === "razorpay" ? PaymentMethod.Razorpay : PaymentMethod.COD,
        customer: {
          name: input.shippingAddress.name,
          phone: input.shippingAddress.phone,
          email: input.shippingAddress.email,
          addressLine1: input.shippingAddress.address,
          addressLine2: "",
          city: input.shippingAddress.city,
          state: input.shippingAddress.state,
          pincode: input.shippingAddress.pincode
        },
        razorpayOrderId: input.razorpayOrderId,
        items: input.items.map((item) => ({
          productId: BigInt(item.productId),
          name: item.productName,
          quantity: BigInt(item.quantity),
          price: BigInt(item.price)
        }))
      };
      const order = await actor.createOrder(orderInput);
      return mapBackendOrder(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    }
  });
}
function useCancelOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.adminUpdateOrderStatus(
        BigInt(orderId),
        OrderStatus.Cancelled
      );
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useAdminOrders() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const intervalRef = reactExports.useRef(null);
  const query = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.adminListAllOrders();
      return orders.map(mapBackendOrder);
    },
    enabled: !!actor && !isFetching
  });
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    intervalRef.current = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    }, 1e4);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [actor, isFetching, queryClient]);
  return query;
}
function useAdminStats() {
  const { actor, isFetching } = useActor(createActor);
  const { data: orders } = useAdminOrders();
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const analytics = await actor.adminGetAnalytics();
      const last7Days = analytics.slice(-7).map((d) => ({
        date: new Date(Number(d.date) / 1e6).toISOString().split("T")[0],
        orders: Number(d.orderCount),
        revenue: Number(d.revenue),
        newUsers: 0
      }));
      const totalRevenue = analytics.reduce(
        (acc, d) => acc + Number(d.revenue),
        0
      );
      const totalOrders = (orders == null ? void 0 : orders.length) ?? analytics.reduce((acc, d) => acc + Number(d.orderCount), 0);
      const pendingOrders = (orders == null ? void 0 : orders.filter((o) => o.status === "pending").length) ?? 0;
      return {
        totalOrders,
        totalRevenue,
        totalProducts: 0,
        // Provided by useAdminProducts
        totalUsers: 0,
        pendingOrders,
        last7Days
      };
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.adminUpdateOrderStatus(
        BigInt(orderId),
        toBackendOrderStatus(status)
      );
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
export {
  useOrder as a,
  useUserOrders as b,
  useCancelOrder as c,
  useAdminStats as d,
  useAdminOrders as e,
  useUpdateOrderStatus as f,
  useCreateOrder as u
};
