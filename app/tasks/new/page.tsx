import Link from "next/link";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import NewTaskForm from "@/src/components/newTaskForm";

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
        <NewTaskForm />
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
