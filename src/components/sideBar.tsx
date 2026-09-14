"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import {
  CalendarDays,
  LayoutDashboard,
  ListChecks,
  ListTodo,
  LogOut,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { useTasks } from "@/src/components/TasksProvider";
import { TaskSearchPreview } from "@/src/components/TaskSearchPreview";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function SideBar() {
  const pathname = usePathname();
  const { tasks } = useTasks();
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const taskPercentage = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;
  const taskPer = `${taskPercentage}%`;

  return (
    <aside className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background-secondary/95 px-4 py-3 backdrop-blur lg:inset-y-0 lg:right-auto lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
      <div className="flex items-center justify-between gap-3 lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 lg:px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-background shadow-[0_10px_30px_rgba(184,134,11,0.24)]">
            <ListChecks className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-bold leading-5 text-text">
              Tavora
            </span>
            <span className="hidden text-xs text-muted sm:block">
              Task workspace
            </span>
          </span>
        </Link>

        <Link
          href="/tasks/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gold-500 px-3 text-sm font-semibold text-background transition hover:bg-gold-400 lg:mt-8 lg:w-full"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New task</span>
        </Link>
      </div>

      <form
        action="/tasks"
        method="get"
        className="mt-3 hidden items-center rounded-lg border border-border bg-background px-3 py-2 text-muted lg:flex"
      >
        <Search className="mr-2 h-4 w-4 text-gold-400" />
        <input
          type="search"
          name="q"
          placeholder="Search tasks"
          aria-label="Search tasks"
          className="w-full bg-transparent text-sm text-text placeholder:text-muted focus:outline-none"
        />
      </form>

      <nav className="mt-3 flex gap-2 overflow-x-auto lg:mt-8 lg:flex-1 lg:flex-col lg:overflow-visible">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              href={href}
              key={href}
              className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition lg:min-w-0 lg:px-4 lg:py-3 ${
                isActive
                  ? "bg-gold-500/10 text-gold-300 ring-1 ring-gold-500/25"
                  : "text-muted hover:bg-card hover:text-text"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 hidden rounded-lg border border-border bg-card p-4 lg:block">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text">Weekly focus</p>
          <span className="rounded bg-success-bg px-2 py-1 text-xs font-medium text-success">
            {taskPer}
          </span>
        </div>
        <div className="mt-4 h-2 rounded bg-background">
          <div
            className="h-2 rounded bg-gold-500 transition-[width]"
            style={{ width: taskPer }}
          />
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">
          {completedTasks} of {tasks.length} planned tasks are already on track.
        </p>
      </div>

      <form action={logoutAction} className="mt-4 hidden lg:block">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted transition hover:bg-danger-bg/40 hover:text-danger"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </form>
    </aside>
  );
}
