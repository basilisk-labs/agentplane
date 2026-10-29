import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  parseTaskScopeExtensionRequestState,
  scopeExtensionReceiptForState,
} from "../shared/task-scope-extension-request.js";
import { currentCompletedBlockerExchange } from "./kernel-completed-external-blocker-boundary.js";
import { readExternalAgentWorkOrder } from "./external-agent-exchange.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import {
  amendedScopeIntake,
  scopeIntakeDigest,
} from "../../adapters/task-backend/kernel-scope-intake.js";
import { validateScopeRequestPaths } from "./kernel-scope-request-evidence.js";
import type { KernelRead } from "../../adapters/task-backend/kernel-record.js";
import type { NativeAuthorityContext } from "../../ports/kernel-authority.js";
import type { KernelRepositoryObservation } from "../../runner/observation/kernel-repository.js";

type Ports = {
  read(id: string): Promise<KernelRead>;
  observe(): Promise<KernelRepositoryObservation>;
  readContext(id: string): Promise<NativeAuthorityContext>;
};

/** Re-read the current native blocker on every approval attempt, including adapter admission. */
export async function readCompletedReworkScopeRequest(
  command: CommandContext,
  taskId: string,
  ports: Ports,
) {
  const read = await ports.read(taskId);
  if (read.kind !== "canonical")
    throw new Error("Completed rework scope requires a canonical Task");
  const { task, record } = read;
  const aggregate = record.aggregate;
  const parent = aggregate.authority_lineage?.at(-1)?.authority;
  const plan = aggregate.current_plan;
  const pending = parseTaskScopeExtensionRequestState(task);
  if (
    task.status !== "DONE" ||
    task.execution_route?.selected_mode !== "branch_pr" ||
    aggregate.state !== "COMPLETED" ||
    plan?.state !== "APPROVED" ||
    !parent ||
    pending?.status !== "pending" ||
    pending.work_item_id !== null
  )
    throw new Error(
      `Completed rework scope requires a pending task-level blocker (status=${task.status}, mode=${task.execution_route?.selected_mode}, state=${aggregate.state}, plan=${plan?.state}, pending=${pending?.status}, work_item=${pending?.work_item_id})`,
    );
  if (
    !(task.comments ?? []).some(
      (comment) =>
        comment.author === "SUPERVISOR" &&
        comment.body.includes(scopeExtensionReceiptForState(pending)),
    )
  )
    throw new Error("Completed rework scope has no retained blocker receipt");
  const decision = await buildTaskRouteDecision({
    ctx: command,
    cwd: command.resolvedProject.gitRoot,
    includeRemote: false,
    rootOverride: null,
    taskId,
  });
  const exchange = await currentCompletedBlockerExchange({ command, decision });
  const semantic = exchange?.result?.result;
  const wanted = semantic?.blocker?.scope_extension_request;
  if (
    !exchange ||
    semantic?.status !== "blocked" ||
    !wanted ||
    exchange.task_id !== taskId ||
    exchange.transition_id !== pending.transition_id ||
    exchange.state_fingerprint !== pending.blocker_state_fingerprint ||
    exchange.baseline.head === null ||
    exchange.baseline.changed_paths.length > 0 ||
    exchange.checkout !== command.resolvedProject.gitRoot
  )
    throw new Error("Completed rework scope does not match the authenticated blocker");
  const order = await readExternalAgentWorkOrder(exchange.work_order_ref);
  if (
    order.work_order_id !== exchange.work_order_id ||
    order.task.id !== taskId ||
    order.task.work_item_id != null ||
    (order.canonical_binding && order.canonical_binding.task_id !== taskId)
  )
    throw new Error("Completed rework scope WorkOrder binding changed");
  const normalizedRoots = [...new Set(wanted.scope_roots)].toSorted();
  const normalizedEffects = [...new Set(wanted.repository_effects)].toSorted();
  if (
    k.kernelDigest({
      ...pending.request,
      scope_roots: normalizedRoots,
      repository_effects: normalizedEffects,
    }) !== k.kernelDigest(pending.request) ||
    wanted.rationale.trim() !== pending.request.rationale
  )
    throw new Error("Completed rework scope request changed after the blocker");
  await validateScopeRequestPaths(command.resolvedProject.gitRoot, normalizedRoots, [
    ".git",
    ".agentplane",
    "AGENTS.md",
    command.config.paths.workflow_dir,
    command.config.paths.tasks_path,
    command.config.paths.worktrees_dir,
  ]);
  const next = amendedScopeIntake(task, normalizedRoots, normalizedEffects);
  if (scopeIntakeDigest(next) === scopeIntakeDigest(task.execution_contract))
    throw new Error("Completed rework scope request is already admitted");
  const observation = await ports.observe();
  if (observation.fingerprint !== parent.repository_fingerprint)
    throw new Error("Completed rework scope requires an unchanged repository checkpoint");
  const context = await ports.readContext(taskId);
  if (k.kernelDigest(context.ceiling.policy_digests) !== k.kernelDigest(parent.policy_digests))
    throw new Error("Completed rework scope policy changed");
  const head = await readDirectTaskHead(command.resolvedProject.gitRoot);
  if (head !== decision.workflowStep.preconditionFingerprint.git_head)
    throw new Error("Completed rework scope Git head changed");
  const request: k.CompletedReworkScopeRequest = {
    task_id: taskId,
    record_digest: record.digest,
    task_revision: aggregate.revision,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    work_order_id: order.work_order_id,
    result_digest: k.kernelDigest(semantic),
    transition_id: exchange.transition_id,
    blocker_state_fingerprint: exchange.state_fingerprint as k.Sha256Digest,
    blocker_request_digest: pending.request_digest as k.Sha256Digest,
    baseline_head: exchange.baseline.head,
    parent_authority_digest: parent.digest,
    repository_identity: record.repository_identity,
    repository_fingerprint: parent.repository_fingerprint,
    policy_digests_digest: k.kernelDigest(parent.policy_digests),
    intake_before_digest: scopeIntakeDigest(task.execution_contract),
    intake_after_digest: scopeIntakeDigest(next),
    scope_roots: normalizedRoots,
    repository_effects: normalizedEffects,
  };
  return { request, parent, record, requestDigest: k.kernelDigest(request) };
}
