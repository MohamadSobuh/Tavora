"use client";

import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock3,
  Flag,
  FolderKanban,
  UserRound,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTask } from "@/src/lib/tasks";

export default function NewTaskForm() {
  async function handleSubmit(formData: FormData) {
    try {
      const result = await createTask(formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Task created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Unexpected error creating task");
    }
  }
  return (
    <form className="mt-8 grid gap-5" action={handleSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-text">Task title</span>
        <input
          type="text"
          name="title"
          className="h-12 rounded-lg border border-border bg-background px-4 text-text outline-none transition placeholder:text-muted focus:border-gold-500"
          placeholder="Example: Review mobile task states"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-text">Project</span>
          <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
            <FolderKanban className="mr-3 h-4 w-4 text-gold-400" />
            <select
              name="project"
              className="w-full bg-transparent text-text outline-none"
            >
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
            <select
              name="owner"
              className="w-full bg-transparent text-text outline-none"
            >
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
              name="dueDate"
              className="w-full bg-transparent text-text outline-none"
              type="date"
            />
          </div>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-text">Priority</span>
          <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
            <Flag className="mr-3 h-4 w-4 text-danger" />
            <select
              name="priority"
              className="w-full bg-transparent text-text outline-none"
            >
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
              name="estimate"
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
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400"
        >
          <Check className="h-4 w-4" />
          Save task
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </form>
  );
}
