"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate account creation — redirect to login
    setTimeout(() => {
      router.push("/login?registered=true");
    }, 800);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden overflow-hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200"
          alt="Fashion"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
            Join NovaCart
          </p>
          <p className="mt-2 text-3xl font-bold leading-tight">
            Create an account to start shopping.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 md:px-8">
        <div className="w-full max-w-sm">
          <div className="inline-block text-xl font-bold tracking-tight">
            Nova<span className="text-accent">Cart</span>
          </div>

          <h1 className="mt-10 text-3xl font-bold tracking-tight md:text-4xl">
            Create account
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Join NovaCart — it&apos;s free
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder="Full name" required />
            <Input type="email" placeholder="Email address" required />
            <Input
              type="password"
              placeholder="Password"
              required
              minLength={6}
            />
            <Input
              type="password"
              placeholder="Confirm password"
              required
              minLength={6}
            />

            <label className="flex items-start gap-2 text-xs text-[var(--muted)]">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-[var(--border)] accent-accent"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-accent hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-accent hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}