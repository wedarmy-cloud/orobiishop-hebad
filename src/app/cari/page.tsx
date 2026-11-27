import React from "react";
import { BRANDS, PRODUCTS } from "@/data/catalog";
import { ProductListingView } from "@/components/catalog/ProductListingView";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    brand?: string;
    eco?: string;
    limited?: string;
    sort?: string;
    sale?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, brand, eco, limited, sort, sale } = await searchParams;
  const query = q?.trim() ?? "";

  const matchedProducts = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brandName.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : PRODUCTS;

  const brandObj = brand ? BRANDS.find((b) => b.slug === brand) : undefined;

  let title = "Semua Koleksi Orobiishop";
  if (query) title = `Hasil Pencarian: "${query}"`;
  else if (brandObj) title = `Koleksi Brand ${brandObj.name}`;
  else if (limited === "true") title = "Edisi Terbatas";
  else if (eco === "true") title = "Eco Edit • Fashion Berkelanjutan";
  else if (sale === "true") title = "Promo & Sale Pilihan";

  return (
    <ProductListingView
      title={title}
      description={
        brandObj?.description ??
        "Temukan koleksi stiker, pin, keychain, dan merch kreatif pilihanmu."
      }
      breadcrumbLabel={query ? `Cari: ${query}` : brandObj?.name ?? "Katalog"}
      initialProducts={matchedProducts}
      initialBrand={brand ?? ""}
      initialEcoOnly={eco === "true"}
      initialLimitedOnly={limited === "true"}
      initialSaleOnly={sale === "true"}
      initialSort={sort ?? "terbaru"}
    />
  );
}
