module {
  public type PaymentMethod = {
    #Razorpay;
    #COD;
  };

  public type PaymentStatus = {
    #Pending;
    #Paid;
    #Failed;
    #Refunded;
  };

  public type OrderStatus = {
    #Pending;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type OrderItem = {
    productId : Nat;
    name : Text;
    quantity : Nat;
    price : Nat;
  };

  public type CustomerInfo = {
    name : Text;
    email : Text;
    phone : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    pincode : Text;
  };

  public type Order = {
    id : Nat;
    userId : ?Principal;
    items : [OrderItem];
    customer : CustomerInfo;
    paymentMethod : PaymentMethod;
    paymentStatus : PaymentStatus;
    orderStatus : OrderStatus;
    subtotal : Nat;
    gstAmount : Nat;
    codSurcharge : Nat;
    totalAmount : Nat;
    razorpayOrderId : ?Text;
    createdAt : Int;
  };

  public type OrderInput = {
    items : [OrderItem];
    customer : CustomerInfo;
    paymentMethod : PaymentMethod;
    razorpayOrderId : ?Text;
  };

  public type InvoiceData = {
    orderId : Nat;
    customer : CustomerInfo;
    items : [OrderItem];
    subtotal : Nat;
    gstAmount : Nat;
    codSurcharge : Nat;
    totalAmount : Nat;
    paymentMethod : PaymentMethod;
    paymentStatus : PaymentStatus;
    orderDate : Int;
    gstNumber : Text;
    companyName : Text;
    companyAddress : Text;
  };

  public type DailyAnalytics = {
    date : Int;
    orderCount : Nat;
    revenue : Nat;
  };
};
