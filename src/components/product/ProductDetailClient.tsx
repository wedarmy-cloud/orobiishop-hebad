"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Heart,
  Leaf,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
  X,
} from "lucide-react";
import { Product } from "@/types";
import { calculateDiscountPercent, cn, formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUserStore } from "@/store/userStore";
import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeTab, setActiveTab] = useState<"desc" | "care" | "shipping">(
    "desc"
  );
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [cityInput, setCityInput] = useState("Jakarta Selatan");
  const [shippingEstimate, setShippingEstimate] = useState(
    "Gratis Ongkir (1–2 hari kerja)"
  );

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, hasProduct } = useWishlistStore();
  const { recentlyViewedIds, recordProductView } = useUserStore();

  const isWishlisted = hasProduct(product.id);
  const discountPercent = calculateDiscountPercent(
    product.price,
    product.originalPrice
  );

  useEffect(() => {
    recordProductView(product.id);
  }, [product.id, recordProductView]);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brandName: product.brandName,
      image: product.images[0],
      price: product.price,
      originalPrice: product.originalPrice,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });
  };

  const handleEstimateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = cityInput.toLowerCase();
    if (lower.includes("jakarta") || lower.includes("bandung") || lower.includes("tangerang")) {
      setShippingEstimate("Gratis Ongkir / Rp 0 • Estimasi tiba 1–2 hari kerja");
    } else {
      setShippingEstimate(
        `Estimasi Rp 18.000 (Gratis min. Rp 299.000) • Tiba 3–5 hari kerja ke ${cityInput}`
      );
    }
  };

  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const recentlyViewedProducts = recentlyViewedIds
    .filter((id) => id !== product.id)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-[#6B6B6B]">
        <Link href="/" className="hover:text-[#141414]">
          Beranda
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/kategori/${product.category}`}
          className="capitalize hover:text-[#141414]"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-[#141414] line-clamp-1">
          {product.name}
        </span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex gap-2.5 sm:w-20 sm:flex-col">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "aspect-[3/4] w-16 shrink-0 overflow-hidden border bg-[#F3F2EE] sm:w-full",
                    selectedImage === idx
                      ? "border-[#141414] ring-1 ring-[#141414]"
                      : "border-[#E7E5E0] opacity-75 hover:opacity-100"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} tampilan ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div
              onClick={() => setZoomed(!zoomed)}
              className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-[#F3F2EE]"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-300",
                  zoomed ? "scale-125 cursor-zoom-out" : "scale-100"
                )}
              />
              {product.isEco && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-[#3D6352] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  <Leaf className="h-3 w-3" />
                  Eco Edit
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-5">
          <Link
            href={`/cari?brand=${product.brandSlug}`}
            className="text-xs font-bold uppercase tracking-widest text-[#C85A32] hover:underline"
          >
            {product.brandName}
          </Link>
          <h1 className="mt-1.5 text-2xl font-bold leading-snug text-[#141414] sm:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-[#6B6B6B]">
            <div className="flex items-center gap-1 font-bold text-[#141414]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span>•</span>
            <a href="#ulasan" className="underline hover:text-[#141414]">
              {product.reviewCount} ulasan terverifikasi
            </a>
            <span>•</span>
            <span className="text-[#3D6352] font-semibold">
              Stok tersedia ({product.stock})
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 border-y border-[#E7E5E0] py-4">
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  "text-2xl font-bold",
                  discountPercent > 0 ? "text-[#C85A32]" : "text-[#141414]"
                )}
              >
                {formatRupiah(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-[#6B6B6B] line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                  <span className="bg-[#C85A32] px-2 py-0.5 text-xs font-bold text-white">
                    Hemat {discountPercent}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-xs text-[#6B6B6B]">
              Cicilan 0% mulai{" "}
              <span className="font-semibold text-[#141414]">
                {formatRupiah(Math.round(product.price / 3))} / bulan
              </span>{" "}
              • Gunakan kode <span className="font-bold text-[#141414]">OROBIISHOP15</span>
            </p>
          </div>

          {/* Color Selector */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141414]">
              Warna: <span className="font-normal text-[#6B6B6B]">{selectedColor}</span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={`Pilih warna ${c.name}`}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                    selectedColor === c.name
                      ? "border-[#141414] bg-[#FAF9F6] font-bold"
                      : "border-[#E7E5E0] hover:border-[#141414]"
                  )}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/15"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#141414]">
                Ukuran: <span className="font-normal text-[#6B6B6B]">{selectedSize}</span>
              </p>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#141414] underline hover:text-[#C85A32]"
              >
                <Ruler className="h-3.5 w-3.5" />
                Panduan Ukuran
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={cn(
                    "min-w-12 border px-3.5 py-2 text-xs font-bold transition",
                    selectedSize === sz
                      ? "border-[#141414] bg-[#141414] text-white"
                      : "border-[#E7E5E0] bg-white text-[#141414] hover:border-[#141414]"
                  )}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-[#141414] py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#2A2A2A]"
            >
              Tambah ke Keranjang
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Simpan ke Wishlist"
              className={cn(
                "flex items-center justify-center border px-4 transition",
                isWishlisted
                  ? "border-[#C85A32] bg-[#FFF5F2] text-[#C85A32]"
                  : "border-[#E7E5E0] text-[#141414] hover:border-[#141414]"
              )}
            >
              <Heart
                className={cn("h-5 w-5", isWishlisted && "fill-[#C85A32]")}
              />
            </button>
          </div>

          {/* Shipping Estimator */}
          <div className="mt-6 rounded border border-[#E7E5E0] bg-[#FAF9F6] p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#141414]">
              <Truck className="h-4 w-4" />
              <span>Estimasi Pengiriman</span>
            </div>
            <form onSubmit={handleEstimateShipping} className="mt-2.5 flex gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Masukkan kota tujuan..."
                className="flex-1 border border-[#E7E5E0] bg-white px-3 py-1.5 text-xs focus:border-[#141414] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#141414] px-3.5 py-1.5 text-xs font-bold text-white"
              >
                Cek
              </button>
            </form>
            <p className="mt-2 text-xs font-medium text-[#3D6352]">
              {shippingEstimate}
            </p>
          </div>

          {/* Info Tabs */}
          <div className="mt-6 border-t border-[#E7E5E0]">
            <div className="flex gap-6 border-b border-[#E7E5E0]">
              {[
                { id: "desc", label: "Deskripsi" },
                { id: "care", label: "Detail & Perawatan" },
                { id: "shipping", label: "Pengiriman & Garansi" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(t.id as "desc" | "care" | "shipping")
                  }
                  className={cn(
                    "border-b-2 py-3 text-xs font-bold uppercase tracking-wider transition",
                    activeTab === t.id
                      ? "border-[#141414] text-[#141414]"
                      : "border-transparent text-[#6B6B6B] hover:text-[#141414]"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="py-4 text-sm leading-relaxed text-[#4A4A4A]">
              {activeTab === "desc" && <p>{product.description}</p>}
              {activeTab === "care" && (
                <ul className="list-disc space-y-1.5 pl-4 text-xs sm:text-sm">
                  {product.careDetails.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="flex items-center gap-2 font-semibold text-[#141414]">
                    <ShieldCheck className="h-4 w-4 text-[#3D6352]" />
                    Garansi Pengembalian Gratis 30 Hari
                  </p>
                  <p>
                    Salah ukuran atau kurang cocok? Ajukan penukaran atau
                    pengembalian dana penuh dalam 30 hari sejak barang diterima
                    tanpa biaya penjemputan.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section id="ulasan" className="mt-14 border-t border-[#E7E5E0] pt-10">
        <h2 className="text-xl font-bold text-[#141414]">
          Ulasan Pelanggan ({product.reviewCount})
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {product.reviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-[#E7E5E0] bg-[#FAF9F6] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-[#D4D1C9]"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#6B6B6B]">{rev.date}</span>
              </div>
              <p className="mt-2.5 text-sm text-[#141414]">{rev.comment}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-[#6B6B6B]">
                <span className="font-semibold text-[#141414]">
                  {rev.author}
                </span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-0.5 text-[#3D6352]">
                    <Check className="h-3 w-3" /> Pembeli Terverifikasi
                  </span>
                )}
                <span>• Ukuran {rev.sizePurchased}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produk Serupa */}
      {similarProducts.length > 0 && (
        <section className="mt-14 border-t border-[#E7E5E0] pt-10">
          <h2 className="mb-5 text-xl font-bold text-[#141414]">
            Produk Serupa
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Terakhir Dilihat */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mt-14 border-t border-[#E7E5E0] pt-10">
          <h2 className="mb-5 text-xl font-bold text-[#141414]">
            Terakhir Dilihat
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {recentlyViewedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-3">
              <h3 className="text-base font-bold text-[#141414]">
                Panduan Ukuran Orobiishop
              </h3>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                aria-label="Tutup panduan ukuran"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] text-[#141414]">
                  <tr>
                    <th className="p-2.5">Ukuran</th>
                    <th className="p-2.5">Lingkar Dada (cm)</th>
                    <th className="p-2.5">Lingkar Pinggang (cm)</th>
                    <th className="p-2.5">Panjang (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E0]">
                  {[
                    ["S", "88–92", "70–74", "66"],
                    ["M", "94–98", "76–80", "68"],
                    ["L", "100–104", "82–86", "70"],
                    ["XL", "106–110", "88–92", "72"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <td className="p-2.5 font-bold">{row[0]}</td>
                      <td className="p-2.5">{row[1]}</td>
                      <td className="p-2.5">{row[2]}</td>
                      <td className="p-2.5">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[#6B6B6B]">
              Toleransi ukuran ±1–2 cm. Untuk sepatu, ukur panjang telapak kaki
              dari tumit hingga ujung jari terpanjang.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
