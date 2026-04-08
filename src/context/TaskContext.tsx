import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useTasks } from "../hooks/useTasks";
import { useAuthContext } from "./AuthContext";
import type { Task } from "../types";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description: string) => Promise<void>;
  updateTask: (
    taskId: string,
    data: Partial<Pick<Task, "title" | "description" | "done">>
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTask: (taskId: string, currentDone: boolean) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const taskData = useTasks(user?.uid);

  return (
    <TaskContext.Provider value={taskData}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
  }
  return context;
};
