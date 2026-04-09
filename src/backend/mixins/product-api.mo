import List "mo:core/List";
import ProductTypes "../types/product";
import CommonTypes "../types/common";
import ProductLib "../lib/product";

mixin (
  adminSession : { var token : ?Text },
  products : List.List<ProductTypes.Product>,
  banners : List.List<ProductTypes.Banner>,
  nextProductId : { var value : Nat },
  nextBannerId : { var value : Nat },
) {
  private func verifyProductAdminToken(token : Text) : Bool {
    switch (adminSession.token) {
      case (?t) { t == token };
      case null { false };
    };
  };

  public query func listProducts() : async [ProductTypes.Product] {
    ProductLib.listProducts(products);
  };

  public query func listActiveProducts() : async [ProductTypes.Product] {
    ProductLib.listActiveProducts(products);
  };

  public query func getProduct(id : CommonTypes.ProductId) : async ?ProductTypes.Product {
    ProductLib.getProduct(products, id);
  };

  public query func getBestsellers() : async [ProductTypes.Product] {
    ProductLib.getBestsellers(products);
  };

  public query func getNewArrivals() : async [ProductTypes.Product] {
    ProductLib.getNewArrivals(products);
  };

  public query func getProductsByCategory(category : ProductTypes.ProductCategory) : async [ProductTypes.Product] {
    ProductLib.getByCategory(products, category);
  };

  public func adminCreateProduct(token : Text, input : ProductTypes.ProductInput) : async { #ok : ProductTypes.Product; #err : Text } {
    if (not verifyProductAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    let id = nextProductId.value;
    nextProductId.value += 1;
    #ok(ProductLib.createProduct(products, id, input))
  };

  public func adminUpdateProduct(token : Text, id : CommonTypes.ProductId, input : ProductTypes.ProductInput) : async { #ok : Bool; #err : Text } {
    if (not verifyProductAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(ProductLib.updateProduct(products, id, input))
  };

  public func adminDeleteProduct(token : Text, id : CommonTypes.ProductId) : async { #ok : Bool; #err : Text } {
    if (not verifyProductAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(ProductLib.deleteProduct(products, id))
  };

  public query func listBanners() : async [ProductTypes.Banner] {
    ProductLib.listBanners(banners);
  };

  public func adminAddBanner(token : Text, name : Text, imageUrl : Text) : async { #ok : ProductTypes.Banner; #err : Text } {
    if (not verifyProductAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    let id = nextBannerId.value;
    nextBannerId.value += 1;
    #ok(ProductLib.addBannerUrl(banners, id, name, imageUrl))
  };

  public func adminDeleteBanner(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not verifyProductAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(ProductLib.deleteBanner(banners, id))
  };
};
