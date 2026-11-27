"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal, Sparkles, Star, X } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { calculateDiscountPercent, formatRupiah } from "@/lib/utils";

const MERCH_CATEGORIES = [
  { slug: "stickers", name: "Stickers" },
  { slug: "pins-badges", name: "Pins & Badges" },
  { slug: "keychains", name: "Keychains" },
  { slug: "apparel-totes", name: "Apparel & Totes" },
  { slug: "bundles", name: "Bundles" },
  { slug: "custom-order", name: "Custom Order" },
];

const MERCH_SUBCATEGORIES = [
  "Stiker Vinyl",
  "Stiker Hologram",
  "Die-Cut Sticker",
  "Enamel Pin",
  "Pin Button",
  "Ganci Akrilik",
  "Tote Bag",
  "Art Print",
];

const MERCH_SIZES = [
  "Mini / 3 cm",
  "Medium / 5 cm",
  "Large / 8 cm",
  "A5",
  "A4",
  "All Size",
];

interface ProductListingViewProps {
  title: string;
  description?: string;
  breadcrumbLabel: string;
  initialProducts: Product[];
  lockedCategory?: string;
  initialSubcategory?: string;
  initialBrand?: string;
  initialEcoOnly?: boolean;
  initialLimitedOnly?: boolean;
  initialSaleOnly?: boolean;
  initialSort?: string;
}

type SortOption =
  | "terbaru"
  | "terlaris"
  | "harga-asc"
  | "harga-desc"
  | "diskon";

