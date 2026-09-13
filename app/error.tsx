"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
      <section className="w-full max-w-lg rounded-lg border border-danger/40 bg-card p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger-bg text-danger">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-danger">
          Something went wrong
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-text">
          We could not load this page
        </h1>
        <p className="mt-3 leading-7 text-text-secondary">
          An unexpected error occurred. Try again or return to your dashboard.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-text-secondary transition hover:border-border-hover hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
