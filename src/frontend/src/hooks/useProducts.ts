import {
  ProductCategory as BackendProductCategory,
  ProductStatus,
} from "@/backend";
import type {
  Product as BackendProduct,
  ProductInput as BackendProductInput,
} from "@/backend";
import { useSharedActor } from "@/context/ActorContext";
import { useAuthStore } from "@/store/authStore";
import type { Product, ProductCategory } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Data mapping ─────────────────────────────────────────────────────────────

function mapCategory(cat: BackendProductCategory): ProductCategory {
  switch (cat) {
    case BackendProductCategory.Skincare:
      return "skincare";
    case BackendProductCategory.Makeup:
      return "makeup";
    case BackendProductCategory.Haircare:
      return "haircare";
    default:
      return "skincare";
  }
}

function toBackendCategory(cat: string): BackendProductCategory {
  switch (cat.toLowerCase()) {
    case "makeup":
      return BackendProductCategory.Makeup;
    case "haircare":
      return BackendProductCategory.Haircare;
    default:
      return BackendProductCategory.Skincare;
  }
}

function extractImages(p: BackendProduct): string[] {
  return [p.image1, p.image2, p.image3, p.image4, p.image5, p.image6]
    .filter((url): url is string => !!url?.trim())
    .map((url) => url.trim());
}

function mapProduct(p: BackendProduct): Product {
  return {
    id: p.id.toString(),
    name: p.name,
    slug: p.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
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
    createdAt: new Date(Number(p.createdAt / 1_000_000n)).toISOString(),
    updatedAt: new Date(Number(p.createdAt / 1_000_000n)).toISOString(),
  };
}

function toImageUrl(url: string | undefined): string | undefined {
  return url?.trim() || undefined;
}

function toProductInput(product: Partial<Product>): BackendProductInput {
  const imgs = (product.images ?? []).slice(0, 6);
  return {
    name: product.name ?? "",
    description: product.description ?? "",
    price: BigInt(Math.round(product.price ?? 0)),
    stock: BigInt(Math.round(product.stock ?? 0)),
    category: toBackendCategory(product.category ?? "skincare"),
    isBestseller: product.isBestseller ?? false,
    isNew: product.isNew ?? false,
    status:
      product.inStock !== false ? ProductStatus.active : ProductStatus.inactive,
    image1: toImageUrl(imgs[0]),
    image2: toImageUrl(imgs[1]),
    image3: toImageUrl(imgs[2]),
    image4: toImageUrl(imgs[3]),
    image5: toImageUrl(imgs[4]),
    image6: toImageUrl(imgs[5]),
  };
}

function parseBigInt(id: string): bigint {
  const num = Number(id);
  return Number.isNaN(num) ? 0n : BigInt(num);
}

// ─── Public hooks ─────────────────────────────────────────────────────────────

export function useProducts(category?: ProductCategory) {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Product[]>({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      let results: BackendProduct[];
      if (category) {
        results = await actor.getProductsByCategory(
          toBackendCategory(category),
        );
      } else {
        results = await actor.listActiveProducts();
      }
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Product | null>({
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
        (p) =>
          p.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") === slug,
      );
      return match ? mapProduct(match) : null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useBestsellers() {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Product[]>({
    queryKey: ["products", "bestsellers"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getBestsellers();
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNewArrivals() {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Product[]>({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getNewArrivals();
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductReviews(productId: string) {
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
        images: [r.image1, r.image2, r.image3]
          .filter(Boolean)
          .map((img) => img!.getDirectURL()),
        verified: true,
        createdAt: new Date(Number(r.createdAt / 1_000_000n)).toISOString(),
      }));
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useSubmitReview() {
  const { actor } = useSharedActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      rating,
      body,
    }: {
      productId: string;
      userId: string;
      userName: string;
      rating: number;
      title: string;
      body: string;
      images: string[];
      verified: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const numId = parseBigInt(productId);
      return actor.createReview({
        productId: numId,
        rating: BigInt(rating),
        text: body,
      });
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", vars.productId] });
    },
  });
}

// ─── Admin hooks ──────────────────────────────────────────────────────────────

export function useAdminProducts() {
  const { actor, isFetching } = useSharedActor();
  return useQuery<Product[]>({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listProducts();
      return results.map(mapProduct);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminCreateProduct() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Partial<Product>) => {
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
    },
  });
}

export function useAdminUpdateProduct() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      product,
    }: { id: string; product: Partial<Product> }) => {
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
    },
  });
}

export function useAdminDeleteProduct() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
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
    },
  });
}
