import Link from "next/link";
import { Shirt, Footprints, Watch, Home } from "lucide-react";

const categories = [
  {
    name: "Clothing",
    icon: Shirt,
    count: 42,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "Shoes",
    icon: Footprints,
    count: 28,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    name: "Accessories",
    icon: Watch,
    count: 36,
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    name: "Home",
    icon: Home,
    count: 19,
    color: "from-pink-500/20 to-pink-500/5",
  },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Find exactly what you're looking for
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm font-medium text-accent hover:underline md:block"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {categories.map(({ name, icon: Icon, count, color }) => (
          <Link
            key={name}
            href={`/shop?category=${name}`}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br ${color} p-6 transition-all hover:-translate-y-1 hover:shadow-xl md:p-8`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--card)] shadow-sm transition-transform group-hover:scale-110">
              <Icon size={24} className="text-accent" />
            </div>
            <h3 className="mt-4 text-base font-semibold md:text-lg">{name}</h3>
            <p className="text-sm text-[var(--muted)]">{count} products</p>
          </Link>
        ))}
      </div>
    </section>
  );
}