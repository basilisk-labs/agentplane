import type { TaskData, TaskWriteOptions } from "../backends/task-backend.js";

export type TaskBackendPort = {
  listTasks(): Promise<TaskData[]>;
  getTask(id: string): Promise<TaskData | null>;
  writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
  exportProjectionSnapshot(path: string): Promise<void>;
};
