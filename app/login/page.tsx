"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check } from "lucide-react";
import { Suspense, useState } from "react";
import { useAuthStore } from "@/store/authStore";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login — save user, go to home
    setTimeout(() => {
      login(email);
      router.push("/");
    }, 600);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 md:px-8">
        <div className="w-full max-w-sm">
          <div className="inline-block text-xl font-bold tracking-tight">
            Nova<span className="text-accent">Cart</span>
          </div>

          <h1 className="mt-10 text-3xl font-bold tracking-tight md:text-4xl">
            {justRegistered ? "One last step" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {justRegistered
              ? "Sign in to enter your account"
              : "Sign in to your account to continue"}
          </p>

          {justRegistered && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-4">
              <Check size={18} className="mt-0.5 shrink-0 text-success" />
              <div className="text-sm">
                <p className="font-semibold text-success">Account created!</p>
                <p className="text-[var(--muted)]">
                  Now sign in to enter NovaCart.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-[var(--muted)]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--border)] accent-accent"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
              or
            </span>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              Google
            </Button>
            <Button variant="outline" type="button">
              Apple
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-[var(--muted)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-accent hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
          alt="Fashion"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
            NovaCart
          </p>
          <p className="mt-2 text-3xl font-bold leading-tight">
            Sign in to discover premium products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  );
}