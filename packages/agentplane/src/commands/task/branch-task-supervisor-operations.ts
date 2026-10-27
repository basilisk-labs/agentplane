import path from "node:path";
import { findWorktreeForBranch } from "@agentplaneorg/core/git";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { cmdWorkStart } from "../branch/work-start.js";
import { cmdCleanupMerged } from "../branch/cleanup-merged.js";
import { cmdCommit } from "../guard/impl/commit.js";
import {
  makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler,
  makeRunIntegrateQueueEnqueueHandler,
  makeRunIntegrateQueueRunNextHandler,
} from "../integrate-queue.command.js";
import { resolvePrFlowStatus } from "../pr/flow-status.js";
import { mergeAdoptedPr } from "../pr/adoption-merge.js";
import { createExistingPrAdoptionStore, resolveAdoptionControlRoot } from "../pr/adoption-store.js";
import { assertAdoptedPrMergeReadiness } from "../pr/adoption-task-authority.js";
import { matchesAdoptedPrObservation } from "../pr/adoption-identity.js";
import { hasExactAdoptedVerificationRecord } from "../pr/adoption-verification.js";
import { cmdPrOpen } from "../pr/open.js";
import { cmdPrUpdate } from "../pr/update.js";
import { updateProviderBranch } from "../pr/provider-update-branch.js";
import { freshHostedPrReadback } from "./kernel-hosted-readback.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  evaluateWorkflowOperationAuthority,
  workflowAuthorityStateScopeDigest,
} from "../shared/side-effect-authority.js";
import { hydrateTaskSideEffectAuthority } from "../shared/side-effect-authority-store.js";
import {
  loadBackendTask,
  loadCommandContext,
  loadTaskFromContext,
  resolveTaskBranchFromContext,
} from "../shared/task-backend.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { supervisePersistedWorkflowEpisode } from "../shared/supervisor-execution-episode.js";
import { applyForeignTaskReadmeReplicaRepair } from "../shared/task-worktree-foreign-artifact-repair.js";
import { isSameBranchIdentity } from "../shared/branch-identity.js";
import { resolveCanonicalWorktreePreparationRoot } from "../shared/worktree-topology.js";
import { cmdFinish } from "./finish-command.js";
import { transferCanonicalControllerToBase } from "./kernel-controller-handoff.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { makeRunTaskHostedClosePrHandler } from "./hosted-close-pr.command.js";
import { cmdTaskStartReady } from "./start-ready.js";
import { cmdTaskScopeExtend } from "./scope-extend.js";
import { loadTaskCommandContext } from "../../runtime/task-execution-context/index.js";
import { synchronizeTaskBranchBase } from "../branch/sync-task-base.js";

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

/** External authority is repository-owned and must never be read from the task worktree. */
export function branchAuthorityCheckout(decision: TaskRouteDecision): string {
  const checkout = decision.workspace.baseCheckoutPath?.trim() ?? "";
  const taskWorktree = decision.workspace.taskWorktreePath?.trim() ?? "";
  if (!checkout || (taskWorktree && path.resolve(checkout) === path.resolve(taskWorktree))) {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "Branch side-effect authority requires the authoritative base checkout; task-worktree configuration cannot authorize provider publication.",
    });
  }
  return checkout;
}

/**
 * Runs one branch operation through the shared operation-key admission and
 * durable replay boundary. Actual Git/provider use cases stay in the typed
 * operation executor below.
 */
export async function executeAdmittedBranchWorkflowOperation(opts: {
  decision: TaskRouteDecision;
  git_root: string;
  refresh: () => Promise<TaskRouteDecision>;
  execute?: (operation: WorkflowOperation) => Promise<WorkflowSupervisorOperationResult>;
}) {
  return await supervisePersistedWorkflowEpisode({
    decision: opts.decision,
    git_root: opts.git_root,
    task_revision: null,
    execute: async ({ operation }) =>
      await (opts.execute
        ? opts.execute(operation)
        : executeBranchWorkflowOperation({ decision: opts.decision, operation })),
    refresh: opts.refresh,
  });
}

