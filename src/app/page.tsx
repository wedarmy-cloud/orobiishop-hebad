import React from "react";
import Link from "next/link";
import {
  Award,
  Banknote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  CATEGORIES,
  EDITORIAL_ARTICLES,
  PRODUCTS,
} from "@/data/catalog";
import {
  HeroCarousel,
  PopularSearchesSection,
  ProductCarouselSection,
  SeoExpandableBlock,
} from "@/components/home/HomeClientSections";

export default function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 10);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 10);
  const onSale = PRODUCTS.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  ).slice(0, 10);
  const featuredCollections = [
    {
      name: "ANIME & POP",
      subtitle: "Seri Karakter",
      image: "/orobiishop-category-1.webp",
      href: "/cari",
    },
    {
      name: "CUTE & CHIBI",
      subtitle: "Stiker & Pin",
      image: "/orobiishop-category-3.webp",
      href: "/cari",
    },
    {
      name: "AESTHETIC",
      subtitle: "Vinyl & Hologram",
      image: "/orobiishop-category-5.webp",
      href: "/cari",
    },
    {
      name: "CUSTOM MERCH",
      subtitle: "Desain Sendiri",
      image: "/orobiishop-category-6.webp",
      href: "/kontak",
    },
    {
      name: "BUNDLE PACK",
      subtitle: "Paket Hemat",
      image: "/orobiishop-category-4.webp",
      href: "/cari",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Banner Carousel */}
      <HeroCarousel />

      {/* 2. Banner Strip "Produk Terbaru" */}
      <section className="bg-[#FAF9F6] border-b border-[#E7E5E0]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#C85A32]" />
            <p className="text-sm font-semibold text-[#141414]">
              Produk Terbaru Minggu Ini —{" "}
              <span className="font-normal text-[#6B6B6B]">
                Lebih dari 40+ desain stiker vinyl, enamel pin, & keychain baru mendarat.
              </span>
            </p>
          </div>
          <Link
            href="/cari?sort=terbaru"
            className="shrink-0 bg-[#141414] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2A2A2A]"
          >
            Lihat Produk Terbaru
          </Link>
        </div>
      </section>

      {/* 3. Grid 6 Kartu Kategori */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">
              Belanja Berdasarkan Kategori
            </h2>
            <p className="mt-1 text-xs text-[#6B6B6B] sm:text-sm">
              Pilih koleksi stiker, pin, dan pernak-pernik favoritmu
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#F3F2EE]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-base font-bold tracking-wide">{cat.name}</p>
                <span className="text-[11px] font-medium text-white/80 group-hover:underline">
                  Jelajahi →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Banner Promo / Voucher */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="relative overflow-hidden bg-[#141414] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="inline-block bg-[#C85A32] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                MEMBER EKSKLUSIF
              </span>
              <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">
                Daftar & Dapatkan Voucher Diskon 15%
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-white/80">
                Gunakan kode promo{" "}
                <span className="font-bold text-white">OROBIISHOP15</span> atau{" "}
                <span className="font-bold text-white">BARU10</span> saat
                checkout untuk menikmati potongan langsung di pesanan pertama
                Anda.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/akun"
                className="bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141414] hover:bg-[#FAF9F6]"
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/promo"
                className="border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
              >
                Semua Promo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Banner Edisi Terbatas */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid overflow-hidden border border-[#E7E5E0] bg-[#EEF3F0] md:grid-cols-12">
          <div className="flex flex-col justify-center p-6 sm:p-10 md:col-span-7">
            <span className="inline-flex w-fit items-center gap-1.5 bg-[#3D6352] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              <Sparkles className="h-3 w-3" />
              Edisi Terbatas
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#141414] sm:text-3xl">
              Koleksi Edisi Terbatas untuk Ruang & Gayamu
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#4A5550]">
              Kurasi stiker, enamel pin, dan keychain edisi terbatas dengan
              desain pilihan. Produksi rapi, tahan lama, dan siap menemani
              harimu.
            </p>
            <div className="mt-6">
              <Link
                href="/cari?limited=true"
                className="inline-block bg-[#3D6352] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2F4F40]"
              >
                Lihat Edisi Terbatas
              </Link>
            </div>
          </div>
          <div className="relative h-56 md:col-span-5 md:h-auto">
            <img
              src="/orobiishop-limited-edition-banner.jpeg"
              alt="Koleksi merchandise edisi terbatas Orobiishop"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. Koleksi Pilihan */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">
              Koleksi Pilihan
            </h2>
            <p className="mt-1 text-xs text-[#6B6B6B] sm:text-sm">
              Eksplorasi berbagai tema stiker, pin, dan merch orisinal Orobiishop
            </p>
          </div>
          <Link
            href="/cari"
            className="text-xs font-bold uppercase tracking-wider text-[#141414] hover:text-[#C85A32] hover:underline"
          >
            Semua Koleksi →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
          {featuredCollections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative aspect-square overflow-hidden border border-[#E7E5E0] bg-[#FAF9F6]"
            >
              <img
                src={collection.image}
                alt={collection.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center text-white">
                <span className="border border-white/60 bg-black/30 px-3 py-1.5 text-xs font-bold tracking-[0.18em] backdrop-blur-xs">
                  {collection.name}
                </span>
                <span className="mt-2 text-[11px] text-white/85">
                  {collection.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Bar Keunggulan (USP) */}
      <section className="border-y border-[#E7E5E0] bg-[#FAF9F6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
          {[
            {
              icon: Banknote,
              title: "Bayar di Tempat (COD)",
              desc: "Tersedia di seluruh Indonesia",
            },
            {
              icon: RotateCcw,
              title: "Garansi 30 Hari",
              desc: "Perlindungan sesuai ketentuan retur",
            },
            {
              icon: Truck,
              title: "Gratis Ongkir",
              desc: "Min. belanja Rp 299.000",
            },
            {
              icon: ShieldCheck,
              title: "Desain Orisinal",
              desc: "Merchandise kreatif Orobiishop",
            },
            {
              icon: Award,
              title: "Cashback & Poin",
              desc: "Reward untuk setiap transaksi member",
            },
          ].map((usp) => (
            <div key={usp.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#E7E5E0] text-[#141414]">
                <usp.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#141414]">{usp.title}</p>
                <p className="text-[11px] text-[#6B6B6B]">{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Section Produk: Baru Datang, Best Seller, Sale */}
      <ProductCarouselSection
        title="Baru Datang"
        subtitle="Koleksi rilis terbaru minggu ini"
        href="/cari?sort=terbaru"
        products={newArrivals}
      />
      <ProductCarouselSection
        title="Best Seller"
        subtitle="Pilihan paling diminati pelanggan Orobiishop"
        href="/cari?sort=terlaris"
        products={bestSellers}
      />
      <ProductCarouselSection
        title="Sale Pilihan"
        subtitle="Penawaran spesial hemat hingga 30%"
        href="/promo"
        products={onSale}
      />

      {/* 9. Banner Blog / Editorial ("Thread") */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C85A32]">
              THREAD BY OROBIISHOP
            </span>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">
              Inspirasi Gaya & Tips Fashion
            </h2>
          </div>
          <Link
            href="/thread"
            className="text-xs font-bold uppercase tracking-wider text-[#141414] hover:text-[#C85A32] hover:underline"
          >
            Baca Semua →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {EDITORIAL_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/thread#${article.slug}`}
              className="group flex flex-col border border-[#E7E5E0] bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F3F2EE]">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                  <span className="text-[#C85A32]">{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="mt-2 text-base font-bold leading-snug text-[#141414] group-hover:underline">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#6B6B6B]">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Tautan Koleksi Merchandise */}
      <section className="border-y border-[#E7E5E0] bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#141414] sm:text-xl">
              Jelajahi Koleksi Orobiishop
            </h2>
            <Link
              href="/cari"
              className="text-xs font-bold uppercase tracking-wider text-[#141414] hover:text-[#C85A32] hover:underline"
            >
              Semua Koleksi →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.name}
                href={collection.href}
                className="text-sm font-medium text-[#141414]/85 hover:text-[#C85A32] hover:underline"
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Pencarian Populer */}
      <PopularSearchesSection />

      {/* 12. Blok Teks SEO dengan Read More / Read Less */}
      <SeoExpandableBlock />
    </div>
  );
}
