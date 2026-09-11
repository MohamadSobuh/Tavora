import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
} from "lucide-react";

const days = [
  ["Mon", "7"],
  ["Tue", "8"],
  ["Wed", "9"],
  ["Thu", "10"],
  ["Fri", "11"],
  ["Sat", "12"],
  ["Sun", "13"],
];

const events = [
  { time: "09:30", title: "Design sprint board", tone: "gold" },
  { time: "11:00", title: "Dashboard review", tone: "info" },
  { time: "14:15", title: "Task list polish", tone: "warning" },
  { time: "16:00", title: "Weekly wrap", tone: "success" },
];

export default function CalendarPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gold-400">
            Calendar
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-text">
            Schedule at a glance
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
            See today&apos;s focus blocks and the shape of the week.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
        >
          <Plus className="h-4 w-4" />
          Add block
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-gold-400" />
            <h2 className="text-xl font-semibold text-text">September 2026</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-border p-2 text-muted transition hover:text-text"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-lg border border-border p-2 text-muted transition hover:text-text"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-7">
          {days.map(([day, date], index) => (
            <div
              key={date}
              className={`rounded-lg border p-4 ${
                index === 4
                  ? "border-gold-500 bg-gold-500/10"
                  : "border-border bg-background-secondary"
              }`}
            >
              <p className="text-sm text-muted">{day}</p>
              <p className="mt-2 text-2xl font-semibold text-text">{date}</p>
              <div className="mt-4 h-1.5 rounded bg-background">
                <div
                  className={`h-1.5 rounded ${
                    index === 4 ? "w-4/5 bg-gold-500" : "w-2/5 bg-border-hover"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg border border-border bg-background-secondary p-6">
          <h2 className="text-xl font-semibold text-text">Focus summary</h2>
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Deep work</span>
                <span className="font-semibold text-text">4h 30m</span>
              </div>
              <div className="mt-2 h-2 rounded bg-background">
                <div className="h-2 w-3/4 rounded bg-success" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Meetings</span>
                <span className="font-semibold text-text">2h</span>
              </div>
              <div className="mt-2 h-2 rounded bg-background">
                <div className="h-2 w-1/3 rounded bg-info" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-text">Today&apos;s blocks</h2>
          <div className="mt-6 divide-y divide-border">
            {events.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background-secondary text-sm font-semibold text-gold-300">
                  {event.time}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-text">{event.title}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <Clock3 className="h-4 w-4" />
                    45 minute block
                  </p>
                </div>
                <span
                  className={`h-3 w-3 rounded ${
                    event.tone === "gold"
                      ? "bg-gold-500"
                      : event.tone === "info"
                        ? "bg-info"
                        : event.tone === "warning"
                          ? "bg-warning"
                          : "bg-success"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
