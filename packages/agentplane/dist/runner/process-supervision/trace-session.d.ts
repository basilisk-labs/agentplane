export type TraceSession = ReturnType<typeof createTraceSession>;
export declare function createTraceSession(opts: {
    adapter_id: string;
    trace_path: string;
    stderr_path: string;
    trace_mode: "off" | "none" | "raw";
    capture_stderr: boolean;
    max_tail_bytes: number;
    redact_patterns: string[];
    on_error: (err: unknown) => void;
    on_activity: () => void;
}): {
    onStdoutData(chunk: Buffer | string): void;
    onStderrData(chunk: Buffer | string): void;
    flushPendingLines(): void;
    flushWriters(): Promise<void>;
    flushWritersSettled(): Promise<void>;
    getResult(): {
        stdout_tail: string;
        stderr_tail: string;
        stdout_bytes: number;
        stderr_bytes: number;
    };
};
//# sourceMappingURL=trace-session.d.ts.map