"use client";

import { usePathname, useSearchParams } from "next/navigation";
import SideBar from "@/src/components/sideBar";
import TaskNotifications from "./TaskNotifications";
import { TasksProvider } from "@/src/components/TasksProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <main className="min-h-screen w-full">{children}</main>;
  }

  return (
    <TasksProvider key={searchParams.toString()}>
      <TaskNotifications />
      <SideBar />
      <main className="min-h-screen px-4 pb-8 pt-24 sm:px-6 lg:ml-64 lg:px-10 lg:py-10">
        {children}
      </main>
    </TasksProvider>
  );
}
