import type { CommandCtx } from "../../cli/spec/spec.js";
import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { executeProductionBranchEpisode } from "./branch-task-supervisor-episodes.js";
import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";
import type { JournalProjection } from "./direct-task-supervisor-result.js";
import { journalProjection } from "./direct-task-supervisor-result.js";

const BRANCH_TASK_SUPERVISION_SCHEMA = "agentplane.branch_pr_task_supervision.v1" as const;
const MAX_BRANCH_SUPERVISOR_STEPS = 32;

export type BranchTaskSupervisorStopCode =
  | "approval_required"
  | "human_input_required"
  | "wait_required"
  | "terminal_attention"
  | "step_budget_exhausted"
  | "unsupported_agent_episode"
  | "operation_failed"
  | "route_refresh_failed"
  | "supervisor_stopped"
  | "executor_adapter_crash"
  | "runner_failed"
  | "runner_receipt_unobserved"
  | "executor_result_missing"
  | "executor_blocked"
  | "missing_knowledge"
  | "executor_semantic_failed"
  | "executor_lifecycle_mutation"
  | "implementation_scope_violation"
  | "implementation_commit_missing"
  | "verification_failed"
  | "evaluator_rework"
  | "evaluator_human_review"
  | "evaluator_blocked"
  | "evaluator_adapter_crash";

type BranchTaskSupervisorStop = {
  code: BranchTaskSupervisorStopCode;
  reason: string;
  route_step_id: string;
  operation_id: string | null;
};

type BranchWorkflowOperationReceipt = {
  schema: "agentplane.branch_pr_operation_receipt.v1";
  sequence: number;
  operation_id: WorkflowOperation["id"];
  idempotency_key: string;
  before_fingerprint: string;
  after_fingerprint: string;
  checkout: string | null;
  branch: string | null;
  task_head_sha: string | null;
  base_head_sha: string | null;
  provider: {
    source: string | null;
    state: string | null;
    pr_number: number | null;
    head_sha: string | null;
    merge_commit: string | null;
    hosted_checks_state: string | null;
    queue_status: string | null;
    close_tail_state: string | null;
  };
};

export type BranchExecutorEvidence = {
  run_id: string;
  receipt: NonNullable<NonNullable<TaskRunnerLifecycleResult["result"]>["execution_receipt"]>;
  semantic_status: "completed";
  implementation_commit: string;
};

export type BranchEvaluatorEvidence = {
  evaluator_id: string;
  verdict: "pass" | "rework" | "blocked" | "human_review";
  result_path: string;
  report_path: string;
  receipt_path: string;
};

export type BranchTaskSupervisorResult = {
  schema: typeof BRANCH_TASK_SUPERVISION_SCHEMA;
  task_id: string;
  workflow_mode: "branch_pr";
  status: "finalized" | "stopped";
  phase: string;
  route: { step_id: string; code: string };
  stop: BranchTaskSupervisorStop | null;
  executor: BranchExecutorEvidence | null;
  evaluator: BranchEvaluatorEvidence | null;
  journal: JournalProjection | null;
  operation_receipts: readonly BranchWorkflowOperationReceipt[];
  metrics: {
    lifecycle_calls: number;
    provider_episodes: number;
    executor_lifecycle_event_delta: number | null;
  };
};

export type BranchEpisodeOutcome =
  | {
      status: "completed";
      decision: TaskRouteDecision;
      executor?: BranchExecutorEvidence;
      evaluator?: BranchEvaluatorEvidence;
      journal: JournalProjection | null;
      provider_episodes: number;
      lifecycle_calls: number;
      executor_lifecycle_event_delta?: number | null;
    }
  | {
      status: "stopped";
      decision: TaskRouteDecision;
      stop: BranchTaskSupervisorStop;
      executor?: BranchExecutorEvidence;
      evaluator?: BranchEvaluatorEvidence;
      journal: JournalProjection | null;
      provider_episodes: number;
      lifecycle_calls: number;
      executor_lifecycle_event_delta?: number | null;
    };

export type BranchTaskSupervisorPorts = {
  git_root: string;
  task_id: string;
  decide: () => Promise<TaskRouteDecision>;
  execute_operation: (opts: {
    decision: TaskRouteDecision;
    operation: WorkflowOperation;
  }) => Promise<WorkflowSupervisorOperationResult>;
  execute_episode: (opts: {
    decision: TaskRouteDecision;
    decide: () => Promise<TaskRouteDecision>;
  }) => Promise<BranchEpisodeOutcome>;
};

export type BranchTaskSupervisorOptions = {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  sandbox_override?: string;
  danger_authority?: {
    danger_full_access_authorized: true;
    provenance: "explicit_operator";
    source: string;
  } | null;
};

type Progress = {
  receipts: BranchWorkflowOperationReceipt[];
  executor: BranchExecutorEvidence | null;
  evaluator: BranchEvaluatorEvidence | null;
  journal: JournalProjection | null;
  lifecycle_calls: number;
  provider_episodes: number;
  executor_lifecycle_event_delta: number | null;
};

