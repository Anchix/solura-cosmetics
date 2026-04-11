import { h as useSharedActor, l as useQueryClient, k as useQuery, r as reactExports, o as PaymentMethod, O as OrderStatus, p as PaymentStatus } from "./index-DBS95maA.js";
import { u as useAuthStore } from "./sheet-Bi-Q7ojW.js";
import { u as useMutation } from "./useMutation-C725G2l4.js";
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
    productImage: "/assets/images/placeholder.svg",
    quantity: Number(item.quantity),
    price: Number(item.price)
  }));
  return {
    id: o.id.toString(),
    userId: ((_a = o.userId) == null ? void 0 : _a.toString()) ?? "guest",
    items,
    subtotal: Number(o.subtotal),
    codCharge: Number(o.codSurcharge),
    total: Number(o.totalAmount),
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
  const { actor, isFetching } = useSharedActor();
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
  const { actor, isFetching } = useSharedActor();
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
  const { actor } = useSharedActor();
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
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken) throw new Error("Admin token required to cancel orders");
      const result = await actor.adminUpdateOrderStatus(
        adminToken,
        BigInt(orderId),
        OrderStatus.Cancelled
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useAdminOrders() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  const intervalRef = reactExports.useRef(null);
  const query = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor || !adminToken) return [];
      const result = await actor.adminListAllOrders(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map(mapBackendOrder);
    },
    enabled: !!actor && !isFetching && !!adminToken
  });
  reactExports.useEffect(() => {
    if (!actor || isFetching || !adminToken) return;
    intervalRef.current = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    }, 1e4);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [actor, isFetching, adminToken, queryClient]);
  return query;
}
function useAdminStats() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  const { data: orders } = useAdminOrders();
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor || !adminToken) throw new Error("Actor or token not ready");
      const result = await actor.adminGetAnalytics(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      const analytics = result.ok;
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
        totalUsers: 0,
        pendingOrders,
        last7Days
      };
    },
    enabled: !!actor && !isFetching && !!adminToken
  });
}
function useUpdateOrderStatus() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status
    }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminUpdateOrderStatus(
        adminToken,
        BigInt(orderId),
        toBackendOrderStatus(status)
      );
      if (result.__kind__ === "err") throw new Error(result.err);
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
