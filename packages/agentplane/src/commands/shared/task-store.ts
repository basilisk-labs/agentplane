import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  ensureDocSections,
  docChanged,
  extractTaskDoc,
  mergeTaskDoc,
  parseTaskReadme,
  renderTaskReadme,
  setMarkdownSection,
  type ParsedTaskReadme,
} from "@agentplaneorg/core";

import {
  LocalBackend,
  type TaskData,
  type TaskEvent,
  taskRecordToData,
} from "../../backends/task-backend.js";
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

type TaskComment = NonNullable<TaskData["comments"]>[number];

export type TaskStoreTaskPatch = Partial<
  Omit<
    TaskData,
    "doc" | "comments" | "events" | "doc_version" | "doc_updated_at" | "doc_updated_by"
  >
>;

export type TaskStoreDocPatch =
  | {
      kind: "replace-doc";
      doc: string;
      expectedCurrentDoc?: string | null;
    }
  | {
      kind: "set-section";
      section: string;
      text: string;
      requiredSections: string[];
      expectedCurrentText?: string | null;
    };

export type TaskStorePatch = {
  task?: TaskStoreTaskPatch;
  appendComments?: TaskComment[];
  appendEvents?: TaskEvent[];
  doc?: TaskStoreDocPatch;
  docMeta?: {
    touch?: boolean;
    updatedBy?: string;
    version?: 2 | 3;
  };
};

function taskReadmePath(ctx: CommandContext, taskId: string): string {
  return path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir, taskId, "README.md");
}

function normalizeTaskDocVersion(value: unknown, fallback: 2 | 3 = 2): 2 | 3 {
  return value === 3 ? 3 : value === 2 ? 2 : fallback;
}

function normalizeDocComparison(text: string | null | undefined): string {
  return String(text ?? "")
    .replaceAll("\r\n", "\n")
    .trim();
}

function extractDocSectionText(doc: string, sectionName: string): string | null {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      if (capturing) break;
      capturing = (match[1] ?? "").trim() === sectionName;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

function normalizeComments(task: TaskData): TaskComment[] {
  return Array.isArray(task.comments)
    ? task.comments.filter(
        (item): item is TaskComment =>
          !!item && typeof item.author === "string" && typeof item.body === "string",
      )
    : [];
}

function normalizeEvents(task: TaskData): TaskEvent[] {
  return Array.isArray(task.events)
    ? task.events.filter(
        (item): item is TaskEvent =>
          !!item &&
          typeof item.type === "string" &&
          typeof item.at === "string" &&
          typeof item.author === "string",
      )
    : [];
}

function isConcurrentReadmeChangeError(err: unknown): err is CliError {
  return (
    err instanceof CliError &&
    err.code === "E_IO" &&
    err.message.startsWith("Task README changed concurrently:")
  );
}

function throwTaskSectionConflict(opts: { taskId: string; section: string }): never {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task README section changed concurrently: ${opts.taskId} ## ${opts.section} ` +
      "(re-read the task and re-apply your change)",
    context: {
      task_id: opts.taskId,
      section: opts.section,
      reason_code: "task_readme_section_conflict",
    },
  });
}

