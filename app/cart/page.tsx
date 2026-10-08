"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
          <ShoppingBag size={40} className="text-accent" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-[var(--muted)]">
          Add some products to get started.
        </p>
        <Link href="/shop" className="mt-8 inline-block">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5] dark:bg-[#1a1a1a]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-[var(--muted)]">
                    {item.category}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-[var(--border)]">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--muted)] transition-colors hover:text-error"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between border-t border-[var(--border)] pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>

          <Link href="/checkout" className="mt-6 block">
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>

          <Link
            href="/shop"
            className="mt-4 block text-center text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}