"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Address, OrderRecord } from "@/types";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface UserState {
  isLoggedIn: boolean;
  profile: UserProfile;
  addresses: Address[];
  orders: OrderRecord[];
  recentlyViewedIds: string[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  addOrder: (order: OrderRecord) => void;
  recordProductView: (productId: string) => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Rumah",
    recipient: "Rania Kusuma",
    phone: "0812-3456-7890",
    street: "Jl. Kemang Selatan VIII No. 24",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12730",
    isDefault: true,
  },
];

const SAMPLE_ORDERS: OrderRecord[] = [
  {
    orderNumber: "KNK-20261120-8421",
    createdAt: "20 Nov 2026, 14:22 WIB",
    items: [
      {
        productId: "prd-001",
        slug: "blouse-linen-kerah-mandarin-1",
        name: "Blouse Linen Kerah Mandarin",
        brandName: "Svara Studio",
        image: "https://picsum.photos/seed/kainku-prd-001-a/600/800",
        price: 279000,
        originalPrice: 349000,
        color: "Putih Gading",
        size: "M",
        quantity: 1,
      },
    ],
    subtotal: 279000,
    discount: 0,
    shippingCost: 0,
    total: 279000,
    shippingMethod: "Reguler (Gratis Ongkir)",
    paymentMethod: "Virtual Account BCA",
    address: DEFAULT_ADDRESSES[0],
    status: "Dikirim",
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      profile: {
        name: "Rania Kusuma",
        email: "rania@kainku.id",
        phone: "0812-3456-7890",
      },
      addresses: DEFAULT_ADDRESSES,
      orders: SAMPLE_ORDERS,
      recentlyViewedIds: [],
      login: (email, name) =>
        set({
          isLoggedIn: true,
          profile: {
            ...get().profile,
            email,
            name: name || email.split("@")[0],
          },
        }),
      logout: () => set({ isLoggedIn: false }),
      updateProfile: (profile) => set({ profile }),
      addAddress: (addr) =>
        set({
          addresses: [
            ...get().addresses,
            { ...addr, id: `addr-${Date.now()}` },
          ],
        }),
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      recordProductView: (productId) => {
        const current = get().recentlyViewedIds.filter(
          (id) => id !== productId
        );
        set({ recentlyViewedIds: [productId, ...current].slice(0, 8) });
      },
    }),
    {
      name: "kainku-user-storage",
    }
  )
);
