import path from "node:path";

import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import { readKernelRecord, type KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { CANONICAL_EFFECT_KIND_BY_OPERATION } from "../shared/side-effect-authority.js";
import {
  loadCommandContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  executeAdmittedBranchWorkflowOperation,
  executeBranchWorkflowOperation,
} from "./branch-task-supervisor-operations.js";
import {
  recoverCanonicalControllerSuspension,
  withCanonicalControllerSuspendedForOperation,
} from "./kernel-controller-handoff.js";
import { canonicalWorkflowRequestDigest } from "./kernel-provider-effect-coordinator.js";

async function repositoryCheckout(command: CommandContext, checkout: string) {
  if (path.resolve(checkout) === path.resolve(command.resolvedProject.gitRoot)) return command;
  const target = await loadCommandContext({ cwd: checkout, rootOverride: null });
  if (
    path.resolve(await resolveCommandGitCommonDir(target)) !==
    path.resolve(await resolveCommandGitCommonDir(command))
  ) {
    throw new Error("Completed workflow checkout is outside the repository");
  }
  return target;
}

/** A merged immutable record can be read from base without recording a Kernel transfer. */
export async function resolveCompletedWorkflowBase(opts: {
  command: CommandContext;
  record: KernelRecord;
  base_checkout: string;
}) {
  const target = await repositoryCheckout(opts.command, opts.base_checkout);
  const task = await target.taskBackend.getTask(opts.record.aggregate.id);
  const read = task ? readKernelRecord(task, opts.record.repository_identity) : null;
  if (
    opts.record.aggregate.state !== "COMPLETED" ||
    read?.kind !== "canonical" ||
    read.record.digest !== opts.record.digest
  ) {
    throw new Error("Merged base does not contain the exact completed Kernel record");
  }
  return target;
}

/** Provider lifecycle uses the admitted supervisor journal, not mutations of a completed Task. */
async function executeCompletedProviderWorkflow(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  task_id: string;
  request_digest: k.Sha256Digest;
}) {
  const before = opts.decision;
  const step = before.workflowStep;
  if (step.kind !== "cli_operation" || !(step.operation.id in CANONICAL_EFFECT_KIND_BY_OPERATION)) {
    return null;
  }
  if (step.operation.id === "integration.run_next") {
    await recoverCanonicalControllerSuspension({
      command: opts.command,
      task_id: opts.task_id,
      request_digest: opts.request_digest,
    });
  }
  return await executeAdmittedBranchWorkflowOperation({
    decision: before,
    git_root: opts.command.resolvedProject.gitRoot,
    execute: async (operation) => {
      let executionDecision = before;
      if (["integration.enqueue", "integration.run_next"].includes(operation.id)) {
        const base = before.workspace.baseCheckoutPath;
        if (!base) throw new Error("Completed integration requires an authoritative base checkout");
        await repositoryCheckout(opts.command, base);
        executionDecision = {
          ...before,
          executionPacket: {
            ...before.executionPacket,
            authoritativeCheckout: "base_checkout",
            authoritativeCheckoutPath: base,
            mutationPathHint: base,
            mustRunFrom: base,
          },
        };
      }
      const run = () => executeBranchWorkflowOperation({ decision: executionDecision, operation });
      const controllerCheckout =
        operation.id === "integration.run_next"
          ? before.workspace.taskWorktreePath
          : ["task.hosted_close.finalize", "task.worktree.cleanup"].includes(operation.id)
            ? before.executionPacket.mustRunFrom
            : null;
      return controllerCheckout
        ? await withCanonicalControllerSuspendedForOperation({
            command: opts.command,
            decision: before,
            task_id: opts.task_id,
            request_digest: opts.request_digest,
            operation_idempotency_key: operation.idempotencyKey,
            controller_checkout: controllerCheckout,
            run,
          })
        : await run();
    },
    refresh: async () =>
      await buildTaskRouteDecision({
        ctx: opts.command,
        cwd: opts.command.resolvedProject.gitRoot,
        rootOverride: null,
        includeRemote: true,
        freshHead: true,
        taskId: opts.task_id,
      }),
  });
}

export async function advanceCompletedProviderWorkflow(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  task_id: string;
}) {
  const step = opts.decision.workflowStep;
  if (step.kind !== "cli_operation") return null;
  const requestDigest = canonicalWorkflowRequestDigest(opts.task_id, opts.decision, step.operation);
  const persisted = await executeCompletedProviderWorkflow({
    ...opts,
    request_digest: requestDigest,
  });
  if (!persisted) return null;
  const execution = persisted.execution;
  const refreshed = execution.refreshed_decision;
  const recoveredCursor =
    execution.result === null &&
    execution.stop_reason === null &&
    refreshed !== null &&
    persisted.journal.status === "running" &&
    persisted.journal.cursor.phase === "ready";
  const succeeded =
    execution.executable &&
    execution.stop_reason === null &&
    execution.result?.status === "succeeded" &&
    refreshed !== null;
  const unchanged =
    refreshed?.workflowStep.kind === "cli_operation" &&
    canonicalWorkflowRequestDigest(opts.task_id, refreshed, refreshed.workflowStep.operation) ===
      requestDigest;
  if ((recoveredCursor || succeeded) && !unchanged) return { kind: "progress" as const };
  return {
    kind: "stop" as const,
    action: {
      kind: "human_required" as const,
      reason:
        persisted.journal.stop?.reason === "effect_in_doubt"
          ? "effect_in_doubt"
          : unchanged
            ? "canonical_workflow_effect_no_progress"
            : "canonical_workflow_effect_unavailable",
      workflow_step: step.id,
      evidence_digest: persisted.journal.digest,
    },
  };
}
