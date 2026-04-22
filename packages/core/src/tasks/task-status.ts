export const TASK_STATUS_VALUES = ["TODO", "DOING", "DONE", "BLOCKED"] as const;
export const TASK_STATUS_LABEL = TASK_STATUS_VALUES.join("|");

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

const TASK_STATUS_SET = new Set<string>(TASK_STATUS_VALUES);

export function parseTaskStatus(value: unknown): TaskStatus | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  return TASK_STATUS_SET.has(normalized) ? (normalized as TaskStatus) : null;
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return parseTaskStatus(value) !== null;
}

export function normalizeTaskStatus(value: unknown, fallback: TaskStatus = "TODO"): TaskStatus {
  return parseTaskStatus(value) ?? fallback;
}
