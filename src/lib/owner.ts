"use server";

import { unstable_cache } from "next/cache";
import { createClient } from "./supabase/server";

export async function getOwnerById(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return "Unassigned";

  const getCachedOwner = unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data?.full_name ?? "Unassigned";
    },
    ["owner", user.id, id],
    { tags: [`owners:${user.id}`], revalidate: 30 },
  );

  return getCachedOwner();
}
