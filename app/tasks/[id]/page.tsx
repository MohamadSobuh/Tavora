import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  ListChecks,
  MessageSquareText,
  Paperclip,
  Pencil,
  UserRound,
} from "lucide-react";

const checklist = [
  { label: "Review layout spacing", done: true },
  { label: "Confirm responsive states", done: true },
  { label: "Polish empty state", done: false },
  { label: "Final visual pass", done: false },
];

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tasks
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold text-text transition hover:bg-card-hover"
            title="Edit task"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-info-bg px-3 py-1 text-sm font-semibold text-info">
              In progress
            </span>
            <span className="rounded bg-danger-bg px-3 py-1 text-sm font-semibold text-danger">
              High priority
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-text">
            Task #{id}: Polish the task workspace UI
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
            Align the page rhythm, task cards, controls, and detail panels so
            the workspace feels calm and complete.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <CalendarDays className="h-5 w-5 text-gold-400" />
            <p className="mt-3 text-sm text-muted">Due date</p>
            <p className="mt-1 font-semibold text-text">Today</p>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <UserRound className="h-5 w-5 text-info" />
            <p className="mt-3 text-sm text-muted">Owner</p>
            <p className="mt-1 font-semibold text-text">Ahmad</p>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <Clock3 className="h-5 w-5 text-warning" />
            <p className="mt-3 text-sm text-muted">Estimate</p>
            <p className="mt-1 font-semibold text-text">2 hours</p>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <Flag className="h-5 w-5 text-danger" />
            <p className="mt-3 text-sm text-muted">Priority</p>
            <p className="mt-1 font-semibold text-text">High</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-background-secondary p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Checklist</h2>
            <ListChecks className="h-5 w-5 text-gold-400" />
          </div>
          <div className="mt-5 space-y-3">
            {checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <CheckCircle2
                  className={`h-5 w-5 ${
                    item.done ? "text-success" : "text-muted"
                  }`}
                />
                <span
                  className={
                    item.done
                      ? "text-text-secondary line-through decoration-border"
                      : "text-text"
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-lg border border-border bg-background-secondary p-6">
          <h2 className="text-lg font-semibold text-text">Activity</h2>
          <div className="mt-5 space-y-5">
            <div className="flex gap-3">
              <MessageSquareText className="mt-1 h-5 w-5 text-gold-400" />
              <div>
                <p className="text-sm font-medium text-text">
                  Notes updated
                </p>
                <p className="mt-1 text-sm text-muted">12 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Paperclip className="mt-1 h-5 w-5 text-info" />
              <div>
                <p className="text-sm font-medium text-text">
                  Design reference attached
                </p>
                <p className="mt-1 text-sm text-muted">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-text">Progress</h2>
          <div className="mt-5 h-2 rounded bg-background">
            <div className="h-2 w-1/2 rounded bg-gold-500" />
          </div>
          <p className="mt-3 text-sm text-muted">2 of 4 checklist items done.</p>
        </div>
      </aside>
    </section>
  );
}