function routeCode(decision: TaskRouteDecision): string {
  return decision.workflowStep.compatibility.code;
}

function operationId(decision: TaskRouteDecision): WorkflowOperation["id"] | null {
  return decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation.id : null;
}

function stopResult(
  decision: TaskRouteDecision,
  stop: BranchTaskSupervisorStop,
  progress: Progress,
): BranchTaskSupervisorResult {
  return {
    schema: BRANCH_TASK_SUPERVISION_SCHEMA,
    task_id: decision.task.id,
    workflow_mode: "branch_pr",
    status: "stopped",
    phase: decision.workflowStep.phase,
    route: { step_id: decision.workflowStep.id, code: routeCode(decision) },
    stop,
    executor: progress.executor,
    evaluator: progress.evaluator,
    journal: progress.journal,
    operation_receipts: progress.receipts,
    metrics: {
      lifecycle_calls: progress.lifecycle_calls,
      provider_episodes: progress.provider_episodes,
      executor_lifecycle_event_delta: progress.executor_lifecycle_event_delta,
    },
  };
}

function routeStop(decision: TaskRouteDecision): BranchTaskSupervisorStop {
  const step = decision.workflowStep;
  const code: BranchTaskSupervisorStopCode =
    step.kind === "approval"
      ? "approval_required"
      : step.kind === "wait"
        ? "wait_required"
        : step.kind === "human_input"
          ? "human_input_required"
          : "terminal_attention";
  return {
    code,
    reason: step.summary,
    route_step_id: step.id,
    operation_id: operationId(decision),
  };
}

function hostedChecksState(decision: TaskRouteDecision): string | null {
  const hosted = decision.prFlow?.hostedChecks;
  if (!hosted) return null;
  if ("state" in hosted && typeof hosted.state === "string") return hosted.state;
  if ("status" in hosted && typeof hosted.status === "string") return hosted.status;
  return null;
}

function operationReceipt(opts: {
  sequence: number;
  operation: WorkflowOperation;
  before: TaskRouteDecision;
  after: TaskRouteDecision;
}): BranchWorkflowOperationReceipt {
  const pr = opts.after.prFlow?.pr;
  return {
    schema: "agentplane.branch_pr_operation_receipt.v1",
    sequence: opts.sequence,
    operation_id: opts.operation.id,
    idempotency_key: opts.operation.idempotencyKey,
    before_fingerprint: opts.before.workflowStep.preconditionFingerprint.digest,
    after_fingerprint: opts.after.workflowStep.preconditionFingerprint.digest,
    checkout: opts.before.executionPacket.mustRunFrom,
    branch: opts.after.prFlow?.branch.name ?? opts.after.workspace.prBranch,
    task_head_sha: opts.after.prFlow?.branch.headSha ?? null,
    base_head_sha: opts.after.workspace.headSha,
    provider: {
      source: pr && "source" in pr ? pr.source : null,
      state: pr?.state ?? null,
      pr_number: pr && "prNumber" in pr ? pr.prNumber : null,
      head_sha: pr && "headSha" in pr ? pr.headSha : null,
      merge_commit: pr && "mergeCommit" in pr ? pr.mergeCommit : null,
      hosted_checks_state: hostedChecksState(opts.after),
      queue_status:
        opts.after.prFlow?.queue.present === true ? opts.after.prFlow.queue.status : null,
      close_tail_state: opts.after.prFlow?.closeTail.state ?? null,
    },
  };
}

function finalizedResult(
  decision: TaskRouteDecision,
  progress: Progress,
): BranchTaskSupervisorResult {
  return {
    schema: BRANCH_TASK_SUPERVISION_SCHEMA,
    task_id: decision.task.id,
    workflow_mode: "branch_pr",
    status: "finalized",
    phase: decision.workflowStep.phase,
    route: { step_id: decision.workflowStep.id, code: routeCode(decision) },
    stop: null,
    executor: progress.executor,
    evaluator: progress.evaluator,
    journal: progress.journal,
    operation_receipts: progress.receipts,
    metrics: {
      lifecycle_calls: progress.lifecycle_calls,
      provider_episodes: progress.provider_episodes,
      executor_lifecycle_event_delta: progress.executor_lifecycle_event_delta,
    },
  };
}

