"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check } from "lucide-react";

const steps = ["Shipping", "Payment", "Done"];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => clearCart(), 500);
  };

  /* ---------- SUCCESS SCREEN ---------- */
  if (step === 2) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center md:px-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
          <Check size={48} className="text-success" />
        </div>
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Thank you for shopping with NovaCart. A confirmation email has been
          sent.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" onClick={() => router.push("/")}>
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- EMPTY CART ---------- */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-[var(--muted)]">
          Add items before checking out.
        </p>
        <Button
          size="lg"
          className="mt-8"
          onClick={() => router.push("/shop")}
        >
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Checkout</h1>

      {/* Steps */}
      <div className="mb-10 flex items-center gap-3">
        {steps.slice(0, 2).map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                i <= step
                  ? "bg-accent text-white"
                  : "bg-black/5 text-[var(--muted)] dark:bg-white/10"
              }`}
            >
              {i + 1}
            </div>
            <span className="text-sm font-medium">{s}</span>
            {i < 1 && <div className="h-px flex-1 bg-[var(--border)]" />}
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="First name" required />
              <Input placeholder="Last name" required />
              <Input
                placeholder="Email"
                type="email"
                required
                className="md:col-span-2"
              />
              <Input
                placeholder="Street address"
                required
                className="md:col-span-2"
              />
              <Input placeholder="City" required />
              <Input placeholder="ZIP code" required />
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Card number"
                required
                className="md:col-span-2"
              />
              <Input placeholder="MM / YY" required />
              <Input placeholder="CVC" required />
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full">
            Place Order · {formatPrice(grandTotal)}
          </Button>
        </form>

        {/* Summary */}
        <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">
                  {i.name} × {i.quantity}
                </span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between border-t border-[var(--border)] pt-4 font-semibold">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}