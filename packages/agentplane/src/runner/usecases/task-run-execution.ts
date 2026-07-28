import type {
  StateFingerprint,
  StateFingerprintPolicy,
  StateFingerprintPreconditionDiagnostic,
} from "@agentplaneorg/core/schemas";

import type { TaskRunnerActiveClaimCleanupDiagnostic } from "./task-run-active-claim-runtime.js";
import type { TaskRunnerEffectOperationSnapshot } from "./task-run-effect-journal.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
  RunnerRunState,
} from "../types.js";

export type PreparedTaskRunnerExecution = {
  bundle: RunnerContextBundle;
  invocation: RunnerInvocation;
  state: RunnerRunState;
  effect_operation?: TaskRunnerEffectOperationSnapshot;
  precondition_fingerprint?: StateFingerprint;
  precondition_policy?: StateFingerprintPolicy;
};

export type ExecutedTaskRunnerExecution = Omit<
  PreparedTaskRunnerExecution,
  "precondition_fingerprint" | "precondition_policy"
> & {
  precondition_fingerprint: StateFingerprint;
  precondition_policy: StateFingerprintPolicy;
  result: RunnerResult;
  state_before: StateFingerprint;
  state_after: StateFingerprint;
  precondition: StateFingerprintPreconditionDiagnostic;
  active_claim_cleanup?: TaskRunnerActiveClaimCleanupDiagnostic;
};
