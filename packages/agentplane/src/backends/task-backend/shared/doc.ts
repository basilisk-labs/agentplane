import {
  extractTaskDoc as extractTaskDocCore,
  mergeTaskDoc as mergeTaskDocCore,
  normalizeTaskDocVersion as normalizeTaskDocVersionCore,
  resolveTaskDocUpdatedBy,
} from "@agentplaneorg/core/tasks";

import { isRecord } from "../../../shared/guards.js";

import { DEFAULT_DOC_UPDATED_BY, DOC_VERSION } from "./constants.js";
import type { TaskData } from "./types.js";

type ExtractTaskDoc = (body: string) => string;
type MergeTaskDoc = (body: string, doc: string) => string;
type NormalizeTaskDocVersion = (value: unknown, fallback?: 2 | 3) => 2 | 3;

const extractTaskDoc: ExtractTaskDoc = extractTaskDocCore;
const mergeTaskDoc: MergeTaskDoc = mergeTaskDocCore;
const normalizeTaskDocVersion: NormalizeTaskDocVersion = normalizeTaskDocVersionCore;

export function nowIso(): string {
  return new Date().toISOString();
}

function normalizeUpdatedBy(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === DEFAULT_DOC_UPDATED_BY.toLowerCase()) return "";
  return trimmed;
}

function toTaskDocMutationComments(comments: unknown): { author?: string }[] | null {
  if (!Array.isArray(comments)) return null;
  const entries: unknown[] = comments;
  return entries.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    return [{ author: typeof entry.author === "string" ? entry.author : undefined }];
  });
}

export function resolveDocUpdatedByFromFrontmatter(
  frontmatter: Record<string, unknown>,
  updatedBy: string | undefined,
  fallback: string,
): string {
  const explicit = updatedBy === undefined ? undefined : normalizeUpdatedBy(updatedBy);
  const resolved = resolveTaskDocUpdatedBy(
    {
      comments: toTaskDocMutationComments(frontmatter.comments),
      doc_updated_by: frontmatter.doc_updated_by,
      owner: frontmatter.owner,
    },
    explicit ?? null,
  );
  if (resolved.toLowerCase() !== DEFAULT_DOC_UPDATED_BY.toLowerCase()) return resolved;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue.length > 0 ? fallbackValue : fallback;
}

export function resolveDocUpdatedByFromTask(task: TaskData, fallback: string): string {
  const resolved = resolveTaskDocUpdatedBy(
    {
      comments: toTaskDocMutationComments(task.comments),
      doc_updated_by: task.doc_updated_by,
      owner: task.owner,
    },
    null,
  );
  if (resolved.toLowerCase() !== DEFAULT_DOC_UPDATED_BY.toLowerCase()) return resolved;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue.length > 0 ? fallbackValue : fallback;
}

export function normalizeDocVersion(value: unknown, fallback: 2 | 3 = DOC_VERSION): 2 | 3 {
  return normalizeTaskDocVersion(value, fallback);
}

export { extractTaskDoc, mergeTaskDoc };
