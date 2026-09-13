"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const URL: string = "https://jvnsvvhtcfruribxvrdq.supabase.co";
  const ANON_KEY: string = "sb_publishable_211lkyQL9zhlXeja98uF2A_hl_wj_07";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ANON_KEY;

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: object }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
        }
      },
    },
  });
}
