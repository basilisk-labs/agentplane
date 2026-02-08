import {
  extractTaskDoc as extractTaskDocCore,
  mergeTaskDoc as mergeTaskDocCore,
} from "@agentplaneorg/core";

import { isRecord } from "../../../shared/guards.js";

import { DEFAULT_DOC_UPDATED_BY, DOC_VERSION } from "./constants.js";
import type { TaskData, TaskDocMeta } from "./types.js";

type ExtractTaskDoc = (body: string) => string;
type MergeTaskDoc = (body: string, doc: string) => string;

const extractTaskDoc: ExtractTaskDoc = extractTaskDocCore;
const mergeTaskDoc: MergeTaskDoc = mergeTaskDocCore;

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

function lastCommentAuthor(comments: unknown): string | null {
  if (!Array.isArray(comments)) return null;
  const entries: unknown[] = comments;
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const entry = entries[i];
    if (!isRecord(entry)) continue;
    const author = entry.author;
    if (typeof author === "string") {
      const trimmed = author.trim();
      if (trimmed) return trimmed;
    }
  }
  return null;
}

export function resolveDocUpdatedByFromFrontmatter(
  frontmatter: Record<string, unknown>,
  updatedBy: string | undefined,
  fallback: string,
): string {
  if (updatedBy !== undefined) {
    const explicit = normalizeUpdatedBy(updatedBy);
    if (explicit) return explicit;
  }
  const author = lastCommentAuthor(frontmatter.comments);
  if (author) return author;
  const existing = normalizeUpdatedBy(frontmatter.doc_updated_by);
  if (existing) return existing;
  const owner = normalizeUpdatedBy(frontmatter.owner);
  if (owner) return owner;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue || fallback;
}

export function resolveDocUpdatedByFromTask(task: TaskData, fallback: string): string {
  const author = lastCommentAuthor(task.comments);
  if (author) return author;
  const existing = normalizeUpdatedBy(task.doc_updated_by);
  if (existing) return existing;
  const owner = normalizeUpdatedBy(task.owner);
  if (owner) return owner;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue || fallback;
}

export function ensureDocMetadata(
  task: TaskDocMeta & Partial<Pick<TaskData, "comments" | "owner">>,
  updatedBy?: string,
): void {
  task.doc_version = DOC_VERSION;
  task.doc_updated_at = nowIso();
  const explicit = normalizeUpdatedBy(updatedBy);
  if (updatedBy !== undefined) {
    task.doc_updated_by =
      explicit || resolveDocUpdatedByFromTask(task as TaskData, DEFAULT_DOC_UPDATED_BY);
    return;
  }
  task.doc_updated_by = resolveDocUpdatedByFromTask(task as TaskData, DEFAULT_DOC_UPDATED_BY);
}

export { extractTaskDoc, mergeTaskDoc };
