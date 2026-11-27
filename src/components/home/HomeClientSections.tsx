"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES, POPULAR_SEARCHES } from "@/data/catalog";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length);

  return (
    <section
      aria-label="Sorotan Utama"
      className="relative w-full overflow-hidden bg-[#141414]"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 45) next();
        if (diff < -45) prev();
        touchStartX.current = null;
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="relative min-w-full h-[400px] sm:h-[480px] lg:h-[540px]"
          >
            <img
              src={slide.image}
              alt={slide.title}
              loading={idx === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
            <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-6 sm:px-10">
              <span className="inline-block w-fit bg-[#C85A32] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                {slide.badge}
              </span>
              <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-3 max-w-lg text-sm text-white/90 sm:text-base">
                {slide.subtitle}
              </p>
              <div className="mt-6">
                <Link
                  href={slide.ctaHref}
                  className="inline-block bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141414] transition hover:bg-[#FAF9F6]"
                >
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev/Next Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Slide sebelumnya"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 text-[#141414] shadow hover:bg-white sm:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Slide berikutnya"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 text-[#141414] shadow hover:bg-white sm:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Pilih slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              current === idx ? "w-7 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

interface ProductCarouselSectionProps {
  title: string;
  subtitle?: string;
  href: string;
  products: Product[];
}

export function ProductCarouselSection({
  title,
  subtitle,
  href,
  products,
}: ProductCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = dir === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs text-[#6B6B6B] sm:text-sm">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden gap-1.5 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label={`Geser ${title} ke kiri`}
              className="rounded-full border border-[#E7E5E0] p-1.5 text-[#141414] hover:border-[#141414]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label={`Geser ${title} ke kanan`}
              className="rounded-full border border-[#E7E5E0] p-1.5 text-[#141414] hover:border-[#141414]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Link
            href={href}
            className="text-xs font-bold uppercase tracking-wider text-[#141414] hover:text-[#C85A32] hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[23.5%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function PopularSearchesSection() {
  const [expanded, setExpanded] = useState(false);
  const visibleTerms = expanded
    ? POPULAR_SEARCHES
    : POPULAR_SEARCHES.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#141414] sm:text-xl">
          Pencarian Populer
        </h2>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-bold uppercase tracking-wider text-[#C85A32] hover:underline"
        >
          {expanded ? "Tampilkan Sedikit" : "Show More"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {visibleTerms.map((term) => (
          <Link
            key={term}
            href={`/cari?q=${encodeURIComponent(term)}`}
            className="rounded-full border border-[#E7E5E0] bg-[#FAF9F6] px-4 py-2 text-xs font-medium text-[#141414] transition hover:border-[#141414] hover:bg-white"
          >
            {term}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SeoExpandableBlock() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-t border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-base font-bold text-[#141414]">
          Koleksi Stiker, Pin & Merchandise Kreatif di Orobiishop Indonesia
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
          Orobiishop adalah brand merchandise kreatif di Indonesia yang
          menghadirkan beragam pilihan stiker vinyl, enamel pin, pin button,
          gantungan kunci akrilik, tote bag, hingga custom merch dengan desain
          orisinal dan pilihan ilustrasi yang seru.
        </p>
        {open && (
          <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#6B6B6B] sm:text-sm">
            <p>
              Mulai dari stiker die-cut dan hologram tahan air, pin karakter
              lucu, keychain gantungan tas, sampai paket bundle dan pesanan
              custom untuk hadiah atau komunitas, setiap produk di Orobiishop
              diproduksi dengan kontrol kualitas yang rapi agar awet dipakai
              sehari-hari.
            </p>
            <p>
              Nikmati kemudahan pembayaran melalui Transfer Bank Virtual
              Account, E-Wallet (QRIS, GoPay, OVO), Kartu Kredit/Debit, serta
              Bayar di Tempat (COD). Setiap pesanan dikemas aman dan didukung
              pengiriman ke seluruh Indonesia serta ketentuan garansi yang
              jelas apabila terjadi kendala produksi atau salah kirim.
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="mt-3 text-xs font-bold uppercase tracking-wider text-[#141414] underline hover:text-[#C85A32]"
        >
          {open ? "Read Less" : "Read More"}
        </button>
      </div>
    </section>
  );
}
