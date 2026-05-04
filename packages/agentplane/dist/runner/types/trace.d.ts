import type { RUNNER_TRACE_SCHEMA_VERSION } from "./constants.js";
export type RunnerTraceStream = "stdout" | "stderr" | "system";
export type RunnerTraceKind = "json_event" | "text";
export type RunnerTraceEvent = {
    schema_version: typeof RUNNER_TRACE_SCHEMA_VERSION;
    ts: string;
    seq: number;
    stream: RunnerTraceStream;
    adapter_id: string;
    kind: RunnerTraceKind;
    raw: string;
    parsed?: Record<string, unknown>;
};
//# sourceMappingURL=trace.d.ts.map