function isCompletedProtectedBaseWorkerCycle(error: unknown): boolean {
  if (!(error instanceof CliError) || error.code !== "E_HANDOFF") return false;
  const reasonCode = error.context?.reason_code;
  if (typeof reasonCode !== "string") return false;
  return new Set([
    "protected_base_auto_merge_enabled",
    "protected_base_github_merge_completed",
  ]).has(reasonCode);
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
  const taskCommand = await loadTaskCommandContext({
    ctx: command,
    taskIds: [opts.operation.params.taskId],
  });
  const cliContext: CommandCtx = { cwd };
  const { operation } = opts;
  let exitCode: number;

  switch (operation.id) {
    case "candidate.publish": {
      throw new Error("Candidate publication requires its dedicated operator checkpoint.");
    }
    case "pr.existing.adopt": {
      throw new Error("Existing PR adoption requires its dedicated operator checkpoint.");
    }
    case "integration.adopted_merge": {
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
      return succeeded(
        operation,
        `merged adopted PR #${receipt.pr_number}; provider confirmed merge commit ${result.mergeCommit}`,
      );
    }
    case "task.adopted.finish": {
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
        !opts.decision.workspace.taskWorktreePath ||
        path.resolve(owner) !== path.resolve(opts.decision.workspace.taskWorktreePath)
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
      return succeeded(
        operation,
        `closed adopted PR task ${operation.params.taskId} from provider merge ${operation.params.mergeCommit}`,
      );
    }
    case "task.branch.sync_base": {
      const result = await synchronizeTaskBranchBase({
        gitRoot: command.resolvedProject.gitRoot,
        worktreePath: cwd,
        workflowDir: command.config.paths.workflow_dir,
        tasksPath: command.config.paths.tasks_path,
        taskId: operation.params.taskId,
        branch: operation.params.branch,
        baseBranch: operation.params.baseBranch,
        expectedHeadSha: operation.params.expectedHeadSha,
        expectedBaseSha: operation.params.expectedBaseSha,
      });
      return succeeded(
        operation,
        result.state === "updated"
          ? `merged exact base ${operation.params.expectedBaseSha} into ${operation.params.branch}; readback proved new head ${result.headSha} contains the previous task head and base`
          : `task branch ${operation.params.branch} already contains exact base ${operation.params.expectedBaseSha}`,
      );
    }
    case "worktree.prepare": {
      if (
        opts.decision.task.id !== operation.params.taskId ||
        taskCommand.execution.primary_task_id !== operation.params.taskId ||
        !taskCommand.execution.base_sha ||
        !opts.decision.workspace.baseBranch ||
        !isSameBranchIdentity(opts.decision.workspace.baseBranch, taskCommand.execution.base_ref)
      ) {
        throw new CliError({
          code: "E_GIT",
          message:
            "Worktree preparation requires the exact routed task and admitted development base.",
          context: { reason_code: "worktree_preparation_task_base_mismatch" },
        });
      }
      const primaryCheckout = await resolveCanonicalWorktreePreparationRoot({
        routedCheckout: cwd,
        registeredBaseCheckout: opts.decision.workspace.baseCheckoutPath,
        baseBranch: taskCommand.execution.base_ref,
      });
      const primaryCommand =
        primaryCheckout === cwd
          ? command
          : await loadCommandContext({ cwd: primaryCheckout, rootOverride: null });
      exitCode = await cmdWorkStart({
        ctx: primaryCommand,
        cwd: primaryCheckout,
        taskId: operation.params.taskId,
        agent: operation.params.agent,
        slug: operation.params.slug,
        worktree: true,
        base: taskCommand.execution.base_ref,
        baseSha: taskCommand.execution.base_sha,
        workflowMode: opts.decision.workflowMode === "branch_pr" ? "branch_pr" : "direct",
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
    case "task.scope.extend": {
      exitCode = await cmdTaskScopeExtend({
        ctx: command,
        cwd,
        taskId: operation.params.taskId,
        scopeRoots: [...operation.params.scopeRoots],
        repositoryEffects: [...operation.params.repositoryEffects],
        requestDigest: operation.params.requestDigest,
        stateScopeDigest: workflowAuthorityStateScopeDigest(
          operation.preconditionFingerprint,
          operation.id,
        ),
        by: "USER",
        quiet: true,
      });
      return succeeded(
        operation,
        `applied exact USER-approved scope extension for ${operation.params.taskId}`,
        exitCode,
      );
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
    case "provider.pr.update_branch": {
      const controlRoot = await resolveAdoptionControlRoot(command.resolvedProject.gitRoot);
      const adoptionStore = createExistingPrAdoptionStore({
        gitRoot: controlRoot,
        workflowDir: command.config.paths.workflow_dir,
      });
      const adoption = await adoptionStore.readTask(operation.params.taskId);
      if (adoption && adoption.pr_number !== operation.params.prNumber) {
        throw new Error("Provider update-branch PR differs from immutable adoption receipt");
      }
      if (adoption) {
        const { task: fresh } = await loadBackendTask({
          ctx: command,
          cwd,
          taskId: operation.params.taskId,
          preferBranchSnapshot: false,
        });
        const authority = evaluateWorkflowOperationAuthority({
          task: await hydrateTaskSideEffectAuthority({
            gitRoot: command.resolvedProject.gitRoot,
            taskId: operation.params.taskId,
            task: fresh,
          }),
          operation,
          fingerprint: operation.preconditionFingerprint,
        });
        if (authority.state !== "allowed" || authority.authority?.actor !== "USER") {
          throw new Error("Adopted PR update requires its own current USER authority");
        }
      }
      const result = await updateProviderBranch({
        gitRoot: command.resolvedProject.gitRoot,
        worktreePath: cwd,
        identity: operation.params.identity,
        prNumber: operation.params.prNumber,
        branch: operation.params.branch,
        baseBranch: operation.params.baseBranch,
        expectedHeadSha: operation.params.expectedHeadSha,
        expectedBaseSha: operation.params.expectedBaseSha,
        ...(adoption ? { adoption } : {}),
        ...(operation.params.reconcileHeadSha
          ? { reconcileHeadSha: operation.params.reconcileHeadSha }
          : {}),
      });
      if (result.state === "updated") {
        if (adoption) {
          const current = await freshHostedPrReadback({
            gitRoot: command.resolvedProject.gitRoot,
            identity: {
              provider: adoption.provider,
              hostname: adoption.hostname,
              remote: adoption.remote,
              source_project: adoption.source_project,
              target_project: adoption.target_project,
              pr_number: adoption.pr_number,
              head_ref: adoption.head_ref,
              base_ref: adoption.base_ref,
            },
          })();
          if (current.current_head !== result.evidence.observedHeadSha) {
            throw new Error("Adopted PR updated head changed before durable readback");
          }
          await adoptionStore.recordUpdatedHead(
            operation.params.taskId,
            operation.params.expectedHeadSha,
            current.current_head,
          );
        }
        return succeeded(
          operation,
          `provider PR #${operation.params.prNumber} update-branch ${result.effect}; ` +
            `readback proved ${result.evidence.observedHeadSha} contains the exact expected head and base` +
            (adoption
              ? " under the immutable adoption receipt"
              : "; the task checkout and tracking head are aligned with that provider head"),
        );
      }
      if (result.state === "not_applied") {
        return succeeded(
          operation,
          `provider update-branch stopped before a proven effect (${result.reason}: ${result.detail}); ` +
            "a retry requires a distinct fresh supervisor operation",
          1,
        );
      }
      return succeeded(
        operation,
        `provider update-branch is effect-in-doubt (${result.reason}: ${result.detail}); ` +
          "reconcile fresh provider ancestry before any replacement and do not repeat the effect blindly",
        1,
      );
    }
    case "flow.repair.foreign_task_readme": {
      const result = await applyForeignTaskReadmeReplicaRepair({
        ctx: command,
        activeTaskId: operation.params.taskId,
        baseBranch: opts.decision.workspace.baseBranch,
      });
      return succeeded(
        operation,
        result.state === "applied"
          ? `removed proven foreign task README replica for ${operation.params.taskId}`
          : `foreign task README replica repair was not applied: ${result.reason}`,
        result.state === "applied" ? 0 : 1,
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
        base: taskCommand.execution.base_ref,
        priority: 0,
        quiet: true,
      });
      return succeeded(
        operation,
        `enqueued exact task branch head for ${operation.params.taskId}`,
        exitCode,
      );
    }
    case "integration.run_next": {
      const handler = makeRunIntegrateQueueRunNextHandler(() => Promise.resolve(command));
      try {
        exitCode = await handler(cliContext, {
          worker: null,
          leaseMs: null,
          pollIntervalMs: null,
          timeoutMs: null,
          runVerify: false,
          dryRun: false,
          quiet: true,
          drain: false,
          wait: true,
          hosted: true,
          stablePolls: null,
          hostedPollIntervalMs: null,
          hostedTimeoutMs: null,
          requiredChecks: [],
        });
      } catch (error) {
        if (!isCompletedProtectedBaseWorkerCycle(error)) throw error;
        return succeeded(
          operation,
          `completed the foreground worker cycle for ${operation.params.taskId}; provider handoff remains durable`,
        );
      }
      return succeeded(
        operation,
        `advanced the serialized integration queue for ${operation.params.taskId}`,
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
        yes: true,
        archive: false,
        deleteRemoteBranches: true,
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
