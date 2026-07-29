import { readFile } from "node:fs/promises";

const DUPLICATE_CONTEXT_MINIMUM_BYTES = 32;

export type DirectTaskSupervisorMetrics = {
  provider_episodes: number;
  executor_lifecycle_event_delta: number | null;
  declared_checks: number;
  orchestration: {
    lifecycle_calls: number;
    tool_calls: number;
    duplicate_executor_context_bytes: number | null;
  };
};

export function directTaskSupervisorMetrics(
  opts: {
    provider_episodes?: number;
    executor_lifecycle_event_delta?: number | null;
    declared_checks?: number;
    lifecycle_calls?: number;
    tool_calls?: number;
    duplicate_executor_context_bytes?: number | null;
  } = {},
): DirectTaskSupervisorMetrics {
  return {
    provider_episodes: opts.provider_episodes ?? 0,
    executor_lifecycle_event_delta: opts.executor_lifecycle_event_delta ?? null,
    declared_checks: opts.declared_checks ?? 0,
    orchestration: {
      lifecycle_calls: opts.lifecycle_calls ?? 0,
      tool_calls: opts.tool_calls ?? 0,
      duplicate_executor_context_bytes: opts.duplicate_executor_context_bytes ?? null,
    },
  };
}

function collectRepeatedStrings(
  value: unknown,
  counts: Map<string, { bytes: number; count: number }>,
): void {
  if (typeof value === "string") {
    const normalized = value.replaceAll("\r\n", "\n");
    const bytes = Buffer.byteLength(normalized, "utf8");
    if (bytes >= DUPLICATE_CONTEXT_MINIMUM_BYTES) {
      const current = counts.get(normalized) ?? { bytes, count: 0 };
      current.count += 1;
      counts.set(normalized, current);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectRepeatedStrings(item, counts);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectRepeatedStrings(item, counts);
  }
}

/** Uses the same repeated-string definition as the frozen RF-04 baseline. */
export async function measureDuplicateExecutorContextBytes(
  bundlePath: string,
): Promise<number | null> {
  try {
    const bundle = JSON.parse(await readFile(bundlePath, "utf8")) as unknown;
    const counts = new Map<string, { bytes: number; count: number }>();
    collectRepeatedStrings(bundle, counts);
    return [...counts.values()].reduce(
      (total, entry) => total + (entry.count > 1 ? entry.bytes * (entry.count - 1) : 0),
      0,
    );
  } catch {
    return null;
  }
}
