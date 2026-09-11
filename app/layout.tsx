import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/_styles/globals.css";
import SideBar from "./_components/sideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tavora",
  description: "A calm task management workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-text">
        <SideBar />
        <main className="min-h-screen px-4 pb-8 pt-24 sm:px-6 lg:ml-64 lg:px-10 lg:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
