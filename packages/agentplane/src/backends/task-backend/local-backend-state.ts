import type { TaskDocMutationState } from "@agentplaneorg/core/tasks";

import { isRecord } from "../../shared/guards.js";

import { BackendError, extractTaskDoc, type TaskData } from "./shared.js";

export type LocalBackendContext = {
  root: string;
  updatedBy: string;
  setLastListWarnings?: (warnings: string[]) => void;
};

export function storedRevisionFromFrontmatter(
  frontmatter: Record<string, unknown>,
  fallback: number,
): number {
  return Number.isInteger(frontmatter.revision) &&
    typeof frontmatter.revision === "number" &&
    frontmatter.revision > 0
    ? frontmatter.revision
    : fallback;
}

export function assertExpectedRevision(opts: {
  taskId: string;
  expectedRevision?: number;
  currentRevision: number;
}): void {
  if (opts.expectedRevision === undefined) return;
  const expected = Math.trunc(opts.expectedRevision);
  if (expected <= 0 || expected === opts.currentRevision) return;
  throw new BackendError(
    `Task revision changed concurrently: ${opts.taskId} ` +
      `(expected revision ${expected}, current revision ${opts.currentRevision})`,
    "E_BACKEND",
  );
}

function toTaskDocMutationComments(comments: unknown): TaskDocMutationState["comments"] {
  if (!Array.isArray(comments)) return null;
  const normalized = comments.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    return [
      {
        author: typeof entry.author === "string" ? entry.author : undefined,
      },
    ];
  });
  return normalized.length > 0 ? normalized : null;
}

export function taskDocStateFromFrontmatter(
  frontmatter: Record<string, unknown>,
  body: string,
): TaskDocMutationState {
  return {
    doc: extractTaskDoc(body),
    doc_version: frontmatter.doc_version,
    doc_updated_by: frontmatter.doc_updated_by,
    owner: frontmatter.owner,
    comments: toTaskDocMutationComments(frontmatter.comments),
  };
}

export function taskDocStateFromTask(
  task: Pick<TaskData, "comments" | "doc_updated_by" | "doc_version" | "owner">,
  doc: string,
): TaskDocMutationState {
  return {
    doc,
    doc_version: task.doc_version,
    doc_updated_by: task.doc_updated_by,
    owner: task.owner,
    comments: toTaskDocMutationComments(task.comments),
  };
}
