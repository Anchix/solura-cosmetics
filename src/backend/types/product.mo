import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ProductCategory = {
    #Skincare;
    #Makeup;
    #Haircare;
  };

  public type ProductStatus = {
    #active;
    #inactive;
  };

  public type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    price : Nat;
    description : Text;
    image1 : ?Storage.ExternalBlob;
    image2 : ?Storage.ExternalBlob;
    image3 : ?Storage.ExternalBlob;
    image4 : ?Storage.ExternalBlob;
    image5 : ?Storage.ExternalBlob;
    image6 : ?Storage.ExternalBlob;
    stock : Nat;
    status : ProductStatus;
    isBestseller : Bool;
    isNew : Bool;
    createdAt : Int;
  };

  public type ProductInput = {
    name : Text;
    category : ProductCategory;
    price : Nat;
    description : Text;
    image1 : ?Storage.ExternalBlob;
    image2 : ?Storage.ExternalBlob;
    image3 : ?Storage.ExternalBlob;
    image4 : ?Storage.ExternalBlob;
    image5 : ?Storage.ExternalBlob;
    image6 : ?Storage.ExternalBlob;
    stock : Nat;
    status : ProductStatus;
    isBestseller : Bool;
    isNew : Bool;
  };

  public type Banner = {
    id : Nat;
    name : Text;
    image : Storage.ExternalBlob;
    createdAt : Int;
  };
};
