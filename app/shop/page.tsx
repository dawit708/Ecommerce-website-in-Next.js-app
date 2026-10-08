"use client";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import products from "@/data/products.json";
import { Product } from "@/types";
import { SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || undefined;
  const searchParam = searchParams.get("q") || "";

  const all = products as Product[];

  const categories = useMemo(
    () => Array.from(new Set(all.map((p) => p.category))),
    [all]
  );

  const [filters, setFilters] = useState<{
    category?: string;
    maxPrice?: number;
    sort?: string;
  }>({ category: categoryParam });

  // Sync filters when URL changes (e.g., clicking navbar "Clothing")
  useEffect(() => {
    setFilters((f) => ({ ...f, category: categoryParam }));
  }, [categoryParam]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...all];

    // Category filter
    if (filters.category)
      list = list.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );

    // Search filter
    if (searchParam) {
      const q = searchParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price filter
    if (filters.maxPrice)
      list = list.filter((p) => p.price <= filters.maxPrice!);

    // Sort
    if (filters.sort === "price-asc")
      list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc")
      list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating")
      list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [all, filters, searchParam]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-10 border-b border-[var(--border)] pb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Explore
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          {filters.category ? filters.category : "Shop All"}
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          {filtered.length} products found
          {searchParam && ` for "${searchParam}"`}
        </p>
      </div>

      <button
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium md:hidden"
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>

      <div className="flex gap-10">
        <ProductFilters
          categories={categories}
          onFilterChange={setFilters}
        />
        <div className="flex-1">
          <ProductGrid products={filtered} columns={3} />
        </div>
      </div>
    </div>
  );
}