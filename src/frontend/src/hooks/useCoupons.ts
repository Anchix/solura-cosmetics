import type {
  Coupon as BackendCoupon,
  CouponInput as BackendCouponInput,
  CouponValidationResult as BackendCouponValidationResult,
} from "@/backend";
import { DiscountType as BackendDiscountType } from "@/backend";
import { useSharedActor } from "@/context/ActorContext";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Frontend Coupon Types ────────────────────────────────────────────────────

export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  expiryDate?: string;
}

export interface CouponInput {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxUses?: number;
  isActive: boolean;
  expiryDate?: string;
}

export interface CouponValidationResult {
  valid: boolean;
  discountAmount: number;
  message: string;
}

// ─── Backend mapping ──────────────────────────────────────────────────────────

function mapCoupon(c: BackendCoupon): Coupon {
  return {
    id: c.id?.toString() ?? "",
    code: c.code ?? "",
    discountType: c.discountType === "Percentage" ? "percentage" : "fixed",
    discountValue: Number(c.discountValue ?? 0),
    minOrderAmount:
      c.minOrderAmount != null ? Number(c.minOrderAmount) : undefined,
    maxUses: c.maxUses != null ? Number(c.maxUses) : undefined,
    usedCount: Number(c.usedCount ?? 0),
    isActive: Boolean(c.isActive),
    expiryDate:
      c.expiryDate != null
        ? new Date(Number(c.expiryDate) / 1_000_000).toISOString().split("T")[0]
        : undefined,
  };
}

function toBackendInput(input: CouponInput): BackendCouponInput {
  return {
    code: input.code.trim().toUpperCase(),
    discountType:
      input.discountType === "percentage"
        ? BackendDiscountType.Percentage
        : BackendDiscountType.Fixed,
    discountValue: BigInt(Math.round(input.discountValue)),
    minOrderAmount:
      input.minOrderAmount != null
        ? BigInt(Math.round(input.minOrderAmount))
        : undefined,
    maxUses:
      input.maxUses != null ? BigInt(Math.round(input.maxUses)) : undefined,
    isActive: input.isActive,
    expiryDate: input.expiryDate
      ? BigInt(new Date(input.expiryDate).getTime()) * 1_000_000n
      : undefined,
  };
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAdminCoupons() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  return useQuery<Coupon[]>({
    queryKey: ["admin", "coupons"],
    queryFn: async () => {
      if (!actor || !adminToken) return [];
      const result = await actor.adminListCoupons(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      return (result.ok ?? []).map(mapCoupon);
    },
    enabled: !!actor && !isFetching && !!adminToken,
  });
}

export function useAdminCreateCoupon() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CouponInput) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminCreateCoupon(
        adminToken,
        toBackendInput(input),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapCoupon(result.ok);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: (err) => {
      console.error("Create coupon failed:", err);
    },
  });
}

export function useAdminUpdateCoupon() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: CouponInput }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminUpdateCoupon(
        adminToken,
        BigInt(id),
        toBackendInput(input),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: (err) => {
      console.error("Update coupon failed:", err);
    },
  });
}

export function useAdminDeleteCoupon() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminDeleteCoupon(adminToken, BigInt(id));
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: (err) => {
      console.error("Delete coupon failed:", err);
    },
  });
}

export function useValidateCoupon() {
  const { actor } = useSharedActor();
  return useMutation({
    mutationFn: async ({
      code,
      orderTotal,
    }: {
      code: string;
      orderTotal: number;
    }): Promise<CouponValidationResult> => {
      if (!actor) throw new Error("Actor not ready");
      const result: BackendCouponValidationResult = await actor.validateCoupon(
        code.trim().toUpperCase(),
        BigInt(Math.round(orderTotal)),
      );
      if (result.__kind__ === "Invalid") {
        return {
          valid: false,
          discountAmount: 0,
          message: result.Invalid ?? "Invalid or expired coupon code.",
        };
      }
      return {
        valid: true,
        discountAmount: Number(result.Valid.discountAmount ?? 0),
        message: "Coupon applied successfully!",
      };
    },
  });
}
