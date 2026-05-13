import type { TaskData } from "../../../backends/task-backend.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { backendUsesLocalTaskStore } from "../task-backend.js";
import {
  applyTaskStoreIntents,
  resolveTaskStoreIntents,
  resolveTaskStorePatch,
} from "./intents.js";
import {
  didReadmeChangeOnDisk,
  isConcurrentReadmeChangeError,
  normalizeTaskRevision,
  readTaskReadmeCached,
  throwTaskRevisionConflict,
  writeTaskReadme,
} from "./readme.js";
import type {
  CachedTask,
  TaskStore as TaskStoreContract,
  TaskStoreContext,
  TaskStoreIntentResult,
  TaskStoreMutationOptions,
  TaskStorePatch,
} from "./types.js";

export class TaskStore implements TaskStoreContract {
  private ctx: TaskStoreContext;
  private cache = new Map<string, Promise<CachedTask>>();

  constructor(ctx: TaskStoreContext) {
    this.ctx = ctx;
  }

  async get(taskId: string): Promise<TaskData> {
    const entry = await this.getCached(taskId);
    return entry.task;
  }

  async update(
    taskId: string,
    updater: (current: TaskData) => Promise<TaskData> | TaskData,
    opts: TaskStoreMutationOptions = {},
  ): Promise<{ changed: boolean; task: TaskData }> {
    return await this.runWithRetry(taskId, opts, async (entry) => {
      return await updater({ ...entry.task });
    });
  }

  async patch(
    taskId: string,
    builder: (
      current: TaskData,
    ) => Promise<TaskStorePatch | null | undefined> | TaskStorePatch | null | undefined,
    opts: TaskStoreMutationOptions = {},
  ): Promise<{ changed: boolean; task: TaskData }> {
    return await this.mutate(
      taskId,
      async (current) => resolveTaskStorePatch(await builder(current)),
      opts,
    );
  }

  async mutate(
    taskId: string,
    builder: (current: TaskData) => Promise<TaskStoreIntentResult> | TaskStoreIntentResult,
    opts: TaskStoreMutationOptions = {},
  ): Promise<{ changed: boolean; task: TaskData }> {
    return await this.runWithRetry(taskId, opts, async (entry) => {
      const intents = resolveTaskStoreIntents(await builder({ ...entry.task }));
      return applyTaskStoreIntents(entry, intents);
    });
  }

  private async getCached(taskId: string): Promise<CachedTask> {
    const key = taskId.trim();
    if (!key) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "task id is required",
      });
    }
    const existing = this.cache.get(key);
    if (existing) return await existing;

    const load = (async () => {
      return await readTaskReadmeCached({ ctx: this.ctx, taskId: key });
    })();
    this.cache.set(key, load);
    return await load;
  }

  private async runWithRetry(
    taskId: string,
    opts: TaskStoreMutationOptions,
    computeNext: (entry: CachedTask) => Promise<TaskData> | TaskData,
  ): Promise<{ changed: boolean; task: TaskData }> {
    for (let attempt = 0; attempt < 2; attempt++) {
      const entry = await this.getCached(taskId);
      if (opts.expectedRevision !== undefined) {
        const expectedRevision = normalizeTaskRevision(opts.expectedRevision);
        const currentRevision = normalizeTaskRevision(entry.task.revision);
        if (currentRevision !== expectedRevision) {
          throwTaskRevisionConflict({ taskId, expectedRevision, currentRevision });
        }
      }

      let next: TaskData;
      try {
        next = await computeNext(entry);
      } catch (err) {
        if (
          attempt === 0 &&
          err instanceof CliError &&
          err.code === "E_VALIDATION" &&
          (await didReadmeChangeOnDisk({
            readmePath: entry.readmePath,
            expectedMtimeMs: entry.mtimeMs,
            expectedRawText: entry.rawText,
          }))
        ) {
          this.cache.delete(taskId);
          continue;
        }
        throw err;
      }

      try {
        if (next === entry.task || JSON.stringify(next) === JSON.stringify(entry.task)) {
          return { changed: false, task: entry.task };
        }
        return await this.writeNextTask(taskId, entry, next);
      } catch (err) {
        if (attempt === 0 && isConcurrentReadmeChangeError(err)) {
          this.cache.delete(taskId);
          continue;
        }
        throw err;
      }
    }

    const task = await this.get(taskId);
    return { changed: false, task };
  }

  private async writeNextTask(
    taskId: string,
    entry: CachedTask,
    next: TaskData,
  ): Promise<{ changed: boolean; task: TaskData }> {
    const changed = await writeTaskReadme({ entry, next });
    this.cache.set(
      taskId,
      (async () => {
        return await readTaskReadmeCached({ ctx: this.ctx, taskId });
      })(),
    );

    const updated = await this.get(taskId);
    return { changed, task: updated };
  }
}

export function getTaskStore(ctx: TaskStoreContext): TaskStore {
  const memo = ctx.memo as { taskStore?: TaskStore };
  memo.taskStore ??= new TaskStore(ctx);
  return memo.taskStore;
}

export function backendIsLocalFileBackend(ctx: TaskStoreContext): boolean {
  return backendUsesLocalTaskStore(ctx);
}
