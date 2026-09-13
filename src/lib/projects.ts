"use server";

import { createClient } from "./supabase/server";

export type ProjectResult =
  | { success: true; data: { id: string | number; name: string } }
  | { success: false; error: string };

export async function getProjectByTaskId(
  taskId: string | number,
): Promise<ProjectResult> {
  const supabase = await createClient();
  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("project_id")
    .eq("id", taskId)
    .maybeSingle();

  if (taskError) {
    return { success: false, error: taskError.message };
  }

  if (!task?.project_id) {
    return { success: false, error: "Task has no project" };
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, name")
    .eq("id", task.project_id)
    .maybeSingle();

  if (projectError) {
    return { success: false, error: projectError.message };
  }

  if (!project) {
    return { success: false, error: "Project not found" };
  }

  return {
    success: true,
    data: { id: project.id, name: project.name },
  };
}
