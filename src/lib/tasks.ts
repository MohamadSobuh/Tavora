"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export type TaskStatus = "Todo" | "In progress" | "Waiting" | "Done";

type DatabaseTaskStatus = "todo" | "in_progress" | "waiting" | "done";

const statusByDatabaseValue: Record<DatabaseTaskStatus, TaskStatus> = {
  todo: "Todo",
  in_progress: "In progress",
  waiting: "Waiting",
  done: "Done",
};

const databaseStatusByAppValue: Record<TaskStatus, DatabaseTaskStatus> = {
  Todo: "todo",
  "In progress": "in_progress",
  Waiting: "waiting",
  Done: "done",
};

export type Task = {
  id: string | number;
  title: string;
  project: string;
  projectId: string | number | null;
  owner: string;
  dueDate: string | null;
  priority: string;
  status: TaskStatus;
  tags: string[];
  description: string;
  estimate: string;
};

type TaskResult =
  | { success: true; data: Task[] }
  | { success: false; error: string };

type SingleTaskResult =
  | { success: true; data: Task }
  | { success: false; error: string };

function normalizeTask(row: Record<string, unknown>): Task {
  const rawStatus = String(row.status ?? "");
  const status: TaskStatus =
    rawStatus in statusByDatabaseValue
      ? statusByDatabaseValue[rawStatus as DatabaseTaskStatus]
      : rawStatus === "Done" ||
          rawStatus === "In progress" ||
          rawStatus === "Waiting" ||
          rawStatus === "Todo"
        ? rawStatus
        : "Todo";

  return {
    id: row.id as string | number,
    title: String(row.title ?? "Untitled task"),
    project: String(row.project_id ?? "No project"),
    projectId: (row.project_id as string | number | null) ?? null,
    owner: String(row.owner_id ?? "Unassigned"),
    dueDate: row.due_date ? String(row.due_date) : null,
    priority: String(row.priority ?? "Normal"),
    status,
    tags: [],
    description: String(row.description ?? ""),
    estimate: String(row.estimate_minutes ?? ""),
  };
}

export async function createTask(formData: FormData) {
  const title = formData.get("title");
  const projectId = formData.get("project_id");
  const ownerId = formData.get("owner_id");
  const dueDate = formData.get("dueDate");
  const priority = formData.get("priority");
  const description = formData.get("description");
  const estimate = formData.get("estimate");
  const formattedEstimate =
    typeof estimate === "string" ? parseInt(estimate, 10) * 60 : null;

  if (!title || !projectId || !ownerId || !dueDate || !priority) {
    return { success: false, error: "All required fields must be filled out" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").insert({
    title,
    project_id: projectId,
    owner_id: ownerId,
    due_date: dueDate,
    description: description,
    estimate_minutes: formattedEstimate,
    priority,
  });
  if (error) {
    console.log("Error creating task:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function getTasks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select(
      "id, title, project_id, owner_id, due_date, priority, status, description",
    );
  if (error) {
    return { success: false, error: error.message };
  }
  return {
    success: true,
    data: (data ?? []).map(normalizeTask),
  } satisfies TaskResult;
}

export async function getTask(id: string): Promise<SingleTaskResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select(
      "id, title, project_id, owner_id, due_date, priority, status, description,estimate_minutes",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { success: false, error: error.message };
  }
  if (!data) {
    return { success: false, error: "Task not found" };
  }
  return { success: true, data: normalizeTask(data) };
}

export async function updateTaskStatus(formData: FormData) {
  const id = formData.get("id");
  const status = formData.get("status");
  if (
    typeof id !== "string" ||
    typeof status !== "string" ||
    !(status in databaseStatusByAppValue)
  ) {
    redirect("/tasks");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ status: databaseStatusByAppValue[status as TaskStatus] })
    .eq("id", id);
  if (error) {
    redirect(`/tasks/${id}?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
  redirect(`/tasks/${id}?updated=${Date.now()}`);
}

export async function deleteTask(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") {
    redirect("/tasks");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    redirect(`/tasks/${id}?error=${encodeURIComponent(error.message)}`);
  }
  revalidatePath("/tasks");
  redirect("/tasks?deleted=1");
}
