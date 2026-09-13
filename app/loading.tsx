export default function Loading() {
  return (
    <section
      className="mx-auto flex w-full max-w-7xl flex-col gap-6"
      aria-busy="true"
    >
      <div className="space-y-3">
        <div className="h-4 w-24 animate-pulse rounded bg-card" />
        <div className="h-10 w-72 animate-pulse rounded bg-card" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-card" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-lg border border-border bg-card"
          />
        ))}
      </div>
      <div className="min-h-96 animate-pulse rounded-lg border border-border bg-card" />
    </section>
  );
}
