import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Plus,
  Sparkles,
} from "lucide-react";

const focusItems = [
  { title: "Design sprint board", time: "09:30", state: "Ready" },
  { title: "Landing copy review", time: "11:00", state: "In review" },
  { title: "Mobile QA pass", time: "14:15", state: "Queued" },
];

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-lg border border-border bg-card p-6 shadow-[0_18px_60px_rgba(2,6,23,0.28)] sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gold-300">
            <span className="rounded bg-gold-500/10 px-3 py-1 font-medium ring-1 ring-gold-500/20">
              Today workspace
            </span>
            <span className="text-muted">Friday flow</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
              Keep every task calm, visible, and moving.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              A focused workspace for planning the day, checking progress, and
              moving quickly between task lists, deadlines, and priorities.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tasks/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-text transition hover:border-gold-500/40 hover:bg-card-hover"
            >
              <Plus className="h-4 w-4" />
              Add task
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background-secondary p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Today</h2>
            <CalendarDays className="h-5 w-5 text-gold-400" />
          </div>
          <div className="mt-6 space-y-4">
            {focusItems.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-text">{item.title}</p>
                  <span className="text-sm text-gold-300">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.state}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <CheckCircle2 className="h-6 w-6 text-success" />
          <h3 className="mt-4 font-semibold text-text">Clear priorities</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Separate urgent work from flexible tasks with compact labels and
            simple status markers.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <Clock3 className="h-6 w-6 text-warning" />
          <h3 className="mt-4 font-semibold text-text">Deadline rhythm</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            See what is due soon and keep the day arranged around real time.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <Sparkles className="h-6 w-6 text-gold-400" />
          <h3 className="mt-4 font-semibold text-text">Less visual noise</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Dark panels, gold highlights, and quiet spacing keep attention on
            the work.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background-secondary p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-text">Next up</h2>
            <p className="mt-1 text-sm text-muted">
              Three tasks are staged for the next work block.
            </p>
          </div>
          <CircleDashed className="h-6 w-6 text-info" />
        </div>
      </div>
    </section>
  );
}
