import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";
import path from "node:path";
import {
  createRepositorySnapshot,
  taskCentricDigest,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";
import { gitIsAncestor } from "@agentplaneorg/core/git";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { TaskCentricBackendAdapter } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import { runtimeFrom } from "../../adapters/task-backend/task-centric-backend-runtime.js";
import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { recordedTaskImplementationCommitSha } from "../shared/quality-review-target.js";
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

const LEGACY_REFINEMENT_ARTIFACTS = new Set([
  "README.md",
  "supervision/declared-checks.json",
  "supervision/implementation-evidence.json",
]);

function taskArtifactStatusLines(lines: readonly string[], prefix: string): string[] {
  return lines.filter((line) => line.slice(3).startsWith(prefix)).toSorted();
}

async function readJsonRecord(file: string, label: string): Promise<Record<string, unknown>> {
  let value: unknown;
  try {
    const bytes = await readStableRegularFileNoFollow(file, label);
    value = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail(`Legacy plan refinement ${label} is missing or malformed.`);
  }
  if (!isRecord(value)) fail(`Legacy plan refinement ${label} is not an object.`);
  return value;
}

async function validateLegacyRefinementArtifacts(opts: {
  checkout: string;
  task_id: string;
  task: TaskData;
  head: string;
  baseline_lines: readonly string[];
  current_lines: readonly string[];
}): Promise<void> {
  const prefix = `.agentplane/tasks/${opts.task_id}/`;
  const issued = taskArtifactStatusLines(opts.baseline_lines, prefix);
  const current = taskArtifactStatusLines(opts.current_lines, prefix);
  if (
    issued.length === 0 ||
    issued.length !== current.length ||
    issued.some((line, index) => line !== current[index])
  )
    fail("Legacy plan refinement task artifact status changed after issue.");
  const relative = issued.map((line) => line.slice(3 + prefix.length));
  if (
    issued.some((line) => !line.startsWith(" M ")) ||
    relative.some((name) => !LEGACY_REFINEMENT_ARTIFACTS.has(name)) ||
    !relative.includes("README.md") ||
    new Set(relative).size !== relative.length
  )
    fail("Legacy plan refinement contains unrecognized task artifact drift.");

  const supervision = relative.filter((name) => name.startsWith("supervision/"));
  if (supervision.length === 0) return;
  if (
    !relative.includes("supervision/declared-checks.json") ||
    !relative.includes("supervision/implementation-evidence.json")
  )
    fail("Legacy plan refinement supervision evidence is incomplete.");
  const taskRoot = path.join(opts.checkout, ".agentplane", "tasks", opts.task_id);
  const [declared, evidence] = await Promise.all([
    readJsonRecord(path.join(taskRoot, "supervision", "declared-checks.json"), "declared checks"),
    readJsonRecord(
      path.join(taskRoot, "supervision", "implementation-evidence.json"),
      "implementation evidence",
    ),
  ]);
  const checks = declared.checks;
  if (
    declared.schema_version !== 1 ||
    declared.kind !== "direct_task_declared_checks" ||
    declared.task_id !== opts.task_id ||
    !["passed", "failed"].includes(String(declared.status)) ||
    !Array.isArray(checks) ||
    checks.length === 0 ||
    checks.some(
      (check) =>
        !isRecord(check) ||
        typeof check.command !== "string" ||
        typeof check.exit_code !== "number" ||
        !Array.isArray(check.check_ids) ||
        check.check_ids.length === 0 ||
        check.check_ids.some((id) => typeof id !== "string" || id.length === 0),
    ) ||
    (declared.status === "passed") !==
      checks.every((check) => isRecord(check) && check.exit_code === 0)
  )
    fail("Legacy plan refinement declared checks failed identity validation.");
  const implementationCommit = evidence.implementation_commit;
  const executionBase = evidence.execution_base_commit;
  if (
    evidence.schema_version !== 1 ||
    evidence.kind !== "direct_task_implementation_evidence" ||
    evidence.task_id !== opts.task_id ||
    typeof implementationCommit !== "string" ||
    typeof executionBase !== "string" ||
    !/^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(implementationCommit) ||
    !/^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(executionBase) ||
    implementationCommit === executionBase ||
    recordedTaskImplementationCommitSha(opts.task) !== implementationCommit ||
    !Array.isArray(evidence.checks) ||
    evidence.checks.length === 0 ||
    !(await gitIsAncestor(opts.checkout, executionBase, implementationCommit)) ||
    !(await gitIsAncestor(opts.checkout, implementationCommit, opts.head))
  )
    fail("Legacy plan refinement implementation evidence failed identity validation.");
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
    // Pre-snapshot exchanges can recover only a bounded, unchanged supervisor projection whose
    // identities are independently bound to the authoritative Task and Git history.
    const artifactLines = (lines: readonly string[]) =>
      lines.filter(
        (line) =>
          line.slice(3).startsWith(prefix) && (!receipt || line.slice(3) !== `${prefix}README.md`),
      );
    if (
      artifactLines(opts.exchange.baseline.changed_paths).length > 0 ||
      artifactLines(status.lines).length > 0
    ) {
      await validateLegacyRefinementArtifacts({
        checkout: opts.exchange.checkout,
        task_id: opts.exchange.task_id,
        task: raw,
        head,
        baseline_lines: opts.exchange.baseline.changed_paths,
        current_lines: status.lines,
      });
    }
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
  const adapter = new TaskCentricBackendAdapter({
    backend: opts.command.taskBackend,
    observeRepository: () => Promise.resolve(repository),
  });
  await adapter.recordPlanRefinement({
    task_id: raw.id,
    expected_revision: opts.work_order.task.revision,
    refinement: semantic.plan_refinement,
    actor_id: `external:${opts.work_order.role}`,
    at: repository.captured_at,
    idempotency_key: refinementKey(opts.work_order.work_order_id),
  });
  return true;
}
