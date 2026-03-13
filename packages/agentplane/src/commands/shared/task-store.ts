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
  rawText: string;
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

export type TaskStoreIntent =
  | {
      kind: "set-task-fields";
      task: TaskStoreTaskPatch;
    }
  | {
      kind: "append-comments";
      comments: TaskComment[];
    }
  | {
      kind: "append-events";
      events: TaskEvent[];
    }
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
    }
  | {
      kind: "touch-doc-meta";
      updatedBy?: string;
      version?: 2 | 3;
    };

type TaskStoreIntentResult = TaskStoreIntent | readonly TaskStoreIntent[] | null | undefined;

export type TaskStoreMutationOptions = {
  expectedRevision?: number;
};

export function setTaskFieldsIntent(task: TaskStoreTaskPatch): TaskStoreIntent {
  return { kind: "set-task-fields", task };
}

export function appendTaskCommentsIntent(comments: TaskComment[]): TaskStoreIntent {
  return { kind: "append-comments", comments };
}

export function appendTaskCommentIntent(comment: TaskComment): TaskStoreIntent {
  return appendTaskCommentsIntent([comment]);
}

export function appendTaskEventsIntent(events: TaskEvent[]): TaskStoreIntent {
  return { kind: "append-events", events };
}

export function appendTaskEventIntent(event: TaskEvent): TaskStoreIntent {
  return appendTaskEventsIntent([event]);
}

export function replaceTaskDocIntent(opts: {
  doc: string;
  expectedCurrentDoc?: string | null;
}): TaskStoreIntent {
  return { kind: "replace-doc", ...opts };
}

export function setTaskSectionIntent(opts: {
  section: string;
  text: string;
  requiredSections: string[];
  expectedCurrentText?: string | null;
}): TaskStoreIntent {
  return { kind: "set-section", ...opts };
}

export function touchTaskDocMetaIntent(
  opts: {
    updatedBy?: string;
    version?: 2 | 3;
  } = {},
): TaskStoreIntent {
  return { kind: "touch-doc-meta", ...opts };
}

function taskReadmePath(ctx: CommandContext, taskId: string): string {
  return path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir, taskId, "README.md");
}

function normalizeTaskDocVersion(value: unknown, fallback: 2 | 3 = 2): 2 | 3 {
  return value === 3 ? 3 : value === 2 ? 2 : fallback;
}

function normalizeTaskRevision(value: unknown, fallback = 1): number {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : fallback;
}

