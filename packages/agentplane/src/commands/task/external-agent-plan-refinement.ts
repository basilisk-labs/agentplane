import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";
import {
  createRepositorySnapshot,
  taskCentricDigest,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import {
  recordTaskCentricPlanRefinement,
  taskCentricMutationReceipt,
} from "./task-centric-external-result.js";

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
  const receipt = taskCentricMutationReceipt(raw, refinementKey(opts.exchange.work_order_id));
  const aggregate = taskCentricAggregateFromExtensions(raw.extensions);
  return Boolean(
    receipt &&
    aggregate &&
    raw.revision === receipt.next_revision &&
    taskCentricDigest(aggregate) === receipt.aggregate_digest,
  );
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
    raw && taskCentricMutationReceipt(raw, refinementKey(opts.exchange.work_order_id));
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
  const artifactBaseline = opts.exchange.baseline.task_artifacts;
  if (artifactBaseline) {
    const artifacts = await captureExternalTaskArtifacts(
      opts.exchange.checkout,
      opts.exchange.task_id,
    );
    // The native backend rewrites only README.md when it records the amendment.
    // The persisted aggregate digest below independently binds that native task mutation.
    const comparable = (entries: Record<string, string>) =>
      Object.entries(entries)
        .filter(([name]) => !receipt || name !== "README.md")
        .toSorted(([a], [b]) => a.localeCompare(b));
    if (JSON.stringify(comparable(artifacts)) !== JSON.stringify(comparable(artifactBaseline)))
      fail("Protected task artifacts changed after the external episode was issued.");
  } else {
    // Old exchanges have no content snapshot. Never bless a pre-existing dirty artifact.
    const artifactLines = (lines: readonly string[]) =>
      lines.filter(
        (line) =>
          line.slice(3).startsWith(prefix) && (!receipt || line.slice(3) !== `${prefix}README.md`),
      );
    if (
      artifactLines(opts.exchange.baseline.changed_paths).length > 0 ||
      artifactLines(status.lines).length > 0
    )
      fail("Pure refinement requires a fresh task artifact baseline for dirty task metadata.");
  }
  const aggregate = taskCentricAggregateFromExtensions(raw.extensions);
  if (receipt) {
    if (!aggregate || taskCentricDigest(aggregate) !== receipt.aggregate_digest)
      fail("Recorded plan refinement aggregate changed after its native receipt.");
    if (raw.revision !== receipt.next_revision)
      fail("Recorded plan refinement is stale after additional task changes.");
    return true;
  }
  if (opts.decision.workflowStep.preconditionFingerprint.digest !== opts.exchange.state_fingerprint)
    fail("Plan refinement is stale against the issued task and repository fingerprint.");
  if (raw.revision !== opts.work_order.task.revision)
    fail("Plan refinement task revision differs from the issued WorkOrder.");
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
  await recordTaskCentricPlanRefinement({
    command: opts.command,
    repository,
    task_id: raw.id,
    expected_revision: opts.work_order.task.revision,
    refinement: semantic.plan_refinement,
    actor_id: `external:${opts.work_order.role}`,
    idempotency_key: refinementKey(opts.work_order.work_order_id),
  });
  return true;
}
