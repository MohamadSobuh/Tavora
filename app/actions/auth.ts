"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return { success: false, error: "Invalid email or password" };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { success: false, error: "Invalid email or password" };
  }
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/dashboard?error=Error%20occurred%20while%20logging%20out");
  }

  redirect("/login");
}
