"use server";

import { createClient } from "./supabase/server";

export async function createTask(formData: FormData) {
  const title = formData.get("title");
  const project = formData.get("project");
  const owner = formData.get("owner");
  const dueDate = formData.get("dueDate");
  const priority = formData.get("priority");
  const tags = formData.getAll("tags");

  if (!title || !project || !owner || !dueDate || !priority) {
    return { success: false, error: "All required fields must be filled out" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").insert({
    title,
    project,
    owner,
    due_date: dueDate,
    priority,
    tags,
  });
  if (error) {
    console.log("Error creating task:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function getTasks() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.log("Error fetching tasks:", error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}
