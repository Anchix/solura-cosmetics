module {
  public type DiscountType = {
    #Percentage;
    #Fixed;
  };

  public type Coupon = {
    id : Nat;
    code : Text;
    discountType : DiscountType;
    discountValue : Nat;
    minOrderAmount : ?Nat;
    maxUses : ?Nat;
    usedCount : Nat;
    isActive : Bool;
    expiryDate : ?Int;
    createdAt : Int;
  };

  public type CouponInput = {
    code : Text;
    discountType : DiscountType;
    discountValue : Nat;
    minOrderAmount : ?Nat;
    maxUses : ?Nat;
    isActive : Bool;
    expiryDate : ?Int;
  };

  public type CouponValidationResult = {
    #Valid : { coupon : Coupon; discountAmount : Nat };
    #Invalid : Text;
  };
};
