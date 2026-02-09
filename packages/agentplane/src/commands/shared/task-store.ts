import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  docChanged,
  extractTaskDoc,
  mergeTaskDoc,
  parseTaskReadme,
  renderTaskReadme,
  type ParsedTaskReadme,
} from "@agentplaneorg/core";

import { LocalBackend, type TaskData, taskRecordToData } from "../../backends/task-backend.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { resolveDocUpdatedBy, taskDataToFrontmatter, type CommandContext } from "./task-backend.js";

type CachedTask = {
  task: TaskData;
  readmePath: string;
  mtimeMs: number;
  parsed: ParsedTaskReadme;
};

function taskReadmePath(ctx: CommandContext, taskId: string): string {
  return path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir, taskId, "README.md");
}

async function readTaskReadmeCached(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<CachedTask> {
  const readmePath = taskReadmePath(opts.ctx, opts.taskId);
  let text: string;
  let st;
  try {
    st = await stat(readmePath);
    text = await readFile(readmePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `ENOENT: no such file or directory, open '${readmePath}'`,
      });
    }
    throw err;
  }
  const parsed = parseTaskReadme(text);
  const task = taskRecordToData({
    id: opts.taskId,
    frontmatter: parsed.frontmatter as never,
    body: parsed.body,
    readmePath,
  });
  return { task, readmePath, mtimeMs: st.mtimeMs, parsed };
}

async function ensureUnchangedOnDisk(opts: {
  readmePath: string;
  expectedMtimeMs: number;
}): Promise<void> {
  const st = await stat(opts.readmePath);
  if (st.mtimeMs !== opts.expectedMtimeMs) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Task README changed concurrently: ${opts.readmePath}`,
    });
  }
}

export class TaskStore {
  private ctx: CommandContext;
  private cache = new Map<string, Promise<CachedTask>>();

  constructor(ctx: CommandContext) {
    this.ctx = ctx;
  }

  async get(taskId: string): Promise<TaskData> {
    const entry = await this.getCached(taskId);
    return entry.task;
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
      // For now, TaskStore does file-based caching. Non-file backends can still rely on
      // backend.getTask/writeTask elsewhere, but lifecycle/status commands in this repo
      // operate on the local task README files.
      return await readTaskReadmeCached({ ctx: this.ctx, taskId: key });
    })();
    this.cache.set(key, load);
    return await load;
  }

  async update(
    taskId: string,
    updater: (current: TaskData) => Promise<TaskData> | TaskData,
  ): Promise<{ changed: boolean; task: TaskData }> {
    // One retry on concurrent modification: re-read latest and re-apply updater.
    for (let attempt = 0; attempt < 2; attempt++) {
      const entry = await this.getCached(taskId);
      const current = entry.task;
      const next = await updater({ ...current });

      // Start from existing frontmatter to preserve any unknown keys.
      const frontmatter = { ...entry.parsed.frontmatter, ...taskDataToFrontmatter(next) };

      let body = entry.parsed.body ?? "";
      const existingDoc = extractTaskDoc(body);
      const now = new Date().toISOString();
      if (next.doc !== undefined) {
        const nextDoc = String(next.doc ?? "");
        body = mergeTaskDoc(body, nextDoc);
        if (docChanged(existingDoc, nextDoc) || !frontmatter.doc_updated_at) {
          frontmatter.doc_version = 2;
          frontmatter.doc_updated_at = now;
          frontmatter.doc_updated_by = resolveDocUpdatedBy(next);
        }
      }

      if (frontmatter.doc_version !== 2) frontmatter.doc_version = 2;
      if (
        typeof frontmatter.doc_updated_at !== "string" ||
        frontmatter.doc_updated_at.trim() === ""
      ) {
        frontmatter.doc_updated_at = now;
      }
      if (
        typeof frontmatter.doc_updated_by !== "string" ||
        frontmatter.doc_updated_by.trim() === ""
      ) {
        frontmatter.doc_updated_by = resolveDocUpdatedBy(next);
      }

      const rendered = renderTaskReadme(frontmatter, body);

      try {
        await ensureUnchangedOnDisk({
          readmePath: entry.readmePath,
          expectedMtimeMs: entry.mtimeMs,
        });
      } catch (err) {
        if (attempt === 0 && err instanceof CliError) {
          // Refresh cache and retry once.
          this.cache.delete(taskId);
          continue;
        }
        throw err;
      }

      const nextText = rendered.endsWith("\n") ? rendered : `${rendered}\n`;
      const changed = await writeTextIfChanged(entry.readmePath, nextText);

      // Refresh cache with latest content on disk.
      this.cache.set(
        taskId,
        (async () => {
          return await readTaskReadmeCached({ ctx: this.ctx, taskId });
        })(),
      );

      const updated = await this.get(taskId);
      return { changed, task: updated };
    }

    // Unreachable, but keeps TS happy.
    const task = await this.get(taskId);
    return { changed: false, task };
  }
}

export function getTaskStore(ctx: CommandContext): TaskStore {
  const memo = ctx.memo as { taskStore?: TaskStore };
  memo.taskStore ??= new TaskStore(ctx);
  return memo.taskStore;
}

export function backendIsLocalFileBackend(ctx: CommandContext): boolean {
  return ctx.taskBackend instanceof LocalBackend;
}