function readStoredTaskRevision(value: unknown): number | null {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : null;
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

function throwTaskRevisionConflict(opts: {
  taskId: string;
  expectedRevision: number;
  currentRevision: number;
}): never {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task revision changed concurrently: ${opts.taskId} ` +
      `(expected revision ${opts.expectedRevision}, current revision ${opts.currentRevision})`,
    context: {
      task_id: opts.taskId,
      expected_revision: opts.expectedRevision,
      current_revision: opts.currentRevision,
      reason_code: "task_revision_conflict",
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

function normalizeTaskStoreIntents(intents: TaskStoreIntentResult): TaskStoreIntent[] {
  if (!intents) return [];
  if (Array.isArray(intents)) {
    return intents.filter((intent): intent is TaskStoreIntent => intent != null);
  }
  return [intents as TaskStoreIntent];
}

function patchToIntents(patch: TaskStorePatch | null | undefined): TaskStoreIntent[] {
  if (!patch) return [];
  const intents: TaskStoreIntent[] = [];
  if (patch.task) {
    intents.push(setTaskFieldsIntent(patch.task));
  }
  if (patch.appendComments && patch.appendComments.length > 0) {
    intents.push(appendTaskCommentsIntent(patch.appendComments));
  }
  if (patch.appendEvents && patch.appendEvents.length > 0) {
    intents.push(appendTaskEventsIntent(patch.appendEvents));
  }
  if (patch.doc) {
    intents.push(
      patch.doc.kind === "replace-doc"
        ? replaceTaskDocIntent({
            doc: patch.doc.doc,
            expectedCurrentDoc: patch.doc.expectedCurrentDoc,
          })
        : setTaskSectionIntent({
            section: patch.doc.section,
            text: patch.doc.text,
            requiredSections: patch.doc.requiredSections,
            expectedCurrentText: patch.doc.expectedCurrentText,
          }),
    );
  }
  if (patch.docMeta && (patch.doc !== undefined || patch.docMeta.touch === true)) {
    intents.push(
      touchTaskDocMetaIntent({
        updatedBy: patch.docMeta.updatedBy,
        version: patch.docMeta.version,
      }),
    );
  }
  return intents;
}

function applyTaskStoreIntents(entry: CachedTask, intents: TaskStoreIntent[]): TaskData {
  if (intents.length === 0) return { ...entry.task };

  const current = entry.task;
  const next: TaskData = { ...current };
  let touchDoc = false;
  let docMetaUpdatedBy: string | undefined;
  let docMetaVersion: 2 | 3 | undefined;

  for (const intent of intents) {
    switch (intent.kind) {
      case "set-task-fields": {
        Object.assign(next, intent.task);
        break;
      }
      case "append-comments": {
        if (intent.comments.length > 0) {
          next.comments = [...normalizeComments(next), ...intent.comments];
        }
        break;
      }
      case "append-events": {
        if (intent.events.length > 0) {
          next.events = [...normalizeEvents(next), ...intent.events];
        }
        break;
      }
      case "replace-doc": {
        next.doc = applyTaskDocPatch({
          taskId: current.id,
          currentDocRaw: String(next.doc ?? ""),
          patch: {
            kind: "replace-doc",
            doc: intent.doc,
            expectedCurrentDoc: intent.expectedCurrentDoc,
          },
        });
        touchDoc = true;
        break;
      }
      case "set-section": {
        next.doc = applyTaskDocPatch({
          taskId: current.id,
          currentDocRaw: String(next.doc ?? ""),
          patch: {
            kind: "set-section",
            section: intent.section,
            text: intent.text,
            requiredSections: intent.requiredSections,
            expectedCurrentText: intent.expectedCurrentText,
          },
        });
        touchDoc = true;
        break;
      }
      case "touch-doc-meta": {
        touchDoc = true;
        if (intent.updatedBy !== undefined) {
          docMetaUpdatedBy = intent.updatedBy;
        }
        if (intent.version !== undefined) {
          docMetaVersion = intent.version;
        }
        break;
      }
    }
  }

  if (touchDoc) {
    const currentDocVersion = normalizeTaskDocVersion(entry.parsed.frontmatter.doc_version);
    next.doc_version = normalizeTaskDocVersion(
      docMetaVersion ?? next.doc_version,
      currentDocVersion,
    );
    next.doc_updated_at = new Date().toISOString();
    next.doc_updated_by = docMetaUpdatedBy ?? resolveDocUpdatedBy(next);
  }

  return next;
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
  return { task, readmePath, mtimeMs: st.mtimeMs, parsed, rawText: text };
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

async function didReadmeChangeOnDisk(opts: {
  readmePath: string;
  expectedMtimeMs: number;
}): Promise<boolean> {
  try {
    const st = await stat(opts.readmePath);
    return st.mtimeMs !== opts.expectedMtimeMs;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return true;
    throw err;
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
      async (current) => patchToIntents(await builder(current)),
      opts,
    );
  }

  async mutate(
    taskId: string,
    builder: (current: TaskData) => Promise<TaskStoreIntentResult> | TaskStoreIntentResult,
    opts: TaskStoreMutationOptions = {},
  ): Promise<{ changed: boolean; task: TaskData }> {
    return await this.runWithRetry(taskId, opts, async (entry) => {
      const intents = normalizeTaskStoreIntents(await builder({ ...entry.task }));
      return applyTaskStoreIntents(entry, intents);
    });
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
          }))
        ) {
          this.cache.delete(taskId);
          continue;
        }
        throw err;
      }

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

    const storedRevision = readStoredTaskRevision(entry.parsed.frontmatter.revision);
    frontmatter.revision = storedRevision ?? 1;
    let nextText = renderTaskReadme(frontmatter, body);
    nextText = nextText.endsWith("\n") ? nextText : `${nextText}\n`;
    if (storedRevision !== null && nextText !== entry.rawText) {
      frontmatter.revision = storedRevision + 1;
      nextText = renderTaskReadme(frontmatter, body);
      nextText = nextText.endsWith("\n") ? nextText : `${nextText}\n`;
    }

    await ensureUnchangedOnDisk({
      readmePath: entry.readmePath,
      expectedMtimeMs: entry.mtimeMs,
    });

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
