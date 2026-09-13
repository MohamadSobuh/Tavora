import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { getTasks } from "@/src/lib/tasks";

type CalendarPageProps = {
  searchParams: Promise<{ month?: string }>;
};

function getMonthDate(value?: string) {
  if (value && /^\d{4}-\d{2}$/.test(value)) {
    const date = new Date(`${value}-01T00:00:00`);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return new Date();
}

function monthParam(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const params = await searchParams;
  const monthDate = getMonthDate(params.month);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const calendarDays = Array.from(
    { length: Math.ceil((mondayOffset + daysInMonth) / 7) * 7 },
    (_, index) => {
      const day = index - mondayOffset + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    },
  );
  const result = await getTasks();
  const tasks = result.success ? (result.data ?? []) : [];
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthTasks = tasks.filter((task) => task.dueDate?.startsWith(monthKey));
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const previousMonth = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month + 1, 1);

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
        <Link
          href="/tasks/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
        >
          <Plus className="h-4 w-4" />
          Add task
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-gold-400" />
            <h2 className="text-xl font-semibold text-text">
              {monthLabel(monthDate)}
            </h2>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/calendar?month=${monthParam(previousMonth)}`}
              aria-label="Previous month"
              className="rounded-lg border border-border p-2 text-muted transition hover:text-text"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Link
              href={`/calendar?month=${monthParam(nextMonth)}`}
              aria-label="Next month"
              className="rounded-lg border border-border p-2 text-muted transition hover:text-text"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-muted">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dateKey = day
              ? `${monthKey}-${String(day).padStart(2, "0")}`
              : null;
            const dayTasks = dateKey
              ? monthTasks.filter((task) => task.dueDate === dateKey)
              : [];
            return (
              <div
                key={`${dateKey ?? "empty"}-${index}`}
                className={`min-h-28 rounded-lg border p-2 text-left ${
                  dateKey === todayKey
                    ? "border-gold-500 bg-gold-500/10"
                    : dateKey
                      ? "border-border bg-background-secondary"
                      : "border-transparent bg-transparent"
                }`}
              >
                {day ? (
                  <p className="text-sm font-semibold text-text">{day}</p>
                ) : null}
                <div className="mt-2 space-y-1">
                  {dayTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/tasks/${task.id}`}
                      className="block truncate rounded bg-gold-500/20 px-2 py-1 text-xs text-gold-300 hover:bg-gold-500/30"
                    >
                      {task.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg border border-border bg-background-secondary p-6">
          <h2 className="text-xl font-semibold text-text">Focus summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Dated tasks this month</span>
              <span className="font-semibold text-text">
                {monthTasks.length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Completed</span>
              <span className="font-semibold text-success">
                {monthTasks.filter((task) => task.status === "Done").length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Open</span>
              <span className="font-semibold text-gold-300">
                {monthTasks.filter((task) => task.status !== "Done").length}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-text">Scheduled tasks</h2>
          <div className="mt-6 divide-y divide-border">
            {monthTasks.length === 0 ? (
              <p className="py-4 text-sm text-muted">
                No dated tasks are scheduled yet.
              </p>
            ) : (
              monthTasks.map((task) => (
                <Link
                  href={`/tasks/${task.id}`}
                  key={task.id}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background-secondary text-sm font-semibold text-gold-300">
                    {task.dueDate?.slice(8) ?? "--"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text">{task.title}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                      <Clock3 className="h-4 w-4" />
                      {task.status} · {formatDate(task.dueDate ?? "")}
                    </p>
                  </div>
                  <span
                    className={`h-3 w-3 rounded ${task.status === "Done" ? "bg-success" : "bg-gold-500"}`}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
