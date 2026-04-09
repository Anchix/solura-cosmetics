import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProductTypes "types/product";
import OrderTypes "types/order";
import CouponTypes "types/coupon";
import UserTypes "types/user";
import ReviewTypes "types/review";
import ProductApi "mixins/product-api";
import OrderApi "mixins/order-api";
import UserApi "mixins/user-api";
import ReviewApi "mixins/review-api";
import ChatbotApi "mixins/chatbot-api";
import BlogTypes "types/blog";
import BlogApi "mixins/blog-api";
import CouponApi "mixins/coupon-api";



actor {
  // Authorization state (kept for MixinAuthorization; NOT used for admin product/blog/coupon/order checks)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // ── Admin session token ─────────────────────────────────────────────────────
  // Stored as a mutable record so it can be shared across mixins by reference
  let adminSession = { var token : ?Text = null };

  // Admin login — verifies password and issues a session token stored in canister state
  public func adminLogin(password : Text) : async { #ok : Text; #err : Text } {
    if (password == "solura2024@BHY") {
      let token = "admin-" # Time.now().toText();
      adminSession.token := ?token;
      #ok(token)
    } else {
      #err("Invalid password")
    }
  };

  // Admin logout — clears the session token
  public func adminLogout(token : Text) : async () {
    switch (adminSession.token) {
      case (?t) { if (t == token) { adminSession.token := null } };
      case null {};
    };
  };

  // Verify token — frontend can call this after page refresh to check if still logged in
  public query func adminVerifyToken(token : Text) : async Bool {
    switch (adminSession.token) {
      case (?t) { t == token };
      case null { false };
    };
  };

  // ── Domain state ────────────────────────────────────────────────────────────

  // Product state
  let products = List.empty<ProductTypes.Product>();
  let banners = List.empty<ProductTypes.Banner>();
  let nextProductId = { var value : Nat = 0 };
  let nextBannerId = { var value : Nat = 0 };
  include ProductApi(adminSession, products, banners, nextProductId, nextBannerId);

  // Coupon state
  let coupons = List.empty<CouponTypes.Coupon>();
  let nextCouponId = { var value : Nat = 0 };
  include CouponApi(adminSession, coupons, nextCouponId);

  // Order state
  let orders = List.empty<OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 0 };
  include OrderApi(adminSession, orders, nextOrderId, coupons);

  // User profile state
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();
  include UserApi(accessControlState, userProfiles);

  // Review state
  let reviews = List.empty<ReviewTypes.Review>();
  let nextReviewId = { var value : Nat = 0 };
  include ReviewApi(accessControlState, reviews, nextReviewId);

  // Chatbot & utility state
  include ChatbotApi(accessControlState);

  // Blog state
  let blogPosts = List.empty<BlogTypes.BlogPost>();
  let nextBlogPostId = { var value : Nat = 0 };
  include BlogApi(adminSession, blogPosts, nextBlogPostId);
};
