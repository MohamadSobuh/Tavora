"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import type { Task } from "../lib/tasks";

type TaskSearchPreviewProps = {
  tasks: Task[];
  initialQuery: string;
};

export default function TaskSearchPreview({
  tasks,
  initialQuery,
}: TaskSearchPreviewProps) {
  const [query, setQuery] = useState(initialQuery);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? tasks
        .filter((task) =>
          [task.title, task.project, task.owner].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          ),
        )
        .slice(0, 5)
    : [];

  return (
    <div className="relative">
      <div className="flex min-h-11 items-center rounded-lg border border-border bg-card px-4 text-muted">
        <Search className="mr-3 h-4 w-4 text-gold-400" />
        <form action="/tasks" className="flex w-full">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by task, project, or owner"
            className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
          />
        </form>
      </div>
      {matches.length > 0 ? (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          {matches.map((task) => (
            <Link
              href={`/tasks/${task.id}`}
              key={task.id}
              className="block border-b border-border px-4 py-3 last:border-0 hover:bg-card-hover"
            >
              <p className="truncate text-sm font-medium text-text">
                {task.title}
              </p>
              <p className="mt-1 truncate text-xs text-muted">
                {task.project} · {task.status}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
