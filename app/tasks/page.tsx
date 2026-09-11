import Link from "next/link";
import {
  ArrowUpDown,
  CalendarDays,
  CheckCircle2,
  Circle,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

const tasks = [
  {
    id: "1",
    title: "Audit dashboard spacing",
    project: "Design system",
    due: "Today",
    status: "In progress",
  },
  {
    id: "2",
    title: "Polish task detail layout",
    project: "Tavora",
    due: "Tomorrow",
    status: "Planned",
  },
  {
    id: "3",
    title: "Prepare sprint handoff",
    project: "Product launch",
    due: "Sep 15",
    status: "Done",
  },
  {
    id: "4",
    title: "Review calendar states",
    project: "Client portal",
    due: "Sep 18",
    status: "Waiting",
  },
];

const filters = ["All", "Active", "Done", "Overdue"];

export default function TasksPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gold-400">
            Tasks
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-text">
            Plan and track work
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
            A clean list for current priorities, deadlines, and task status.
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

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="flex min-h-11 items-center rounded-lg border border-border bg-card px-4 text-muted">
          <Search className="mr-3 h-4 w-4 text-gold-400" />
          <input
            type="text"
            placeholder="Search by task, project, or owner"
            className="bg-transparent text-sm placeholder:text-muted focus:outline-none w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter}
              className={`h-11 min-w-max rounded-lg px-4 text-sm font-semibold transition ${
                index === 0
                  ? "bg-gold-500 text-background"
                  : "border border-border bg-background-secondary text-muted hover:text-text"
              }`}
            >
              {filter}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background-secondary px-4 text-sm font-semibold text-muted transition hover:text-text"
            title="Filter"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-[1fr_150px_120px_120px_44px] items-center border-b border-border px-5 py-3 text-sm font-semibold text-muted max-lg:hidden">
          <span>Task</span>
          <span>Project</span>
          <span className="inline-flex items-center gap-2">
            Due <ArrowUpDown className="h-3.5 w-3.5" />
          </span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-border">
          {tasks.map((task) => (
            <Link
              href={`/tasks/${task.id}`}
              key={task.id}
              className="grid gap-3 px-5 py-4 transition hover:bg-card-hover lg:grid-cols-[1fr_150px_120px_120px_44px] lg:items-center"
            >
              <div className="flex items-start gap-3">
                {task.status === "Done" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 text-gold-400" />
                )}
                <div>
                  <p className="font-medium text-text">{task.title}</p>
                  <p className="mt-1 text-sm text-muted lg:hidden">
                    {task.project} <span aria-hidden="true">&middot;</span> Due{" "}
                    {task.due}
                  </p>
                </div>
              </div>
              <span className="hidden text-sm text-text-secondary lg:block">
                {task.project}
              </span>
              <span className="hidden text-sm text-muted lg:block">
                <CalendarDays className="mr-2 inline h-4 w-4 text-gold-400" />
                {task.due}
              </span>
              <span
                className={`w-max rounded px-2.5 py-1 text-xs font-semibold ${
                  task.status === "Done"
                    ? "bg-success-bg text-success"
                    : task.status === "In progress"
                      ? "bg-info-bg text-info"
                      : task.status === "Waiting"
                        ? "bg-warning-bg text-warning"
                        : "bg-gold-500/10 text-gold-300"
                }`}
              >
                {task.status}
              </span>
              <span className="hidden justify-self-end text-muted lg:block">
                <MoreHorizontal className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
