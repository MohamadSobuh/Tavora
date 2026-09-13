import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
      <section className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-300">
          <FileQuestion className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-gold-400">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-text">
          Page not found
        </h1>
        <p className="mt-3 leading-7 text-text-secondary">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/dashboard"
          className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
