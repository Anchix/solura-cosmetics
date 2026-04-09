import List "mo:core/List";
import CouponTypes "../types/coupon";

module {
  public func createCoupon(
    coupons : List.List<CouponTypes.Coupon>,
    nextId : Nat,
    input : CouponTypes.CouponInput,
    now : Int,
  ) : { #ok : CouponTypes.Coupon; #err : Text } {
    // Ensure code uniqueness (case-insensitive)
    let upperCode = input.code.toUpper();
    let existing = coupons.find(func(c) { c.code.toUpper() == upperCode });
    switch (existing) {
      case (?_) { #err("Coupon code already exists") };
      case null {
        let coupon : CouponTypes.Coupon = {
          id = nextId;
          code = upperCode;
          discountType = input.discountType;
          discountValue = input.discountValue;
          minOrderAmount = input.minOrderAmount;
          maxUses = input.maxUses;
          usedCount = 0;
          isActive = input.isActive;
          expiryDate = input.expiryDate;
          createdAt = now;
        };
        coupons.add(coupon);
        #ok(coupon)
      };
    };
  };

  public func updateCoupon(
    coupons : List.List<CouponTypes.Coupon>,
    id : Nat,
    input : CouponTypes.CouponInput,
  ) : Bool {
    let existing = coupons.find(func(c) { c.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        let upperCode = input.code.toUpper();
        // Check code uniqueness excluding current coupon
        let codeConflict = coupons.find(func(c) {
          c.id != id and c.code.toUpper() == upperCode
        });
        switch (codeConflict) {
          case (?_) { false };
          case null {
            coupons.mapInPlace(func(c) {
              if (c.id == id) {
                {
                  c with
                  code = upperCode;
                  discountType = input.discountType;
                  discountValue = input.discountValue;
                  minOrderAmount = input.minOrderAmount;
                  maxUses = input.maxUses;
                  isActive = input.isActive;
                  expiryDate = input.expiryDate;
                }
              } else { c }
            });
            true
          };
        };
      };
    };
  };

  public func deleteCoupon(
    coupons : List.List<CouponTypes.Coupon>,
    id : Nat,
  ) : Bool {
    let existing = coupons.find(func(c) { c.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        let filtered = coupons.filter(func(c) { c.id != id });
        coupons.clear();
        coupons.append(filtered);
        true
      };
    };
  };

  public func listCoupons(
    coupons : List.List<CouponTypes.Coupon>,
  ) : [CouponTypes.Coupon] {
    coupons.toArray();
  };

  public func validateCoupon(
    coupons : List.List<CouponTypes.Coupon>,
    code : Text,
    cartTotal : Nat,
    now : Int,
  ) : CouponTypes.CouponValidationResult {
    let upperCode = code.toUpper();
    let found = coupons.find(func(c) { c.code == upperCode });
    switch (found) {
      case null { #Invalid("Coupon code not found") };
      case (?coupon) {
        if (not coupon.isActive) {
          return #Invalid("Coupon is not active");
        };
        switch (coupon.expiryDate) {
          case (?expiry) {
            if (now > expiry) {
              return #Invalid("Coupon has expired");
            };
          };
          case null {};
        };
        switch (coupon.maxUses) {
          case (?maxUses) {
            if (coupon.usedCount >= maxUses) {
              return #Invalid("Coupon usage limit reached");
            };
          };
          case null {};
        };
        switch (coupon.minOrderAmount) {
          case (?minAmount) {
            if (cartTotal < minAmount) {
              return #Invalid("Order total does not meet minimum amount for this coupon");
            };
          };
          case null {};
        };
        let discountAmount = switch (coupon.discountType) {
          case (#Percentage) {
            let amount = cartTotal * coupon.discountValue / 100;
            amount
          };
          case (#Fixed) {
            if (coupon.discountValue > cartTotal) { cartTotal }
            else { coupon.discountValue }
          };
        };
        #Valid({ coupon; discountAmount })
      };
    };
  };

  public func incrementUsage(
    coupons : List.List<CouponTypes.Coupon>,
    code : Text,
  ) {
    let upperCode = code.toUpper();
    coupons.mapInPlace(func(c) {
      if (c.code == upperCode) { { c with usedCount = c.usedCount + 1 } }
      else { c }
    });
  };
};
