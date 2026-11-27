"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  hasProduct: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: ["prd-001", "prd-013", "prd-024"],
      toggleWishlist: (productId) => {
        const current = get().productIds;
        if (current.includes(productId)) {
          set({ productIds: current.filter((id) => id !== productId) });
        } else {
          set({ productIds: [...current, productId] });
        }
      },
      hasProduct: (productId) => get().productIds.includes(productId),
    }),
    {
      name: "kainku-wishlist-storage",
    }
  )
);