function throwTaskDocConflict(opts: { taskId: string }): never {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task README changed concurrently: ${opts.taskId} ` +
      "(re-read the task and re-apply your change)",
    context: {
      task_id: opts.taskId,
      reason_code: "task_readme_conflict",
    },
  });
}

function applyTaskDocPatch(opts: {
  taskId: string;
  currentDocRaw: string;
  patch: TaskStoreDocPatch;
}): string {
  if (opts.patch.kind === "replace-doc") {
    if (opts.patch.expectedCurrentDoc !== undefined) {
      const currentDoc = normalizeDocComparison(opts.currentDocRaw);
      const expectedDoc = normalizeDocComparison(opts.patch.expectedCurrentDoc);
      if (currentDoc !== expectedDoc) {
        throwTaskDocConflict({ taskId: opts.taskId });
      }
    }
    return opts.patch.doc;
  }

  const baseDoc = ensureDocSections(opts.currentDocRaw, opts.patch.requiredSections);
  if (opts.patch.expectedCurrentText !== undefined) {
    const currentSection = normalizeDocComparison(
      extractDocSectionText(baseDoc, opts.patch.section),
    );
    const expectedSection = normalizeDocComparison(opts.patch.expectedCurrentText);
    if (currentSection !== expectedSection) {
      throwTaskSectionConflict({ taskId: opts.taskId, section: opts.patch.section });
    }
  }

  return ensureDocSections(
    setMarkdownSection(baseDoc, opts.patch.section, opts.patch.text),
    opts.patch.requiredSections,
  );
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
    return await this.runWithRetry(taskId, async (entry) => {
      return await updater({ ...entry.task });
    });
  }

  async patch(
    taskId: string,
    builder: (
      current: TaskData,
    ) => Promise<TaskStorePatch | null | undefined> | TaskStorePatch | null | undefined,
  ): Promise<{ changed: boolean; task: TaskData }> {
    return await this.runWithRetry(taskId, async (entry) => {
      const patch = await builder({ ...entry.task });
      if (!patch) return { ...entry.task };

      const current = entry.task;
      const next: TaskData = patch.task ? { ...current, ...patch.task } : { ...current };

      if (patch.appendComments && patch.appendComments.length > 0) {
        next.comments = [...normalizeComments(current), ...patch.appendComments];
      }
      if (patch.appendEvents && patch.appendEvents.length > 0) {
        next.events = [...normalizeEvents(current), ...patch.appendEvents];
      }
      if (patch.doc) {
        next.doc = applyTaskDocPatch({
          taskId: current.id,
          currentDocRaw: String(current.doc ?? ""),
          patch: patch.doc,
        });
      }

      const touchDoc = patch.doc !== undefined || patch.docMeta?.touch === true;
      if (touchDoc) {
        const currentDocVersion = normalizeTaskDocVersion(entry.parsed.frontmatter.doc_version);
        next.doc_version = normalizeTaskDocVersion(
          patch.docMeta?.version ?? current.doc_version,
          currentDocVersion,
        );
        next.doc_updated_at = new Date().toISOString();
        next.doc_updated_by = patch.docMeta?.updatedBy ?? resolveDocUpdatedBy(next);
      }

      return next;
    });
  }

  private async runWithRetry(
    taskId: string,
    computeNext: (entry: CachedTask) => Promise<TaskData> | TaskData,
  ): Promise<{ changed: boolean; task: TaskData }> {
    for (let attempt = 0; attempt < 2; attempt++) {
      const entry = await this.getCached(taskId);
      const next = await computeNext(entry);

      try {
        return await this.writeNextTask(taskId, entry, next);
      } catch (err) {
        if (attempt === 0 && isConcurrentReadmeChangeError(err)) {
          // Refresh cache and retry once.
          this.cache.delete(taskId);
          continue;
        }
        throw err;
      }
    }

    // Unreachable, but keeps TS happy.
    const task = await this.get(taskId);
    return { changed: false, task };
  }

  private async writeNextTask(
    taskId: string,
    entry: CachedTask,
    next: TaskData,
  ): Promise<{ changed: boolean; task: TaskData }> {
    // Start from existing frontmatter to preserve any unknown keys.
    const frontmatter = { ...entry.parsed.frontmatter, ...taskDataToFrontmatter(next) };

    let body = entry.parsed.body ?? "";
    const existingDoc = extractTaskDoc(body);
    const now = new Date().toISOString();
    const currentDocVersion = normalizeTaskDocVersion(entry.parsed.frontmatter.doc_version);
    const requestedDocVersion = normalizeTaskDocVersion(next.doc_version, currentDocVersion);
    if (next.doc !== undefined) {
      const nextDoc = String(next.doc ?? "");
      body = mergeTaskDoc(body, nextDoc);
      if (docChanged(existingDoc, nextDoc) || !frontmatter.doc_updated_at) {
        frontmatter.doc_version = requestedDocVersion;
        frontmatter.doc_updated_at = now;
        frontmatter.doc_updated_by = resolveDocUpdatedBy(next);
      }
    }

    frontmatter.doc_version = normalizeTaskDocVersion(frontmatter.doc_version, requestedDocVersion);
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
    await ensureUnchangedOnDisk({
      readmePath: entry.readmePath,
      expectedMtimeMs: entry.mtimeMs,
    });

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
}

export function getTaskStore(ctx: CommandContext): TaskStore {
  const memo = ctx.memo as { taskStore?: TaskStore };
  memo.taskStore ??= new TaskStore(ctx);
  return memo.taskStore;
}

export function backendIsLocalFileBackend(ctx: CommandContext): boolean {
  return ctx.taskBackend instanceof LocalBackend;
}
