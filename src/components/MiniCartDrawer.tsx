"use client";

import React from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore, getVoucherDiscountAmount } from "@/store/cartStore";
import { formatRupiah } from "@/lib/utils";

export function MiniCartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    voucherCode,
  } = useCartStore();

  if (!isDrawerOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = getVoucherDiscountAmount(subtotal, voucherCode);
  const total = Math.max(0, subtotal - discount);
  const freeShippingThreshold = 299000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        aria-label="Keranjang Belanja"
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#E7E5E0] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#141414]" />
            <h2 className="text-base font-bold text-[#141414]">
              Keranjang Belanja ({items.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Tutup keranjang"
            className="rounded-full p-1.5 text-[#6B6B6B] hover:bg-[#FAF9F6] hover:text-[#141414]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="bg-[#FAF9F6] px-5 py-2.5 text-xs text-[#141414] border-b border-[#E7E5E0]">
          {remainingForFreeShipping === 0 ? (
            <p className="font-medium text-[#3D6352]">
              Selamat! Anda mendapatkan Gratis Ongkir ke seluruh Indonesia.
            </p>
          ) : (
            <p>
              Tambah{" "}
              <span className="font-bold text-[#C85A32]">
                {formatRupiah(remainingForFreeShipping)}
              </span>{" "}
              lagi untuk Gratis Ongkir.
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-12 w-12 text-[#D4D1C9]" />
              <p className="mt-4 text-base font-semibold text-[#141414]">
                Keranjang Anda masih kosong
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Yuk temukan koleksi fashion terbaru dari Orobiishop.
              </p>
              <Link
                href="/kategori/wanita"
                onClick={closeDrawer}
                className="mt-6 bg-[#141414] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2A2A2A]"
              >
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#E7E5E0]">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex gap-4 py-4"
                >
                  <Link
                    href={`/produk/${item.slug}`}
                    onClick={closeDrawer}
                    className="h-24 w-20 shrink-0 overflow-hidden bg-[#F3F2EE]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                          {item.brandName}
                        </p>
                        <Link
                          href={`/produk/${item.slug}`}
                          onClick={closeDrawer}
                          className="text-sm font-medium text-[#141414] hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.color, item.size)
                        }
                        aria-label="Hapus item"
                        className="text-[#6B6B6B] hover:text-[#C85A32]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-[#6B6B6B]">
                      {item.color} • Ukuran {item.size}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
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
                          className="px-2 py-1 text-[#141414] hover:bg-[#FAF9F6]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold">
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
                          className="px-2 py-1 text-[#141414] hover:bg-[#FAF9F6]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#141414]">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E7E5E0] bg-[#FAF9F6] p-5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3D6352] font-medium">
                  <span>Voucher ({voucherCode})</span>
                  <span>-{formatRupiah(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#E7E5E0] pt-2 text-base font-bold text-[#141414]">
                <span>Estimasi Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href="/keranjang"
                onClick={closeDrawer}
                className="flex items-center justify-center border border-[#141414] bg-white py-3 text-xs font-bold uppercase tracking-wider text-[#141414] hover:bg-[#FAF9F6]"
              >
                Lihat Keranjang
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="flex items-center justify-center bg-[#141414] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2A2A2A]"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
