"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Smartphone,
  User,
  X,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import {
  POPULAR_SEARCHES,
  PRODUCTS,
} from "@/data/catalog";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatRupiah } from "@/lib/utils";

const MERCHANDISE_NAV_ITEMS = [
  { name: "Stickers", href: "/cari?q=sticker" },
  { name: "Pins & Badges", href: "/cari?q=pin" },
  { name: "Keychains", href: "/cari?q=keychain" },
  { name: "Apparel & Totes", href: "/cari?q=apparel" },
  { name: "Custom Order", href: "/kontak" },
  { name: "Bundles", href: "/cari?q=bundle" },
  { name: "Sale & Promo", href: "/promo", sale: true },
];

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const cartItems = useCartStore((s) => s.items);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const wishlistIds = useWishlistStore((s) => s.productIds);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchFocused(false);
    router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-white border-b border-[#E7E5E0]"
      >
        {/* Top Utility Bar */}
        <div className="bg-[#141414] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] sm:px-6">
            <p className="truncate font-medium tracking-wide">
              GRATIS ONGKIR min. Rp 299.000 • Gunakan kode{" "}
              <span className="font-bold text-[#F3A683]">OROBIISHOP15</span> untuk
              diskon 15%
            </p>
            <div className="hidden items-center gap-4 md:flex shrink-0">
              <Link href="/bantuan" className="hover:underline">
                Bantuan
              </Link>
              <Link href="/akun?tab=orders" className="hover:underline">
                Status Order
              </Link>
              <button
                type="button"
                onClick={() => setAppModalOpen(true)}
                className="inline-flex items-center gap-1 hover:underline"
              >
                <Smartphone className="h-3 w-3" />
                Download Aplikasi
              </button>
            </div>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              className="rounded-md p-1.5 text-[#141414] hover:bg-[#FAF9F6] lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" aria-label="Beranda Orobiishop">
              <BrandLogo />
            </Link>
          </div>

          {/* Search Bar Desktop & Tablet */}
          <div ref={searchRef} className="relative hidden flex-1 max-w-xl md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari stiker vinyl, pin enamel, gantungan kunci, tote bag..."
                className="w-full rounded-full border border-[#E7E5E0] bg-[#FAF9F6] py-2 pl-4 pr-10 text-sm text-[#141414] placeholder:text-[#6B6B6B] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Cari produk"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#141414]"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Autocomplete Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-[#E7E5E0] bg-white p-4 shadow-xl">
                {searchQuery.trim() ? (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Hasil Pencarian
                    </p>
                    {suggestions.length > 0 ? (
                      <ul className="divide-y divide-[#E7E5E0]">
                        {suggestions.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={`/produk/${item.slug}`}
                              onClick={() => setSearchFocused(false)}
                              className="flex items-center gap-3 py-2 hover:bg-[#FAF9F6] px-1 rounded"
                            >
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                className="h-12 w-10 object-cover bg-[#F3F2EE]"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-semibold uppercase text-[#6B6B6B]">
                                  {item.brandName}
                                </p>
                                <p className="truncate text-sm font-medium text-[#141414]">
                                  {item.name}
                                </p>
                              </div>
                              <span className="text-xs font-bold text-[#141414]">
                                {formatRupiah(item.price)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="py-3 text-sm text-[#6B6B6B]">
                        Tidak ada produk untuk &ldquo;{searchQuery}&rdquo;.
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Pencarian Populer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.slice(0, 8).map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            router.push(`/cari?q=${encodeURIComponent(term)}`);
                          }}
                          className="rounded-full border border-[#E7E5E0] bg-[#FAF9F6] px-3 py-1 text-xs font-medium text-[#141414] hover:border-[#141414]"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/akun"
              aria-label="Akun saya"
              className="flex items-center gap-1.5 rounded-full p-2 text-[#141414] hover:bg-[#FAF9F6]"
            >
              <User className="h-5 w-5" />
              <span className="hidden text-xs font-semibold xl:inline">
                Akun
              </span>
            </Link>

            <Link
              href="/akun?tab=wishlist"
              aria-label="Wishlist"
              className="relative rounded-full p-2 text-[#141414] hover:bg-[#FAF9F6]"
            >
              <Heart className="h-5 w-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#141414] px-1 text-[10px] font-bold text-white">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label="Buka keranjang"
              className="relative rounded-full p-2 text-[#141414] hover:bg-[#FAF9F6]"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C85A32] px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="border-t border-[#E7E5E0] px-4 py-2 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari stiker vinyl, pin enamel, gantungan kunci, tote bag..."
              className="w-full rounded-full border border-[#E7E5E0] bg-[#FAF9F6] py-1.5 pl-4 pr-9 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Desktop Category Nav + Mega Menu */}
        <nav
          aria-label="Kategori Utama"
          className="hidden border-t border-[#E7E5E0] lg:block"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <ul className="flex items-center gap-5">
              {MERCHANDISE_NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`inline-block border-b-2 border-transparent py-2.5 text-xs font-bold uppercase tracking-wider transition hover:border-[#141414] ${
                      item.sale
                        ? "text-[#C85A32]"
                        : "text-[#141414]/80 hover:text-[#141414]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/thread"
              className="text-xs font-semibold text-[#6B6B6B] hover:text-[#141414]"
            >
              Thread Editorial →
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7E5E0] px-4 py-3.5">
              <BrandLogo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu"
                className="p-1 text-[#141414]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                Kategori
              </p>
              <ul className="divide-y divide-[#E7E5E0]">
                {MERCHANDISE_NAV_ITEMS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 text-sm font-semibold text-[#141414]"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-[#6B6B6B]" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-[#E7E5E0] pt-4">
                <Link
                  href="/promo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-bold text-[#C85A32]"
                >
                  Promo & Sale
                </Link>
                <Link
                  href="/brands"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-[#141414]"
                >
                  Semua Brand (A–Z)
                </Link>
                <Link
                  href="/thread"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-[#141414]"
                >
                  Thread Editorial
                </Link>
                <Link
                  href="/akun?tab=orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-[#141414]"
                >
                  Status Order
                </Link>
                <Link
                  href="/bantuan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-[#141414]"
                >
                  Bantuan & FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download App Modal */}
      {appModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#141414]">
                Belanja Lebih Cepat di Aplikasi Orobiishop
              </h3>
              <button
                type="button"
                onClick={() => setAppModalOpen(false)}
                className="text-[#6B6B6B] hover:text-[#141414]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-[#6B6B6B]">
              Dapatkan notifikasi Flash Sale, voucher eksklusif pengguna baru
              Rp 50.000, dan pelacakan kurir secara real-time.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded border border-[#E7E5E0] bg-[#FAF9F6] p-3 text-center">
                <p className="text-xs font-bold text-[#141414]">App Store</p>
                <p className="text-[11px] text-[#6B6B6B]">iOS 15.0+</p>
              </div>
              <div className="rounded border border-[#E7E5E0] bg-[#FAF9F6] p-3 text-center">
                <p className="text-xs font-bold text-[#141414]">Google Play</p>
                <p className="text-[11px] text-[#6B6B6B]">Android 10+</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAppModalOpen(false)}
              className="mt-5 w-full bg-[#141414] py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
