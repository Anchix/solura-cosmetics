import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import ProductTypes "../types/product";
import CommonTypes "../types/common";
import ProductLib "../lib/product";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : List.List<ProductTypes.Product>,
  banners : List.List<ProductTypes.Banner>,
  nextProductId : { var value : Nat },
  nextBannerId : { var value : Nat },
) {
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

  public shared ({ caller }) func adminCreateProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let id = nextProductId.value;
    nextProductId.value += 1;
    ProductLib.createProduct(products, id, input);
  };

  public shared ({ caller }) func adminUpdateProduct(id : CommonTypes.ProductId, input : ProductTypes.ProductInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func adminDeleteProduct(id : CommonTypes.ProductId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(products, id);
  };

  public query func listBanners() : async [ProductTypes.Banner] {
    ProductLib.listBanners(banners);
  };

  public shared ({ caller }) func adminAddBanner(name : Text, image : Storage.ExternalBlob) : async ProductTypes.Banner {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add banners");
    };
    let id = nextBannerId.value;
    nextBannerId.value += 1;
    ProductLib.addBanner(banners, id, name, image);
  };

  public shared ({ caller }) func adminDeleteBanner(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete banners");
    };
    ProductLib.deleteBanner(banners, id);
  };
};
