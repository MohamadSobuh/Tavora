"use server";

import { createClient } from "./supabase/server";

export async function getOwnerById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.full_name ?? "Unassigned";
}
