import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Flag,
  FolderKanban,
  Tag,
  UserRound,
} from "lucide-react";

export default function NewTaskPage() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-gold-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tasks
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-wide text-gold-400">
            New task
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-text">
            Create a clear next step
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
            Capture the title, priority, date, and details in one focused view.
          </p>
        </div>

        <form className="mt-8 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-text">Task title</span>
            <input
              className="h-12 rounded-lg border border-border bg-background px-4 text-text outline-none transition placeholder:text-muted focus:border-gold-500"
              placeholder="Example: Review mobile task states"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Project</span>
              <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
                <FolderKanban className="mr-3 h-4 w-4 text-gold-400" />
                <select className="w-full bg-transparent text-text outline-none">
                  <option>Design system</option>
                  <option>Product launch</option>
                  <option>Client portal</option>
                </select>
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Owner</span>
              <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
                <UserRound className="mr-3 h-4 w-4 text-gold-400" />
                <select className="w-full bg-transparent text-text outline-none">
                  <option>Ahmad</option>
                  <option>Design team</option>
                  <option>Product team</option>
                </select>
              </div>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Due date</span>
              <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
                <CalendarDays className="mr-3 h-4 w-4 text-gold-400" />
                <input
                  className="w-full bg-transparent text-text outline-none"
                  type="date"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Priority</span>
              <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
                <Flag className="mr-3 h-4 w-4 text-danger" />
                <select className="w-full bg-transparent text-text outline-none">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Normal</option>
                  <option>Low</option>
                </select>
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Estimate</span>
              <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
                <Clock3 className="mr-3 h-4 w-4 text-warning" />
                <input
                  className="w-full bg-transparent text-text outline-none placeholder:text-muted"
                  placeholder="2h"
                />
              </div>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-text">Details</span>
            <textarea
              className="min-h-36 resize-none rounded-lg border border-border bg-background px-4 py-3 text-text outline-none transition placeholder:text-muted focus:border-gold-500"
              placeholder="Add the important notes, context, or checklist..."
            />
          </label>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-3">
            <Link
              href="/tasks"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-4 text-sm font-semibold text-text transition hover:bg-card-hover"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
            >
              <Check className="h-4 w-4" />
              Save task
            </button>
          </div>
        </form>
      </div>

      <aside className="rounded-lg border border-border bg-background-secondary p-6">
        <h2 className="text-lg font-semibold text-text">Task preview</h2>
        <div className="mt-5 rounded-lg border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-text">Untitled task</p>
              <p className="mt-1 text-sm text-muted">Design system</p>
            </div>
            <span className="rounded bg-danger-bg px-2.5 py-1 text-xs font-semibold text-danger">
              High
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded bg-gold-500/10 px-3 py-1.5 text-sm text-gold-300">
              <Tag className="h-3.5 w-3.5" />
              Planning
            </span>
            <span className="inline-flex items-center gap-2 rounded bg-info-bg px-3 py-1.5 text-sm text-info">
              <CalendarDays className="h-3.5 w-3.5" />
              No date
            </span>
          </div>
        </div>
      </aside>
    </section>
  );
}
