"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import products from "@/data/products.json";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const product = (products as Product[]).find((p) => p.id === Number(id));
  if (!product) notFound();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors?.[0]);
  const [tab, setTab] = useState<"desc" | "details" | "reviews">("desc");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist);
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--fg)]">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-[var(--fg)]">
          Shop
        </Link>{" "}
        / <span className="text-[var(--fg)]">{product.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#f5f5f5] dark:bg-[#1a1a1a]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.badge && (
            <div className="absolute left-4 top-4">
              <Badge
                variant={
                  product.badge === "Sale"
                    ? "sale"
                    : product.badge === "New"
                    ? "new"
                    : "best"
                }
              >
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm uppercase tracking-wide text-[var(--muted)]">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-[var(--muted)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Sizes */}
          {product.sizes && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "h-11 min-w-11 rounded-full border px-4 text-sm font-medium transition-colors",
                      size === s
                        ? "border-accent bg-accent text-white"
                        : "border-[var(--border)] hover:border-accent"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
                Color
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                      color === c ? "border-accent" : "border-[var(--border)]"
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-[var(--border)]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Plus size={16} />
              </button>
            </div>

            <Button
              onClick={() => addItem(product, quantity)}
              size="lg"
              className="flex-1"
            >
              <ShoppingBag size={16} /> Add to Cart
            </Button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-accent"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={cn(
                  inWishlist ? "fill-error text-error" : "text-[var(--fg)]"
                )}
              />
            </button>
          </div>

          {/* Perks */}
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-[var(--border)] p-4">
            {[
              { Icon: Truck, label: "Free Shipping" },
              { Icon: RotateCcw, label: "30-day Returns" },
              { Icon: Shield, label: "2-year Warranty" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <Icon size={20} className="text-accent" />
                <span className="text-xs text-[var(--muted)]">{label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-[var(--border)] pt-6">
            <div className="flex gap-6">
              {(["desc", "details", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "pb-2 text-sm font-medium capitalize transition-colors",
                    tab === t
                      ? "border-b-2 border-accent text-accent"
                      : "text-[var(--muted)]"
                  )}
                >
                  {t === "desc" ? "Description" : t}
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              {tab === "desc" && <p>{product.description}</p>}
              {tab === "details" && (
                <ul className="space-y-1">
                  <li>Category: {product.category}</li>
                  <li>In Stock: {product.inStock ? "Yes" : "No"}</li>
                  <li>Rating: {product.rating} / 5</li>
                </ul>
              )}
              {tab === "reviews" && (
                <p>
                  {product.reviews} customer reviews. Average {product.rating}{" "}
                  stars.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}