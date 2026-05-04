import type { SupervisedProcessResult } from "../process-supervision/run.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type { RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";
export declare function assertAdapterBundle(opts: {
    adapterId: string;
    label: string;
    bundle: RunnerContextBundle;
}): void;
export declare function assertAdapterInvocation(opts: {
    adapterId: string;
    label: string;
    invocation: RunnerInvocation;
    requireBootstrap?: boolean;
    minArgvLength?: number;
}): void;
export declare function writeRunnerExecutionState(opts: {
    repository: RunnerRunRepository;
    result: RunnerResult;
    processResult: SupervisedProcessResult;
    command: string;
}): Promise<void>;
export declare function writeRunnerResultState(opts: {
    repository: RunnerRunRepository;
    result: RunnerResult;
}): Promise<void>;
export declare function appendRunnerExecutionEvent(opts: {
    repository: RunnerRunRepository;
    invocation: RunnerInvocation;
    result: RunnerResult;
    processResult: SupervisedProcessResult;
    message: string;
    outputPaths: string[];
}): Promise<void>;
export declare function appendRunnerResultEvent(opts: {
    repository: RunnerRunRepository;
    invocation: RunnerInvocation;
    result: RunnerResult;
    type: "runner_execute_error" | "runner_execute_finish";
    message: string;
    outputPaths: string[];
}): Promise<void>;
//# sourceMappingURL=base.d.ts.map