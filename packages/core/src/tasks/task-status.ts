export const TASK_STATUS_VALUES = ["TODO", "DOING", "DONE", "BLOCKED"] as const;
export const TASK_STATUS_LABEL = TASK_STATUS_VALUES.join("|");

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

export type TaskStatusMigrationReceipt = Readonly<{
  schema_version: 1;
  input: string;
  output: TaskStatus;
  changed: boolean;
  reason_code: "already_canonical" | "case_or_whitespace_normalized";
}>;

export class InvalidTaskStatusError extends Error {
  readonly code = "INVALID_TASK_STATUS";
  readonly value: unknown;

  constructor(value: unknown) {
    super(
      `Invalid task status ${JSON.stringify(value)}; explicit migration or quarantine is required.`,
    );
    this.name = "InvalidTaskStatusError";
    this.value = value;
  }
}

const TASK_STATUS_SET = new Set<string>(TASK_STATUS_VALUES);

export function parseTaskStatus(value: unknown): TaskStatus | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  return TASK_STATUS_SET.has(normalized) ? (normalized as TaskStatus) : null;
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return parseTaskStatus(value) !== null;
}

export function parseTaskStatusStrict(value: unknown): TaskStatus {
  const parsed = parseTaskStatus(value);
  if (!parsed) throw new InvalidTaskStatusError(value);
  return parsed;
}

export function migrateLegacyTaskStatus(value: unknown): TaskStatusMigrationReceipt {
  const output = parseTaskStatusStrict(value);
  const input = String(value);
  const changed = input !== output;
  return Object.freeze({
    schema_version: 1,
    input,
    output,
    changed,
    reason_code: changed ? "case_or_whitespace_normalized" : "already_canonical",
  });
}

export function normalizeTaskStatus(value: unknown, fallback: TaskStatus = "TODO"): TaskStatus {
  return parseTaskStatus(value) ?? fallback;
}
