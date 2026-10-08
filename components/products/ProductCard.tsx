"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist);
  const inWishlist = mounted && isInWishlist(product.id);

  useEffect(() => setMounted(true), []);

  const badgeVariant =
    product.badge === "Sale"
      ? "sale"
      : product.badge === "New"
      ? "new"
      : product.badge === "Best Seller"
      ? "best"
      : "default";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110 dark:bg-black/70"
        aria-label="Add to wishlist"
      >
        <Heart
          size={16}
          className={cn(
            inWishlist ? "fill-error text-error" : "text-[var(--fg)]"
          )}
        />
      </button>

      {/* Badge */}
      {product.badge && (
        <div className="absolute left-3 top-3 z-10">
          <Badge variant={badgeVariant}>{product.badge}</Badge>
        </div>
      )}

      {/* Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f5f5f5] dark:bg-[#1a1a1a]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[var(--muted)]">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 line-clamp-1 font-medium hover:text-accent">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--muted)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0a0f] text-white transition-transform hover:scale-110 dark:bg-white dark:text-[#0a0a0f]"
            aria-label="Add to cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}