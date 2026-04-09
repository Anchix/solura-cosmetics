import List "mo:core/List";
import Time "mo:core/Time";
import OrderTypes "../types/order";
import CouponTypes "../types/coupon";
import CommonTypes "../types/common";
import OrderLib "../lib/order";
import CouponLib "../lib/coupon";

mixin (
  adminSession : { var token : ?Text },
  orders : List.List<OrderTypes.Order>,
  nextOrderId : { var value : Nat },
  coupons : List.List<CouponTypes.Coupon>,
) {
  private func verifyOrderAdminToken(token : Text) : Bool {
    switch (adminSession.token) {
      case (?t) { t == token };
      case null { false };
    };
  };

  public shared ({ caller }) func createOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    let userId : ?Principal = if (caller.isAnonymous()) null else ?caller;
    let id = nextOrderId.value;
    nextOrderId.value += 1;

    // Resolve discount if coupon code provided
    let discountAmount : Nat = switch (input.couponCode) {
      case null { 0 };
      case (?code) {
        // Calculate subtotal for validation
        let subtotal = input.items.foldLeft(
          0,
          func(acc : Nat, item : OrderTypes.OrderItem) : Nat { acc + item.price * item.quantity },
        );
        switch (CouponLib.validateCoupon(coupons, code, subtotal, Time.now())) {
          case (#Valid({ discountAmount = amt; coupon = _ })) {
            CouponLib.incrementUsage(coupons, code);
            amt
          };
          case (#Invalid(_)) { 0 };
        }
      };
    };

    OrderLib.createOrder(orders, id, input, userId, Time.now(), discountAmount);
  };

  public query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?OrderTypes.Order {
    OrderLib.getOrder(orders, id);
  };

  public query ({ caller }) func listMyOrders() : async [OrderTypes.Order] {
    OrderLib.listOrdersByUser(orders, caller);
  };

  public func adminListAllOrders(token : Text) : async { #ok : [OrderTypes.Order]; #err : Text } {
    if (not verifyOrderAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(OrderLib.listAllOrders(orders))
  };

  public func adminUpdateOrderStatus(token : Text, id : CommonTypes.OrderId, status : OrderTypes.OrderStatus) : async { #ok : Bool; #err : Text } {
    if (not verifyOrderAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(OrderLib.updateOrderStatus(orders, id, status))
  };

  public shared ({ caller }) func updatePaymentStatus(id : CommonTypes.OrderId, status : OrderTypes.PaymentStatus, razorpayOrderId : ?Text) : async Bool {
    OrderLib.updatePaymentStatus(orders, id, status, razorpayOrderId);
  };

  public query ({ caller }) func getInvoice(id : CommonTypes.OrderId) : async ?OrderTypes.InvoiceData {
    switch (OrderLib.getOrder(orders, id)) {
      case null { null };
      case (?order) { ?OrderLib.getInvoiceData(order) };
    };
  };

  public func adminGetAnalytics(token : Text) : async { #ok : [OrderTypes.DailyAnalytics]; #err : Text } {
    if (not verifyOrderAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(OrderLib.getLast7DaysAnalytics(orders, Time.now()))
  };
};
