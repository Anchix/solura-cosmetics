import type { CartItem, Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    variantId?: string,
    variantName?: string,
  ) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
  ) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (
        product,
        quantity?: number,
        variantId?: string,
        variantName?: string,
      ) => {
        const qty = quantity ?? 1;
        set((state) => {
          const key = variantId ? `${product.id}-${variantId}` : product.id;
          const existing = state.items.find((item) =>
            variantId
              ? item.productId === product.id && item.variantId === variantId
              : item.productId === product.id && !item.variantId,
          );
          if (existing) {
            return {
              items: state.items.map((item) => {
                const itemKey = item.variantId
                  ? `${item.productId}-${item.variantId}`
                  : item.productId;
                if (itemKey === key) {
                  return { ...item, quantity: item.quantity + qty };
                }
                return item;
              }),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                product,
                quantity: qty,
                variantId,
                variantName,
              },
            ],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter((item) =>
            variantId
              ? !(item.productId === productId && item.variantId === variantId)
              : !(item.productId === productId && !item.variantId),
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            const match = variantId
              ? item.productId === productId && item.variantId === variantId
              : item.productId === productId && !item.variantId;
            return match ? { ...item, quantity } : item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: "solura-cart" },
  ),
);
