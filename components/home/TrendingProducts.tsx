import { ProductGrid } from "@/components/products/ProductGrid";
import { Product } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  products: Product[];
}

export function TrendingProducts({ products }: Props) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Hot right now
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Trending Now
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              The pieces everyone is talking about
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 md:flex"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={products} columns={4} />

        <div className="mt-10 text-center md:hidden">
          <Link href="/shop">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium">
              View all products <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}