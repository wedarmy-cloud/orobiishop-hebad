"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Leaf } from "lucide-react";
import { Product } from "@/types";
import { calculateDiscountPercent, cn, formatRupiah } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, hasProduct } = useWishlistStore();
  const isWishlisted = hasProduct(product.id);
  const discountPercent = calculateDiscountPercent(
    product.price,
    product.originalPrice
  );

  return (
    <article
      className={cn("group flex flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3F2EE]">
        <Link href={`/produk/${product.slug}`} className="block h-full w-full">
          <img
            src={
              hovered && product.images[1]
                ? product.images[1]
                : product.images[0]
            }
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Top-left badges */}
        <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#141414] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              Baru
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#FAF9F6] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#141414] ring-1 ring-[#141414]/15">
              Best Seller
            </span>
          )}
          {product.isEco && (
            <span className="inline-flex items-center gap-1 bg-[#3D6352] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              <Leaf className="h-2.5 w-2.5" />
              Eco Edit
            </span>
          )}
        </div>

        {/* Discount badge */}
        {discountPercent > 0 && (
          <span className="pointer-events-none absolute bottom-2.5 left-2.5 bg-[#C85A32] px-2 py-0.5 text-[11px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={
            isWishlisted ? "Hapus dari Wishlist" : "Simpan ke Wishlist"
          }
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#141414] shadow-sm backdrop-blur-sm transition hover:scale-105 hover:bg-white"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted ? "fill-[#C85A32] text-[#C85A32]" : "text-[#141414]"
            )}
          />
        </button>
      </div>

      <Link
        href={`/produk/${product.slug}`}
        className="mt-2.5 flex flex-1 flex-col gap-1"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
          {product.brandName}
        </span>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-[#141414] group-hover:underline">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
          <span
            className={cn(
              "text-sm font-bold",
              discountPercent > 0 ? "text-[#C85A32]" : "text-[#141414]"
            )}
          >
            {formatRupiah(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#6B6B6B] line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
