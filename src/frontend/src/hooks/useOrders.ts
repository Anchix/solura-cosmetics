import {
  OrderStatus as BackendOrderStatus,
  PaymentMethod as BackendPaymentMethod,
  PaymentStatus as BackendPaymentStatus,
} from "@/backend";
import type {
  DailyAnalytics as BackendDailyAnalytics,
  Order as BackendOrder,
  CustomerInfo,
  OrderInput,
} from "@/backend";
import { useSharedActor } from "@/context/ActorContext";
import { useAuthStore } from "@/store/authStore";
import type {
  AdminStats,
  DailyAnalytics,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingAddress,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// ─── Mapping helpers ──────────────────────────────────────────────────────────

function mapOrderStatus(status: BackendOrderStatus): OrderStatus {
  switch (status) {
    case BackendOrderStatus.Pending:
      return "pending";
    case BackendOrderStatus.Shipped:
      return "shipped";
    case BackendOrderStatus.Delivered:
      return "delivered";
    case BackendOrderStatus.Cancelled:
      return "cancelled";
    default:
      return "pending";
  }
}

function toBackendOrderStatus(status: OrderStatus): BackendOrderStatus {
  switch (status) {
    case "pending":
      return BackendOrderStatus.Pending;
    case "shipped":
      return BackendOrderStatus.Shipped;
    case "delivered":
      return BackendOrderStatus.Delivered;
    case "cancelled":
      return BackendOrderStatus.Cancelled;
    default:
      return BackendOrderStatus.Pending;
  }
}

function mapPaymentMethod(method: BackendPaymentMethod): PaymentMethod {
  return method === BackendPaymentMethod.Razorpay ? "razorpay" : "cod";
}

function mapPaymentStatus(status: BackendPaymentStatus): PaymentStatus {
  switch (status) {
    case BackendPaymentStatus.Paid:
      return "paid";
    case BackendPaymentStatus.Failed:
      return "failed";
    case BackendPaymentStatus.Refunded:
      return "refunded";
    default:
      return "pending";
  }
}

function customerInfoToAddress(c: CustomerInfo): ShippingAddress {
  return {
    name: c.name,
    phone: c.phone,
    email: c.email,
    address: c.addressLine2
      ? `${c.addressLine1}, ${c.addressLine2}`
      : c.addressLine1,
    city: c.city,
    state: c.state,
    pincode: c.pincode,
  };
}

function mapBackendOrder(o: BackendOrder): Order {
  const items: OrderItem[] = o.items.map((item) => ({
    productId: item.productId.toString(),
    productName: item.name,
    productImage: "/assets/images/placeholder.svg",
    quantity: Number(item.quantity),
    price: Number(item.price),
  }));

  return {
    id: o.id.toString(),
    userId: o.userId?.toString() ?? "guest",
    items,
    subtotal: Number(o.subtotal),
    codCharge: Number(o.codSurcharge),
    total: Number(o.totalAmount),
    status: mapOrderStatus(o.orderStatus),
    paymentMethod: mapPaymentMethod(o.paymentMethod),
    paymentStatus: mapPaymentStatus(o.paymentStatus),
    razorpayOrderId: o.razorpayOrderId,
    shippingAddress: customerInfoToAddress(o.customer),
    createdAt: new Date(Number(o.createdAt) / 1_000_000).toISOString(),
    updatedAt: new Date(Number(o.createdAt) / 1_000_000).toISOString(),
  };
}

// ─── Input type ───────────────────────────────────────────────────────────────

export interface CreateOrderInput {
  items: OrderItem[];
  subtotal: number;
  codCharge: number;
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  razorpayOrderId?: string;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useUserOrders() {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Order[]>({
    queryKey: ["orders", "user"],
    queryFn: async () => {
      if (!actor) return [];
      const orders = await actor.listMyOrders();
      return orders.map(mapBackendOrder);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrder(orderId: string) {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      const order = await actor.getOrder(BigInt(orderId));
      return order ? mapBackendOrder(order) : null;
    },
    enabled: !!actor && !isFetching && !!orderId,
  });
}

export function useCreateOrder() {
  const { actor } = useSharedActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<Order> => {
      if (!actor) throw new Error("Actor not ready");

      const orderInput: OrderInput = {
        paymentMethod:
          input.paymentMethod === "razorpay"
            ? BackendPaymentMethod.Razorpay
            : BackendPaymentMethod.COD,
        customer: {
          name: input.shippingAddress.name,
          phone: input.shippingAddress.phone,
          email: input.shippingAddress.email,
          addressLine1: input.shippingAddress.address,
          addressLine2: "",
          city: input.shippingAddress.city,
          state: input.shippingAddress.state,
          pincode: input.shippingAddress.pincode,
        },
        razorpayOrderId: input.razorpayOrderId,
        items: input.items.map((item) => ({
          productId: BigInt(item.productId),
          name: item.productName,
          quantity: BigInt(item.quantity),
          price: BigInt(item.price),
        })),
      };

      const order = await actor.createOrder(orderInput);
      return mapBackendOrder(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
}

export function useCancelOrder() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken) throw new Error("Admin token required to cancel orders");
      const result = await actor.adminUpdateOrderStatus(
        adminToken,
        BigInt(orderId),
        BackendOrderStatus.Cancelled,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useAdminOrders() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const query = useQuery<Order[]>({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor || !adminToken) return [];
      const result = await actor.adminListAllOrders(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map(mapBackendOrder);
    },
    enabled: !!actor && !isFetching && !!adminToken,
  });

  // Poll every 10 seconds for near-real-time sync
  useEffect(() => {
    if (!actor || isFetching || !adminToken) return;
    intervalRef.current = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    }, 10_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [actor, isFetching, adminToken, queryClient]);

  return query;
}

export function useAdminStats() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  const { data: orders } = useAdminOrders();

  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor || !adminToken) throw new Error("Actor or token not ready");
      const result = await actor.adminGetAnalytics(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      const analytics: BackendDailyAnalytics[] = result.ok;

      const last7Days: DailyAnalytics[] = analytics.slice(-7).map((d) => ({
        date: new Date(Number(d.date) / 1_000_000).toISOString().split("T")[0],
        orders: Number(d.orderCount),
        revenue: Number(d.revenue),
        newUsers: 0,
      }));

      const totalRevenue = analytics.reduce(
        (acc, d) => acc + Number(d.revenue),
        0,
      );
      const totalOrders =
        orders?.length ??
        analytics.reduce((acc, d) => acc + Number(d.orderCount), 0);
      const pendingOrders =
        orders?.filter((o) => o.status === "pending").length ?? 0;

      return {
        totalOrders,
        totalRevenue,
        totalProducts: 0,
        totalUsers: 0,
        pendingOrders,
        last7Days,
      };
    },
    enabled: !!actor && !isFetching && !!adminToken,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: string; status: OrderStatus }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminUpdateOrderStatus(
        adminToken,
        BigInt(orderId),
        toBackendOrderStatus(status),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
