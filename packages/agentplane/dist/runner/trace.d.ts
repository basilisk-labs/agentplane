import { type RunnerTraceEvent, type RunnerTraceStream } from "./types.js";
export declare function createRunnerTraceEvent(opts: {
    ts?: string;
    seq: number;
    stream: RunnerTraceStream;
    adapter_id: string;
    raw: string;
}): RunnerTraceEvent;
export declare function serializeRunnerTraceEvent(event: RunnerTraceEvent): string;
//# sourceMappingURL=trace.d.ts.map