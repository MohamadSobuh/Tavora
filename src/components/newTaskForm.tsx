"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const result = await createTask(formData);
      if (!result.success) {
        toast.error(result.error || "Failed to create task");
        setIsSubmitting(false);
        return;
      }

      toast.success("Task created successfully!");

      // توجيه المستخدم إلى صفحة المهمات وإعادة إنعاش البيانات (Refresh)
      setTimeout(() => {
        router.push("/tasks");
        router.refresh();
      }, 800); // إعطاء مهلة قصيرة لرؤية رسالة النجاح
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error creating task");
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 grid gap-5" action={handleSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-text">Task title</span>
        <input
          type="text"
          name="title"
          required
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
              name="project_id"
              className="w-full bg-transparent text-text outline-none"
            >
              <option value="01111111-0000-0000-0000-000000000001">
                Design system
              </option>
              <option value="02222222-0000-0000-0000-000000000002">
                Product launch
              </option>
            </select>
          </div>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-text">Owner</span>
          <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4">
            <UserRound className="mr-3 h-4 w-4 text-gold-400" />
            <select
              name="owner_id"
              className="w-full bg-transparent text-text outline-none"
            >
              <option value="41234109-38fe-4680-a216-3185560b8e49">
                Mohamad Sobuh
              </option>
              <option value="82cbaa0f-b0c6-4276-ab43-9a02f44457bb">
                Sara Ali
              </option>
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
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
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
          name="description"
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
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 text-sm font-semibold text-background transition hover:bg-gold-400 disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save task"}
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </form>
  );
}
