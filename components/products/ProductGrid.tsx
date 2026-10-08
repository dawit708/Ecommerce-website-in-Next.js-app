import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: Props) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-[var(--muted)]">
        No products found.
      </div>
    );
  }

  return (
    <div className={`grid gap-4 md:gap-6 ${colClass}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}