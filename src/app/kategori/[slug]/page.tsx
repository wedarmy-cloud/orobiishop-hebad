import React from "react";
import { notFound } from "next/navigation";
import { getCategoryBySlug, PRODUCTS } from "@/data/catalog";
import { ProductListingView } from "@/components/catalog/ProductListingView";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sub } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.slug);

  return (
    <ProductListingView
      title={`Koleksi ${category.name}`}
      description={category.description}
      breadcrumbLabel={category.name}
      initialProducts={categoryProducts}
      lockedCategory={category.slug}
      initialSubcategory={sub ?? ""}
    />
  );
}
