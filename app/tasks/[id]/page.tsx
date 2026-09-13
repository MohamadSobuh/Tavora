import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  Trash2,
  UserRound,
} from "lucide-react";
import { notFound } from "next/navigation";
import { deleteTask, getTask, updateTaskStatus } from "@/src/lib/tasks";
import { getProjectByTaskId } from "@/src/lib/projects";
import { getOwnerById } from "@/src/lib/owner";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;
  const result = await getTask(id);
  const projectResult = await getProjectByTaskId(id);
  if (!result.success) {
    notFound();
  }

  const task = result.data;
  const projectOwner = await getOwnerById(task.owner);

  function formatDueDate(value: string | null) {
    if (!value) return "No date";
    return new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${value}T00:00:00`));
  }
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
          <form action={deleteTask}>
            <input type="hidden" name="id" value={String(task.id)} />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-danger/40 px-3 text-sm font-semibold text-danger transition hover:bg-danger-bg/40"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </form>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-info-bg px-3 py-1 text-sm font-semibold text-info">
              {task.status}
            </span>
            <span className="rounded bg-danger-bg px-3 py-1 text-sm font-semibold text-danger">
              {task.priority} priority
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-text">
            {task.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
            {task.description || "No additional details have been added yet."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <CalendarDays className="h-5 w-5 text-gold-400" />
            <p className="mt-3 text-sm text-muted">Due date</p>
            <p className="mt-1 font-semibold text-text">
              {formatDueDate(task.dueDate)}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <UserRound className="h-5 w-5 text-info" />
            <p className="mt-3 text-sm text-muted">Owner</p>
            <p className="mt-1 font-semibold text-text">
              {projectOwner || "Unassigned"}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <Clock3 className="h-5 w-5 text-warning" />
            <p className="mt-3 text-sm text-muted">Estimate</p>
            <p className="mt-1 font-semibold text-text">
              {task.estimate || "Not set"} m
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <Flag className="h-5 w-5 text-danger" />
            <p className="mt-3 text-sm text-muted">Priority</p>
            <p className="mt-1 font-semibold text-text">{task.priority}</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-background-secondary p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Update status</h2>
            <CheckCircle2 className="h-5 w-5 text-gold-400" />
          </div>
          <form action={updateTaskStatus} className="mt-5 flex flex-wrap gap-3">
            <input type="hidden" name="id" value={String(task.id)} />
            <select
              name="status"
              defaultValue={task.status}
              className="h-11 min-w-40 rounded-lg border border-border bg-background px-3 text-sm text-text outline-none focus:border-gold-500"
            >
              <option>Todo</option>
              <option>In progress</option>
              <option>Waiting</option>
              <option>Done</option>
            </select>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
            >
              Save status
            </button>
          </form>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-text">Task context</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Project</dt>
              <dd className="font-medium text-text">
                {projectResult.success ? projectResult.data.name : "Not set"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Tags</dt>
              <dd className="text-right font-medium text-text">
                {task.tags.length ? task.tags.join(", ") : "None"}
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </section>
  );
}
