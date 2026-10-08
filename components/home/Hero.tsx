import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
        {/* Left */}
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            New Collection 2026
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Premium products,
            <br />
            <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              delivered beautifully.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Curated essentials for modern living. Discover the pieces everyone
            is talking about.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop">
              <Button size="lg">
                Shop Now
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/shop?sale=true">
              <Button variant="outline" size="lg">
                View Sale
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex items-center gap-6 text-xs text-[var(--muted)]">
            <div>
              <p className="text-lg font-bold text-[var(--fg)]">10K+</p>
              <p>Happy customers</p>
            </div>
            <div className="h-8 w-px bg-[var(--border)]"></div>
            <div>
              <p className="text-lg font-bold text-[var(--fg)]">4.9★</p>
              <p>Average rating</p>
            </div>
            <div className="h-8 w-px bg-[var(--border)]"></div>
            <div>
              <p className="text-lg font-bold text-[var(--fg)]">Free</p>
              <p>Shipping over $100</p>
            </div>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-transparent">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
              alt="Featured collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-xl md:bottom-8 md:left-8">
            <p className="text-xs text-[var(--muted)]">Featured Item</p>
            <p className="text-sm font-semibold">Classic Sneakers</p>
            <p className="text-lg font-bold text-accent">$89.99</p>
          </div>
        </div>
      </div>
    </section>
  );
}