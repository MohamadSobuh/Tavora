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
import { getTasks } from "@/src/lib/tasks";
import { getProjectByTaskId } from "@/src/lib/projects";

const projectColors = ["bg-success", "bg-gold-500", "bg-info", "bg-warning"];

function formatDueDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default async function Page() {
  const result = await getTasks();
  const tasks = result.success ? (result.data ?? []) : [];
  const completed = tasks.filter((task) => task.status === "Done").length;
  const pending = tasks.length - completed;
  const overdue = tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "Done" &&
      new Date(`${task.dueDate}T23:59:59`) < new Date(),
  ).length;
  const tasksWithProjects = await Promise.all(
    tasks.map(async (task) => {
      const projectResult = await getProjectByTaskId(task.id);
      return {
        task,
        projectName: projectResult.success
          ? projectResult.data.name
          : task.project,
      };
    }),
  );
  const projectMap = new Map<string, { done: number; total: number }>();
  tasksWithProjects.forEach(({ task, projectName }) => {
    const project = projectMap.get(projectName) ?? { done: 0, total: 0 };
    project.total += 1;
    if (task.status === "Done") project.done += 1;
    projectMap.set(projectName, project);
  });
  const projects = Array.from(projectMap, ([name, values], index) => ({
    name,
    ...values,
    color: projectColors[index % projectColors.length],
  }));
  const upcoming = tasks
    .filter((task) => task.status !== "Done" && task.dueDate)
    .sort((first, second) =>
      (first.dueDate ?? "9999-12-31").localeCompare(
        second.dueDate ?? "9999-12-31",
      ),
    )
    .slice(0, 3);

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
          numTasks={tasks.length}
          note="Across this workspace"
          st="gold"
        />
        <StatusCards
          name="Completed"
          icon={Check}
          numTasks={completed}
          note="Completed tasks"
          st="green"
        />
        <StatusCards
          name="Pending"
          icon={Clock}
          numTasks={pending}
          note="Tasks still in motion"
          st="yellow"
        />
        <StatusCards
          name="Overdue"
          icon={CircleAlert}
          numTasks={overdue}
          note="Need attention"
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
              <Link
                href={`/tasks/${item.id}`}
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-text">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    Due {formatDueDate(item.dueDate)}
                  </p>
                </div>
                <span
                  className={`rounded px-2.5 py-1 text-xs font-semibold ${
                    item.priority === "High"
                      ? "bg-danger-bg text-danger"
                      : item.priority === "Medium"
                        ? "bg-warning-bg text-warning"
                        : "bg-info-bg text-info"
                  }`}
                >
                  {item.priority}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
