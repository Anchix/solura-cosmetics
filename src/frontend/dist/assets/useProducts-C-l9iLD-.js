import { u as useQuery, a as useMutation } from "./useMutation-ybpFZUfc.js";
import { h as useQueryClient } from "./index-BYwbnXHo.js";
const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Kumkumadi Radiance Serum",
    slug: "kumkumadi-radiance-serum",
    category: "skincare",
    price: 1299,
    originalPrice: 1599,
    description: "Ancient Ayurvedic formulation enriched with saffron, sandalwood, and 16 rare herbs. Brightens complexion, reduces dark spots, and delivers a radiant glow.",
    shortDescription: "Saffron & 16-herb brightening serum",
    images: [
      "/assets/generated/product-serum.dim_500x600.jpg",
      "/assets/generated/hero-product.dim_600x700.jpg",
      "/assets/generated/product-serum.dim_500x600.jpg",
      "/assets/generated/product-serum.dim_500x600.jpg",
      "/assets/generated/product-serum.dim_500x600.jpg"
    ],
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stock: 48,
    isBestseller: true,
    isNew: false,
    isLowStock: false,
    tags: ["brightening", "ayurvedic", "saffron", "anti-aging"],
    ingredients: "Kumkuma (Saffron), Chandana (Sandalwood), Manjishtha, Lotus, Sesame Oil",
    howToUse: "Apply 3-4 drops to cleansed face. Massage gently in upward circular motions. Use morning and night.",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10"
  },
  {
    id: "p2",
    name: "Silk Sensation Lipstick",
    slug: "silk-sensation-lipstick",
    category: "makeup",
    price: 549,
    originalPrice: 699,
    description: "Intensely pigmented, long-wearing lipstick with a velvety matte finish. Enriched with argan oil and vitamin E for moisturized, supple lips all day.",
    shortDescription: "Velvety matte, 12-hour wear",
    images: [
      "/assets/generated/product-lipstick.dim_500x600.jpg",
      "/assets/generated/product-lipstick.dim_500x600.jpg",
      "/assets/generated/product-lipstick.dim_500x600.jpg",
      "/assets/generated/product-lipstick.dim_500x600.jpg",
      "/assets/generated/product-lipstick.dim_500x600.jpg"
    ],
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    stock: 120,
    isBestseller: true,
    isNew: false,
    isLowStock: false,
    tags: ["matte", "long-wearing", "argan oil"],
    variants: [
      {
        id: "v1",
        name: "Shade",
        value: "Rose Blush",
        priceModifier: 0,
        stock: 40
      },
      {
        id: "v2",
        name: "Shade",
        value: "Berry Plum",
        priceModifier: 0,
        stock: 35
      },
      {
        id: "v3",
        name: "Shade",
        value: "Coral Crush",
        priceModifier: 0,
        stock: 45
      }
    ],
    createdAt: "2024-02-01",
    updatedAt: "2024-03-12"
  },
  {
    id: "p3",
    name: "Ayurvedic Hair Vitalizer",
    slug: "ayurvedic-hair-vitalizer",
    category: "haircare",
    price: 849,
    originalPrice: 999,
    description: "Powered by Bhringraj, Amla, and Brahmi. Stimulates hair growth, reduces breakage, and adds deep shine. Suitable for all hair types.",
    shortDescription: "Bhringraj & Amla growth oil",
    images: [
      "/assets/generated/product-hair.dim_500x600.jpg",
      "/assets/generated/product-hair.dim_500x600.jpg",
      "/assets/generated/product-hair.dim_500x600.jpg",
      "/assets/generated/product-hair.dim_500x600.jpg",
      "/assets/generated/product-hair.dim_500x600.jpg"
    ],
    rating: 4.7,
    reviewCount: 312,
    inStock: true,
    stock: 8,
    isBestseller: true,
    isNew: false,
    isLowStock: true,
    tags: ["hair-growth", "ayurvedic", "bhringraj", "amla"],
    createdAt: "2024-01-20",
    updatedAt: "2024-03-15"
  },
  {
    id: "p4",
    name: "Rose Glow Toner",
    slug: "rose-glow-toner",
    category: "skincare",
    price: 699,
    description: "100% pure Bulgarian rose water toner. Hydrates, tightens pores, balances pH, and preps skin for better serum absorption.",
    shortDescription: "Pure Bulgarian rose water toner",
    images: [
      "/assets/generated/product-toner.dim_500x600.jpg",
      "/assets/generated/product-toner.dim_500x600.jpg",
      "/assets/generated/product-toner.dim_500x600.jpg",
      "/assets/generated/product-toner.dim_500x600.jpg",
      "/assets/generated/product-toner.dim_500x600.jpg"
    ],
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    stock: 65,
    isBestseller: false,
    isNew: true,
    isLowStock: false,
    tags: ["rose", "toner", "hydrating", "pore-minimizing"],
    createdAt: "2024-03-01",
    updatedAt: "2024-03-20"
  },
  {
    id: "p5",
    name: "Dewy Skin Foundation",
    slug: "dewy-skin-foundation",
    category: "makeup",
    price: 999,
    originalPrice: 1199,
    description: "Buildable coverage foundation with a natural dewy finish. Infused with hyaluronic acid and SPF 20. 24-hour hydration. Available in 12 shades for all Indian skin tones.",
    shortDescription: "Dewy finish, SPF 20, 24-hr hydration",
    images: [
      "/assets/generated/product-foundation.dim_500x600.jpg",
      "/assets/generated/product-foundation.dim_500x600.jpg",
      "/assets/generated/product-foundation.dim_500x600.jpg",
      "/assets/generated/product-foundation.dim_500x600.jpg",
      "/assets/generated/product-foundation.dim_500x600.jpg"
    ],
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    stock: 45,
    isBestseller: false,
    isNew: true,
    isLowStock: false,
    tags: ["foundation", "dewy", "SPF", "hyaluronic acid"],
    createdAt: "2024-03-05",
    updatedAt: "2024-03-18"
  },
  {
    id: "p6",
    name: "Nourishing Argan Shampoo",
    slug: "nourishing-argan-shampoo",
    category: "haircare",
    price: 599,
    description: "Sulphate-free shampoo enriched with Moroccan argan oil and keratin. Repairs damage, adds shine, and tames frizz for salon-smooth hair.",
    shortDescription: "Sulphate-free argan & keratin",
    images: [
      "/assets/generated/product-shampoo.dim_500x600.jpg",
      "/assets/generated/product-shampoo.dim_500x600.jpg",
      "/assets/generated/product-shampoo.dim_500x600.jpg",
      "/assets/generated/product-shampoo.dim_500x600.jpg",
      "/assets/generated/product-shampoo.dim_500x600.jpg"
    ],
    rating: 4.3,
    reviewCount: 201,
    inStock: true,
    stock: 88,
    isBestseller: false,
    isNew: false,
    isLowStock: false,
    tags: ["shampoo", "argan-oil", "sulphate-free", "frizz-control"],
    createdAt: "2024-01-10",
    updatedAt: "2024-03-08"
  }
];
const MOCK_REVIEWS = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Priya Krishnamurthy",
    rating: 5,
    title: "Transformed my skin in 3 weeks!",
    body: "I've been using this serum for 3 weeks and the difference is unbelievable. My dark spots have faded significantly and my skin glows naturally. Highly recommend!",
    images: [],
    verified: true,
    createdAt: "2024-03-10"
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u2",
    userName: "Anitha Subramanian",
    rating: 5,
    title: "Worth every rupee",
    body: "The saffron serum is absolutely divine. Light texture, absorbs quickly, and the results speak for themselves. My friends keep asking what I'm doing differently!",
    images: [],
    verified: true,
    createdAt: "2024-03-08"
  },
  {
    id: "r3",
    productId: "p3",
    userId: "u3",
    userName: "Lakshmi Natarajan",
    rating: 5,
    title: "My hair stopped falling!",
    body: "After 2 months of consistent use, my hair fall has reduced by 70%. New baby hairs are growing and my hair feels so much stronger. This is truly magical.",
    images: [],
    verified: true,
    createdAt: "2024-03-05"
  }
];
function useProducts(category) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      if (category) return MOCK_PRODUCTS.filter((p) => p.category === category);
      return MOCK_PRODUCTS;
    }
  });
}
function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id) ?? null;
    },
    enabled: !!id
  });
}
function useBestsellers() {
  return useQuery({
    queryKey: ["products", "bestsellers"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_PRODUCTS.filter((p) => p.isBestseller);
    }
  });
}
function useNewArrivals() {
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_PRODUCTS.filter((p) => p.isNew);
    }
  });
}
function useProductReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_REVIEWS.filter((r) => r.productId === productId);
    },
    enabled: !!productId
  });
}
function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review) => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        ...review,
        id: `r${Date.now()}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", data.productId] });
    }
  });
}
function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return MOCK_PRODUCTS;
    }
  });
}
export {
  MOCK_PRODUCTS as M,
  useNewArrivals as a,
  useProducts as b,
  useProduct as c,
  useProductReviews as d,
  useSubmitReview as e,
  useAdminProducts as f,
  useBestsellers as u
};
