export const TASK_EXECUTION_CONTEXT_EXTENSION_KEY = "task_execution_context";

export type TaskExecutionBaseIdentity = Readonly<{
  schema_version: 1;
  base_ref: string;
  base_sha: string;
  source: "creation_checkout" | "explicit" | "legacy";
}>;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function createTaskExecutionBaseIdentity(opts: {
  base_ref: string;
  base_sha: string;
  source: TaskExecutionBaseIdentity["source"];
}): TaskExecutionBaseIdentity {
  const base_ref = opts.base_ref.trim();
  const base_sha = opts.base_sha.trim();
  if (!base_ref) throw new Error("Task execution base_ref must be non-empty.");
  if (!/^[0-9a-f]{40}$/iu.test(base_sha)) {
    throw new Error("Task execution base_sha must be a full Git commit id.");
  }
  return Object.freeze({ schema_version: 1, base_ref, base_sha, source: opts.source });
}

export function taskExecutionBaseFromExtensions(
  extensions: Record<string, unknown> | undefined,
): TaskExecutionBaseIdentity | null {
  const stored = record(extensions?.[TASK_EXECUTION_CONTEXT_EXTENSION_KEY]);
  if (!stored) return null;
  const base_ref = typeof stored.base_ref === "string" ? stored.base_ref.trim() : "";
  const base_sha = typeof stored.base_sha === "string" ? stored.base_sha.trim() : "";
  if (!base_ref || !/^[0-9a-f]{40}$/iu.test(base_sha)) return null;
  const source =
    stored.source === "creation_checkout" || stored.source === "explicit"
      ? stored.source
      : "legacy";
  return Object.freeze({ schema_version: 1, base_ref, base_sha, source });
}
