"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import {
  getVoucherDiscountAmount,
  useCartStore,
} from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatRupiah } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    voucherCode,
    updateQuantity,
    removeItem,
    applyVoucher,
    clearVoucher,
  } = useCartStore();
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const hasWishlist = useWishlistStore((s) => s.hasProduct);

  const [voucherInput, setVoucherInput] = useState(voucherCode ?? "");
  const [voucherFeedback, setVoucherFeedback] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = getVoucherDiscountAmount(subtotal, voucherCode);
  const shippingCost = subtotal >= 299000 || subtotal === 0 ? 0 : 18000;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyVoucher(voucherInput);
    setVoucherFeedback(res);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-14 w-14 text-[#D4D1C9]" />
        <h1 className="mt-4 text-2xl font-bold text-[#141414]">
          Keranjang Belanja Kosong
        </h1>
        <p className="mt-2 text-sm text-[#6B6B6B]">
          Belum ada produk di keranjang Anda. Yuk jelajahi koleksi terbaru kami.
        </p>
        <Link
          href="/kategori/wanita"
          className="mt-6 inline-block bg-[#141414] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2A2A2A]"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-[#141414] sm:text-3xl">
        Keranjang Belanja ({items.reduce((a, b) => a + b.quantity, 0)} Item)
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Item List */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-[#E7E5E0] border-y border-[#E7E5E0]">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex gap-4 py-5 sm:gap-6"
              >
                <Link
                  href={`/produk/${item.slug}`}
                  className="h-32 w-24 shrink-0 overflow-hidden bg-[#F3F2EE]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                        {item.brandName}
                      </p>
                      <Link
                        href={`/produk/${item.slug}`}
                        className="mt-0.5 text-base font-semibold text-[#141414] hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-[#6B6B6B]">
                        Warna: {item.color} • Ukuran: {item.size}
                      </p>
                    </div>
                    <p className="text-base font-bold text-[#141414]">
                      {formatRupiah(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="inline-flex items-center border border-[#E7E5E0]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.color,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        aria-label="Kurangi jumlah"
                        className="px-3 py-1.5 hover:bg-[#FAF9F6]"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3.5 text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.color,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        aria-label="Tambah jumlah"
                        className="px-3 py-1.5 hover:bg-[#FAF9F6]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          if (!hasWishlist(item.productId)) {
                            toggleWishlist(item.productId);
                          }
                          removeItem(item.productId, item.color, item.size);
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-[#6B6B6B] hover:text-[#141414]"
                      >
                        <Heart className="h-3.5 w-3.5" />
                        Pindahkan ke Wishlist
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.color, item.size)
                        }
                        className="inline-flex items-center gap-1 font-semibold text-[#C85A32] hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-6">
            <h2 className="text-base font-bold text-[#141414]">
              Ringkasan Pesanan
            </h2>

            {/* Voucher Form */}
            <form onSubmit={handleApplyVoucher} className="mt-4">
              <label
                htmlFor="voucher-input"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#141414]"
              >
                <Tag className="h-3.5 w-3.5" />
                Kode Voucher
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="voucher-input"
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  placeholder="Contoh: OROBIISHOP15"
                  className="flex-1 border border-[#E7E5E0] bg-white px-3 py-2 text-xs uppercase focus:border-[#141414] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#141414] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Pakai
                </button>
              </div>
              {voucherFeedback && (
                <p
                  className={`mt-1.5 text-xs ${
                    voucherFeedback.valid
                      ? "text-[#3D6352] font-medium"
                      : "text-[#C85A32]"
                  }`}
                >
                  {voucherFeedback.message}
                </p>
              )}
              {voucherCode && (
                <button
                  type="button"
                  onClick={() => {
                    clearVoucher();
                    setVoucherInput("");
                    setVoucherFeedback(null);
                  }}
                  className="mt-1.5 text-[11px] font-semibold text-[#6B6B6B] underline"
                >
                  Hapus voucher ({voucherCode})
                </button>
              )}
            </form>

            <div className="mt-6 space-y-2.5 border-t border-[#E7E5E0] pt-4 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-medium text-[#3D6352]">
                  <span>Diskon Voucher</span>
                  <span>-{formatRupiah(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Ongkos Kirim</span>
                <span>
                  {shippingCost === 0 ? "Gratis" : formatRupiah(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E7E5E0] pt-3 text-base font-bold text-[#141414]">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full bg-[#141414] py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2A2A2A]"
            >
              Lanjut ke Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
