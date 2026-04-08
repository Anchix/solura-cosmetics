import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProductTypes "types/product";
import OrderTypes "types/order";
import UserTypes "types/user";
import ReviewTypes "types/review";
import ProductApi "mixins/product-api";
import OrderApi "mixins/order-api";
import UserApi "mixins/user-api";
import ReviewApi "mixins/review-api";
import ChatbotApi "mixins/chatbot-api";
import BlogTypes "types/blog";
import BlogApi "mixins/blog-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Product state
  let products = List.empty<ProductTypes.Product>();
  let banners = List.empty<ProductTypes.Banner>();
  let nextProductId = { var value : Nat = 0 };
  let nextBannerId = { var value : Nat = 0 };
  include ProductApi(accessControlState, products, banners, nextProductId, nextBannerId);

  // Order state
  let orders = List.empty<OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 0 };
  include OrderApi(accessControlState, orders, nextOrderId);

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
  include BlogApi(accessControlState, blogPosts, nextBlogPostId);
};
