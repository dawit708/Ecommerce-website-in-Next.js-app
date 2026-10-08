"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, MessageCircle, Share2, Play } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on login / register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const columns = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/shop" },
        { label: "New Arrivals", href: "/shop?sort=new" },
        { label: "Best Sellers", href: "/shop?sort=best" },
        { label: "Sale", href: "/shop?sale=true" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ];

  const socials = [
    { Icon: Camera, href: "#", label: "Instagram" },
    { Icon: MessageCircle, href: "#", label: "Twitter" },
    { Icon: Share2, href: "#", label: "Facebook" },
    { Icon: Play, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Nova<span className="text-accent">Cart</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-[var(--muted)]">
              Premium products, delivered beautifully. Curated essentials for
              modern living.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)] md:flex-row">
          <p>© {new Date().getFullYear()} NovaCart. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}