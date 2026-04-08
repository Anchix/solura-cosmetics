import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/order";
import CommonTypes "../types/common";
import OrderLib "../lib/order";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<OrderTypes.Order>,
  nextOrderId : { var value : Nat },
) {
  public shared ({ caller }) func createOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    let userId : ?Principal = if (caller.isAnonymous()) null else ?caller;
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    OrderLib.createOrder(orders, id, input, userId, Time.now());
  };

  public query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?OrderTypes.Order {
    switch (OrderLib.getOrder(orders, id)) {
      case null { null };
      case (?order) {
        // Allow admin to view any order; users can only view their own
        if (AccessControl.isAdmin(accessControlState, caller)) {
          ?order
        } else {
          switch (order.userId) {
            case (?uid) { if (uid == caller) ?order else null };
            case null { ?order }; // guest order accessible by anyone with id
          }
        }
      };
    };
  };

  public query ({ caller }) func listMyOrders() : async [OrderTypes.Order] {
    OrderLib.listOrdersByUser(orders, caller);
  };

  public query ({ caller }) func adminListAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAllOrders(orders);
  };

  public shared ({ caller }) func adminUpdateOrderStatus(id : CommonTypes.OrderId, status : OrderTypes.OrderStatus) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, id, status);
  };

  public shared ({ caller }) func updatePaymentStatus(id : CommonTypes.OrderId, status : OrderTypes.PaymentStatus, razorpayOrderId : ?Text) : async Bool {
    OrderLib.updatePaymentStatus(orders, id, status, razorpayOrderId);
  };

  public query ({ caller }) func getInvoice(id : CommonTypes.OrderId) : async ?OrderTypes.InvoiceData {
    switch (OrderLib.getOrder(orders, id)) {
      case null { null };
      case (?order) {
        // Allow admin or order owner to get invoice
        if (AccessControl.isAdmin(accessControlState, caller)) {
          ?OrderLib.getInvoiceData(order)
        } else {
          switch (order.userId) {
            case (?uid) {
              if (uid == caller) ?OrderLib.getInvoiceData(order) else null
            };
            case null { ?OrderLib.getInvoiceData(order) };
          }
        }
      };
    };
  };

  public query ({ caller }) func adminGetAnalytics() : async [OrderTypes.DailyAnalytics] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    OrderLib.getLast7DaysAnalytics(orders, Time.now());
  };
};
