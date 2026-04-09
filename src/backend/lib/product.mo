import List "mo:core/List";
import Time "mo:core/Time";
import ProductTypes "../types/product";
import CommonTypes "../types/common";

module {
  public func createProduct(
    products : List.List<ProductTypes.Product>,
    nextId : Nat,
    input : ProductTypes.ProductInput,
  ) : ProductTypes.Product {
    let product : ProductTypes.Product = {
      id = nextId;
      name = input.name;
      category = input.category;
      price = input.price;
      description = input.description;
      image1 = input.image1;
      image2 = input.image2;
      image3 = input.image3;
      image4 = input.image4;
      image5 = input.image5;
      image6 = input.image6;
      stock = input.stock;
      status = input.status;
      isBestseller = input.isBestseller;
      isNew = input.isNew;
      createdAt = Time.now();
    };
    products.add(product);
    product;
  };

  public func getProduct(
    products : List.List<ProductTypes.Product>,
    id : CommonTypes.ProductId,
  ) : ?ProductTypes.Product {
    products.find(func(p) { p.id == id });
  };

  public func listProducts(
    products : List.List<ProductTypes.Product>,
  ) : [ProductTypes.Product] {
    products.toArray();
  };

  public func listActiveProducts(
    products : List.List<ProductTypes.Product>,
  ) : [ProductTypes.Product] {
    products.filter(func(p) { p.status == #active }).toArray();
  };

  public func updateProduct(
    products : List.List<ProductTypes.Product>,
    id : CommonTypes.ProductId,
    input : ProductTypes.ProductInput,
  ) : Bool {
    let existing = products.find(func(p) { p.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        products.mapInPlace(func(product) {
          if (product.id == id) {
            {
              product with
              name = input.name;
              category = input.category;
              price = input.price;
              description = input.description;
              image1 = input.image1;
              image2 = input.image2;
              image3 = input.image3;
              image4 = input.image4;
              image5 = input.image5;
              image6 = input.image6;
              stock = input.stock;
              status = input.status;
              isBestseller = input.isBestseller;
              isNew = input.isNew;
            }
          } else {
            product
          }
        });
        true
      };
    };
  };

  public func deleteProduct(
    products : List.List<ProductTypes.Product>,
    id : CommonTypes.ProductId,
  ) : Bool {
    let existing = products.find(func(p) { p.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        let filtered = products.filter(func(p) { p.id != id });
        products.clear();
        products.append(filtered);
        true
      };
    };
  };

  public func getBestsellers(
    products : List.List<ProductTypes.Product>,
  ) : [ProductTypes.Product] {
    products.filter(func(p) { p.isBestseller and p.status == #active }).toArray();
  };

  public func getNewArrivals(
    products : List.List<ProductTypes.Product>,
  ) : [ProductTypes.Product] {
    products.filter(func(p) { p.isNew and p.status == #active }).toArray();
  };

  public func getByCategory(
    products : List.List<ProductTypes.Product>,
    category : ProductTypes.ProductCategory,
  ) : [ProductTypes.Product] {
    products.filter(func(p) { p.category == category and p.status == #active }).toArray();
  };

  public func addBannerUrl(
    banners : List.List<ProductTypes.Banner>,
    nextId : Nat,
    name : Text,
    imageUrl : Text,
  ) : ProductTypes.Banner {
    let banner : ProductTypes.Banner = {
      id = nextId;
      name = name;
      imageUrl = imageUrl;
      createdAt = Time.now();
    };
    banners.add(banner);
    banner;
  };

  public func listBanners(
    banners : List.List<ProductTypes.Banner>,
  ) : [ProductTypes.Banner] {
    banners.toArray();
  };

  public func deleteBanner(
    banners : List.List<ProductTypes.Banner>,
    id : Nat,
  ) : Bool {
    let existing = banners.find(func(b) { b.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        let filtered = banners.filter(func(b) { b.id != id });
        banners.clear();
        banners.append(filtered);
        true
      };
    };
  };
};
