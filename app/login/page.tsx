import React from "react";
import tavoraLogo from "../public/images/tavora_logo1.png";
import LoginForm from "@/src/components/loginForm";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-0">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-auto items-center justify-center ">
            <span className="sr-only">Tavora</span>
            <img
              src={tavoraLogo.src}
              alt="Tavora Logo"
              className="h-auto w-auto"
            />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-text">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-secondary mb-3">
            Sign in to continue to your account.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
