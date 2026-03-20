"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function AuthButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string | null;
    naicsCodes: string[] | null;
    onboardingCompleted: boolean;
  } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          if (!data.user.onboardingCompleted) {
            router.push("/onboarding");
            return;
          }
          if (searchParams.get("pro") === "activated") {
            fetch("/api/restore-pro", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: data.user.email }),
            })
              .then(() => router.replace("/"))
              .catch(() => {});
          }
        }
        setAuthChecked(true);
      })
      .catch(() => setAuthChecked(true));
  }, [router, searchParams]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  if (!authChecked) {
    // Always show signup link for SSR / non-JS crawlers
    return (
      <>
        <Link href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Log in</Link>
        <Link
          href="/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Sign Up Free
        </Link>
      </>
    );
  }

  if (user) {
    return (
      <>
        <span className="text-xs text-slate-500">{user.email}</span>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
        >
          Log out
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400">Log in</Link>
      <Link
        href="/register"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Sign Up Free
      </Link>
    </>
  );
}
