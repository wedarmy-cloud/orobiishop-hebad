"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRANDS } from "@/data/catalog";

const LETTERS = ["Semua", "A", "B", "E", "K", "L", "R", "S", "T", "V"];

export default function BrandsPage() {
  const [activeLetter, setActiveLetter] = useState("Semua");

  const filteredBrands = [...BRANDS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((b) =>
      activeLetter === "Semua"
        ? true
        : b.name.toUpperCase().startsWith(activeLetter)
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-[#141414] sm:text-3xl">
        Direktori Brand Orobiishop (A–Z)
      </h1>
      <p className="mt-1.5 text-sm text-[#6B6B6B]">
        Jelajahi {BRANDS.length} label kurasi lokal & kontemporer yang bekerja sama resmi
        dengan Orobiishop.
      </p>

      {/* A-Z Filter Bar */}
      <div className="mt-6 flex flex-wrap gap-2 border-y border-[#E7E5E0] py-4">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => setActiveLetter(letter)}
            className={`px-3 py-1.5 text-xs font-bold transition ${
              activeLetter === letter
                ? "bg-[#141414] text-white"
                : "border border-[#E7E5E0] bg-white text-[#141414] hover:border-[#141414]"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Brands Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/cari?brand=${brand.slug}`}
            className="group flex gap-4 border border-[#E7E5E0] bg-white p-4 transition hover:border-[#141414]"
          >
            <div className="h-24 w-24 shrink-0 overflow-hidden bg-[#F3F2EE]">
              <img
                src={brand.image}
                alt={brand.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C85A32]">
                {brand.origin}
              </span>
              <h2 className="mt-0.5 text-base font-bold text-[#141414] group-hover:underline">
                {brand.name}
              </h2>
              <p className="mt-1 text-xs text-[#6B6B6B] line-clamp-2">
                {brand.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
