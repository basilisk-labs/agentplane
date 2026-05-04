import { CliError } from "../../../shared/errors.js";
export type CommitFailurePhase = "task_commit" | "close_commit";
export declare function asCommitFailure(err: unknown, phase: CommitFailurePhase): CliError | null;
//# sourceMappingURL=commit-diagnostics.d.ts.map