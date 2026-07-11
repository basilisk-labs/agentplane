import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend/shared/types.js";

const TASK_NEW_SIMILAR_TITLE_THRESHOLD = 0.75;
const TASK_NEW_DUPLICATE_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "in",
  "is",
  "of",
  "on",
  "the",
  "to",
  "when",
  "with",
]);
function normalizeDuplicateTitleTokens(value: string): string[] {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length > 0 &&
        (token.length > 2 || /\d/.test(token)) &&
        !TASK_NEW_DUPLICATE_STOPWORDS.has(token),
    );
}

function duplicateSimilarity(left: string, right: string): number {
  const leftTokens = normalizeDuplicateTitleTokens(left);
  const rightTokens = normalizeDuplicateTitleTokens(right);
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return left.trim().toLowerCase() === right.trim().toLowerCase() ? 1 : 0;
  }
  const leftSet = new Set(leftTokens);
  const rightSet = new Set(rightTokens);
  const intersection = [...leftSet].filter((token) => rightSet.has(token)).length;
  const union = new Set([...leftSet, ...rightSet]).size;
  return union === 0 ? 0 : intersection / union;
}

function normalizeDuplicateTitleKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

type DuplicateTaskSeverity = "exact" | "similar";

function duplicateTaskSeverity(taskTitle: string, titleKey: string): DuplicateTaskSeverity {
  return titleKey.length > 0 && normalizeDuplicateTitleKey(taskTitle) === titleKey
    ? "exact"
    : "similar";
}

export function listOpenTaskDuplicates(
  tasks: TaskData[],
  title: string,
): { task: TaskData; score: number; severity: DuplicateTaskSeverity }[] {
  const titleKey = normalizeDuplicateTitleKey(title);
  return tasks
    .filter((task) => normalizeTaskStatus(task.status) !== "DONE")
    .map((task) => ({
      task,
      score: duplicateSimilarity(task.title ?? "", title),
      severity: duplicateTaskSeverity(task.title ?? "", titleKey),
    }))
    .filter(
      ({ score, severity }) => severity === "exact" || score >= TASK_NEW_SIMILAR_TITLE_THRESHOLD,
    )
    .toSorted(
      (left, right) => right.score - left.score || left.task.id.localeCompare(right.task.id),
    );
}

export function formatDuplicateTaskMessage(
  duplicates: { task: TaskData; score: number; severity: "exact" | "similar" }[],
  allowDuplicate: boolean,
  mode: "blocked" | "warning",
): string {
  const summary = duplicates
    .slice(0, 3)
    .map(
      ({ task, score }) =>
        `${task.id} (${Math.round(score * 100)}% title overlap, status=${normalizeTaskStatus(task.status)}): ${task.title}`,
    )
    .join("; ");
  const tail =
    mode === "warning"
      ? "creating a new task; use `agentplane task close-duplicate` if this turns out to be the same work"
      : allowDuplicate
        ? "creating a duplicate because --allow-duplicate was passed"
        : "rerun with --allow-duplicate only when intentional or close the extra task with `agentplane task close-duplicate`";
  const prefix = duplicates.some((match) => match.severity === "exact")
    ? "exact duplicate open task detected"
    : "similar open task detected";
  return `${prefix}: ${summary}; ${tail}.`;
}
