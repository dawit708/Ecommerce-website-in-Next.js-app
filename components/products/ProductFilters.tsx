"use client";
import { useState } from "react";

interface Props {
  categories: string[];
  onFilterChange: (filters: {
    category?: string;
    maxPrice?: number;
    sort?: string;
  }) => void;
}

export function ProductFilters({ categories, onFilterChange }: Props) {
  const [category, setCategory] = useState<string | undefined>();
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState("featured");

  const update = (
    patch: Partial<{ category: string; maxPrice: number; sort: string }>
  ) => {
    const next = { category, maxPrice, sort, ...patch };
    if (patch.category !== undefined) setCategory(patch.category);
    if (patch.maxPrice !== undefined) setMaxPrice(patch.maxPrice);
    if (patch.sort !== undefined) setSort(patch.sort);
    onFilterChange(next);
  };

  return (
    <aside className="hidden w-64 shrink-0 space-y-8 md:block">
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
          Category
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => update({ category: undefined })}
              className={`text-sm ${
                !category
                  ? "font-semibold text-accent"
                  : "text-[var(--muted)]"
              }`}
            >
              All
            </button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => update({ category: c })}
                className={`text-sm ${
                  category === c
                    ? "font-semibold text-accent"
                    : "text-[var(--muted)]"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
          Max Price: ${maxPrice}
        </h3>
        <input
          type="range"
          min={10}
          max={500}
          value={maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
          Sort By
        </h3>
        <select
          value={sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="w-full rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </aside>
  );
}