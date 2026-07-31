import type { CommandCtx } from "../../cli/spec/spec.js";
import { cmdWorkStart } from "../branch/work-start.js";
import { cmdCleanupMerged } from "../branch/cleanup-merged.js";
import { cmdCommit } from "../guard/impl/commit.js";
import {
  makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler,
  makeRunIntegrateQueueEnqueueHandler,
} from "../integrate-queue.command.js";
import { resolvePrFlowStatus } from "../pr/flow-status.js";
import { cmdPrOpen } from "../pr/open.js";
import { cmdPrUpdate } from "../pr/update.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { cmdFinish } from "./finish-command.js";
import { makeRunTaskHostedClosePrHandler } from "./hosted-close-pr.command.js";
import { cmdTaskStartReady } from "./start-ready.js";

function observedPostconditions(operation: WorkflowOperation): string[] {
  return operation.expectedPostconditions
    .map((postcondition) => postcondition.id)
    .filter((id) => id !== "route_state_recomputed");
}

function succeeded(
  operation: WorkflowOperation,
  detail: string,
  exitCode = 0,
): WorkflowSupervisorOperationResult {
  return {
    status: exitCode === 0 ? "succeeded" : "failed",
    observed_postconditions: exitCode === 0 ? observedPostconditions(operation) : [],
    detail,
    exit_code: exitCode,
  };
}

function checkoutFor(decision: TaskRouteDecision): string {
  const checkout = decision.executionPacket.mustRunFrom?.trim() ?? "";
  if (!checkout) {
    throw new Error(
      `Branch task supervisor has no authoritative checkout for ${decision.workflowStep.id}.`,
    );
  }
  return checkout;
}

/**
 * Execute the existing lifecycle use cases in-process. The branch supervisor
 * never spawns an AgentPlane subprocess and never parses rendered stdout.
 */
export async function executeBranchWorkflowOperation(opts: {
  decision: TaskRouteDecision;
  operation: WorkflowOperation;
}): Promise<WorkflowSupervisorOperationResult> {
  const cwd = checkoutFor(opts.decision);
  const command = await loadCommandContext({ cwd, rootOverride: null });
  const cliContext: CommandCtx = { cwd };
  const { operation } = opts;
  let exitCode: number;

  switch (operation.id) {
    case "worktree.prepare": {
      exitCode = await cmdWorkStart({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        agent: operation.params.agent,
        slug: operation.params.slug,
        worktree: true,
        quiet: true,
      });
      return succeeded(
        operation,
        `prepared task worktree for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "task.branch.start":
    case "task.start": {
      exitCode = await cmdTaskStartReady({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        author: operation.params.author,
        body: operation.params.body,
        force: false,
        yes: false,
        quiet: true,
      });
      return succeeded(operation, `recorded task start for ${operation.params.taskId}`, exitCode);
    }
    case "pr.artifacts.update":
    case "pr.sync_or_verify": {
      exitCode = await cmdPrUpdate({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        includeTaskIds: [...operation.params.includeTaskIds],
        silent: true,
      });
      return succeeded(
        operation,
        `synchronized PR artifacts for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "pr.open":
    case "pr.head.publish": {
      exitCode = await cmdPrOpen({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        author: operation.params.author,
        includeTaskIds: [...operation.params.includeTaskIds],
        quiet: true,
      });
      return succeeded(operation, `published PR state for ${operation.params.taskId}`, exitCode);
    }
    case "provider.pr.refresh":
    case "route.remote.refresh": {
      await resolvePrFlowStatus({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
      });
      exitCode = 0;
      return succeeded(
        operation,
        `observed provider PR state for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "task.pre_merge_close": {
      exitCode = await cmdFinish({
        ctx: command,
        cwd,
        taskIds: [operation.params.taskId],
        author: operation.params.author,
        body: operation.params.body,
        result: operation.params.result,
        commit: operation.params.commit,
        breaking: false,
        force: operation.params.force,
        yes: operation.params.force,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: true,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        preMergeClosure: true,
        quiet: true,
      });
      return succeeded(
        operation,
        `recorded pre-merge closure for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "integration.enqueue": {
      const handler = makeRunIntegrateQueueEnqueueHandler(() => Promise.resolve(command));
      exitCode = await handler(cliContext, {
        taskId: operation.params.taskId,
        branch: operation.params.branch,
        base: null,
        priority: 0,
        quiet: true,
      });
      return succeeded(
        operation,
        `enqueued exact task branch head for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "integration.adopt_legacy_protected_conflict": {
      const handler = makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler(() =>
        Promise.resolve(command),
      );
      exitCode = await handler(cliContext, {
        taskId: operation.params.taskId,
        expectedAdoptionToken: operation.params.expectedAdoptionToken,
        quiet: true,
      });
      return succeeded(
        operation,
        `recorded legacy protected-conflict receipt for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "task.hosted_close.open": {
      const handler = makeRunTaskHostedClosePrHandler(() => Promise.resolve(command));
      exitCode = await handler(cliContext, {
        taskIds: [operation.params.taskId],
        branch: null,
        repo: null,
        quiet: true,
      });
      return succeeded(operation, `opened hosted close for ${operation.params.taskId}`, exitCode);
    }
    case "task.hosted_close.finalize":
    case "task.worktree.cleanup": {
      exitCode = await cmdCleanupMerged({
        ctx: command,
        cwd,
        base: operation.params.base,
        yes: false,
        archive: false,
        deleteRemoteBranches: false,
        finalize: true,
        fetch: false,
        quiet: true,
        taskIds: [operation.params.taskId],
      });
      return succeeded(
        operation,
        `finalized base sync and task-owned cleanup for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "task.artifacts.commit": {
      exitCode = await cmdCommit({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        message: "",
        close: true,
        allow: [],
        autoAllow: false,
        allowTasks: true,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
        closeUnstageOthers: true,
        closeCheckOnly: false,
      });
      return succeeded(
        operation,
        `committed task artifacts for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "task.verify.show":
    case "batch.collect_included":
    case "batch.follow_primary": {
      await loadTaskFromContext({ ctx: command, taskId: operation.params.taskId });
      return succeeded(operation, `loaded task state for ${operation.params.taskId}`);
    }
    case "batch.reconcile_included": {
      return {
        status: "failed",
        observed_postconditions: [],
        detail:
          "Included-batch reconciliation remains an explicit release operation outside the single-task branch supervisor.",
        exit_code: 2,
      };
    }
    case "runner.follow": {
      return {
        status: "failed",
        observed_postconditions: [],
        detail:
          "branch_pr semantic episodes use the dedicated EXECUTOR boundary, not runner.follow route substitution",
        exit_code: 2,
      };
    }
  }
}
