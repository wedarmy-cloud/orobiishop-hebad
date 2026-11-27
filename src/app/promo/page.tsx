import React from "react";
import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export default function PromoPage() {
  const saleProducts = PRODUCTS.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Big Sale Banner */}
      <div className="bg-[#141414] p-8 text-white sm:p-12">
        <span className="bg-[#C85A32] px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
          HARBOLNAS & BIG SALE
        </span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Festival Diskon Hingga 50% + Extra Voucher
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Gunakan kode <span className="font-bold text-white">OROBIISHOP15</span>{" "}
          (diskon 15%) atau{" "}
          <span className="font-bold text-white">HEMAT20</span> (diskon 20%) di
          halaman keranjang.
        </p>
      </div>

      <h2 className="mt-10 mb-5 text-xl font-bold text-[#141414]">
        Semua Produk Promo ({saleProducts.length})
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {saleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
