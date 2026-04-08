import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import ProductTypes "types/product";

module {
  // Old Product type inline (before image6 was added)
  // Uses same field types as current Product to satisfy subtype check

  type OldProduct = {
    id : Nat;
    name : Text;
    category : ProductTypes.ProductCategory;
    price : Nat;
    description : Text;
    image1 : ?Storage.ExternalBlob;
    image2 : ?Storage.ExternalBlob;
    image3 : ?Storage.ExternalBlob;
    image4 : ?Storage.ExternalBlob;
    image5 : ?Storage.ExternalBlob;
    image6 : ?Storage.ExternalBlob;
    stock : Nat;
    status : ProductTypes.ProductStatus;
    isBestseller : Bool;
    isNew : Bool;
    createdAt : Int;
  };

  type OldBanner = {
    id : Nat;
    name : Text;
    image : Storage.ExternalBlob;
    createdAt : Int;
  };

  type OldActor = {
    products : List.List<OldProduct>;
    banners : List.List<OldBanner>;
    nextProductId : { var value : Nat };
    nextBannerId : { var value : Nat };
  };

  type NewActor = {
    products : List.List<ProductTypes.Product>;
    banners : List.List<ProductTypes.Banner>;
    nextProductId : { var value : Nat };
    nextBannerId : { var value : Nat };
  };

  public func run(old : OldActor) : NewActor {
    {
      products = old.products;
      banners = old.banners;
      nextProductId = old.nextProductId;
      nextBannerId = old.nextBannerId;
    };
  };
};
