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
    image1 : ?Text;
    image2 : ?Text;
    image3 : ?Text;
    image4 : ?Text;
    image5 : ?Text;
    image6 : ?Text;
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
    image1 : ?Text;
    image2 : ?Text;
    image3 : ?Text;
    image4 : ?Text;
    image5 : ?Text;
    image6 : ?Text;
    stock : Nat;
    status : ProductStatus;
    isBestseller : Bool;
    isNew : Bool;
  };

  public type Banner = {
    id : Nat;
    name : Text;
    imageUrl : Text;
    createdAt : Int;
  };
};
