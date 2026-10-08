"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/login", "/register"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

    // Not logged in + trying to access protected route → go to login
    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }

    // Logged in + trying to access login/register → go to home
    if (user && isPublic) {
      router.replace("/");
      return;
    }

    setChecked(true);
  }, [user, hydrated, pathname, router]);

  // Loading state while checking auth
  if (!hydrated || !checked) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="mt-3 text-sm text-[var(--muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}