import { access } from "node:fs/promises";
import { listTasks, type TaskRecord } from "@agentplaneorg/core/tasks";

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function listTasksForInsights(root: string): Promise<TaskRecord[]> {
  try {
    return await listTasks({ cwd: root, rootOverride: root });
  } catch {
    return [];
  }
}
