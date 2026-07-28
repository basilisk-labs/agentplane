import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import type { TaskRunnerActiveClaimCleanupDiagnostic } from "./task-run-active-claim-runtime.js";
import type { TaskRunnerEffectOperationSnapshot } from "./task-run-effect-journal.js";
import type {
  ExecutedTaskRunnerExecution,
  PreparedTaskRunnerExecution,
} from "./task-run.js";
import type {
  RunnerInvocation,
  RunnerLifecycleStatus,
  RunnerResult,
  RunnerRunState,
} from "../types.js";

export const TASK_RUNNER_LIFECYCLE_RESULT_SCHEMA =
  "agentplane.task_runner_lifecycle_result.v1" as const;

export type TaskRunnerLifecycleEffectState =
  | "not_recorded"
  | "effect_in_doubt"
  | "applied"
  | "not_applied";

export type TaskRunnerLifecycleResult = {
  schema: typeof TASK_RUNNER_LIFECYCLE_RESULT_SCHEMA;
  phase: "prepared" | "executed";
  task_id: string;
  invocation: Pick<
    RunnerInvocation,
    | "adapter_id"
    | "run_id"
    | "work_order_id"
    | "run_dir"
    | "bundle_path"
    | "bootstrap_path"
    | "result_path"
  >;
  lifecycle: {
    mode: RunnerRunState["mode"];
    status: RunnerLifecycleStatus;
    state_fingerprint: RunnerRunState["state_fingerprint"] | null;
    /**
     * These immutable references retain the effect authority, journal evidence,
     * claim generation, and any operator-supplied resolution without parsing
     * renderer output or replaying a provider operation.
     */
    effect: {
      state: TaskRunnerLifecycleEffectState;
      operation: RunnerRunState["effect_operation"] | null;
      /** Exact authority and observed-evidence identities from the durable journal. */
      authority: {
        ref: string;
        digest: string;
      } | null;
      observed_evidence: {
        code: string;
        digest: string | null;
      } | null;
      claim_generation: string | null;
      resolution: RunnerRunState["effect_resolution"] | null;
      resolution_provenance: "operator_supplied" | null;
      source_resolution: RunnerRunState["effect_resolution"] | null;
      source_resolution_provenance: "operator_supplied" | null;
    };
    work_order_authority: AgentWorkOrderV2["authority"] | null;
  };
  result: RunnerResult | null;
  active_claim_cleanup: TaskRunnerActiveClaimCleanupDiagnostic | null;
};

function effectState(state: RunnerRunState): TaskRunnerLifecycleEffectState {
  if (state.effect_resolution?.verdict === "applied") return "applied";
  if (state.effect_resolution?.verdict === "not_applied") return "not_applied";
  if (
    state.state_fingerprint?.outcome === "effect_unknown" ||
    state.state_fingerprint?.outcome === "post_state_unknown"
  ) {
    return "effect_in_doubt";
  }
  return "not_recorded";
}

function projectTaskRunnerLifecycleResult(opts: {
  phase: TaskRunnerLifecycleResult["phase"];
  task_id: string;
  invocation: RunnerInvocation;
  state: RunnerRunState;
  bundle: PreparedTaskRunnerExecution["bundle"];
  effect_operation?: TaskRunnerEffectOperationSnapshot;
  result: RunnerResult | null;
  active_claim_cleanup?: TaskRunnerActiveClaimCleanupDiagnostic;
  source_effect_resolution?: RunnerRunState["effect_resolution"] | null;
}): TaskRunnerLifecycleResult {
  const effect = effectState(opts.state);
  return {
    schema: TASK_RUNNER_LIFECYCLE_RESULT_SCHEMA,
    phase: opts.phase,
    task_id: opts.task_id,
    invocation: {
      adapter_id: opts.invocation.adapter_id,
      run_id: opts.invocation.run_id,
      work_order_id: opts.invocation.work_order_id,
      run_dir: opts.invocation.run_dir,
      bundle_path: opts.invocation.bundle_path,
      bootstrap_path: opts.invocation.bootstrap_path ?? null,
      result_path: opts.invocation.result_path,
    },
    lifecycle: {
      mode: opts.state.mode,
      status: opts.state.status,
      state_fingerprint: opts.state.state_fingerprint ?? null,
      effect: {
        state: effect,
        operation: opts.state.effect_operation ?? null,
        authority: opts.effect_operation
          ? {
              ref: opts.effect_operation.operation.authority_ref,
              digest: opts.effect_operation.operation.authority_digest,
            }
          : null,
        observed_evidence: opts.effect_operation?.journal.observed_evidence ?? null,
        claim_generation:
          opts.effect_operation?.operation.claim_generation ??
          opts.state.effect_operation?.claim_generation ??
          null,
        resolution: opts.state.effect_resolution ?? null,
        resolution_provenance: opts.state.effect_resolution ? "operator_supplied" : null,
        source_resolution: opts.source_effect_resolution ?? null,
        source_resolution_provenance: opts.source_effect_resolution ? "operator_supplied" : null,
      },
      work_order_authority: opts.bundle.work_order?.authority ?? null,
    },
    result: opts.result,
    active_claim_cleanup: opts.active_claim_cleanup ?? null,
  };
}

export function projectPreparedTaskRunnerLifecycleResult(opts: {
  task_id: string;
  execution: PreparedTaskRunnerExecution;
}): TaskRunnerLifecycleResult {
  return projectTaskRunnerLifecycleResult({
    phase: "prepared",
    task_id: opts.task_id,
    invocation: opts.execution.invocation,
    state: opts.execution.state,
    bundle: opts.execution.bundle,
    effect_operation: opts.execution.effect_operation,
    result: null,
  });
}

export function projectExecutedTaskRunnerLifecycleResult(opts: {
  task_id: string;
  execution: ExecutedTaskRunnerExecution;
  source_effect_resolution?: RunnerRunState["effect_resolution"] | null;
}): TaskRunnerLifecycleResult {
  return projectTaskRunnerLifecycleResult({
    phase: "executed",
    task_id: opts.task_id,
    invocation: opts.execution.invocation,
    state: opts.execution.state,
    bundle: opts.execution.bundle,
    effect_operation: opts.execution.effect_operation,
    result: opts.execution.result,
    active_claim_cleanup: opts.execution.active_claim_cleanup,
    source_effect_resolution: opts.source_effect_resolution,
  });
}

export function taskRunnerLifecycleExitCode(result: TaskRunnerLifecycleResult): number {
  if (result.phase === "prepared") return 0;
  return result.result?.status === "success" && !result.active_claim_cleanup ? 0 : 1;
}
