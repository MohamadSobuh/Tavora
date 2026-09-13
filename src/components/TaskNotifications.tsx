"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function TaskNotifications() {
  const searchParams = useSearchParams();
  const lastNotification = useRef<string | null>(null);
  const error = searchParams.get("error");
  const notification = error
    ? `error:${error}`
    : searchParams.has("updated")
      ? "updated"
      : searchParams.has("deleted")
        ? "deleted"
        : null;

  useEffect(() => {
    if (!notification || notification === lastNotification.current) return;

    lastNotification.current = notification;
    if (notification === "updated") {
      toast.success("Task status updated successfully!");
    } else if (notification === "deleted") {
      toast.success("Task deleted successfully!");
    } else if (notification.startsWith("error:")) {
      toast.error(notification.slice("error:".length));
    }
  }, [notification]);

  return <ToastContainer position="bottom-right" autoClose={3000} />;
}
