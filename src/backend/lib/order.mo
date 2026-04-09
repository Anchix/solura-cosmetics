import List "mo:core/List";
import Array "mo:core/Array";
import OrderTypes "../types/order";
import CommonTypes "../types/common";

module {
  let GST_RATE : Nat = 18;
  let COD_SURCHARGE : Nat = 40;
  let COMPANY_NAME : Text = "Solura Cosmetics";
  let COMPANY_ADDRESS : Text = "184 South Manthai Street, Pallapatti, Karur, Tamil Nadu 639205";
  let GST_NUMBER : Text = "33AFUFS3776C1ZM";
  let NANOSECONDS_PER_DAY : Int = 86_400_000_000_000;

  public func calculateTotal(
    items : [OrderTypes.OrderItem],
    paymentMethod : OrderTypes.PaymentMethod,
    discountAmount : Nat,
  ) : { subtotal : Nat; gstAmount : Nat; codSurcharge : Nat; totalAmount : Nat } {
    let subtotal = items.foldLeft(
      0,
      func(acc : Nat, item : OrderTypes.OrderItem) : Nat { acc + item.price * item.quantity },
    );
    let gstAmount = subtotal * GST_RATE / 100;
    let codSurcharge = switch (paymentMethod) {
      case (#COD) { COD_SURCHARGE };
      case (_) { 0 };
    };
    let baseTotal = subtotal + gstAmount + codSurcharge;
    let totalAmount = if (discountAmount >= baseTotal) { 0 } else { baseTotal - discountAmount };
    { subtotal; gstAmount; codSurcharge; totalAmount };
  };

  public func createOrder(
    orders : List.List<OrderTypes.Order>,
    nextId : Nat,
    input : OrderTypes.OrderInput,
    userId : ?Principal,
    now : Int,
    discountAmount : Nat,
  ) : OrderTypes.Order {
    let totals = calculateTotal(input.items, input.paymentMethod, discountAmount);
    let order : OrderTypes.Order = {
      id = nextId;
      userId = userId;
      items = input.items;
      customer = input.customer;
      paymentMethod = input.paymentMethod;
      paymentStatus = #Pending;
      orderStatus = #Pending;
      subtotal = totals.subtotal;
      gstAmount = totals.gstAmount;
      codSurcharge = totals.codSurcharge;
      discountAmount = discountAmount;
      totalAmount = totals.totalAmount;
      razorpayOrderId = input.razorpayOrderId;
      couponCode = input.couponCode;
      createdAt = now;
    };
    orders.add(order);
    order;
  };

  public func getOrder(
    orders : List.List<OrderTypes.Order>,
    id : CommonTypes.OrderId,
  ) : ?OrderTypes.Order {
    orders.find(func(o) { o.id == id });
  };

  public func listOrdersByUser(
    orders : List.List<OrderTypes.Order>,
    userId : Principal,
  ) : [OrderTypes.Order] {
    orders.filter(func(o) {
      switch (o.userId) {
        case (?uid) { uid == userId };
        case null { false };
      }
    }).toArray();
  };

  public func listAllOrders(
    orders : List.List<OrderTypes.Order>,
  ) : [OrderTypes.Order] {
    orders.toArray();
  };

  public func updateOrderStatus(
    orders : List.List<OrderTypes.Order>,
    id : CommonTypes.OrderId,
    status : OrderTypes.OrderStatus,
  ) : Bool {
    let existing = orders.find(func(o) { o.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        orders.mapInPlace(func(order) {
          if (order.id == id) { { order with orderStatus = status } }
          else { order }
        });
        true
      };
    };
  };

  public func updatePaymentStatus(
    orders : List.List<OrderTypes.Order>,
    id : CommonTypes.OrderId,
    status : OrderTypes.PaymentStatus,
    razorpayOrderId : ?Text,
  ) : Bool {
    let existing = orders.find(func(o) { o.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        orders.mapInPlace(func(order) {
          if (order.id == id) {
            {
              order with
              paymentStatus = status;
              razorpayOrderId = switch (razorpayOrderId) {
                case (?rid) { ?rid };
                case null { order.razorpayOrderId };
              };
            }
          } else { order }
        });
        true
      };
    };
  };

  public func getInvoiceData(
    order : OrderTypes.Order,
  ) : OrderTypes.InvoiceData {
    {
      orderId = order.id;
      customer = order.customer;
      items = order.items;
      subtotal = order.subtotal;
      gstAmount = order.gstAmount;
      codSurcharge = order.codSurcharge;
      discountAmount = order.discountAmount;
      totalAmount = order.totalAmount;
      paymentMethod = order.paymentMethod;
      paymentStatus = order.paymentStatus;
      orderDate = order.createdAt;
      gstNumber = GST_NUMBER;
      companyName = COMPANY_NAME;
      companyAddress = COMPANY_ADDRESS;
      couponCode = order.couponCode;
    };
  };

  public func getLast7DaysAnalytics(
    orders : List.List<OrderTypes.Order>,
    now : Int,
  ) : [OrderTypes.DailyAnalytics] {
    // Build array of 7 day slots (day 0 = today, day 6 = 6 days ago)
    let result : [var OrderTypes.DailyAnalytics] = Array.tabulate<OrderTypes.DailyAnalytics>(
      7,
      func(i : Nat) {
        let iInt : Int = i.toInt();
        let dayStart = now - iInt * NANOSECONDS_PER_DAY;
        { date = dayStart; orderCount = 0; revenue = 0 }
      },
    ).toVarArray();

    orders.forEach(func(order) {
      let ageInDays : Int = (now - order.createdAt) / NANOSECONDS_PER_DAY;
      if (ageInDays >= 0 and ageInDays < 7) {
        let idx = ageInDays.toNat();
        let slot = result[idx];
        result[idx] := {
          date = slot.date;
          orderCount = slot.orderCount + 1;
          revenue = slot.revenue + order.totalAmount;
        };
      };
    });

    Array.tabulate<OrderTypes.DailyAnalytics>(result.size(), func(i) { result[i] });
  };
};
