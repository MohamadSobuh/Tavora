import Link from "next/link";
import StatusCards from "@/src/components/statusCards";
import {
  CalendarClock,
  Check,
  CircleAlert,
  Clock,
  ListTodo,
  MoveUpRight,
  Plus,
} from "lucide-react";

const projects = [
  { name: "Product launch", done: 18, total: 24, color: "bg-success" },
  { name: "Design system", done: 9, total: 14, color: "bg-gold-500" },
  { name: "Client portal", done: 6, total: 12, color: "bg-info" },
];

const upcoming = [
  { task: "Finalize task cards", due: "Today", status: "High", tone: "danger" },
  {
    task: "Review dashboard states",
    due: "Tomorrow",
    status: "Medium",
    tone: "warning",
  },
  {
    task: "Prepare weekly plan",
    due: "Friday",
    status: "Normal",
    tone: "info",
  },
];

export default function Page() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gold-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-text">
            Welcome back, Ahmad
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
            Review progress, spot deadlines, and jump into the next task with a
            clean view of the day.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
        >
          <Plus className="h-4 w-4" />
          New task
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatusCards
          name="Total tasks"
          icon={ListTodo}
          numTasks={24}
          note="Across all active boards"
          st="gold"
        />
        <StatusCards
          name="Completed"
          icon={Check}
          numTasks={14}
          note="Eight finished this week"
          st="green"
        />
        <StatusCards
          name="Pending"
          icon={Clock}
          numTasks={7}
          note="Three need attention today"
          st="yellow"
        />
        <StatusCards
          name="Overdue"
          icon={CircleAlert}
          numTasks={3}
          note="Oldest is two days late"
          st="red"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-text">
                Active projects
              </h2>
              <p className="mt-1 text-sm text-muted">
                Progress by current workstream
              </p>
            </div>
            <MoveUpRight className="h-5 w-5 text-gold-400" />
          </div>

          <div className="mt-6 space-y-5">
            {projects.map((project) => {
              const progress = Math.round((project.done / project.total) * 100);

              return (
                <div key={project.name}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-text">{project.name}</p>
                    <span className="text-sm text-muted">
                      {project.done}/{project.total}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded bg-background">
                    <div
                      className={`h-2 rounded ${project.color}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background-secondary p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">Upcoming work</h2>
              <p className="mt-1 text-sm text-muted">Deadlines and priority</p>
            </div>
            <CalendarClock className="h-5 w-5 text-gold-400" />
          </div>

          <div className="mt-6 divide-y divide-border">
            {upcoming.map((item) => (
              <div
                key={item.task}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-text">{item.task}</p>
                  <p className="mt-1 text-sm text-muted">Due {item.due}</p>
                </div>
                <span
                  className={`rounded px-2.5 py-1 text-xs font-semibold ${
                    item.tone === "danger"
                      ? "bg-danger-bg text-danger"
                      : item.tone === "warning"
                        ? "bg-warning-bg text-warning"
                        : "bg-info-bg text-info"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
