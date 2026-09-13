"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/src/components/sideBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <SideBar />}
      <main
        className={
          isLoginPage
            ? "min-h-screen w-full"
            : "min-h-screen px-4 pb-8 pt-24 sm:px-6 lg:ml-64 lg:px-10 lg:py-10"
        }
      >
        {children}
      </main>
    </>
  );
}
