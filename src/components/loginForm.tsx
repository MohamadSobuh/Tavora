"use client";

import { loginAction } from "@/app/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  async function handleSubmit(formData: FormData) {
    try {
      const result = await loginAction(formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error logging in");
    }
  }
  return (
    <form className="space-y-5" action={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-text flex items-start"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-text placeholder:text-text-secondary transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-text">
            Password
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-text placeholder:text-text-secondary transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-primary focus:ring-primary/30"
        />
        Remember me
      </label>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-xl bg-gold-400 px-4 py-3 font-medium text-primary-foreground transition hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
      >
        Sign in
      </button>
    </form>
  );
}
