import {
  aggregateValidation,
  createRepositorySnapshot,
  isGitObjectId,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  WorkItemScheduler,
  type SemanticWorkResult,
  type ValidationCheck,
  type ValidationEvidence,
} from "@agentplaneorg/core/tasks";
import type { AgentSemanticResult, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import { TaskCentricBackendAdapter } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { DirectTaskVerificationResult } from "./direct-task-verification.js";

export const TASK_CENTRIC_EXECUTION_CAPABILITIES = new Set(["task.verify"]);

export type TaskCentricExternalResultProjection =
  | Readonly<{ state: "legacy_task" }>
  | Readonly<{
      state: "work_item_completed" | "work_item_rework";
      work_item_id: string;
      remaining_required_work_items: number;
    }>
  | Readonly<{
      state: "replan_required";
      work_item_id: string;
      remaining_required_work_items: number;
    }>;

function evidenceForCheck(opts: {
  check: ValidationCheck;
  verification: DirectTaskVerificationResult;
  repository_digest: `sha256:${string}`;
}): ValidationEvidence {
  const observed = opts.check.command
    ? opts.verification.checks.find(
        (candidate) =>
          candidate.command === opts.check.command ||
          candidate.declared_command === opts.check.command,
      )
    : null;
  const supported = opts.check.capability === "task.verify" || observed !== undefined;
  const passed =
    supported && (observed ? observed.exit_code === 0 : opts.verification.status === "passed");
  return {
    check_id: opts.check.id,
    status: supported ? (passed ? "passed" : "failed") : "unsupported",
    observed_at: new Date().toISOString(),
    repository_snapshot_digest: opts.repository_digest,
    command_identity:
      observed?.command ?? (opts.check.capability === "task.verify" ? "task.verify" : null),
    exit_code: observed?.exit_code ?? (opts.verification.status === "passed" ? 0 : 1),
    artifact_refs: [opts.verification.artifact_path],
    detail: supported
      ? (opts.verification.reason ?? `Observed by ${observed?.command ?? "task.verify"}.`)
      : `Validation capability ${opts.check.capability} was not observed by AgentPlane.`,
  };
}

export async function recordTaskCentricExternalResult(opts: {
  command: CommandContext;
  work_order: AgentWorkOrderV2;
  semantic: AgentSemanticResult;
  verification: DirectTaskVerificationResult;
  head: string | null;
  dirty_paths: readonly string[];
}): Promise<TaskCentricExternalResultProjection> {
  const raw = await opts.command.taskBackend.getTask(opts.work_order.task.id);
  if (!raw)
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task disappeared before WorkItem result recording.",
    });
  const aggregate = taskCentricAggregateFromExtensions(raw.extensions);
  if (!aggregate?.current_plan) return { state: "legacy_task" };
  if (!isGitObjectId(opts.head ?? "")) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task-centric WorkItem result requires a valid observed Git HEAD.",
    });
  }
  const requestedId = opts.work_order.task.work_item_id ?? null;
  const selected = requestedId
    ? aggregate.current_plan.proposal.work_items.work_items.find((item) => item.id === requestedId)
    : new WorkItemScheduler(1).select({
        graph: aggregate.current_plan.proposal.work_items,
        runtime: aggregate.work_items,
        active_leases: [],
      })[0];
  if (!selected) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "The issued WorkItem is no longer present in the approved task plan.",
    });
  }
  const runtime = aggregate.work_items[selected.id];
  if (runtime?.state === "COMPLETED") {
    const remaining = aggregate.current_plan.proposal.work_items.work_items.filter(
      (item) => !item.optional && aggregate.work_items[item.id]?.state !== "COMPLETED",
    ).length;
    return {
      state: "work_item_completed",
      work_item_id: selected.id,
      remaining_required_work_items: remaining,
    };
  }
  if (!runtime || !["PLANNED", "READY", "REWORK_READY", "CLAIMED"].includes(runtime.state)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `WorkItem ${selected.id} cannot accept a semantic result from state ${runtime?.state ?? "missing"}.`,
    });
  }
  const repository = createRepositorySnapshot({
    git: { kind: "commit", sha: opts.head!, ref: null },
    dirty_paths: [...opts.dirty_paths].toSorted(),
    policy_digest: opts.work_order.planning_context?.repository_snapshot.policy_digest ?? null,
    config_digest: opts.work_order.planning_context?.repository_snapshot.config_digest ?? null,
    context_digest:
      (opts.work_order.planning_context?.digest as `sha256:${string}` | undefined) ?? null,
    task_history_cursor: `task-revision:${String(raw.revision ?? aggregate.revision)}`,
    captured_at: new Date().toISOString(),
  });
  const adapter = new TaskCentricBackendAdapter({
    backend: opts.command.taskBackend,
    observeRepository: async () => repository,
  });
  let expectedRevision = raw.revision ?? aggregate.revision;
  if (opts.semantic.plan_refinement) {
    const refinement = await adapter.recordPlanRefinement({
      task_id: aggregate.id,
      refinement: opts.semantic.plan_refinement,
      actor_id: `external:${opts.work_order.role}`,
      at: repository.captured_at,
      idempotency_key: `plan-refinement:${opts.work_order.work_order_id}`,
    });
    const refinedRaw = await opts.command.taskBackend.getTask(aggregate.id);
    expectedRevision = refinedRaw?.revision ?? refinement.receipt.next_revision;
    if (refinement.action === "replan_required") {
      return {
        state: "replan_required",
        work_item_id: selected.id,
        remaining_required_work_items: aggregate.current_plan.proposal.work_items.work_items.filter(
          (item) => !item.optional && aggregate.work_items[item.id]?.state !== "COMPLETED",
        ).length,
      };
    }
  }
  const evidence = selected.validation.checks.map((check) =>
    evidenceForCheck({
      check,
      verification: opts.verification,
      repository_digest: repository.digest,
    }),
  );
  const result: SemanticWorkResult = {
    schema_version: 1,
    kind: runtime.state === "REWORK_READY" ? "repair" : "execute",
    task_id: aggregate.id,
    plan_revision: aggregate.current_plan.revision,
    plan_digest: aggregate.current_plan.digest,
    work_item_id: selected.id,
    context_digest:
      (opts.work_order.planning_context?.digest as `sha256:${string}` | undefined) ??
      (opts.work_order.state_fingerprint.digest as `sha256:${string}`),
    status: opts.semantic.status,
    summary: opts.semantic.summary,
    claims: opts.semantic.findings,
    questions: opts.semantic.uncertainty,
    artifacts: selected.expected_outputs,
  };
  const outputs = selected.expected_outputs.map((id) => ({
    schema_version: 1 as const,
    id,
    kind: "semantic_output",
    schema: "agentplane.semantic-output.v1",
    digest: taskCentricDigest({ id, result }),
    producer: {
      task_id: aggregate.id,
      plan_revision: aggregate.current_plan!.revision,
      work_item_id: selected.id,
      attempt: runtime.attempt + 1,
    },
    repository_snapshot_digest: repository.digest,
    provenance: [result.context_digest, opts.verification.artifact_path],
  }));
  await adapter.recordWorkItemResult({
    task_id: aggregate.id,
    expected_revision: expectedRevision,
    work_item_id: selected.id,
    semantic_result: result,
    outputs,
    validation: evidence,
    idempotency_key: `external-result:${opts.work_order.work_order_id}`,
  });
  const validation = aggregateValidation(selected.validation, evidence);
  const next = await adapter.readTask(aggregate.id);
  const remaining =
    next?.current_plan?.proposal.work_items.work_items.filter(
      (item) => !item.optional && next.work_items[item.id]?.state !== "COMPLETED",
    ).length ?? 0;
  return {
    state: validation.status === "passed" ? "work_item_completed" : "work_item_rework",
    work_item_id: selected.id,
    remaining_required_work_items: remaining,
  };
}
