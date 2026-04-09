import List "mo:core/List";
import Time "mo:core/Time";
import CouponTypes "../types/coupon";
import CouponLib "../lib/coupon";

mixin (
  adminSession : { var token : ?Text },
  coupons : List.List<CouponTypes.Coupon>,
  nextCouponId : { var value : Nat },
) {
  private func verifyCouponAdminToken(token : Text) : Bool {
    switch (adminSession.token) {
      case (?t) { t == token };
      case null { false };
    };
  };

  // ── Admin: create coupon ──────────────────────────────────────────────────
  public func adminCreateCoupon(
    token : Text,
    input : CouponTypes.CouponInput,
  ) : async { #ok : CouponTypes.Coupon; #err : Text } {
    if (not verifyCouponAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    let id = nextCouponId.value;
    nextCouponId.value += 1;
    CouponLib.createCoupon(coupons, id, input, Time.now())
  };

  // ── Admin: update coupon ──────────────────────────────────────────────────
  public func adminUpdateCoupon(
    token : Text,
    id : Nat,
    input : CouponTypes.CouponInput,
  ) : async { #ok : Bool; #err : Text } {
    if (not verifyCouponAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(CouponLib.updateCoupon(coupons, id, input))
  };

  // ── Admin: delete coupon ──────────────────────────────────────────────────
  public func adminDeleteCoupon(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not verifyCouponAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(CouponLib.deleteCoupon(coupons, id))
  };

  // ── Admin: list all coupons ───────────────────────────────────────────────
  public func adminListCoupons(token : Text) : async { #ok : [CouponTypes.Coupon]; #err : Text } {
    if (not verifyCouponAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(CouponLib.listCoupons(coupons))
  };

  // ── Public: validate a coupon code ────────────────────────────────────────
  public query func validateCoupon(
    code : Text,
    cartTotal : Nat,
  ) : async CouponTypes.CouponValidationResult {
    CouponLib.validateCoupon(coupons, code, cartTotal, Time.now())
  };
};
