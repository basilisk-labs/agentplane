import type { RunnerInvocation, RunnerProcessSignal, RunnerTimeoutReason } from "../types.js";
export type SupervisedProcessResult = {
    exit_code: number | null;
    exit_signal: RunnerProcessSignal | null;
    stdout_tail: string;
    stderr_tail: string;
    stdout_bytes: number;
    stderr_bytes: number;
    pid: number | null;
    started_at: string;
    ended_at: string;
    cancel_requested_at: string | null;
    cancel_signal: RunnerProcessSignal | null;
    timeout_reason: RunnerTimeoutReason | null;
    timeout_requested_at: string | null;
    terminate_sent_at: string | null;
    kill_sent_at: string | null;
    force_killed: boolean;
    heartbeat_at: string;
    trace_artifact_path: string | null;
    trace_archive_path: string | null;
    stderr_artifact_path: string | null;
    stderr_archive_path: string | null;
};
export declare function runSupervisedProcess(opts: {
    invocation: RunnerInvocation;
    stdin_text: string;
    start_message: string;
}): Promise<SupervisedProcessResult>;
//# sourceMappingURL=run.d.ts.map