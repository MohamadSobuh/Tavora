"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTasks, type Task } from "../lib/tasks";

type TasksContextValue = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchTasks() {
      const result = await getTasks();
      if (!active) return;

      if (result.success) {
        setTasks(result.data ?? []);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }

    fetchTasks();

    return () => {
      active = false;
    };
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, loading, error }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used inside TasksProvider");
  }
  return context;
}