export function ProductListingView({
  title,
  description,
  breadcrumbLabel,
  initialProducts,
  lockedCategory,
  initialSubcategory = "",
  initialBrand = "",
  initialEcoOnly = false,
  initialLimitedOnly = false,
  initialSaleOnly = false,
  initialSort = "terbaru",
}: ProductListingViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    lockedCategory ? [lockedCategory] : []
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string>(initialSubcategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [saleOnly, setSaleOnly] = useState<boolean>(initialSaleOnly);
  const [ecoOnly, setEcoOnly] = useState<boolean>(initialEcoOnly);
  const [limitedOnly, setLimitedOnly] = useState(initialLimitedOnly);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>(
    (["terbaru", "terlaris", "harga-asc", "harga-desc", "diskon"].includes(
      initialSort
    )
      ? initialSort
      : "terbaru") as SortOption
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  const filteredProducts = useMemo(() => {
    let list = initialProducts.filter((p) => {
      if (
        !lockedCategory &&
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      ) {
        return false;
      }
      if (selectedSubcategory && p.subcategory !== selectedSubcategory) {
        return false;
      }
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(p.brandSlug)
      ) {
        return false;
      }
      if (
        selectedSizes.length > 0 &&
        !p.sizes.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }
      if (p.price > maxPrice) return false;
      if (saleOnly && (!p.originalPrice || p.originalPrice <= p.price)) {
        return false;
      }
      if (ecoOnly && !p.isEco) return false;
      if (limitedOnly && !p.isLimitedEdition) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case "terlaris":
          return (
            Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)) ||
            b.reviewCount - a.reviewCount
          );
        case "harga-asc":
          return a.price - b.price;
        case "harga-desc":
          return b.price - a.price;
        case "diskon":
          return (
            calculateDiscountPercent(b.price, b.originalPrice) -
            calculateDiscountPercent(a.price, a.originalPrice)
          );
        case "terbaru":
        default:
          return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
      }
    });

    return list;
  }, [
    initialProducts,
    lockedCategory,
    selectedCategories,
    selectedSubcategory,
    selectedBrands,
    selectedSizes,
    maxPrice,
    saleOnly,
    ecoOnly,
    limitedOnly,
    minRating,
    sortBy,
  ]);

  const toggleArrayValue = (
    val: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    if (list.includes(val)) {
      setter(list.filter((item) => item !== val));
    } else {
      setter([...list, val]);
    }
  };

  const resetFilters = () => {
    if (!lockedCategory) setSelectedCategories([]);
    setSelectedSubcategory("");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setMaxPrice(100000);
    setSaleOnly(false);
    setEcoOnly(false);
    setLimitedOnly(false);
    setMinRating(0);
  };

  const filterPanelContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
          Filter Produk
        </span>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-semibold text-[#C85A32] hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Limited Edition & Diskon */}
      <div className="space-y-2.5 border-t border-[#E7E5E0] pt-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={limitedOnly}
            onChange={(e) => setLimitedOnly(e.target.checked)}
            className="h-4 w-4 accent-[#141414]"
          />
          <span className="inline-flex items-center gap-1 font-medium text-[#141414]">
            <Sparkles className="h-3.5 w-3.5" />
            Edisi Terbatas
          </span>
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={saleOnly}
            onChange={(e) => setSaleOnly(e.target.checked)}
            className="h-4 w-4 accent-[#C85A32]"
          />
          <span className="font-medium text-[#141414]">Sedang Diskon</span>
        </label>
      </div>

      {/* Kategori */}
      {!lockedCategory && (
        <div className="border-t border-[#E7E5E0] pt-4">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#141414]">
            Kategori
          </p>
          <div className="space-y-2">
            {MERCH_CATEGORIES.map((cat) => (
              <label
                key={cat.slug}
                className="flex cursor-pointer items-center gap-2 text-sm text-[#141414]"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() =>
                    toggleArrayValue(
                      cat.slug,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                  className="h-4 w-4 accent-[#141414]"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Subkategori */}
      <div className="border-t border-[#E7E5E0] pt-4">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#141414]">
          Subkategori
        </p>
        <div className="flex flex-wrap gap-1.5">
          {MERCH_SUBCATEGORIES.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() =>
                setSelectedSubcategory(selectedSubcategory === sub ? "" : sub)
              }
              className={`rounded border px-2.5 py-1 text-xs font-medium ${
                selectedSubcategory === sub
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-[#E7E5E0] bg-white text-[#141414] hover:border-[#141414]"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Harga Maksimal */}
      <div className="border-t border-[#E7E5E0] pt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#141414]">
            Harga Maksimal
          </p>
          <span className="text-xs font-bold text-[#C85A32]">
            {formatRupiah(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100000}
          step={5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#141414]"
        />
      </div>

      {/* Ukuran */}
      <div className="border-t border-[#E7E5E0] pt-4">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#141414]">
          Ukuran
        </p>
        <div className="flex flex-wrap gap-1.5">
          {MERCH_SIZES.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() =>
                toggleArrayValue(sz, selectedSizes, setSelectedSizes)
              }
              className={`border px-2.5 py-1 text-xs font-medium ${
                selectedSizes.includes(sz)
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-[#E7E5E0] bg-white text-[#141414]"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="border-t border-[#E7E5E0] pt-4">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#141414]">
          Rating Minimal
        </p>
        <div className="flex gap-2">
          {[4.5, 4.0].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`inline-flex items-center gap-1 rounded border px-3 py-1 text-xs font-medium ${
                minRating === r
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-[#E7E5E0] bg-white text-[#141414]"
              }`}
            >
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {r}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-[#6B6B6B]">
        <Link href="/" className="hover:text-[#141414]">
          Beranda
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-[#141414]">{breadcrumbLabel}</span>
      </nav>

      {/* Header + Count + Sort */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#E7E5E0] pb-5 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-[#6B6B6B]">{description}</p>
          )}
          <p className="mt-2 text-xs font-semibold text-[#6B6B6B]">
            Menampilkan {filteredProducts.length} produk
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 border border-[#141414] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#141414] lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="hidden text-xs font-semibold text-[#6B6B6B] sm:inline"
            >
              Urutkan:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-[#E7E5E0] bg-white px-3 py-2 text-xs font-semibold text-[#141414] focus:border-[#141414] focus:outline-none"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlaris">Terlaris</option>
              <option value="harga-asc">Harga Terendah</option>
              <option value="harga-desc">Harga Tertinggi</option>
              <option value="diskon">Diskon Terbesar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          {filterPanelContent}
        </aside>

        <div className="lg:col-span-9">
          {visibleProducts.length === 0 ? (
            <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-12 text-center">
              <p className="text-base font-bold text-[#141414]">
                Produk tidak ditemukan
              </p>
              <p className="mt-1 text-sm text-[#6B6B6B]">
                Coba ubah atau reset filter pencarian Anda.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 bg-[#141414] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + 12)}
                    className="border border-[#141414] bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#141414] hover:bg-[#141414] hover:text-white transition"
                  >
                    Muat Lebih Banyak ({filteredProducts.length - visibleCount}{" "}
                    tersisa)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E7E5E0] pb-3">
              <span className="text-sm font-bold text-[#141414]">
                Filter Produk
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Tutup filter"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterPanelContent}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-6 w-full bg-[#141414] py-3 text-xs font-bold uppercase tracking-wider text-white"
            >
              Terapkan ({filteredProducts.length} Produk)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
