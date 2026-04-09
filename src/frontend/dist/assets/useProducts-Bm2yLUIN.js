import { h as useSharedActor, k as useQuery, l as useQueryClient, P as ProductStatus, m as ProductCategory } from "./index-BrjEsxOs.js";
import { u as useAuthStore } from "./authStore-DllIseEP.js";
import { u as useMutation } from "./useMutation-C6TNdxjV.js";
function mapCategory(cat) {
  switch (cat) {
    case ProductCategory.Skincare:
      return "skincare";
    case ProductCategory.Makeup:
      return "makeup";
    case ProductCategory.Haircare:
      return "haircare";
    default:
      return "skincare";
  }
}
function toBackendCategory(cat) {
  switch (cat.toLowerCase()) {
    case "makeup":
      return ProductCategory.Makeup;
    case "haircare":
      return ProductCategory.Haircare;
    default:
      return ProductCategory.Skincare;
  }
}
function extractImages(p) {
  return [p.image1, p.image2, p.image3, p.image4, p.image5, p.image6].filter((url) => !!(url == null ? void 0 : url.trim())).map((url) => url.trim());
}
function mapProduct(p) {
  return {
    id: p.id.toString(),
    name: p.name,
    slug: p.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    category: mapCategory(p.category),
    price: Number(p.price),
    description: p.description,
    shortDescription: p.description.slice(0, 80),
    images: extractImages(p),
    rating: 0,
    reviewCount: 0,
    inStock: p.status === ProductStatus.active && p.stock > 0n,
    stock: Number(p.stock),
    isBestseller: p.isBestseller,
    isNew: p.isNew,
    isLowStock: p.stock > 0n && p.stock <= 10n,
    tags: [],
    createdAt: new Date(Number(p.createdAt / 1000000n)).toISOString(),
    updatedAt: new Date(Number(p.createdAt / 1000000n)).toISOString()
  };
}
function toImageUrl(url) {
  return (url == null ? void 0 : url.trim()) || void 0;
}
function toProductInput(product) {
  const imgs = (product.images ?? []).slice(0, 6);
  return {
    name: product.name ?? "",
    description: product.description ?? "",
    price: BigInt(Math.round(product.price ?? 0)),
    stock: BigInt(Math.round(product.stock ?? 0)),
    category: toBackendCategory(product.category ?? "skincare"),
    isBestseller: product.isBestseller ?? false,
    isNew: product.isNew ?? false,
    status: product.inStock !== false ? ProductStatus.active : ProductStatus.inactive,
    image1: toImageUrl(imgs[0]),
    image2: toImageUrl(imgs[1]),
    image3: toImageUrl(imgs[2]),
    image4: toImageUrl(imgs[3]),
    image5: toImageUrl(imgs[4]),
    image6: toImageUrl(imgs[5])
  };
}
function parseBigInt(id) {
  const num = Number(id);
  return Number.isNaN(num) ? 0n : BigInt(num);
}
function useProducts(category) {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      let results;
      if (category) {
        results = await actor.getProductsByCategory(
          toBackendCategory(category)
        );
      } else {
        results = await actor.listActiveProducts();
      }
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching
  });
}
function useProduct(id) {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const numId = parseBigInt(id);
      if (numId > 0n) {
        const result = await actor.getProduct(numId);
        return result ? mapProduct(result) : null;
      }
      const all = await actor.listActiveProducts();
      const slug = id.toLowerCase();
      const match = all.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
      );
      return match ? mapProduct(match) : null;
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useBestsellers() {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["products", "bestsellers"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getBestsellers();
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching
  });
}
function useNewArrivals() {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getNewArrivals();
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching
  });
}
function useProductReviews(productId) {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor || !productId) return [];
      const numId = parseBigInt(productId);
      if (numId <= 0n) return [];
      const results = await actor.listReviewsByProduct(numId);
      return results.map((r) => ({
        id: r.id.toString(),
        productId: r.productId.toString(),
        userId: r.userId.toText(),
        userName: "Verified Customer",
        rating: Number(r.rating),
        title: "",
        body: r.text,
        images: [r.image1, r.image2, r.image3].filter(Boolean).map((img) => img.getDirectURL()),
        verified: true,
        createdAt: new Date(Number(r.createdAt / 1000000n)).toISOString()
      }));
    },
    enabled: !!actor && !isFetching && !!productId
  });
}
function useSubmitReview() {
  const { actor } = useSharedActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      rating,
      body
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const numId = parseBigInt(productId);
      return actor.createReview({
        productId: numId,
        rating: BigInt(rating),
        text: body
      });
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", vars.productId] });
    }
  });
}
function useAdminProducts() {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listProducts();
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching
  });
}
function useAdminCreateProduct() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const input = toProductInput(product);
      const result = await actor.adminCreateProduct(adminToken, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapProduct(result.ok);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (err) => {
      console.error("Create product failed:", err);
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    }
  });
}
function useAdminUpdateProduct() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      product
    }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const numId = parseBigInt(id);
      const input = toProductInput(product);
      const result = await actor.adminUpdateProduct(adminToken, numId, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["product", vars.id] });
    },
    onError: (err) => {
      console.error("Update product failed:", err);
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    }
  });
}
function useAdminDeleteProduct() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const numId = parseBigInt(id);
      const result = await actor.adminDeleteProduct(adminToken, numId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    }
  });
}
export {
  useNewArrivals as a,
  useProducts as b,
  useProduct as c,
  useProductReviews as d,
  useSubmitReview as e,
  useAdminProducts as f,
  useAdminCreateProduct as g,
  useAdminUpdateProduct as h,
  useAdminDeleteProduct as i,
  useBestsellers as u
};
