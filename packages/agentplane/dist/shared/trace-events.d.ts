import type { Logger, LoggerWriter } from "@agentplaneorg/core/logger";
export type TraceEvent = {
    component: string;
    event: string;
    details?: Record<string, unknown>;
};
export declare function isTraceEnabled(env?: NodeJS.ProcessEnv): boolean;
export declare function emitTraceEvent(event: TraceEvent, opts?: {
    env?: NodeJS.ProcessEnv;
    logger?: Logger;
    stderr?: LoggerWriter;
}): void;
//# sourceMappingURL=trace-events.d.ts.map