async function executeOperation(opts: {
  ports: BranchTaskSupervisorPorts;
  current: TaskRouteDecision;
  progress: Progress;
}): Promise<{ decision: TaskRouteDecision } | { result: BranchTaskSupervisorResult }> {
  const step = opts.current.workflowStep;
  if (step.kind !== "cli_operation") {
    throw new Error("executeOperation requires a cli_operation route.");
  }
  const before = opts.current;
  let persisted: Awaited<ReturnType<typeof supervisePersistedWorkflowEpisode>>;
  try {
    persisted = await supervisePersistedWorkflowEpisode({
      decision: before,
      git_root: opts.ports.git_root,
      task_revision: null,
      execute: async ({ operation }) =>
        await opts.ports.execute_operation({ decision: before, operation }),
      refresh: opts.ports.decide,
    });
  } catch (error) {
    return {
      result: stopResult(
        before,
        {
          code: "operation_failed",
          reason:
            "The typed branch_pr operation failed after its durable intent was recorded " +
            `(${error instanceof Error ? error.name : "unknown_error"}).`,
          route_step_id: step.id,
          operation_id: step.operation.id,
        },
        opts.progress,
      ),
    };
  }
  opts.progress.journal = journalProjection(persisted.journal, persisted.journal_path);
  if (
    persisted.execution.executable &&
    (persisted.execution.result?.status === "failed" || persisted.execution.stop_reason !== null)
  ) {
    return {
      result: stopResult(
        before,
        {
          code: "operation_failed",
          reason:
            persisted.execution.result?.detail ??
            persisted.execution.stop_reason ??
            "The typed branch operation failed.",
          route_step_id: step.id,
          operation_id: step.operation.id,
        },
        opts.progress,
      ),
    };
  }
  if (!persisted.execution.executable || !persisted.execution.refreshed_decision) {
    const code = persisted.execution.executable ? "route_refresh_failed" : "supervisor_stopped";
    return {
      result: stopResult(
        before,
        {
          code,
          reason:
            persisted.execution.stop_reason ??
            (code === "route_refresh_failed"
              ? "The branch supervisor could not refresh route truth after the operation."
              : "The shared workflow supervisor rejected the branch operation."),
          route_step_id: step.id,
          operation_id: step.operation.id,
        },
        opts.progress,
      ),
    };
  }
  const after = persisted.execution.refreshed_decision;
  opts.progress.lifecycle_calls += 1;
  opts.progress.receipts.push(
    operationReceipt({
      sequence: opts.progress.receipts.length + 1,
      operation: step.operation,
      before,
      after,
    }),
  );
  return { decision: after };
}

/**
 * Bounded decide/execute/refresh loop for branch_pr. Semantic work remains in
 * role-specific episode ports; mechanical operations use durable idempotency.
 */
export async function superviseBranchTaskRunWithPorts(
  ports: BranchTaskSupervisorPorts,
): Promise<BranchTaskSupervisorResult> {
  let current = await ports.decide();
  if (current.workflowMode !== "branch_pr") {
    throw new CliError({
      code: "E_USAGE",
      message: "Branch task supervision requires workflow.mode=branch_pr.",
    });
  }
  const progress: Progress = {
    receipts: [],
    executor: null,
    evaluator: null,
    journal: null,
    lifecycle_calls: 0,
    provider_episodes: 0,
    executor_lifecycle_event_delta: null,
  };

  for (let stepCount = 0; stepCount < MAX_BRANCH_SUPERVISOR_STEPS; stepCount += 1) {
    const step = current.workflowStep;
    if (step.kind === "cli_operation") {
      const outcome = await executeOperation({ ports, current, progress });
      if ("result" in outcome) return outcome.result;
      current = outcome.decision;
      continue;
    }
    if (step.kind === "agent_episode") {
      const outcome = await ports.execute_episode({ decision: current, decide: ports.decide });
      current = outcome.decision;
      progress.journal = outcome.journal ?? progress.journal;
      progress.lifecycle_calls += outcome.lifecycle_calls;
      progress.provider_episodes += outcome.provider_episodes;
      progress.executor = outcome.executor ?? progress.executor;
      progress.evaluator = outcome.evaluator ?? progress.evaluator;
      progress.executor_lifecycle_event_delta =
        outcome.executor_lifecycle_event_delta ?? progress.executor_lifecycle_event_delta;
      if (outcome.status === "stopped") {
        return stopResult(current, outcome.stop, progress);
      }
      continue;
    }
    if (
      step.kind === "terminal" &&
      (step.outcome.type === "done" || step.outcome.type === "superseded")
    ) {
      return finalizedResult(current, progress);
    }
    return stopResult(current, routeStop(current), progress);
  }

  return stopResult(
    current,
    {
      code: "step_budget_exhausted",
      reason: `Branch supervisor exceeded ${MAX_BRANCH_SUPERVISOR_STEPS} route steps.`,
      route_step_id: current.workflowStep.id,
      operation_id: operationId(current),
    },
    progress,
  );
}

export async function superviseBranchTaskRun(
  input: BranchTaskSupervisorOptions,
): Promise<BranchTaskSupervisorResult> {
  const routeCwd = input.ctx.cwd;
  const decide = async () => {
    const routeCommand = await loadCommandContext({ cwd: routeCwd, rootOverride: null });
    return await buildTaskRouteDecision({
      ctx: routeCommand,
      cwd: routeCwd,
      rootOverride: null,
      taskId: input.task_id,
      includeRemote: true,
    });
  };

  return await superviseBranchTaskRunWithPorts({
    git_root: input.command.resolvedProject.gitRoot,
    task_id: input.task_id,
    decide,
    execute_operation: executeBranchWorkflowOperation,
    execute_episode: async ({ decision, decide: refresh }) =>
      await executeProductionBranchEpisode({ input, decision, decide: refresh }),
  });
}
