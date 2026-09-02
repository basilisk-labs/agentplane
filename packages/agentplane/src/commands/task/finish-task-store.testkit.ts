import { vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskStorePatch } from "../shared/task-store.js";

export function createMutableTaskStore(
  task: TaskData,
  applyPatch: (current: TaskData, patch: TaskStorePatch | null | undefined) => TaskData,
) {
  return {
    get: vi.fn().mockImplementation(() => Promise.resolve(task)),
    patch: vi
      .fn()
      .mockImplementation(
        async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
          const next = applyPatch(task, await builder({ ...task }));
          const changed = JSON.stringify(next) !== JSON.stringify(task);
          Object.assign(task, next);
          return { changed, task };
        },
      ),
    update: vi
      .fn()
      .mockImplementation(
        async (_taskId: string, updater: (current: TaskData) => Promise<TaskData>) => {
          const next = await updater({ ...task });
          const changed = JSON.stringify(next) !== JSON.stringify(task);
          Object.assign(task, next);
          return { changed, task };
        },
      ),
  };
}
