import {
  RUNNER_TRACE_SCHEMA_VERSION,
  type RunnerTraceEvent,
  type RunnerTraceStream,
} from "./types.js";

function normalizeRawLine(raw: string): string {
  const normalized = raw.replaceAll("\r\n", "\n");
  return normalized.endsWith("\n") ? normalized.slice(0, -1) : normalized;
}

function parseTracePayload(raw: string): Record<string, unknown> | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // leave as plain text
  }
  return undefined;
}

export function createRunnerTraceEvent(opts: {
  ts?: string;
  seq: number;
  stream: RunnerTraceStream;
  adapter_id: string;
  raw: string;
}): RunnerTraceEvent {
  const normalizedRaw = normalizeRawLine(opts.raw);
  const parsed = parseTracePayload(normalizedRaw);
  return {
    schema_version: RUNNER_TRACE_SCHEMA_VERSION,
    ts: opts.ts ?? new Date().toISOString(),
    seq: opts.seq,
    stream: opts.stream,
    adapter_id: opts.adapter_id,
    kind: parsed ? "json_event" : "text",
    raw: normalizedRaw,
    ...(parsed ? { parsed } : {}),
  };
}

export function serializeRunnerTraceEvent(event: RunnerTraceEvent): string {
  return `${JSON.stringify(event)}\n`;
}
