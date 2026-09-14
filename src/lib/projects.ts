"use server";

import { unstable_cache } from "next/cache";
import { createClient } from "./supabase/server";

export type ProjectResult =
  | { success: true; data: { id: string | number; name: string } }
  | { success: false; error: string };

export async function getProjectByTaskId(
  taskId: string | number,
): Promise<ProjectResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const getCachedProject = unstable_cache(
    async () => {
      const { data: task, error: taskError } = await supabase
        .from("tasks")
        .select("project_id")
        .eq("id", taskId)
        .maybeSingle();
      if (taskError)
        return { success: false, error: taskError.message } as const;
      if (!task?.project_id)
        return { success: false, error: "Task has no project" } as const;

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .select("id, name")
        .eq("id", task.project_id)
        .maybeSingle();
      if (projectError)
        return { success: false, error: projectError.message } as const;
      if (!project)
        return { success: false, error: "Project not found" } as const;
      return {
        success: true,
        data: { id: project.id, name: project.name },
      } as const;
    },
    ["project-by-task", user.id, String(taskId)],
    { tags: [`tasks:${user.id}`], revalidate: 30 },
  );

  return getCachedProject();
}
