import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  docChanged,
  mergeTaskDoc,
  normalizeTaskDocVersion,
  parseTaskReadme,
  renderTaskReadme,
  taskReadmeDocBody,
} from "@agentplaneorg/core/tasks";

import { taskRecordToData, type TaskData } from "../../../backends/task-backend.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { writeTextIfChanged } from "../../../shared/write-if-changed.js";
import { resolveDocUpdatedBy, taskDataToFrontmatter } from "../task-backend.js";
import type { CachedTask, TaskStoreContext } from "./types.js";

function taskReadmePath(ctx: TaskStoreContext, taskId: string): string {
  return path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir, taskId, "README.md");
}

export function normalizeTaskRevision(value: unknown, fallback = 1): number {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : fallback;
}

export function readStoredTaskRevision(value: unknown): number | null {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : null;
}

export function isConcurrentReadmeChangeError(err: unknown): err is CliError {
  return (
    err instanceof CliError &&
    err.code === "E_IO" &&
    err.message.startsWith("Task README changed concurrently:")
  );
}

export function throwTaskRevisionConflict(opts: {
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

export async function readTaskReadmeCached(opts: {
  ctx: TaskStoreContext;
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

export async function ensureUnchangedOnDisk(opts: {
  readmePath: string;
  expectedMtimeMs: number;
  expectedRawText: string;
}): Promise<void> {
  const st = await stat(opts.readmePath);
  const currentText =
    st.mtimeMs === opts.expectedMtimeMs ? await readFile(opts.readmePath, "utf8") : null;
  if (st.mtimeMs !== opts.expectedMtimeMs || currentText !== opts.expectedRawText) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Task README changed concurrently: ${opts.readmePath}`,
    });
  }
}

export async function didReadmeChangeOnDisk(opts: {
  readmePath: string;
  expectedMtimeMs: number;
  expectedRawText?: string;
}): Promise<boolean> {
  try {
    const st = await stat(opts.readmePath);
    if (st.mtimeMs !== opts.expectedMtimeMs) return true;
    if (opts.expectedRawText === undefined) return false;
    return (await readFile(opts.readmePath, "utf8")) !== opts.expectedRawText;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return true;
    throw err;
  }
}

export async function writeTaskReadme(opts: {
  entry: CachedTask;
  next: TaskData;
}): Promise<boolean> {
  const { entry, next } = opts;
  const frontmatter = { ...entry.parsed.frontmatter, ...taskDataToFrontmatter(next) };

  let body = entry.parsed.body ?? "";
  const existingDoc = taskReadmeDocBody(entry.parsed.frontmatter, body);
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
  if (typeof frontmatter.doc_updated_at !== "string" || frontmatter.doc_updated_at.trim() === "") {
    frontmatter.doc_updated_at = now;
  }
  if (typeof frontmatter.doc_updated_by !== "string" || frontmatter.doc_updated_by.trim() === "") {
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
    expectedRawText: entry.rawText,
  });

  return await writeTextIfChanged(entry.readmePath, nextText);
}
