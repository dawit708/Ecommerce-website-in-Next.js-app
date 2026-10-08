"use client";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const totalItems = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => {
        document.getElementById("navbar-search")?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Hide navbar on login / register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=Clothing", label: "Clothing" },
    { href: "/shop?category=Accessories", label: "Accessories" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Nova<span className="text-accent">Cart</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {mounted && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {mounted && user ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-medium md:inline">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 md:inline-flex"
                aria-label="Account"
              >
                <User size={18} />
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 md:hidden"
              aria-label="Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-[var(--border)] md:hidden">
            <ul className="flex flex-col p-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {mounted && user ? (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="block w-full py-3 text-left text-sm font-medium text-error"
                  >
                    Logout ({user.name})
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-24 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <form
            onSubmit={handleSearch}
            onClick={(e) => e.stopPropagation()}
            className="mx-4 w-full max-w-2xl"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-2xl">
              <Search size={20} className="text-[var(--muted)]" />
              <input
                id="navbar-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-[var(--muted)]"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-white/70">
              Press Enter to search
            </p>
          </form>
        </div>
      )}
    </>
  );
}