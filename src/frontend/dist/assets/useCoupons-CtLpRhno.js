import { h as useSharedActor, k as useQuery, l as useQueryClient, D as DiscountType } from "./index-DBS95maA.js";
import { u as useAuthStore } from "./sheet-Bi-Q7ojW.js";
import { u as useMutation } from "./useMutation-C725G2l4.js";
function mapCoupon(c) {
  var _a;
  return {
    id: ((_a = c.id) == null ? void 0 : _a.toString()) ?? "",
    code: c.code ?? "",
    discountType: c.discountType === "Percentage" ? "percentage" : "fixed",
    discountValue: Number(c.discountValue ?? 0),
    minOrderAmount: c.minOrderAmount != null ? Number(c.minOrderAmount) : void 0,
    maxUses: c.maxUses != null ? Number(c.maxUses) : void 0,
    usedCount: Number(c.usedCount ?? 0),
    isActive: Boolean(c.isActive),
    expiryDate: c.expiryDate != null ? new Date(Number(c.expiryDate) / 1e6).toISOString().split("T")[0] : void 0
  };
}
function toBackendInput(input) {
  return {
    code: input.code.trim().toUpperCase(),
    discountType: input.discountType === "percentage" ? DiscountType.Percentage : DiscountType.Fixed,
    discountValue: BigInt(Math.round(input.discountValue)),
    minOrderAmount: input.minOrderAmount != null ? BigInt(Math.round(input.minOrderAmount)) : void 0,
    maxUses: input.maxUses != null ? BigInt(Math.round(input.maxUses)) : void 0,
    isActive: input.isActive,
    expiryDate: input.expiryDate ? BigInt(new Date(input.expiryDate).getTime()) * 1000000n : void 0
  };
}
function useAdminCoupons() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  return useQuery({
    queryKey: ["admin", "coupons"],
    queryFn: async () => {
      if (!actor || !adminToken) return [];
      const result = await actor.adminListCoupons(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      return (result.ok ?? []).map(mapCoupon);
    },
    enabled: !!actor && !isFetching && !!adminToken
  });
}
function useAdminCreateCoupon() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminCreateCoupon(
        adminToken,
        toBackendInput(input)
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapCoupon(result.ok);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: (err) => {
      console.error("Create coupon failed:", err);
    }
  });
}
function useAdminUpdateCoupon() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminUpdateCoupon(
        adminToken,
        BigInt(id),
        toBackendInput(input)
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: (err) => {
      console.error("Update coupon failed:", err);
    }
  });
}
function useAdminDeleteCoupon() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
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
    }
  });
}
function useValidateCoupon() {
  const { actor } = useSharedActor();
  return useMutation({
    mutationFn: async ({
      code,
      orderTotal
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.validateCoupon(
        code.trim().toUpperCase(),
        BigInt(Math.round(orderTotal))
      );
      if (result.__kind__ === "Invalid") {
        return {
          valid: false,
          discountAmount: 0,
          message: result.Invalid ?? "Invalid or expired coupon code."
        };
      }
      return {
        valid: true,
        discountAmount: Number(result.Valid.discountAmount ?? 0),
        message: "Coupon applied successfully!"
      };
    }
  });
}
export {
  useAdminCoupons as a,
  useAdminCreateCoupon as b,
  useAdminUpdateCoupon as c,
  useAdminDeleteCoupon as d,
  useValidateCoupon as u
};
