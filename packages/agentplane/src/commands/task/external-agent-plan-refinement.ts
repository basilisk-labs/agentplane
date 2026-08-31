import {
  createRepositorySnapshot,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { TaskCentricBackendAdapter } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import { runtimeFrom } from "../../adapters/task-backend/task-centric-backend-runtime.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";

type RefinementContext = {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  envelope: ExternalAgentResultEnvelope;
};

function refinementKey(workOrderId: string) {
  return `plan-refinement:${workOrderId}`;
}

export async function isExternalPlanRefinementApplied(opts: RefinementContext): Promise<boolean> {
  if (!opts.envelope.result.plan_refinement) return false;
  const raw = await opts.command.taskBackend.getTask(opts.exchange.task_id);
  if (!raw) return false;
  const receipt = runtimeFrom(raw).mutation_receipts[refinementKey(opts.exchange.work_order_id)];
  return Boolean(receipt && raw.revision === receipt.next_revision);
}

function fail(message: string): never {
  throw new CliError({ code: "E_VALIDATION", message });
}

/** A pure plan refinement changes planning state, never implementation or WorkItem completion. */
export async function applyExternalPlanRefinement(
  opts: RefinementContext & { decision: TaskRouteDecision; work_order: AgentWorkOrderV2 },
): Promise<boolean> {
  const semantic = opts.envelope.result;
  if (semantic.status !== "completed" || !semantic.plan_refinement) return false;
  const [head, status, raw] = await Promise.all([
    readDirectTaskHead(opts.exchange.checkout),
    readDirectRepositoryStatus(opts.exchange.checkout),
    opts.command.taskBackend.getTask(opts.exchange.task_id),
  ]);
  const prefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
  const sourceChanges = (lines: readonly string[]) =>
    lines.filter((line) => !line.slice(3).startsWith(prefix));
  const receipt =
    raw && runtimeFrom(raw).mutation_receipts[refinementKey(opts.exchange.work_order_id)];
  // Mixed implementation/refinement results retain the existing implementation admission path.
  if (!receipt && sourceChanges(status?.lines ?? []).length > 0) return false;
  if (!raw || !head || head !== opts.exchange.baseline.head || !status)
    fail("Plan refinement requires the unchanged observed execution baseline.");
  if (
    sourceChanges(opts.exchange.baseline.changed_paths).length > 0 ||
    sourceChanges(status.lines).length > 0
  )
    fail(
      "Pure plan refinement requires a clean source baseline; existing changes cannot be reclassified as planning.",
    );
  if (receipt) {
    if (raw.revision !== receipt.next_revision)
      fail("Recorded plan refinement is stale after additional task changes.");
    return true;
  }
  if (opts.decision.workflowStep.preconditionFingerprint.digest !== opts.exchange.state_fingerprint)
    fail("Plan refinement is stale against the issued task and repository fingerprint.");
  const aggregate = taskCentricAggregateFromExtensions(raw.extensions);
  if (!aggregate?.current_plan) fail("Plan refinement requires an existing task-centric plan.");
  const requested = opts.work_order.task.work_item_id;
  if (requested && !aggregate.work_items[requested])
    fail("Plan refinement targets an unknown WorkItem.");
  if (
    !requested &&
    Object.values(aggregate.work_items).filter((item) => item.state === "CLAIMED").length > 1
  )
    fail("A null-ID plan refinement is ambiguous because multiple WorkItems are claimed.");
  const repository = createRepositorySnapshot({
    git: { kind: "commit", sha: head, ref: null },
    dirty_paths: [],
    policy_digest: opts.work_order.planning_context?.repository_snapshot.policy_digest ?? null,
    config_digest: opts.work_order.planning_context?.repository_snapshot.config_digest ?? null,
    context_digest:
      (opts.work_order.planning_context?.digest as `sha256:${string}` | undefined) ?? null,
    task_history_cursor: `task-revision:${raw.revision ?? aggregate.revision}`,
    captured_at: new Date().toISOString(),
  });
  const adapter = new TaskCentricBackendAdapter({
    backend: opts.command.taskBackend,
    observeRepository: () => Promise.resolve(repository),
  });
  await adapter.recordPlanRefinement({
    task_id: raw.id,
    refinement: semantic.plan_refinement,
    actor_id: `external:${opts.work_order.role}`,
    at: repository.captured_at,
    idempotency_key: refinementKey(opts.work_order.work_order_id),
  });
  return true;
}
