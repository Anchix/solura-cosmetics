import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Review = {
    id : Nat;
    productId : Nat;
    userId : Principal;
    rating : Nat;
    text : Text;
    image1 : ?Storage.ExternalBlob;
    image2 : ?Storage.ExternalBlob;
    image3 : ?Storage.ExternalBlob;
    createdAt : Int;
  };

  public type ReviewInput = {
    productId : Nat;
    rating : Nat;
    text : Text;
    image1 : ?Storage.ExternalBlob;
    image2 : ?Storage.ExternalBlob;
    image3 : ?Storage.ExternalBlob;
  };

  public type ProductRating = {
    productId : Nat;
    averageRating : Nat;
    reviewCount : Nat;
  };
};
