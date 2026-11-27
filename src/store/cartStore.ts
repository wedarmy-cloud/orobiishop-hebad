"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  voucherCode: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (
    productId: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
  applyVoucher: (code: string) => { valid: boolean; message: string };
  clearVoucher: () => void;
  clearCart: () => void;
}

const VALID_VOUCHERS: Record<string, { rate: number; label: string }> = {
  OROBIISHOP15: { rate: 0.15, label: "Diskon 15% berhasil diterapkan" },
  BARU10: { rate: 0.1, label: "Diskon member baru 10% aktif" },
  HEMAT20: { rate: 0.2, label: "Voucher spesial 20% aktif" },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      voucherCode: null,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (newItem) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            item.color === newItem.color &&
            item.size === newItem.size
        );
        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + newItem.quantity,
          };
          set({ items: updated, isDrawerOpen: true });
        } else {
          set({ items: [...items, newItem], isDrawerOpen: true });
        }
      },
      removeItem: (productId, color, size) =>
        set({
          items: get().items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.color === color &&
                i.size === size
              )
          ),
        }),
      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.color === color && i.size === size
              ? { ...i, quantity }
              : i
          ),
        });
      },
      applyVoucher: (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        const found = VALID_VOUCHERS[code];
        if (!found) {
          return {
            valid: false,
            message: "Kode voucher tidak valid. Coba OROBIISHOP15 atau BARU10.",
          };
        }
        set({ voucherCode: code });
        return { valid: true, message: found.label };
      },
      clearVoucher: () => set({ voucherCode: null }),
      clearCart: () => set({ items: [], voucherCode: null }),
    }),
    {
      name: "kainku-cart-storage",
      partialize: (state) => ({
        items: state.items,
        voucherCode: state.voucherCode,
      }),
    }
  )
);

export function getVoucherDiscountAmount(
  subtotal: number,
  voucherCode: string | null
): number {
  if (!voucherCode) return 0;
  const voucher = VALID_VOUCHERS[voucherCode];
  if (!voucher) return 0;
  return Math.round(subtotal * voucher.rate);
}
