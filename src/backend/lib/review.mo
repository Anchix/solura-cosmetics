import List "mo:core/List";
import ReviewTypes "../types/review";
import CommonTypes "../types/common";

module {
  public func createReview(
    reviews : List.List<ReviewTypes.Review>,
    nextId : Nat,
    input : ReviewTypes.ReviewInput,
    userId : Principal,
    now : Int,
  ) : ReviewTypes.Review {
    let review : ReviewTypes.Review = {
      id = nextId;
      productId = input.productId;
      userId = userId;
      rating = if (input.rating > 5) 5 else if (input.rating < 1) 1 else input.rating;
      text = input.text;
      image1 = input.image1;
      image2 = input.image2;
      image3 = input.image3;
      createdAt = now;
    };
    reviews.add(review);
    review;
  };

  public func listReviewsByProduct(
    reviews : List.List<ReviewTypes.Review>,
    productId : CommonTypes.ProductId,
  ) : [ReviewTypes.Review] {
    reviews.filter(func(r) { r.productId == productId }).toArray();
  };

  public func getProductRating(
    reviews : List.List<ReviewTypes.Review>,
    productId : CommonTypes.ProductId,
  ) : ReviewTypes.ProductRating {
    let productReviews = reviews.filter(func(r) { r.productId == productId });
    let count = productReviews.size();
    if (count == 0) {
      return { productId; averageRating = 0; reviewCount = 0 };
    };
    let totalRating = productReviews.foldLeft(0 : Nat, func(acc : Nat, r : ReviewTypes.Review) : Nat { acc + r.rating });
    let avg = totalRating / count;
    { productId; averageRating = avg; reviewCount = count };
  };

  public func deleteReview(
    reviews : List.List<ReviewTypes.Review>,
    reviewId : CommonTypes.ReviewId,
    callerId : Principal,
    isAdmin : Bool,
  ) : Bool {
    let existing = reviews.find(func(r) { r.id == reviewId });
    switch (existing) {
      case null { false };
      case (?r) {
        if (not isAdmin and r.userId != callerId) {
          return false;
        };
        let filtered = reviews.filter(func(rev) { rev.id != reviewId });
        reviews.clear();
        reviews.append(filtered);
        true
      };
    };
  };
};
