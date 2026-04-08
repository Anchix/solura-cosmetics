import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewTypes "../types/review";
import CommonTypes "../types/common";
import ReviewLib "../lib/review";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : List.List<ReviewTypes.Review>,
  nextReviewId : { var value : Nat },
) {
  public shared ({ caller }) func createReview(input : ReviewTypes.ReviewInput) : async ReviewTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to leave a review");
    };
    let id = nextReviewId.value;
    nextReviewId.value += 1;
    ReviewLib.createReview(reviews, id, input, caller, Time.now());
  };

  public query func listReviewsByProduct(productId : CommonTypes.ProductId) : async [ReviewTypes.Review] {
    ReviewLib.listReviewsByProduct(reviews, productId);
  };

  public query func getProductRating(productId : CommonTypes.ProductId) : async ReviewTypes.ProductRating {
    ReviewLib.getProductRating(reviews, productId);
  };

  public shared ({ caller }) func deleteReview(reviewId : CommonTypes.ReviewId) : async Bool {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    ReviewLib.deleteReview(reviews, reviewId, caller, isAdmin);
  };
};
