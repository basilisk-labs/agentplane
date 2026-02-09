import type { TaskData } from "../backends/task-backend.js";

export type TaskBackendPort = {
  listTasks(): Promise<TaskData[]>;
  getTask(id: string): Promise<TaskData | null>;
  writeTask(task: TaskData): Promise<void>;
  exportTasksJson(path: string): Promise<void>;
};
