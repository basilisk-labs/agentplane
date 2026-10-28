import path from "node:path";
import { findWorktreeForBranch } from "@agentplaneorg/core/git";
import type { CommandContext } from "../shared/task-backend.js";
import {
  loadBackendTask,
  loadCommandContext,
  resolveTaskBranchFromContext,
} from "../shared/task-backend.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { evaluateWorkflowOperationAuthority } from "../shared/side-effect-authority.js";
import { hydrateTaskSideEffectAuthority } from "../shared/side-effect-authority-store.js";
import { resolvePrFlowStatus } from "../pr/flow-status.js";
import { mergeAdoptedPr } from "../pr/adoption-merge.js";
import { createExistingPrAdoptionStore, resolveAdoptionControlRoot } from "../pr/adoption-store.js";
import { assertAdoptedPrMergeReadiness } from "../pr/adoption-task-authority.js";
import { matchesAdoptedPrObservation } from "../pr/adoption-identity.js";
import { hasExactAdoptedVerificationRecord } from "../pr/adoption-verification.js";
import { transferCanonicalControllerToBase } from "./kernel-controller-handoff.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";

export async function mergeAdoptedBranchOperation(opts: {
  command: CommandContext;
  cwd: string;
  operation: Extract<WorkflowOperation, { id: "integration.adopted_merge" }>;
}): Promise<string> {
  const { command, cwd, operation } = opts;
  const root = command.resolvedProject.gitRoot;
  const store = createExistingPrAdoptionStore({
    gitRoot: await resolveAdoptionControlRoot(root),
    workflowDir: command.config.paths.workflow_dir,
  });
  const receipt = await store.readTask(operation.params.taskId);
  if (receipt?.pr_number !== operation.params.prNumber) {
    throw new Error("Native adopted PR merge has no exact retained task binding");
  }
  const assertAuthority = async () => {
    const { task: fresh } = await loadBackendTask({
      ctx: command,
      cwd,
      taskId: operation.params.taskId,
      preferBranchSnapshot: false,
    });
    assertAdoptedPrMergeReadiness(fresh, operation.params.headSha);
    const decision = evaluateWorkflowOperationAuthority({
      task: await hydrateTaskSideEffectAuthority({
        gitRoot: root,
        taskId: operation.params.taskId,
        task: fresh,
      }),
      operation,
      fingerprint: operation.preconditionFingerprint,
    });
    if (decision.state !== "allowed" || decision.authority?.actor !== "USER") {
      throw new Error("Adopted PR merge requires its own current USER authority");
    }
  };
  const { task: currentTask } = await loadBackendTask({
    ctx: command,
    cwd,
    taskId: operation.params.taskId,
    preferBranchSnapshot: false,
  });
  const result = await mergeAdoptedPr({
    gitRoot: root,
    task: currentTask,
    receipt,
    expectedHeadSha: operation.params.headSha,
    expectedBaseSha: operation.params.baseSha,
    assertAuthority,
    assertVerification: async () => {
      const { task: fresh } = await loadBackendTask({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        preferBranchSnapshot: false,
      });
      if (
        !(await hasExactAdoptedVerificationRecord({
          ctx: command,
          task: fresh,
          headSha: operation.params.headSha,
        }))
      ) {
        throw new Error(
          "Adopted PR merge requires a current native verification record for the exact hosted head",
        );
      }
    },
  });
  await store.recordMerged(
    operation.params.taskId,
    operation.params.headSha,
    result.mergeCommit,
    result.mergedAt,
  );
  return `merged adopted PR #${receipt.pr_number}; provider confirmed merge commit ${result.mergeCommit}`;
}

export async function finishAdoptedBranchOperation(opts: {
  command: CommandContext;
  cwd: string;
  decision: TaskRouteDecision;
  operation: Extract<WorkflowOperation, { id: "task.adopted.finish" }>;
}): Promise<string> {
  const { command, cwd, operation } = opts;
  const decision = opts.decision;
  const root = command.resolvedProject.gitRoot;
  const store = createExistingPrAdoptionStore({
    gitRoot: await resolveAdoptionControlRoot(root),
    workflowDir: command.config.paths.workflow_dir,
  });
  const receipt = await store.readTask(operation.params.taskId);
  const recorded = await store.readMerged(operation.params.taskId);
  if (
    receipt?.pr_number !== operation.params.prNumber ||
    recorded?.headSha !== operation.params.headSha ||
    recorded.mergeCommit !== operation.params.mergeCommit ||
    recorded.mergedAt !== operation.params.mergedAt
  ) {
    throw new Error("Adopted PR task closure has no matching native merge receipt");
  }
  const flow = await resolvePrFlowStatus({
    ctx: command,
    cwd,
    taskId: operation.params.taskId,
  });
  const observed = flow.providerObservation;
  if (
    observed?.state !== "found" ||
    !matchesAdoptedPrObservation(receipt, observed.pr) ||
    observed.pr.status !== "MERGED" ||
    observed.pr.headSha !== operation.params.headSha ||
    observed.pr.mergeCommit !== operation.params.mergeCommit ||
    observed.pr.mergedAt !== operation.params.mergedAt
  ) {
    throw new Error("Adopted PR task closure requires fresh matching merged provider readback");
  }
  const taskBranch = await resolveTaskBranchFromContext({
    ctx: command,
    taskId: operation.params.taskId,
  });
  const owner = taskBranch ? await findWorktreeForBranch(root, taskBranch) : null;
  if (
    !owner ||
    !decision.workspace.taskWorktreePath ||
    path.resolve(owner) !== path.resolve(decision.workspace.taskWorktreePath)
  ) {
    throw new Error("Adopted PR task closure requires its registered task worktree");
  }
  const taskCommand = await loadCommandContext({ cwd: owner, rootOverride: null });
  const { task: currentTask } = await loadBackendTask({
    ctx: taskCommand,
    cwd: owner,
    taskId: operation.params.taskId,
    preferBranchSnapshot: true,
  });
  assertAdoptedPrMergeReadiness(currentTask, operation.params.headSha);
  if (
    !(await hasExactAdoptedVerificationRecord({
      ctx: taskCommand,
      task: currentTask,
      headSha: operation.params.headSha,
    }))
  ) {
    throw new Error(
      "Adopted PR task closure requires the current exact-head native verification record",
    );
  }
  const runtime = await createKernelRuntime({
    command: taskCommand,
    task_id: operation.params.taskId,
    transport: "host",
    operation_id: `adopted-controller-transfer:${operation.params.mergeCommit}`,
  });
  const transferred = await transferCanonicalControllerToBase({
    command: taskCommand,
    runtime,
    task_id: operation.params.taskId,
    base_checkout: await resolveAdoptionControlRoot(root),
  });
  const authoritative = await transferred.taskBackend.getTask(operation.params.taskId);
  if (authoritative?.status !== "DONE") {
    throw new Error("Adopted PR canonical completion was not persisted in the base checkout");
  }
  return `closed adopted PR task ${operation.params.taskId} from provider merge ${operation.params.mergeCommit}`;
}
